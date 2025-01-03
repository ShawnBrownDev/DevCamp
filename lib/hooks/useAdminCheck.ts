"use client";

import { useState, useEffect } from 'react';
import { useAuthProvider } from '../auth';
import { supabase } from '../supabase';

export function useAdminCheck() {
  const { user } = useAuthProvider();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkAdminStatus() {
      if (!user) {
        if (mounted) {
          setIsAdmin(false);
          setLoading(false);
        }
        return;
      }

      try {
        // Query the users table directly with single()
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (mounted) {
          setIsAdmin(data?.role === 'admin');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        if (mounted) {
          setIsAdmin(false);
          setLoading(false);
        }
      }
    }

    checkAdminStatus();

    // Cleanup function
    return () => {
      mounted = false;
    };
  }, [user]);

  return { isAdmin, loading };
}