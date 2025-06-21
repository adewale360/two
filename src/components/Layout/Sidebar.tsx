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
        fixed top-0 left-0 h-full bg-white dark:bg-dark-surface border-r border-gray-200 dark:border-dark-border
        transform transition-transform duration-300 ease-in-out z-50
        w-64 lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <School className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Pineappl
            </span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-gray-200 dark:border-dark-border">
          <div className="flex items-center space-x-3">
            <Avatar 
              name={user?.name || 'Demo User'} 
              type={user?.role === 'student' ? 'student' : user?.role === 'lecturer' ? 'lecturer' : 'admin'} 
              size="md" 
            />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-dark-text">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-dark-muted capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`
                w-full flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200
                ${currentPage === item.id
                  ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 border-r-2 border-blue-600' 
                  : 'text-gray-700 dark:text-dark-muted hover:bg-gray-50 dark:hover:bg-dark-card hover:text-gray-900 dark:hover:text-white'
                }
              `}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-dark-border">
          <div className="text-xs text-gray-500 text-center">
            © 2024 Pineappl Platform
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;