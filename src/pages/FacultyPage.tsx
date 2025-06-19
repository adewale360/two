import React, { useState } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, MapPin, Award, School, Mail, Phone, Trophy, Star } from 'lucide-react';
import Card from '../components/Common/Card';
import StatCard from '../components/Common/StatCard';
import CustomBarChart from '../components/Charts/BarChart';
import CustomLineChart from '../components/Charts/LineChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockStudents, mockLecturers, mockFaculties, admissionsByYearData, getFacultyTopPerformers, facultySchedules } from '../data/mockData';

const FacultyPage: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('COPAS');

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

  const currentSchedule = facultySchedules[selectedFaculty] || [];

  // Group schedule by day
  const scheduleByDay = currentSchedule.reduce((acc, schedule) => {
    if (!acc[schedule.day]) {
      acc[schedule.day] = [];
    }
    acc[schedule.day].push(schedule);
    return acc;
  }, {} as Record<string, typeof currentSchedule>);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

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

        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500"
        >
          {mockFaculties.map(faculty => (
            <option key={faculty.name} value={faculty.name}>{faculty.name}</option>
          ))}
        </select>
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

      {/* Course Schedule - Fixed to show each day once */}
      <Card title={`${selectedFaculty} Course Schedule`}>
        <div className="space-y-4">
          {daysOfWeek.map(day => (
            <div key={day} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2">
                <h4 className="compact-subheader text-gray-900 dark:text-white">{day}</h4>
              </div>
              <div className="p-4">
                {scheduleByDay[day] && scheduleByDay[day].length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {scheduleByDay[day].map((schedule, index) => (
                      <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-200 dark:border-gray-600">
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