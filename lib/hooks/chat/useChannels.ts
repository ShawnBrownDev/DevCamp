"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { subscribeToChannel } from '@/lib/supabase/realtime';
import { fetchChannels } from '@/lib/services/channels';
import type { Channel } from '@/lib/types/chat';

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadChannels() {
      try {
        setLoading(true);
        const data = await fetchChannels();
        if (mounted) {
          setChannels(data);
          setError(null);
        }
      } catch (err: any) {
        console.error('Error loading channels:', err);
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadChannels();

    // Subscribe to channel changes
    const subscription = subscribeToChannel<Channel>(
      supabase,
      'public:channels',
      'channels',
      undefined,
      (newChannel) => {
        if (mounted) {
          setChannels(prev => [...prev, newChannel]);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return { channels, loading, error };
}