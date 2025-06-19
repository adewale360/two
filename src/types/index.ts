export interface Student {
  id: string;
  name: string;
  email: string;
  studentId: string;
  department: string;
  faculty: string;
  level: string;
  semester: number;
  gpa: number;
  courses: CourseGrade[];
  semesterReports?: SemesterReport[];
}

export interface SemesterReport {
  semester: number;
  semesterName: string;
  gpa: number;
  courses: {
    courseCode: string;
    courseName: string;
    grade: string;
    score: number;
  }[];
}

export interface Lecturer {
  id: string;
  name: string;
  email: string;
  staffId: string;
  department: string;
  faculty: string;
  courses: string[];
  rating: number;
  studentsCount: number;
}

export interface CourseGrade {
  courseCode: string;
  courseName: string;
  grade: string;
  score: number;
  semester: number;
  level: number;
}

export interface Department {
  id: string;
  name: string;
  faculty: string;
  studentCount: number;
  lecturerCount: number;
  averageGpa: number;
}

export interface Faculty {
  id: string;
  name: string;
  fullName: string;
  description: string;
  dean: {
    name: string;
    email: string;
    phone: string;
  };
  departments: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'academic' | 'event' | 'announcement';
  featured: boolean;
}

export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'academic' | 'event' | 'announcement' | 'achievement';
  author: string;
}

export interface PerformanceData {
  course: string;
  score: number;
  students: number;
  semester: string;
}

export interface AcademicCalendar {
  currentSemester: string;
  currentSession: string;
  semesters: {
    id: string;
    name: string;
    startDate: string;
    endDate: string;
    status: 'active' | 'upcoming' | 'completed';
  }[];
  events: {
    date: string;
    title: string;
    type: 'academic' | 'break' | 'exam';
  }[];
}