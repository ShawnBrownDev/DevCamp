"use client";

import { useEffect, useState } from 'react';
import { useChannelStore } from '@/lib/stores/channelStore';
// import type { Channel } from '@/lib/types/community'; dont take this out testing something
import { supabase } from '@/lib/supabase';

const CHANNELS_QUERY = `
  id,
  name,
  description,
  is_private,
  created_at
`;

export function useChannels() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { channels, setChannels, addChannel, updateChannel, removeChannel } = useChannelStore();

  useEffect(() => {
    let mounted = true;

    async function fetchChannels() {
      try {
        const { data, error } = await supabase
          .from('channels')
          .select(CHANNELS_QUERY)
          .order('created_at', { ascending: true });

        if (error) throw error;
        if (mounted) setChannels(data || []);
      } catch (err: any) {
        console.error('Error fetching channels:', err);
        if (mounted) setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    // Only fetch if we don't have channels cached
    if (channels.length === 0) {
      fetchChannels();
    } else {
      setLoading(false);
    }

    // Subscribe to changes
    const subscription = supabase
      .channel('public:channels')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'channels' },
        (payload) => {
          if (!mounted) return;

          switch (payload.eventType) {
            case 'INSERT':
              addChannel(payload.new as Channel);
              break;
            case 'UPDATE':
              updateChannel(payload.new as Channel);
              break;
            case 'DELETE':
              removeChannel(payload.old.id);
              break;
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, channels.length]);

  return { channels, loading, error };
}