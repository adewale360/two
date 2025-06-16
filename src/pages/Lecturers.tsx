import React, { useState } from 'react';
import { Search, Plus, User, Star, TrendingUp, Users, Calendar, CheckCircle, BarChart3 } from 'lucide-react';
import Card from '../components/Common/Card';
import CustomBarChart from '../components/Charts/BarChart';
import { mockLecturers, mockPerformanceData, getStudentsByCourse } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Lecturers: React.FC = () => {
  const { user } = useAuth();
  const [selectedLecturer, setSelectedLecturer] = useState(mockLecturers[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [showResultForm, setShowResultForm] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [resultForm, setResultForm] = useState({
    courseCode: '',
    semester: '1st',
    year: '2024',
    score: ''
  });

  const isLecturer = user?.role === 'lecturer';
  const currentLecturer = isLecturer ? mockLecturers.find(l => l.email === user?.email) || mockLecturers[0] : selectedLecturer;

  // Filter lecturers based on search and department
  const filteredLecturers = mockLecturers.filter(lecturer => {
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.staffId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !departmentFilter || lecturer.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

  const studentsForCourse = selectedCourse ? getStudentsByCourse(selectedCourse) : [];

  // Mock syllabus coverage data for heat map
  const syllabusData = currentLecturer.courses.map(course => ({
    course,
    coverage: Math.floor(Math.random() * 30) + 70, // 70-100% coverage
    classesTaken: Math.floor(Math.random() * 5) + 10, // 10-15 classes
    totalClasses: 15
  }));

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

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isLecturer ? 'My Teaching Dashboard' : 'Lecturer Management'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isLecturer ? 'Manage your courses and track student performance' : 'Monitor lecturer performance and course management'}
          </p>
        </div>
        {isLecturer && (
          <button 
            onClick={() => setShowResultForm(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-3 py-2 rounded text-sm hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-3 w-3" />
            <span>Submit Results</span>
          </button>
        )}
      </div>

      {!isLecturer && (
        <>
          {/* Search and Filters */}
          <Card>
            <div className="flex items-center space-x-3">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lecturers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select 
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Architecture">Architecture</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Software Engineering">Software Engineering</option>
                <option value="Cyber Security">Cyber Security</option>
              </select>
              <div className="text-sm text-gray-600 dark:text-gray-400">
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
                          <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-primary-600" />
                          </div>
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

      {/* Course Performance and Syllabus Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
        <CustomBarChart
          data={mockPerformanceData.slice(0, 3)}
          dataKey="score"
          xAxisKey="course"
          title={`${currentLecturer.name.split(' ')[1]} - Course Performance`}
          color="#10b981"
        />

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
      </div>

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

      {/* Result Submission Modal */}
      {showResultForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="compact-header text-gray-900 dark:text-white">Submit Course Results</h3>
              <button
                onClick={() => setShowResultForm(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                ×
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