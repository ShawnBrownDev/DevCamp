"use client";

import { useEffect } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';

export function useProfileSync(user: User | null) {
  const supabase = getSupabaseClient();

  useEffect(() => {
    if (!user || !supabase) return;

    async function syncProfile() {
      try {
        const { data: existingProfile } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        if (!existingProfile) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              id: user.id,
              username: user.user_metadata?.username || user.email?.split('@')[0],
              first_name: user.user_metadata?.firstName,
              last_name: user.user_metadata?.lastName,
              updated_at: new Date().toISOString()
            }]);

          if (insertError) {
            console.error('Profile sync error:', insertError);
          }
        }
      } catch (error) {
        console.error('Profile sync error:', error);
      }
    }

    syncProfile();
  }, [user?.id]);
}