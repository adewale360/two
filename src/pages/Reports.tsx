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
    <div className="space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Reports
          </h1>
        </div>
        <button className="flex items-center space-x-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
          <Download className="h-4 w-4" />
          <span>Download</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Timeframe:</span>
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="All-time">All-time</option>
            <option value="This Year">This Year</option>
            <option value="This Month">This Month</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">People:</span>
          <select
            value={peopleFilter}
            onChange={(e) => setPeopleFilter(e.target.value)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Students">Students</option>
            <option value="Faculty">Faculty</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Topic:</span>
          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:text-white"
          >
            <option value="All">All</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Biology">Biology</option>
          </select>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricsData.map((metric, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">{metric.title}</h3>
              <span className="text-xs text-gray-500 dark:text-gray-500">Month</span>
            </div>
            <div className="flex items-end space-x-2 mb-4">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">{metric.value}</span>
              <span className="text-lg text-gray-500 dark:text-gray-400">{metric.total}</span>
            </div>
            {/* Mini trend line */}
            <div className="flex items-center space-x-2">
              <div className="flex-1 h-8 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
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
                <div className={`text-sm font-medium ${metric.isIncrease ? 'text-green-600' : 'text-blue-600'}`}>
                  {metric.isIncrease ? '+' : ''}{metric.percentage}%
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activity</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">Month</span>
        </div>
        <CustomBarChart
          data={activityData}
          dataKey="value"
          xAxisKey="month"
          color="#3b82f6"
        />
      </div>

      {/* Performance Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Weakest Topics</h3>
          <div className="space-y-4">
            {weakestTopics.map((topic, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-lg">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{topic.name}</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{topic.percentage}% Correct</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${topic.color}`}
                      style={{ width: `${topic.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Strongest Topics</h3>
          <div className="space-y-4">
            {strongestTopics.map((topic, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-lg">
                  {topic.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 dark:text-white">{topic.name}</span>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">{topic.percentage}% Correct</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${topic.color}`}
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">User Leaderboard</h3>
          <div className="space-y-4">
            {userLeaderboard.map((user, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    user.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    user.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                    user.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {user.rank}
                  </span>
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{user.rank}</span>
                      {user.trend === 'up' ? (
                        <ChevronUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {user.points} • {user.percentage}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Groups Leaderboard</h3>
          <div className="space-y-4">
            {groupsLeaderboard.map((group, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    group.rank === 1 ? 'bg-yellow-100 text-yellow-800' : 
                    group.rank === 2 ? 'bg-gray-100 text-gray-800' : 
                    group.rank === 3 ? 'bg-orange-100 text-orange-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {group.rank}
                  </span>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{group.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{group.rank}</span>
                      {group.trend === 'up' ? (
                        <ChevronUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
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