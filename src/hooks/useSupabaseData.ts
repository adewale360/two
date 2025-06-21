import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Faculty {
  id: string;
  name: string;
  full_name: string;
  description: string | null;
  dean_name: string | null;
  dean_email: string | null;
  dean_phone: string | null;
  departments?: Department[];
}

export interface Department {
  id: string;
  name: string;
  faculty_id: string;
  head_of_department: string | null;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  role: 'admin' | 'lecturer' | 'student';
  date_of_birth: string | null;
  phone: string | null;
  address: string | null;
  faculty_id: string | null;
  department_id: string | null;
  matric_number: string | null;
  staff_id: string | null;
  bio: string | null;
  avatar_url: string | null;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  course_code: string;
  course_name: string;
  department_id: string;
  lecturer_id: string | null;
  credit_units: number;
  level: number;
  semester: number;
  description: string | null;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  category: 'academic' | 'event' | 'announcement';
  author_id: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface AcademicEvent {
  id: string;
  event_title: string;
  event_date: string;
  event_type: 'academic' | 'break' | 'exam';
  description: string | null;
}

// Custom hooks for data fetching
export const useFaculties = () => {
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const { data, error } = await supabase
          .from('faculties')
          .select(`
            *,
            departments (*)
          `);

        if (error) throw error;
        setFaculties(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFaculties();
  }, []);

  return { faculties, loading, error };
};

export const useProfiles = (role?: 'admin' | 'lecturer' | 'student') => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        let query = supabase.from('profiles').select('*');
        
        if (role) {
          query = query.eq('role', role);
        }

        const { data, error } = await query;

        if (error) throw error;
        setProfiles(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [role]);

  return { profiles, loading, error };
};

export const useCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*');

        if (error) throw error;
        setCourses(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};

export const useNews = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setNews(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const addNews = async (newsItem: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('news')
        .insert([newsItem])
        .select()
        .single();

      if (error) throw error;
      setNews(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err) {
      return { data: null, error: err instanceof Error ? err.message : 'An error occurred' };
    }
  };

  return { news, loading, error, addNews };
};

export const useAcademicCalendar = () => {
  const [events, setEvents] = useState<AcademicEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase
          .from('academic_calendar')
          .select('*')
          .order('event_date', { ascending: true });

        if (error) throw error;
        setEvents(data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};

// Helper function to get department name by ID
export const useDepartmentName = (departmentId: string | null) => {
  const [departmentName, setDepartmentName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!departmentId) {
      setLoading(false);
      return;
    }

    const fetchDepartmentName = async () => {
      try {
        const { data, error } = await supabase
          .from('departments')
          .select('name')
          .eq('id', departmentId)
          .single();

        if (error) throw error;
        setDepartmentName(data?.name || '');
      } catch (err) {
        console.error('Error fetching department name:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartmentName();
  }, [departmentId]);

  return { departmentName, loading };
};

// Helper function to get faculty name by ID
export const useFacultyName = (facultyId: string | null) => {
  const [facultyName, setFacultyName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!facultyId) {
      setLoading(false);
      return;
    }

    const fetchFacultyName = async () => {
      try {
        const { data, error } = await supabase
          .from('faculties')
          .select('name')
          .eq('id', facultyId)
          .single();

        if (error) throw error;
        setFacultyName(data?.name || '');
      } catch (err) {
        console.error('Error fetching faculty name:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyName();
  }, [facultyId]);

  return { facultyName, loading };
};