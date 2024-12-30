/*
  # Authentication Schema Setup

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - References auth.users
      - `username` (text, unique)
      - `avatar_url` (text, nullable)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on users table
    - Add policies for user access
*/

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can read other users"
  ON public.users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.users
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);