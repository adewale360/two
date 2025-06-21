import React from 'react';
import { Menu, Sun, Moon, Bell, Settings, Search, Mail } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Avatar from '../Common/Avatar';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, switchRole } = useAuth();

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
      <div className="flex items-center justify-between w-full">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search task"
              className="pl-10 pr-4 py-2 w-80 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <kbd className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
              ⌘F
            </kbd>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Role switcher for demo */}
          <select
            value={user?.role}
            onChange={(e) => switchRole(e.target.value as any)}
            className="hidden sm:block px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="admin">Admin</option>
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
          </select>

          {/* Mail */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Notifications */}
          <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            )}
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <Avatar 
              name={user?.name || 'Demo User'} 
              type={user?.role === 'student' ? 'student' : user?.role === 'lecturer' ? 'lecturer' : 'admin'} 
              size="md" 
            />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;