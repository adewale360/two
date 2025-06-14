import { Student, Lecturer, Department, NewsItem, PerformanceData, Faculty } from '../types';

// Updated Faculty structure with new information
export const mockFaculties: Faculty[] = [
  {
    id: '1',
    name: 'COPAS',
    fullName: 'College of Pure and Applied Sciences',
    description: 'Welcome to Caleb University\'s College of Pure and Applied Sciences, a thriving academic community dedicated to nurturing scientific curiosity, fostering innovation, and advancing knowledge in the realms of pure and applied sciences.',
    dean: {
      name: 'Prof. Kehinde Ogunniran',
      email: 'kehinde.ogunniran@calebuniversity.edu.ng',
      phone: '07039772668'
    },
    departments: [
      'Biochemistry',
      'Computer Science',
      'Cyber Security',
      'Environmental Management and Toxicology',
      'Industrial Chemistry',
      'Information Systems',
      'Microbiology and Industrial Biotechnology',
      'Software Engineering'
    ]
  },
  {
    id: '2',
    name: 'COLENSMA',
    fullName: 'College of Environmental Sciences and Management',
    description: 'Welcome to Caleb University\'s College of Environmental Sciences and Management, a hub of innovation, sustainability, and excellence in the fields of architecture, estate management, and quantity surveying. Our college offers comprehensive programs designed to shape future professionals who will address complex environmental challenges.',
    dean: {
      name: 'Prof. Adebayo Ogundimu',
      email: 'adebayo.ogundimu@calebuniversity.edu.ng',
      phone: '08012345678'
    },
    departments: [
      'Architecture',
      'Estate Management'
    ]
  },
  {
    id: '3',
    name: 'CASMAS',
    fullName: 'College of Art, Social, and Management Science',
    description: 'Welcome to Caleb University\'s College of Art, Social, and Management Science, a dynamic and interdisciplinary academic community dedicated to fostering creativity, critical thinking, and professional excellence. We recognize the essential role that arts, social sciences, and management play in shaping society.',
    dean: {
      name: 'Prof. Funmi Adeyemi',
      email: 'funmi.adeyemi@calebuniversity.edu.ng',
      phone: '08023456789'
    },
    departments: [
      'Accounting',
      'Banking and Finance',
      'Business Administration',
      'Criminology and Security Studies',
      'Economics',
      'International Relations',
      'Mass Communication',
      'Peace Studies and Conflict Resolution',
      'Political Science',
      'Public Administration',
      'Psychology',
      'Taxation'
    ]
  },
  {
    id: '4',
    name: 'COLAW',
    fullName: 'College of Law',
    description: 'Welcome to Caleb University College of Law, a vibrant and aspiring institution committed to nurturing the next generation of legal professionals. We are driven by a strong belief in the power of education to shape individuals and make a positive impact on society.',
    dean: {
      name: 'Prof. Foluke Dada',
      email: 'foluke.dada@calebuniversity.edu.ng',
      phone: '08034567890'
    },
    departments: [
      'Public and Property Law',
      'Private and International Law'
    ]
  },
  {
    id: '5',
    name: 'NURSING',
    fullName: 'College of Nursing and Basic Medical Sciences',
    description: 'Caleb University College of Nursing and Basic Medical Sciences stands as a beacon of excellence in healthcare education, offering diverse programs tailored to meet the evolving demands of the medical field. We provide comprehensive foundation in both theoretical knowledge and hands-on training.',
    dean: {
      name: 'Prof. Blessing Okafor',
      email: 'blessing.okafor@calebuniversity.edu.ng',
      phone: '08045678901'
    },
    departments: [
      'Maternal and Child Health Nursing',
      'Community and Public Health Nursing',
      'Adult Health/Medical and Surgical Nursing',
      'Mental Health and Psychiatric Nursing',
      'Nursing Management and Education',
      'Human Physiology',
      'Human Anatomy'
    ]
  }
];

// Updated students with faculty assignments
export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@university.edu',
    studentId: 'CS2021001',
    department: 'Computer Science',
    faculty: 'COPAS',
    level: '400',
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
    department: 'Architecture',
    faculty: 'COLENSMA',
    level: '300',
    semester: 6,
    gpa: 4.12,
    courses: [
      { courseCode: 'ARC301', courseName: 'Design Studio', grade: 'B+', score: 85, semester: 6, level: 300 },
      { courseCode: 'ARC302', courseName: 'Building Technology', grade: 'A', score: 90, semester: 6, level: 300 },
    ]
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol.davis@university.edu',
    studentId: 'BIO2021003',
    department: 'Biochemistry',
    faculty: 'COPAS',
    level: '200',
    semester: 4,
    gpa: 3.88,
    courses: [
      { courseCode: 'BIO201', courseName: 'Genetics', grade: 'B+', score: 88, semester: 4, level: 200 },
      { courseCode: 'BIO202', courseName: 'Molecular Biology', grade: 'A-', score: 87, semester: 4, level: 200 },
    ]
  },
  // Adding more students across different faculties
  ...Array.from({ length: 37 }, (_, i) => {
    const faculties = ['COPAS', 'COLENSMA', 'CASMAS', 'COLAW', 'NURSING'];
    const departments = {
      'COPAS': ['Computer Science', 'Biochemistry', 'Cyber Security', 'Software Engineering'],
      'COLENSMA': ['Architecture', 'Estate Management'],
      'CASMAS': ['Business Administration', 'Accounting', 'Economics', 'Mass Communication'],
      'COLAW': ['Public and Property Law', 'Private and International Law'],
      'NURSING': ['Nursing Science', 'Human Physiology', 'Human Anatomy']
    };
    
    const faculty = faculties[i % faculties.length];
    const deptList = departments[faculty];
    const department = deptList[i % deptList.length];
    
    return {
      id: `${4 + i}`,
      name: `Student ${4 + i}`,
      email: `student${4 + i}@university.edu`,
      studentId: `STU2021${String(4 + i).padStart(3, '0')}`,
      department,
      faculty,
      level: ['100', '200', '300', '400'][Math.floor(Math.random() * 4)],
      semester: Math.floor(Math.random() * 8) + 1,
      gpa: Number((Math.random() * 2 + 3).toFixed(2)),
      courses: [
        {
          courseCode: `${department.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 4) + 1}01`,
          courseName: `Course ${i + 1}`,
          grade: ['A+', 'A', 'A-', 'B+', 'B', 'B-'][Math.floor(Math.random() * 6)],
          score: Math.floor(Math.random() * 30) + 70,
          semester: Math.floor(Math.random() * 8) + 1,
          level: [100, 200, 300, 400][Math.floor(Math.random() * 4)]
        }
      ]
    };
  })
];

export const mockLecturers: Lecturer[] = [
  {
    id: '1',
    name: 'Dr. Sarah Wilson',
    email: 'sarah.wilson@university.edu',
    staffId: 'STAFF001',
    department: 'Computer Science',
    faculty: 'COPAS',
    courses: ['CS401', 'CS402', 'CS501'],
    rating: 4.8,
    studentsCount: 120
  },
  {
    id: '2',
    name: 'Prof. Michael Brown',
    email: 'michael.brown@university.edu',
    staffId: 'STAFF002',
    department: 'Architecture',
    faculty: 'COLENSMA',
    courses: ['ARC301', 'ARC302'],
    rating: 4.6,
    studentsCount: 85
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    email: 'emily.chen@university.edu',
    staffId: 'STAFF003',
    department: 'Biochemistry',
    faculty: 'COPAS',
    courses: ['BIO201', 'BIO202'],
    rating: 4.9,
    studentsCount: 95
  }
];

export const mockDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    faculty: 'COPAS',
    studentCount: 450,
    lecturerCount: 25,
    averageGpa: 3.75
  },
  {
    id: '2',
    name: 'Architecture',
    faculty: 'COLENSMA',
    studentCount: 320,
    lecturerCount: 18,
    averageGpa: 3.68
  },
  {
    id: '3',
    name: 'Biochemistry',
    faculty: 'COPAS',
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

export const mockDashboardStats = {
  totalStudents: 1250,
  totalLecturers: 85,
  totalCourses: 156,
  averageGPA: 3.75
};

export const mockPerformanceData: PerformanceData[] = [
  { course: 'CS401', score: 85, students: 45, semester: 'Fall 2024' },
  { course: 'CS402', score: 78, students: 42, semester: 'Fall 2024' },
  { course: 'ARC301', score: 82, students: 38, semester: 'Fall 2024' },
  { course: 'ARC302', score: 79, students: 35, semester: 'Fall 2024' },
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