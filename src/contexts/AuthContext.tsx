import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

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
  switchRole?: (role: UserRole) => void;
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

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check for Supabase session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking session:', error);
          throw error;
        }
        
        if (session) {
          // Get user profile from Supabase
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select(`
              id, 
              email, 
              full_name, 
              role, 
              bio, 
              phone, 
              address, 
              date_of_birth, 
              avatar_url,
              departments(name),
              faculties(name)
            `)
            .eq('id', session.user.id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            throw profileError;
          }
          
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
          // Fallback to localStorage for demo
          const savedUser = localStorage.getItem('pineappl_user');
          if (savedUser) {
            try {
              setUser(JSON.parse(savedUser));
            } catch (error) {
              localStorage.removeItem('pineappl_user');
            }
          }
        }
      } catch (error) {
        console.error('Session check error:', error);
        // Fallback to localStorage
        const savedUser = localStorage.getItem('pineappl_user');
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (error) {
            localStorage.removeItem('pineappl_user');
          }
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkSession();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Try Supabase authentication first
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.log('Supabase auth error, using demo mode:', error);
        
        // Demo authentication fallback
        let demoUser: User;
        
        if (email.includes('admin') || email === 'admin@pineappl.edu') {
          demoUser = {
            id: '1',
            name: 'Admin User',
            email: email,
            role: 'admin',
            department: 'Administration',
            faculty: 'Administration',
            avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
            bio: 'University administrator responsible for system management and oversight.',
            phone: '+234 801 234 5678',
            address: 'Admin Block, University Campus',
            dateOfBirth: '1985-05-15'
          };
        } else if (email.includes('lecturer') || email === 'lecturer@pineappl.edu') {
          demoUser = {
            id: '2',
            name: 'Dr. Sarah Wilson',
            email: email,
            role: 'lecturer',
            department: 'Computer Science',
            faculty: 'COPAS',
            avatarUrl: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg',
            bio: 'Computer Science professor specializing in artificial intelligence and machine learning.',
            phone: '+234 802 345 6789',
            address: 'Faculty Housing, University Campus',
            dateOfBirth: '1980-08-22'
          };
        } else {
          demoUser = {
            id: '3',
            name: 'John Student',
            email: email,
            role: 'student',
            department: 'Computer Science',
            faculty: 'COPAS',
            avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
            bio: 'Computer Science student passionate about software development and AI.',
            phone: '+234 803 456 7890',
            address: 'Student Hostel, University Campus',
            dateOfBirth: '2000-03-10'
          };
        }
        
        // Save to localStorage for persistence
        localStorage.setItem('pineappl_user', JSON.stringify(demoUser));
        setUser(demoUser);
        setLoading(false);
        return { error: null };
      }
      
      // If Supabase auth successful, get user profile
      if (data.user) {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select(`
            id, 
            email, 
            full_name, 
            role, 
            bio, 
            phone, 
            address, 
            date_of_birth, 
            avatar_url,
            departments(name),
            faculties(name)
          `)
          .eq('id', data.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile:', profileError);
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
          
          // Save to localStorage for persistence
          localStorage.setItem('pineappl_user', JSON.stringify(userProfile));
          setUser(userProfile);
          setLoading(false);
          return { error: null };
        }
      }
      
      setLoading(false);
      return { error: 'Failed to get user profile' };
    } catch (error) {
      console.error('Sign in error:', error);
      setLoading(false);
      return { error };
    }
  };

  const signUp = async (userData: any) => {
    setLoading(true);
    
    try {
      // Try Supabase signup first
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            full_name: userData.full_name,
            role: userData.role
          }
        }
      });
      
      if (error) {
        console.log('Supabase signup error, using demo mode:', error);
        
        // Demo signup fallback
        const newUser: User = {
          id: Date.now().toString(),
          name: userData.full_name,
          email: userData.email,
          role: userData.role,
          department: userData.department_name || 'Computer Science',
          faculty: userData.faculty_name || 'COPAS',
          avatarUrl: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg',
          bio: 'New user on the platform',
          phone: userData.phone || '',
          address: userData.address || '',
          dateOfBirth: userData.date_of_birth || ''
        };

        // Save to localStorage
        localStorage.setItem('pineappl_user', JSON.stringify(newUser));
        setUser(newUser);
        setLoading(false);
        return { error: null };
      }
      
      // If Supabase signup successful
      if (data.user) {
        // The trigger function should create the profile automatically
        // We'll wait a moment to ensure it's created
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the created profile
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select(`
            id, 
            email, 
            full_name, 
            role, 
            bio, 
            phone, 
            address, 
            date_of_birth, 
            avatar_url,
            departments(name),
            faculties(name)
          `)
          .eq('id', data.user.id)
          .single();
        
        if (profileError) {
          console.error('Error fetching profile after signup:', profileError);
          setLoading(false);
          return { error: profileError };
        }
        
        if (profile) {
          // Update profile with additional information
          const { error: updateError } = await supabase
            .from('profiles')
            .update({
              department_id: userData.department_id,
              faculty_id: userData.faculty_id,
              phone: userData.phone,
              address: userData.address,
              date_of_birth: userData.date_of_birth,
              matric_number: userData.role === 'student' ? userData.matric_number : null,
              staff_id: userData.role !== 'student' ? userData.staff_id : null
            })
            .eq('id', data.user.id);
          
          if (updateError) {
            console.error('Error updating profile:', updateError);
          }
          
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
          
          // Save to localStorage for persistence
          localStorage.setItem('pineappl_user', JSON.stringify(userProfile));
          setUser(userProfile);
        }
      }
      
      setLoading(false);
      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      setLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Try Supabase signout
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out from Supabase:', error);
    }
    
    // Always clear localStorage
    localStorage.removeItem('pineappl_user');
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      
      // Update in Supabase if possible
      if (supabase) {
        supabase
          .from('profiles')
          .update({ role })
          .eq('id', user.id)
          .then(({ error }) => {
            if (error) {
              console.error('Error updating role in Supabase:', error);
            }
          });
      }
      
      // Always update localStorage for demo
      localStorage.setItem('pineappl_user', JSON.stringify(updatedUser));
    }
  };

  const updateUserProfile = async (data: ProfileUpdateData) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Try to update in Supabase
      if (supabase) {
        const updateData: any = {};
        
        // Map frontend field names to database field names
        if (data.name) updateData.full_name = data.name;
        if (data.email) updateData.email = data.email;
        if (data.bio) updateData.bio = data.bio;
        if (data.phone) updateData.phone = data.phone;
        if (data.address) updateData.address = data.address;
        if (data.dateOfBirth) updateData.date_of_birth = data.dateOfBirth;
        if (data.avatarUrl) updateData.avatar_url = data.avatarUrl;
        
        // If we have an avatar URL and it's a data URL (newly uploaded)
        if (data.avatarUrl && data.avatarUrl.startsWith('data:')) {
          try {
            // In a real app, we would upload to storage here
            // For demo, we'll just use the data URL directly
            updateData.avatar_url = data.avatarUrl;
            
            // In a real implementation with Supabase storage:
            /*
            const fileName = `avatar-${user.id}-${Date.now()}.jpg`;
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from('avatars')
              .upload(fileName, decode(data.avatarUrl.split(',')[1]), {
                contentType: 'image/jpeg'
              });
              
            if (uploadError) throw uploadError;
            
            const { data: urlData } = supabase.storage
              .from('avatars')
              .getPublicUrl(fileName);
              
            updateData.avatar_url = urlData.publicUrl;
            */
          } catch (error) {
            console.error('Error uploading avatar:', error);
          }
        }
        
        // Update profile in Supabase
        const { error } = await supabase
          .from('profiles')
          .update(updateData)
          .eq('id', user.id);
        
        if (error) {
          console.error('Error updating profile in Supabase:', error);
        }
      }
      
      // Always update localStorage for demo
      localStorage.setItem('pineappl_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      switchRole,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};