import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Students from './pages/Students';
import Lecturers from './pages/Lecturers';
import Reports from './pages/Reports';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/faculty" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">Faculty Management</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Faculty administration features coming soon</p></div>} />
              <Route path="/staff" element={<Lecturers />} />
              <Route path="/students" element={<Students />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/profile" element={<div className="text-center py-12"><h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Profile</h2><p className="text-gray-600 dark:text-gray-400 mt-2">Profile management features coming soon</p></div>} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;