import { supabase } from '@/lib/supabase'

export const MESSAGES_QUERY = `
  id,
  content,
  created_at,
  user:users (
    id,
    username,
    first_name,
    last_name,
    avatar_url
  )
`

export const PAGE_SIZE = 20

export async function fetchMessages(channelId: string, lastMessageId?: string) {
  let query = supabase
    .from('messages')
    .select(MESSAGES_QUERY)
    .eq('channel_id', channelId)
    .order('created_at', { ascending: false })
    .limit(PAGE_SIZE)

  if (lastMessageId) {
    query = query.lt('id', lastMessageId)
  }
  const data = await query
  return data
}
