export const MESSAGE_QUERY = `
  id,
  content,
  user_id,
  channel_id,
  created_at,
  edited,
  user:users (
    id,
    username,
    first_name,
    last_name,
    avatar_url,
    role
  )
`;

export const CHANNEL_QUERY = `
  id,
  name,
  description,
  is_private,
  created_at
`;