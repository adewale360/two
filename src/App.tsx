import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import ReturnToTop from './components/Common/ReturnToTop';
import Home from './pages/Home';
import Students from './pages/Students';
import Lecturers from './pages/Lecturers';
import Reports from './pages/Reports';
import FacultyPage from './pages/FacultyPage';
import Profile from './pages/Profile';
import Feed from './pages/Feed';
import Alumni from './pages/Alumni';

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
      case 'feed':
        return <Feed />;
      case 'alumni':
        return <Alumni />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <ThemeProvider>
      <AuthProvider>
        <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
          {renderPage()}
          <ReturnToTop />
        </Layout>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;