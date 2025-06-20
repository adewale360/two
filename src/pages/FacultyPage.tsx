import React, { useState } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, MapPin, Award, School, Mail, Phone, Trophy, Star, Plus, X, Save, Edit } from 'lucide-react';
import Card from '../components/Common/Card';
import StatCard from '../components/Common/StatCard';
import CustomBarChart from '../components/Charts/BarChart';
import CustomLineChart from '../components/Charts/LineChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockStudents, mockLecturers, mockFaculties, admissionsByYearData, getFacultyTopPerformers, facultySchedules } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const FacultyPage: React.FC = () => {
  const { user } = useAuth();
  const [selectedFaculty, setSelectedFaculty] = useState('COPAS');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<any>(null);
  const [schedules, setSchedules] = useState(facultySchedules);

  const isAdmin = user?.role === 'admin';

  const currentFaculty = mockFaculties.find(f => f.name === selectedFaculty) || mockFaculties[0];
  const facultyStudents = mockStudents.filter(s => s.faculty === selectedFaculty);
  const facultyLecturers = mockLecturers.filter(l => l.faculty === selectedFaculty);
  const { topStudent, topLecturer } = getFacultyTopPerformers(selectedFaculty);

  const departmentData = currentFaculty.departments.map(dept => ({
    name: dept.length > 15 ? dept.substring(0, 15) + '...' : dept,
    value: facultyStudents.filter(s => s.department === dept).length
  }));

  const levelDistribution = [
    { name: 'Level 100', value: facultyStudents.filter(s => s.level === '100').length, fill: '#3B82F6' },
    { name: 'Level 200', value: facultyStudents.filter(s => s.level === '200').length, fill: '#10B981' },
    { name: 'Level 300', value: facultyStudents.filter(s => s.level === '300').length, fill: '#F59E0B' },
    { name: 'Level 400', value: facultyStudents.filter(s => s.level === '400').length, fill: '#EF4444' }
  ];

  // Activity data for the selected faculty
  const activityData = [
    { month: 'JAN', value: Math.floor(Math.random() * 100) + 50 },
    { month: 'FEB', value: Math.floor(Math.random() * 100) + 60 },
    { month: 'MAR', value: Math.floor(Math.random() * 100) + 70 },
    { month: 'APR', value: Math.floor(Math.random() * 100) + 80 },
    { month: 'MAY', value: Math.floor(Math.random() * 100) + 90 },
    { month: 'JUN', value: Math.floor(Math.random() * 100) + 85 },
  ];

  // Prepare admissions data for the selected faculty
  const admissionsData = admissionsByYearData.map(yearData => {
    const facultyDepts = currentFaculty.departments;
    let totalAdmissions = 0;
    
    facultyDepts.forEach(dept => {
      if (yearData[dept]) {
        totalAdmissions += yearData[dept];
      }
    });
    
    return {
      year: yearData.year,
      admissions: totalAdmissions
    };
  });

  const averageGPA = facultyStudents.length > 0 
    ? (facultyStudents.reduce((sum, s) => sum + s.gpa, 0) / facultyStudents.length).toFixed(2)
    : '0.00';

  const averageRating = facultyLecturers.length > 0
    ? (facultyLecturers.reduce((sum, l) => sum + l.rating, 0) / facultyLecturers.length).toFixed(1)
    : '0.0';

  const currentSchedule = schedules[selectedFaculty] || [];

  // Group schedule by day
  const scheduleByDay = currentSchedule.reduce((acc, schedule) => {
    if (!acc[schedule.day]) {
      acc[schedule.day] = [];
    }
    acc[schedule.day].push(schedule);
    return acc;
  }, {} as Record<string, typeof currentSchedule>);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const handleAddSchedule = () => {
    setEditingSchedule({
      day: 'Monday',
      time: '8:00-10:00',
      course: '',
      lecturer: '',
      room: ''
    });
    setShowScheduleModal(true);
  };

  const handleEditSchedule = (schedule: any) => {
    setEditingSchedule(schedule);
    setShowScheduleModal(true);
  };

  const handleSaveSchedule = () => {
    if (editingSchedule) {
      const updatedSchedules = { ...schedules };
      if (!updatedSchedules[selectedFaculty]) {
        updatedSchedules[selectedFaculty] = [];
      }
      
      const existingIndex = updatedSchedules[selectedFaculty].findIndex(
        s => s.day === editingSchedule.day && s.time === editingSchedule.time
      );
      
      if (existingIndex >= 0) {
        updatedSchedules[selectedFaculty][existingIndex] = editingSchedule;
      } else {
        updatedSchedules[selectedFaculty].push(editingSchedule);
      }
      
      setSchedules(updatedSchedules);
      setShowScheduleModal(false);
      setEditingSchedule(null);
    }
  };

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Faculty Overview
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive view of faculty performance and statistics
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <select
            value={selectedFaculty}
            onChange={(e) => setSelectedFaculty(e.target.value)}
            className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500"
          >
            {mockFaculties.map(faculty => (
              <option key={faculty.name} value={faculty.name}>{faculty.name}</option>
            ))}
          </select>
          {isAdmin && (
            <button
              onClick={handleAddSchedule}
              className="flex items-center space-x-2 bg-primary-600 text-white px-3 py-2 rounded text-sm hover:bg-primary-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Add Schedule</span>
            </button>
          )}
        </div>
      </div>

      {/* Faculty Details */}
      <Card title={`${currentFaculty.name} - ${currentFaculty.fullName}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
          <div className="lg:col-span-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {currentFaculty.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 compact-grid">
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-primary-600">{currentFaculty.departments.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Departments</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-green-600">{facultyStudents.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-blue-600">{facultyLecturers.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Lecturers</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-yellow-600">{averageGPA}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Avg GPA</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 minimal-padding rounded">
            <h4 className="compact-subheader text-gray-900 dark:text-white mb-2">Dean Information</h4>
            <div className="tight-spacing">
              <div className="flex items-center text-xs">
                <Users className="h-3 w-3 mr-1 text-gray-500" />
                <span className="font-medium">{currentFaculty.dean.name}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Mail className="h-3 w-3 mr-1" />
                <span>{currentFaculty.dean.email}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Phone className="h-3 w-3 mr-1" />
                <span>{currentFaculty.dean.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Top Performers for Faculty */}
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
        <Card title="Top Student in Faculty">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="compact-subheader text-gray-900 dark:text-white">
                {topStudent.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {topStudent.department} • Level {topStudent.level}
              </p>
              <div className="flex items-center mt-1">
                <Trophy className="h-3 w-3 text-yellow-500 mr-1" />
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  GPA: {topStudent.gpa}/5.0
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Top Lecturer in Faculty">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="compact-subheader text-gray-900 dark:text-white">
                {topLecturer.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {topLecturer.department}
              </p>
              <div className="flex items-center mt-1">
                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  Rating: {topLecturer.rating}/5.0
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
        <CustomBarChart 
          data={departmentData}
          dataKey="value"
          xAxisKey="name"
          title="Student Distribution by Department"
          color="#3b82f6"
        />
        <CustomLineChart 
          data={activityData}
          dataKey="value"
          xAxisKey="month"
          title="Faculty Activity"
          color="#10b981"
        />
        <DonutChart 
          data={levelDistribution}
          title="Student Level Distribution"
        />
      </div>

      {/* Course Schedule */}
      <Card title={`${selectedFaculty} Course Schedule`}>
        <div className="space-y-4">
          {daysOfWeek.map(day => (
            <div key={day} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 flex items-center justify-between">
                <h4 className="compact-subheader text-gray-900 dark:text-white">{day}</h4>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setEditingSchedule({
                        day,
                        time: '8:00-10:00',
                        course: '',
                        lecturer: '',
                        room: ''
                      });
                      setShowScheduleModal(true);
                    }}
                    className="text-primary-600 hover:text-primary-700 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="p-4">
                {scheduleByDay[day] && scheduleByDay[day].length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {scheduleByDay[day].map((schedule, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600 relative group">
                        {isAdmin && (
                          <button
                            onClick={() => handleEditSchedule(schedule)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Edit className="h-3 w-3 text-gray-500 hover:text-primary-600" />
                          </button>
                        )}
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">{schedule.time}</div>
                        <div className="text-sm text-primary-600 dark:text-primary-400">{schedule.course}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">{schedule.lecturer}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-500">{schedule.room}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400 italic">No classes scheduled</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Schedule Modal */}
      {showScheduleModal && editingSchedule && (
        <div className="modal-overlay">
          <div className="modal-content bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingSchedule.course ? 'Edit Schedule' : 'Add Schedule'}
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Day
                </label>
                <select
                  value={editingSchedule.day}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, day: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  {daysOfWeek.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Time
                </label>
                <input
                  type="text"
                  value={editingSchedule.time}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, time: e.target.value })}
                  placeholder="e.g., 8:00-10:00"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Course
                </label>
                <input
                  type="text"
                  value={editingSchedule.course}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, course: e.target.value })}
                  placeholder="Course code"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Lecturer
                </label>
                <input
                  type="text"
                  value={editingSchedule.lecturer}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, lecturer: e.target.value })}
                  placeholder="Lecturer name"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Room
                </label>
                <input
                  type="text"
                  value={editingSchedule.room}
                  onChange={(e) => setEditingSchedule({ ...editingSchedule, room: e.target.value })}
                  placeholder="Room/Location"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowScheduleModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSchedule}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                <Save className="h-4 w-4 inline mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Departments Grid */}
      <Card title="Departments">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 compact-grid">
          {currentFaculty.departments.map((department, index) => {
            const deptStudents = facultyStudents.filter(s => s.department === department);
            const deptLecturers = facultyLecturers.filter(l => l.department === department);
            const deptGPA = deptStudents.length > 0
              ? (deptStudents.reduce((sum, s) => sum + s.gpa, 0) / deptStudents.length).toFixed(2)
              : '0.00';

            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 minimal-padding rounded">
                <div className="flex items-center mb-2">
                  <GraduationCap className="text-blue-500 mr-2" size={16} />
                  <h3 className="compact-subheader text-gray-900 dark:text-white">
                    {department}
                  </h3>
                </div>
                
                <div className="tight-spacing">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Students</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {deptStudents.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Lecturers</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {deptLecturers.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Avg. GPA</span>
                    <span className="text-xs font-semibold text-blue-600">
                      {deptGPA}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default FacultyPage;