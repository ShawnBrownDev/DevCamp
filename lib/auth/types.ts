import type { User, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSupabaseConnected: boolean;
  supabase: SupabaseClient<Database>;
}

export interface AuthError {
  message: string;
  status?: number;
  code?: string;
}

export interface ResetPasswordOptions {
  email: string;
  redirectTo?: string;
}