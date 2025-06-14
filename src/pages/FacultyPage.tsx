import React, { useState } from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, MapPin, Award, School, Mail, Phone } from 'lucide-react';
import Card from '../components/Common/Card';
import StatCard from '../components/Common/StatCard';
import CustomBarChart from '../components/Charts/BarChart';
import DonutChart from '../components/Charts/DonutChart';
import { mockStudents, mockLecturers, mockFaculties } from '../data/mockData';

const FacultyPage: React.FC = () => {
  const [selectedFaculty, setSelectedFaculty] = useState('COPAS');

  const currentFaculty = mockFaculties.find(f => f.name === selectedFaculty) || mockFaculties[0];
  const facultyStudents = mockStudents.filter(s => s.faculty === selectedFaculty);
  const facultyLecturers = mockLecturers.filter(l => l.faculty === selectedFaculty);

  const departmentData = currentFaculty.departments.map(dept => ({
    name: dept.length > 15 ? dept.substring(0, 15) + '...' : dept,
    value: facultyStudents.filter(s => s.department === dept).length
  }));

  const levelDistribution = [
    { name: 'Level 100', value: facultyStudents.filter(s => s.level === '100').length, fill: '#3B82F6' },
    { name: 'Level 200', value: facultyStudents.filter(s => s.level === '200').length, fill: '#10B981' },
    { name: 'Level 300', value: facultyStudents.filter(s => s.level === '300').length, fill: '#F59E0B' },
    { name: 'Level 400', value: facultyStudents.filter(s => s.level === '400').length, fill: '#EF4444' }
  ];

  const averageGPA = facultyStudents.length > 0 
    ? (facultyStudents.reduce((sum, s) => sum + s.gpa, 0) / facultyStudents.length).toFixed(2)
    : '0.00';

  const averageRating = facultyLecturers.length > 0
    ? (facultyLecturers.reduce((sum, l) => sum + l.rating, 0) / facultyLecturers.length).toFixed(1)
    : '0.0';

  return (
    <div className="compact-spacing">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Faculty Overview
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Comprehensive view of faculty performance and statistics
          </p>
        </div>

        <select
          value={selectedFaculty}
          onChange={(e) => setSelectedFaculty(e.target.value)}
          className="px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500"
        >
          {mockFaculties.map(faculty => (
            <option key={faculty.name} value={faculty.name}>{faculty.name}</option>
          ))}
        </select>
      </div>

      {/* Faculty Details */}
      <Card title={`${currentFaculty.name} - ${currentFaculty.fullName}`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 compact-grid">
          <div className="lg:col-span-2">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              {currentFaculty.description}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 compact-grid">
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-primary-600">{currentFaculty.departments.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Departments</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-green-600">{facultyStudents.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Students</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-blue-600">{facultyLecturers.length}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Lecturers</p>
              </div>
              <div className="text-center minimal-padding bg-gray-50 dark:bg-gray-700 rounded">
                <p className="text-lg font-bold text-yellow-600">{averageGPA}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Avg GPA</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 minimal-padding rounded">
            <h4 className="compact-subheader text-gray-900 dark:text-white mb-2">Dean Information</h4>
            <div className="tight-spacing">
              <div className="flex items-center text-xs">
                <Users className="h-3 w-3 mr-1 text-gray-500" />
                <span className="font-medium">{currentFaculty.dean.name}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Mail className="h-3 w-3 mr-1" />
                <span>{currentFaculty.dean.email}</span>
              </div>
              <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                <Phone className="h-3 w-3 mr-1" />
                <span>{currentFaculty.dean.phone}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 compact-grid">
        <CustomBarChart 
          data={departmentData}
          dataKey="value"
          xAxisKey="name"
          title="Student Distribution by Department"
          color="#3b82f6"
        />
        <DonutChart 
          data={levelDistribution}
          title="Student Level Distribution"
        />
      </div>

      {/* Departments Grid */}
      <Card title="Departments">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 compact-grid">
          {currentFaculty.departments.map((department, index) => {
            const deptStudents = facultyStudents.filter(s => s.department === department);
            const deptLecturers = facultyLecturers.filter(l => l.department === department);
            const deptGPA = deptStudents.length > 0
              ? (deptStudents.reduce((sum, s) => sum + s.gpa, 0) / deptStudents.length).toFixed(2)
              : '0.00';

            return (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 minimal-padding rounded">
                <div className="flex items-center mb-2">
                  <GraduationCap className="text-blue-500 mr-2" size={16} />
                  <h3 className="compact-subheader text-gray-900 dark:text-white">
                    {department}
                  </h3>
                </div>
                
                <div className="tight-spacing">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Students</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {deptStudents.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Lecturers</span>
                    <span className="text-xs font-semibold text-gray-900 dark:text-white">
                      {deptLecturers.length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400">Avg. GPA</span>
                    <span className="text-xs font-semibold text-blue-600">
                      {deptGPA}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default FacultyPage;