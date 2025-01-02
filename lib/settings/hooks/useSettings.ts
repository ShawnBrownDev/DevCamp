```typescript
"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth';
import { useSupabase } from '@/lib/supabase/hooks';
import type { NotificationSettings, UserPreferences } from '../types';

export function useSettings() {
  const { user } = useAuth();
  const supabase = useSupabase();
  const [settings, setSettings] = useState<{
    notifications: NotificationSettings;
    preferences: UserPreferences;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSettings() {
      if (!user) {
        setSettings(null);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_settings')
          .select('notification_settings, preferences')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;
        setSettings({
          notifications: data?.notification_settings,
          preferences: data?.preferences
        });
        setError(null);
      } catch (err: any) {
        console.error('Error loading settings:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadSettings();
  }, [user, supabase]);

  return { settings, loading, error };
}
```