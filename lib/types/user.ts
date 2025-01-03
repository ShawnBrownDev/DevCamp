export interface UserProfile {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  role: 'user' | 'admin' | 'moderator';
  subscription_status: 'inactive' | 'active' | 'trialing' | 'canceled' | null;
  subscription_plan: 'basic' | 'pro' | 'enterprise' | null;
  subscription_period: 'monthly' | 'yearly' | null;
  trial_ends_at: string | null;
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