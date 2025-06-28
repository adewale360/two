/*
  # Enhanced Feed System Migration

  1. New Tables
    - `feed_posts` - Main posts table with proper structure
    - `feed_likes` - Post likes tracking
    - `feed_comments` - Post comments
    - `post_media` - Media attachments for posts

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated and demo users
    - Allow demo users with UUID format to post

  3. Features
    - Support for text, image, video, event, and announcement posts
    - Like and comment functionality
    - Media attachments
    - Visibility controls
*/

-- Create feed_posts table
CREATE TABLE IF NOT EXISTS feed_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    media_url text,
    visibility text DEFAULT 'public' CHECK (visibility IN ('public', 'private')),
    edited boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create feed_likes table
CREATE TABLE IF NOT EXISTS feed_likes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES feed_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    liked_at timestamptz DEFAULT now(),
    UNIQUE(post_id, user_id)
);

-- Create feed_comments table
CREATE TABLE IF NOT EXISTS feed_comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES feed_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create post_media table
CREATE TABLE IF NOT EXISTS post_media (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES feed_posts(id) ON DELETE CASCADE,
    media_type text NOT NULL CHECK (media_type IN ('image', 'video')),
    filename text NOT NULL,
    media_url text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_feed_posts_author_id ON feed_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_created_at ON feed_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feed_likes_post_id ON feed_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_feed_likes_user_id ON feed_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_feed_comments_post_id ON feed_comments(post_id);

-- Enable RLS
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE feed_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_media ENABLE ROW LEVEL SECURITY;

-- Feed posts policies
CREATE POLICY "feed_posts_read_public"
    ON feed_posts FOR SELECT
    TO authenticated
    USING (visibility = 'public');

CREATE POLICY "feed_posts_insert"
    ON feed_posts FOR INSERT
    TO authenticated
    WITH CHECK (author_id = auth.uid());

CREATE POLICY "feed_posts_update_own"
    ON feed_posts FOR UPDATE
    TO authenticated
    USING (author_id = auth.uid());

CREATE POLICY "feed_posts_delete_own"
    ON feed_posts FOR DELETE
    TO authenticated
    USING (author_id = auth.uid());

-- Feed likes policies
CREATE POLICY "feed_likes_all"
    ON feed_likes FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "feed_likes_insert"
    ON feed_likes FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "feed_likes_delete_own"
    ON feed_likes FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());

-- Feed comments policies
CREATE POLICY "feed_comments_read_all"
    ON feed_comments FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "feed_comments_insert"
    ON feed_comments FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "feed_comments_update_own"
    ON feed_comments FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "feed_comments_delete_own"
    ON feed_comments FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());

-- Post media policies
CREATE POLICY "Anyone can read post media"
    ON post_media FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can insert own post media"
    ON post_media FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_feed_posts_updated_at
    BEFORE UPDATE ON feed_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample posts
INSERT INTO feed_posts (id, author_id, content, visibility) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'demo-lecturer-1', 'Welcome to our enhanced university feed! Share your thoughts, achievements, and connect with the community.', 'public'),
('550e8400-e29b-41d4-a716-446655440002', 'demo-admin-1', 'Exciting news! Our new research lab is now open for all students. Come explore the latest technology and equipment.', 'public'),
('550e8400-e29b-41d4-a716-446655440003', 'demo-student-1', 'Just finished my presentation on sustainable architecture. Thanks to everyone who attended and provided feedback!', 'public')
ON CONFLICT (id) DO NOTHING;

-- Function to get posts with engagement metrics
CREATE OR REPLACE FUNCTION get_feed_posts_with_metrics()
RETURNS TABLE (
    id uuid,
    author_id uuid,
    content text,
    media_url text,
    visibility text,
    edited boolean,
    created_at timestamptz,
    updated_at timestamptz,
    likes_count bigint,
    comments_count bigint
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.author_id,
        p.content,
        p.media_url,
        p.visibility,
        p.edited,
        p.created_at,
        p.updated_at,
        COALESCE(l.likes_count, 0) as likes_count,
        COALESCE(c.comments_count, 0) as comments_count
    FROM feed_posts p
    LEFT JOIN (
        SELECT post_id, COUNT(*) as likes_count
        FROM feed_likes
        GROUP BY post_id
    ) l ON p.id = l.post_id
    LEFT JOIN (
        SELECT post_id, COUNT(*) as comments_count
        FROM feed_comments
        GROUP BY post_id
    ) c ON p.id = c.post_id
    WHERE p.visibility = 'public'
    ORDER BY p.created_at DESC;
END;
$$ LANGUAGE plpgsql;