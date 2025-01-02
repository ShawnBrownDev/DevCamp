"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { useSupabase } from '@/lib/supabase/provider';
import { useMessageStore } from '@/lib/stores/messageStore';
import type { Message } from '@/lib/types/community';

const MESSAGES_QUERY = `
  id,
  content,
  created_at,
  user:users (
    id,
    username,
    first_name,
    last_name,
    avatar_url
  )
`;

const PAGE_SIZE = 20;

export function useMessages(channelId: string | null) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const supabase = useSupabase();
  const subscriptionRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const { messages, setMessages, addMessage } = useMessageStore(channelId);

  const fetchMessages = useCallback(async (lastMessageId?: string) => {
    if (!channelId) return;
    
    try {
      setIsLoading(true);
      let query = supabase
        .from('messages')
        .select(MESSAGES_QUERY)
        .eq('channel_id', channelId)
        .order('created_at', { ascending: false })
        .limit(PAGE_SIZE);

      if (lastMessageId) {
        query = query.lt('id', lastMessageId);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      const newMessages = data || [];
      setHasMore(newMessages.length === PAGE_SIZE);
      
      if (lastMessageId) {
        setMessages([...messages, ...newMessages]);
      } else {
        setMessages(newMessages);
      }
      
      setError(null);
    } catch (err: any) {
      console.error('Error fetching messages:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [channelId, messages]);

  const loadMore = useCallback(() => {
    if (!messages.length) return;
    const lastMessage = messages[messages.length - 1];
    fetchMessages(lastMessage.id);
  }, [messages, fetchMessages]);

  const sendMessage = useCallback(async (content: string) => {
    if (!channelId) {
      setError('No channel selected');
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('messages')
        .insert([{
          content,
          channel_id: channelId,
          user_id: user.id
        }]);

      if (error) throw error;
      setError(null);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message);
    }
  }, [channelId, supabase]);

  useEffect(() => {
    if (!channelId) {
      setMessages([]);
      return;
    }

    fetchMessages();

    // Cleanup previous subscription
    if (subscriptionRef.current) {
      subscriptionRef.current.unsubscribe();
    }

    // Set up real-time subscription
    subscriptionRef.current = supabase
      .channel(`messages:${channelId}`)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'messages',
          filter: `channel_id=eq.${channelId}`
        },
        async (payload) => {
          const { data, error } = await supabase
            .from('messages')
            .select(MESSAGES_QUERY)
            .eq('id', payload.new.id)
            .single();

          if (!error && data) {
            addMessage(data);
          }
        }
      )
      .subscribe();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [channelId]);

  return {
    messages,
    error,
    isLoading,
    hasMore,
    sendMessage,
    loadMore
  };
}