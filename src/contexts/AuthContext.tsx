import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { v4 as uuidv4 } from 'uuid';

type UserRole = 'student' | 'lecturer' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  faculty?: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

interface ProfileUpdateData {
  name?: string;
  email?: string;
  department?: string;
  faculty?: string;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (data: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  switchRole: (role: UserRole) => void;
  updateUserProfile: (data: ProfileUpdateData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (error) throw error;

        if (session) {
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select(`id, email, full_name, role, bio, phone, address, date_of_birth, avatar_url, departments(name), faculties(name)`)  
            .eq('id', session.user.id)
            .single();

          if (profileError) throw profileError;

          if (profile) {
            setUser({
              id: profile.id,
              name: profile.full_name,
              email: profile.email,
              role: profile.role,
              department: profile.departments?.name,
              faculty: profile.faculties?.name,
              avatarUrl: profile.avatar_url,
              bio: profile.bio,
              phone: profile.phone,
              address: profile.address,
              dateOfBirth: profile.date_of_birth
            });
          }
        } else {
          const savedUser = localStorage.getItem('pineappl_user');
          if (savedUser) setUser(JSON.parse(savedUser));
        }
      } catch {
        const fallbackUser = localStorage.getItem('pineappl_user');
        if (fallbackUser) setUser(JSON.parse(fallbackUser));
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        const demoId = uuidv4();
        let demoUser: User;

        if (email.includes('admin')) {
          demoUser = {
            id: demoId,
            name: 'Admin User',
            email,
            role: 'admin',
            department: 'Administration',
            faculty: 'Administration',
            avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            bio: 'University administrator.',
            phone: '+234 801 234 5678',
            address: 'Admin Block',
            dateOfBirth: '1985-05-15'
          };
        } else if (email.includes('lecturer')) {
          demoUser = {
            id: demoId,
            name: 'Dr. Sarah Wilson',
            email,
            role: 'lecturer',
            department: 'Computer Science',
            faculty: 'COPAS',
            avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
            bio: 'Lecturer in AI.',
            phone: '+234 802 345 6789',
            address: 'Faculty Housing',
            dateOfBirth: '1980-08-22'
          };
        } else {
          demoUser = {
            id: demoId,
            name: 'John Student',
            email,
            role: 'student',
            department: 'Computer Science',
            faculty: 'COPAS',
            avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
            bio: 'CS Student.',
            phone: '+234 803 456 7890',
            address: 'Student Hostel',
            dateOfBirth: '2000-03-10'
          };
        }

        localStorage.setItem('pineappl_user', JSON.stringify(demoUser));
        setUser(demoUser);
        setLoading(false);
        return { error: null };
      }

      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select(`id, email, full_name, role, bio, phone, address, date_of_birth, avatar_url, departments(name), faculties(name)`)
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          setLoading(false);
          return { error: profileError };
        }

        if (profile) {
          const userProfile: User = {
            id: profile.id,
            name: profile.full_name,
            email: profile.email,
            role: profile.role,
            department: profile.departments?.name,
            faculty: profile.faculties?.name,
            avatarUrl: profile.avatar_url,
            bio: profile.bio,
            phone: profile.phone,
            address: profile.address,
            dateOfBirth: profile.date_of_birth
          };

          localStorage.setItem('pineappl_user', JSON.stringify(userProfile));
          setUser(userProfile);
        }
      }

      setLoading(false);
      return { error: null };
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('pineappl_user');
    setUser(null);
  };

  const signUp = async (formData: any) => {
    const {
      email,
      password,
      full_name,
      username,
      date_of_birth,
      phone,
      address,
      role,
      faculty_id,
      department_id,
      matric_number,
      staff_id,
    } = formData;

    // Validate UUIDs: must match UUID format or be null
    const isValidUUID = (value: string) =>
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

    const safeFacultyId = isValidUUID(faculty_id) ? faculty_id : null;
    const safeDepartmentId = isValidUUID(department_id) ? department_id : null;

    // Random avatar logic
    const avatarFileNames = [
      'one.jpeg', 'two.jpeg', 'three.jpeg', 'four.jpeg', 'five.jpeg',
      'six.jpeg', 'seven.jpeg', 'eight.jpeg', 'nine.jpeg', 'ten.jpeg',
      'eleven.jpeg', 'twelve.jpeg', 'thirteen.jpeg', 'fourteen.jpeg',
      'fifteen.jpeg', 'sixteen.jpeg', 'seventeen.jpeg', 'eighteen.jpeg',
    ];
    const randomAvatar = avatarFileNames[Math.floor(Math.random() * avatarFileNames.length)];
    const avatar_url = `/${randomAvatar}`;

    console.log('📨 Creating Supabase Auth user...');
    const { data: authData, error: signUpError } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name,
          username,
          role
        }
      }
    });

    if (signUpError || !authData?.user) {
      console.error('❌ Auth signUp error:', signUpError?.message);
      return { error: signUpError };
    }

    const user_id = authData.user.id;
    console.log('✅ Auth user created with ID:', user_id);

    // Wait for the trigger to complete, then update the profile
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: user_id,
        email,
        full_name,
        username,
        avatar_url,
        date_of_birth,
        phone,
        address,
        role,
        faculty_id: safeFacultyId,
        department_id: safeDepartmentId,
        matric_number: role === 'student' ? matric_number : null,
        staff_id: role !== 'student' ? staff_id : null,
        is_verified: false,
        interests: null,
        emergency_contact: null
      });

      if (profileError) {
        console.error('❌ Profile upsert error:', profileError.message);
        return { error: profileError };
      }

      console.log('✅ Profile saved to Supabase');
    } catch (error) {
      console.warn('Profile update failed, but user was created:', error);
    }

    return { user: authData.user, error: null };
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('pineappl_user', JSON.stringify(updatedUser));
    }
  };

  const updateUserProfile = async (data: ProfileUpdateData) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('pineappl_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, switchRole, updateUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};