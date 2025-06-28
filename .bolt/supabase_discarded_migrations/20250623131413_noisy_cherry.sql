/*
  # Complete Database Migration for University System

  1. New Tables
    - `user_posts` - Social feed posts
    - `post_comments` - Comments on posts
    - `post_likes` - Post likes tracking
    - `post_bookmarks` - Saved/bookmarked posts
    - `user_media` - User uploaded media (avatars, post images)
  
  2. Additional Fields
    - Added more profile fields to store user preferences and details
  
  3. Security
    - RLS policies for all new tables
    - Proper foreign key constraints
*/

-- Create user_posts table for social feed
CREATE TABLE IF NOT EXISTS user_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    post_type text DEFAULT 'text' CHECK (post_type IN ('text', 'image', 'video', 'event', 'announcement', 'news')),
    media_url text,
    event_data jsonb,
    likes_count integer DEFAULT 0,
    comments_count integer DEFAULT 0,
    shares_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create post_comments table
CREATE TABLE IF NOT EXISTS post_comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES user_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES user_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(post_id, user_id)
);

-- Create post_bookmarks table
CREATE TABLE IF NOT EXISTS post_bookmarks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES user_posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    created_at timestamptz DEFAULT now(),
    UNIQUE(post_id, user_id)
);

-- Create user_media table for avatars and other media
CREATE TABLE IF NOT EXISTS user_media (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
    media_type text NOT NULL CHECK (media_type IN ('avatar', 'post_image', 'post_video', 'document')),
    filename text NOT NULL,
    media_url text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Add additional fields to profiles table if they don't exist
DO $$
BEGIN
    -- Add bio field if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'bio') THEN
        ALTER TABLE profiles ADD COLUMN bio text;
    END IF;

    -- Add phone field if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'phone') THEN
        ALTER TABLE profiles ADD COLUMN phone text;
    END IF;

    -- Add address field if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'address') THEN
        ALTER TABLE profiles ADD COLUMN address text;
    END IF;

    -- Add date_of_birth field if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'date_of_birth') THEN
        ALTER TABLE profiles ADD COLUMN date_of_birth date;
    END IF;

    -- Add interests field if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'interests') THEN
        ALTER TABLE profiles ADD COLUMN interests text[];
    END IF;

    -- Add emergency_contact field if it doesn't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'profiles' AND column_name = 'emergency_contact') THEN
        ALTER TABLE profiles ADD COLUMN emergency_contact jsonb;
    END IF;
END $$;

-- Enable RLS for all new tables
ALTER TABLE user_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_media ENABLE ROW LEVEL SECURITY;

-- User posts policies
CREATE POLICY "Anyone can read posts"
    ON user_posts
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can create own posts"
    ON user_posts
    FOR INSERT
    TO authenticated
    WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own posts"
    ON user_posts
    FOR UPDATE
    TO authenticated
    USING (author_id = auth.uid());

CREATE POLICY "Users can delete own posts"
    ON user_posts
    FOR DELETE
    TO authenticated
    USING (author_id = auth.uid());

-- Post comments policies
CREATE POLICY "Anyone can read comments"
    ON post_comments
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can create own comments"
    ON post_comments
    FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own comments"
    ON post_comments
    FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can delete own comments"
    ON post_comments
    FOR DELETE
    TO authenticated
    USING (user_id = auth.uid());

-- Post likes policies
CREATE POLICY "Anyone can read likes"
    ON post_likes
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Users can manage own likes"
    ON post_likes
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- Post bookmarks policies
CREATE POLICY "Users can read own bookmarks"
    ON post_bookmarks
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own bookmarks"
    ON post_bookmarks
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

-- User media policies
CREATE POLICY "Users can read own media"
    ON user_media
    FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage own media"
    ON user_media
    FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Anyone can read avatar media"
    ON user_media
    FOR SELECT
    TO authenticated
    USING (media_type = 'avatar');

-- Create trigger function for updating updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger for user_posts table
CREATE TRIGGER update_user_posts_updated_at
    BEFORE UPDATE ON user_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample posts
INSERT INTO user_posts (author_id, content, post_type, likes_count, comments_count, shares_count)
SELECT 
    p.id,
    CASE 
        WHEN p.role = 'lecturer' THEN 'Excited to announce that our Machine Learning research paper has been accepted for publication in the International Journal of AI! This is a collaborative effort with our brilliant students. #Research #MachineLearning #ProudMoment'
        WHEN p.role = 'admin' THEN 'Join us for the Annual Tech Innovation Fair! Showcase your projects, network with industry professionals, and compete for amazing prizes.'
        ELSE 'Just completed my final year project on blockchain-based voting systems! Special thanks to my supervisor for guidance throughout this journey. The future of secure digital democracy looks promising! 🚀'
    END,
    'text',
    FLOOR(RANDOM() * 100 + 10)::integer,
    FLOOR(RANDOM() * 30 + 5)::integer,
    FLOOR(RANDOM() * 20 + 2)::integer
FROM profiles p
WHERE p.role IN ('lecturer', 'admin', 'student')
LIMIT 10;

-- Insert sample event post
INSERT INTO user_posts (author_id, content, post_type, event_data, likes_count, comments_count, shares_count)
SELECT 
    p.id,
    'Join us for the Annual Tech Innovation Fair! Showcase your projects, network with industry professionals, and compete for amazing prizes.',
    'event',
    jsonb_build_object(
        'title', 'Annual Tech Innovation Fair',
        'date', 'December 15, 2024',
        'location', 'Main Auditorium',
        'attendees', 245
    ),
    128,
    34,
    67
FROM profiles p
WHERE p.role = 'admin'
LIMIT 1;

-- Insert sample image post
INSERT INTO user_posts (author_id, content, post_type, media_url, likes_count, comments_count, shares_count)
SELECT 
    p.id,
    'Our students'' sustainable architecture designs are truly inspiring! Here are some highlights from this semester''s final presentations. The creativity and environmental consciousness shown is remarkable.',
    'image',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg',
    67,
    18,
    22
FROM profiles p
WHERE p.role = 'lecturer' AND p.department_id = (SELECT id FROM departments WHERE name = 'Architecture')
LIMIT 1;

-- Insert sample comments
INSERT INTO post_comments (post_id, user_id, content)
SELECT 
    p.id,
    (SELECT id FROM profiles WHERE role = 'student' LIMIT 1),
    'Congratulations on the publication! Looking forward to reading it.'
FROM user_posts p
WHERE p.post_type = 'text'
LIMIT 1;

INSERT INTO post_comments (post_id, user_id, content)
SELECT 
    p.id,
    (SELECT id FROM profiles WHERE role = 'lecturer' AND id != p.author_id LIMIT 1),
    'This is a significant achievement! Well done to you and your students.'
FROM user_posts p
WHERE p.post_type = 'text'
LIMIT 1;

-- Create function to get posts with likes and bookmarks for a user
CREATE OR REPLACE FUNCTION get_posts_with_user_interactions(user_id uuid)
RETURNS TABLE (
    id uuid,
    author_id uuid,
    author_name text,
    author_role text,
    author_department text,
    author_avatar text,
    content text,
    post_type text,
    media_url text,
    event_data jsonb,
    likes_count integer,
    comments_count integer,
    shares_count integer,
    is_liked boolean,
    is_bookmarked boolean,
    created_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.author_id,
        prof.full_name as author_name,
        prof.role as author_role,
        d.name as author_department,
        (SELECT media_url FROM user_media WHERE user_id = prof.id AND media_type = 'avatar' ORDER BY created_at DESC LIMIT 1) as author_avatar,
        p.content,
        p.post_type,
        p.media_url,
        p.event_data,
        p.likes_count,
        p.comments_count,
        p.shares_count,
        EXISTS (SELECT 1 FROM post_likes WHERE post_id = p.id AND user_id = get_posts_with_user_interactions.user_id) as is_liked,
        EXISTS (SELECT 1 FROM post_bookmarks WHERE post_id = p.id AND user_id = get_posts_with_user_interactions.user_id) as is_bookmarked,
        p.created_at
    FROM 
        user_posts p
    JOIN 
        profiles prof ON p.author_id = prof.id
    LEFT JOIN
        departments d ON prof.department_id = d.id
    ORDER BY 
        p.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Create function to get comments for a post
CREATE OR REPLACE FUNCTION get_post_comments(post_id uuid)
RETURNS TABLE (
    id uuid,
    user_id uuid,
    author_name text,
    author_role text,
    author_avatar text,
    content text,
    created_at timestamptz
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.id,
        c.user_id,
        p.full_name as author_name,
        p.role as author_role,
        (SELECT media_url FROM user_media WHERE user_id = p.id AND media_type = 'avatar' ORDER BY created_at DESC LIMIT 1) as author_avatar,
        c.content,
        c.created_at
    FROM 
        post_comments c
    JOIN 
        profiles p ON c.user_id = p.id
    WHERE 
        c.post_id = get_post_comments.post_id
    ORDER BY 
        c.created_at ASC;
END;
$$ LANGUAGE plpgsql;