import React, { useState } from 'react';
import { 
  User, Mail, Phone, MapPin, Calendar, Edit, Save, X, Camera, Award, BookOpen, TrendingUp,
  GraduationCap, Users, Clock, FileText, Star, Building, Briefcase, Globe, Target,
  BarChart3, PieChart, Activity, CheckCircle, AlertCircle, Settings, Shield, Key, Monitor
} from 'lucide-react';
import Card from '../components/Common/Card';
import StatCard from '../components/Common/StatCard';
import { useAuth } from '../contexts/AuthContext';
import { mockStudents, mockLecturers } from '../data/mockData';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  // Admin-specific profile data
  const [adminProfileData, setAdminProfileData] = useState({
    // Basic Information
    name: user?.name || 'Admin User',
    email: user?.email || 'admin@calebuniversity.edu.ng',
    phone: '+234 803 123 4567',
    adminId: 'ADMIN001',
    username: 'admin.user',
    role: 'Super Admin',
    department: 'ICT Department',
    
    // System Role & Permissions
    accessLevel: 'Full Admin',
    permissions: ['Students', 'Staff', 'Reports', 'Settings', 'System Config'],
    lastRoleUpdate: '2024-01-01',
    
    // Activity Log
    lastLogin: '2024-01-15 09:30 AM',
    ipAddress: '192.168.1.100',
    location: 'Lagos, Nigeria',
    devicesUsed: ['Windows Desktop', 'Mobile App'],
    recentActions: [
      'User created: John Doe',
      'Report exported: Student Performance Q4',
      'System settings updated',
      'Bulk user import completed'
    ],
    
    // Account Settings
    twoFactorEnabled: true,
    passwordLastChanged: '2024-01-01',
    loginAttempts: [
      { date: '2024-01-15', status: 'Success', ip: '192.168.1.100' },
      { date: '2024-01-14', status: 'Success', ip: '192.168.1.100' },
      { date: '2024-01-13', status: 'Failed', ip: '192.168.1.105' }
    ],
    notificationPreferences: {
      email: true,
      sms: false,
      push: true
    },
    themePreference: 'Dark Mode',
    
    // System Contributions
    reportsCreated: 45,
    usersManaged: 1250,
    alertsHandled: 23,
    maintenanceLogs: [
      'System backup completed - 2024-01-15',
      'Database optimization - 2024-01-10',
      'Security patch applied - 2024-01-05'
    ],
    
    // Metadata
    accountCreated: '2020-09-01',
    status: 'Active',
    assignedBy: 'System Administrator',
    linkedFaculties: ['All Faculties'],
    
    bio: 'Experienced system administrator with over 5 years managing educational platforms. Dedicated to maintaining system integrity and supporting academic excellence.',
    interests: ['System Administration', 'Data Analytics', 'Educational Technology', 'Cybersecurity'],
    emergencyContact: {
      name: 'Jane Admin',
      relationship: 'Colleague',
      phone: '+234 803 987 6543'
    }
  });

  // Enhanced profile data for staff
  const [profileData, setProfileData] = useState({
    // Basic Information
    name: user?.name || 'Dr. Sarah Wilson',
    email: user?.email || 'sarah.wilson@calebuniversity.edu.ng',
    phone: '+234 803 123 4567',
    address: 'Lagos, Nigeria',
    dateOfBirth: '1985-06-15',
    department: user?.department || 'Computer Science',
    faculty: user?.faculty || 'COPAS',
    staffId: 'STAFF001',
    officeLocation: 'Block A, Room 205',
    dateJoined: '2020-09-01',
    employmentType: 'Full-time',
    
    // Academic Qualifications
    highestDegree: 'PhD in Computer Science',
    otherDegrees: ['MSc Computer Science (2015)', 'BSc Computer Science (2012)'],
    institutions: ['University of Lagos', 'Obafemi Awolowo University'],
    specializations: ['Machine Learning', 'Data Science', 'Software Engineering'],
    
    // Teaching Information
    currentCourses: [
      { name: 'Advanced Algorithms', code: 'CS401', level: '400', semester: '1st', students: 45 },
      { name: 'Machine Learning', code: 'CS402', level: '400', semester: '1st', students: 38 },
      { name: 'Data Structures', code: 'CS301', level: '300', semester: '1st', students: 52 }
    ],
    teachingLoad: 12, // credit units per semester
    teachingAssistants: ['John Doe', 'Jane Smith'],
    
    // Performance Metrics
    studentFeedbackScore: 4.8,
    passRates: [
      { course: 'CS401', rate: 92 },
      { course: 'CS402', rate: 88 },
      { course: 'CS301', rate: 95 }
    ],
    averageGradeDistribution: { A: 35, B: 40, C: 20, D: 4, F: 1 },
    attendanceRate: 96,
    syllabusCompletion: 98,
    markingTimeliness: 95,
    
    // Research & Publications
    publicationsCount: 15,
    recentPublications: [
      { title: 'Machine Learning in Education', date: '2024-01-15', type: 'Journal' },
      { title: 'Data Science Applications', date: '2023-11-20', type: 'Conference' }
    ],
    grantsSecured: 3,
    studentsSupervised: 8,
    ongoingProjects: ['AI in Education', 'Smart Campus System'],
    
    // Institutional Contributions
    committees: ['Academic Board', 'Curriculum Committee', 'Research Ethics'],
    administrativeRoles: ['Head of Department (2022-2024)'],
    eventsOrganized: ['Annual Tech Conference 2023', 'AI Workshop Series'],
    
    // Development & Training
    professionalCourses: [
      'Advanced Teaching Methods (2023)',
      'Research Methodology (2022)',
      'Digital Pedagogy (2021)'
    ],
    certifications: ['Certified Data Scientist', 'AWS Cloud Practitioner'],
    conferencesAttended: ['NIPS 2023', 'ICML 2023', 'Local AI Summit 2024'],
    
    // Student Engagement
    officeHours: 'Monday & Wednesday 2-4 PM',
    mentoringRoles: ['Final Year Project Supervisor', 'Career Advisor'],
    
    // System Metadata
    accountStatus: 'Active',
    lastLogin: '2024-01-15 09:30 AM',
    profileLastUpdated: '2024-01-10',
    accessLevel: 'Senior Lecturer',
    
    bio: 'Passionate educator and researcher with over 10 years of experience in computer science education. Dedicated to advancing knowledge in machine learning and data science while mentoring the next generation of technologists.',
    interests: ['Machine Learning', 'Data Science', 'Educational Technology', 'Research'],
    emergencyContact: {
      name: 'John Wilson',
      relationship: 'Spouse',
      phone: '+234 803 987 6543'
    }
  });

  const handleSave = () => {
    setIsEditing(false);
    console.log('Profile updated:', user?.role === 'admin' ? adminProfileData : profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Get user-specific data based on role
  const userData = user?.role === 'student' 
    ? mockStudents.find(s => s.email === user?.email) || mockStudents[0]
    : user?.role === 'lecturer'
    ? mockLecturers.find(l => l.email === user?.email) || mockLecturers[0]
    : null;

  const isStaff = user?.role === 'lecturer';
  const isAdmin = user?.role === 'admin';

  // Admin-specific tabs
  const adminTabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'permissions', label: 'Permissions', icon: Shield },
    { id: 'activity', label: 'Activity Log', icon: Activity },
    { id: 'security', label: 'Security', icon: Key },
    { id: 'system', label: 'System', icon: Monitor }
  ];

  // Staff tabs
  const staffTabs = [
    { id: 'basic', label: 'Basic Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'teaching', label: 'Teaching', icon: BookOpen },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'research', label: 'Research', icon: FileText },
    { id: 'contributions', label: 'Contributions', icon: Award },
    { id: 'development', label: 'Development', icon: TrendingUp },
    { id: 'engagement', label: 'Engagement', icon: Users }
  ];

  const tabs = isAdmin ? adminTabs : staffTabs;
  const currentProfileData = isAdmin ? adminProfileData : profileData;
  const setCurrentProfileData = isAdmin ? setAdminProfileData : setProfileData;

  const renderAdminTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Personal Information</h4>
              <div className="tight-spacing">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{adminProfileData.name}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{adminProfileData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{adminProfileData.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Building className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{adminProfileData.department}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Admin Information</h4>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Admin ID:</span>
                  <p className="font-medium">{adminProfileData.adminId}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Username:</span>
                  <p className="font-medium">{adminProfileData.username}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Role:</span>
                  <p className="font-medium">{adminProfileData.role}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Access Level:</span>
                  <p className="font-medium text-green-600">{adminProfileData.accessLevel}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'permissions':
        return (
          <div className="tight-spacing">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">System Permissions</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 compact-grid">
                {adminProfileData.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center space-x-2 minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-900 dark:text-white">{permission}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Linked Faculties</h4>
              <div className="flex flex-wrap gap-2">
                {adminProfileData.linkedFaculties.map((faculty, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded">
                    {faculty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Last Role Update:</span>
              <p className="font-medium">{adminProfileData.lastRoleUpdate}</p>
            </div>
          </div>
        );

      case 'activity':
        return (
          <div className="tight-spacing">
            <div className="grid grid-cols-1 md:grid-cols-3 compact-grid mb-4">
              <StatCard
                title="Reports Created"
                value={adminProfileData.reportsCreated}
                icon={FileText}
                color="blue"
              />
              <StatCard
                title="Users Managed"
                value={adminProfileData.usersManaged}
                icon={Users}
                color="green"
              />
              <StatCard
                title="Alerts Handled"
                value={adminProfileData.alertsHandled}
                icon={AlertCircle}
                color="yellow"
              />
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Recent Actions</h4>
              <div className="tight-spacing">
                {adminProfileData.recentActions.map((action, index) => (
                  <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm text-gray-900 dark:text-white">{action}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Maintenance Logs</h4>
              <div className="tight-spacing">
                {adminProfileData.maintenanceLogs.map((log, index) => (
                  <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm text-gray-900 dark:text-white">{log}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="tight-spacing">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Security Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Two-Factor Authentication:</span>
                  <p className={`font-medium ${adminProfileData.twoFactorEnabled ? 'text-green-600' : 'text-red-600'}`}>
                    {adminProfileData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Password Last Changed:</span>
                  <p className="font-medium">{adminProfileData.passwordLastChanged}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Login History</h4>
              <div className="overflow-x-auto">
                <table className="w-full compact-table">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-900 dark:text-white">Date</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-900 dark:text-white">Status</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-900 dark:text-white">IP Address</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminProfileData.loginAttempts.map((attempt, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{attempt.date}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            attempt.status === 'Success' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                          }`}>
                            {attempt.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{attempt.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'system':
        return (
          <div className="tight-spacing">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">System Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Account Created:</span>
                  <p className="font-medium">{adminProfileData.accountCreated}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Status:</span>
                  <p className="font-medium text-green-600">{adminProfileData.status}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Assigned By:</span>
                  <p className="font-medium">{adminProfileData.assignedBy}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Login:</span>
                  <p className="font-medium">{adminProfileData.lastLogin}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">IP Address:</span>
                  <p className="font-medium">{adminProfileData.ipAddress}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Location:</span>
                  <p className="font-medium">{adminProfileData.location}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Devices Used</h4>
              <div className="flex flex-wrap gap-2">
                {adminProfileData.devicesUsed.map((device, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs rounded">
                    {device}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Notification Preferences</h4>
              <div className="grid grid-cols-3 compact-grid">
                <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Email</p>
                  <p className={`text-xs ${adminProfileData.notificationPreferences.email ? 'text-green-600' : 'text-red-600'}`}>
                    {adminProfileData.notificationPreferences.email ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">SMS</p>
                  <p className={`text-xs ${adminProfileData.notificationPreferences.sms ? 'text-green-600' : 'text-red-600'}`}>
                    {adminProfileData.notificationPreferences.sms ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
                <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Push</p>
                  <p className={`text-xs ${adminProfileData.notificationPreferences.push ? 'text-green-600' : 'text-red-600'}`}>
                    {adminProfileData.notificationPreferences.push ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStaffTabContent = () => {
    switch (activeTab) {
      case 'basic':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Personal Information</h4>
              <div className="tight-spacing">
                <div className="flex items-center text-sm">
                  <User className="h-4 w-4 mr-2 text-gray-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span>{profileData.name}</span>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 mr-2 text-gray-500" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span>{profileData.email}</span>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 mr-2 text-gray-500" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span>{profileData.phone}</span>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.address}
                      onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span>{profileData.address}</span>
                  )}
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                  {isEditing ? (
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                      className="flex-1 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    />
                  ) : (
                    <span>{new Date(profileData.dateOfBirth).toLocaleDateString()}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Employment Information</h4>
              <div className="tight-spacing">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Staff ID:</span>
                  <p className="font-medium">{profileData.staffId}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Department:</span>
                  <p className="font-medium">{profileData.department}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Faculty:</span>
                  <p className="font-medium">{profileData.faculty}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Office Location:</span>
                  <p className="font-medium">{profileData.officeLocation}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Date Joined:</span>
                  <p className="font-medium">{new Date(profileData.dateJoined).toLocaleDateString()}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Employment Type:</span>
                  <p className="font-medium">{profileData.employmentType}</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'academic':
        return (
          <div className="tight-spacing">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Qualifications</h4>
              <div className="bg-gray-50 dark:bg-gray-700 minimal-padding rounded">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{profileData.highestDegree}</p>
                <div className="mt-2">
                  {profileData.otherDegrees.map((degree, index) => (
                    <p key={index} className="text-xs text-gray-600 dark:text-gray-400">• {degree}</p>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Institutions</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.institutions.map((institution, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded">
                    {institution}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Specializations</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.specializations.map((spec, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded">
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'teaching':
        return (
          <div className="tight-spacing">
            <div className="grid grid-cols-1 md:grid-cols-3 compact-grid mb-4">
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-primary-600">{profileData.teachingLoad}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Credit Units</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-green-600">{profileData.currentCourses.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Courses</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-blue-600">
                  {profileData.currentCourses.reduce((sum, course) => sum + course.students, 0)}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Students</p>
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Current Courses</h4>
              <div className="overflow-x-auto">
                <table className="w-full compact-table">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-900 dark:text-white">Course</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-900 dark:text-white">Code</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-900 dark:text-white">Level</th>
                      <th className="text-left py-2 px-3 text-xs font-medium text-gray-900 dark:text-white">Students</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.currentCourses.map((course, index) => (
                      <tr key={index} className="border-b border-gray-100 dark:border-gray-700">
                        <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{course.name}</td>
                        <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{course.code}</td>
                        <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{course.level}</td>
                        <td className="py-2 px-3 text-sm text-gray-900 dark:text-white">{course.students}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );

      case 'performance':
        return (
          <div className="tight-spacing">
            <div className="grid grid-cols-1 md:grid-cols-4 compact-grid mb-4">
              <StatCard
                title="Student Rating"
                value={`${profileData.studentFeedbackScore}/5.0`}
                icon={Star}
                color="yellow"
              />
              <StatCard
                title="Attendance Rate"
                value={`${profileData.attendanceRate}%`}
                icon={CheckCircle}
                color="green"
              />
              <StatCard
                title="Syllabus Completion"
                value={`${profileData.syllabusCompletion}%`}
                icon={BookOpen}
                color="blue"
              />
              <StatCard
                title="Marking Timeliness"
                value={`${profileData.markingTimeliness}%`}
                icon={Clock}
                color="purple"
              />
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Pass Rates by Course</h4>
              <div className="tight-spacing">
                {profileData.passRates.map((rate, index) => (
                  <div key={index} className="flex items-center justify-between minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{rate.course}</span>
                    <span className="text-sm font-bold text-green-600">{rate.rate}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'research':
        return (
          <div className="tight-spacing">
            <div className="grid grid-cols-1 md:grid-cols-4 compact-grid mb-4">
              <StatCard
                title="Publications"
                value={profileData.publicationsCount}
                icon={FileText}
                color="blue"
              />
              <StatCard
                title="Grants Secured"
                value={profileData.grantsSecured}
                icon={Award}
                color="green"
              />
              <StatCard
                title="Students Supervised"
                value={profileData.studentsSupervised}
                icon={Users}
                color="purple"
              />
              <StatCard
                title="Ongoing Projects"
                value={profileData.ongoingProjects.length}
                icon={Activity}
                color="yellow"
              />
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Recent Publications</h4>
              <div className="tight-spacing">
                {profileData.recentPublications.map((pub, index) => (
                  <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{pub.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{pub.type} • {new Date(pub.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Ongoing Projects</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.ongoingProjects.map((project, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs rounded">
                    {project}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contributions':
        return (
          <div className="tight-spacing">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Committees</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.committees.map((committee, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 text-xs rounded">
                    {committee}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Administrative Roles</h4>
              <div className="tight-spacing">
                {profileData.administrativeRoles.map((role, index) => (
                  <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{role}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Events Organized</h4>
              <div className="tight-spacing">
                {profileData.eventsOrganized.map((event, index) => (
                  <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{event}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'development':
        return (
          <div className="tight-spacing">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Professional Courses</h4>
              <div className="tight-spacing">
                {profileData.professionalCourses.map((course, index) => (
                  <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{course}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Certifications</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.certifications.map((cert, index) => (
                  <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs rounded">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Conferences Attended</h4>
              <div className="flex flex-wrap gap-2">
                {profileData.conferencesAttended.map((conf, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 text-xs rounded">
                    {conf}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'engagement':
        return (
          <div className="tight-spacing">
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Office Hours</h4>
              <div className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{profileData.officeHours}</p>
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">Mentoring Roles</h4>
              <div className="tight-spacing">
                {profileData.mentoringRoles.map((role, index) => (
                  <div key={index} className="minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{role}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="compact-subheader text-gray-900 dark:text-white mb-3">System Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 compact-grid">
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Account Status:</span>
                  <p className="font-medium text-green-600">{profileData.accountStatus}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Access Level:</span>
                  <p className="font-medium">{profileData.accessLevel}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Last Login:</span>
                  <p className="font-medium">{profileData.lastLogin}</p>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Profile Updated:</span>
                  <p className="font-medium">{profileData.profileLastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {isAdmin ? 'Admin Profile' : isStaff ? 'Staff Profile' : 'User Profile'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {isAdmin ? 'System administrator profile and access management' : 
             isStaff ? 'Comprehensive staff information and performance metrics' : 
             'Manage your personal information and preferences'}
          </p>
        </div>
        {!isAdmin && (
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 bg-primary-600 text-white px-3 py-2 rounded text-sm hover:bg-primary-700 transition-colors"
          >
            <Edit className="h-4 w-4" />
            <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
          </button>
        )}
      </div>

      {/* Profile Overview */}
      <Card>
        <div className="grid grid-cols-1 lg:grid-cols-4 compact-grid">
          {/* Profile Picture and Basic Info */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                {currentProfileData.name.split(' ').map(n => n.charAt(0)).join('')}
              </div>
              {isEditing && (
                <button className="absolute bottom-0 right-0 p-1 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-gray-200 dark:border-gray-600">
                  <Camera className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
              )}
            </div>
            <h3 className="compact-header text-gray-900 dark:text-white">{currentProfileData.name}</h3>
            <p className="text-xs text-gray-600 dark:text-gray-400 capitalize">{user?.role}</p>
            <p className="text-xs text-primary-600 dark:text-primary-400">
              {isAdmin ? adminProfileData.department : profileData.department}
            </p>
          </div>

          {/* Quick Stats for Admin */}
          {isAdmin && (
            <>
              <StatCard
                title="Reports Created"
                value={adminProfileData.reportsCreated}
                icon={FileText}
                color="blue"
              />
              <StatCard
                title="Users Managed"
                value={adminProfileData.usersManaged}
                icon={Users}
                color="green"
              />
              <StatCard
                title="System Alerts"
                value={adminProfileData.alertsHandled}
                icon={AlertCircle}
                color="yellow"
              />
            </>
          )}

          {/* Quick Stats for Staff */}
          {isStaff && (
            <>
              <StatCard
                title="Student Rating"
                value={`${profileData.studentFeedbackScore}/5.0`}
                icon={Star}
                color="yellow"
              />
              <StatCard
                title="Courses Teaching"
                value={profileData.currentCourses.length}
                icon={BookOpen}
                color="blue"
              />
              <StatCard
                title="Publications"
                value={profileData.publicationsCount}
                icon={FileText}
                color="green"
              />
            </>
          )}

          {/* Student Stats */}
          {user?.role === 'student' && userData && (
            <>
              <StatCard
                title="Current GPA"
                value={userData.gpa.toFixed(2)}
                icon={TrendingUp}
                color="green"
              />
              <StatCard
                title="Courses Enrolled"
                value={userData.courses.length}
                icon={BookOpen}
                color="blue"
              />
              <StatCard
                title="Current Level"
                value={userData.level}
                icon={Award}
                color="purple"
              />
            </>
          )}
        </div>

        {isEditing && !isAdmin && (
          <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleCancel}
              className="flex items-center space-x-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </button>
            <button
              onClick={handleSave}
              className="flex items-center space-x-1 px-3 py-2 text-sm bg-primary-600 text-white rounded hover:bg-primary-700"
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </Card>

      {/* Detailed Information Tabs (Staff and Admin) */}
      {(isStaff || isAdmin) && (
        <>
          {/* Tab Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-4">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <Card title={tabs.find(tab => tab.id === activeTab)?.label}>
            {isAdmin ? renderAdminTabContent() : renderStaffTabContent()}
          </Card>
        </>
      )}

      {/* Bio and Emergency Contact (All Users) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
        <Card title="About">
          {isEditing && !isAdmin ? (
            <textarea
              value={currentProfileData.bio}
              onChange={(e) => setCurrentProfileData({...currentProfileData, bio: e.target.value})}
              rows={4}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400">{currentProfileData.bio}</p>
          )}
        </Card>

        <Card title="Emergency Contact">
          <div className="tight-spacing">
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Name:</span>
              {isEditing && !isAdmin ? (
                <input
                  type="text"
                  value={currentProfileData.emergencyContact.name}
                  onChange={(e) => setCurrentProfileData({
                    ...currentProfileData, 
                    emergencyContact: {...currentProfileData.emergencyContact, name: e.target.value}
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white mt-1"
                />
              ) : (
                <p className="font-medium">{currentProfileData.emergencyContact.name}</p>
              )}
            </div>
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Relationship:</span>
              {isEditing && !isAdmin ? (
                <input
                  type="text"
                  value={currentProfileData.emergencyContact.relationship}
                  onChange={(e) => setCurrentProfileData({
                    ...currentProfileData, 
                    emergencyContact: {...currentProfileData.emergencyContact, relationship: e.target.value}
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white mt-1"
                />
              ) : (
                <p className="font-medium">{currentProfileData.emergencyContact.relationship}</p>
              )}
            </div>
            <div className="text-sm">
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              {isEditing && !isAdmin ? (
                <input
                  type="tel"
                  value={currentProfileData.emergencyContact.phone}
                  onChange={(e) => setCurrentProfileData({
                    ...currentProfileData, 
                    emergencyContact: {...currentProfileData.emergencyContact, phone: e.target.value}
                  })}
                  className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white mt-1"
                />
              ) : (
                <p className="font-medium">{currentProfileData.emergencyContact.phone}</p>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Interests */}
      <Card title="Interests & Skills">
        {isEditing && !isAdmin ? (
          <div>
            <input
              type="text"
              placeholder="Add interests separated by commas"
              value={currentProfileData.interests.join(', ')}
              onChange={(e) => setCurrentProfileData({
                ...currentProfileData, 
                interests: e.target.value.split(',').map(i => i.trim())
              })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {currentProfileData.interests.map((interest, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-800 dark:text-primary-400 text-xs rounded-full"
              >
                {interest}
              </span>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Profile;