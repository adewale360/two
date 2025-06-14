import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Lecturers from './pages/Lecturers';
import Reports from './pages/Reports';
import FacultyPage from './pages/FacultyPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'faculty':
        return <FacultyPage />;
      case 'staff':
        return <Lecturers />;
      case 'students':
        return <Students />;
      case 'reports':
        return <Reports />;
      case 'profile':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Profile management features coming soon</p>
          </div>
        );
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
          {renderPage()}
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;