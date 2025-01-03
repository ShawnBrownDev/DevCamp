import { supabase } from '@/lib/supabase';
import { QUERIES } from '@/lib/supabase/queries';
import type { Message } from '@/lib/types/chat';

export async function fetchMessages(channelId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from('messages')
    .select(QUERIES.MESSAGE)
    .eq('channel_id', channelId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function sendMessage(channelId: string, content: string): Promise<Message> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('messages')
    .insert([{
      content,
      channel_id: channelId,
      user_id: user.id,
      edited: false
    }])
    .select(QUERIES.MESSAGE)
    .single();

  if (error) throw error;
  return data;
}

export async function updateMessage(messageId: string, content: string): Promise<Message> {
  const { data, error } = await supabase
    .from('messages')
    .update({ content, edited: true })
    .eq('id', messageId)
    .select(QUERIES.MESSAGE)
    .single();

  if (error) throw error;
  return data;
}