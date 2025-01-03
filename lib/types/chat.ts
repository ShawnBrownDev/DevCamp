export interface User {
  id: string;
  username: string;
  first_name?: string | null;
  last_name?: string | null;
  avatar_url?: string | null;
  role: 'user' | 'admin' | 'moderator';
  feature_flags: FeatureFlags;
}

export interface FeatureFlags {
  beta_features: boolean;
  advanced_chat: boolean;
  custom_themes: boolean;
}

export interface Message {
  id: string;
  content: string;
  user_id: string;
  channel_id: string;
  created_at: string;
  edited: boolean;
  user_data: User;
}

export interface Channel {
  id: string;
  name: string;
  description?: string;
  is_private: boolean;
  created_at: string;
}