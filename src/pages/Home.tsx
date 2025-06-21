import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, Users, BookOpen, GraduationCap, Plus, X, School, ChevronRight, ArrowLeft, Target, Clock, CheckCircle, AlertTriangle, Star, Trophy, BarChart3 } from 'lucide-react';
import StatCard from '../components/Common/StatCard';
import Card from '../components/Common/Card';
import CustomBarChart from '../components/Charts/BarChart';
import CustomLineChart from '../components/Charts/LineChart';
import { useAuth } from '../contexts/AuthContext';
import { useNews, useAcademicCalendar, useFaculties, useProfiles } from '../hooks/useSupabaseData';
import { getDashboardMetrics, getSemesterProgressData } from '../data/supabaseData';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [selectedNews, setSelectedNews] = useState<any>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    category: 'academic' as 'academic' | 'event' | 'announcement'
  });

  // Fetch data from Supabase
  const { news, addNews } = useNews();
  const { events } = useAcademicCalendar();
  const { faculties } = useFaculties();
  const { profiles: students } = useProfiles('student');
  const { profiles: lecturers } = useProfiles('lecturer');

  // Get top performers
  const topStudent = students.length > 0 ? students[0] : null; // Would be sorted by GPA
  const topLecturer = lecturers.length > 0 ? lecturers[0] : null; // Would be sorted by rating

  const handleNewsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await addNews({
      ...newsForm,
      author_id: user?.id || null,
      featured: false
    });
    
    if (!result.error) {
      setShowNewsForm(false);
      setNewsForm({ title: '', content: '', category: 'academic' });
    }
  };

  const isAdmin = user?.role === 'admin';
  const isStudent = user?.role === 'student';
  const isLecturer = user?.role === 'lecturer';

  const missionStatement = "To provide world-class education that empowers students with knowledge, skills, and values necessary for leadership and service in a global society.";
  const visionStatement = "To be a leading university recognized for academic excellence, innovative research, and transformative impact on society.";

  // Mock metrics - would be fetched from getDashboardMetrics
  const metrics = {
    totalStudents: students.length,
    totalLecturers: lecturers.length,
    totalCourses: 156,
    averageGPA: 3.45,
    myGPA: 3.75,
    myCourses: 8,
    myRank: 15,
    myStudents: 120,
    myRating: 4.6
  };

  // Role-specific performance data
  const getPerformanceData = () => {
    if (isStudent) {
      return [
        { month: 'Sep', value: 3.2 },
        { month: 'Oct', value: 2.8 },
        { month: 'Nov', value: 3.6 },
        { month: 'Dec', value: 3.1 },
        { month: 'Jan', value: 3.75 },
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
      return {
        title: "Your Academic Journey",
        message: `You're ranked #15 in your department! Keep pushing towards excellence.`,
        progress: Math.round((3.75 / 5.0) * 100),
        nextGoal: "Reach 4.0 GPA"
      };
    } else if (isLecturer) {
      return {
        title: "Teaching Impact",
        message: `Your rating of 4.6/5.0 shows your dedication to student success!`,
        progress: Math.round((4.6 / 5.0) * 100),
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          {isStudent ? 'My Academic Dashboard' : isLecturer ? 'Teaching Dashboard' : 'University Dashboard'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isStudent ? 'Track your academic progress and achievements' : 
           isLecturer ? 'Monitor your teaching impact and student performance' :
           'Welcome to your academic performance tracking system'}
        </p>
      </div>

      {/* Motivational Card */}
      <div className="motivation-card mb-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{motivationalContent.title}</h3>
            <p className="opacity-90 mb-4">{motivationalContent.message}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-white/20 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-white rounded-full transition-all duration-500"
                    style={{ width: `${motivationalContent.progress}%` }}
                  ></div>
                </div>
                <span className="font-medium">{motivationalContent.progress}%</span>
              </div>
              <div>
                <Target className="h-4 w-4 inline mr-1" />
                {motivationalContent.nextGoal}
              </div>
            </div>
          </div>
          <div className="text-right">
            <Trophy className="h-16 w-16 opacity-80" />
          </div>
        </div>
      </div>

      {/* Role-Specific Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
              value="4"
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
              value={metrics.totalStudents.toLocaleString()}
              icon={GraduationCap}
              change={{ value: "12%", type: "increase" }}
              color="blue"
            />
            <StatCard
              title="Active Lecturers"
              value={metrics.totalLecturers.toString()}
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
              value="23"
              icon={AlertTriangle}
              change={{ value: "3", type: "decrease" }}
              color="red"
            />
          </>
        )}
      </div>

      {/* Performance Chart and Additional Metrics/Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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
              <Card title="Academic Standing">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Current CGPA</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{metrics.myGPA?.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Class Position</span>
                    <span className="font-semibold text-emerald-600">#{metrics.myRank}</span>
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
            </>
          ) : isLecturer ? (
            <>
              <Card title="Teaching Performance">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Student Satisfaction</span>
                    <span className="font-semibold text-gray-900 dark:text-white">{metrics.myRating?.toFixed(1)}/5.0</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Course Load</span>
                    <span className="font-semibold text-blue-600">4 courses</span>
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
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>

      {/* Faculties Overview */}
      {!isStudent && faculties.length > 0 && (
        <div className="mb-6">
          <Card title="Faculties Overview">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {faculties.map((faculty) => (
                <div key={faculty.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center mb-2">
                    <School className="h-4 w-4 text-emerald-600 mr-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {faculty.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {faculty.full_name}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <p><strong>Dean:</strong> {faculty.dean_name}</p>
                    <p><strong>Departments:</strong> {faculty.departments?.length || 0}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {topStudent && (
          <Card title="Top Student This Semester">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {topStudent.full_name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Computer Science • Level 400
                </p>
                <div className="flex items-center mt-1">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    GPA: 4.85/5.0
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}

        {topLecturer && (
          <Card title="Top Lecturer This Semester">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {topLecturer.full_name}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Computer Science
                </p>
                <div className="flex items-center mt-1">
                  <Award className="h-4 w-4 text-yellow-500 mr-1" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Rating: 4.9/5.0
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      {/* News and Quick Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card 
            title="Latest News & Announcements"
            action={isAdmin && (
              <button
                onClick={() => setShowNewsForm(true)}
                className="flex items-center space-x-1 bg-emerald-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-emerald-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add News</span>
              </button>
            )}
          >
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {news.slice(0, 10).map((newsItem) => (
                <div 
                  key={newsItem.id} 
                  className="border-l-2 border-emerald-500 pl-4 py-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r transition-colors"
                  onClick={() => setSelectedNews(newsItem)}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {newsItem.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(newsItem.created_at).toLocaleDateString()}
                      </span>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                    {newsItem.content.substring(0, 100)}...
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
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
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Mission Statement
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {missionStatement}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Vision Statement
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {visionStatement}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Upcoming Events
                </h4>
                <div className="space-y-2">
                  {events.slice(0, 3).map((event) => (
                    <div key={event.id} className="text-sm">
                      <p className="font-medium text-gray-900 dark:text-white">{event.event_title}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {new Date(event.event_date).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* News Upload Modal */}
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
                <span>Back to News</span>
              </button>
              <span className={`px-3 py-1 text-sm rounded-full ${
                selectedNews.category === 'academic' 
                  ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                  : selectedNews.category === 'event'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
              }`}>
                {selectedNews.category}
              </span>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {selectedNews.title}
            </h2>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(selectedNews.created_at).toLocaleDateString('en-US', { 
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