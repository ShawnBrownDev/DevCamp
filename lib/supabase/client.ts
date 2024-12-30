import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { SUPABASE_CONFIG, validateSupabaseConfig } from './config';

let supabase: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseClient() {
  if (!validateSupabaseConfig()) {
    return null;
  }

  if (!supabase) {
    supabase = createClient<Database>(
      SUPABASE_CONFIG.url!,
      SUPABASE_CONFIG.anonKey!,
      {
        auth: {
          persistSession: true,
        },
      }
    );
  }

  return supabase;
}