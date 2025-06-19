import { Student, Lecturer, Department, NewsItem, PerformanceData, Faculty, AcademicCalendar } from '../types';

// School Calendar System
export const academicCalendar: AcademicCalendar = {
  currentSemester: 'First Semester 2024/2025',
  currentSession: '2024/2025',
  semesters: [
    {
      id: 'first-2024',
      name: 'First Semester 2024/2025',
      startDate: '2024-09-22',
      endDate: '2025-01-15',
      status: 'active'
    },
    {
      id: 'second-2024',
      name: 'Second Semester 2024/2025',
      startDate: '2025-02-01',
      endDate: '2025-06-15',
      status: 'upcoming'
    },
    {
      id: 'first-2023',
      name: 'First Semester 2023/2024',
      startDate: '2023-09-22',
      endDate: '2024-01-15',
      status: 'completed'
    },
    {
      id: 'second-2023',
      name: 'Second Semester 2023/2024',
      startDate: '2024-02-01',
      endDate: '2024-06-15',
      status: 'completed'
    }
  ],
  events: [
    { date: '2024-09-15', title: 'Registration Deadline', type: 'academic' },
    { date: '2024-09-22', title: 'First Semester Begins', type: 'academic' },
    { date: '2024-11-15', title: 'Mid-Semester Break Starts', type: 'break' },
    { date: '2024-11-22', title: 'Mid-Semester Break Ends', type: 'break' },
    { date: '2024-12-20', title: 'Christmas Break Starts', type: 'break' },
    { date: '2025-01-08', title: 'Classes Resume', type: 'academic' },
    { date: '2025-01-15', title: 'First Semester Ends', type: 'academic' },
    { date: '2025-02-01', title: 'Second Semester Begins', type: 'academic' }
  ]
};

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
  'Environmental Management and Toxicology', 'Industrial Chemistry', 'Microbiology and Industrial Biotechnology',
  'Architecture', 'Estate Management',
  'Business Administration', 'Accounting', 'Economics', 'Mass Communication', 'Psychology',
  'Banking and Finance', 'Criminology and Security Studies', 'International Relations',
  'Peace Studies and Conflict Resolution', 'Political Science', 'Public Administration', 'Taxation',
  'Public and Property Law', 'Private and International Law',
  'Maternal and Child Health Nursing', 'Community and Public Health Nursing', 'Adult Health/Medical and Surgical Nursing',
  'Mental Health and Psychiatric Nursing', 'Nursing Management and Education', 'Human Physiology', 'Human Anatomy'
];

// Unique Nigerian names for 820 students
const nigerianFirstNames = [
  'Adebayo', 'Adunni', 'Aisha', 'Akeem', 'Amara', 'Amina', 'Ayo', 'Babatunde', 'Blessing', 'Chidi',
  'Chioma', 'David', 'Ebere', 'Emeka', 'Esther', 'Fatima', 'Folake', 'Grace', 'Ibrahim', 'Ifeanyi',
  'Ifeoma', 'Ikechukwu', 'James', 'Kemi', 'Kunle', 'Lola', 'Mary', 'Mohammed', 'Ngozi', 'Nneka',
  'Obinna', 'Olumide', 'Omolara', 'Patience', 'Peter', 'Rasheed', 'Ruth', 'Samuel', 'Sarah', 'Seun',
  'Tayo', 'Temitope', 'Tosin', 'Uche', 'Victor', 'Yemi', 'Zainab', 'Adaora', 'Adebola', 'Adejoke',
  'Ademola', 'Adesola', 'Adetola', 'Adunola', 'Afolabi', 'Akinola', 'Akintola', 'Alaba', 'Aliu', 'Amaka',
  'Aminat', 'Anayo', 'Anthonia', 'Arinze', 'Asabe', 'Audu', 'Awolowo', 'Azuka', 'Bamidele', 'Bankole',
  'Bassey', 'Bello', 'Bimbo', 'Bolaji', 'Bukola', 'Bunmi', 'Busayo', 'Chiamaka', 'Chinelo', 'Chinwe',
  'Chinyere', 'Chukwu', 'Damilola', 'Daniel', 'Deborah', 'Dele', 'Dupe', 'Ebuka', 'Edith', 'Ejike',
  'Ekene', 'Elizabeth', 'Emmanuel', 'Enoch', 'Esosa', 'Eucharia', 'Ezekiel', 'Femi', 'Funmi', 'Gabriel',
  'Gbenga', 'Godwin', 'Hafsat', 'Halima', 'Hannah', 'Hassan', 'Helen', 'Henry', 'Idris', 'Ijeoma',
  'Ikenna', 'Innocent', 'Isaac', 'Ismail', 'Iyabo', 'Jide', 'John', 'Joseph', 'Joy', 'Juliana',
  'Khadijah', 'Kingsley', 'Lanre', 'Latifa', 'Leah', 'Lilian', 'Loveth', 'Lucky', 'Lydia', 'Maryam',
  'Michael', 'Miracle', 'Moses', 'Musa', 'Nkem', 'Nnamdi', 'Nonso', 'Nora', 'Nurat', 'Obioma',
  'Ogechi', 'Okechukwu', 'Olabisi', 'Oladele', 'Olaide', 'Olajide', 'Olalekan', 'Olamide', 'Olaniyi', 'Olarenwaju',
  'Olasunkanmi', 'Olatunde', 'Olawale', 'Olayemi', 'Olayinka', 'Olubunmi', 'Oluchi', 'Oludare', 'Olufemi', 'Olumuyiwa',
  'Olusegun', 'Oluseyi', 'Olusola', 'Olutayo', 'Omolola', 'Omowunmi', 'Onyeka', 'Onyinye', 'Opeyemi', 'Osaze',
  'Paul', 'Peace', 'Precious', 'Promise', 'Queen', 'Rachel', 'Rebecca', 'Richard', 'Rita', 'Rose',
  'Salisu', 'Sani', 'Segun', 'Shade', 'Shola', 'Solomon', 'Stephen', 'Sunday', 'Taiwo', 'Tunde',
  'Umar', 'Uzoma', 'Vera', 'Vincent', 'Wale', 'Wasiu', 'William', 'Yakubu', 'Yusuf', 'Zara'
];

const nigerianLastNames = [
  'Adebayo', 'Adeleye', 'Ademola', 'Adesanya', 'Afolabi', 'Agbaje', 'Ajayi', 'Akande', 'Akinola', 'Alabi',
  'Aluko', 'Amadi', 'Anyanwu', 'Asante', 'Awolowo', 'Babatunde', 'Balogun', 'Bankole', 'Bassey', 'Bello',
  'Chukwu', 'Dada', 'Daramola', 'Ebong', 'Egbuna', 'Eke', 'Emeka', 'Ezeh', 'Falade', 'Fashola',
  'Gbenga', 'Hassan', 'Ibrahim', 'Idowu', 'Igwe', 'Ijeoma', 'Ikechukwu', 'Jegede', 'Johnson', 'Kalu',
  'Lawal', 'Madu', 'Mohammed', 'Ndubuisi', 'Nnamdi', 'Nwachukwu', 'Nwosu', 'Obasi', 'Obi', 'Obiora',
  'Odunsi', 'Ogbonna', 'Okafor', 'Okeke', 'Okonkwo', 'Okoro', 'Okwu', 'Oladele', 'Olajide', 'Olatunji',
  'Olawale', 'Olayemi', 'Olumide', 'Olusegun', 'Omolara', 'Onwuka', 'Onyeka', 'Opara', 'Osaze', 'Oyebanji',
  'Salami', 'Sanni', 'Tijani', 'Uche', 'Udoh', 'Ugwu', 'Umar', 'Uzoma', 'Williams', 'Yakubu'
];

// Generate students ensuring at least 5 per department per level - Total 820 students with unique names
const generateStudents = () => {
  const students: Student[] = [];
  let studentCounter = 1;
  let nameIndex = 0;

  // Generate unique name combinations
  const generateUniqueName = () => {
    const firstName = nigerianFirstNames[nameIndex % nigerianFirstNames.length];
    const lastName = nigerianLastNames[Math.floor(nameIndex / nigerianFirstNames.length) % nigerianLastNames.length];
    nameIndex++;
    return `${firstName} ${lastName}`;
  };

  // First, ensure each department has at least 5 students per level
  allDepartments.forEach(department => {
    const faculty = mockFaculties.find(f => f.departments.includes(department))?.name || 'COPAS';
    
    ['100', '200', '300', '400'].forEach(level => {
      for (let i = 0; i < 5; i++) {
        const name = generateUniqueName();
        
        // Generate realistic GPA with some failing students
        let gpa: number;
        const random = Math.random();
        if (random < 0.08) { // 8% failing students (below 2.0)
          gpa = Number((Math.random() * 1.5 + 0.5).toFixed(2)); // 0.5 - 2.0
        } else if (random < 0.18) { // 10% struggling students (2.0 - 2.5)
          gpa = Number((Math.random() * 0.5 + 2.0).toFixed(2)); // 2.0 - 2.5
        } else if (random < 0.38) { // 20% below average (2.5 - 3.0)
          gpa = Number((Math.random() * 0.5 + 2.5).toFixed(2)); // 2.5 - 3.0
        } else if (random < 0.73) { // 35% average (3.0 - 4.0)
          gpa = Number((Math.random() * 1.0 + 3.0).toFixed(2)); // 3.0 - 4.0
        } else { // 27% excellent (4.0 - 5.0)
          gpa = Number((Math.random() * 1.0 + 4.0).toFixed(2)); // 4.0 - 5.0
        }

        const levelNum = parseInt(level);
        const semester = Math.floor(Math.random() * 2) + 1 + (levelNum - 1) * 2; // 1-8 based on level

        // Generate course grades based on GPA - minimum 8 courses
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

        const courses = Array.from({ length: Math.floor(Math.random() * 3) + 8 }, (_, courseIndex) => {
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

        // Generate semester reports for previous semesters (only 2 semesters per level)
        const semesterReports = [];
        for (let levelReport = 1; levelReport < levelNum; levelReport++) {
          // First semester of the level
          const firstSemesterGPA = Math.max(0, Math.min(5, gpa + (Math.random() - 0.5) * 0.8));
          semesterReports.push({
            semester: (levelReport - 1) * 2 + 1,
            gpa: Number(firstSemesterGPA.toFixed(2)),
            courses: Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, idx) => {
              const { grade, score } = generateGrade(firstSemesterGPA);
              return {
                courseCode: `${department.substring(0, 3).toUpperCase()}${levelReport}0${idx + 1}`,
                courseName: `${department} Course ${idx + 1}`,
                grade,
                score
              };
            })
          });

          // Second semester of the level
          const secondSemesterGPA = Math.max(0, Math.min(5, gpa + (Math.random() - 0.5) * 0.8));
          semesterReports.push({
            semester: (levelReport - 1) * 2 + 2,
            gpa: Number(secondSemesterGPA.toFixed(2)),
            courses: Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, idx) => {
              const { grade, score } = generateGrade(secondSemesterGPA);
              return {
                courseCode: `${department.substring(0, 3).toUpperCase()}${levelReport}0${idx + 1}`,
                courseName: `${department} Course ${idx + 1}`,
                grade,
                score
              };
            })
          });
        }

        // Add previous semesters of current level if not in first semester
        if (semester > (levelNum - 1) * 2 + 1) {
          const firstSemesterCurrentLevel = Math.max(0, Math.min(5, gpa + (Math.random() - 0.5) * 0.8));
          semesterReports.push({
            semester: (levelNum - 1) * 2 + 1,
            gpa: Number(firstSemesterCurrentLevel.toFixed(2)),
            courses: Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, idx) => {
              const { grade, score } = generateGrade(firstSemesterCurrentLevel);
              return {
                courseCode: `${department.substring(0, 3).toUpperCase()}${levelNum}0${idx + 1}`,
                courseName: `${department} Course ${idx + 1}`,
                grade,
                score
              };
            })
          });
        }

        students.push({
          id: studentCounter.toString(),
          name,
          email: `${name.toLowerCase().replace(' ', '.')}${studentCounter}@university.edu`,
          studentId: `STU2021${String(studentCounter).padStart(3, '0')}`,
          department,
          faculty,
          level,
          semester,
          gpa,
          courses,
          semesterReports
        });

        studentCounter++;
      }
    });
  });

  // Add additional students to reach exactly 820 total
  const additionalStudents = 820 - students.length;
  for (let i = 0; i < additionalStudents; i++) {
    const department = allDepartments[Math.floor(Math.random() * allDepartments.length)];
    const faculty = mockFaculties.find(f => f.departments.includes(department))?.name || 'COPAS';
    const level = ['100', '200', '300', '400'][Math.floor(Math.random() * 4)];
    const levelNum = parseInt(level);
    const semester = Math.floor(Math.random() * 2) + 1 + (levelNum - 1) * 2;

    const name = generateUniqueName();

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

    const courses = Array.from({ length: Math.floor(Math.random() * 3) + 8 }, (_, courseIndex) => {
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

    // Generate semester reports for previous semesters (only 2 semesters per level)
    const semesterReports = [];
    for (let levelReport = 1; levelReport < levelNum; levelReport++) {
      // First semester of the level
      const firstSemesterGPA = Math.max(0, Math.min(5, gpa + (Math.random() - 0.5) * 0.8));
      semesterReports.push({
        semester: (levelReport - 1) * 2 + 1,
        gpa: Number(firstSemesterGPA.toFixed(2)),
        courses: Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, idx) => {
          const { grade, score } = generateGrade(firstSemesterGPA);
          return {
            courseCode: `${department.substring(0, 3).toUpperCase()}${levelReport}0${idx + 1}`,
            courseName: `${department} Course ${idx + 1}`,
            grade,
            score
          };
        })
      });

      // Second semester of the level
      const secondSemesterGPA = Math.max(0, Math.min(5, gpa + (Math.random() - 0.5) * 0.8));
      semesterReports.push({
        semester: (levelReport - 1) * 2 + 2,
        gpa: Number(secondSemesterGPA.toFixed(2)),
        courses: Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, idx) => {
          const { grade, score } = generateGrade(secondSemesterGPA);
          return {
            courseCode: `${department.substring(0, 3).toUpperCase()}${levelReport}0${idx + 1}`,
            courseName: `${department} Course ${idx + 1}`,
            grade,
            score
          };
        })
      });
    }

    // Add previous semesters of current level if not in first semester
    if (semester > (levelNum - 1) * 2 + 1) {
      const firstSemesterCurrentLevel = Math.max(0, Math.min(5, gpa + (Math.random() - 0.5) * 0.8));
      semesterReports.push({
        semester: (levelNum - 1) * 2 + 1,
        gpa: Number(firstSemesterCurrentLevel.toFixed(2)),
        courses: Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, idx) => {
          const { grade, score } = generateGrade(firstSemesterCurrentLevel);
          return {
            courseCode: `${department.substring(0, 3).toUpperCase()}${levelNum}0${idx + 1}`,
            courseName: `${department} Course ${idx + 1}`,
            grade,
            score
          };
        })
      });
    }

    students.push({
      id: studentCounter.toString(),
      name,
      email: `${name.toLowerCase().replace(' ', '.')}${studentCounter}@university.edu`,
      studentId: `STU2021${String(studentCounter).padStart(3, '0')}`,
      department,
      faculty,
      level,
      semester,
      gpa,
      courses,
      semesterReports
    });

    studentCounter++;
  }

  return students;
};

// Generate the students
export const mockStudents = generateStudents();

// Expanded lecturers to 40 distributed across departments with Nigerian rating system
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
  // Adding 37 more lecturers distributed across all departments
  ...Array.from({ length: 37 }, (_, i) => {
    const department = allDepartments[i % allDepartments.length];
    const faculty = mockFaculties.find(f => f.departments.includes(department))?.name || 'COPAS';
    
    const titles = ['Dr.', 'Prof.', 'Mr.', 'Mrs.', 'Ms.'];
    const firstNames = ['John', 'Jane', 'David', 'Mary', 'Robert', 'Lisa', 'James', 'Patricia', 'Michael', 'Jennifer', 'William', 'Linda', 'Richard', 'Barbara', 'Joseph', 'Susan', 'Thomas', 'Jessica', 'Christopher', 'Karen', 'Daniel', 'Nancy', 'Mark', 'Betty', 'Donald', 'Helen', 'Steven', 'Sandra', 'Paul', 'Donna', 'Andrew', 'Carol', 'Joshua', 'Ruth', 'Kenneth', 'Sharon', 'Kevin'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Perez', 'Hall', 'Young', 'Allen', 'King', 'Wright', 'Scott'];
    
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

// Expanded news with 20 items
export const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'First Semester 2024/2025 Registration Now Open',
    content: 'Students can now register for First Semester 2024/2025 courses through the online portal. Registration deadline is September 15th, 2024. All students are advised to complete their registration early to avoid last-minute rush. Course advisors are available for consultation during office hours.',
    date: '2024-08-15',
    category: 'academic',
    featured: true
  },
  {
    id: '2',
    title: 'Annual Research Symposium 2024',
    content: 'Join us for the Annual Research Symposium featuring presentations from our top students and faculty members. The event will showcase groundbreaking research across all faculties. Registration is free for all university members. Refreshments will be provided.',
    date: '2024-08-10',
    category: 'event',
    featured: true
  },
  {
    id: '3',
    title: 'New Laboratory Equipment Installed in COPAS',
    content: 'The College of Pure and Applied Sciences has received new state-of-the-art laboratory equipment to enhance student learning experience. The equipment includes advanced microscopes, spectrophotometers, and computer workstations.',
    date: '2024-08-08',
    category: 'announcement',
    featured: false
  },
  {
    id: '4',
    title: 'Student Union Election Results Announced',
    content: 'The results of the 2024/2025 Student Union elections have been announced. Congratulations to all elected officials. The new administration promises to work towards improving student welfare and academic excellence.',
    date: '2024-08-05',
    category: 'announcement',
    featured: true
  },
  {
    id: '5',
    title: 'Career Fair 2024 - Industry Partners Welcome',
    content: 'Our annual career fair will feature over 50 companies from various industries. Students from all levels are encouraged to attend. Professional attire is required. CV review sessions will be available.',
    date: '2024-08-03',
    category: 'event',
    featured: false
  },
  {
    id: '6',
    title: 'Library Extended Hours During Exam Period',
    content: 'The university library will extend its operating hours during the upcoming examination period. The library will be open 24/7 from September 1st to September 30th to support student preparation.',
    date: '2024-08-01',
    category: 'academic',
    featured: false
  },
  {
    id: '7',
    title: 'New Scholarship Program for Outstanding Students',
    content: 'The university announces a new merit-based scholarship program for students with exceptional academic performance. Applications are now open for the 2024/2025 academic session.',
    date: '2024-07-30',
    category: 'academic',
    featured: true
  },
  {
    id: '8',
    title: 'Campus WiFi Upgrade Completed',
    content: 'The campus-wide WiFi infrastructure upgrade has been completed. Students and staff can now enjoy faster and more reliable internet connectivity across all university facilities.',
    date: '2024-07-28',
    category: 'announcement',
    featured: false
  },
  {
    id: '9',
    title: 'International Students Orientation Program',
    content: 'A comprehensive orientation program has been organized for international students. The program covers academic procedures, campus life, and cultural integration activities.',
    date: '2024-07-25',
    category: 'event',
    featured: false
  },
  {
    id: '10',
    title: 'Faculty Development Workshop on Digital Teaching',
    content: 'A three-day workshop on digital teaching methodologies will be conducted for all faculty members. The workshop aims to enhance online and hybrid teaching capabilities.',
    date: '2024-07-22',
    category: 'academic',
    featured: false
  },
  {
    id: '11',
    title: 'Sports Complex Renovation Project Begins',
    content: 'The renovation of the university sports complex has commenced. The project includes upgrading the gymnasium, swimming pool, and outdoor courts. Completion is expected by December 2024.',
    date: '2024-07-20',
    category: 'announcement',
    featured: false
  },
  {
    id: '12',
    title: 'Guest Lecture Series: Industry Leaders Share Insights',
    content: 'A series of guest lectures featuring prominent industry leaders will be held throughout the semester. Topics include entrepreneurship, innovation, and career development.',
    date: '2024-07-18',
    category: 'event',
    featured: false
  },
  {
    id: '13',
    title: 'Student Health Services Expansion',
    content: 'The university health center has expanded its services to include mental health counseling and wellness programs. All services are free for registered students.',
    date: '2024-07-15',
    category: 'announcement',
    featured: false
  },
  {
    id: '14',
    title: 'Research Grant Opportunities for Graduate Students',
    content: 'Several research grant opportunities are now available for graduate students. Funding ranges from ₦500,000 to ₦2,000,000 depending on the project scope and duration.',
    date: '2024-07-12',
    category: 'academic',
    featured: false
  },
  {
    id: '15',
    title: 'Campus Security Enhancement Measures',
    content: 'New security measures have been implemented across campus including additional CCTV cameras, improved lighting, and 24/7 security patrols for enhanced student safety.',
    date: '2024-07-10',
    category: 'announcement',
    featured: false
  },
  {
    id: '16',
    title: 'Alumni Homecoming Weekend 2024',
    content: 'All alumni are invited to the annual homecoming weekend featuring networking events, campus tours, and reunion dinners. Register early to secure your spot.',
    date: '2024-07-08',
    category: 'event',
    featured: false
  },
  {
    id: '17',
    title: 'Environmental Sustainability Initiative Launch',
    content: 'The university launches a comprehensive environmental sustainability initiative including waste reduction programs, renewable energy projects, and green campus policies.',
    date: '2024-07-05',
    category: 'announcement',
    featured: false
  },
  {
    id: '18',
    title: 'Student Exchange Program Applications Open',
    content: 'Applications are now open for the international student exchange program. Students can apply to study at partner universities in Europe, Asia, and North America.',
    date: '2024-07-03',
    category: 'academic',
    featured: false
  },
  {
    id: '19',
    title: 'Campus Food Services Menu Expansion',
    content: 'The campus cafeteria has expanded its menu to include more diverse and healthy food options. New vendors have been added to provide students with better dining choices.',
    date: '2024-07-01',
    category: 'announcement',
    featured: false
  },
  {
    id: '20',
    title: 'Academic Excellence Awards Ceremony',
    content: 'The annual academic excellence awards ceremony will recognize outstanding students, faculty, and staff members. The event will be held in the main auditorium with live streaming available.',
    date: '2024-06-28',
    category: 'event',
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
  { course: 'CS401', score: 85, students: 45, semester: 'First Semester 2024' },
  { course: 'CS402', score: 78, students: 42, semester: 'First Semester 2024' },
  { course: 'ARC301', score: 82, students: 38, semester: 'First Semester 2024' },
  { course: 'ARC302', score: 79, students: 35, semester: 'First Semester 2024' },
  { course: 'BIO201', score: 88, students: 50, semester: 'First Semester 2024' },
  { course: 'BIO202', score: 84, students: 48, semester: 'First Semester 2024' },
];

export const semesterProgressData = [
  { semester: 'First Semester 2023', gpa: 3.2 },
  { semester: 'Second Semester 2023', gpa: 2.8 },
  { semester: 'First Semester 2024', gpa: 3.6 },
  { semester: 'Second Semester 2024', gpa: 3.1 },
  { semester: 'Current', gpa: 3.8 },
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

// Course schedules for each faculty - Fixed to show each day once
export const facultySchedules = {
  COPAS: [
    { day: 'Monday', time: '8:00-10:00', course: 'CS401', lecturer: 'Dr. Sarah Wilson', room: 'Lab 1' },
    { day: 'Monday', time: '10:00-12:00', course: 'BIO201', lecturer: 'Dr. Emily Chen', room: 'Bio Lab' },
    { day: 'Tuesday', time: '8:00-10:00', course: 'CS402', lecturer: 'Dr. Sarah Wilson', room: 'Lab 2' },
    { day: 'Tuesday', time: '10:00-12:00', course: 'BIO202', lecturer: 'Dr. Emily Chen', room: 'Bio Lab' },
    { day: 'Wednesday', time: '8:00-10:00', course: 'CYB301', lecturer: 'Dr. John Smith', room: 'Cyber Lab' },
    { day: 'Wednesday', time: '10:00-12:00', course: 'SWE401', lecturer: 'Prof. Jane Williams', room: 'Software Lab' },
    { day: 'Thursday', time: '8:00-10:00', course: 'INF201', lecturer: 'Dr. David Brown', room: 'Info Lab' },
    { day: 'Thursday', time: '10:00-12:00', course: 'ENV301', lecturer: 'Dr. Lisa Garcia', room: 'Env Lab' },
    { day: 'Friday', time: '8:00-10:00', course: 'ICH401', lecturer: 'Prof. Robert Miller', room: 'Chem Lab' },
    { day: 'Friday', time: '10:00-12:00', course: 'MIB301', lecturer: 'Dr. Maria Davis', room: 'Micro Lab' }
  ],
  COLENSMA: [
    { day: 'Monday', time: '8:00-10:00', course: 'ARC301', lecturer: 'Prof. Michael Brown', room: 'Design Studio 1' },
    { day: 'Monday', time: '10:00-12:00', course: 'EST201', lecturer: 'Dr. William Rodriguez', room: 'Estate Room' },
    { day: 'Tuesday', time: '8:00-10:00', course: 'ARC302', lecturer: 'Prof. Michael Brown', room: 'Design Studio 2' },
    { day: 'Tuesday', time: '10:00-12:00', course: 'EST301', lecturer: 'Dr. William Rodriguez', room: 'Estate Room' },
    { day: 'Wednesday', time: '8:00-10:00', course: 'ARC401', lecturer: 'Dr. Jennifer Martinez', room: 'Design Studio 3' },
    { day: 'Wednesday', time: '10:00-12:00', course: 'EST401', lecturer: 'Prof. Richard Hernandez', room: 'Estate Lab' },
    { day: 'Thursday', time: '8:00-10:00', course: 'ARC201', lecturer: 'Dr. Linda Lopez', room: 'Drawing Studio' },
    { day: 'Thursday', time: '10:00-12:00', course: 'EST202', lecturer: 'Dr. Barbara Gonzalez', room: 'Survey Lab' },
    { day: 'Friday', time: '8:00-10:00', course: 'ARC101', lecturer: 'Prof. Joseph Wilson', room: 'Theory Room' },
    { day: 'Friday', time: '10:00-12:00', course: 'EST101', lecturer: 'Dr. Susan Anderson', room: 'Intro Room' }
  ],
  CASMAS: [
    { day: 'Monday', time: '8:00-10:00', course: 'BUS301', lecturer: 'Prof. Thomas Thomas', room: 'Business Hall 1' },
    { day: 'Monday', time: '10:00-12:00', course: 'ACC201', lecturer: 'Dr. Jessica Taylor', room: 'Accounting Lab' },
    { day: 'Tuesday', time: '8:00-10:00', course: 'ECO301', lecturer: 'Dr. Christopher Moore', room: 'Economics Room' },
    { day: 'Tuesday', time: '10:00-12:00', course: 'PSY201', lecturer: 'Prof. Karen Jackson', room: 'Psychology Lab' },
    { day: 'Wednesday', time: '8:00-10:00', course: 'MCM301', lecturer: 'Dr. Daniel Martin', room: 'Media Studio' },
    { day: 'Wednesday', time: '10:00-12:00', course: 'BNF201', lecturer: 'Dr. Nancy Lee', room: 'Finance Room' },
    { day: 'Thursday', time: '8:00-10:00', course: 'CRS301', lecturer: 'Prof. Mark Thompson', room: 'Security Room' },
    { day: 'Thursday', time: '10:00-12:00', course: 'INR201', lecturer: 'Dr. Betty White', room: 'Relations Hall' },
    { day: 'Friday', time: '8:00-10:00', course: 'PSC301', lecturer: 'Dr. Donald Harris', room: 'Politics Room' },
    { day: 'Friday', time: '10:00-12:00', course: 'PAD201', lecturer: 'Prof. Helen Sanchez', room: 'Admin Hall' }
  ],
  COLAW: [
    { day: 'Monday', time: '8:00-10:00', course: 'PPL301', lecturer: 'Prof. Steven Clark', room: 'Moot Court 1' },
    { day: 'Monday', time: '10:00-12:00', course: 'PIL201', lecturer: 'Dr. Sandra Ramirez', room: 'Law Library' },
    { day: 'Tuesday', time: '8:00-10:00', course: 'PPL401', lecturer: 'Prof. Steven Clark', room: 'Moot Court 2' },
    { day: 'Tuesday', time: '10:00-12:00', course: 'PIL301', lecturer: 'Dr. Sandra Ramirez', room: 'International Law Room' },
    { day: 'Wednesday', time: '8:00-10:00', course: 'PPL201', lecturer: 'Dr. Paul Lewis', room: 'Property Law Room' },
    { day: 'Wednesday', time: '10:00-12:00', course: 'PIL401', lecturer: 'Prof. Donna Robinson', room: 'Private Law Hall' },
    { day: 'Thursday', time: '8:00-10:00', course: 'LAW101', lecturer: 'Dr. Andrew Walker', room: 'Introduction Hall' },
    { day: 'Thursday', time: '10:00-12:00', course: 'LAW201', lecturer: 'Prof. Carol Perez', room: 'Constitutional Law' },
    { day: 'Friday', time: '8:00-10:00', course: 'LAW301', lecturer: 'Dr. Joshua Hall', room: 'Criminal Law Room' },
    { day: 'Friday', time: '10:00-12:00', course: 'LAW401', lecturer: 'Prof. Ruth Young', room: 'Commercial Law' }
  ],
  NURSING: [
    { day: 'Monday', time: '8:00-10:00', course: 'MCH301', lecturer: 'Prof. Kenneth Allen', room: 'Maternity Ward' },
    { day: 'Monday', time: '10:00-12:00', course: 'CPH201', lecturer: 'Dr. Sharon King', room: 'Community Health Lab' },
    { day: 'Tuesday', time: '8:00-10:00', course: 'AHM301', lecturer: 'Dr. Kevin Wright', room: 'Medical Ward' },
    { day: 'Tuesday', time: '10:00-12:00', course: 'MHP201', lecturer: 'Prof. Betty Scott', room: 'Psychiatric Unit' },
    { day: 'Wednesday', time: '8:00-10:00', course: 'NME301', lecturer: 'Dr. Donald Green', room: 'Management Room' },
    { day: 'Wednesday', time: '10:00-12:00', course: 'HPH201', lecturer: 'Prof. Helen Adams', room: 'Physiology Lab' },
    { day: 'Thursday', time: '8:00-10:00', course: 'HAN301', lecturer: 'Dr. Steven Baker', room: 'Anatomy Lab' },
    { day: 'Thursday', time: '10:00-12:00', course: 'NUR101', lecturer: 'Prof. Sandra Gonzalez', room: 'Nursing Skills Lab' },
    { day: 'Friday', time: '8:00-10:00', course: 'NUR201', lecturer: 'Dr. Paul Nelson', room: 'Clinical Skills' },
    { day: 'Friday', time: '10:00-12:00', course: 'NUR301', lecturer: 'Prof. Donna Carter', room: 'Advanced Nursing' }
  ]
};

// Course syllabi for lecturers - Fixed structure
export const courseSyllabi = {
  'CS401': [
    { topic: 'Introduction to Advanced Programming', completed: true, scheduled: true },
    { topic: 'Object-Oriented Design Patterns', completed: true, scheduled: true },
    { topic: 'Data Structures and Algorithms', completed: true, scheduled: true },
    { topic: 'Database Design and Implementation', completed: false, scheduled: true },
    { topic: 'Web Development Frameworks', completed: false, scheduled: true },
    { topic: 'Software Testing and Quality Assurance', completed: false, scheduled: false },
    { topic: 'Project Management in Software Development', completed: false, scheduled: false },
    { topic: 'Final Project Presentation', completed: false, scheduled: false }
  ],
  'CS402': [
    { topic: 'Computer Networks Fundamentals', completed: true, scheduled: true },
    { topic: 'Network Protocols and Standards', completed: true, scheduled: true },
    { topic: 'Network Security Principles', completed: false, scheduled: true },
    { topic: 'Wireless and Mobile Networks', completed: false, scheduled: true },
    { topic: 'Network Performance Analysis', completed: false, scheduled: false },
    { topic: 'Network Administration', completed: false, scheduled: false }
  ],
  'BIO201': [
    { topic: 'Cell Biology and Molecular Structure', completed: true, scheduled: true },
    { topic: 'Protein Structure and Function', completed: true, scheduled: true },
    { topic: 'Enzyme Kinetics and Metabolism', completed: true, scheduled: true },
    { topic: 'Genetic Engineering Techniques', completed: false, scheduled: true },
    { topic: 'Biotechnology Applications', completed: false, scheduled: true },
    { topic: 'Laboratory Techniques and Safety', completed: false, scheduled: false }
  ],
  'ARC301': [
    { topic: 'Architectural Design Principles', completed: true, scheduled: true },
    { topic: 'Building Materials and Construction', completed: true, scheduled: true },
    { topic: 'Structural Systems in Architecture', completed: false, scheduled: true },
    { topic: 'Environmental Design and Sustainability', completed: false, scheduled: true },
    { topic: 'Urban Planning and Development', completed: false, scheduled: false },
    { topic: 'Architectural History and Theory', completed: false, scheduled: false }
  ]
};

// Helper function to get students by course
export const getStudentsByCourse = (courseCode: string): Student[] => {
  return mockStudents.filter(student => 
    student.courses.some(course => course.courseCode === courseCode)
  );
};

// Get best performing student and lecturer for each faculty
export const getFacultyTopPerformers = (facultyName: string) => {
  const facultyStudents = mockStudents.filter(s => s.faculty === facultyName);
  const facultyLecturers = mockLecturers.filter(l => l.faculty === facultyName);
  
  const topStudent = facultyStudents.reduce((prev, current) => 
    prev.gpa > current.gpa ? prev : current
  );
  
  const topLecturer = facultyLecturers.reduce((prev, current) => 
    prev.rating > current.rating ? prev : current
  );
  
  return { topStudent, topLecturer };
};

// Role-based dashboard metrics
export const getDashboardMetrics = (userRole: string, userId?: string) => {
  const baseMetrics = {
    totalStudents: mockStudents.length,
    totalLecturers: mockLecturers.length,
    totalCourses: 156,
    averageGPA: Number((mockStudents.reduce((sum, s) => sum + s.gpa, 0) / mockStudents.length).toFixed(2))
  };

  switch (userRole) {
    case 'student':
      const student = mockStudents.find(s => s.id === userId) || mockStudents[0];
      return {
        ...baseMetrics,
        myGPA: student.gpa,
        myCourses: student.courses.length,
        myRank: mockStudents.filter(s => s.department === student.department && s.level === student.level && s.gpa > student.gpa).length + 1,
        departmentAverage: Number((mockStudents.filter(s => s.department === student.department).reduce((sum, s) => sum + s.gpa, 0) / mockStudents.filter(s => s.department === student.department).length).toFixed(2))
      };
    
    case 'lecturer':
      const lecturer = mockLecturers.find(l => l.id === userId) || mockLecturers[0];
      const myStudents = mockStudents.filter(s => s.department === lecturer.department);
      return {
        ...baseMetrics,
        myStudents: myStudents.length,
        myCourses: lecturer.courses.length,
        myRating: lecturer.rating,
        departmentStudents: myStudents.length
      };
    
    case 'admin':
    default:
      return {
        ...baseMetrics,
        failingStudents: mockStudents.filter(s => s.gpa < 2.0).length,
        excellentStudents: mockStudents.filter(s => s.gpa >= 4.0).length,
        departmentCount: allDepartments.length,
        facultyCount: mockFaculties.length
      };
  }
};