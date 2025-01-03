"use client";

import { useState, useEffect } from 'react';


import type { FeatureFlags } from '@/lib/types/user';
import { useAuthProvider } from '../auth'
import { supabase } from '../supabase'

export function useFeatureFlags() {
  const { user } = useAuthProvider()
  const [flags, setFlags] = useState<FeatureFlags | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadFlags() {
      if (!user) {
        setFlags(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('feature_flags')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        setFlags(data.feature_flags);
        setError(null);
      } catch (err: any) {
        console.error('Error loading feature flags:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadFlags();
  }, [user, supabase]);

  const toggleFlag = async (flagName: keyof FeatureFlags) => {
    if (!user || !flags) return;

    try {
      const updatedFlags = {
        ...flags,
        [flagName]: !flags[flagName]
      };

      const { error } = await supabase
        .from('users')
        .update({ 
          feature_flags: updatedFlags,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
      setFlags(updatedFlags);
      setError(null);
    } catch (err: any) {
      console.error('Error updating feature flag:', err);
      setError(err.message);
    }
  };

  return { flags, loading, error, toggleFlag };
}