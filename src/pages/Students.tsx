import React, { useState } from 'react';
import { Search, Filter, Download, GraduationCap, TrendingUp } from 'lucide-react';
import Card from '../components/Common/Card';
import CustomBarChart from '../components/Charts/BarChart';
import CustomLineChart from '../components/Charts/LineChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockStudents, mockPerformanceData, semesterProgressData, scoreDistributionData } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Students: React.FC = () => {
  const { user } = useAuth();
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    level: '',
    semester: ''
  });

  const isStudent = user?.role === 'student';
  const currentStudent = isStudent ? mockStudents.find(s => s.email === user?.email) || mockStudents[0] : selectedStudent;

  // Filter students based on search and filters
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !filters.department || student.department === filters.department;
    const matchesLevel = !filters.level || student.level === filters.level;
    const matchesSemester = !filters.semester || student.semester.toString() === filters.semester;
    
    return matchesSearch && matchesDepartment && matchesLevel && matchesSemester;
  });

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isStudent ? 'My Performance' : 'Student Performance'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isStudent ? 'Track your academic progress' : 'Monitor and analyze student performance'}
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-3 py-2 rounded text-sm hover:bg-primary-700 transition-colors">
          <Download className="h-3 w-3" />
          <span>Export Report</span>
        </button>
      </div>

      {!isStudent && (
        <>
          {/* Filters */}
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-5 compact-grid">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select
                value={filters.department}
                onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Architecture">Architecture</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
              <select
                value={filters.level}
                onChange={(e) => setFilters({ ...filters, level: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Levels</option>
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
                <option value="300">300 Level</option>
                <option value="400">400 Level</option>
              </select>
              <select
                value={filters.semester}
                onChange={(e) => setFilters({ ...filters, semester: e.target.value })}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Semesters</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
                <option value="7">7th Semester</option>
                <option value="8">8th Semester</option>
              </select>
              <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                Showing {filteredStudents.length} of {mockStudents.length} students
              </div>
            </div>
          </Card>

          {/* Student List */}
          <Card title="Students">
            <div className="overflow-x-auto">
              <table className="w-full compact-table">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Student</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">ID</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Department</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Level</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">GPA</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.slice(0, 10).map((student) => (
                    <tr key={student.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                            <GraduationCap className="h-3 w-3 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{student.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{student.studentId}</td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{student.department}</td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{student.level}</td>
                      <td className="py-2 px-3">
                        <span className={`text-sm font-semibold ${student.gpa >= 4.0 ? 'text-green-600' : student.gpa >= 3.0 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {student.gpa}
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

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
        <CustomBarChart
          data={currentStudent.courses.map(course => ({ 
            course: course.courseCode, 
            score: course.score 
          }))}
          dataKey="score"
          xAxisKey="course"
          title="Course Performance"
          color="#3b82f6"
        />
        
        <CustomLineChart
          data={semesterProgressData}
          dataKey="gpa"
          xAxisKey="semester"
          title="GPA Progress Over Time"
          color="#10b981"
        />
        
        <DonutChart
          data={scoreDistributionData}
          title="Score Distribution"
        />
      </div>

      {/* Student Details */}
      <Card title={`${currentStudent.name} - Performance Details`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 compact-grid mb-4">
          <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-lg font-bold text-primary-600">{currentStudent.gpa}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Current GPA</p>
          </div>
          <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-lg font-bold text-green-600">{currentStudent.level}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Level</p>
          </div>
          <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-lg font-bold text-yellow-600">{currentStudent.semester}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Semester</p>
          </div>
          <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
            <p className="text-lg font-bold text-purple-600">{currentStudent.courses.length}</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Courses</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full compact-table">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Course Code</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Course Name</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Score</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Grade</th>
                <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentStudent.courses.map((course, index) => (
                <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-2 px-3 text-sm font-medium text-gray-900 dark:text-white">{course.courseCode}</td>
                  <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{course.courseName}</td>
                  <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{course.score}%</td>
                  <td className="py-2 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      course.grade === 'A+' || course.grade === 'A' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                        : course.grade === 'B+' || course.grade === 'B'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                    }`}>
                      {course.grade}
                    </span>
                  </td>
                  <td className="py-2 px-3">
                    <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Passed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Students;