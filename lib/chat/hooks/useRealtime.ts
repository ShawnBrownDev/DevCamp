"use client";

import { useEffect, useRef } from 'react';
import { SupabaseClient } from '@supabase/supabase-js';
import type { RealtimeChannel } from '@supabase/supabase-js';

interface UseRealtimeProps {
  channelId: string;
  supabase: SupabaseClient;
  onInsert: (data: any) => void;
}

export function useRealtime({ channelId, supabase, onInsert }: UseRealtimeProps) {
  const subscriptionRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (!channelId) return;

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
        payload => onInsert(payload.new)
      )
      .subscribe();

    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
      }
    };
  }, [channelId, supabase, onInsert]);
}