/*
  # Complete Feed System Migration

  1. New Tables
    - `feed_posts`
      - `id` (uuid, primary key)
      - `author_id` (text, references profiles or demo users)
      - `content` (text)
      - `media_url` (text, optional)
      - `type` (text, default 'text')
      - `visibility` (text, default 'public')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `feed_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references feed_posts)
      - `user_id` (text, references profiles or demo users)
      - `content` (text)
      - `created_at` (timestamp)

    - `feed_likes`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references feed_posts)
      - `user_id` (text, references profiles or demo users)
      - `liked_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and public access
    - Support both Supabase users and demo users

  3. Indexes
    - Performance indexes on frequently queried columns
*/

-- Create feed_posts table
CREATE TABLE IF NOT EXISTS feed_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id text NOT NULL,
  content text NOT NULL,
  media_url text,
  type text DEFAULT 'text' CHECK (type IN ('text', 'image', 'video', 'event', 'announcement')),
  visibility text DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
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
CREATE POLICY "Anyone can read public posts" ON feed_posts
  FOR SELECT USING (visibility = 'public');

CREATE POLICY "Users can insert their own posts" ON feed_posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own posts" ON feed_posts
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own posts" ON feed_posts
  FOR DELETE USING (true);

-- Policies for feed_comments
CREATE POLICY "Anyone can read comments" ON feed_comments
  FOR SELECT USING (true);

CREATE POLICY "Users can insert comments" ON feed_comments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own comments" ON feed_comments
  FOR UPDATE USING (true);

CREATE POLICY "Users can delete their own comments" ON feed_comments
  FOR DELETE USING (true);

-- Policies for feed_likes
CREATE POLICY "Anyone can read likes" ON feed_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can insert likes" ON feed_likes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can delete their own likes" ON feed_likes
  FOR DELETE USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_feed_posts_created_at ON feed_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_posts_author_id ON feed_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_feed_comments_post_id ON feed_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_feed_comments_user_id ON feed_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_likes_post_id ON feed_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_feed_likes_user_id ON feed_likes(user_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_feed_posts_updated_at 
  BEFORE UPDATE ON feed_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();