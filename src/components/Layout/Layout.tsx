import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg relative">
      {/* Beautiful wallpaper background */}
      <div 
        className="fixed inset-0 opacity-30 dark:opacity-20 pointer-events-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Feature _ _ _ Type _ Pendant Light _ _ _ Lacey _….jpeg')`,
          filter: 'blur(1px)'
        }}
      />
      
      {/* Subtle overlay for better readability */}
      <div className="fixed inset-0 bg-white/80 dark:bg-dark-bg/90 pointer-events-none" />
      
      {/* Floating gradients for modern effect */}
      <div className="fixed inset-0 opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-transparent rounded-full blur-2xl animate-pulse-slow" />
      </div>
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={toggleSidebar}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      
      {/* Main content area */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">
        <Header onMenuToggle={toggleSidebar} />
        
        <main className="flex-1 p-3 sm:p-4">
          <div className="max-w-7xl mx-auto">
            <div className="animate-fade-in">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;