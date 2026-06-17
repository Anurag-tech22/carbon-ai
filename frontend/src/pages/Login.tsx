import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Invalid credentials');
      }

      const data = await response.json();
      login(data.access_token, username);
      navigate('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Login failed');
      } else {
        setError('Login failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 p-4 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-500 rounded-full mix-blend-screen filter blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-primary-500/10 rounded-2xl flex items-center justify-center mb-4 border border-primary-500/20">
            <Leaf size={32} className="text-primary-500" />
          </div>
          <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to track your carbon footprint</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center text-red-400 text-sm">
            <AlertCircle size={16} className="mr-2 flex-shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User size={18} className="text-gray-500" />
              </div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-950 border border-gray-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-xl text-white outline-none transition-all"
                placeholder="Enter your username"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1.5 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-500" />
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-gray-950 border border-gray-800 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 rounded-xl text-white outline-none transition-all"
                placeholder="Enter your password"
              />
            </div>
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-bold transition-colors flex items-center justify-center mt-2 disabled:opacity-50"
          >
            {isLoading ? 'Authenticating...' : <>Sign In <ArrowRight size={18} className="ml-2" /></>}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium transition-colors">
            Create one now
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
