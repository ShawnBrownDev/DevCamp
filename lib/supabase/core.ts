import { createClient } from '@supabase/supabase-js';
import { env } from '@/lib/config/env';
import type { Database } from '@/types/supabase';

let supabaseClient: ReturnType<typeof createClient<Database>> | null = null;

export function createSupabaseClient() {
  if (!supabaseClient) {
    if (!env.supabase.url || !env.supabase.anonKey) {
      throw new Error('Missing Supabase environment variables');
    }

    supabaseClient = createClient<Database>(
      env.supabase.url,
      env.supabase.anonKey,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
          storage: typeof window !== 'undefined' 
            ? window.localStorage 
            : undefined,
          storageKey: 'sb-auth-token',
          flowType: 'pkce'
        }
      }
    );
  }

  return supabaseClient;
}