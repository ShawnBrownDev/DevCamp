import type { User } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isSupabaseConnected: boolean;
}

export interface SignupData {
  email: string;
  password: string;
  username: string;
}