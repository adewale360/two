import React, { useState } from 'react';
import { Eye, EyeOff, School, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Demo login logic - bypass actual authentication for demo
    if (formData.email && formData.password) {
      // Simulate successful login
      navigate('/');
    } else {
      setError('Please enter both email and password');
    }

    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDemoLogin = (role: string) => {
    setFormData({
      email: `${role}@pineappl.edu`,
      password: 'demo123',
      rememberMe: false
    });
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url('/abd66116-4073-484f-b913-ac373540ad02.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Blurred Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      
      {/* Sign In Card */}
      <div className="relative z-10 w-full max-w-sm">
        <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-gray-700/50">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center mb-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                <School className="h-6 w-6 text-white" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-white mb-1">Pineappl</h1>
            <p className="text-gray-300 text-xs">University Performance Dashboard</p>
          </div>

          {/* Tab Navigation */}
          <div className="flex mb-4">
            <button className="flex-1 py-2 px-3 text-center text-white bg-emerald-600 rounded-l-lg font-medium text-sm">
              SIGN IN
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="flex-1 py-2 px-3 text-center text-gray-400 bg-gray-700 rounded-r-lg font-medium hover:text-white transition-colors text-sm"
            >
              SIGN UP
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-3 p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-xs">
              {error}
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm backdrop-blur-sm"
                required
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2.5 bg-white/10 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent pr-10 text-sm backdrop-blur-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-3 h-3 text-emerald-600 bg-gray-700 border-gray-600 rounded focus:ring-emerald-500"
              />
              <label htmlFor="rememberMe" className="ml-2 text-xs text-gray-300">
                Stay signed in
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>SIGN IN</span>
                  <ArrowRight className="h-3 w-3" />
                </>
              )}
            </button>
          </form>

          {/* Forgot Password */}
          <div className="text-center mt-4">
            <button className="text-gray-400 hover:text-white text-xs transition-colors">
              Forgot Password?
            </button>
          </div>

          {/* Demo Accounts */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-400 text-xs text-center mb-2">Quick Demo Login:</p>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleDemoLogin('admin')}
                className="px-2 py-1 bg-yellow-600/20 text-yellow-300 rounded text-xs hover:bg-yellow-600/30 transition-colors"
              >
                Admin
              </button>
              <button
                onClick={() => handleDemoLogin('lecturer')}
                className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs hover:bg-blue-600/30 transition-colors"
              >
                Lecturer
              </button>
              <button
                onClick={() => handleDemoLogin('student')}
                className="px-2 py-1 bg-green-600/20 text-green-300 rounded text-xs hover:bg-green-600/30 transition-colors"
              >
                Student
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;