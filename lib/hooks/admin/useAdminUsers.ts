"use client";

import { useState, useEffect } from 'react';

import type { AdminUser } from '@/lib/types/admin'
import { supabase } from '@/lib/supabase'

export function useAdminUsers() {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const { data, error: usersError } = await supabase
          .from('users')
          .select('*')
          .order('created_at', { ascending: false })

        if (usersError) throw usersError
        setUsers(data || [])
      } catch (err: any) {
        console.error('Error loading users:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [supabase])

  return { users, loading, error }
}