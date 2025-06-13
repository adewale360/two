import React, { useState } from 'react';
import { User, Mail, Star, BookOpen, Users, Filter } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { mockLecturers, mockStudents } from '../data/mockData';

export function StaffPage() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = Array.from(new Set(mockLecturers.map(l => l.department)));

  const filteredLecturers = mockLecturers.filter(lecturer => {
    const matchesDepartment = selectedDepartment === 'all' || lecturer.department === selectedDepartment;
    const matchesSearch = lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lecturer.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const getStudentCount = (lecturerId: string) => {
    const lecturer = mockLecturers.find(l => l.id === lecturerId);
    if (!lecturer) return 0;
    
    return mockStudents.filter(student => 
      student.courses.some(course => 
        lecturer.courses.includes(course.courseName)
      )
    ).length;
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-500';
    if (rating >= 4.0) return 'text-blue-500';
    if (rating >= 3.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Staff & Lecturers
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage and view lecturer profiles, performance, and teaching assignments
        </p>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search lecturers by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>

        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="px-4 py-3 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          {departments.map(dept => (
            <option key={dept} value={dept}>{dept}</option>
          ))}
        </select>

        <Button variant="primary">
          Add New Lecturer
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Lecturers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{filteredLecturers.length}</p>
            </div>
            <Users className="text-blue-500" size={24} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {(filteredLecturers.reduce((sum, l) => sum + l.rating, 0) / filteredLecturers.length).toFixed(1)}
              </p>
            </div>
            <Star className="text-yellow-500" size={24} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Top Rated</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {Math.max(...filteredLecturers.map(l => l.rating)).toFixed(1)}
              </p>
            </div>
            <BookOpen className="text-green-500" size={24} />
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Departments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{departments.length}</p>
            </div>
            <User className="text-purple-500" size={24} />
          </div>
        </GlassCard>
      </div>

      {/* Lecturers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLecturers.map((lecturer) => (
          <GlassCard key={lecturer.id} className="p-6 hover:scale-105 transition-transform">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {lecturer.name.split(' ').map(n => n.charAt(0)).join('')}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                  {lecturer.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {lecturer.department}
                </p>
                <div className="flex items-center text-xs text-gray-500 dark:text-gray-500 mb-2">
                  <Mail size={12} className="mr-1" />
                  <span className="truncate">{lecturer.email}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Rating</span>
                <div className="flex items-center space-x-1">
                  <Star size={14} className={getRatingColor(lecturer.rating)} />
                  <span className={`font-semibold ${getRatingColor(lecturer.rating)}`}>
                    {lecturer.rating.toFixed(1)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Courses</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {lecturer.courses.length}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Students</span>
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {getStudentCount(lecturer.id)}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                  Courses Teaching:
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {lecturer.courses.slice(0, 2).map((course, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-500/20 text-blue-600 dark:text-blue-400 text-xs rounded-full"
                  >
                    {course}
                  </span>
                ))}
                {lecturer.courses.length > 2 && (
                  <span className="px-2 py-1 bg-gray-500/20 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                    +{lecturer.courses.length - 2} more
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <Button variant="outline" size="sm" className="flex-1">
                View Details
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                Edit Profile
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Empty State */}
      {filteredLecturers.length === 0 && (
        <GlassCard className="p-12 text-center">
          <User className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
            No lecturers found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Try adjusting your search criteria or filters
          </p>
          <Button variant="primary">
            Add First Lecturer
          </Button>
        </GlassCard>
      )}
    </div>
  );
}