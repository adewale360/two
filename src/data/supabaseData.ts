import { supabase } from '../lib/supabase';
import type { Profile, Faculty, Department, Course, NewsItem } from '../hooks/useSupabaseData';

// Dashboard statistics
export const getDashboardStats = async () => {
  try {
    // Get total counts
    const [studentsResult, lecturersResult, coursesResult] = await Promise.all([
      supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'student'),
      supabase.from('profiles').select('id', { count: 'exact' }).eq('role', 'lecturer'),
      supabase.from('courses').select('id', { count: 'exact' })
    ]);

    return {
      totalStudents: studentsResult.count || 0,
      totalLecturers: lecturersResult.count || 0,
      totalCourses: coursesResult.count || 0,
      averageGPA: 3.45 // This would be calculated from actual results
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return {
      totalStudents: 0,
      totalLecturers: 0,
      totalCourses: 0,
      averageGPA: 0
    };
  }
};

// Get students by department
export const getStudentsByDepartment = async (departmentId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'student')
      .eq('department_id', departmentId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching students by department:', error);
    return [];
  }
};

// Get lecturers by department
export const getLecturersByDepartment = async (departmentId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'lecturer')
      .eq('department_id', departmentId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching lecturers by department:', error);
    return [];
  }
};

// Get courses by department
export const getCoursesByDepartment = async (departmentId: string) => {
  try {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('department_id', departmentId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching courses by department:', error);
    return [];
  }
};

// Get faculty with departments
export const getFacultyWithDepartments = async (facultyId: string) => {
  try {
    const { data, error } = await supabase
      .from('faculties')
      .select(`
        *,
        departments (*)
      `)
      .eq('id', facultyId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching faculty with departments:', error);
    return null;
  }
};

// Search profiles
export const searchProfiles = async (searchTerm: string, role?: string) => {
  try {
    let query = supabase
      .from('profiles')
      .select('*')
      .or(`full_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,username.ilike.%${searchTerm}%`);

    if (role) {
      query = query.eq('role', role);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching profiles:', error);
    return [];
  }
};

// Get profile by ID with related data
export const getProfileById = async (profileId: string) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select(`
        *,
        faculties (name, full_name),
        departments (name)
      `)
      .eq('id', profileId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching profile by ID:', error);
    return null;
  }
};

// Update profile
export const updateProfile = async (profileId: string, updates: Partial<Profile>) => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profileId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error updating profile:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Update failed' };
  }
};

// Create news item
export const createNewsItem = async (newsItem: Omit<NewsItem, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('news')
      .insert([newsItem])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error creating news item:', error);
    return { data: null, error: error instanceof Error ? error.message : 'Creation failed' };
  }
};

// Get performance data (mock for now, would be calculated from results)
export const getPerformanceData = async () => {
  // This would be calculated from actual results in the database
  return [
    { course: 'CSC401', score: 85, students: 45, semester: 'First Semester 2024' },
    { course: 'CSC301', score: 78, students: 42, semester: 'First Semester 2024' },
    { course: 'ARC301', score: 82, students: 38, semester: 'First Semester 2024' },
    { course: 'BUS301', score: 79, students: 35, semester: 'First Semester 2024' },
  ];
};

// Get semester progress data (mock for now)
export const getSemesterProgressData = async () => {
  return [
    { semester: 'First Semester 2023', gpa: 3.2 },
    { semester: 'Second Semester 2023', gpa: 2.8 },
    { semester: 'First Semester 2024', gpa: 3.6 },
    { semester: 'Second Semester 2024', gpa: 3.1 },
    { semester: 'Current', gpa: 3.8 },
  ];
};

// Get score distribution data (mock for now)
export const getScoreDistributionData = async () => {
  return [
    { name: 'A (90-100)', value: 35, fill: '#10b981' },
    { name: 'B (80-89)', value: 40, fill: '#3b82f6' },
    { name: 'C (70-79)', value: 20, fill: '#f59e0b' },
    { name: 'D (60-69)', value: 5, fill: '#ef4444' },
  ];
};

// Role-based dashboard metrics
export const getDashboardMetrics = async (userRole: string, userId?: string) => {
  const baseStats = await getDashboardStats();

  switch (userRole) {
    case 'student':
      // Get student-specific data
      return {
        ...baseStats,
        myGPA: 3.75, // Would be calculated from actual results
        myCourses: 8,
        myRank: 15,
        departmentAverage: 3.45,
        attendanceRate: 92,
        assignmentsDue: 3,
        upcomingExams: 2
      };
    
    case 'lecturer':
      // Get lecturer-specific data
      return {
        ...baseStats,
        myStudents: 120,
        myCourses: 4,
        myRating: 4.6,
        departmentStudents: 250,
        classAverage: 78,
        attendanceRate: 88,
        pendingGrades: 15,
        atRiskStudents: 5
      };
    
    case 'admin':
    default:
      return {
        ...baseStats,
        failingStudents: Math.floor(baseStats.totalStudents * 0.08),
        excellentStudents: Math.floor(baseStats.totalStudents * 0.25),
        departmentCount: 25,
        facultyCount: 5,
        passRate: 92,
        retentionRate: 96,
        graduationRate: 87
      };
  }
};