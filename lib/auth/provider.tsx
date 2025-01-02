"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSupabase } from '../supabase/hooks';
import { AuthContext } from './context';
import { persistSession, clearSession } from './session';
import type { User, AuthChangeEvent, Session } from '@supabase/supabase-js';
import type { AuthContextType } from './types';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const supabase = useSupabase();
  const router = useRouter();

  useEffect(() => {
    if (!supabase) {
      setIsSupabaseConnected(false);
      setIsLoading(false);
      return;
    }

    setIsSupabaseConnected(true);
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        if (!mounted) return;
        setUser(session?.user ?? null);

        switch (event) {
          case 'SIGNED_IN':
            await persistSession(localStorage.getItem('sb-auth-persist') === 'true');
            break;
          case 'SIGNED_OUT':
            await clearSession();
            if (!router.pathname.startsWith('/login')) {
              router.push('/login');
            }
            break;
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  const contextValue: AuthContextType = {
    user,
    isLoading,
    isSupabaseConnected,
    supabase
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}