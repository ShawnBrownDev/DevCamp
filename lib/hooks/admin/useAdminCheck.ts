"use client";

import { useState, useEffect } from 'react';
import { useAuthProvider } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export function useAdminCheck() {
  const { user } = useAuthProvider();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkAdminStatus() {
      if (!user) {
        if (mounted) {
          setIsAdmin(false);
          setIsModerator(false);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (mounted) {
          setIsAdmin(data?.role === 'admin');
          setIsModerator(data?.role === 'moderator');
          setLoading(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        if (mounted) {
          setIsAdmin(false);
          setIsModerator(false);
          setLoading(false);
        }
      }
    }

    checkAdminStatus();

    return () => {
      mounted = false;
    };
  }, [user]);

  return { isAdmin, isModerator, loading };
}