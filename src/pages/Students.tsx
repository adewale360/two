import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, GraduationCap, TrendingUp, CheckCircle, Clock, BookOpen, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../components/Common/Card';
import Avatar from '../components/Common/Avatar';
import CustomBarChart from '../components/Charts/BarChart';
import CustomLineChart from '../components/Charts/LineChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockStudents, mockPerformanceData, courseSyllabi, academicCalendar } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Students: React.FC = () => {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemesterReport, setSelectedSemesterReport] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState('current');
  const [filters, setFilters] = useState({
    department: '',
    level: ''
  });

  const isStudent = user?.role === 'student';
  const isLecturer = user?.role === 'lecturer';
  const isAdmin = user?.role === 'admin';
  const currentStudent = isStudent ? mockStudents.find(s => s.email === user?.email) || mockStudents[0] : selectedStudent;

  // Filter students based on search and filters - Show all 820 students
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filters.department || student.department === filters.department;
    const matchesLevel = !filters.level || student.level === filters.level;
    
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  // For lecturers, only show students from their department
  const studentsToShow = isLecturer 
    ? filteredStudents.filter(s => s.department === (mockStudents.find(st => st.email === user?.email)?.department || 'Computer Science'))
    : filteredStudents;

  // Enhanced zigzag performance data for realistic academic performance
  const enhancedProgressData = [
    { semester: 'First Semester 2023', gpa: 3.2 },
    { semester: 'Second Semester 2023', gpa: 2.8 },
    { semester: 'First Semester 2024', gpa: 3.6 },
    { semester: 'Second Semester 2024', gpa: 3.1 },
    { semester: 'Current', gpa: currentStudent.gpa },
  ];

  // Get coursemates in same department and level
  const coursemates = mockStudents.filter(s => 
    s.department === currentStudent.department && 
    s.level === currentStudent.level &&
    s.id !== currentStudent.id
  ).sort((a, b) => b.gpa - a.gpa);

  // Generate semester reports based on student level
  const generateSemesterReports = (student: any) => {
    const level = parseInt(student.level);
    const maxSemesters = Math.min(8, (level - 1) * 2); // Maximum semesters completed
    
    if (maxSemesters === 0) return []; // 100 level 1st semester has no previous results
    
    const reports = [];
    for (let semesterNum = 1; semesterNum <= maxSemesters; semesterNum++) {
      const reportLevel = Math.ceil(semesterNum / 2) * 100;
      const isFirstSemester = semesterNum % 2 === 1;
      const semesterName = `${reportLevel} Level ${isFirstSemester ? '1st' : '2nd'} Semester`;
      
      const semesterGPA = Math.max(0, Math.min(5, student.gpa + (Math.random() - 0.5) * 0.8));
      
      reports.push({
        semester: semesterNum,
        semesterName,
        gpa: Number(semesterGPA.toFixed(2)),
        courses: Array.from({ length: Math.floor(Math.random() * 3) + 6 }, (_, idx) => {
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
          
          const { grade, score } = generateGrade(semesterGPA);
          return {
            courseCode: `${student.department.substring(0, 3).toUpperCase()}${reportLevel.toString().charAt(0)}0${idx + 1}`,
            courseName: `${student.department} Course ${idx + 1}`,
            grade,
            score
          };
        })
      });
    }
    
    return reports;
  };

  // Update current student with generated semester reports
  const currentStudentWithReports = {
    ...currentStudent,
    semesterReports: generateSemesterReports(currentStudent)
  };

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
            {isStudent ? 'My Performance' : isLecturer ? 'My Students' : 'Student Performance'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-dark-muted">
            {isStudent ? 'Track your academic progress' : 
             isLecturer ? 'Monitor your students performance' :
             'Monitor and analyze student performance'}
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-3 py-2 rounded text-sm hover:bg-primary-700 transition-colors">
          <Download className="h-3 w-3" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Academic Calendar Widget with proper tab styling */}
      <Card>
        <div className="calendar-tab">
          <button
            onClick={() => setActiveTab('current')}
            className={`calendar-tab-button ${activeTab === 'current' ? 'active' : 'inactive'}`}
          >
            Current Semester
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`calendar-tab-button ${activeTab === 'calendar' ? 'active' : 'inactive'}`}
          >
            Academic Calendar
          </button>
        </div>

        {activeTab === 'current' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 compact-grid">
            <div className="text-center minimal-padding bg-blue-50 dark:bg-blue-900/20 rounded">
              <p className="text-lg font-bold text-blue-600">{academicCalendar.currentSemester}</p>
              <p className="text-xs text-gray-600 dark:text-dark-muted">Current Semester</p>
            </div>
            <div className="text-center minimal-padding bg-green-50 dark:bg-green-900/20 rounded">
              <p className="text-lg font-bold text-green-600">{academicCalendar.currentSession}</p>
              <p className="text-xs text-gray-600 dark:text-dark-muted">Academic Session</p>
            </div>
            <div className="text-center minimal-padding bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <p className="text-lg font-bold text-yellow-600">{mockStudents.length}</p>
              <p className="text-xs text-gray-600 dark:text-dark-muted">Total Students</p>
            </div>
            <div className="text-center minimal-padding bg-purple-50 dark:bg-purple-900/20 rounded">
              <p className="text-lg font-bold text-purple-600">
                {academicCalendar.events.filter(e => new Date(e.date) > new Date()).length}
              </p>
              <p className="text-xs text-gray-600 dark:text-dark-muted">Upcoming Events</p>
            </div>
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-3">
            <h4 className="compact-subheader text-gray-900 dark:text-dark-text">Upcoming Events</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
              {academicCalendar.events.filter(e => new Date(e.date) > new Date()).slice(0, 6).map((event, index) => (
                <div key={index} className="flex items-center space-x-3 minimal-padding bg-gray-50 dark:bg-dark-card rounded">
                  <Calendar className="h-4 w-4 text-primary-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{event.title}</p>
                    <p className="text-xs text-gray-600 dark:text-dark-muted">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {!isStudent && (
        <>
          {/* Filters - No semester filtering, all students in first semester */}
          <Card>
            <div className="flex flex-wrap items-center gap-3 py-1">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-dark-border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-surface dark:text-dark-text"
                />
              </div>
              <select 
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-surface dark:text-dark-text min-w-0"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Architecture">Architecture</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Information Systems">Information Systems</option>
                <option value="Environmental Management and Toxicology">Environmental Management</option>
                <option value="Industrial Chemistry">Industrial Chemistry</option>
                <option value="Microbiology and Industrial Biotechnology">Microbiology</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Accounting">Accounting</option>
                <option value="Economics">Economics</option>
                <option value="Mass Communication">Mass Communication</option>
                <option value="Psychology">Psychology</option>
                <option value="Banking and Finance">Banking and Finance</option>
                <option value="Criminology and Security Studies">Criminology</option>
                <option value="International Relations">International Relations</option>
                <option value="Peace Studies and Conflict Resolution">Peace Studies</option>
                <option value="Political Science">Political Science</option>
                <option value="Public Administration">Public Administration</option>
                <option value="Taxation">Taxation</option>
                <option value="Estate Management">Estate Management</option>
                <option value="Public and Property Law">Public and Property Law</option>
                <option value="Private and International Law">Private and International Law</option>
                <option value="Maternal and Child Health Nursing">Maternal Health Nursing</option>
                <option value="Community and Public Health Nursing">Community Health Nursing</option>
                <option value="Adult Health/Medical and Surgical Nursing">Medical Nursing</option>
                <option value="Mental Health and Psychiatric Nursing">Psychiatric Nursing</option>
                <option value="Nursing Management and Education">Nursing Management</option>
                <option value="Human Physiology">Human Physiology</option>
                <option value="Human Anatomy">Human Anatomy</option>
              </select>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-dark-border rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-dark-surface dark:text-dark-text min-w-0"
              >
                <option value="">All Levels</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
              </select>
              <div className="text-sm text-gray-600 dark:text-dark-muted whitespace-nowrap">
                Showing {studentsToShow.length} of {mockStudents.length} students
              </div>
            </div>
          </Card>

          {/* Student List - Show all filtered students */}
          <Card title={isLecturer ? "My Students" : "Students"}>
            <div className="overflow-x-auto">
              <table className="w-full compact-table">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Student</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">ID</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Department</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Level</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">GPA</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Status</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studentsToShow.map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-card">
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <Avatar name={student.name} type="student" size="sm" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-dark-text">{student.name}</p>
                            <p className="text-xs text-gray-500 dark:text-dark-muted">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-dark-text">{student.studentId}</td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-dark-text">{student.department}</td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-dark-text">{student.level}</td>
                      <td className="py-2 px-3">
                        <span className={`text-sm font-semibold ${
                          student.gpa >= 4.0 ? 'text-green-600' : 
                          student.gpa >= 3.0 ? 'text-yellow-600' : 
                          student.gpa >= 2.0 ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {student.gpa.toFixed(2)}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          student.gpa >= 4.0 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          student.gpa >= 3.0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          student.gpa >= 2.0 ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}>
                          {student.gpa >= 4.0 ? 'Excellent' :
                           student.gpa >= 3.0 ? 'Good' :
                           student.gpa >= 2.0 ? 'Fair' :
                           'At Risk'}
                        </span>
                      </td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => setSelectedStudent(student)}
                          className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}

      {/* Course Syllabus Checklist for Students */}
      {isStudent && (
        <Card title="Course Progress Tracker">
          <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
            {currentStudent.courses.slice(0, 4).map((course, index) => {
              const syllabus = courseSyllabi[course.courseCode] || [];
              return (
                <div key={index} className="bg-gray-50 dark:bg-dark-card minimal-padding rounded">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-dark-text">{course.courseCode}</h4>
                    <span className="text-xs text-gray-600 dark:text-dark-muted">
                      {syllabus.filter(s => s.completed).length}/{syllabus.length} topics
                    </span>
                  </div>
                  <div className="space-y-1">
                    {syllabus.slice(0, 3).map((topic, topicIndex) => (
                      <div key={topicIndex} className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className={`h-3 w-3 ${topic.completed ? 'text-green-500' : 'text-gray-300'}`} />
                          <Clock className={`h-3 w-3 ${topic.scheduled ? 'text-blue-500' : 'text-gray-300'}`} />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-dark-muted truncate">
                          {topic.topic}
                        </span>
                      </div>
                    ))}
                    {syllabus.length > 3 && (
                      <p className="text-xs text-gray-500 dark:text-dark-muted">
                        +{syllabus.length - 3} more topics
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
        <CustomBarChart
          data={currentStudent.courses.slice(0, 6).map(course => ({ 
            course: course.courseCode, 
            score: course.score 
          }))}
          dataKey="score"
          xAxisKey="course"
          title="Course Performance"
          color="#3b82f6"
        />
        
        <CustomLineChart
          data={enhancedProgressData}
          dataKey="gpa"
          xAxisKey="semester"
          title="GPA Progress Over Time"
          color="#10b981"
        />
        
        <DonutChart
          data={[
            { name: 'A (90-100)', value: currentStudent.courses.filter(c => c.score >= 90).length, fill: '#10b981' },
            { name: 'B (80-89)', value: currentStudent.courses.filter(c => c.score >= 80 && c.score < 90).length, fill: '#3b82f6' },
            { name: 'C (70-79)', value: currentStudent.courses.filter(c => c.score >= 70 && c.score < 80).length, fill: '#f59e0b' },
            { name: 'D (60-69)', value: currentStudent.courses.filter(c => c.score >= 60 && c.score < 70).length, fill: '#ef4444' },
            { name: 'F (0-59)', value: currentStudent.courses.filter(c => c.score < 60).length, fill: '#6b7280' },
          ]}
          title="Grade Distribution"
        />
      </div>

      {/* Student Details */}
      <Card title={`${currentStudent.name} - Performance Details`}>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar name={currentStudent.name} type="student" size="xl" />
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text">{currentStudent.name}</h3>
            <p className="text-sm text-gray-600 dark:text-dark-muted">{currentStudent.department} • Level {currentStudent.level}</p>
            <p className="text-xs text-gray-500 dark:text-dark-muted">{currentStudent.studentId}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 compact-grid mb-4">
          <div className="text-center minimal-padding bg-gray-50 dark:bg-dark-card rounded">
            <p className="text-lg font-bold text-primary-600">{currentStudent.gpa.toFixed(2)}</p>
            <p className="text-xs text-gray-600 dark:text-dark-muted">Current GPA</p>
          </div>
          <div className="text-center minimal-padding bg-gray-50 dark:bg-dark-card rounded">
            <p className="text-lg font-bold text-green-600">{currentStudent.level}</p>
            <p className="text-xs text-gray-600 dark:text-dark-muted">Level</p>
          </div>
          <div className="text-center minimal-padding bg-gray-50 dark:bg-dark-card rounded">
            <p className="text-lg font-bold text-yellow-600">{currentStudent.semester}</p>
            <p className="text-xs text-gray-600 dark:text-dark-muted">Semester</p>
          </div>
          <div className="text-center minimal-padding bg-gray-50 dark:bg-dark-card rounded">
            <p className="text-lg font-bold text-purple-600">{currentStudent.courses.length}</p>
            <p className="text-xs text-gray-600 dark:text-dark-muted">Courses</p>
          </div>
          <div className="text-center minimal-padding bg-gray-50 dark:bg-dark-card rounded">
            <p className={`text-lg font-bold ${
              currentStudent.gpa >= 4.0 ? 'text-green-600' :
              currentStudent.gpa >= 3.0 ? 'text-yellow-600' :
              currentStudent.gpa >= 2.0 ? 'text-orange-600' :
              'text-red-600'
            }`}>
              {currentStudent.gpa >= 4.0 ? 'Excellent' :
               currentStudent.gpa >= 3.0 ? 'Good' :
               currentStudent.gpa >= 2.0 ? 'Fair' :
               'At Risk'}
            </p>
            <p className="text-xs text-gray-600 dark:text-dark-muted">Status</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full compact-table">
            <thead>
              <tr className="border-b border-gray-200 dark:border-dark-border">
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Course Code</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Course Name</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Score</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Grade</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent.courses.map((course, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-dark-border">
                  <td className="py-2 px-3 text-sm font-medium text-gray-900 dark:text-dark-text">{course.courseCode}</td>
                  <td className="py-2 px-3 text-sm text-gray-900 dark:text-dark-text">{course.courseName}</td>
                  <td className="py-2 px-3 text-sm text-gray-900 dark:text-dark-text">{course.score}%</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      course.grade === 'A+' || course.grade === 'A' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : course.grade === 'B+' || course.grade === 'B'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : course.grade === 'C+' || course.grade === 'C'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        : course.grade === 'D+' || course.grade === 'D'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    }`}>
                      {course.grade}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className={`flex items-center text-xs ${
                      course.score >= 60 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {course.score >= 60 ? 'Passed' : 'Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Previous Semester Reports - For all roles with proper logic */}
      {currentStudentWithReports.semesterReports && currentStudentWithReports.semesterReports.length > 0 && (
        <Card title="Previous Semester Reports">
          <div className="space-y-3">
            {currentStudentWithReports.semesterReports.map((report, index) => (
              <div key={index} className="border border-gray-200 dark:border-dark-border rounded-lg">
                <button
                  onClick={() => setSelectedSemesterReport(selectedSemesterReport === report.semester ? null : report.semester)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-50 dark:hover:bg-dark-card transition-colors"
                >
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-dark-text">
                      {report.semesterName}
                    </h4>
                    
                    <p className="text-xs text-gray-600 dark:text-dark-muted">
                      GPA: {report.gpa.toFixed(2)} • {report.courses.length} courses
                    </p>
                  </div>
                  {selectedSemesterReport === report.semester ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>
                
                {selectedSemesterReport === report.semester && (
                  <div className="px-3 pb-3">
                    <div className="overflow-x-auto">
                      <table className="w-full compact-table">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-dark-border">
                            <th className="text-left py-1 px-2 text-xs font-medium text-gray-600 dark:text-dark-muted">Course</th>
                            <th className="text-left py-1 px-2 text-xs font-medium text-gray-600 dark:text-dark-muted">Score</th>
                            <th className="text-left py-1 px-2 text-xs font-medium text-gray-600 dark:text-dark-muted">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {report.courses.map((course, courseIndex) => (
                            <tr key={courseIndex} className="border-b border-gray-100 dark:border-dark-border">
                              <td className="py-1 px-2 text-xs text-gray-900 dark:text-dark-text">{course.courseCode}</td>
                              <td className="py-1 px-2 text-xs text-gray-900 dark:text-dark-text">{course.score}%</td>
                              <td className="py-1 px-2 text-xs">
                                <span className={`px-1 py-0.5 rounded text-xs ${
                                  course.grade === 'A+' || course.grade === 'A' 
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                    : course.grade === 'B+' || course.grade === 'B'
                                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                                    : course.grade === 'C+' || course.grade === 'C'
                                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                  {course.grade}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Show message for 100 level 1st semester students */}
      {currentStudentWithReports.semesterReports.length === 0 && (
        <Card title="Previous Semester Reports">
          <div className="text-center py-8">
            <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Previous Results
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              As a {currentStudent.level} level 1st semester student, you don't have any previous semester results yet.
            </p>
          </div>
        </Card>
      )}

      {/* Coursemates Performance Comparison for Students */}
      {isStudent && (
        <Card title="Department Leaderboard - Your Level">
          <div className="overflow-x-auto">
            <table className="w-full compact-table">
              <thead>
                <tr className="border-b border-gray-200 dark:border-dark-border">
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Rank</th>
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Student</th>
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">GPA</th>
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-dark-text">Status</th>
                </tr>
              </thead>
              <tbody>
                {/* Show current student's position */}
                {(() => {
                  const allStudentsInLevel = mockStudents.filter(s => 
                    s.department === currentStudent.department && s.level === currentStudent.level
                  ).sort((a, b) => b.gpa - a.gpa);
                  const currentRank = allStudentsInLevel.findIndex(s => s.id === currentStudent.id) + 1;
                  
                  return (
                    <tr className="border-b border-gray-100 dark:border-dark-border bg-blue-50 dark:bg-blue-900/20">
                      <td className="py-2 px-3 text-sm font-bold text-blue-600">{currentRank}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <Avatar name={currentStudent.name} type="student" size="sm" />
                          <span className="text-sm font-bold text-blue-600">{currentStudent.name} (You)</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm font-bold text-blue-600">{currentStudent.gpa.toFixed(2)}</td>
                      <td className="py-2 px-3">
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                          Current Position
                        </span>
                      </td>
                    </tr>
                  );
                })()}
                {coursemates.slice(0, 10).map((student, index) => {
                  const rank = mockStudents.filter(s => 
                    s.department === currentStudent.department && 
                    s.level === currentStudent.level &&
                    s.gpa > student.gpa
                  ).length + 1;
                  
                  return (
                    <tr key={student.id} className="border-b border-gray-100 dark:border-dark-border">
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-dark-text">{rank}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <Avatar name={student.name} type="student" size="sm" />
                          <span className="text-sm text-gray-900 dark:text-dark-text">{student.name}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-dark-text">{student.gpa.toFixed(2)}</td>
                      <td className="py-2 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          student.gpa >= 4.0 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          student.gpa >= 3.0 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
                        }`}>
                          {student.gpa >= 4.0 ? 'Excellent' : student.gpa >= 3.0 ? 'Good' : 'Fair'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Students;