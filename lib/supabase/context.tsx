"use client";

import { createContext, useContext } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export const SupabaseContext = createContext<SupabaseClient<Database> | null>(null);

export function useSupabase() {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
}