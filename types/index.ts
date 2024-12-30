export interface User {
  id: string;
  username: string;
  avatar_url?: string;
  email: string;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  server_id: string;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  channel_id: string;
  created_at: string;
  user: User;
}

export interface Server {
  id: string;
  name: string;
  image_url?: string;
  owner_id: string;
  created_at: string;
}