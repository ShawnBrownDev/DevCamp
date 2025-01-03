"use client";

import { useState, useCallback } from 'react';

import { useMessageStore } from '@/lib/stores/messageStore'
import { usePagination } from './usePagination'
import { useRealtime } from './useRealtime'
import { fetchMessages, PAGE_SIZE, MESSAGES_QUERY } from '../queries/messages'
import { supabase } from '@/lib/supabase'

export function useMessages(channelId: string | null) {
  const [error, setError] = useState<string | null>(null)

  const { messages, setMessages, addMessage } = useMessageStore(channelId)

  const handleLoadMore = useCallback(
    async (lastMessageId: string) => {
      if (!channelId) return

      try {
        const { data, error } = await fetchMessages(channelId, lastMessageId)
        if (error) throw error

        const newMessages = data || []
        setMessages([...messages, ...newMessages])
      } catch (err: any) {
        console.error('Error loading more messages:', err)
        setError(err.message)
      }
    },
    [channelId, messages]
  )

  const { hasMore, isLoading, loadMore } = usePagination({
    pageSize: PAGE_SIZE,
    onLoadMore: handleLoadMore,
  })

  const handleRealtimeInsert = useCallback(
    async (newMessage: any) => {
      const { data, error } = await supabase
        .from('messages')
        .select(MESSAGES_QUERY)
        .eq('id', newMessage.id)
        .single()

      if (!error && data) {
        addMessage(data)
      }
    },
    [supabase, addMessage]
  )

  useRealtime({
    channelId: channelId || '',
    supabase,
    onInsert: handleRealtimeInsert,
  })

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channelId) {
        setError('No channel selected')
        return
      }

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        const { error } = await supabase.from('messages').insert([
          {
            content,
            channel_id: channelId,
            user_id: user.id,
          },
        ])

        if (error) throw error
        setError(null)
      } catch (err: any) {
        console.error('Error sending message:', err)
        setError(err.message)
      }
    },
    [channelId, supabase]
  )

  return {
    messages,
    error,
    isLoading,
    hasMore,
    sendMessage,
    loadMore,
  }
}