import { RealtimeChannel, SupabaseClient } from '@supabase/supabase-js';

export function subscribeToChannel<T>(
  supabase: SupabaseClient,
  channelName: string,
  table: string,
  filter?: string,
  onChange: (data: T) => void
): RealtimeChannel {
  return supabase
    .channel(channelName)
    .on('postgres_changes',
      {
        event: '*',
        schema: 'public',
        table,
        ...(filter ? { filter } : {})
      },
      payload => onChange(payload.new as T)
    )
    .subscribe();
}