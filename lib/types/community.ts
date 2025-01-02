export interface UserProfile {
  id: string;
  username: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  bio?: string;
  is_mentor: boolean;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  channel_id?: string;
  thread_id?: string;
  reply_to?: string;
  created_at: string;
  updated_at: string;
  user?: UserProfile;
}