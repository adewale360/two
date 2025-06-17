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

// All departments across faculties
const allDepartments = [
  'Computer Science', 'Biochemistry', 'Cyber Security', 'Software Engineering', 'Information Systems',
  'Architecture', 'Estate Management',
  'Business Administration', 'Accounting', 'Economics', 'Mass Communication', 'Psychology',
  'Public and Property Law', 'Private and International Law',
  'Nursing Science', 'Human Physiology', 'Human Anatomy'
];

// Generate students ensuring at least 5 per department per level
const generateStudents = () => {
  const students: Student[] = [];
  let studentCounter = 1;

  // First, ensure each department has at least 5 students per level
  allDepartments.forEach(department => {
    const faculty = mockFaculties.find(f => f.departments.includes(department))?.name || 'COPAS';
    
    ['100', '200', '300', '400'].forEach(level => {
      for (let i = 0; i < 5; i++) {
        const firstName = ['Alice', 'Bob', 'Carol', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'][i % 10];
        const lastName = ['Johnson', 'Smith', 'Davis', 'Wilson', 'Brown', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White'][i % 10];
        
        // Generate realistic GPA with some failing students
        let gpa: number;
        const random = Math.random();
        if (random < 0.05) { // 5% failing students (below 2.0)
          gpa = Number((Math.random() * 1.5 + 0.5).toFixed(2)); // 0.5 - 2.0
        } else if (random < 0.15) { // 10% struggling students (2.0 - 2.5)
          gpa = Number((Math.random() * 0.5 + 2.0).toFixed(2)); // 2.0 - 2.5
        } else if (random < 0.35) { // 20% below average (2.5 - 3.0)
          gpa = Number((Math.random() * 0.5 + 2.5).toFixed(2)); // 2.5 - 3.0
        } else if (random < 0.70) { // 35% average (3.0 - 4.0)
          gpa = Number((Math.random() * 1.0 + 3.0).toFixed(2)); // 3.0 - 4.0
        } else { // 30% excellent (4.0 - 5.0)
          gpa = Number((Math.random() * 1.0 + 4.0).toFixed(2)); // 4.0 - 5.0
        }

        const levelNum = parseInt(level);
        const semester = Math.floor(Math.random() * 2) + 1 + (levelNum - 1) * 2; // 1-8 based on level

        // Generate course grades based on GPA
        const generateGrade = (baseGPA: number) => {
          const variation = (Math.random() - 0.5) * 0.5; // ±0.25 variation
          const courseGPA = Math.max(0, Math.min(5, baseGPA + variation));
          
          if (courseGPA >= 4.5) return { grade: 'A+', score: Math.floor(Math.random() * 10) + 90 };
          if (courseGPA >= 4.0) return { grade: 'A', score: Math.floor(Math.random() * 10) + 80 };
          if (courseGPA >= 3.5) return { grade: 'B+', score: Math.floor(Math.random() * 10) + 75 };
          if (courseGPA >= 3.0) return { grade: 'B', score: Math.floor(Math.random() * 10) + 70 };
          if (courseGPA >= 2.5) return { grade: 'C+', score: Math.floor(Math.random() * 10) + 65 };
          if (courseGPA >= 2.0) return { grade: 'C', score: Math.floor(Math.random() * 10) + 60 };
          if (courseGPA >= 1.5) return { grade: 'D+', score: Math.floor(Math.random() * 10) + 55 };
          if (courseGPA >= 1.0) return { grade: 'D', score: Math.floor(Math.random() * 10) + 50 };
          return { grade: 'F', score: Math.floor(Math.random() * 50) + 0 };
        };

        const courses = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, courseIndex) => {
          const { grade, score } = generateGrade(gpa);
          return {
            courseCode: `${department.substring(0, 3).toUpperCase()}${levelNum}0${courseIndex + 1}`,
            courseName: `${department} Course ${courseIndex + 1}`,
            grade,
            score,
            semester,
            level: levelNum
          };
        });

        students.push({
          id: studentCounter.toString(),
          name: `${firstName} ${lastName}`,
          email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${studentCounter}@university.edu`,
          studentId: `STU2021${String(studentCounter).padStart(3, '0')}`,
          department,
          faculty,
          level,
          semester,
          gpa,
          courses
        });

        studentCounter++;
      }
    });
  });

  // Add some additional random students to reach a good total
  const additionalStudents = 200;
  for (let i = 0; i < additionalStudents; i++) {
    const department = allDepartments[Math.floor(Math.random() * allDepartments.length)];
    const faculty = mockFaculties.find(f => f.departments.includes(department))?.name || 'COPAS';
    const level = ['100', '200', '300', '400'][Math.floor(Math.random() * 4)];
    const levelNum = parseInt(level);
    const semester = Math.floor(Math.random() * 2) + 1 + (levelNum - 1) * 2;

    const firstNames = ['Michael', 'Sarah', 'James', 'Lisa', 'Robert', 'Maria', 'William', 'Jennifer', 'Richard', 'Linda', 'Charles', 'Barbara', 'Joseph', 'Susan', 'Thomas', 'Jessica', 'Christopher', 'Karen', 'Daniel', 'Nancy'];
    const lastNames = ['Garcia', 'Rodriguez', 'Lewis', 'Lee', 'Walker', 'Hall', 'Allen', 'Young', 'Hernandez', 'King', 'Wright', 'Lopez', 'Hill', 'Scott', 'Green', 'Adams', 'Baker', 'Gonzalez', 'Nelson', 'Carter'];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    // Generate realistic GPA distribution
    let gpa: number;
    const random = Math.random();
    if (random < 0.08) { // 8% failing/struggling
      gpa = Number((Math.random() * 2.0 + 0.5).toFixed(2));
    } else if (random < 0.25) { // 17% below average
      gpa = Number((Math.random() * 0.8 + 2.2).toFixed(2));
    } else if (random < 0.65) { // 40% average
      gpa = Number((Math.random() * 1.2 + 3.0).toFixed(2));
    } else { // 35% excellent
      gpa = Number((Math.random() * 0.8 + 4.2).toFixed(2));
    }

    const generateGrade = (baseGPA: number) => {
      const variation = (Math.random() - 0.5) * 0.5;
      const courseGPA = Math.max(0, Math.min(5, baseGPA + variation));
      
      if (courseGPA >= 4.5) return { grade: 'A+', score: Math.floor(Math.random() * 10) + 90 };
      if (courseGPA >= 4.0) return { grade: 'A', score: Math.floor(Math.random() * 10) + 80 };
      if (courseGPA >= 3.5) return { grade: 'B+', score: Math.floor(Math.random() * 10) + 75 };
      if (courseGPA >= 3.0) return { grade: 'B', score: Math.floor(Math.random() * 10) + 70 };
      if (courseGPA >= 2.5) return { grade: 'C+', score: Math.floor(Math.random() * 10) + 65 };
      if (courseGPA >= 2.0) return { grade: 'C', score: Math.floor(Math.random() * 10) + 60 };
      if (courseGPA >= 1.5) return { grade: 'D+', score: Math.floor(Math.random() * 10) + 55 };
      if (courseGPA >= 1.0) return { grade: 'D', score: Math.floor(Math.random() * 10) + 50 };
      return { grade: 'F', score: Math.floor(Math.random() * 50) + 0 };
    };

    const courses = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, (_, courseIndex) => {
      const { grade, score } = generateGrade(gpa);
      return {
        courseCode: `${department.substring(0, 3).toUpperCase()}${levelNum}0${courseIndex + 1}`,
        courseName: `${department} Course ${courseIndex + 1}`,
        grade,
        score,
        semester,
        level: levelNum
      };
    });

    students.push({
      id: studentCounter.toString(),
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${studentCounter}@university.edu`,
      studentId: `STU2021${String(studentCounter).padStart(3, '0')}`,
      department,
      faculty,
      level,
      semester,
      gpa,
      courses
    });

    studentCounter++;
  }

  return students;
};

// Generate the students
export const mockStudents = generateStudents();

// Expanded lecturers to 25 distributed across departments
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
  },
  // Adding 22 more lecturers distributed across all departments
  ...Array.from({ length: 22 }, (_, i) => {
    const department = allDepartments[i % allDepartments.length];
    const faculty = mockFaculties.find(f => f.departments.includes(department))?.name || 'COPAS';
    
    const titles = ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.'];
    const firstNames = ['John', 'Jane', 'David', 'Mary', 'Robert', 'Lisa', 'James', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda', 'Richard', 'Barbara', 'Joseph', 'Susan', 'Thomas', 'Jessica', 'Christopher', 'Karen', 'Daniel', 'Nancy'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson'];
    
    const title = titles[i % titles.length];
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    
    return {
      id: `${4 + i}`,
      name: `${title} ${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@university.edu`,
      staffId: `STAFF${String(4 + i).padStart(3, '0')}`,
      department,
      faculty,
      courses: [`${department.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 4) + 1}01`, `${department.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 4) + 1}02`],
      rating: Number((Math.random() * 1.5 + 3.5).toFixed(1)),
      studentsCount: Math.floor(Math.random() * 80) + 40
    };
  })
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
  totalStudents: mockStudents.length,
  totalLecturers: mockLecturers.length,
  totalCourses: 156,
  averageGPA: Number((mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(2))
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

// New data for faculty page
export const admissionsByYearData = [
  { year: '2020', 'Computer Science': 120, 'Biochemistry': 85, 'Cyber Security': 65, 'Software Engineering': 95, 'Information Systems': 75 },
  { year: '2021', 'Computer Science': 135, 'Biochemistry': 92, 'Cyber Security': 78, 'Software Engineering': 110, 'Information Systems': 82 },
  { year: '2022', 'Computer Science': 150, 'Biochemistry': 98, 'Cyber Security': 89, 'Software Engineering': 125, 'Information Systems': 88 },
  { year: '2023', 'Computer Science': 165, 'Biochemistry': 105, 'Cyber Security': 95, 'Software Engineering': 140, 'Information Systems': 95 },
  { year: '2024', 'Computer Science': 180, 'Biochemistry': 112, 'Cyber Security': 102, 'Software Engineering': 155, 'Information Systems': 102 }
];

// Helper function to get students by course
export const getStudentsByCourse = (courseCode: string): Student[] => {
  return mockStudents.filter(student => 
    student.courses.some(course => course.courseCode === courseCode)
  );
};