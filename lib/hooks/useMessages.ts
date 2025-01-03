"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

import { MESSAGE_FIELDS } from '@/lib/chat/queries';
import type { Message } from '@/lib/types/chat';
import { supabase } from '../supabase'

export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const optimisticUpdatesRef = useRef<Set<string>>(new Set())

  useEffect(() => {
    if (!channelId) {
      setMessages([])
      return
    }

    async function loadMessages() {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('messages')
          .select(MESSAGE_FIELDS)
          .eq('channel_id', channelId)
          .order('created_at', { ascending: true })

        if (error) throw error
        setMessages(data || [])
        setError(null)
      } catch (err: any) {
        console.error('Error loading messages:', err)
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadMessages()

    // Subscribe to ALL changes in the messages table for this channel
    const subscription = supabase
      .channel(`messages:${channelId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'messages',
          filter: `channel_id=eq.${channelId}`,
        },
        async (payload) => {
          // Skip optimistic updates we already handled
          if (
            payload.eventType === 'INSERT' &&
            optimisticUpdatesRef.current.has(payload.new?.id)
          ) {
            optimisticUpdatesRef.current.delete(payload.new.id)
            return
          }

          // For all other changes, fetch the complete message with user data
          const { data, error } = await supabase
            .from('messages')
            .select(MESSAGE_FIELDS)
            .eq(
              'id',
              payload.eventType === 'DELETE' ? payload.old.id : payload.new.id
            )
            .single()

          if (!error && data) {
            switch (payload.eventType) {
              case 'INSERT':
                setMessages((prev) => [...prev, data])
                break
              case 'UPDATE':
                setMessages((prev) =>
                  prev.map((msg) => (msg.id === data.id ? data : msg))
                )
                break
              case 'DELETE':
                setMessages((prev) =>
                  prev.filter((msg) => msg.id !== payload.old.id)
                )
                break
            }
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
      setMessages([])
      optimisticUpdatesRef.current.clear()
    }
  }, [channelId, supabase])

  const sendMessage = useCallback(
    async (content: string) => {
      if (!channelId) return

      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) throw new Error('Not authenticated')

        // Generate a temporary ID for optimistic update
        const tempId = crypto.randomUUID()
        optimisticUpdatesRef.current.add(tempId)

        // Create optimistic message
        const optimisticMessage: Message = {
          id: tempId,
          content,
          user_id: user.id,
          channel_id: channelId,
          created_at: new Date().toISOString(),
          user: {
            id: user.id,
            username:
              user.user_metadata.username || user.email?.split('@')[0] || '',
            first_name: user.user_metadata.firstName,
            last_name: user.user_metadata.lastName,
            avatar_url: user.user_metadata.avatar_url,
          },
        }

        // Add optimistic message
        setMessages((prev) => [...prev, optimisticMessage])

        // Send actual message
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
        // Remove failed optimistic message
        setMessages((prev) =>
          prev.filter((msg) => !optimisticUpdatesRef.current.has(msg.id))
        )
      }
    },
    [channelId, supabase]
  )

  const editMessage = useCallback(
    async (messageId: string, content: string) => {
      try {
        // Optimistically update the message
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId ? { ...msg, content, edited: true } : msg
          )
        )

        const { error } = await supabase
          .from('messages')
          .update({ content })
          .eq('id', messageId)

        if (error) throw error
        setError(null)
      } catch (err: any) {
        console.error('Error editing message:', err)
        setError(err.message)
        // Revert optimistic update on error
        const { data } = await supabase
          .from('messages')
          .select(MESSAGE_FIELDS)
          .eq('id', messageId)
          .single()

        if (data) {
          setMessages((prev) =>
            prev.map((msg) => (msg.id === messageId ? data : msg))
          )
        }
      }
    },
    [supabase]
  )

  const deleteMessage = useCallback(
    async (messageId: string) => {
      try {
        // Optimistically remove the message
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId))

        const { error } = await supabase
          .from('messages')
          .delete()
          .eq('id', messageId)

        if (error) throw error
        setError(null)
      } catch (err: any) {
        console.error('Error deleting message:', err)
        setError(err.message)
        // Revert optimistic delete on error
        const { data } = await supabase
          .from('messages')
          .select(MESSAGE_FIELDS)
          .eq('id', messageId)
          .single()

        if (data) {
          setMessages((prev) => [...prev, data])
        }
      }
    },
    [supabase]
  )

  return {
    messages,
    error,
    isLoading,
    sendMessage,
    editMessage,
    deleteMessage,
  }
}