import React, { useState } from 'react';
import { Trophy, Medal, Award, Star } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { mockStudents, mockLecturers } from '../data/mockData';

export function LeaderboardsPage() {
  const [activeTab, setActiveTab] = useState<'students' | 'lecturers'>('students');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const departments = Array.from(new Set([
    ...mockStudents.map(s => s.department),
    ...mockLecturers.map(l => l.department)
  ]));

  const filteredStudents = mockStudents
    .filter(student => selectedDepartment === 'all' || student.department === selectedDepartment)
    .sort((a, b) => b.gpa - a.gpa);

  const filteredLecturers = mockLecturers
    .filter(lecturer => selectedDepartment === 'all' || lecturer.department === selectedDepartment)
    .sort((a, b) => b.rating - a.rating);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1: return <Trophy className="text-yellow-500" size={24} />;
      case 2: return <Medal className="text-gray-400" size={24} />;
      case 3: return <Award className="text-orange-500" size={24} />;
      default: return <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">{position}</div>;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Leaderboards
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Top performing students and lecturers by department
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'students'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/10'
            }`}
          >
            Students
          </button>
          <button
            onClick={() => setActiveTab('lecturers')}
            className={`px-4 py-2 rounded-md transition-all ${
              activeTab === 'lecturers'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-600 dark:text-gray-300 hover:bg-white/10'
            }`}
          >
            Lecturers
          </button>
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-2 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>
      </div>

      {/* Leaderboard */}
      <GlassCard className="p-6">
        <div className="space-y-4">
          {activeTab === 'students' ? (
            filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                  index < 3 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20' 
                    : 'bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10'
                }`}
              >
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(index + 1)}
                </div>
                
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {student.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {student.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {student.department} • Level {student.level}
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500" size={16} />
                    <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {student.gpa.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">GPA</p>
                </div>
              </div>
            ))
          ) : (
            filteredLecturers.map((lecturer, index) => (
              <div
                key={lecturer.id}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-all ${
                  index < 3 
                    ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20' 
                    : 'bg-white/5 dark:bg-black/5 hover:bg-white/10 dark:hover:bg-black/10'
                }`}
              >
                <div className="flex items-center justify-center w-12">
                  {getRankIcon(index + 1)}
                </div>
                
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {lecturer.name.charAt(0)}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                    {lecturer.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {lecturer.department}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {lecturer.courses.length} courses
                  </p>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-500" size={16} />
                    <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                      {lecturer.rating.toFixed(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Rating</p>
                </div>
              </div>
            ))
          )}
        </div>
      </GlassCard>

      {/* Department Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Top Department (Students)
          </h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">Computer Science</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average GPA: 3.79</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Top Department (Lecturers)
          </h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">Mathematics</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Average Rating: 4.8</p>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Most Improved
          </h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">Physics</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">+0.3 GPA increase</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}