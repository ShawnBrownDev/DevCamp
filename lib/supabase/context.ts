"use client";

import { createContext } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export const SupabaseContext = createContext<SupabaseClient<Database> | null>(null);