import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import './Hero.css';

const HERO_SLIDES = [
  {
    id: 1,
    image: '/assets/images/hero-tech-subzero.png',
    alt: 'Master technician diagnosing a Sub-Zero refrigerator in luxury kitchen',
  },
  {
    id: 2,
    image: '/assets/images/hero-tech-oven.png',
    alt: 'Master technician servicing a built-in luxury Wolf wall oven',
  },
  {
    id: 3,
    image: '/assets/images/hero-tech-dishwasher.png',
    alt: 'Skilled specialist technician servicing a premium built-in Miele dishwasher',
  },
];

export default function Hero() {
  const { settings } = useSiteSettings();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(null);

  // Background auto-changer: changes continuously every 6.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((current) => {
        setPrevSlide(current);
        return (current + 1) % HERO_SLIDES.length;
      });
    }, 6500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="dynamic-hero-section" id="hero">
        {/* Dynamic Changing Background Slides */}
        <div className="hero-bg-container">
          {HERO_SLIDES.map((slide, index) => {
            const isActive = index === currentSlide;
            const isPrev = index === prevSlide;
            return (
              <div
                key={slide.id}
                className={`hero-bg-slide ${isActive ? 'active' : ''} ${isPrev ? 'prev' : ''}`}
              >
                <img
                  src={slide.image}
                  alt={slide.alt}
                  loading={index === 0 ? 'eager' : 'lazy'}
                />
              </div>
            );
          })}

          {/* Ambient Overlays & Depth Gradients */}
          <div className="hero-overlay-dark"></div>
          <div className="hero-overlay-gradient-v"></div>
          <div className="hero-overlay-gradient-h"></div>
          <div className="hero-overlay-radial"></div>

          {/* Atmospheric Floating Aurora Light Blobs */}
          <div className="hero-aurora-orb hero-aurora-1"></div>
          <div className="hero-aurora-orb hero-aurora-2"></div>
        </div>

        {/* Hero Foreground Content */}
        <div className="container position-relative" style={{ zIndex: 10 }}>
          <div className="row align-items-center">
            <div className="col-lg-9 col-xl-8">
              <div className="dynamic-hero-content hero-slow-fade hero-delay-1">
                {/* Trust Badge */}
                <div className="hero-trust-pill">
                  <span className="hero-stars">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01z" />
                      </svg>
                    ))}
                  </span>
                  <span className="hero-trust-divider"></span>
                  <span className="hero-trust-text">
                    Trusted across Greater Boston &amp; All of Massachusetts
                  </span>
                </div>

                {/* Hero Title */}
                <h1 className="dynamic-hero-title">
                  Reliable Appliance Repair in{' '}
                  <span className="hero-gradient-text">Massachusetts</span>
                </h1>

                {/* Description Text */}
                <p className="dynamic-hero-desc">
                  Specialist technicians for every major brand — Sub-Zero, Wolf, Viking, Thermador &amp; Miele included. We text you when we're on the way and back every repair with a 90-day warranty.
                </p>

                {/* CTA Action Buttons */}
                <div className="hero-cta-group">
                  <a href={`tel:+${settings.phone_raw}`} className="hero-btn-call">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span>Call {settings.phone}</span>
                  </a>

                  <a href="#contact" className="hero-btn-secondary">
                    <span>Get a Fast Quote</span>
                    <i className="fa-regular fa-arrow-right"></i>
                  </a>
                </div>

                {/* 4 Feature Badges Grid */}
                <ul className="hero-badges-grid">
                  <li className="hero-badge-item">
                    <span className="hero-badge-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </span>
                    <span>Same-Day Service</span>
                  </li>

                  <li className="hero-badge-item">
                    <span className="hero-badge-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </span>
                    <span>90-Day Warranty</span>
                  </li>

                  <li className="hero-badge-item">
                    <span className="hero-badge-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20.59 13.41 13.42 20.6a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                        <circle cx="7" cy="7" r="1.2" fill="currentColor" />
                      </svg>
                    </span>
                    <span>Upfront, Honest Pricing</span>
                  </li>

                  <li className="hero-badge-item">
                    <span className="hero-badge-icon">
                      <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.83 2.83 0 0 1-4-4l9-9z" />
                      </svg>
                    </span>
                    <span>Specialist Technicians</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Arrival Notification Card (Bottom Right on Desktop) */}
        <div className="hero-arrival-badge">
          <div className="hero-arrival-icon">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div>
            <div className="hero-arrival-title">We text before we arrive</div>
            <div className="hero-arrival-sub">On-time service, every visit</div>
          </div>
        </div>

        {/* Mouse Scroll Indicator */}
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-mouse">
            <div className="hero-scroll-wheel"></div>
          </div>
        </div>
      </section>
    </>
  );
}
