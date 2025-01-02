"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/context';
import { THREAD_QUERY } from '@/lib/chat/queries';
import type { Message } from '@/lib/types/chat';

export function useThreads(messageId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    if (!messageId) {
      setMessages([]);
      setLoading(false);
      return;
    }

    async function loadThreadMessages() {
      try {
        const { data, error } = await supabase
          .from('messages')
          .select(THREAD_QUERY)
          .eq('thread_id', messageId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setMessages(data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error loading thread messages:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadThreadMessages();

    const subscription = supabase
      .channel(`thread:${messageId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `thread_id=eq.${messageId}`
        },
        async (payload) => {
          const { data, error } = await supabase
            .from('messages')
            .select(THREAD_QUERY)
            .eq('id', payload.new.id)
            .single();

          if (!error && data) {
            setMessages(prev => [...prev, data]);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [messageId, supabase]);

  const replyToThread = async (content: string) => {
    if (!messageId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('messages')
        .insert([{
          content,
          thread_id: messageId,
          user_id: user.id
        }]);

      if (error) throw error;
      setError(null);
    } catch (err: any) {
      console.error('Error replying to thread:', err);
      setError(err.message);
    }
  };

  return { messages, loading, error, replyToThread };
}