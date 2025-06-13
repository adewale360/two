import React from 'react';
import { Users, BookOpen, Trophy, TrendingUp, ArrowRight, Star, Award } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { NewsCard } from '../components/dashboard/NewsCard';
import { TopPerformers } from '../components/dashboard/TopPerformers';
import { CustomBarChart } from '../components/charts/BarChart';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { mockNews, mockDashboardStats, mockStudents, mockLecturers } from '../data/mockData';

export function HomePage() {
  const topStudent = mockStudents.reduce((prev, current) => 
    prev.gpa > current.gpa ? prev : current
  );
  
  const topLecturer = mockLecturers.reduce((prev, current) => 
    prev.rating > current.rating ? prev : current
  );

  const performanceData = [
    { name: 'Jan', value: 3.2 },
    { name: 'Feb', value: 3.4 },
    { name: 'Mar', value: 3.1 },
    { name: 'Apr', value: 3.6 },
    { name: 'May', value: 3.5 },
    { name: 'Jun', value: 3.7 }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <GlassCard variant="gradient" className="p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl"></div>
        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="flex-1 mb-6 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Your Gateway into
                <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Academic Excellence
                </span>
              </h1>
              <p className="text-gray-300 text-lg mb-6 max-w-2xl">
                UniTrack is an advanced performance platform. We make academic tracking accessible and insightful for universities worldwide.
              </p>
              <Button variant="primary" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                Explore Dashboard
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 h-64 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-3xl"></div>
                <div className="relative w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Trophy className="text-white" size={80} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Students"
          value={mockDashboardStats.totalStudents.toLocaleString()}
          icon={Users}
          change="+12% from last semester"
          changeType="increase"
          gradient="from-blue-500 to-cyan-500"
        />
        <StatsCard
          title="Total Lecturers"
          value={mockDashboardStats.totalLecturers}
          icon={BookOpen}
          change="+3% from last semester"
          changeType="increase"
          gradient="from-green-500 to-emerald-500"
        />
        <StatsCard
          title="Total Courses"
          value={mockDashboardStats.totalCourses}
          icon={Trophy}
          change="Same as last semester"
          changeType="neutral"
          gradient="from-orange-500 to-red-500"
        />
        <StatsCard
          title="Average GPA"
          value={mockDashboardStats.averageGPA.toFixed(2)}
          icon={TrendingUp}
          change="+0.15 from last semester"
          changeType="increase"
          gradient="from-purple-500 to-pink-500"
        />
      </div>

      {/* Performance Chart and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <GlassCard variant="dark" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white">Performance Overview</h2>
              <select className="px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
            </div>
            <CustomBarChart 
              data={performanceData}
              title=""
              color="#8B5CF6"
            />
          </GlassCard>
        </div>

        {/* Quick Transfer/Actions */}
        <div className="space-y-6">
          <GlassCard variant="gradient" className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-left transition-all">
                Add New Student
              </button>
              <button className="w-full p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-left transition-all">
                Create Course
              </button>
              <button className="w-full p-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white text-left transition-all">
                Generate Report
              </button>
            </div>
            <Button variant="primary" className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-500">
              View All Actions
            </Button>
          </GlassCard>

          {/* Top Performers Mini */}
          <GlassCard variant="dark" className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Top Performers</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {topStudent.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{topStudent.name}</p>
                  <p className="text-gray-400 text-sm">GPA: {topStudent.gpa.toFixed(2)}</p>
                </div>
                <Star className="text-yellow-400" size={16} />
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                  {topLecturer.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium">{topLecturer.name}</p>
                  <p className="text-gray-400 text-sm">Rating: {topLecturer.rating.toFixed(1)}/5.0</p>
                </div>
                <Award className="text-yellow-400" size={16} />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Recent News */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-6">
          Recent News & Announcements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      </div>
    </div>
  );
}