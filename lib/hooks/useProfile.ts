"use client";

import { useState, useEffect } from 'react';

import type { UserProfile } from '@/lib/types/user';
import { useAuthProvider } from '../auth'
import { supabase } from '../supabase'

export function useProfile() {
  const { user } = useAuthProvider()

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    async function loadProfile() {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user?.id)
          .single()

        if (error) throw error;
        setProfile(data);
        setError(null);
      } catch (err: any) {
        console.error('Error loading profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, supabase]);

  return { profile, loading, error };
}