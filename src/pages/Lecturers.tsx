import React, { useState } from 'react';
import { Search, Plus, User, Star, TrendingUp, Users } from 'lucide-react';
import Card from '../components/Common/Card';
import CustomBarChart from '../components/Charts/BarChart';
import { mockLecturers, mockPerformanceData, getStudentsByCourse } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Lecturers: React.FC = () => {
  const { user } = useAuth();
  const [selectedLecturer, setSelectedLecturer] = useState(mockLecturers[0]);
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

  const studentsForCourse = selectedCourse ? getStudentsByCourse(selectedCourse) : [];

  const handleResultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would submit to an API
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {isLecturer ? 'My Teaching Dashboard' : 'Lecturer Management'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {isLecturer ? 'Manage your courses and track student performance' : 'Monitor lecturer performance and course management'}
          </p>
        </div>
        {isLecturer && (
          <button 
            onClick={() => setShowResultForm(true)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Submit Results</span>
          </button>
        )}
      </div>

      {!isLecturer && (
        <>
          {/* Search and Filters */}
          <Card>
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lecturers..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
                <option value="">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Electrical Engineering">Electrical Engineering</option>
                <option value="Biology">Biology</option>
              </select>
            </div>
          </Card>

          {/* Lecturer List */}
          <Card title="Lecturers">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Lecturer</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Staff ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Department</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Courses</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Students</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900 dark:text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockLecturers.map((lecturer) => (
                    <tr key={lecturer.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{lecturer.name}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{lecturer.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{lecturer.staffId}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{lecturer.department}</td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{lecturer.courses.length}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="font-semibold text-gray-900 dark:text-white">{lecturer.rating}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-900 dark:text-white">{lecturer.studentsCount}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedLecturer(lecturer)}
                          className="text-primary-600 hover:text-primary-700 font-medium"
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isLecturer ? 'My Rating' : 'Average Rating'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentLecturer.rating}/5.0
              </p>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isLecturer ? 'My Students' : 'Total Students'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentLecturer.studentsCount}
              </p>
            </div>
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {isLecturer ? 'My Courses' : 'Courses Taught'}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {currentLecturer.courses.length}
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CustomBarChart
          data={mockPerformanceData.slice(0, 3)}
          dataKey="score"
          xAxisKey="course"
          title={`${currentLecturer.name.split(' ')[1]} - Course Performance`}
          color="#10b981"
        />

        <Card title="Course Details">
          <div className="space-y-4">
            {currentLecturer.courses.map((courseCode, index) => {
              const courseData = mockPerformanceData.find(p => p.course === courseCode);
              return (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{courseCode}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {courseData ? `${courseData.students} students` : 'No data available'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {courseData ? `${courseData.score}%` : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Result Submission Modal */}
      {showResultForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Submit Course Results</h3>
              <button
                onClick={() => setShowResultForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                ×
              </button>
            </div>

            {/* Step 1: Select Course */}
            {!selectedCourse && (
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900 dark:text-white">Select Course</h4>
                <div className="space-y-2">
                  {currentLecturer.courses.map(course => (
                    <button
                      key={course}
                      onClick={() => setSelectedCourse(course)}
                      className="w-full p-3 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{course}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {getStudentsByCourse(course).length} students enrolled
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Select Student */}
            {selectedCourse && !selectedStudent && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    Select Student - {selectedCourse}
                  </h4>
                  <button
                    onClick={() => setSelectedCourse('')}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Change Course
                  </button>
                </div>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {studentsForCourse.map(student => (
                    <button
                      key={student.id}
                      onClick={() => setSelectedStudent(student.id)}
                      className="w-full p-3 text-left border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <div className="font-medium text-gray-900 dark:text-white">{student.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {student.studentId} • {student.department}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Submit Result */}
            {selectedCourse && selectedStudent && (
              <form onSubmit={handleResultSubmit} className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900 dark:text-white">Submit Result</h4>
                  <button
                    type="button"
                    onClick={() => setSelectedStudent('')}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Change Student
                  </button>
                </div>
                
                <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="text-sm">
                    <div><strong>Course:</strong> {selectedCourse}</div>
                    <div><strong>Student:</strong> {studentsForCourse.find(s => s.id === selectedStudent)?.name}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Semester
                    </label>
                    <select
                      value={resultForm.semester}
                      onChange={(e) => setResultForm({ ...resultForm, semester: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="1st">1st Semester</option>
                      <option value="2nd">2nd Semester</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Year
                    </label>
                    <select
                      value={resultForm.year}
                      onChange={(e) => setResultForm({ ...resultForm, year: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Score (0-100)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={resultForm.score}
                    onChange={(e) => setResultForm({ ...resultForm, score: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowResultForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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