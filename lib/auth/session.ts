import { getSupabaseClient } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';

export async function getSession(): Promise<Session | null> {
  const supabase = getSupabaseClient();
  
  if (!supabase) return null;
  
  try {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

export async function persistSession(rememberMe: boolean = true): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) return;

  try {
    await supabase.auth.getSession();
    if (rememberMe) {
      localStorage.setItem('sb-auth-persist', 'true');
    } else {
      localStorage.removeItem('sb-auth-persist');
      sessionStorage.setItem('sb-auth-persist', 'true');
    }
  } catch (error) {
    console.error('Error persisting session:', error);
  }
}

export async function clearSession(): Promise<void> {
  localStorage.removeItem('sb-auth-persist');
  sessionStorage.removeItem('sb-auth-persist');
}