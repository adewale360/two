import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';
import type { Student, Lecturer } from '../../types';

interface TopPerformersProps {
  topStudent: Student;
  topLecturer: Lecturer;
}

export function TopPerformers({ topStudent, topLecturer }: TopPerformersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Top Student */}
      <GlassCard className="p-6">
        <div className="flex items-center mb-4">
          <Trophy className="text-yellow-500 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Top Student This Semester
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {topStudent.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{topStudent.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{topStudent.department}</p>
            <div className="flex items-center mt-1">
              <Star className="text-yellow-500 mr-1" size={16} />
              <span className="text-sm font-medium">GPA: {topStudent.gpa.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Top Lecturer */}
      <GlassCard className="p-6">
        <div className="flex items-center mb-4">
          <Trophy className="text-yellow-500 mr-2" size={24} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Top Lecturer This Semester
          </h3>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {topLecturer.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 dark:text-gray-100">{topLecturer.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{topLecturer.department}</p>
            <div className="flex items-center mt-1">
              <Star className="text-yellow-500 mr-1" size={16} />
              <span className="text-sm font-medium">Rating: {topLecturer.rating.toFixed(1)}/5.0</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}