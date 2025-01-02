export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          username: string
          first_name: string | null
          last_name: string | null
          bio: string | null
          avatar_url: string | null
          subscription_status: 'inactive' | 'active' | 'trialing' | 'canceled' | null
          subscription_plan: 'basic' | 'pro' | 'enterprise' | null
          subscription_period: 'monthly' | 'yearly' | null
          trial_ends_at: string | null
          feature_flags: {
            beta_features: boolean
            advanced_chat: boolean
            custom_themes: boolean
            [key: string]: boolean
          }
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          first_name?: string | null
          last_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          subscription_status?: 'inactive' | 'active' | 'trialing' | 'canceled' | null
          subscription_plan?: 'basic' | 'pro' | 'enterprise' | null
          subscription_period?: 'monthly' | 'yearly' | null
          trial_ends_at?: string | null
          feature_flags?: {
            beta_features?: boolean
            advanced_chat?: boolean
            custom_themes?: boolean
            [key: string]: boolean | undefined
          }
          created_at?: string
          updated_at?: string
        }
        Update: {
          username?: string
          first_name?: string | null
          last_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          subscription_status?: 'inactive' | 'active' | 'trialing' | 'canceled' | null
          subscription_plan?: 'basic' | 'pro' | 'enterprise' | null
          subscription_period?: 'monthly' | 'yearly' | null
          trial_ends_at?: string | null
          feature_flags?: {
            beta_features?: boolean
            advanced_chat?: boolean
            custom_themes?: boolean
            [key: string]: boolean | undefined
          }
          updated_at?: string
        }
      }
    }
  }
}