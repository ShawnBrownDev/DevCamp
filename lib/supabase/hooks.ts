"use client";

import { useContext } from 'react';
import { SupabaseContext } from './context';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export function useSupabase(): SupabaseClient<Database> {
  const context = useContext(SupabaseContext);
  if (!context) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }
  return context;
}