import React, { useState } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, MapPin, Award } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { StatsCard } from '../components/dashboard/StatsCard';
import { CustomBarChart } from '../components/charts/BarChart';
import { DonutChart } from '../components/charts/DonutChart';
import { mockStudents, mockLecturers } from '../data/mockData';

export function FacultyPage() {
  const [selectedFaculty, setSelectedFaculty] = useState('Engineering');

  const faculties = Array.from(new Set([
    ...mockStudents.map(s => s.faculty),
    ...mockLecturers.map(l => l.faculty)
  ]));

  const facultyStudents = mockStudents.filter(s => s.faculty === selectedFaculty);
  const facultyLecturers = mockLecturers.filter(l => l.faculty === selectedFaculty);

  const departmentData = Array.from(new Set(facultyStudents.map(s => s.department)))
    .map(dept => ({
      name: dept,
      value: facultyStudents.filter(s => s.department === dept).length
    }));

  const performanceData = Array.from(new Set(facultyStudents.map(s => s.department)))
    .map(dept => ({
      name: dept,
      value: Number((facultyStudents
        .filter(s => s.department === dept)
        .reduce((sum, s) => sum + s.gpa, 0) / 
        facultyStudents.filter(s => s.department === dept).length).toFixed(2))
    }));

  const levelDistribution = [
    { name: 'Level 100', value: facultyStudents.filter(s => s.level === '100').length, color: '#3B82F6' },
    { name: 'Level 200', value: facultyStudents.filter(s => s.level === '200').length, color: '#10B981' },
    { name: 'Level 300', value: facultyStudents.filter(s => s.level === '300').length, color: '#F59E0B' },
    { name: 'Level 400', value: facultyStudents.filter(s => s.level === '400').length, color: '#EF4444' }
  ];

  const averageGPA = facultyStudents.length > 0 
    ? (facultyStudents.reduce((sum, s) => sum + s.gpa, 0) / facultyStudents.length).toFixed(2)
    : '0.00';

  const averageRating = facultyLecturers.length > 0
    ? (facultyLecturers.reduce((sum, l) => sum + l.rating, 0) / facultyLecturers.length).toFixed(1)
    : '0.0';

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Faculty Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive view of faculty performance and statistics
          </p>
        </div>

        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="px-4 py-2 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {faculties.map(faculty => (
            <option key={faculty} value={faculty}>{faculty}</option>
          ))}
        </select>
      </div>

      {/* Faculty Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={facultyStudents.length}
          icon={Users}
          change="+8% from last semester"
          changeType="increase"
        />
        <StatsCard
          title="Total Lecturers"
          value={facultyLecturers.length}
          icon={BookOpen}
          change="Same as last semester"
          changeType="neutral"
        />
        <StatsCard
          title="Average GPA"
          value={averageGPA}
          icon={TrendingUp}
          change="+0.12 from last semester"
          changeType="increase"
        />
        <StatsCard
          title="Lecturer Rating"
          value={`${averageRating}/5.0`}
          icon={Award}
          change="+0.3 from last semester"
          changeType="increase"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Student Distribution by Department */}
        <GlassCard className="p-6">
          <CustomBarChart 
            data={departmentData}
            title="Student Distribution by Department"
            color="#3B82F6"
          />
        </GlassCard>

        {/* Level Distribution */}
        <GlassCard className="p-6">
          <DonutChart 
            data={levelDistribution}
            title="Student Level Distribution"
          />
        </GlassCard>
      </div>

      {/* Department Performance */}
      <GlassCard className="p-6">
        <CustomBarChart 
          data={performanceData}
          title="Average GPA by Department"
          color="#10B981"
        />
      </GlassCard>

      {/* Faculty Departments */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
          Departments in {selectedFaculty}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from(new Set(facultyStudents.map(s => s.department))).map(department => {
            const deptStudents = facultyStudents.filter(s => s.department === department);
            const deptLecturers = facultyLecturers.filter(l => l.department === department);
            const deptGPA = deptStudents.length > 0
              ? (deptStudents.reduce((sum, s) => sum + s.gpa, 0) / deptStudents.length).toFixed(2)
              : '0.00';

            return (
              <GlassCard key={department} className="p-6">
                <div className="flex items-center mb-4">
                  <GraduationCap className="text-blue-500 mr-3" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {department}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Students</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {deptStudents.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Lecturers</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {deptLecturers.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">Avg. GPA</span>
                    <span className="font-semibold text-blue-600">
                      {deptGPA}
                    </span>
                  </div>
                  
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <TrendingUp size={14} className="mr-1" />
                      <span>Trending upward</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}