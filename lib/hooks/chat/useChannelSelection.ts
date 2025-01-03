"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { Channel } from '@/lib/types/chat';

export function useChannelSelection() {
  const [selectedChannelId, setSelectedChannelId] = useState<string | null>(null);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadChannels() {
      try {
        setLoading(true);
        const { data, error: channelsError } = await supabase
          .from('channels')
          .select('*')
          .order('created_at', { ascending: true });

        if (channelsError) throw channelsError;
        
        setChannels(data || []);
        // Auto-select general-chat if available
        const generalChat = data?.find(channel => channel.name === 'general-chat');
        if (generalChat && !selectedChannelId) {
          setSelectedChannelId(generalChat.id);
        }
      } catch (err: any) {
        console.error('Error loading channels:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadChannels();

    // Subscribe to channel changes
    const channel = supabase
      .channel('public:channels')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'channels' },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setChannels(prev => [...prev, payload.new as Channel]);
          } else if (payload.eventType === 'DELETE') {
            setChannels(prev => prev.filter(ch => ch.id !== payload.old.id));
            if (selectedChannelId === payload.old.id) {
              setSelectedChannelId(null);
            }
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return {
    selectedChannelId,
    setSelectedChannelId,
    channels,
    loading,
    error
  };
}