"use client";

import { useState, useEffect } from 'react';

import { DIRECT_MESSAGE_QUERY } from '@/lib/chat/queries'
import type { DirectMessage } from '@/lib/types/chat'
import { supabase } from '../supabase'

export function useDirectMessages(conversationId: string | null) {
  const [messages, setMessages] = useState<DirectMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!conversationId) {
      setMessages([])
      setLoading(false)
      return
    }

    async function loadDirectMessages() {
      try {
        const { data, error } = await supabase
          .from('direct_messages')
          .select(DIRECT_MESSAGE_QUERY)
          .eq('conversation_id', conversationId)
          .order('created_at', { ascending: true })

        if (error) throw error
        setMessages(data || [])
        setError(null)
      } catch (err: any) {
        console.error('Error loading direct messages:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDirectMessages()

    const subscription = supabase
      .channel(`dm:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'direct_messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        async (payload) => {
          const { data, error } = await supabase
            .from('direct_messages')
            .select(DIRECT_MESSAGE_QUERY)
            .eq('id', payload.new.id)
            .single()

          if (!error && data) {
            setMessages((prev) => [...prev, data])
          }
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [conversationId, supabase])

  const sendDirectMessage = async (content: string, recipientId: string) => {
    if (!conversationId) return

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      const { error } = await supabase.from('direct_messages').insert([
        {
          content,
          conversation_id: conversationId,
          sender_id: user.id,
          recipient_id: recipientId,
        },
      ])

      if (error) throw error
      setError(null)
    } catch (err: any) {
      console.error('Error sending direct message:', err)
      setError(err.message)
    }
  }

  const markAsRead = async (messageIds: string[]) => {
    try {
      const { error } = await supabase
        .from('direct_messages')
        .update({ read_at: new Date().toISOString() })
        .in('id', messageIds)

      if (error) throw error
    } catch (err: any) {
      console.error('Error marking messages as read:', err)
    }
  }

  return { messages, loading, error, sendDirectMessage, markAsRead }
}