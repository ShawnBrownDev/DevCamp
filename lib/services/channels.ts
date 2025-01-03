import { supabase } from '@/lib/supabase';
import { QUERIES } from '@/lib/supabase/queries';
import type { Channel } from '@/lib/types/chat';

export async function fetchChannels(): Promise<Channel[]> {
  const { data, error } = await supabase
    .from('channels')
    .select(QUERIES.CHANNEL)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function createChannel(
  name: string,
  description?: string,
  isPrivate: boolean = false
): Promise<Channel> {
  const { data, error } = await supabase
    .from('channels')
    .insert([{ name, description, is_private: isPrivate }])
    .select(QUERIES.CHANNEL)
    .single();

  if (error) throw error;
  return data;
}