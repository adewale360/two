import React from 'react';
import { 
  Home, 
  Users, 
  GraduationCap, 
  BookOpen, 
  BarChart3, 
  User,
  X,
  School,
  Rss,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../Common/Avatar';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentPage, onPageChange }) => {
  const { user } = useAuth();

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'faculty', icon: School, label: 'Faculty' },
    { id: 'staff', icon: Users, label: 'Staff' },
    { id: 'students', icon: GraduationCap, label: 'Students' },
    { id: 'feed', icon: Rss, label: 'Feed' },
    { id: 'alumni', icon: UserCheck, label: 'Alumni' },
    { id: 'reports', icon: BarChart3, label: 'Reports' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    if (window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full modern-sidebar
        transform transition-transform duration-300 ease-in-out z-50
        w-64 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <School className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-slate-100">
              Pineappl
            </span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* User info */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <Avatar 
              name={user?.name || 'Demo User'} 
              type={user?.role === 'student' ? 'student' : user?.role === 'lecturer' ? 'lecturer' : 'admin'} 
              size="md" 
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-slate-100">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-slate-400 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto modern-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`nav-item w-full ${
                currentPage === item.id ? 'active' : 'inactive'
              }`}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;