import React, { createContext, useContext, useState, useEffect } from 'react';

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
  const [loading, setLoading] = useState(false);

  // Check for existing session on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('pineappl_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('pineappl_user');
      }
    }
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Demo authentication - accept any email/password combination
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
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };

  const signUp = async (userData: any) => {
    setLoading(true);
    
    try {
      // Demo signup - create user based on form data
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
    } catch (error) {
      setLoading(false);
      return { error };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('pineappl_user');
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role };
      setUser(updatedUser);
      localStorage.setItem('pineappl_user', JSON.stringify(updatedUser));
    }
  };

  const updateUserProfile = (data: ProfileUpdateData) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
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