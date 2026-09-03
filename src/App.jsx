import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Ecosystem from './components/Ecosystem';
import JournalSpotlight from './components/JournalSpotlight';
import PropManagementSpotlight from './components/PropManagementSpotlight';
import ThemesSpotlight from './components/ThemesSpotlight';
import EducationSpotlight from './components/EducationSpotlight';
import Footer from './components/Footer';
import SupportWidget from './components/SupportWidget';
import ErrorBoundary from './components/ErrorBoundary';
import AuthPage from './pages/AuthPage';
import EcosystemPortal from './pages/EcosystemPortal';
import ThemesPage from './pages/ThemesPage';

const LandingPage = () => (
  <div className="min-h-screen bg-navy-950 selection:bg-emerald/30 scroll-smooth">
    <Navbar />
    <main>
      <Hero />
      <Ecosystem />
      <JournalSpotlight />
      <ThemesSpotlight />
      <PropManagementSpotlight />
      <EducationSpotlight />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <Routes>
        {/* Main Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Auth & Registration Routes */}
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth?mode=signup" replace />} />

        {/* Ecosystem Hub Portal Route */}
        <Route path="/ecosystem" element={<EcosystemPortal />} />
        <Route path="/portal" element={<Navigate to="/ecosystem" replace />} />
        <Route path="/hub" element={<Navigate to="/ecosystem" replace />} />

        {/* Themes Storefront Route */}
        <Route path="/themes" element={<ThemesPage />} />

        {/* Internal Routing Shortcuts */}
        <Route path="/journal" element={<Navigate to="/ecosystem" replace />} />
        <Route path="/education" element={<Navigate to="/#education" replace />} />
        <Route path="/advisory" element={<Navigate to="/ecosystem" replace />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Persistent Floating Support/Contact Widget across all pages */}
      <SupportWidget />
    </ErrorBoundary>
  );
}

export default App;
