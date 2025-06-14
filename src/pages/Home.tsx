import React, { useState } from 'react';
import { Calendar, TrendingUp, Award, Users, BookOpen, GraduationCap, Plus, X, School } from 'lucide-react';
import StatCard from '../components/Common/StatCard';
import Card from '../components/Common/Card';
import { mockNews, mockStudents, mockLecturers, mockFaculties } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [showNewsForm, setShowNewsForm] = useState(false);
  const [newsForm, setNewsForm] = useState({
    title: '',
    content: '',
    category: 'academic' as 'academic' | 'event' | 'announcement'
  });

  const topStudent = mockStudents.reduce((prev, current) => 
    prev.gpa > current.gpa ? prev : current
  );
  
  const topLecturer = mockLecturers.reduce((prev, current) => 
    prev.rating > current.rating ? prev : current
  );

  const featuredNews = mockNews.filter(news => news.featured);

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('News submitted:', newsForm);
    setShowNewsForm(false);
    setNewsForm({ title: '', content: '', category: 'academic' });
  };

  const isAdmin = user?.role === 'admin';

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          University Dashboard
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Welcome to your academic performance tracking system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 compact-grid mb-4">
        <StatCard
          title="Total Students"
          value="1,250"
          icon={GraduationCap}
          change={{ value: "12%", type: "increase" }}
          color="blue"
        />
        <StatCard
          title="Active Lecturers"
          value="85"
          icon={Users}
          change={{ value: "5%", type: "increase" }}
          color="green"
        />
        <StatCard
          title="Courses Offered"
          value="156"
          icon={BookOpen}
          change={{ value: "8%", type: "increase" }}
          color="purple"
        />
        <StatCard
          title="Average GPA"
          value="3.75"
          icon={TrendingUp}
          change={{ value: "0.2", type: "increase" }}
          color="yellow"
        />
      </div>

      {/* Faculties Overview */}
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
            <div className="tight-spacing">
              {featuredNews.map((news) => (
                <div key={news.id} className="border-l-2 border-primary-500 pl-3 py-1">
                  <div className="flex items-center justify-between">
                    <h4 className="compact-subheader text-gray-900 dark:text-white">
                      {news.title}
                    </h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(news.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {news.content}
                  </p>
                  <span className={`inline-block px-2 py-0.5 text-xs rounded-full mt-1 ${
                    news.category === 'academic' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                      : news.category === 'event'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                  }`}>
                    {news.category}
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
                  About University
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Excellence in education, research, and innovation. Building tomorrow's leaders today.
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
                    <p className="text-gray-600 dark:text-gray-400">August 15, 2024</p>
                  </div>
                  <div className="text-xs">
                    <p className="font-medium text-gray-900 dark:text-white">Semester Begins</p>
                    <p className="text-gray-600 dark:text-gray-400">August 22, 2024</p>
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
    </div>
  );
};

export default Home;