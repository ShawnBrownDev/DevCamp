"use client";

import { useState, useEffect, useRef } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { sendRealtimeMessage, subscribeToChannel } from '@/lib/services/realtime';
import type { RealtimeMessage } from '@/lib/types/realtime';

export function useRealtimeMessages(channelId: string | null) {
  const [messages, setMessages] = useState<RealtimeMessage[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const subscriptionRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!channelId) return;

    let mounted = true;

    // Subscribe to channel messages
    subscriptionRef.current = subscribeToChannel(channelId, (message) => {
      if (mounted) {
        setMessages(prev => [...prev, message]);
      }
    });

    return () => {
      mounted = false;
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [channelId]);

  const sendMessage = async (content: string) => {
    if (!channelId) {
      setError('No channel selected');
      return;
    }

    try {
      setIsLoading(true);
      await sendRealtimeMessage(channelId, content);
      setError(null);
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    error,
    isLoading,
    sendMessage
  };
}