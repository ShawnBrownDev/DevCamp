"use client";

import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export function useProfileSync(user: User | null) {
  useEffect(() => {
    if (!user) return;

    async function syncProfile() {
      try {
        // Check if profile exists
        const { data: existingProfile } = await supabase
          .from('users')
          .select('id')
          .eq('id', user.id)
          .single();

        // If no profile exists, create one
        if (!existingProfile) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([{
              id: user.id,
              username: user.user_metadata?.username || user.email?.split('@')[0],
              email: user.email,
              first_name: user.user_metadata?.firstName,
              last_name: user.user_metadata?.lastName,
              role: 'user',
              feature_flags: {
                beta_features: false,
                advanced_chat: false,
                custom_themes: false
              },
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }]);

          if (insertError && insertError.code !== '23505') { // Ignore unique constraint violations
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