"use client";

import { useState, useEffect } from 'react';

import type { AdminSubmission } from '@/lib/types/admin';
import { supabase } from '@/lib/supabase'

export function useAdminStats() {
  const [stats, setStats] = useState<AdminSubmission| null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        const { data, error: statsError } = await supabase.rpc(
          'get_admin_stats'
        )

        if (statsError) throw statsError
        setStats(data)
      } catch (err: any) {
        console.error('Error loading admin stats:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [supabase])

  return { stats, loading, error }
}