import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Calendar, Award, ExternalLink, Users, TrendingUp, Building, GraduationCap, Trophy, Star, Crown } from 'lucide-react';
import Card from '../components/Common/Card';
import Avatar from '../components/Common/Avatar';
import StatCard from '../components/Common/StatCard';

interface AlumniMember {
  id: string;
  name: string;
  graduationYear: number;
  department: string;
  faculty: string;
  currentPosition: string;
  company: string;
  location: string;
  achievements: string[];
  linkedIn?: string;
  email?: string;
  bio: string;
  isVerified: boolean;
}

interface HallOfFamer {
  id: string;
  name: string;
  year: number;
  department: string;
  gpa?: number;
  rating?: number;
  type: 'student' | 'lecturer';
  achievement: string;
  currentStatus: string;
}

const Alumni: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [activeTab, setActiveTab] = useState('directory');

  const alumniMembers: AlumniMember[] = [
    {
      id: '1',
      name: 'Dr. Adebayo Ogundimu',
      graduationYear: 2015,
      department: 'Computer Science',
      faculty: 'COPAS',
      currentPosition: 'Senior Software Engineer',
      company: 'Google',
      location: 'Mountain View, CA',
      achievements: ['Published 15+ research papers', 'Led team of 20+ engineers', 'Patent holder'],
      linkedIn: 'https://linkedin.com/in/adebayo-ogundimu',
      email: 'adebayo.ogundimu@gmail.com',
      bio: 'Passionate about AI and machine learning. Leading innovative projects at Google.',
      isVerified: true
    },
    {
      id: '2',
      name: 'Funmi Adeyemi',
      graduationYear: 2018,
      department: 'Business Administration',
      faculty: 'CASMAS',
      currentPosition: 'Product Manager',
      company: 'Microsoft',
      location: 'Seattle, WA',
      achievements: ['Forbes 30 Under 30', 'Led $50M product launch', 'TEDx Speaker'],
      linkedIn: 'https://linkedin.com/in/funmi-adeyemi',
      email: 'funmi.adeyemi@microsoft.com',
      bio: 'Product strategist with expertise in enterprise software and user experience.',
      isVerified: true
    },
    {
      id: '3',
      name: 'Kehinde Ogunniran',
      graduationYear: 2012,
      department: 'Architecture',
      faculty: 'COLENSMA',
      currentPosition: 'Principal Architect',
      company: 'Foster + Partners',
      location: 'London, UK',
      achievements: ['RIBA Award Winner', 'Designed 10+ landmark buildings', 'Sustainability advocate'],
      linkedIn: 'https://linkedin.com/in/kehinde-ogunniran',
      bio: 'Award-winning architect specializing in sustainable and innovative design solutions.',
      isVerified: true
    },
    {
      id: '4',
      name: 'Blessing Okafor',
      graduationYear: 2016,
      department: 'Nursing Science',
      faculty: 'NURSING',
      currentPosition: 'Chief Nursing Officer',
      company: 'Johns Hopkins Hospital',
      location: 'Baltimore, MD',
      achievements: ['Magnet Recognition Program Leader', 'Published healthcare researcher', 'Patient safety advocate'],
      linkedIn: 'https://linkedin.com/in/blessing-okafor',
      bio: 'Healthcare leader dedicated to improving patient outcomes and nursing excellence.',
      isVerified: true
    },
    {
      id: '5',
      name: 'Foluke Dada',
      graduationYear: 2014,
      department: 'Law',
      faculty: 'COLAW',
      currentPosition: 'Senior Partner',
      company: 'Dada & Associates',
      location: 'Lagos, Nigeria',
      achievements: ['Supreme Court advocate', 'Human rights champion', 'Legal reform advocate'],
      linkedIn: 'https://linkedin.com/in/foluke-dada',
      bio: 'Leading legal practitioner specializing in corporate law and human rights.',
      isVerified: true
    },
    {
      id: '6',
      name: 'Chidi Okonkwo',
      graduationYear: 2017,
      department: 'Biochemistry',
      faculty: 'COPAS',
      currentPosition: 'Research Scientist',
      company: 'Pfizer',
      location: 'New York, NY',
      achievements: ['Drug discovery breakthrough', 'Nature publication author', 'FDA advisory committee member'],
      linkedIn: 'https://linkedin.com/in/chidi-okonkwo',
      bio: 'Biochemist working on next-generation therapeutics and drug discovery.',
      isVerified: true
    }
  ];

  // Hall of Fame data - Previous top performers who are no longer current staff/students
  const hallOfFamers: HallOfFamer[] = [
    // Top Students by Year
    {
      id: 'hof1',
      name: 'Adebayo Johnson',
      year: 2023,
      department: 'Computer Science',
      gpa: 4.95,
      type: 'student',
      achievement: 'Highest GPA - Class of 2023',
      currentStatus: 'Software Engineer at Meta'
    },
    {
      id: 'hof2',
      name: 'Chioma Okwu',
      year: 2022,
      department: 'Biochemistry',
      gpa: 4.92,
      type: 'student',
      achievement: 'Highest GPA - Class of 2022',
      currentStatus: 'PhD Student at Harvard'
    },
    {
      id: 'hof3',
      name: 'Kemi Adebayo',
      year: 2021,
      department: 'Architecture',
      gpa: 4.89,
      type: 'student',
      achievement: 'Highest GPA - Class of 2021',
      currentStatus: 'Architect at Zaha Hadid Architects'
    },
    {
      id: 'hof4',
      name: 'Tunde Olatunji',
      year: 2020,
      department: 'Business Administration',
      gpa: 4.87,
      type: 'student',
      achievement: 'Highest GPA - Class of 2020',
      currentStatus: 'Investment Banker at Goldman Sachs'
    },
    {
      id: 'hof5',
      name: 'Ngozi Eze',
      year: 2019,
      department: 'Law',
      gpa: 4.94,
      type: 'student',
      achievement: 'Highest GPA - Class of 2019',
      currentStatus: 'Barrister at Supreme Court'
    },
    // Top Former Lecturers
    {
      id: 'hof6',
      name: 'Prof. Olumide Adeyemi',
      year: 2018,
      department: 'Computer Science',
      rating: 4.98,
      type: 'lecturer',
      achievement: 'Highest Teaching Rating - 2018',
      currentStatus: 'Professor at MIT'
    },
    {
      id: 'hof7',
      name: 'Dr. Funmilayo Ogundipe',
      year: 2019,
      department: 'Biochemistry',
      rating: 4.96,
      type: 'lecturer',
      achievement: 'Highest Teaching Rating - 2019',
      currentStatus: 'Research Director at Novartis'
    },
    {
      id: 'hof8',
      name: 'Prof. Babatunde Lawal',
      year: 2020,
      department: 'Architecture',
      rating: 4.94,
      type: 'lecturer',
      achievement: 'Highest Teaching Rating - 2020',
      currentStatus: 'Principal at Foster + Partners'
    },
    {
      id: 'hof9',
      name: 'Dr. Aisha Mohammed',
      year: 2021,
      department: 'Business Administration',
      rating: 4.93,
      type: 'lecturer',
      achievement: 'Highest Teaching Rating - 2021',
      currentStatus: 'CEO at TechStart Africa'
    },
    {
      id: 'hof10',
      name: 'Prof. Emeka Nwosu',
      year: 2022,
      department: 'Law',
      rating: 4.97,
      type: 'lecturer',
      achievement: 'Highest Teaching Rating - 2022',
      currentStatus: 'Supreme Court Justice'
    }
  ];

  const departments = Array.from(new Set(alumniMembers.map(a => a.department)));
  const graduationYears = Array.from(new Set(alumniMembers.map(a => a.graduationYear))).sort((a, b) => b - a);

  const filteredAlumni = alumniMembers.filter(alumni => {
    const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alumni.currentPosition.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = !selectedDepartment || alumni.department === selectedDepartment;
    const matchesYear = !selectedYear || alumni.graduationYear.toString() === selectedYear;
    
    return matchesSearch && matchesDepartment && matchesYear;
  });

  const alumniStats = {
    totalAlumni: alumniMembers.length,
    averageGraduationYear: Math.round(alumniMembers.reduce((sum, a) => sum + a.graduationYear, 0) / alumniMembers.length),
    topCompanies: ['Google', 'Microsoft', 'Pfizer', 'Foster + Partners'],
    globalReach: alumniMembers.filter(a => !a.location.includes('Nigeria')).length
  };

  const successStories = [
    {
      title: 'From Student to Google Engineer',
      description: 'Dr. Adebayo Ogundimu shares his journey from Computer Science student to leading AI projects at Google.',
      author: 'Dr. Adebayo Ogundimu',
      date: '2 weeks ago'
    },
    {
      title: 'Building Sustainable Architecture',
      description: 'Kehinde Ogunniran discusses how university education shaped his award-winning architectural career.',
      author: 'Kehinde Ogunniran',
      date: '1 month ago'
    },
    {
      title: 'Healthcare Innovation Leadership',
      description: 'Blessing Okafor on transforming healthcare delivery through nursing excellence and innovation.',
      author: 'Blessing Okafor',
      date: '3 weeks ago'
    }
  ];

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Alumni Network
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Connect with our global community of graduates
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
          <Users className="h-4 w-4" />
          <span>Join Network</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Alumni"
          value={alumniStats.totalAlumni.toString()}
          icon={GraduationCap}
          color="blue"
        />
        <StatCard
          title="Global Reach"
          value={`${alumniStats.globalReach} Countries`}
          icon={MapPin}
          color="green"
        />
        <StatCard
          title="Top Companies"
          value={alumniStats.topCompanies.length.toString()}
          icon={Building}
          color="purple"
        />
        <StatCard
          title="Success Rate"
          value="94%"
          icon={TrendingUp}
          color="yellow"
        />
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-white dark:bg-gray-800 p-1 rounded-lg mb-6 border border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'directory'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Alumni Directory
        </button>
        <button
          onClick={() => setActiveTab('hall-of-fame')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'hall-of-fame'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Hall of Fame
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'stories'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Success Stories
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'events'
              ? 'bg-emerald-600 text-white'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Alumni Events
        </button>
      </div>

      {activeTab === 'directory' && (
        <>
          {/* Filters */}
          <Card>
            <div className="flex flex-wrap items-center gap-4 py-2">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alumni by name, company, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Years</option>
                {graduationYears.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
              <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                Showing {filteredAlumni.length} of {alumniMembers.length} alumni
              </div>
            </div>
          </Card>

          {/* Alumni Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAlumni.map((alumni) => (
              <Card key={alumni.id}>
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start space-x-3">
                    <Avatar 
                      name={alumni.name} 
                      type="lecturer" 
                      size="lg" 
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {alumni.name}
                        </h3>
                        {alumni.isVerified && (
                          <Award className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Class of {alumni.graduationYear}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {alumni.department}
                      </p>
                    </div>
                  </div>

                  {/* Current Position */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {alumni.currentPosition}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {alumni.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {alumni.location}
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                    {alumni.bio}
                  </p>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Key Achievements
                    </h4>
                    <div className="space-y-1">
                      {alumni.achievements.slice(0, 2).map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full"></div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {achievement}
                          </p>
                        </div>
                      ))}
                      {alumni.achievements.length > 2 && (
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          +{alumni.achievements.length - 2} more
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {alumni.linkedIn && (
                      <button className="flex items-center space-x-1 text-sm text-emerald-600 hover:text-emerald-700">
                        <ExternalLink className="h-3 w-3" />
                        <span>LinkedIn</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                      <Users className="h-3 w-3" />
                      <span>Connect</span>
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}

      {activeTab === 'hall-of-fame' && (
        <div className="space-y-6">
          {/* Hall of Fame Header */}
          <div className="text-center py-8 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
            <Crown className="mx-auto h-12 w-12 text-yellow-600 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Hall of Fame
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Celebrating our most outstanding alumni and former faculty members
            </p>
          </div>

          {/* Top Students Section */}
          <Card title="🎓 Top Students by Graduation Year">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hallOfFamers.filter(hof => hof.type === 'student').map((student, index) => (
                <div key={student.id} className="relative p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-yellow-500 text-white p-2 rounded-full">
                        <Crown className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <Avatar name={student.name} type="student" size="md" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {student.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {student.department} • {student.year}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-600">
                          GPA: {student.gpa?.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-medium">
                        {student.achievement}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Now: {student.currentStatus}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Top Lecturers Section */}
          <Card title="👨‍🏫 Top Former Faculty Members">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hallOfFamers.filter(hof => hof.type === 'lecturer').map((lecturer, index) => (
                <div key={lecturer.id} className="relative p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  {index === 0 && (
                    <div className="absolute -top-2 -right-2">
                      <div className="bg-yellow-500 text-white p-2 rounded-full">
                        <Trophy className="h-4 w-4" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start space-x-3">
                    <Avatar name={lecturer.name} type="lecturer" size="md" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {lecturer.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {lecturer.department} • {lecturer.year}
                      </p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium text-yellow-600">
                          Rating: {lecturer.rating?.toFixed(2)}/5.0
                        </span>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                        {lecturer.achievement}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Now: {lecturer.currentStatus}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Hall of Fame Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <Trophy className="mx-auto h-8 w-8 text-yellow-600 mb-2" />
              <div className="text-2xl font-bold text-yellow-600">
                {hallOfFamers.filter(h => h.type === 'student').length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Top Students</p>
            </div>
            <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <Star className="mx-auto h-8 w-8 text-green-600 mb-2" />
              <div className="text-2xl font-bold text-green-600">
                {hallOfFamers.filter(h => h.type === 'lecturer').length}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Top Lecturers</p>
            </div>
            <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Award className="mx-auto h-8 w-8 text-blue-600 mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...hallOfFamers.filter(h => h.gpa).map(h => h.gpa || 0)).toFixed(2)}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Highest GPA</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'stories' && (
        <div className="space-y-6">
          {successStories.map((story, index) => (
            <Card key={index}>
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {story.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Avatar name={story.author} type="lecturer" size="sm" />
                        <span>{story.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{story.date}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-emerald-600 hover:text-emerald-700 text-sm font-medium">
                    Read More
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <Card>
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No upcoming events
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Alumni events will be posted here. Stay tuned for networking opportunities!
            </p>
          </div>
        </Card>
      )}

      {/* Empty State for Directory */}
      {activeTab === 'directory' && filteredAlumni.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No alumni found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or filters.
            </p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Alumni;