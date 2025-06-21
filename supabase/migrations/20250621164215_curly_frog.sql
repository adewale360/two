/*
  # Authentication and User Management System

  1. New Tables
    - `profiles` - Extended user profile information
    - `faculties` - University faculties
    - `departments` - Academic departments
    - `courses` - Course information
    - `enrollments` - Student course enrollments
    - `results` - Student academic results
    - `semester_reports` - Semester-wise academic reports

  2. Security
    - Enable RLS on all tables
    - Add policies for role-based access control
    - Secure user data based on roles (admin, lecturer, student)

  3. Functions
    - Handle user role assignment
    - Automatic profile creation on signup
*/

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'lecturer', 'student');
CREATE TYPE semester_status AS ENUM ('active', 'upcoming', 'completed');

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  username text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'student',
  date_of_birth date,
  phone text,
  address text,
  faculty_id uuid,
  department_id uuid,
  matric_number text UNIQUE,
  staff_id text UNIQUE,
  bio text,
  avatar_url text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Faculties table
CREATE TABLE IF NOT EXISTS faculties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  full_name text NOT NULL,
  description text,
  dean_name text,
  dean_email text,
  dean_phone text,
  created_at timestamptz DEFAULT now()
);

-- Departments table
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  faculty_id uuid REFERENCES faculties(id) ON DELETE CASCADE,
  head_of_department text,
  created_at timestamptz DEFAULT now()
);

-- Courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_code text UNIQUE NOT NULL,
  course_name text NOT NULL,
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  lecturer_id uuid REFERENCES profiles(id),
  credit_units integer DEFAULT 3,
  level integer NOT NULL,
  semester integer NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  academic_session text NOT NULL,
  semester integer NOT NULL,
  enrollment_date timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id, academic_session, semester)
);

-- Results table
CREATE TABLE IF NOT EXISTS results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  course_id uuid REFERENCES courses(id) ON DELETE CASCADE,
  academic_session text NOT NULL,
  semester integer NOT NULL,
  score numeric(5,2),
  grade text,
  lecturer_id uuid REFERENCES profiles(id),
  submitted_at timestamptz DEFAULT now(),
  UNIQUE(student_id, course_id, academic_session, semester)
);

-- Semester reports table
CREATE TABLE IF NOT EXISTS semester_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  academic_session text NOT NULL,
  semester integer NOT NULL,
  level integer NOT NULL,
  gpa numeric(3,2),
  total_credit_units integer,
  total_grade_points numeric(6,2),
  status semester_status DEFAULT 'completed',
  created_at timestamptz DEFAULT now(),
  UNIQUE(student_id, academic_session, semester)
);

-- Insert default faculties
INSERT INTO faculties (name, full_name, description, dean_name, dean_email, dean_phone) VALUES
('COPAS', 'College of Pure and Applied Sciences', 'Welcome to Caleb University''s College of Pure and Applied Sciences, a thriving academic community dedicated to nurturing scientific curiosity, fostering innovation, and advancing knowledge in the realms of pure and applied sciences.', 'Prof. Kehinde Ogunniran', 'kehinde.ogunniran@calebuniversity.edu.ng', '07039772668'),
('COLENSMA', 'College of Environmental Sciences and Management', 'Welcome to Caleb University''s College of Environmental Sciences and Management, a hub of innovation, sustainability, and excellence in the fields of architecture, estate management, and quantity surveying.', 'Prof. Adebayo Ogundimu', 'adebayo.ogundimu@calebuniversity.edu.ng', '08012345678'),
('CASMAS', 'College of Art, Social, and Management Science', 'Welcome to Caleb University''s College of Art, Social, and Management Science, a dynamic and interdisciplinary academic community dedicated to fostering creativity, critical thinking, and professional excellence.', 'Prof. Funmi Adeyemi', 'funmi.adeyemi@calebuniversity.edu.ng', '08023456789'),
('COLAW', 'College of Law', 'Welcome to Caleb University College of Law, a vibrant and aspiring institution committed to nurturing the next generation of legal professionals.', 'Prof. Foluke Dada', 'foluke.dada@calebuniversity.edu.ng', '08034567890'),
('NURSING', 'College of Nursing and Basic Medical Sciences', 'Caleb University College of Nursing and Basic Medical Sciences stands as a beacon of excellence in healthcare education.', 'Prof. Blessing Okafor', 'blessing.okafor@calebuniversity.edu.ng', '08045678901');

-- Insert departments
INSERT INTO departments (name, faculty_id) VALUES
-- COPAS departments
('Computer Science', (SELECT id FROM faculties WHERE name = 'COPAS')),
('Biochemistry', (SELECT id FROM faculties WHERE name = 'COPAS')),
('Cyber Security', (SELECT id FROM faculties WHERE name = 'COPAS')),
('Software Engineering', (SELECT id FROM faculties WHERE name = 'COPAS')),
('Information Systems', (SELECT id FROM faculties WHERE name = 'COPAS')),
('Environmental Management and Toxicology', (SELECT id FROM faculties WHERE name = 'COPAS')),
('Industrial Chemistry', (SELECT id FROM faculties WHERE name = 'COPAS')),
('Microbiology and Industrial Biotechnology', (SELECT id FROM faculties WHERE name = 'COPAS')),

-- COLENSMA departments
('Architecture', (SELECT id FROM faculties WHERE name = 'COLENSMA')),
('Estate Management', (SELECT id FROM faculties WHERE name = 'COLENSMA')),

-- CASMAS departments
('Business Administration', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Accounting', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Economics', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Mass Communication', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Psychology', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Banking and Finance', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Criminology and Security Studies', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('International Relations', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Peace Studies and Conflict Resolution', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Political Science', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Public Administration', (SELECT id FROM faculties WHERE name = 'CASMAS')),
('Taxation', (SELECT id FROM faculties WHERE name = 'CASMAS')),

-- COLAW departments
('Public and Property Law', (SELECT id FROM faculties WHERE name = 'COLAW')),
('Private and International Law', (SELECT id FROM faculties WHERE name = 'COLAW')),

-- NURSING departments
('Maternal and Child Health Nursing', (SELECT id FROM faculties WHERE name = 'NURSING')),
('Community and Public Health Nursing', (SELECT id FROM faculties WHERE name = 'NURSING')),
('Adult Health/Medical and Surgical Nursing', (SELECT id FROM faculties WHERE name = 'NURSING')),
('Mental Health and Psychiatric Nursing', (SELECT id FROM faculties WHERE name = 'NURSING')),
('Nursing Management and Education', (SELECT id FROM faculties WHERE name = 'NURSING')),
('Human Physiology', (SELECT id FROM faculties WHERE name = 'NURSING')),
('Human Anatomy', (SELECT id FROM faculties WHERE name = 'NURSING'));

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculties ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE semester_reports ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Admins can read all profiles"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Lecturers can read student profiles in their department"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles lecturer
      WHERE lecturer.id = auth.uid() 
      AND lecturer.role = 'lecturer'
      AND lecturer.department_id = profiles.department_id
      AND profiles.role = 'student'
    )
  );

-- Faculties policies (public read)
CREATE POLICY "Anyone can read faculties"
  ON faculties
  FOR SELECT
  TO authenticated
  USING (true);

-- Departments policies (public read)
CREATE POLICY "Anyone can read departments"
  ON departments
  FOR SELECT
  TO authenticated
  USING (true);

-- Courses policies
CREATE POLICY "Anyone can read courses"
  ON courses
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Lecturers can manage their courses"
  ON courses
  FOR ALL
  TO authenticated
  USING (lecturer_id = auth.uid());

-- Enrollments policies
CREATE POLICY "Students can read own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Lecturers can read enrollments for their courses"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM courses
      WHERE courses.id = enrollments.course_id
      AND courses.lecturer_id = auth.uid()
    )
  );

-- Results policies
CREATE POLICY "Students can read own results"
  ON results
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Lecturers can manage results for their courses"
  ON results
  FOR ALL
  TO authenticated
  USING (lecturer_id = auth.uid());

-- Semester reports policies
CREATE POLICY "Students can read own semester reports"
  ON semester_reports
  FOR SELECT
  TO authenticated
  USING (student_id = auth.uid());

CREATE POLICY "Lecturers can read semester reports for students in their department"
  ON semester_reports
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles lecturer, profiles student
      WHERE lecturer.id = auth.uid() 
      AND lecturer.role = 'lecturer'
      AND student.id = semester_reports.student_id
      AND lecturer.department_id = student.department_id
    )
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for updating updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();