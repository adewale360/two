import React, { useState } from 'react';
import { Search, Plus, User, Star, TrendingUp, Users, Calendar, CheckCircle, BarChart3, BookOpen, Clock, X } from 'lucide-react';
import Card from '../components/Common/Card';
import Avatar from '../components/Common/Avatar';
import CustomBarChart from '../components/Charts/BarChart';
import { mockLecturers, mockPerformanceData, getStudentsByCourse, courseSyllabi, mockStudents } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Lecturers: React.FC = () => {
  const { user } = useAuth();
  const [selectedLecturer, setSelectedLecturer] = useState(mockLecturers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [showResultForm, setShowResultForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showSyllabusModal, setShowSyllabusModal] = useState(false);
  const [selectedSyllabusCourse, setSelectedSyllabusCourse] = useState('');
  const [syllabusState, setSyllabusState] = useState(courseSyllabi);
  const [resultForm, setResultForm] = useState({
    courseCode: '',
    semester: '1st',
    year: '2024',
    score: ''
  });

  const isLecturer = user?.role === 'lecturer';
  const isAdmin = user?.role === 'admin';
  const currentLecturer = isLecturer ? mockLecturers.find(l => l.email === user?.email) || mockLecturers[0] : selectedLecturer;

  // Filter lecturers based on search and department
  const filteredLecturers = mockLecturers.filter(lecturer => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.staffId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !departmentFilter || lecturer.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  // Get students for lecturer's courses only (real-time enrollment)
  const studentsForCourse = selectedCourse ? getStudentsByCourse(selectedCourse) : [];

  // Mock syllabus coverage data for heat map
  const syllabusData = currentLecturer.courses.map(course => {
    const syllabus = syllabusState[course] || [];
    const completedCount = syllabus.filter(s => s.completed).length;
    const scheduledCount = syllabus.filter(s => s.scheduled).length;
    
    return {
      course,
      coverage: syllabus.length > 0 ? Math.round((completedCount / syllabus.length) * 100) : 0,
      classesTaken: scheduledCount,
      totalClasses: syllabus.length
    };
  });

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Result submitted:', {
      ...resultForm,
      studentId: selectedStudent,
      courseCode: selectedCourse
    });
    setShowResultForm(false);
    setResultForm({ courseCode: '', semester: '1st', year: '2024', score: '' });
    setSelectedCourse('');
    setSelectedStudent('');
  };

  const handleSyllabusUpdate = (courseCode: string, topicIndex: number, field: 'completed' | 'scheduled') => {
    setSyllabusState(prev => ({
      ...prev,
      [courseCode]: prev[courseCode]?.map((topic, index) => 
        index === topicIndex 
          ? { ...topic, [field]: !topic[field] }
          : topic
      ) || []
    }));
  };

  // Get students for lecturer's department only (for lecturer role)
  const departmentStudents = isLecturer 
    ? mockStudents.filter(s => s.department === currentLecturer.department)
    : [];

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text">
            {isLecturer ? 'Course Management' : 'Lecturers'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-dark-muted">
            {isLecturer ? 'Manage your courses and track student performance' : 'Monitor lecturer performance and course management'}
          </p>
        </div>
        {isLecturer && (
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowSyllabusModal(true)}
              className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded text-sm hover:bg-green-700 transition-colors"
            >
              <BookOpen className="h-3 w-3" />
              <span>Manage Syllabus</span>
            </button>
            <button 
              onClick={() => setShowResultForm(true)}
              className="flex items-center space-x-2 bg-primary-600 text-white px-3 py-2 rounded text-sm hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-3 w-3" />
              <span>Submit Results</span>
            </button>
          </div>
        )}
      </div>

      {!isLecturer && (
        <>
          {/* Search and Filters */}
          <Card>
            <div className="flex flex-wrap items-center gap-3 py-1">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lecturers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select 
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white min-w-0"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Architecture">Architecture</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Information Systems">Information Systems</option>
                <option value="Business Administration">Business Administration</option>
                <option value="Accounting">Accounting</option>
                <option value="Economics">Economics</option>
                <option value="Mass Communication">Mass Communication</option>
                <option value="Psychology">Psychology</option>
                <option value="Estate Management">Estate Management</option>
                <option value="Public and Property Law">Public and Property Law</option>
                <option value="Private and International Law">Private and International Law</option>
                <option value="Nursing Science">Nursing Science</option>
                <option value="Human Physiology">Human Physiology</option>
                <option value="Human Anatomy">Human Anatomy</option>
              </select>
              <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Showing {filteredLecturers.length} of {mockLecturers.length} lecturers
              </div>
            </div>
          </Card>

          {/* Lecturer List */}
          <Card title="Lecturers">
            <div className="overflow-x-auto">
              <table className="w-full compact-table">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Lecturer</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Staff ID</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Department</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Courses</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Rating</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Students</th>
                    <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLecturers.map((lecturer) => (
                    <tr key={lecturer.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-2 px-3">
                        <div className="flex items-center space-x-2">
                          <Avatar name={lecturer.name} type="lecturer" size="sm" />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{lecturer.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{lecturer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{lecturer.staffId}</td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{lecturer.department}</td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{lecturer.courses.length}</td>
                      <td className="py-2 px-3">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 mr-1" />
                          <span className="text-sm font-semibold text-gray-900 dark:text-white">{lecturer.rating}</span>
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{lecturer.studentsCount}</td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => setSelectedLecturer(lecturer)}
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

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 compact-grid">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {isLecturer ? 'My Rating' : 'Average Rating'}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {currentLecturer.rating}/5.0
              </p>
            </div>
            <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded">
              <Star className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {isLecturer ? 'My Students' : 'Total Students'}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {currentLecturer.studentsCount}
              </p>
            </div>
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {isLecturer ? 'My Courses' : 'Courses Taught'}
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {currentLecturer.courses.length}
              </p>
            </div>
            <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded">
              <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Course Performance, Syllabus Coverage, and Course Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
        {/* Course Performance */}
        <CustomBarChart
          data={mockPerformanceData.slice(0, 3)}
          dataKey="score"
          xAxisKey="course"
          title={`${currentLecturer.name.split(' ')[1]} - Course Performance`}
          color="#10b981"
        />

        {/* Syllabus Coverage Heat Map */}
        <Card title="Syllabus Coverage & Classes">
          <div className="tight-spacing">
            {syllabusData.map((data, index) => (
              <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{data.course}</h4>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-3 w-3 text-gray-500" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      {data.classesTaken}/{data.totalClasses}
                    </span>
                  </div>
                </div>
                
                {/* Syllabus Coverage Heat Map */}
                <div className="mb-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Syllabus Coverage</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">{data.coverage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        data.coverage >= 90 ? 'bg-green-500' :
                        data.coverage >= 75 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${data.coverage}%` }}
                    ></div>
                  </div>
                </div>

                {/* Classes Progress */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Classes Completed</span>
                    <span className="text-xs font-medium text-gray-900 dark:text-white">
                      {Math.round((data.classesTaken / data.totalClasses) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full bg-blue-500"
                      style={{ width: `${(data.classesTaken / data.totalClasses) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Course Details */}
        <Card title="Course Details">
          <div className="tight-spacing">
            {currentLecturer.courses.map((courseCode, index) => {
              const courseData = mockPerformanceData.find(p => p.course === courseCode);
              const syllabusInfo = syllabusData.find(s => s.course === courseCode);
              
              return (
                <div key={index} className="flex items-center justify-between minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{courseCode}</h4>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {courseData ? `${courseData.students} students` : 'No data available'}
                      </p>
                      <div className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {syllabusInfo?.coverage}% syllabus
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <BarChart3 className="h-3 w-3 text-blue-500" />
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {syllabusInfo?.classesTaken}/{syllabusInfo?.totalClasses} classes
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {courseData ? `${courseData.score}%` : 'N/A'}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Avg Score</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Student Reports Section for Lecturers only */}
      {isLecturer && (
        <Card title="My Students Reports">
          <div className="overflow-x-auto">
            <table className="w-full compact-table">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Student</th>
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Department</th>
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Level</th>
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Current GPA</th>
                  <th className="text-left py-2 px-3 compact-subheader text-gray-900 dark:text-white">Semester Reports</th>
                </tr>
              </thead>
              <tbody>
                {departmentStudents.slice(0, 20).map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="py-2 px-3">
                      <div className="flex items-center space-x-2">
                        <Avatar name={student.name} type="student" size="sm" />
                        <span className="text-sm text-gray-900 dark:text-white">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{student.department}</td>
                    <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{student.level}</td>
                    <td className="py-2 px-3 text-sm font-semibold text-gray-900 dark:text-white">{student.gpa.toFixed(2)}</td>
                    <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">
                      {student.semesterReports?.length || 0} previous semesters
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Syllabus Management Modal - Fixed positioning */}
      {showSyllabusModal && (
        <div className="modal-overlay">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Manage Course Syllabus</h3>
              <button
                onClick={() => setShowSyllabusModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Course Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Course
              </label>
              <select
                value={selectedSyllabusCourse}
                onChange={(e) => setSelectedSyllabusCourse(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Choose a course to manage</option>
                {currentLecturer.courses.map(course => (
                  <option key={course} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Syllabus Content */}
            {selectedSyllabusCourse && syllabusState[selectedSyllabusCourse] && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {selectedSyllabusCourse} Syllabus
                  </h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {syllabusState[selectedSyllabusCourse].filter(t => t.completed).length} of {syllabusState[selectedSyllabusCourse].length} topics completed
                  </div>
                </div>
                
                <div className="grid gap-3">
                  {syllabusState[selectedSyllabusCourse].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {topic.topic}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={topic.scheduled}
                            onChange={() => handleSyllabusUpdate(selectedSyllabusCourse, index, 'scheduled')}
                            className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Scheduled</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={topic.completed}
                            onChange={() => handleSyllabusUpdate(selectedSyllabusCourse, index, 'completed')}
                            className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-2"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">Completed</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Result Submission Modal - Fixed positioning */}
      {showResultForm && (
        <div className="modal-overlay">
          <div className="modal-content bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="compact-header text-gray-900 dark:text-white">Submit Course Results</h3>
              <button
                onClick={() => setShowResultForm(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>

            {/* Step 1: Select Course */}
            {!selectedCourse && (
              <div className="compact-spacing">
                <h4 className="compact-subheader text-gray-900 dark:text-white">Select Course</h4>
                <div className="tight-spacing">
                  {currentLecturer.courses.map(course => (
                    <button
                      key={course}
                      onClick={() => setSelectedCourse(course)}
                      className="w-full minimal-padding text-left border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{course}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {getStudentsByCourse(course).length} students enrolled
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Student */}
            {selectedCourse && !selectedStudent && (
              <div className="compact-spacing">
                <div className="flex items-center justify-between">
                  <h4 className="compact-subheader text-gray-900 dark:text-white">
                    Select Student - {selectedCourse}
                  </h4>
                  <button
                    onClick={() => setSelectedCourse('')}
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    Change Course
                  </button>
                </div>
                <div className="tight-spacing max-h-48 overflow-y-auto">
                  {studentsForCourse.map(student => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudent(student.id)}
                      className="w-full minimal-padding text-left border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {student.studentId} • {student.department}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Submit Result */}
            {selectedCourse && selectedStudent && (
              <form onSubmit={handleResultSubmit} className="compact-spacing">
                <div className="flex items-center justify-between">
                  <h4 className="compact-subheader text-gray-900 dark:text-white">Submit Result</h4>
                  <button
                    type="button"
                    onClick={() => setSelectedStudent('')}
                    className="text-xs text-primary-600 hover:text-primary-700"
                  >
                    Change Student
                  </button>
                </div>
                
                <div className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                  <div className="text-xs">
                    <div><strong>Course:</strong> {selectedCourse}</div>
                    <div><strong>Student:</strong> {studentsForCourse.find(s => s.id === selectedStudent)?.name}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 compact-grid">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Semester
                    </label>
                    <select
                      value={resultForm.semester}
                      onChange={(e) => setResultForm({ ...resultForm, semester: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="1st">1st Semester</option>
                      <option value="2nd">2nd Semester</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Year
                    </label>
                    <select
                      value={resultForm.year}
                      onChange={(e) => setResultForm({ ...resultForm, year: e.target.value })}
                      className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={resultForm.score}
                    onChange={(e) => setResultForm({ ...resultForm, score: e.target.value })}
                    className="w-full px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowResultForm(false)}
                    className="flex-1 px-3 py-2 text-xs border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-3 py-2 text-xs bg-primary-600 text-white rounded hover:bg-primary-700"
                  >
                    Submit Result
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Lecturers;