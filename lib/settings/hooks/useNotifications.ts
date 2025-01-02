```typescript
"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { updateNotificationSettings } from '../api';
import type { NotificationSettings } from '../types';

export function useNotifications() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateSettings = async (settings: NotificationSettings) => {
    if (!user) return;

    try {
      setSaving(true);
      setError(null);
      await updateNotificationSettings(user.id, settings);
    } catch (err: any) {
      console.error('Error updating notification settings:', err);
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return { updateSettings, saving, error };
}
```