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

  const missionStatement = "To provide world-class education that empowers students with knowledge, skills, and values necessary for leadership and service in a global society.";
  const visionStatement = "To be a leading university recognized for academic excellence, innovative research, and transformative impact on society.";

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
    <div className="compact-spacing">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {isStudent ? 'My Academic Dashboard' : isLecturer ? 'Teaching Dashboard' : 'University Dashboard'}
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {isStudent ? 'Track your academic progress and achievements' : 
           isLecturer ? 'Monitor your teaching impact and student performance' :
           'Welcome to your academic performance tracking system'}
        </p>
      </div>

      {/* Motivational Card */}
      <div className="motivation-card mb-4">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2">{motivationalContent.title}</h3>
            <p className="text-sm opacity-90 mb-3">{motivationalContent.message}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-16 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${motivationalContent.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium">{motivationalContent.progress}%</span>
              </div>
              <div className="text-sm">
                <Target className="h-4 w-4 inline mr-1" />
                {motivationalContent.nextGoal}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Trophy className="h-12 w-12 opacity-80" />
          </div>
        </div>
      </div>

      {/* Role-Specific Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 compact-grid mb-4">
        {isStudent ? (
          <>
            <StatCard
              title="My GPA"
              value={metrics.myGPA?.toFixed(2) || '0.00'}
              icon={TrendingUp}
              change={{ value: "0.2", type: "increase" }}
              color="blue"
            />
            <StatCard
              title="My Courses"
              value={metrics.myCourses?.toString() || '0'}
              icon={BookOpen}
              color="green"
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
            <StatCard
              title="My Students"
              value={metrics.myStudents?.toString() || '0'}
              icon={Users}
              change={{ value: "5", type: "increase" }}
              color="blue"
            />
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
            <StatCard
              title="Total Students"
              value={mockStudents.length.toLocaleString()}
              icon={GraduationCap}
              change={{ value: "12%", type: "increase" }}
              color="blue"
            />
            <StatCard
              title="Active Lecturers"
              value={mockLecturers.length.toString()}
              icon={Users}
              change={{ value: "5%", type: "increase" }}
              color="green"
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

      {/* Performance Chart and Additional Metrics/Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid mb-4">
        <div className="lg:col-span-2">
          <CustomLineChart
            data={getPerformanceData()}
            dataKey="value"
            xAxisKey="month"
            title={isStudent ? "My GPA Trend" : isLecturer ? "My Rating Trend" : "University Performance Trend"}
            color="#10b981"
          />
        </div>

        <div>
          {isStudent ? (
            <>
              {/* Additional Student Metric */}
              <Card title="Academic Standing">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current CGPA</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{metrics.myGPA?.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Class Position</span>
                    <span className="font-semibold text-primary-600">#{metrics.myRank}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Credits Earned</span>
                    <span className="font-semibold text-gray-900 dark:text-white">45/120</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Graduation Progress</span>
                    <span className="font-semibold text-green-600">37.5%</span>
                  </div>
                </div>
              </Card>
              <Card title="My Progress">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Credit Hours</span>
                    <span className="font-semibold text-gray-900 dark:text-white">45/120</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '37.5%' }}></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Assignments Due</span>
                    <span className="font-semibold text-red-600">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Next Exam</span>
                    <span className="font-semibold text-gray-900 dark:text-white">5 days</span>
                  </div>
                </div>
              </Card>
            </>
          ) : isLecturer ? (
            <>
              {/* Additional Lecturer Metric */}
              <Card title="Teaching Performance">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Student Satisfaction</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{metrics.myRating?.toFixed(1)}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Course Load</span>
                    <span className="font-semibold text-blue-600">{metrics.myCourses} courses</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Research Papers</span>
                    <span className="font-semibold text-gray-900 dark:text-white">12 published</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Mentees</span>
                    <span className="font-semibold text-green-600">15 active</span>
                  </div>
                </div>
              </Card>
              <Card title="Teaching Insights">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Class Average</span>
                    <span className="font-semibold text-gray-900 dark:text-white">78%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</span>
                    <span className="font-semibold text-green-600">92%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Pending Grades</span>
                    <span className="font-semibold text-yellow-600">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">At-Risk Students</span>
                    <span className="font-semibold text-red-600">3</span>
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <>
              {/* Additional Admin Metric */}
              <Card title="System Analytics">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">System Uptime</span>
                    <span className="font-semibold text-green-600">99.9%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
                    <span className="font-semibold text-blue-600">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Data Processed</span>
                    <span className="font-semibold text-gray-900 dark:text-white">2.3TB</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Reports Generated</span>
                    <span className="font-semibold text-purple-600">156</span>
                  </div>
                </div>
              </Card>
              <Card title="Quick Actions">
                <div className="space-y-3">
                  <button className="w-full p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-left transition-all">
                    Generate Reports
                  </button>
                  <button className="w-full p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-left transition-all">
                    Review Performance
                  </button>
                  <button className="w-full p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white text-left transition-all">
                    Manage Users
                  </button>
                </div>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Faculties Overview */}
      {!isStudent && (
        <div className="mb-4">
          <Card title="Faculties Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 compact-grid">
              {mockFaculties.map((faculty) => (
                <div key={faculty.id} className="bg-gray-50 dark:bg-gray-700 minimal-padding rounded-lg">
                  <div className="flex items-center mb-2">
                    <School className="h-4 w-4 text-primary-600 mr-2" />
                    <h4 className="compact-subheader text-gray-900 dark:text-white">
                      {faculty.name}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                    {faculty.fullName}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <p><strong>Dean:</strong> {faculty.dean.name}</p>
                    <p><strong>Departments:</strong> {faculty.departments.length}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid mb-4">
        <Card title="Top Student This Semester">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="compact-subheader text-gray-900 dark:text-white">
                {topStudent.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {topStudent.department} • Level {topStudent.level}
              </p>
              <div className="flex items-center mt-1">
                <Award className="h-3 w-3 text-yellow-500 mr-1" />
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  GPA: {topStudent.gpa}/5.0
                </span>
              </div>
            </div>
          </div>
        </Card>

        <Card title="Top Lecturer This Semester">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="compact-subheader text-gray-900 dark:text-white">
                {topLecturer.name}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {topLecturer.department}
              </p>
              <div className="flex items-center mt-1">
                <Award className="h-3 w-3 text-yellow-500 mr-1" />
                <span className="text-xs font-medium text-gray-900 dark:text-white">
                  Rating: {topLecturer.rating}/5.0
                </span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* News and Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
        <div className="lg:col-span-2">
          <Card 
            title="Latest News & Announcements"
            action={isAdmin && (
              <button
                onClick={() => setShowNewsForm(true)}
                className="flex items-center space-x-1 bg-primary-600 text-white px-3 py-1 rounded text-xs hover:bg-primary-700 transition-colors"
              >
                <Plus className="h-3 w-3" />
                <span>Add News</span>
              </button>
            )}
          >
            <div className="tight-spacing max-h-96 overflow-y-auto">
              {news.slice(0, 10).map((newsItem) => (
                <div 
                  key={newsItem.id} 
                  className="border-l-2 border-primary-500 pl-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r transition-colors"
                  onClick={() => setSelectedNews(newsItem)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="compact-subheader text-gray-900 dark:text-white">
                      {newsItem.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(newsItem.date).toLocaleDateString()}
                      </span>
                      <ChevronRight className="h-3 w-3 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {newsItem.content.substring(0, 100)}...
                  </p>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${
                    newsItem.category === 'academic' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      : newsItem.category === 'event'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {newsItem.category}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card title="Quick Info">
            <div className="tight-spacing">
              <div>
                <h4 className="compact-subheader text-gray-900 dark:text-white mb-2">
                  Mission Statement
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {missionStatement}
                </p>
              </div>

              <div>
                <h4 className="compact-subheader text-gray-900 dark:text-white mb-2">
                  Vision Statement
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                  {visionStatement}
                </p>
              </div>

              <div>
                <h4 className="compact-subheader text-gray-900 dark:text-white mb-2 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  Upcoming Events
                </h4>
                <div className="tight-spacing">
                  <div className="text-xs">
                    <p className="font-medium text-gray-900 dark:text-white">Registration Deadline</p>
                    <p className="text-gray-600 dark:text-gray-400">September 15, 2024</p>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-gray-900 dark:text-white">First Semester Begins</p>
                    <p className="text-gray-600 dark:text-gray-400">September 22, 2024</p>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-gray-900 dark:text-white">Mid-Semester Break</p>
                    <p className="text-gray-600 dark:text-gray-400">November 15-22, 2024</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* News Upload Modal */}
      {showNewsForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="compact-header text-gray-900 dark:text-white">Add News</h3>
              <button
                onClick={() => setShowNewsForm(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleNewsSubmit} className="compact-spacing">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Content
                </label>
                <textarea
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  rows={2}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={newsForm.category}
                  onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="academic">Academic</option>
                  <option value="event">Event</option>
                  <option value="announcement">Announcement</option>
                </select>
              </div>
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setShowNewsForm(false)}
                  className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
                >
                  Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* News Detail Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedNews(null)}
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to News</span>
              </button>
              <span className={`px-3 py-1 text-xs rounded-full ${
                selectedNews.category === 'academic' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : selectedNews.category === 'event'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {selectedNews.category}
              </span>
            </div>
            
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              {selectedNews.title}
            </h2>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(selectedNews.date).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            <div className="prose prose-sm dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {selectedNews.content}
              </p>
            </div>
            
            {selectedNews.featured && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-center">
                  <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <span className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Featured Announcement
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;