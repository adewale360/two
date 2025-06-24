-- Migration: Enhanced Feed and Enrollment System
-- This migration creates the social feed functionality and enrollment system

-- First, handle course duplicates safely
DO $$
BEGIN
    -- Check if courses table exists and has duplicates
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'courses') THEN
        -- Remove duplicates keeping the first occurrence
        DELETE FROM courses a USING courses b 
        WHERE a.id > b.id AND a.course_code = b.course_code;
        
        -- Add unique constraint if it doesn't exist
        IF NOT EXISTS (
            SELECT 1 FROM information_schema.table_constraints 
            WHERE constraint_name = 'courses_course_code_unique' 
            AND table_name = 'courses'
        ) THEN
            ALTER TABLE courses ADD CONSTRAINT courses_course_code_unique UNIQUE (course_code);
        END IF;
    END IF;
END $$;

-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid,
    course_id uuid,
    academic_session text NOT NULL DEFAULT '2024/2025',
    semester integer NOT NULL DEFAULT 1,
    enrollment_date timestamptz DEFAULT now()
);

-- Add foreign key constraints for enrollments
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'enrollments_student_id_fkey'
    ) THEN
        ALTER TABLE enrollments 
        ADD CONSTRAINT enrollments_student_id_fkey 
        FOREIGN KEY (student_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'enrollments_course_id_fkey'
    ) THEN
        ALTER TABLE enrollments 
        ADD CONSTRAINT enrollments_course_id_fkey 
        FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'enrollments_unique_enrollment'
    ) THEN
        ALTER TABLE enrollments 
        ADD CONSTRAINT enrollments_unique_enrollment 
        UNIQUE(student_id, course_id, academic_session, semester);
    END IF;
END $$;

-- Create user_posts table for social feed
CREATE TABLE IF NOT EXISTS user_posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id uuid,
    content text NOT NULL,
    post_type text DEFAULT 'text',
    media_url text,
    event_data jsonb,
    likes_count integer DEFAULT 0,
    comments_count integer DEFAULT 0,
    shares_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Add constraints for user_posts
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_posts_author_id_fkey'
    ) THEN
        ALTER TABLE user_posts 
        ADD CONSTRAINT user_posts_author_id_fkey 
        FOREIGN KEY (author_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'user_posts_post_type_check'
    ) THEN
        ALTER TABLE user_posts 
        ADD CONSTRAINT user_posts_post_type_check 
        CHECK (post_type IN ('text', 'image', 'video', 'event', 'announcement', 'news'));
    END IF;
END $$;

-- Create post_likes table
CREATE TABLE IF NOT EXISTS post_likes (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid,
    user_id uuid,
    created_at timestamptz DEFAULT now()
);

-- Add constraints for post_likes
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_likes_post_id_fkey'
    ) THEN
        ALTER TABLE post_likes 
        ADD CONSTRAINT post_likes_post_id_fkey 
        FOREIGN KEY (post_id) REFERENCES user_posts(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_likes_user_id_fkey'
    ) THEN
        ALTER TABLE post_likes 
        ADD CONSTRAINT post_likes_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_likes_unique_like'
    ) THEN
        ALTER TABLE post_likes 
        ADD CONSTRAINT post_likes_unique_like 
        UNIQUE(post_id, user_id);
    END IF;
END $$;

-- Create post_comments table
CREATE TABLE IF NOT EXISTS post_comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid,
    user_id uuid,
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Add constraints for post_comments
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_comments_post_id_fkey'
    ) THEN
        ALTER TABLE post_comments 
        ADD CONSTRAINT post_comments_post_id_fkey 
        FOREIGN KEY (post_id) REFERENCES user_posts(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_comments_user_id_fkey'
    ) THEN
        ALTER TABLE post_comments 
        ADD CONSTRAINT post_comments_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Create post_bookmarks table
CREATE TABLE IF NOT EXISTS post_bookmarks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid,
    user_id uuid,
    created_at timestamptz DEFAULT now()
);

-- Add constraints for post_bookmarks
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_bookmarks_post_id_fkey'
    ) THEN
        ALTER TABLE post_bookmarks 
        ADD CONSTRAINT post_bookmarks_post_id_fkey 
        FOREIGN KEY (post_id) REFERENCES user_posts(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_bookmarks_user_id_fkey'
    ) THEN
        ALTER TABLE post_bookmarks 
        ADD CONSTRAINT post_bookmarks_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'post_bookmarks_unique_bookmark'
    ) THEN
        ALTER TABLE post_bookmarks 
        ADD CONSTRAINT post_bookmarks_unique_bookmark 
        UNIQUE(post_id, user_id);
    END IF;
END $$;

-- Create user_media table
CREATE TABLE IF NOT EXISTS user_media (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid,
    media_type text NOT NULL,
    filename text NOT NULL,
    media_url text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Add constraints for user_media
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_media_user_id_fkey'
    ) THEN
        ALTER TABLE user_media 
        ADD CONSTRAINT user_media_user_id_fkey 
        FOREIGN KEY (user_id) REFERENCES profiles(id) ON DELETE CASCADE;
    END IF;
    
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.check_constraints 
        WHERE constraint_name = 'user_media_media_type_check'
    ) THEN
        ALTER TABLE user_media 
        ADD CONSTRAINT user_media_media_type_check 
        CHECK (media_type IN ('image', 'video'));
    END IF;
END $$;

-- Enable RLS on all tables
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_media ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for enrollments
DROP POLICY IF EXISTS "Students can read own enrollments" ON enrollments;
CREATE POLICY "Students can read own enrollments"
    ON enrollments FOR SELECT
    TO authenticated
    USING (student_id = auth.uid());

DROP POLICY IF EXISTS "Lecturers can read enrollments for their courses" ON enrollments;
CREATE POLICY "Lecturers can read enrollments for their courses"
    ON enrollments FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM courses
            WHERE courses.id = enrollments.course_id
            AND courses.lecturer_id = auth.uid()
        )
    );

-- Create RLS policies for user_posts
DROP POLICY IF EXISTS "Anyone can read posts" ON user_posts;
CREATE POLICY "Anyone can read posts"
    ON user_posts FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Users can create own posts" ON user_posts;
CREATE POLICY "Users can create own posts"
    ON user_posts FOR INSERT
    TO authenticated
    WITH CHECK (author_id = auth.uid());

DROP POLICY IF EXISTS "Users can update own posts" ON user_posts;
CREATE POLICY "Users can update own posts"
    ON user_posts FOR UPDATE
    TO authenticated
    USING (author_id = auth.uid());

-- Create RLS policies for post_likes
DROP POLICY IF EXISTS "Anyone can read likes" ON post_likes;
CREATE POLICY "Anyone can read likes"
    ON post_likes FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Users can manage own likes" ON post_likes;
CREATE POLICY "Users can manage own likes"
    ON post_likes FOR ALL
    TO authenticated
    USING (user_id = auth.uid());

-- Create RLS policies for post_comments
DROP POLICY IF EXISTS "Anyone can read comments" ON post_comments;
CREATE POLICY "Anyone can read comments"
    ON post_comments FOR SELECT
    TO authenticated
    USING (true);

DROP POLICY IF EXISTS "Users can create comments" ON post_comments;
CREATE POLICY "Users can create comments"
    ON post_comments FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Create RLS policies for post_bookmarks
DROP POLICY IF EXISTS "Users can manage own bookmarks" ON post_bookmarks;
CREATE POLICY "Users can manage own bookmarks"
    ON post_bookmarks FOR ALL
    TO authenticated
    USING (user_id = auth.uid());

-- Create RLS policies for user_media
DROP POLICY IF EXISTS "Users can manage own media" ON user_media;
CREATE POLICY "Users can manage own media"
    ON user_media FOR ALL
    TO authenticated
    USING (user_id = auth.uid());

-- Create utility functions
CREATE OR REPLACE FUNCTION increment_post_likes(post_id uuid, increment_by integer)
RETURNS void AS $$
BEGIN
    UPDATE user_posts 
    SET likes_count = likes_count + increment_by
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_post_comments(post_id uuid, increment_by integer)
RETURNS void AS $$
BEGIN
    UPDATE user_posts 
    SET comments_count = comments_count + increment_by
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Insert sample data safely
DO $$
DECLARE
    admin_id uuid;
    lecturer_id uuid;
    student_id uuid;
    course_id uuid;
    post_id uuid;
BEGIN
    -- Get sample user IDs
    SELECT id INTO admin_id FROM profiles WHERE role = 'admin' LIMIT 1;
    SELECT id INTO lecturer_id FROM profiles WHERE role = 'lecturer' LIMIT 1;
    SELECT id INTO student_id FROM profiles WHERE role = 'student' LIMIT 1;
    
    -- Insert sample enrollments if we have the required data
    IF admin_id IS NOT NULL AND lecturer_id IS NOT NULL AND student_id IS NOT NULL THEN
        -- Get a course
        SELECT id INTO course_id FROM courses LIMIT 1;
        
        IF course_id IS NOT NULL THEN
            -- Insert sample enrollment
            INSERT INTO enrollments (student_id, course_id, academic_session, semester)
            VALUES (student_id, course_id, '2024/2025', 1)
            ON CONFLICT (student_id, course_id, academic_session, semester) DO NOTHING;
        END IF;
        
        -- Insert sample posts
        INSERT INTO user_posts (author_id, content, post_type, likes_count, comments_count)
        VALUES 
            (admin_id, 'Welcome to the new academic year! Registration is now open for all students.', 'announcement', 45, 12),
            (lecturer_id, 'Excited to start teaching this semester. Looking forward to meeting all my students!', 'text', 23, 8),
            (student_id, 'Ready for another great semester of learning and growth!', 'text', 15, 5)
        ON CONFLICT DO NOTHING;
        
        -- Get a post ID for sample interactions
        SELECT id INTO post_id FROM user_posts LIMIT 1;
        
        IF post_id IS NOT NULL THEN
            -- Insert sample like
            INSERT INTO post_likes (post_id, user_id)
            VALUES (post_id, student_id)
            ON CONFLICT (post_id, user_id) DO NOTHING;
            
            -- Insert sample comment
            INSERT INTO post_comments (post_id, user_id, content)
            VALUES (post_id, student_id, 'Great post! Looking forward to this semester.')
            ON CONFLICT DO NOTHING;
        END IF;
    END IF;
END $$;