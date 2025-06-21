import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, Users, BookOpen, GraduationCap, Plus, X, School, ChevronRight, ArrowLeft, Target, Clock, CheckCircle, AlertTriangle, Star, Trophy, BarChart3 } from 'lucide-react';
import StatCard from '../components/Common/StatCard';
import Card from '../components/Common/Card';
import CustomBarChart from '../components/Charts/BarChart';
import CustomLineChart from '../components/Charts/LineChart';
import { mockNews, mockStudents, mockLecturers, mockFaculties, getDashboardMetrics } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    category: 'academic' as 'academic' | 'event' | 'announcement'
  });
  const [news, setNews] = useState(mockNews);

  const topStudent = mockStudents.reduce((prev, current) => 
    prev.gpa > current.gpa ? prev : current
  );
  
  const topLecturer = mockLecturers.reduce((prev, current) => 
    prev.rating > current.rating ? prev : current
  );

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNewsItem = {
      id: Date.now().toString(),
      title: newsForm.title,
      content: newsForm.content,
      date: new Date().toISOString().split('T')[0],
      category: newsForm.category,
      featured: false
    };
    setNews([newNewsItem, ...news]);
    setShowNewsForm(false);
    setNewsForm({ title: '', content: '', category: 'academic' });
  };

  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';
  const isLecturer = user?.role === 'lecturer';

  // Get role-specific metrics
  const metrics = getDashboardMetrics(user?.role || 'admin', user?.id);

  // Role-specific performance data
  const getPerformanceData = () => {
    if (isStudent) {
      const student = mockStudents.find(s => s.email === user?.email) || mockStudents[0];
      return [
        { month: 'Sep', value: 3.2 },
        { month: 'Oct', value: 2.8 },
        { month: 'Nov', value: 3.6 },
        { month: 'Dec', value: 3.1 },
        { month: 'Jan', value: student.gpa },
      ];
    } else if (isLecturer) {
      return [
        { month: 'Sep', value: 4.2 },
        { month: 'Oct', value: 4.5 },
        { month: 'Nov', value: 4.3 },
        { month: 'Dec', value: 4.7 },
        { month: 'Jan', value: 4.6 },
      ];
    } else {
      return [
        { month: 'Sep', value: 3.4 },
        { month: 'Oct', value: 3.6 },
        { month: 'Nov', value: 3.5 },
        { month: 'Dec', value: 3.8 },
        { month: 'Jan', value: 3.7 },
      ];
    }
  };

  // Role-specific motivational content
  const getMotivationalContent = () => {
    if (isStudent) {
      const student = mockStudents.find(s => s.email === user?.email) || mockStudents[0];
      const rank = mockStudents.filter(s => s.department === student.department && s.level === student.level && s.gpa > student.gpa).length + 1;
      return {
        title: "Your Academic Journey",
        message: `You're ranked #${rank} in your department! Keep pushing towards excellence.`,
        progress: Math.round((student.gpa / 5.0) * 100),
        nextGoal: student.gpa < 4.0 ? "Reach 4.0 GPA" : "Maintain Excellence"
      };
    } else if (isLecturer) {
      const lecturer = mockLecturers.find(l => l.email === user?.email) || mockLecturers[0];
      return {
        title: "Teaching Impact",
        message: `Your rating of ${lecturer.rating}/5.0 shows your dedication to student success!`,
        progress: Math.round((lecturer.rating / 5.0) * 100),
        nextGoal: "Inspire More Students"
      };
    } else {
      return {
        title: "Institutional Excellence",
        message: "Leading the university towards greater achievements and academic success.",
        progress: 85,
        nextGoal: "Enhance Overall Performance"
      };
    }
  };

  const motivationalContent = getMotivationalContent();

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {isStudent ? 'Track your academic progress and achievements' : 
             isLecturer ? 'Monitor your teaching impact and student performance' :
             'Plan, prioritize, and accomplish your tasks with ease.'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Add Project</span>
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            Import Data
          </button>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isStudent ? (
          <>
            <div className="bg-emerald-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-emerald-100 text-sm">My GPA</p>
                  <p className="text-3xl font-bold">{metrics.myGPA?.toFixed(2) || '0.00'}</p>
                  <div className="flex items-center text-emerald-200 text-sm mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>Increased from last month</span>
                  </div>
                </div>
                <div className="bg-emerald-500 p-3 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
              </div>
            </div>
            <StatCard
              title="My Courses"
              value={metrics.myCourses?.toString() || '0'}
              icon={BookOpen}
              color="blue"
            />
            <StatCard
              title="Department Rank"
              value={`#${metrics.myRank || 'N/A'}`}
              icon={Award}
              change={{ value: "2", type: "increase" }}
              color="yellow"
            />
            <StatCard
              title="Attendance"
              value="94%"
              icon={CheckCircle}
              change={{ value: "2%", type: "increase" }}
              color="purple"
            />
          </>
        ) : isLecturer ? (
          <>
            <div className="bg-emerald-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-emerald-100 text-sm">My Students</p>
                  <p className="text-3xl font-bold">{metrics.myStudents?.toString() || '0'}</p>
                  <div className="flex items-center text-emerald-200 text-sm mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>Increased from last month</span>
                  </div>
                </div>
                <div className="bg-emerald-500 p-3 rounded-lg">
                  <Users className="h-6 w-6" />
                </div>
              </div>
            </div>
            <StatCard
              title="My Rating"
              value={`${metrics.myRating?.toFixed(1) || '0.0'}/5.0`}
              icon={Star}
              change={{ value: "0.2", type: "increase" }}
              color="yellow"
            />
            <StatCard
              title="Courses Teaching"
              value={metrics.myCourses?.toString() || '0'}
              icon={BookOpen}
              color="green"
            />
            <StatCard
              title="Class Average"
              value="78%"
              icon={TrendingUp}
              change={{ value: "3%", type: "increase" }}
              color="purple"
            />
          </>
        ) : (
          <>
            <div className="bg-emerald-600 text-white p-6 rounded-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-emerald-100 text-sm">Total Students</p>
                  <p className="text-3xl font-bold">{mockStudents.length.toLocaleString()}</p>
                  <div className="flex items-center text-emerald-200 text-sm mt-2">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>Increased from last month</span>
                  </div>
                </div>
                <div className="bg-emerald-500 p-3 rounded-lg">
                  <GraduationCap className="h-6 w-6" />
                </div>
              </div>
            </div>
            <StatCard
              title="Active Lecturers"
              value={mockLecturers.length.toString()}
              icon={Users}
              change={{ value: "5%", type: "increase" }}
              color="blue"
            />
            <StatCard
              title="Average GPA"
              value={metrics.averageGPA?.toFixed(2) || '0.00'}
              icon={TrendingUp}
              change={{ value: "0.15", type: "increase" }}
              color="yellow"
            />
            <StatCard
              title="At Risk Students"
              value={metrics.failingStudents?.toString() || '0'}
              icon={AlertTriangle}
              change={{ value: "3", type: "decrease" }}
              color="red"
            />
          </>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <Card title="Performance Analytics">
            <CustomBarChart
              data={getPerformanceData()}
              dataKey="value"
              xAxisKey="month"
              title=""
              color="#10b981"
            />
          </Card>
        </div>

        {/* Reminders/Quick Actions */}
        <Card title="Reminders">
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Meeting with Arc Company
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                Time: 02:00 pm - 04:00 pm
              </p>
              <button className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                Start Meeting
              </button>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 dark:text-white">Project</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Develop API Endpoints</p>
                    <p className="text-xs text-gray-500">Due date: Nov 26, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Onboarding Flow</p>
                    <p className="text-xs text-gray-500">Due date: Nov 28, 2024</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Build Dashboard</p>
                    <p className="text-xs text-gray-500">Due date: Nov 30, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Collaboration */}
        <Card title="Team Collaboration">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900 dark:text-white">Team Members</h4>
              <button className="text-sm text-emerald-600 hover:text-emerald-700">+ Add Member</button>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  AD
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Alexandra Deff</p>
                  <p className="text-xs text-gray-500">Working on: Github Project Repository</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Completed</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  EA
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Edwin Adenike</p>
                  <p className="text-xs text-gray-500">Working on: Integrate User Authentication System</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Project Progress */}
        <Card title="Project Progress">
          <div className="text-center mb-6">
            <div className="relative w-32 h-32 mx-auto">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  className="text-gray-200 dark:text-gray-700"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${41 * 3.14159} ${100 * 3.14159}`}
                  className="text-emerald-600"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">41%</div>
                  <div className="text-xs text-gray-500">Project Ended</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Completed</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">In Progress</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-400">Pending</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Time Tracker */}
        <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-xl">
          <h3 className="text-lg font-semibold mb-4">Time Tracker</h3>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2">01:24:08</div>
          </div>
          <div className="flex items-center justify-center space-x-4">
            <button className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <div className="w-6 h-6 bg-white rounded-sm"></div>
            </button>
            <button className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </button>
          </div>
        </div>
      </div>

      {/* News Modal */}
      {showNewsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Add News</h3>
              <button
                onClick={() => setShowNewsForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleNewsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Content
                </label>
                <textarea
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={newsForm.category}
                  onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="academic">Academic</option>
                  <option value="event">Event</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowNewsForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;