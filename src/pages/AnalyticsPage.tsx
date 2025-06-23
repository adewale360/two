import React, { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import CustomBarChart from '../components/Charts/BarChart';
import CustomLineChart from '../components/Charts/LineChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockStudents } from '../data/mockData';

export function AnalyticsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Process data for charts
  const coursePerformanceData = mockStudents.flatMap(student => 
    student.courses.map(course => ({
      name: course.courseName,
      value: course.grade
    }))
  ).reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.name);
    if (existing) {
      existing.value = (existing.value + curr.value) / 2;
    } else {
      acc.push(curr);
    }
    return acc;
  }, [] as Array<{ name: string; value: number }>);

  const trendData = [
    { name: 'Week 1', value: 75 },
    { name: 'Week 2', value: 78 },
    { name: 'Week 3', value: 82 },
    { name: 'Week 4', value: 85 },
    { name: 'Week 5', value: 87 },
    { name: 'Week 6', value: 89 }
  ];

  const gradeDistribution = [
    { name: 'A (90-100)', value: 25, fill: '#10B981' },
    { name: 'B (80-89)', value: 35, fill: '#3B82F6' },
    { name: 'C (70-79)', value: 30, fill: '#F59E0B' },
    { name: 'D (60-69)', value: 8, fill: '#EF4444' },
    { name: 'F (0-59)', value: 2, fill: '#6B7280' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive performance analytics and insights
          </p>
        </div>

        <select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="px-4 py-2 bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 rounded-lg backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Departments</option>
          <option value="cs">Computer Science</option>
          <option value="math">Mathematics</option>
          <option value="physics">Physics</option>
        </select>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Course Performance */}
        <GlassCard className="p-6">
          <CustomBarChart 
            data={coursePerformanceData}
            dataKey="value"
            xAxisKey="name"
            title="Average Performance by Course"
            color="#3B82F6"
          />
        </GlassCard>

        {/* Performance Trend */}
        <GlassCard className="p-6">
          <CustomLineChart 
            data={trendData}
            dataKey="value"
            xAxisKey="name"
            title="Performance Trend Over Time"
            color="#8B5CF6"
          />
        </GlassCard>

        {/* Grade Distribution */}
        <GlassCard className="p-6">
          <DonutChart 
            data={gradeDistribution}
            title="Grade Distribution"
          />
        </GlassCard>

        {/* Department Comparison */}
        <GlassCard className="p-6">
          <CustomBarChart 
            data={[
              { name: 'Computer Science', value: 3.7 },
              { name: 'Mathematics', value: 3.6 },
              { name: 'Physics', value: 3.4 },
              { name: 'Chemistry', value: 3.5 },
              { name: 'Biology', value: 3.3 }
            ]}
            dataKey="value"
            xAxisKey="name"
            title="Average GPA by Department"
            color="#10B981"
          />
        </GlassCard>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Pass Rate</span>
              <span className="font-semibold text-green-600">94.2%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Honor Roll</span>
              <span className="font-semibold text-blue-600">23.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">At Risk</span>
              <span className="font-semibold text-orange-600">5.8%</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Course Statistics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Total Enrollments</span>
              <span className="font-semibold">2,847</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
              <span className="font-semibold text-green-600">96.3%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg. Class Size</span>
              <span className="font-semibold">18.2</span>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Lecturer Performance
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Avg. Rating</span>
              <span className="font-semibold text-yellow-600">4.6/5.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Response Rate</span>
              <span className="font-semibold text-blue-600">87.4%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Active Lecturers</span>
              <span className="font-semibold">89</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}