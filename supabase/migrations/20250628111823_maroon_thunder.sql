/*
  # Fix signup database constraints

  1. Database Schema Updates
    - Make interests and emergency_contact columns nullable
    - Add default values where appropriate
    - Ensure all required columns have proper constraints

  2. Profile Creation
    - Update any existing triggers to handle new columns properly
    - Ensure profile creation works with the signup process
*/

-- Make interests and emergency_contact nullable if they aren't already
DO $$
BEGIN
  -- Add interests column if it doesn't exist, make it nullable
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'interests'
  ) THEN
    ALTER TABLE profiles ADD COLUMN interests text[] DEFAULT NULL;
  ELSE
    -- Make sure it's nullable
    ALTER TABLE profiles ALTER COLUMN interests DROP NOT NULL;
  END IF;

  -- Add emergency_contact column if it doesn't exist, make it nullable  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'profiles' AND column_name = 'emergency_contact'
  ) THEN
    ALTER TABLE profiles ADD COLUMN emergency_contact jsonb DEFAULT NULL;
  ELSE
    -- Make sure it's nullable
    ALTER TABLE profiles ALTER COLUMN emergency_contact DROP NOT NULL;
  END IF;
END $$;

-- Update the handle_new_user trigger function to properly handle all columns
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  -- Only insert if profile doesn't already exist
  IF NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = NEW.id) THEN
    INSERT INTO public.profiles (
      id,
      email,
      full_name,
      username,
      role,
      date_of_birth,
      phone,
      address,
      faculty_id,
      department_id,
      matric_number,
      staff_id,
      bio,
      avatar_url,
      is_verified,
      interests,
      emergency_contact
    ) VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
      COALESCE(NEW.raw_user_meta_data->>'username', ''),
      COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'),
      NULL, -- date_of_birth
      NULL, -- phone
      NULL, -- address
      NULL, -- faculty_id
      NULL, -- department_id
      NULL, -- matric_number
      NULL, -- staff_id
      NULL, -- bio
      NULL, -- avatar_url
      false, -- is_verified
      NULL, -- interests
      NULL  -- emergency_contact
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Ensure the trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();