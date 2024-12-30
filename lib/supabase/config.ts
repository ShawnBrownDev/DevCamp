import { env, validateEnv } from '@/lib/config/env';

export const SUPABASE_CONFIG = {
  url: env.supabase.url,
  anonKey: env.supabase.anonKey,
} as const;

export const validateSupabaseConfig = validateEnv;