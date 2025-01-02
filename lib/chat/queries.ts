export const MESSAGE_FIELDS = `
  id,
  content,
  user_id,
  channel_id,
  created_at,
  updated_at,
  edited,
  user:users (
    id,
    username,
    first_name,
    last_name,
    avatar_url
  )
`;

export const CHANNEL_FIELDS = `
  id,
  name,
  description,
  is_private,
  created_by,
  created_at,
  updated_at
`;

export const THREAD_FIELDS = `
  id,
  content,
  user_id,
  thread_id,
  created_at,
  updated_at,
  edited,
  user:users (
    id,
    username,
    first_name,
    last_name,
    avatar_url
  )
`;

export const DIRECT_MESSAGE_FIELDS = `
  id,
  content,
  sender_id,
  recipient_id,
  conversation_id,
  read_at,
  created_at,
  sender:users!sender_id (
    id,
    username,
    first_name,
    last_name,
    avatar_url
  )
`;