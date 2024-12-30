/*
  # Initial Schema Setup for Discord Clone

  1. Tables
    - users (extends Supabase auth.users)
      - username
      - avatar_url
      - updated_at
    - servers
      - name
      - image_url
      - owner_id
    - channels
      - name
      - description
      - server_id
    - messages
      - content
      - user_id
      - channel_id
    - server_members
      - user_id
      - server_id
      - role

  2. Security
    - Enable RLS on all tables
    - Add policies for proper access control
*/

-- Users table extension
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT username_length CHECK (char_length(username) >= 3)
);

-- Servers table
CREATE TABLE public.servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  image_url TEXT,
  owner_id UUID REFERENCES public.users(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT name_length CHECK (char_length(name) >= 1)
);

-- Channels table
CREATE TABLE public.channels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  server_id UUID REFERENCES public.servers(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT name_length CHECK (char_length(name) >= 1)
);

-- Messages table
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  user_id UUID REFERENCES public.users(id) NOT NULL,
  channel_id UUID REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  CONSTRAINT content_length CHECK (char_length(content) >= 1)
);

-- Server members table
CREATE TABLE public.server_members (
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  server_id UUID REFERENCES public.servers(id) ON DELETE CASCADE NOT NULL,
  role TEXT NOT NULL DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  PRIMARY KEY (user_id, server_id),
  CONSTRAINT valid_role CHECK (role IN ('owner', 'admin', 'member'))
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.servers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.server_members ENABLE ROW LEVEL SECURITY;

-- Users policies
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

-- Servers policies
CREATE POLICY "Anyone can read servers"
  ON public.servers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Server members can read servers"
  ON public.servers
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.server_members
      WHERE server_members.server_id = servers.id
      AND server_members.user_id = auth.uid()
    )
  );

-- Channels policies
CREATE POLICY "Server members can read channels"
  ON public.channels
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.server_members
      WHERE server_members.server_id = channels.server_id
      AND server_members.user_id = auth.uid()
    )
  );

-- Messages policies
CREATE POLICY "Server members can read messages"
  ON public.messages
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.channels
      JOIN public.server_members ON channels.server_id = server_members.server_id
      WHERE channels.id = messages.channel_id
      AND server_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create messages in servers they belong to"
  ON public.messages
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.channels
      JOIN public.server_members ON channels.server_id = server_members.server_id
      WHERE channels.id = messages.channel_id
      AND server_members.user_id = auth.uid()
    )
  );

-- Server members policies
CREATE POLICY "Server members can see other members"
  ON public.server_members
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.server_members members
      WHERE members.server_id = server_members.server_id
      AND members.user_id = auth.uid()
    )
  );