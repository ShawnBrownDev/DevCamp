"use client";

import { useState, useEffect, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { QUERIES } from '@/lib/supabase/queries';
import type { Message } from '@/lib/types/chat';

export function useMessages(channelId: string | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!channelId) return;
    
    let mounted = true;

    async function loadMessages() {
      try {
        setIsLoading(true);
        const { data, error: fetchError } = await supabase
          .from('messages')
          .select(QUERIES.MESSAGE)
          .eq('channel_id', channelId)
          .order('created_at', { ascending: true });

        if (fetchError) throw fetchError;
        if (mounted) {
          setMessages(data || []);
          setError(null);
        }
      } catch (err: any) {
        console.error('Error loading messages:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    // Load initial messages
    loadMessages();

    // Set up realtime subscription with proper channel name
    const channel = supabase.channel(`messages:${channelId}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `channel_id=eq.${channelId}`
      }, async (payload) => {
        if (!mounted) return;

        // Fetch complete message with user data
        const { data, error } = await supabase
          .from('messages')
          .select(QUERIES.MESSAGE)
          .eq('id', payload.new.id)
          .single();

        if (!error && data) {
          setMessages(prev => [...prev, data]);
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Subscribed to messages channel:', channelId);
        }
      });

    channelRef.current = channel;

    return () => {
      mounted = false;
      if (channelRef.current) {
        console.log('Unsubscribing from messages channel:', channelId);
        channelRef.current.unsubscribe();
      }
    };
  }, [channelId]);

  const sendMessage = async (content: string) => {
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
          user_id: user.id,
          edited: false
        }]);

      if (sendError) throw sendError;
      setError(null);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message);
      throw err;
    }
  };

  return { messages, error, isLoading, sendMessage };
}