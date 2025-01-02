"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/context';
import { CHANNEL_QUERY } from '@/lib/chat/queries';
import type { Channel } from '@/lib/types/chat';

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    async function loadChannels() {
      try {
        const { data, error } = await supabase
          .from('channels')
          .select(CHANNEL_QUERY)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setChannels(data || []);
        setError(null);
      } catch (err: any) {
        console.error('Error loading channels:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadChannels();

    const subscription = supabase
      .channel('public:channels')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'channels' },
        (payload) => {
          switch (payload.eventType) {
            case 'INSERT':
              setChannels(prev => [...prev, payload.new as Channel]);
              break;
            case 'UPDATE':
              setChannels(prev => 
                prev.map(channel => 
                  channel.id === payload.new.id ? { ...channel, ...payload.new } : channel
                )
              );
              break;
            case 'DELETE':
              setChannels(prev => 
                prev.filter(channel => channel.id !== payload.old.id)
              );
              break;
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return { channels, loading, error };
}