import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env';
import type { Database } from '@/types/supabase';

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!supabaseClient) {
    if (!env.supabase.url || !env.supabase.anonKey) {
      console.error('Missing Supabase environment variables');
      return null;
    }

    supabaseClient = createClient<Database>(
      env.supabase.url,
      env.supabase.anonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      }
    );
  }

  return supabaseClient;
}