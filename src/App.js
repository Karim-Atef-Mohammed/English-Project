import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Components
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SurveyPage from './pages/SurveyPage';
import ThankYouPage from './pages/ThankYouPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import NotFound from './pages/NotFound';

// Context and Auth
import { useAuth } from './hooks/useAuth';

function App() {
  const [loading, setLoading] = useState(true);
  const { initializing } = useAuth();

  useEffect(() => {
    // Simulate loading assets
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  if (loading || initializing) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Layout>
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/survey" element={<SurveyPage />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/admin-login" element={<AdminLoginPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </Router>
  );
}

export default App;