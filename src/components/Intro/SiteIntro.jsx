import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './SiteIntro.css';

// System Diagnostic Calibration Steps
const diagnosticSteps = [
  {
    range: [0, 24],
    title: 'Cooling & Compressor Systems',
    status: 'OPTIMAL [PASS]',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="5" y1="5" x2="19" y2="19" />
        <line x1="19" y1="5" x2="5" y2="19" />
      </svg>
    ),
  },
  {
    range: [25, 49],
    title: 'Washer & Motor Drive Calibration',
    status: 'BALANCED [SYNCED]',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    range: [50, 74],
    title: 'Thermal & Heating Sensors',
    status: 'VERIFIED [READY]',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
      </svg>
    ),
  },
  {
    range: [75, 94],
    title: 'Master Technician Dispatch Fleet',
    status: 'ONLINE [READY]',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    range: [95, 100],
    title: 'HomePulse Service Network',
    status: 'CALIBRATED 100%',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
];

export default function SiteIntro({ onFinish, onClosing }) {
  const [progress, setProgress] = useState(0);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem('homepulse_intro_seen', 'true');
    } catch (e) {}

    // Smooth, balanced progress calibrated for exactly ~2.0s total experience
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Smooth progression across all diagnostic steps (~1.3s)
        const increment = prev > 85 ? 4 : prev > 50 ? 3 : 2;
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 32);

    return () => clearInterval(interval);
  }, []);

  // Handle completion when progress reaches 100%
  useEffect(() => {
    if (progress === 100 && !isClosing) {
      const timer = setTimeout(() => {
        handleFinish();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [progress, isClosing]);

  const handleFinish = () => {
    setIsClosing(true);
    if (onClosing) onClosing();
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 440);
  };

  const currentStep =
    diagnosticSteps.find((s) => progress >= s.range[0] && progress <= s.range[1]) ||
    diagnosticSteps[diagnosticSteps.length - 1];

  return (
    <AnimatePresence>
      {!isClosing ? (
        <motion.div
          key="site-intro-modal"
          className="site-intro-overlay"
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
        >
          {/* Background Elements */}
          <div className="intro-bg-grid" />
          <div className="intro-ambient-glow-blue" />
          <div className="intro-ambient-glow-orange" />

          {/* Skip Intro Button */}
          <button
            type="button"
            className="intro-skip-btn"
            onClick={handleFinish}
            aria-label="Skip website intro"
          >
            <span>Skip Intro</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="13 17 18 12 13 7" />
              <polyline points="6 17 11 12 6 7" />
            </svg>
          </button>

          {/* Central Diagnostic Stage */}
          <div className="intro-central-stage">
            {/* Holographic Radar Scanner */}
            <div className="intro-scanner-wrapper">
              <div className="intro-radar-outer" />
              <div className="intro-radar-middle" />
              <div className="intro-radar-inner" />
              <div className="intro-pulse-wave" />

              {/* Central Core Emblem */}
              <div className="intro-core-icon">
                {currentStep.icon}
              </div>
            </div>

            {/* Brand Title Area */}
            <div className="intro-brand-box">
              <img
                src="/homepulse_brand_horizontal.png"
                alt="HomePulse Appliance Repair"
                className="intro-brand-logo"
              />
              <p className="intro-tagline">Precision Appliance Diagnostic & Master Service</p>
            </div>

            {/* Live Diagnostic Feed Card */}
            <div className="intro-diagnostic-card">
              <div className="intro-status-header">
                <span>SYSTEM SCAN</span>
                <span className="intro-status-live">
                  <span className="intro-status-dot" />
                  LIVE CALIBRATION
                </span>
              </div>
              <div className="intro-current-step">
                <span className="intro-step-icon">{currentStep.icon}</span>
                <span>
                  {currentStep.title} &bull; <strong style={{ color: '#10b981' }}>{currentStep.status}</strong>
                </span>
              </div>
            </div>

            {/* Progress Gauge */}
            <div className="intro-progress-container">
              <div className="intro-progress-bar-bg">
                <div
                  className="intro-progress-bar-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="intro-progress-info">
                <span>CALIBRATING SENSORS</span>
                <span className="intro-percent-counter">{String(progress).padStart(2, '0')}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        /* Shutter Exit Wipe */
        <div key="intro-curtains" style={{ position: 'fixed', inset: 0, zIndex: 99999999, pointerEvents: 'none' }}>
          <motion.div
            className="intro-curtain-top"
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.44, ease: [0.77, 0, 0.175, 1] }}
          />
          <motion.div
            className="intro-curtain-bottom"
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.44, ease: [0.77, 0, 0.175, 1] }}
          />
        </div>
      )}
    </AnimatePresence>
  );
}
