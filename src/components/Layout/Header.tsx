import React from 'react';
import { Menu, Sun, Moon, Bell, Settings } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { theme, toggleTheme } = useTheme();
  const { user, switchRole } = useAuth();

  return (
    <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-4 sm:px-6 py-4 flex-shrink-0 shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-slate-400" />
          </button>
          
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-slate-100">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-slate-400 hidden sm:block">
              Welcome back, {user?.name}
            </p>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Role switcher for demo */}
          <select
            value={user?.role}
            onChange={(e) => switchRole(e.target.value as any)}
            className="modern-select text-sm"
          >
            <option value="admin">Admin</option>
            <option value="lecturer">Lecturer</option>
            <option value="student">Student</option>
          </select>

          {/* Notifications */}
          <button className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors relative">
            <Bell className="h-5 w-5 text-gray-600 dark:text-slate-400" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-gray-600 dark:text-slate-400" />
            ) : (
              <Sun className="h-5 w-5 text-gray-600 dark:text-slate-400" />
            )}
          </button>

          {/* Settings */}
          <button className="hidden sm:block p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
            <Settings className="h-5 w-5 text-gray-600 dark:text-slate-400" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;