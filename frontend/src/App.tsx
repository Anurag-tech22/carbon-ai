import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Calculator = lazy(() => import('./pages/Calculator'));
const Recommendations = lazy(() => import('./pages/Recommendations'));
const Simulator = lazy(() => import('./pages/Simulator'));
const Challenges = lazy(() => import('./pages/Challenges'));
const Coach = lazy(() => import('./pages/Coach'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const Offsets = lazy(() => import('./pages/Offsets'));

const PageLoader = () => (
  <div className="flex items-center justify-center h-full min-h-[400px]">
    <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// Wrapper for individual animated pages
const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes key={location.pathname}>
        {/* Public Routes */}
        <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
        <Route path="/register" element={<Suspense fallback={<PageLoader />}><Register /></Suspense>} />
        
        {/* Protected Routes wrapped in Layout */}
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout><Suspense fallback={<PageLoader />}><OutletComponent /></Suspense></Layout>}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
            <Route path="/calculator" element={<PageWrapper><Calculator /></PageWrapper>} />
            <Route path="/recommendations" element={<PageWrapper><Recommendations /></PageWrapper>} />
            <Route path="/simulator" element={<PageWrapper><Simulator /></PageWrapper>} />
            <Route path="/challenges" element={<PageWrapper><Challenges /></PageWrapper>} />
            <Route path="/leaderboard" element={<PageWrapper><Leaderboard /></PageWrapper>} />
            <Route path="/offsets" element={<PageWrapper><Offsets /></PageWrapper>} />
            <Route path="/coach" element={<PageWrapper><Coach /></PageWrapper>} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

// Helper component to render children inside Layout
import { Outlet } from 'react-router-dom';
const OutletComponent = () => <Outlet />;

function App() {
  return (
    <AuthProvider>
      <Router>
        <ErrorBoundary>
          <AnimatedRoutes />
        </ErrorBoundary>
      </Router>
    </AuthProvider>
  );
}

export default App;
