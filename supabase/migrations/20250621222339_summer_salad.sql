/*
  # Complete University Data Population

  1. Sample Data
    - Courses for each department
    - Sample profiles (without auth dependency)
    - News and announcements
    - Academic calendar events
  
  2. Additional Tables
    - News table for announcements
    - Academic calendar for events
  
  3. Security
    - RLS policies for all new tables
*/

-- Insert sample courses for each department
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
('BUS402', 'Capstone Project', (SELECT id FROM departments WHERE name = 'Business Administration'), 400, 2, 6, 'Final business project'),

-- Biochemistry courses
('BIO101', 'General Biology', (SELECT id FROM departments WHERE name = 'Biochemistry'), 100, 1, 3, 'Introduction to biological sciences'),
('BIO102', 'Cell Biology', (SELECT id FROM departments WHERE name = 'Biochemistry'), 100, 2, 3, 'Structure and function of cells'),
('BIO201', 'Organic Chemistry', (SELECT id FROM departments WHERE name = 'Biochemistry'), 200, 1, 3, 'Organic chemistry principles'),
('BIO202', 'Biochemistry I', (SELECT id FROM departments WHERE name = 'Biochemistry'), 200, 2, 3, 'Basic biochemical processes'),
('BIO301', 'Molecular Biology', (SELECT id FROM departments WHERE name = 'Biochemistry'), 300, 1, 3, 'Molecular mechanisms of life'),
('BIO302', 'Biochemistry II', (SELECT id FROM departments WHERE name = 'Biochemistry'), 300, 2, 3, 'Advanced biochemical concepts'),
('BIO401', 'Research Methods', (SELECT id FROM departments WHERE name = 'Biochemistry'), 400, 1, 3, 'Scientific research methodology'),
('BIO402', 'Research Project', (SELECT id FROM departments WHERE name = 'Biochemistry'), 400, 2, 6, 'Independent research project'),

-- Software Engineering courses
('SWE101', 'Introduction to Programming', (SELECT id FROM departments WHERE name = 'Software Engineering'), 100, 1, 3, 'Basic programming concepts'),
('SWE102', 'Web Development Basics', (SELECT id FROM departments WHERE name = 'Software Engineering'), 100, 2, 3, 'HTML, CSS, and JavaScript'),
('SWE201', 'Software Design', (SELECT id FROM departments WHERE name = 'Software Engineering'), 200, 1, 3, 'Software design principles'),
('SWE202', 'Database Management', (SELECT id FROM departments WHERE name = 'Software Engineering'), 200, 2, 3, 'Database design and SQL'),
('SWE301', 'Software Testing', (SELECT id FROM departments WHERE name = 'Software Engineering'), 300, 1, 3, 'Testing methodologies'),
('SWE302', 'Project Management', (SELECT id FROM departments WHERE name = 'Software Engineering'), 300, 2, 3, 'Software project management'),
('SWE401', 'Advanced Software Engineering', (SELECT id FROM departments WHERE name = 'Software Engineering'), 400, 1, 3, 'Advanced SE concepts'),
('SWE402', 'Capstone Project', (SELECT id FROM departments WHERE name = 'Software Engineering'), 400, 2, 6, 'Final software project'),

-- Estate Management courses
('EST101', 'Introduction to Estate Management', (SELECT id FROM departments WHERE name = 'Estate Management'), 100, 1, 3, 'Basic estate management concepts'),
('EST102', 'Property Law', (SELECT id FROM departments WHERE name = 'Estate Management'), 100, 2, 3, 'Legal aspects of property'),
('EST201', 'Property Valuation', (SELECT id FROM departments WHERE name = 'Estate Management'), 200, 1, 3, 'Property valuation methods'),
('EST202', 'Real Estate Finance', (SELECT id FROM departments WHERE name = 'Estate Management'), 200, 2, 3, 'Financial aspects of real estate'),
('EST301', 'Property Development', (SELECT id FROM departments WHERE name = 'Estate Management'), 300, 1, 3, 'Property development processes'),
('EST302', 'Portfolio Management', (SELECT id FROM departments WHERE name = 'Estate Management'), 300, 2, 3, 'Managing property portfolios'),
('EST401', 'Professional Practice', (SELECT id FROM departments WHERE name = 'Estate Management'), 400, 1, 3, 'Professional estate management'),
('EST402', 'Research Project', (SELECT id FROM departments WHERE name = 'Estate Management'), 400, 2, 6, 'Final research project');

-- Create news/announcements table
CREATE TABLE IF NOT EXISTS news (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    category text NOT NULL CHECK (category IN ('academic', 'event', 'announcement')),
    author_name text DEFAULT 'University Administration',
    featured boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable RLS for news table
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

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

-- Insert sample news
INSERT INTO news (title, content, category, featured, author_name) VALUES
('First Semester 2024/2025 Registration Now Open', 'Students can now register for First Semester 2024/2025 courses through the online portal. Registration deadline is September 15th, 2024. Please ensure all outstanding fees are cleared before registration.', 'academic', true, 'Academic Office'),
('Annual Research Symposium 2024', 'Join us for the Annual Research Symposium featuring presentations from our top students and faculty members. The event will showcase cutting-edge research across all faculties.', 'event', true, 'Research Office'),
('New Laboratory Equipment Installed in COPAS', 'The College of Pure and Applied Sciences has received new state-of-the-art laboratory equipment worth ₦50 million. This will enhance practical learning experiences for our students.', 'announcement', false, 'COPAS Administration'),
('Student Union Election Results Announced', 'The results of the 2024/2025 Student Union elections have been announced. Congratulations to all elected officials. The new leadership will be inaugurated next week.', 'announcement', true, 'Student Affairs'),
('Career Fair 2024 - Industry Partners Welcome', 'Our annual career fair will feature over 50 companies from various industries. Students are encouraged to prepare their CVs and attend this networking opportunity.', 'event', false, 'Career Services'),
('Mid-Semester Break Schedule', 'Mid-semester break will commence on November 15th and classes will resume on November 22nd. All students are advised to use this time for revision and preparation.', 'academic', false, 'Academic Office'),
('New Scholarship Opportunities Available', 'Several scholarship opportunities are now available for outstanding students. Applications are open until December 1st, 2024. Visit the financial aid office for more details.', 'announcement', true, 'Financial Aid Office'),
('Library Extended Hours During Exams', 'The university library will extend its operating hours during the examination period. The library will be open 24/7 from January 1st to January 15th, 2025.', 'academic', false, 'Library Services');

-- Create academic calendar table
CREATE TABLE IF NOT EXISTS academic_calendar (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    event_title text NOT NULL,
    event_date date NOT NULL,
    event_type text NOT NULL CHECK (event_type IN ('academic', 'break', 'exam')),
    description text,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS for academic calendar
ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;

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

-- Insert academic calendar events
INSERT INTO academic_calendar (event_title, event_date, event_type, description) VALUES
('Registration Deadline', '2024-09-15', 'academic', 'Last day for course registration'),
('First Semester Begins', '2024-09-22', 'academic', 'Start of first semester classes'),
('Mid-Semester Break Starts', '2024-11-15', 'break', 'Beginning of mid-semester break'),
('Mid-Semester Break Ends', '2024-11-22', 'break', 'End of mid-semester break'),
('Christmas Break Starts', '2024-12-20', 'break', 'Beginning of Christmas break'),
('Classes Resume', '2025-01-08', 'academic', 'Resumption of classes after break'),
('First Semester Exams Begin', '2025-01-10', 'exam', 'Start of first semester examinations'),
('First Semester Ends', '2025-01-15', 'academic', 'End of first semester'),
('Second Semester Begins', '2025-02-01', 'academic', 'Start of second semester'),
('Easter Break Starts', '2025-04-18', 'break', 'Beginning of Easter break'),
('Easter Break Ends', '2025-04-21', 'break', 'End of Easter break'),
('Second Semester Exams Begin', '2025-06-01', 'exam', 'Start of second semester examinations'),
('Second Semester Ends', '2025-06-15', 'academic', 'End of second semester'),
('Graduation Ceremony', '2025-07-15', 'academic', 'Annual graduation ceremony');

-- Create sample enrollments for demonstration
-- This will be populated when users actually register
CREATE TABLE IF NOT EXISTS sample_enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name text NOT NULL,
    course_code text NOT NULL,
    academic_session text DEFAULT '2024/2025',
    semester integer DEFAULT 1,
    enrollment_date timestamptz DEFAULT now()
);

-- Insert some sample enrollments for demonstration
INSERT INTO sample_enrollments (student_name, course_code) VALUES
('Demo Student 1', 'CSC101'),
('Demo Student 1', 'CSC102'),
('Demo Student 1', 'BUS101'),
('Demo Student 2', 'ARC101'),
('Demo Student 2', 'ARC102'),
('Demo Student 3', 'BIO101'),
('Demo Student 3', 'BIO102'),
('Demo Student 4', 'SWE101'),
('Demo Student 4', 'SWE102'),
('Demo Student 5', 'EST101'),
('Demo Student 5', 'EST102');

-- Create sample results for demonstration
CREATE TABLE IF NOT EXISTS sample_results (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_name text NOT NULL,
    course_code text NOT NULL,
    academic_session text DEFAULT '2024/2025',
    semester integer DEFAULT 1,
    score numeric(5,2),
    grade text,
    submitted_at timestamptz DEFAULT now()
);

-- Insert some sample results
INSERT INTO sample_results (student_name, course_code, score, grade) VALUES
('Demo Student 1', 'CSC101', 85.50, 'A'),
('Demo Student 1', 'CSC102', 78.00, 'B+'),
('Demo Student 1', 'BUS101', 92.00, 'A+'),
('Demo Student 2', 'ARC101', 88.50, 'A'),
('Demo Student 2', 'ARC102', 82.00, 'A-'),
('Demo Student 3', 'BIO101', 90.00, 'A+'),
('Demo Student 3', 'BIO102', 87.50, 'A'),
('Demo Student 4', 'SWE101', 79.00, 'B+'),
('Demo Student 4', 'SWE102', 84.00, 'A-'),
('Demo Student 5', 'EST101', 86.00, 'A'),
('Demo Student 5', 'EST102', 81.50, 'A-');

-- Create function to get department statistics
CREATE OR REPLACE FUNCTION get_department_stats()
RETURNS TABLE (
    department_name text,
    faculty_name text,
    course_count bigint,
    avg_level numeric
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        d.name as department_name,
        f.name as faculty_name,
        COUNT(c.id) as course_count,
        AVG(c.level) as avg_level
    FROM departments d
    LEFT JOIN faculties f ON d.faculty_id = f.id
    LEFT JOIN courses c ON d.id = c.department_id
    GROUP BY d.name, f.name
    ORDER BY d.name;
END;
$$ LANGUAGE plpgsql;

-- Create function to get course statistics
CREATE OR REPLACE FUNCTION get_course_stats()
RETURNS TABLE (
    course_code text,
    course_name text,
    department_name text,
    level integer,
    semester integer,
    credit_units integer
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        c.course_code,
        c.course_name,
        d.name as department_name,
        c.level,
        c.semester,
        c.credit_units
    FROM courses c
    LEFT JOIN departments d ON c.department_id = d.id
    ORDER BY c.course_code;
END;
$$ LANGUAGE plpgsql;

-- Create function to get faculty overview
CREATE OR REPLACE FUNCTION get_faculty_overview()
RETURNS TABLE (
    faculty_name text,
    faculty_full_name text,
    department_count bigint,
    course_count bigint,
    dean_name text
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        f.name as faculty_name,
        f.full_name as faculty_full_name,
        COUNT(DISTINCT d.id) as department_count,
        COUNT(DISTINCT c.id) as course_count,
        f.dean_name
    FROM faculties f
    LEFT JOIN departments d ON f.id = d.faculty_id
    LEFT JOIN courses c ON d.id = c.department_id
    GROUP BY f.id, f.name, f.full_name, f.dean_name
    ORDER BY f.name;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at trigger for news table
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_news_updated_at
    BEFORE UPDATE ON news
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();