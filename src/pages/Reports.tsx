import React, { useState } from 'react';
import { Download, Filter, TrendingUp, Users, BookOpen, Award, ChevronUp, ChevronDown } from 'lucide-react';
import Card from '../components/Common/Card';
import StatCard from '../components/Common/StatCard';
import CustomBarChart from '../components/Charts/BarChart';
import CustomAreaChart from '../components/Charts/AreaChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockPerformanceData, semesterProgressData, scoreDistributionData, mockDepartments, mockStudents } from '../data/mockData';

const Reports: React.FC = () => {
  const [timeFilter, setTimeFilter] = useState('All-time');
  const [peopleFilter, setPeopleFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState('All');

  // Tesla-style metrics data
  const metricsData = [
    { title: 'Active Users', value: '27', total: '/80', percentage: 64 },
    { title: 'Questions Answered', value: '3,298', total: '', percentage: 86 },
    { title: 'Av. Session Length', value: '2m 34s', total: '', percentage: 34, isIncrease: true },
  ];

  // Activity data for the bar chart
  const activityData = [
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

  // Performance topics data
  const weakestTopics = [
    { name: 'Advanced Mathematics', icon: '📐', percentage: 74, color: 'bg-red-500' },
    { name: 'Physics Fundamentals', icon: '⚛️', percentage: 52, color: 'bg-orange-500' },
    { name: 'Computer Networks', icon: '🌐', percentage: 36, color: 'bg-red-600' },
  ];

  const strongestTopics = [
    { name: 'Programming Basics', icon: '💻', percentage: 95, color: 'bg-green-500' },
    { name: 'Database Design', icon: '🗄️', percentage: 92, color: 'bg-green-400' },
    { name: 'Web Development', icon: '🌍', percentage: 89, color: 'bg-green-600' },
  ];

  // Leaderboard data
  const userLeaderboard = [
    { rank: 1, name: 'Alice Johnson', points: '637 Points', percentage: '98% Correct', trend: 'up' },
    { rank: 2, name: 'Bob Smith', points: '637 Points', percentage: '96% Correct', trend: 'down' },
    { rank: 3, name: 'Carol Davis', points: '637 Points', percentage: '94% Correct', trend: 'up' },
    { rank: 4, name: 'David Wilson', points: '637 Points', percentage: '92% Correct', trend: 'up' },
  ];

  const groupsLeaderboard = [
    { rank: 1, name: 'Computer Science', points: '52 Points / User', percentage: '97% Correct', trend: 'up' },
    { rank: 2, name: 'Engineering Group', points: '52 Points / User', percentage: '95% Correct', trend: 'down' },
    { rank: 3, name: 'Biology Department', points: '52 Points / User', percentage: '87% Correct', trend: 'up' },
    { rank: 4, name: 'Mathematics Faculty', points: '50 Points / User', percentage: '85% Correct', trend: 'up' },
  ];

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
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 compact-grid mb-4">
        {metricsData.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-medium text-gray-600 dark:text-gray-400">{metric.title}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-500">Month</span>
            </div>
            <div className="flex items-end space-x-1 mb-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{metric.total}</span>
            </div>
            {/* Mini trend line */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-6 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 100 30">
                  <path
                    d="M0,25 Q25,15 50,20 T100,10"
                    stroke="#3b82f6"
                    strokeWidth="2"
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
          data={activityData}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
        <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
          <h3 className="compact-header text-gray-900 dark:text-white mb-3">User Leaderboard</h3>
          <div className="tight-spacing">
            {userLeaderboard.map((user, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    user.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                    user.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.rank}
                  </span>
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{user.rank}</span>
                      {user.trend === 'up' ? (
                        <ChevronUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {user.points} • {user.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 compact-card rounded-lg shadow-sm">
          <h3 className="compact-header text-gray-900 dark:text-white mb-3">Groups Leaderboard</h3>
          <div className="tight-spacing">
            {groupsLeaderboard.map((group, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                    group.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    group.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                    group.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {group.rank}
                  </span>
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{group.name}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-xs font-medium text-gray-900 dark:text-white">{group.rank}</span>
                      {group.trend === 'up' ? (
                        <ChevronUp className="w-3 h-3 text-green-500" />
                      ) : (
                        <ChevronDown className="w-3 h-3 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {group.points} • {group.percentage}
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