export interface UserProfile {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  role: 'user' | 'admin' | 'moderator';
  created_at: string;
  updated_at: string;
  feature_flags: FeatureFlags;
}

export interface FeatureFlags {
  beta_features: boolean;
  advanced_chat: boolean;
  custom_themes: boolean;
  [key: string]: boolean;
}