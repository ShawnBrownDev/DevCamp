```typescript
import { useSupabase } from "@/lib/supabase/hooks";
import type { ProfileFormData } from "./validation";
import type { NotificationSettings, UserPreferences } from "./types";

export async function updateProfile(userId: string, data: ProfileFormData) {
  const supabase = useSupabase();
  
  const { error } = await supabase.rpc('update_user_profile', {
    user_id: userId,
    new_username: data.username,
    new_first_name: data.firstName,
    new_last_name: data.lastName,
    new_bio: data.bio
  });

  if (error) throw error;
}

export async function updateNotificationSettings(
  userId: string, 
  settings: NotificationSettings
) {
  const supabase = useSupabase();
  
  const { error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: userId,
      notification_settings: settings,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
}

export async function updateUserPreferences(
  userId: string,
  preferences: UserPreferences
) {
  const supabase = useSupabase();
  
  const { error } = await supabase
    .from('user_settings')
    .upsert({
      user_id: userId,
      preferences,
      updated_at: new Date().toISOString()
    });

  if (error) throw error;
}
```