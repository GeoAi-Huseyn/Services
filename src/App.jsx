import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import SiteIntro from './components/Intro/SiteIntro';
import { useScrollAnimation } from './hooks/useScrollAnimation';

import Footer from './components/Footer/Footer';
import BackToTop from './components/UI/BackToTop';

function AnimatedRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/service/:slug" element={<ServiceDetail />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/recent-work" element={<ProjectsPage />} />
      <Route path="/project/:slug" element={<ProjectDetailPage />} />
      <Route path="/project-detail" element={<ProjectDetailPage />} />
    </Routes>
  );
}

export default function App() {
  // Activate smooth 60fps intersection observer scroll animations
  useScrollAnimation();

  const [showIntro, setShowIntro] = useState(() => {
    try {
      return !sessionStorage.getItem('homepulse_intro_seen');
    } catch (e) {
      return false;
    }
  });

  const [introRevealed, setIntroRevealed] = useState(() => {
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
    <>
      {showIntro && (
        <SiteIntro
          onFinish={handleIntroFinish}
          onClosing={handleIntroClosing}
        />
      )}
      <BrowserRouter>
        <div
          className="site-wrapper"
          style={{
            opacity: introRevealed ? 1 : 0,
            visibility: introRevealed ? 'visible' : 'hidden',
            transition: 'opacity 0.35s ease',
          }}
        >
          <main id="primary" className="site-main">
            <AnimatedRoutes />
          </main>
          <Footer />
          <BackToTop />
        </div>
      </BrowserRouter>
    </>
  );
}
