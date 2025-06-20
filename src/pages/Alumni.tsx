import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Calendar, Award, ExternalLink, Users, TrendingUp, Building, GraduationCap } from 'lucide-react';
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
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Alumni Network
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Connect with our global community of graduates
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors">
          <Users className="h-4 w-4" />
          <span>Join Network</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 compact-grid mb-4">
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
      <div className="flex space-x-1 bg-gray-100 dark:bg-dark-card p-1 rounded-lg mb-4">
        <button
          onClick={() => setActiveTab('directory')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'directory'
              ? 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Alumni Directory
        </button>
        <button
          onClick={() => setActiveTab('stories')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'stories'
              ? 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Success Stories
        </button>
        <button
          onClick={() => setActiveTab('events')}
          className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
            activeTab === 'events'
              ? 'bg-white dark:bg-dark-surface text-gray-900 dark:text-white shadow-sm'
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
            <div className="flex flex-wrap items-center gap-3 py-1">
              <div className="relative min-w-0 flex-1">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search alumni by name, company, or position..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <select 
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 compact-grid">
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
                          <Award className="h-4 w-4 text-primary-600" />
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
                          <div className="w-1.5 h-1.5 bg-primary-600 rounded-full"></div>
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
                      <button className="flex items-center space-x-1 text-sm text-primary-600 hover:text-primary-700">
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

      {activeTab === 'stories' && (
        <div className="space-y-4">
          {successStories.map((story, index) => (
            <Card key={index}>
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {story.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
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
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
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