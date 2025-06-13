import { Student, Lecturer, Department, NewsItem, PerformanceData } from '../types';

// Generate 40 students with diverse data
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@university.edu',
    studentId: 'CS2021001',
    department: 'Computer Science',
    faculty: 'Engineering',
    level: 400,
    semester: 8,
    gpa: 4.85,
    courses: [
      { courseCode: 'CS401', courseName: 'Advanced Algorithms', grade: 'A', score: 95, semester: 8, level: 400 },
      { courseCode: 'CS402', courseName: 'Machine Learning', grade: 'A', score: 92, semester: 8, level: 400 },
      { courseCode: 'CS403', courseName: 'Software Engineering', grade: 'A+', score: 98, semester: 8, level: 400 },
    ]
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@university.edu',
    studentId: 'EE2021002',
    department: 'Electrical Engineering',
    faculty: 'Engineering',
    level: 300,
    semester: 6,
    gpa: 4.12,
    courses: [
      { courseCode: 'EE301', courseName: 'Digital Systems', grade: 'B+', score: 85, semester: 6, level: 300 },
      { courseCode: 'EE302', courseName: 'Control Systems', grade: 'A', score: 90, semester: 6, level: 300 },
    ]
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@university.edu',
    studentId: 'BIO2021003',
    department: 'Biology',
    faculty: 'Sciences',
    level: 200,
    semester: 4,
    gpa: 3.88,
    courses: [
      { courseCode: 'BIO201', courseName: 'Genetics', grade: 'B+', score: 88, semester: 4, level: 200 },
      { courseCode: 'BIO202', courseName: 'Molecular Biology', grade: 'A-', score: 87, semester: 4, level: 200 },
    ]
  },
  // Adding 37 more students
  {
    id: '4',
    name: 'David Wilson',
    email: 'david.wilson@university.edu',
    studentId: 'CS2021004',
    department: 'Computer Science',
    faculty: 'Engineering',
    level: 300,
    semester: 6,
    gpa: 3.95,
    courses: [
      { courseCode: 'CS301', courseName: 'Database Systems', grade: 'A', score: 91, semester: 6, level: 300 },
      { courseCode: 'CS302', courseName: 'Computer Networks', grade: 'B+', score: 87, semester: 6, level: 300 },
    ]
  },
  {
    id: '5',
    name: 'Emma Brown',
    email: 'emma.brown@university.edu',
    studentId: 'BIO2021005',
    department: 'Biology',
    faculty: 'Sciences',
    level: 300,
    semester: 6,
    gpa: 4.20,
    courses: [
      { courseCode: 'BIO301', courseName: 'Biochemistry', grade: 'A', score: 93, semester: 6, level: 300 },
      { courseCode: 'BIO302', courseName: 'Cell Biology', grade: 'A-', score: 89, semester: 6, level: 300 },
    ]
  },
  {
    id: '6',
    name: 'Frank Miller',
    email: 'frank.miller@university.edu',
    studentId: 'EE2021006',
    department: 'Electrical Engineering',
    faculty: 'Engineering',
    level: 400,
    semester: 8,
    gpa: 3.78,
    courses: [
      { courseCode: 'EE401', courseName: 'Power Systems', grade: 'B+', score: 84, semester: 8, level: 400 },
      { courseCode: 'EE402', courseName: 'Electronics', grade: 'A-', score: 88, semester: 8, level: 400 },
    ]
  },
  {
    id: '7',
    name: 'Grace Lee',
    email: 'grace.lee@university.edu',
    studentId: 'CS2021007',
    department: 'Computer Science',
    faculty: 'Engineering',
    level: 200,
    semester: 4,
    gpa: 4.45,
    courses: [
      { courseCode: 'CS201', courseName: 'Data Structures', grade: 'A+', score: 96, semester: 4, level: 200 },
      { courseCode: 'CS202', courseName: 'Programming Languages', grade: 'A', score: 92, semester: 4, level: 200 },
    ]
  },
  {
    id: '8',
    name: 'Henry Taylor',
    email: 'henry.taylor@university.edu',
    studentId: 'BIO2021008',
    department: 'Biology',
    faculty: 'Sciences',
    level: 400,
    semester: 8,
    gpa: 3.67,
    courses: [
      { courseCode: 'BIO401', courseName: 'Microbiology', grade: 'B', score: 82, semester: 8, level: 400 },
      { courseCode: 'BIO402', courseName: 'Ecology', grade: 'B+', score: 85, semester: 8, level: 400 },
    ]
  },
  {
    id: '9',
    name: 'Isabella Garcia',
    email: 'isabella.garcia@university.edu',
    studentId: 'EE2021009',
    department: 'Electrical Engineering',
    faculty: 'Engineering',
    level: 200,
    semester: 4,
    gpa: 4.10,
    courses: [
      { courseCode: 'EE201', courseName: 'Circuit Analysis', grade: 'A', score: 90, semester: 4, level: 200 },
      { courseCode: 'EE202', courseName: 'Signals and Systems', grade: 'B+', score: 86, semester: 4, level: 200 },
    ]
  },
  {
    id: '10',
    name: 'Jack Anderson',
    email: 'jack.anderson@university.edu',
    studentId: 'CS2021010',
    department: 'Computer Science',
    faculty: 'Engineering',
    level: 100,
    semester: 2,
    gpa: 3.85,
    courses: [
      { courseCode: 'CS101', courseName: 'Introduction to Programming', grade: 'A-', score: 88, semester: 2, level: 100 },
      { courseCode: 'CS102', courseName: 'Computer Fundamentals', grade: 'B+', score: 85, semester: 2, level: 100 },
    ]
  },
  // Continue with more students...
  {
    id: '11',
    name: 'Kate Thompson',
    email: 'kate.thompson@university.edu',
    studentId: 'BIO2021011',
    department: 'Biology',
    faculty: 'Sciences',
    level: 100,
    semester: 2,
    gpa: 4.25,
    courses: [
      { courseCode: 'BIO101', courseName: 'General Biology', grade: 'A', score: 94, semester: 2, level: 100 },
      { courseCode: 'BIO102', courseName: 'Biology Lab', grade: 'A-', score: 89, semester: 2, level: 100 },
    ]
  },
  {
    id: '12',
    name: 'Liam Martinez',
    email: 'liam.martinez@university.edu',
    studentId: 'EE2021012',
    department: 'Electrical Engineering',
    faculty: 'Engineering',
    level: 100,
    semester: 2,
    gpa: 3.92,
    courses: [
      { courseCode: 'EE101', courseName: 'Basic Electrical Engineering', grade: 'A-', score: 87, semester: 2, level: 100 },
      { courseCode: 'EE102', courseName: 'Mathematics for Engineers', grade: 'B+', score: 84, semester: 2, level: 100 },
    ]
  },
  {
    id: '13',
    name: 'Mia Rodriguez',
    email: 'mia.rodriguez@university.edu',
    studentId: 'CS2021013',
    department: 'Computer Science',
    faculty: 'Engineering',
    level: 300,
    semester: 5,
    gpa: 4.15,
    courses: [
      { courseCode: 'CS301', courseName: 'Database Systems', grade: 'A', score: 92, semester: 5, level: 300 },
      { courseCode: 'CS303', courseName: 'Operating Systems', grade: 'B+', score: 86, semester: 5, level: 300 },
    ]
  },
  {
    id: '14',
    name: 'Noah Clark',
    email: 'noah.clark@university.edu',
    studentId: 'BIO2021014',
    department: 'Biology',
    faculty: 'Sciences',
    level: 300,
    semester: 5,
    gpa: 3.75,
    courses: [
      { courseCode: 'BIO301', courseName: 'Biochemistry', grade: 'B+', score: 83, semester: 5, level: 300 },
      { courseCode: 'BIO303', courseName: 'Physiology', grade: 'B', score: 81, semester: 5, level: 300 },
    ]
  },
  {
    id: '15',
    name: 'Olivia Lewis',
    email: 'olivia.lewis@university.edu',
    studentId: 'EE2021015',
    department: 'Electrical Engineering',
    faculty: 'Engineering',
    level: 300,
    semester: 5,
    gpa: 4.05,
    courses: [
      { courseCode: 'EE301', courseName: 'Digital Systems', grade: 'A-', score: 89, semester: 5, level: 300 },
      { courseCode: 'EE303', courseName: 'Electromagnetic Fields', grade: 'B+', score: 85, semester: 5, level: 300 },
    ]
  },
  // Adding more students to reach 40
  ...Array.from({ length: 25 }, (_, i) => ({
    id: `${16 + i}`,
    name: `Student ${16 + i}`,
    email: `student${16 + i}@university.edu`,
    studentId: `STU2021${String(16 + i).padStart(3, '0')}`,
    department: ['Computer Science', 'Electrical Engineering', 'Biology'][i % 3],
    faculty: i % 3 === 2 ? 'Sciences' : 'Engineering',
    level: [100, 200, 300, 400][Math.floor(Math.random() * 4)],
    semester: Math.floor(Math.random() * 8) + 1,
    gpa: Number((Math.random() * 2 + 3).toFixed(2)),
    courses: [
      {
        courseCode: `${['CS', 'EE', 'BIO'][i % 3]}${Math.floor(Math.random() * 4) + 1}01`,
        courseName: `Course ${i + 1}`,
        grade: ['A+', 'A', 'A-', 'B+', 'B', 'B-'][Math.floor(Math.random() * 6)],
        score: Math.floor(Math.random() * 30) + 70,
        semester: Math.floor(Math.random() * 8) + 1,
        level: [100, 200, 300, 400][Math.floor(Math.random() * 4)]
      }
    ]
  }))
];

export const mockLecturers: Lecturer[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    staffId: 'STAFF001',
    department: 'Computer Science',
    faculty: 'Engineering',
    courses: ['CS401', 'CS402', 'CS501'],
    rating: 4.8,
    studentsCount: 120
  },
  {
    id: '2',
    name: 'Prof. Michael Brown',
    email: 'michael.brown@university.edu',
    staffId: 'STAFF002',
    department: 'Electrical Engineering',
    faculty: 'Engineering',
    courses: ['EE301', 'EE302'],
    rating: 4.6,
    studentsCount: 85
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@university.edu',
    staffId: 'STAFF003',
    department: 'Biology',
    faculty: 'Sciences',
    courses: ['BIO201', 'BIO202'],
    rating: 4.9,
    studentsCount: 95
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    faculty: 'Engineering',
    studentCount: 450,
    lecturerCount: 25,
    averageGpa: 3.75
  },
  {
    id: '2',
    name: 'Electrical Engineering',
    faculty: 'Engineering',
    studentCount: 320,
    lecturerCount: 18,
    averageGpa: 3.68
  },
  {
    id: '3',
    name: 'Biology',
    faculty: 'Sciences',
    studentCount: 280,
    lecturerCount: 15,
    averageGpa: 3.82
  }
];

export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'Fall Semester 2024 Registration Now Open',
    content: 'Students can now register for Fall 2024 courses through the online portal. Registration deadline is August 15th.',
    date: '2024-07-15',
    category: 'academic',
    featured: true
  },
  {
    id: '2',
    title: 'Annual Research Symposium',
    content: 'Join us for the Annual Research Symposium featuring presentations from our top students and faculty members.',
    date: '2024-07-10',
    category: 'event',
    featured: true
  },
  {
    id: '3',
    title: 'New Laboratory Equipment Installed',
    content: 'The Engineering faculty has received new state-of-the-art laboratory equipment to enhance student learning experience.',
    date: '2024-07-08',
    category: 'announcement',
    featured: false
  }
];

export const mockPerformanceData: PerformanceData[] = [
  { course: 'CS401', score: 85, students: 45, semester: 'Fall 2024' },
  { course: 'CS402', score: 78, students: 42, semester: 'Fall 2024' },
  { course: 'EE301', score: 82, students: 38, semester: 'Fall 2024' },
  { course: 'EE302', score: 79, students: 35, semester: 'Fall 2024' },
  { course: 'BIO201', score: 88, students: 50, semester: 'Fall 2024' },
  { course: 'BIO202', score: 84, students: 48, semester: 'Fall 2024' },
];

export const semesterProgressData = [
  { semester: 'Fall 2023', gpa: 3.2 },
  { semester: 'Spring 2024', gpa: 3.5 },
  { semester: 'Summer 2024', gpa: 3.8 },
  { semester: 'Fall 2024', gpa: 4.1 },
];

export const scoreDistributionData = [
  { name: 'A (90-100)', value: 35, fill: '#10b981' },
  { name: 'B (80-89)', value: 40, fill: '#3b82f6' },
  { name: 'C (70-79)', value: 20, fill: '#f59e0b' },
  { name: 'D (60-69)', value: 5, fill: '#ef4444' },
];

// Helper function to get students by course
export const getStudentsByCourse = (courseCode: string): Student[] => {
  return mockStudents.filter(student => 
    student.courses.some(course => course.courseCode === courseCode)
  );
};