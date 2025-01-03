export const QUERIES = {
  MESSAGE: `
    id,
    content,
    user_id,
    channel_id,
    created_at,
    edited,
    user_data
  `,
  
  CHANNEL: `
    id,
    name,
    description,
    is_private,
    created_at
  `
} as const;