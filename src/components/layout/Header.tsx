import React from 'react';
import { Sun, Moon, Bell, Search, User } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';

export function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <GlassCard variant="dark" className="p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search students, lecturers, courses..."
              className="pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-80 text-white placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-colors text-white">
            <Bell size={20} />
          </button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="p-3 text-white hover:bg-white/10"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </Button>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-medium">
            <User size={20} />
          </div>
        </div>
      </div>
    </GlassCard>
  );
}