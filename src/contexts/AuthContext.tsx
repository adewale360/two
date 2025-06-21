import React, { createContext, useContext, useState } from 'react';

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
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'Demo User',
    email: 'demo@pineappl.edu',
    role: 'admin',
    department: 'Computer Science',
    faculty: 'COPAS'
  });
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Demo login logic
    let demoUser: User;
    
    if (email.includes('admin')) {
      demoUser = {
        id: '1',
        name: 'Admin User',
        email: 'admin@pineappl.edu',
        role: 'admin',
        department: 'Administration',
        faculty: 'COPAS'
      };
    } else if (email.includes('lecturer')) {
      demoUser = {
        id: '2',
        name: 'Dr. Sarah Wilson',
        email: 'lecturer@pineappl.edu',
        role: 'lecturer',
        department: 'Computer Science',
        faculty: 'COPAS'
      };
    } else {
      demoUser = {
        id: '3',
        name: 'John Student',
        email: 'student@pineappl.edu',
        role: 'student',
        department: 'Computer Science',
        faculty: 'COPAS'
      };
    }
    
    setUser(demoUser);
    setLoading(false);
    return { error: null };
  };

  const signUp = async (data: any) => {
    setLoading(true);
    // Simulate signup
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return { error: null };
  };

  const signOut = async () => {
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