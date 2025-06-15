import React, { useState } from 'react';
import { Download, Filter, TrendingUp, Users, BookOpen, Award, ChevronUp, ChevronDown } from 'lucide-react';
import Card from '../components/Common/Card';
import StatCard from '../components/Common/StatCard';
import CustomBarChart from '../components/Charts/BarChart';
import CustomAreaChart from '../components/Charts/AreaChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockPerformanceData, semesterProgressData, scoreDistributionData, mockDepartments, mockStudents, mockLecturers } from '../data/mockData';

const Reports: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('All-time');
  const [peopleFilter, setPeopleFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');

  // Tesla-style metrics data with reduced padding
  const metricsData = [
    { title: 'Active Users', value: '27', total: '/80', percentage: 64 },
    { title: 'Questions Answered', value: '3,298', total: '', percentage: 86 },
    { title: 'Av. Session Length', value: '2m 34s', total: '', percentage: 34, isIncrease: true },
  ];

  // Activity data for the bar chart - filtered based on timeFilter
  const getActivityData = () => {
    const baseData = [
      { month: 'JAN', value: 150 },
      { month: 'FEB', value: 180 },
      { month: 'MAR', value: 220 },
      { month: 'APR', value: 280 },
      { month: 'MAY', value: 320 },
      { month: 'JUN', value: 290 },
      { month: 'JUL', value: 350 },
      { month: 'AUG', value: 180 },
      { month: 'SEP', value: 280 },
      { month: 'OCT', value: 380 },
      { month: 'NOV', value: 420 },
      { month: 'DEC', value: 450 },
    ];

    if (timeFilter === 'This Month') {
      return baseData.slice(-1);
    } else if (timeFilter === 'This Year') {
      return baseData;
    }
    return baseData;
  };

  // Performance topics data - filtered based on topicFilter
  const getWeakestTopics = () => {
    const allTopics = [
      { name: 'Advanced Mathematics', icon: '📐', percentage: 74, color: 'bg-red-500' },
      { name: 'Physics Fundamentals', icon: '⚛️', percentage: 52, color: 'bg-orange-500' },
      { name: 'Computer Networks', icon: '🌐', percentage: 36, color: 'bg-red-600' },
      { name: 'Engineering Mechanics', icon: '⚙️', percentage: 68, color: 'bg-red-400' },
      { name: 'Biology Lab', icon: '🧬', percentage: 45, color: 'bg-orange-600' },
    ];

    if (topicFilter === 'All') return allTopics.slice(0, 3);
    return allTopics.filter(topic => topic.name.toLowerCase().includes(topicFilter.toLowerCase())).slice(0, 3);
  };

  const getStrongestTopics = () => {
    const allTopics = [
      { name: 'Programming Basics', icon: '💻', percentage: 95, color: 'bg-green-500' },
      { name: 'Database Design', icon: '🗄️', percentage: 92, color: 'bg-green-400' },
      { name: 'Web Development', icon: '🌍', percentage: 89, color: 'bg-green-600' },
      { name: 'Architecture Design', icon: '🏗️', percentage: 88, color: 'bg-green-500' },
      { name: 'Business Management', icon: '📊', percentage: 91, color: 'bg-green-400' },
    ];

    if (topicFilter === 'All') return allTopics.slice(0, 3);
    return allTopics.filter(topic => topic.name.toLowerCase().includes(topicFilter.toLowerCase())).slice(0, 3);
  };

  // Filtered leaderboard data
  const getFilteredStudents = () => {
    let filtered = [...mockStudents];
    
    if (peopleFilter === 'Students') {
      // Already students
    } else if (peopleFilter !== 'All') {
      filtered = filtered.filter(student => student.department === peopleFilter);
    }

    if (topicFilter !== 'All') {
      filtered = filtered.filter(student => 
        student.department.toLowerCase().includes(topicFilter.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.gpa - a.gpa).slice(0, 4);
  };

  const getFilteredDepartments = () => {
    const departments = Array.from(new Set(mockStudents.map(s => s.department)));
    return departments.map(dept => {
      const deptStudents = mockStudents.filter(s => s.department === dept);
      const avgGPA = deptStudents.reduce((sum, s) => sum + s.gpa, 0) / deptStudents.length;
      const correctPercentage = Math.round(avgGPA * 20); // Convert GPA to percentage
      
      return {
        name: dept,
        points: `${avgGPA.toFixed(1)} Avg GPA`,
        percentage: `${correctPercentage}% Correct`,
        trend: Math.random() > 0.5 ? 'up' : 'down'
      };
    }).sort((a, b) => parseFloat(b.points) - parseFloat(a.points)).slice(0, 4);
  };

  const getFilteredLecturers = () => {
    let filtered = [...mockLecturers];
    
    if (topicFilter !== 'All') {
      filtered = filtered.filter(lecturer => 
        lecturer.department.toLowerCase().includes(topicFilter.toLowerCase())
      );
    }

    return filtered.sort((a, b) => b.rating - a.rating).slice(0, 4);
  };

  const studentLeaderboard = getFilteredStudents().map((student, index) => ({
    rank: index + 1,
    name: student.name,
    points: `${student.gpa.toFixed(1)} GPA`,
    percentage: `${Math.round(student.gpa * 20)}% Correct`,
    trend: Math.random() > 0.5 ? 'up' : 'down'
  }));

  const departmentLeaderboard = getFilteredDepartments().map((dept, index) => ({
    rank: index + 1,
    name: dept.name,
    points: dept.points,
    percentage: dept.percentage,
    trend: dept.trend
  }));

  const lecturerLeaderboard = getFilteredLecturers().map((lecturer, index) => ({
    rank: index + 1,
    name: lecturer.name,
    points: `${lecturer.rating.toFixed(1)} Rating`,
    percentage: `${lecturer.studentsCount} Students`,
    trend: Math.random() > 0.5 ? 'up' : 'down'
  }));

  const weakestTopics = getWeakestTopics();
  const strongestTopics = getStrongestTopics();

  return (
    <div className="compact-spacing bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
        </div>
        <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-3 py-2 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Download className="h-3 w-3" />
          <span>Download</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-3 bg-white dark:bg-gray-800 minimal-padding rounded-lg shadow-sm mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Timeframe:</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border-0 rounded text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="All-time">All-time</option>
            <option value="This Year">This Year</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">People:</span>
          <select
            value={peopleFilter}
            onChange={(e) => setPeopleFilter(e.target.value)}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border-0 rounded text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Students">Students</option>
            <option value="Faculty">Faculty</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Architecture">Architecture</option>
            <option value="Biochemistry">Biochemistry</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Topic:</span>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 border-0 rounded text-xs focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Biology">Biology</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Architecture">Architecture</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards - Reduced padding */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
        {metricsData.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">{metric.title}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-500">Month</span>
            </div>
            <div className="flex items-end space-x-1 mb-1">
              <span className="text-xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{metric.total}</span>
            </div>
            {/* Mini trend line */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-4 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 20">
                  <path
                    d="M0,15 Q25,8 50,12 T100,5"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </svg>
              </div>
              <div className="text-right">
                <div className={`text-xs font-medium ${metric.isIncrease ? 'text-green-600' : 'text-blue-600'}`}>
                  {metric.isIncrease ? '+' : ''}{metric.percentage}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Chart */}
      <div className="mb-4">
        <CustomBarChart
          data={getActivityData()}
          dataKey="value"
          xAxisKey="month"
          title="Activity"
          color="#3b82f6"
        />
      </div>

      {/* Performance Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid mb-4">
        <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
          <h3 className="compact-header text-gray-900 dark:text-white mb-3">Weakest Topics</h3>
          <div className="tight-spacing">
            {weakestTopics.map((topic, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{topic.name}</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{topic.percentage}% Correct</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${topic.color}`}
                      style={{ width: `${topic.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
          <h3 className="compact-header text-gray-900 dark:text-white mb-3">Strongest Topics</h3>
          <div className="tight-spacing">
            {strongestTopics.map((topic, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{topic.name}</span>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400">{topic.percentage}% Correct</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${topic.color}`}
                      style={{ width: `${topic.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
        <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
          <h3 className="compact-header text-gray-900 dark:text-white mb-3">Student Leaderboard</h3>
          <div className="tight-spacing">
            {studentLeaderboard.map((student, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    student.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    student.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                    student.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {student.rank}
                  </span>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{student.name}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{student.rank}</span>
                      {student.trend === 'up' ? (
                        <ChevronUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {student.points} • {student.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
          <h3 className="compact-header text-gray-900 dark:text-white mb-3">Department Leaderboard</h3>
          <div className="tight-spacing">
            {departmentLeaderboard.map((dept, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    dept.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    dept.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                    dept.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {dept.rank}
                  </span>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{dept.name}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{dept.rank}</span>
                      {dept.trend === 'up' ? (
                        <ChevronUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {dept.points} • {dept.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
          <h3 className="compact-header text-gray-900 dark:text-white mb-3">Lecturer Leaderboard</h3>
          <div className="tight-spacing">
            {lecturerLeaderboard.map((lecturer, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    lecturer.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    lecturer.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                    lecturer.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {lecturer.rank}
                  </span>
                  <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-teal-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{lecturer.name}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{lecturer.rank}</span>
                      {lecturer.trend === 'up' ? (
                        <ChevronUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {lecturer.points} • {lecturer.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;