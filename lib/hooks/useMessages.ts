"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Message } from '@/lib/types/chat';
import { supabase } from '@/lib/supabase';

const MESSAGE_QUERY = `
  id,
  content,
  user_id,
  channel_id,
  created_at,
  user:users!user_id (
    id,
    username,
    first_name,
    last_name,
    avatar_url,
    role
  )
`;

export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const subscriptionRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!channelId) return;
    
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('messages')
        .select(MESSAGE_QUERY)
        .eq('channel_id', channelId)
        .order('created_at', { ascending: false })
        .limit(50);

      if (fetchError) throw fetchError;
      setMessages(data || []);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [channelId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!channelId) {
      setError('No channel selected');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error: sendError } = await supabase
        .from('messages')
        .insert([{
          content,
          channel_id: channelId,
          user_id: user.id
        }]);

      if (sendError) throw sendError;
      setError(null);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message);
    }
  }, [channelId]);

  useEffect(() => {
    if (!channelId) {
      setMessages([]);
      return;
    }

    fetchMessages();

    // Set up real-time subscription
    subscriptionRef.current = supabase
      .channel(`messages:${channelId}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        async (payload) => {
          // Fetch the complete message with user data
          const { data, error } = await supabase
            .from('messages')
            .select(MESSAGE_QUERY)
            .eq('id', payload.new?.id || payload.old?.id)
            .single();

          if (!error && data) {
            switch (payload.eventType) {
              case 'INSERT':
                setMessages(prev => [data, ...prev]);
                break;
              case 'UPDATE':
                setMessages(prev => 
                  prev.map(msg => msg.id === data.id ? data : msg)
                );
                break;
              case 'DELETE':
                setMessages(prev => 
                  prev.filter(msg => msg.id !== payload.old.id)
                );
                break;
            }
          }
        }
      )
      .subscribe();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [channelId, fetchMessages]);

  return {
    messages,
    error,
    isLoading,
    sendMessage
  };
}