import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Background3D from '../ui/Background3D';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative">
      <Background3D />
      
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