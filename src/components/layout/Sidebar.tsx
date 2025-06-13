import React from 'react';
import { Home, Users, BookOpen, Trophy, BarChart3, Settings, Menu, X, GraduationCap } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'faculty', label: 'Faculty', icon: BookOpen },
  { id: 'staff', label: 'Staff & Lecturers', icon: Users },
  { id: 'leaderboards', label: 'Leaderboards', icon: Trophy },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings }
];

export function Sidebar({ currentPage, onPageChange, isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-full p-4">
          <GlassCard variant="dark" className="h-full p-6">
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="mb-8 pt-8 lg:pt-0">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      UniTrack
                    </h1>
                  </div>
                </div>
                <p className="text-sm text-gray-400 ml-13">
                  Performance Dashboard
                </p>
              </div>

              {/* Navigation */}
              <nav className="flex-1">
                <ul className="space-y-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = currentPage === item.id;
                    
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => {
                            onPageChange(item.id);
                            onToggle();
                          }}
                          className={`
                            w-full flex items-center space-x-3 px-4 py-3 rounded-xl
                            transition-all duration-200 group
                            ${isActive
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30 shadow-lg'
                              : 'text-gray-300 hover:bg-white/10 hover:text-white'
                            }
                          `}
                        >
                          <IconComponent size={20} className={isActive ? 'text-purple-400' : 'group-hover:text-purple-400'} />
                          <span className="font-medium">{item.label}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* Footer */}
              <div className="mt-auto pt-6">
                <div className="text-xs text-gray-500 text-center">
                  © 2024 UniTrack Platform
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
}