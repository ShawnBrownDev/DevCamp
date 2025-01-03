"use client";

import { supabase } from '../supabase';

export async function promoteToAdmin(userId: string) {
  const { data, error } = await supabase
    .rpc('promote_to_admin', { target_user_id: userId });

  if (error) throw error;
  return data;
}

export async function promoteToModerator(userId: string) {
  const { data, error } = await supabase
    .rpc('promote_to_moderator', { target_user_id: userId });

  if (error) throw error;
  return data;
}

export async function getAdminStats() {
  const { data, error } = await supabase
    .rpc('get_admin_stats');

  if (error) throw error;
  return data;
}