/*
  # Feed System Migration

  1. New Tables
    - `feed_posts`
      - `id` (uuid, primary key)
      - `author_id` (text, references profiles or demo user ID)
      - `content` (text)
      - `media_url` (text, optional)
      - `type` (text, default 'text')
      - `visibility` (text, default 'public')
      - `edited` (boolean, default false)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `feed_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references feed_posts)
      - `user_id` (text, references profiles or demo user ID)
      - `content` (text)
      - `created_at` (timestamp)
    
    - `feed_likes`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references feed_posts)
      - `user_id` (text, references profiles or demo user ID)
      - `liked_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users and public access for demo users
    - Add indexes for performance

  3. Functions
    - Add trigger functions for updated_at timestamps
*/

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create feed_posts table
CREATE TABLE IF NOT EXISTS feed_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id text NOT NULL,
    content text NOT NULL,
    media_url text,
    type text DEFAULT 'text' CHECK (type IN ('text', 'image', 'video', 'event', 'announcement')),
    visibility text DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
    edited boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create feed_comments table
CREATE TABLE IF NOT EXISTS feed_comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES feed_posts(id) ON DELETE CASCADE,
    user_id text NOT NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create feed_likes table
CREATE TABLE IF NOT EXISTS feed_likes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES feed_posts(id) ON DELETE CASCADE,
    user_id text NOT NULL,
    liked_at timestamptz DEFAULT now(),
    UNIQUE(post_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_likes ENABLE ROW LEVEL SECURITY;

-- Policies for feed_posts
CREATE POLICY "feed_posts_read_public" ON feed_posts
    FOR SELECT USING (visibility = 'public');

CREATE POLICY "feed_posts_insert" ON feed_posts
    FOR INSERT WITH CHECK (true);

CREATE POLICY "feed_posts_update_own" ON feed_posts
    FOR UPDATE USING (author_id = COALESCE(auth.uid()::text, current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "feed_posts_delete_own" ON feed_posts
    FOR DELETE USING (author_id = COALESCE(auth.uid()::text, current_setting('request.jwt.claims', true)::json->>'sub'));

-- Policies for feed_comments
CREATE POLICY "feed_comments_read_all" ON feed_comments
    FOR SELECT USING (true);

CREATE POLICY "feed_comments_insert" ON feed_comments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "feed_comments_update_own" ON feed_comments
    FOR UPDATE USING (user_id = COALESCE(auth.uid()::text, current_setting('request.jwt.claims', true)::json->>'sub'));

CREATE POLICY "feed_comments_delete_own" ON feed_comments
    FOR DELETE USING (user_id = COALESCE(auth.uid()::text, current_setting('request.jwt.claims', true)::json->>'sub'));

-- Policies for feed_likes
CREATE POLICY "feed_likes_all" ON feed_likes
    FOR SELECT USING (true);

CREATE POLICY "feed_likes_insert" ON feed_likes
    FOR INSERT WITH CHECK (true);

CREATE POLICY "feed_likes_delete_own" ON feed_likes
    FOR DELETE USING (user_id = COALESCE(auth.uid()::text, current_setting('request.jwt.claims', true)::json->>'sub'));

-- Add triggers for updated_at
CREATE TRIGGER update_feed_posts_updated_at
    BEFORE UPDATE ON feed_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_feed_posts_author_id ON feed_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_created_at ON feed_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_posts_visibility ON feed_posts(visibility);
CREATE INDEX IF NOT EXISTS idx_feed_comments_post_id ON feed_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_feed_comments_user_id ON feed_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_likes_post_id ON feed_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_feed_likes_user_id ON feed_likes(user_id);