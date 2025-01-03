import { supabase } from '@/lib/supabase';
import type { RealtimeMessage } from '@/lib/types/realtime';

export async function sendRealtimeMessage(channelId: string, content: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');

  const message: Partial<RealtimeMessage> = {
    topic: `chat:${channelId}`,
    extension: 'message',
    payload: {
      content,
      user_id: user.id,
      channel_id: channelId,
      username: user.user_metadata?.username || user.email?.split('@')[0] || 'Anonymous',
      avatar_url: user.user_metadata?.avatar_url
    }
  };

  const { error } = await supabase
    .from('realtime.messages')
    .insert([message]);

  if (error) throw error;
}

export function subscribeToChannel(
  channelId: string,
  onMessage: (message: RealtimeMessage) => void
) {
  return supabase
    .channel(`chat:${channelId}`)
    .on('broadcast', { event: 'message' }, (payload) => {
      onMessage(payload as RealtimeMessage);
    })
    .subscribe();
}