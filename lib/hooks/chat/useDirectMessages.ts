"use client";

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { DirectMessage } from '@/lib/types/chat';

const DM_QUERY = `
  id,
  content,
  sender_id,
  recipient_id,
  read_at,
  created_at,
  sender:users!sender_id (
    id,
    username,
    first_name,
    last_name,
    avatar_url,
    role,
    bio
  )
`;

export function useDirectMessages(recipientId: string | null) {
  const [messages, setMessages] = useState<DirectMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!recipientId) return;

    try {
      setIsLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error: fetchError } = await supabase
        .from('direct_messages')
        .select(DM_QUERY)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('created_at', { ascending: true });

      if (fetchError) throw fetchError;
      setMessages(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching direct messages:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [recipientId]);

  useEffect(() => {
    if (!recipientId) {
      setMessages([]);
      return;
    }

    fetchMessages();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`dm:${recipientId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'direct_messages',
          filter: `recipient_id=eq.${recipientId}`
        },
        async (payload) => {
          const { data, error } = await supabase
            .from('direct_messages')
            .select(DM_QUERY)
            .eq('id', payload.new.id)
            .single();

          if (!error && data) {
            setMessages(prev => [...prev, data]);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [recipientId, fetchMessages]);

  const sendMessage = async (content: string) => {
    if (!recipientId) {
      setError('No recipient selected');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error: sendError } = await supabase
        .from('direct_messages')
        .insert([{
          content,
          sender_id: user.id,
          recipient_id: recipientId
        }]);

      if (sendError) throw sendError;
      setError(null);
    } catch (err: any) {
      console.error('Error sending direct message:', err);
      setError(err.message);
      throw err;
    }
  };

  return {
    messages,
    error,
    isLoading,
    sendMessage
  };
}