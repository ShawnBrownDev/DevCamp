"use client";

import { supabase } from '../supabase'



export async function getSession() {
  if (!supabase) return null

  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    return session
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function persistSession(rememberMe: boolean = true) {
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem('sb-auth-persist', String(rememberMe));
}

export async function clearSession() {
  localStorage.removeItem('sb-auth-persist');
  sessionStorage.removeItem('sb-auth-persist');
}