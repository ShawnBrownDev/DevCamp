export interface User {
  id: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  channel_id: string;
  created_at: string;
  user?: User;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  is_private: boolean;
  created_by?: string;
  created_at: string;
  updated_at?: string;
}

export interface DirectMessage {
  id: string;
  content: string;
  sender_id: string;
  recipient_id: string;
  conversation_id: string;
  read_at?: string;
  created_at: string;
  sender?: User;
}

export interface Thread {
  id: string;
  message_id: string;
  created_at: string;
  messages: Message[];
}