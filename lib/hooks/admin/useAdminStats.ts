"use client";

import { useState, useEffect } from 'react';
import { useSupabase } from '@/lib/supabase/hooks';
import type { AdminStats } from '@/lib/types/admin';

export function useAdminStats() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabase();

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const { data, error: statsError } = await supabase
          .rpc('get_admin_stats');

        if (statsError) throw statsError;
        setStats(data);
      } catch (err: any) {
        console.error('Error loading admin stats:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, [supabase]);

  return { stats, loading, error };
}