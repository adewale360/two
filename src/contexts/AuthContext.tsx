import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

type UserRole = 'student' | 'lecturer' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  faculty?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (data: any) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  switchRole: (role: UserRole) => void;
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
    // Check for existing session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        await fetchUserProfile(session.user);
      }
      setLoading(false);
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select(`
          *,
          faculties (name),
          departments (name)
        `)
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // Create a basic user object from auth data
        setUser({
          id: authUser.id,
          name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'User',
          email: authUser.email || '',
          role: 'student'
        });
        return;
      }

      setUser({
        id: profile.id,
        name: profile.full_name,
        email: profile.email,
        role: profile.role,
        department: profile.departments?.name,
        faculty: profile.faculties?.name
      });
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // For demo purposes, create a mock user based on email
      let demoUser: User;
      
      if (email.includes('admin')) {
        demoUser = {
          id: '1',
          name: 'Admin User',
          email: 'admin@university.edu',
          role: 'admin',
          department: 'Administration',
          faculty: 'Administration'
        };
      } else if (email.includes('lecturer')) {
        demoUser = {
          id: '2',
          name: 'Dr. Sarah Wilson',
          email: 'lecturer@university.edu',
          role: 'lecturer',
          department: 'Computer Science',
          faculty: 'COPAS'
        };
      } else {
        demoUser = {
          id: '3',
          name: 'John Student',
          email: 'student@university.edu',
          role: 'student',
          department: 'Computer Science',
          faculty: 'COPAS'
        };
      }
      
      setUser(demoUser);
      setLoading(false);
      return { error: null };
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };

  const signUp = async (userData: any) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            username: userData.username,
            role: userData.role,
            faculty_id: userData.faculty_id,
            department_id: userData.department_id,
            matric_number: userData.matric_number,
            staff_id: userData.staff_id,
            phone: userData.phone,
            date_of_birth: userData.date_of_birth,
            address: userData.address
          }
        }
      });

      setLoading(false);
      return { error };
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};