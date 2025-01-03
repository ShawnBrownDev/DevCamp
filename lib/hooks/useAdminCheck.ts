"use client";

import { useEffect, useState } from 'react';


import { supabase } from '../supabase'
import { useAuthProvider } from '../auth'

export function useAdminCheck() {
  const { user } = useAuthProvider()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function checkAdminStatus() {
      if (!user) {
        if (mounted) {
          setIsAdmin(false)
          setLoading(false)
        }
        return
      }

      try {
        const { data } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        if (mounted) {
          setIsAdmin(data?.role === 'admin')
          setLoading(false)
        }
      } catch (error) {
        console.error('Error checking admin status:', error)
        if (mounted) {
          setIsAdmin(false)
          setLoading(false)
        }
      }
    }

    checkAdminStatus()

    return () => {
      mounted = false
    }
  }, [user, supabase])

  return { isAdmin, loading }
}