import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AdminPanel from './pages/Admin/AdminPanel';
import SiteIntro from './components/Intro/SiteIntro';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { SiteSettingsProvider } from './context/SiteSettingsContext';

import Footer from './components/Footer/Footer';
import BackToTop from './components/UI/BackToTop';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent({ showIntro, setShowIntro, introRevealed, handleIntroClosing, handleIntroFinish }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && showIntro && (
        <SiteIntro
          onFinish={handleIntroFinish}
          onClosing={handleIntroClosing}
        />
      )}
      <div
        className={isAdmin ? 'admin-root-wrapper' : 'site-wrapper'}
        style={
          isAdmin
            ? { minHeight: '100vh', width: '100%' }
            : {
                opacity: introRevealed ? 1 : 0,
                visibility: introRevealed ? 'visible' : 'hidden',
                transition: 'opacity 0.35s ease',
              }
        }
      >
        <main id="primary" className={isAdmin ? 'admin-main-viewport' : 'site-main'}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/service/:slug" element={<ServiceDetail />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/recent-work" element={<ProjectsPage />} />
            <Route path="/project/:slug" element={<ProjectDetailPage />} />
            <Route path="/project-detail" element={<ProjectDetailPage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/admin/*" element={<AdminPanel />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <BackToTop />}
      </div>
    </>
  );
}

export default function App() {
  // Activate smooth 60fps intersection observer scroll animations
  useScrollAnimation();

  const isInitialAdmin = window.location.pathname.startsWith('/admin');

  const [showIntro, setShowIntro] = useState(() => {
    if (isInitialAdmin) return false;
    try {
      return !sessionStorage.getItem('homepulse_intro_seen');
    } catch (e) {
      return false;
    }
  });

  const [introRevealed, setIntroRevealed] = useState(() => {
    if (isInitialAdmin) return true;
    try {
      return !!sessionStorage.getItem('homepulse_intro_seen');
    } catch (e) {
      return true;
    }
  });

  const handleIntroClosing = () => {
    setIntroRevealed(true);
  };

  const handleIntroFinish = () => {
    try {
      sessionStorage.setItem('homepulse_intro_seen', 'true');
    } catch (e) {}
    setShowIntro(false);
    setIntroRevealed(true);
  };

  return (
    <SiteSettingsProvider>
      <BrowserRouter>
        <AppContent
          showIntro={showIntro}
          setShowIntro={setShowIntro}
          introRevealed={introRevealed}
          handleIntroClosing={handleIntroClosing}
          handleIntroFinish={handleIntroFinish}
        />
      </BrowserRouter>
    </SiteSettingsProvider>
  );
}
