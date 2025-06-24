/*
  # Fix duplicate key errors in courses and profiles

  1. Course Management
    - Insert sample courses with ON CONFLICT handling
    - Covers Computer Science, Architecture, Business Administration, and Biochemistry
    
  2. Profile Management  
    - Insert sample lecturers with conflict resolution
    - Insert sample students with proper data generation
    
  3. Content Management
    - Create and populate news table
    - Create and populate academic calendar
    
  4. Security
    - Enable RLS on all new tables
    - Add appropriate policies for data access
    
  5. Constraints
    - Add foreign key constraints for data integrity
*/

-- Insert sample courses for each department with conflict handling
INSERT INTO courses (course_code, course_name, department_id, level, semester, credit_units, description) VALUES
-- Computer Science courses
('CSC101', 'Introduction to Computer Science', (SELECT id FROM departments WHERE name = 'Computer Science'), 100, 1, 3, 'Basic concepts of computer science'),
('CSC102', 'Programming Fundamentals', (SELECT id FROM departments WHERE name = 'Computer Science'), 100, 2, 3, 'Introduction to programming'),
('CSC201', 'Data Structures', (SELECT id FROM departments WHERE name = 'Computer Science'), 200, 1, 3, 'Data structures and algorithms'),
('CSC202', 'Object Oriented Programming', (SELECT id FROM departments WHERE name = 'Computer Science'), 200, 2, 3, 'OOP concepts and implementation'),
('CSC301', 'Database Systems', (SELECT id FROM departments WHERE name = 'Computer Science'), 300, 1, 3, 'Database design and management'),
('CSC302', 'Software Engineering', (SELECT id FROM departments WHERE name = 'Computer Science'), 300, 2, 3, 'Software development methodologies'),
('CSC401', 'Machine Learning', (SELECT id FROM departments WHERE name = 'Computer Science'), 400, 1, 3, 'Introduction to machine learning'),
('CSC402', 'Final Year Project', (SELECT id FROM departments WHERE name = 'Computer Science'), 400, 2, 6, 'Capstone project'),

-- Architecture courses
('ARC101', 'Architectural Design I', (SELECT id FROM departments WHERE name = 'Architecture'), 100, 1, 4, 'Basic architectural design principles'),
('ARC102', 'Building Construction', (SELECT id FROM departments WHERE name = 'Architecture'), 100, 2, 3, 'Construction methods and materials'),
('ARC201', 'Architectural Design II', (SELECT id FROM departments WHERE name = 'Architecture'), 200, 1, 4, 'Intermediate design concepts'),
('ARC202', 'Structural Systems', (SELECT id FROM departments WHERE name = 'Architecture'), 200, 2, 3, 'Structural engineering for architects'),
('ARC301', 'Urban Planning', (SELECT id FROM departments WHERE name = 'Architecture'), 300, 1, 3, 'City planning and development'),
('ARC302', 'Sustainable Design', (SELECT id FROM departments WHERE name = 'Architecture'), 300, 2, 3, 'Environmental design principles'),
('ARC401', 'Professional Practice', (SELECT id FROM departments WHERE name = 'Architecture'), 400, 1, 3, 'Architectural practice and ethics'),
('ARC402', 'Thesis Project', (SELECT id FROM departments WHERE name = 'Architecture'), 400, 2, 6, 'Final thesis project'),

-- Business Administration courses
('BUS101', 'Introduction to Business', (SELECT id FROM departments WHERE name = 'Business Administration'), 100, 1, 3, 'Basic business concepts'),
('BUS102', 'Business Mathematics', (SELECT id FROM departments WHERE name = 'Business Administration'), 100, 2, 3, 'Mathematical applications in business'),
('BUS201', 'Marketing Principles', (SELECT id FROM departments WHERE name = 'Business Administration'), 200, 1, 3, 'Marketing fundamentals'),
('BUS202', 'Operations Management', (SELECT id FROM departments WHERE name = 'Business Administration'), 200, 2, 3, 'Business operations and processes'),
('BUS301', 'Strategic Management', (SELECT id FROM departments WHERE name = 'Business Administration'), 300, 1, 3, 'Strategic planning and implementation'),
('BUS302', 'International Business', (SELECT id FROM departments WHERE name = 'Business Administration'), 300, 2, 3, 'Global business practices'),
('BUS401', 'Business Ethics', (SELECT id FROM departments WHERE name = 'Business Administration'), 400, 1, 3, 'Ethical considerations in business'),
('BUS402', 'Capstone Project', (SELECT id FROM departments WHERE name = 'Business Administration'), 400, 2, 6, 'Final business project')
ON CONFLICT (course_code) 
DO UPDATE SET
  course_name = EXCLUDED.course_name,
  department_id = EXCLUDED.department_id,
  level = EXCLUDED.level,
  semester = EXCLUDED.semester,
  credit_units = EXCLUDED.credit_units,
  description = EXCLUDED.description;

-- Insert sample lecturers with conflict handling
INSERT INTO profiles (id, email, full_name, username, role, faculty_id, department_id, staff_id, bio, is_verified) VALUES
(gen_random_uuid(), 'sarah.wilson@university.edu', 'Dr. Sarah Wilson', 'swilson', 'lecturer', 
 (SELECT id FROM faculties WHERE name = 'COPAS'), 
 (SELECT id FROM departments WHERE name = 'Computer Science'), 
 'STAFF001', 'Expert in Machine Learning and AI', true),

(gen_random_uuid(), 'michael.brown@university.edu', 'Prof. Michael Brown', 'mbrown', 'lecturer',
 (SELECT id FROM faculties WHERE name = 'COLENSMA'),
 (SELECT id FROM departments WHERE name = 'Architecture'),
 'STAFF002', 'Sustainable architecture specialist', true),

(gen_random_uuid(), 'emily.chen@university.edu', 'Dr. Emily Chen', 'echen', 'lecturer',
 (SELECT id FROM faculties WHERE name = 'COPAS'),
 (SELECT id FROM departments WHERE name = 'Biochemistry'),
 'STAFF003', 'Biochemistry and molecular biology researcher', true),

(gen_random_uuid(), 'james.taylor@university.edu', 'Prof. James Taylor', 'jtaylor', 'lecturer',
 (SELECT id FROM faculties WHERE name = 'CASMAS'),
 (SELECT id FROM departments WHERE name = 'Business Administration'),
 'STAFF004', 'Business strategy and management expert', true)
ON CONFLICT (email) 
DO UPDATE SET
  full_name = EXCLUDED.full_name,
  username = EXCLUDED.username,
  role = EXCLUDED.role,
  faculty_id = EXCLUDED.faculty_id,
  department_id = EXCLUDED.department_id,
  staff_id = EXCLUDED.staff_id,
  bio = EXCLUDED.bio,
  is_verified = EXCLUDED.is_verified;

-- Insert sample students (first 50 for demonstration)
DO $$
DECLARE
    student_names text[] := ARRAY[
        'Adebayo Johnson', 'Chioma Okwu', 'Kemi Adebayo', 'Tunde Olatunji', 'Ngozi Eze',
        'Emeka Nwosu', 'Funmi Adeyemi', 'Segun Oladele', 'Blessing Okafor', 'Chidi Okonkwo',
        'Aisha Mohammed', 'Babatunde Lawal', 'Folake Dada', 'Ibrahim Hassan', 'Grace Onyeka',
        'David Okoro', 'Patience Udoh', 'Samuel Igwe', 'Mary Nnamdi', 'Victor Eze',
        'Zainab Bello', 'Peter Obi', 'Ruth Adamu', 'James Okeke', 'Esther Musa',
        'Akeem Salami', 'Amara Chukwu', 'Ayo Fashola', 'Ebere Nwachukwu', 'Ifeanyi Okafor',
        'Lola Bankole', 'Mohammed Umar', 'Nneka Obiora', 'Olumide Ajayi', 'Temitope Alabi',
        'Uche Okwu', 'Yemi Adebola', 'Adunni Ogbonna', 'Chinyere Ike', 'Damilola Oni',
        'Ejike Ndubuisi', 'Funmilayo Sanni', 'Godwin Bassey', 'Halima Yakubu', 'Innocent Udo',
        'Juliana Okoye', 'Kingsley Agu', 'Latifa Garba', 'Miracle Eze', 'Nkem Okoro'
    ];
    departments_list text[] := ARRAY[
        'Computer Science', 'Architecture', 'Business Administration', 'Biochemistry',
        'Software Engineering', 'Estate Management', 'Accounting', 'Economics'
    ];
    levels_list integer[] := ARRAY[100, 200, 300, 400];
    i integer;
    dept_name text;
    level_val integer;
    faculty_id_val uuid;
    dept_id_val uuid;
    student_id_val uuid;
    matric_num text;
    student_email text;
    student_username text;
    existing_count integer;
BEGIN
    FOR i IN 1..50 LOOP
        -- Select random department and level
        dept_name := departments_list[1 + (i - 1) % array_length(departments_list, 1)];
        level_val := levels_list[1 + (i - 1) % array_length(levels_list, 1)];
        
        -- Get faculty and department IDs
        SELECT f.id, d.id INTO faculty_id_val, dept_id_val
        FROM departments d
        JOIN faculties f ON d.faculty_id = f.id
        WHERE d.name = dept_name;
        
        -- Generate unique identifiers
        matric_num := 'STU2021' || LPAD(i::text, 3, '0');
        student_email := LOWER(REPLACE(student_names[i], ' ', '.')) || '@student.university.edu';
        student_username := LOWER(REPLACE(student_names[i], ' ', ''));
        
        -- Check if student already exists
        SELECT COUNT(*) INTO existing_count
        FROM profiles 
        WHERE email = student_email OR matric_number = matric_num;
        
        -- Only insert if student doesn't exist
        IF existing_count = 0 THEN
            student_id_val := gen_random_uuid();
            INSERT INTO profiles (
                id, email, full_name, username, role, faculty_id, department_id, 
                matric_number, bio, date_of_birth, phone
            ) VALUES (
                student_id_val,
                student_email,
                student_names[i],
                student_username,
                'student',
                faculty_id_val,
                dept_id_val,
                matric_num,
                'Dedicated student pursuing excellence in ' || dept_name,
                '2000-01-01'::date + (i || ' days')::interval,
                '+234' || (8000000000 + i)::text
            );
        END IF;
    END LOOP;
END $$;

-- Create news/announcements table if not exists
CREATE TABLE IF NOT EXISTS news (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    category text NOT NULL CHECK (category IN ('academic', 'event', 'announcement')),
    author_name text DEFAULT 'University Administration',
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    media_url text
);

-- Insert sample news with conflict handling
INSERT INTO news (title, content, category, featured) VALUES
('First Semester 2024/2025 Registration Now Open', 'Students can now register for First Semester 2024/2025 courses through the online portal. Registration deadline is September 15th, 2024.', 'academic', true),
('Annual Research Symposium 2024', 'Join us for the Annual Research Symposium featuring presentations from our top students and faculty members.', 'event', true),
('New Laboratory Equipment Installed in COPAS', 'The College of Pure and Applied Sciences has received new state-of-the-art laboratory equipment.', 'announcement', false),
('Student Union Election Results Announced', 'The results of the 2024/2025 Student Union elections have been announced. Congratulations to all elected officials.', 'announcement', true),
('Career Fair 2024 - Industry Partners Welcome', 'Our annual career fair will feature over 50 companies from various industries.', 'event', false)
ON CONFLICT (title) DO NOTHING;

-- Create academic calendar table if not exists
CREATE TABLE IF NOT EXISTS academic_calendar (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_title text NOT NULL,
    event_date date NOT NULL,
    event_type text NOT NULL CHECK (event_type IN ('academic', 'break', 'exam')),
    description text,
    created_at timestamptz DEFAULT now()
);

-- Insert academic calendar events with conflict handling
INSERT INTO academic_calendar (event_title, event_date, event_type, description) VALUES
('Registration Deadline', '2024-09-15', 'academic', 'Last day for course registration'),
('First Semester Begins', '2024-09-22', 'academic', 'Start of first semester classes'),
('Mid-Semester Break Starts', '2024-11-15', 'break', 'Beginning of mid-semester break'),
('Mid-Semester Break Ends', '2024-11-22', 'break', 'End of mid-semester break'),
('Christmas Break Starts', '2024-12-20', 'break', 'Beginning of Christmas break'),
('Classes Resume', '2025-01-08', 'academic', 'Resumption of classes after break'),
('First Semester Ends', '2025-01-15', 'academic', 'End of first semester'),
('Second Semester Begins', '2025-02-01', 'academic', 'Start of second semester')
ON CONFLICT (event_title, event_date) DO NOTHING;

-- Enable RLS for new tables
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;

-- News policies
CREATE POLICY "Anyone can read news"
    ON news
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage news"
    ON news
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Academic calendar policies
CREATE POLICY "Anyone can read academic calendar"
    ON academic_calendar
    FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Admins can manage academic calendar"
    ON academic_calendar
    FOR ALL
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Add foreign key constraints if they don't exist
DO $$
BEGIN
    -- Add faculty foreign key constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_faculty_id_fkey'
    ) THEN
        ALTER TABLE profiles 
        ADD CONSTRAINT profiles_faculty_id_fkey 
        FOREIGN KEY (faculty_id) REFERENCES faculties(id);
    END IF;

    -- Add department foreign key constraint if it doesn't exist
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'profiles_department_id_fkey'
    ) THEN
        ALTER TABLE profiles 
        ADD CONSTRAINT profiles_department_id_fkey 
        FOREIGN KEY (department_id) REFERENCES departments(id);
    END IF;
END $$;