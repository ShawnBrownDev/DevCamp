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
          avatar_url: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          username: string
          avatar_url?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          username?: string
          avatar_url?: string | null
          updated_at?: string | null
        }
      }
    }
  }
}