import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { projectsData } from '../data/projectsData';
import {
  HomeIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PhoneIcon,
  WhatsAppIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  WrenchIcon,
  MedalIcon,
  ClockIcon,
  GridIcon,
} from '../components/UI/DetailIcons';
import SEOHead, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/SEO/SEOHead';
import './ProjectsPage.css';

const smoothSpring = {
  type: 'spring',
  stiffness: 190,
  damping: 22,
};

const filterCategories = [
  { key: 'all', label: 'All Repairs' },
  { key: 'refrigerator', label: 'Refrigerators & Freezers' },
  { key: 'washer', label: 'Washers & Dryers' },
  { key: 'dishwasher', label: 'Dishwashers' },
  { key: 'oven', label: 'Ovens & Ranges' },
];

export default function ProjectsPage() {
  const { settings } = useSiteSettings();
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProjects = activeCategory === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === activeCategory);

  const seoJsonLd = useMemo(() => [
    buildWebPageSchema(
      'Recent Repair Projects — HomePulse Appliance Repair Portfolio',
      'Browse our completed appliance repair projects featuring refrigerators, washers, dryers, dishwashers, ovens, and more across Massachusetts.',
      '/projects'
    ),
    buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Recent Work', url: '/projects' }
    ])
  ], []);

  return (
    <div className="pj-page-wrapper">
      <SEOHead
        title="Recent Repair Projects | HomePulse Appliance Repair Portfolio"
        description="Browse our completed appliance repair projects: Sub-Zero, Miele, Bosch, Wolf & more. See real before-and-after results from certified HomePulse technicians in Massachusetts."
        canonical="/projects"
        keywords="appliance repair projects, repair portfolio, Sub-Zero repair, Miele repair, Bosch repair, Wolf repair, Massachusetts appliance service"
        jsonLd={seoJsonLd}
      />
      {/* Top Navigation Brand Bar */}
      <div className="pj-top-bar">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="pj-brand-link">
              <img
                src="/homepulse_brand_horizontal_white.png"
                alt="HomePulse Appliance Repair"
                className="pj-brand-img"
              />
            </Link>
            <div className="d-flex align-items-center gap-3">
              <Link to="/" className="pj-back-home-btn">
                <ArrowLeftIcon size={14} />
                <span>Back to Home</span>
              </Link>
              <a href={`tel:+${settings.phone_raw || '18005550199'}`} className="pj-phone-pill d-none d-sm-inline-flex">
                <div className="pj-phone-icon-wrap">
                  <PhoneIcon size={14} />
                </div>
                <div className="pj-phone-txt">
                  <small>Dispatch Hotline</small>
                  <strong>{settings.phone || '(800) 555-0199'}</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <section className="pj-hero-section">
        <div className="pj-hero-bg-shapes"></div>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={smoothSpring}
              >
                {/* Breadcrumbs */}
                <ul className="pj-breadcrumb-list">
                  <li>
                    <Link to="/">
                      <HomeIcon size={14} className="me-1" /> Home
                    </Link>
                  </li>
                  <li className="separator">
                    <ChevronRightIcon size={12} />
                  </li>
                  <li className="active">Recent Work</li>
                </ul>

                {/* Badge */}
                <div className="pj-subs-badge">
                  <span className="badge-icon">
                    <WrenchIcon size={16} />
                  </span>
                  <span className="badge-text">Real Jobs • Real Results • OEM Factory Parts</span>
                </div>

                {/* Hero Title */}
                <h1 className="pj-hero-title">
                  Proven Craftsmanship in Appliance Repair & Restoration
                </h1>

                {/* Hero Description */}
                <p className="pj-hero-desc">
                  Browse our portfolio of completed residential and commercial appliance repairs. Explore high-resolution case studies with before/after photos, diagnostic data, and precision OEM component replacements.
                </p>

                {/* Trust Chips */}
                <div className="pj-trust-row">
                  <span className="pj-trust-chip">
                    <ShieldCheckIcon size={15} /> 1,500+ Verified Repairs
                  </span>
                  <span className="pj-trust-chip">
                    <CheckBadgeIcon size={15} /> 100% Genuine OEM Parts
                  </span>
                  <span className="pj-trust-chip">
                    <ClockIcon size={15} /> 90-Day Ironclad Warranty
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-4 d-none d-lg-block text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="pj-hero-stat-card"
              >
                <div className="stat-icon-circle">
                  <MedalIcon size={34} />
                </div>
                <div className="stat-number">99.4%</div>
                <div className="stat-label">First-Trip Diagnostic & Repair Success</div>
                <div className="stat-divider"></div>
                <div className="d-flex justify-content-around text-center mt-2">
                  <div>
                    <strong>25k+</strong>
                    <small className="d-block text-muted">Households</small>
                  </div>
                  <div>
                    <strong>50+</strong>
                    <small className="d-block text-muted">Master Techs</small>
                  </div>
                  <div>
                    <strong>5.0 ★</strong>
                    <small className="d-block text-muted">Google Rating</small>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Filters & Project Cards Grid */}
      <section className="pj-content-section">
        <div className="container">
          {/* Category Filter Pills */}
          <div className="pj-filter-bar">
            <div className="pj-filter-scroll">
              {filterCategories.map((cat) => {
                const count = cat.key === 'all'
                  ? projectsData.length
                  : projectsData.filter((p) => p.category === cat.key).length;
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    className={`pj-filter-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    <span>{cat.label}</span>
                    <span className="count-tag">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div layout className="row g-4 pj-grid">
            <AnimatePresence>
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.06 }}
                  className="col-lg-4 col-md-6"
                  key={project.id}
                >
                  <div className="pj-card">
                    {/* Card Media Preview */}
                    <div className="pj-card-thumb">
                      <Link to={`/project/${project.slug}`}>
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="pj-thumb-img"
                        />
                      </Link>
                      <div className="pj-thumb-overlay"></div>
                      
                      {/* Photo Count Badge */}
                      <div className="pj-photo-count-badge">
                        <i className="fa-solid fa-camera me-1"></i>
                        <span>{project.gallery?.length || 4} Real Photos</span>
                      </div>

                      {/* Category Tag */}
                      <span className="pj-category-pill">
                        {project.categoryLabel}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="pj-card-body">
                      <div className="pj-card-meta">
                        <span className="pj-meta-item">
                          <i className="fa-regular fa-calendar me-1"></i>
                          {project.date}
                        </span>
                        <span className="pj-meta-item">
                          <i className="fa-regular fa-location-dot me-1"></i>
                          {project.location}
                        </span>
                      </div>

                      <h3 className="pj-card-title">
                        <Link to={`/project/${project.slug}`}>{project.shortTitle || project.title}</Link>
                      </h3>

                      <p className="pj-card-desc">
                        {project.problemSummary}
                      </p>

                      {/* Specs Highlights */}
                      <div className="pj-card-chips">
                        <span className="pj-spec-chip">
                          <i className="fa-solid fa-stopwatch me-1"></i> {project.duration}
                        </span>
                        <span className="pj-spec-chip">
                          <i className="fa-solid fa-shield-halved me-1"></i> 1-Year Warranty
                        </span>
                      </div>

                      <div className="pj-card-footer">
                        <Link to={`/project/${project.slug}`} className="pj-detail-action-btn">
                          <span>View Case Study & Photos</span>
                          <div className="btn-arrow-wrap">
                            <ArrowRightIcon size={14} />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Trust & Guarantee Strip */}
      <section className="pj-guarantee-section">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-3 col-6">
              <div className="pj-feature-box">
                <div className="feature-icon">
                  <i className="fa-solid fa-wrench"></i>
                </div>
                <h4>OEM Genuine Parts</h4>
                <p>Factory-direct components for maximum longevity.</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="pj-feature-box">
                <div className="feature-icon">
                  <i className="fa-solid fa-user-gear"></i>
                </div>
                <h4>Experienced Master Techs</h4>
                <p>Vetted, highly skilled and background-checked pros.</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="pj-feature-box">
                <div className="feature-icon">
                  <i className="fa-solid fa-shield-check"></i>
                </div>
                <h4>12-Month Guarantee</h4>
                <p>Full warranty covering parts and labor.</p>
              </div>
            </div>
            <div className="col-md-3 col-6">
              <div className="pj-feature-box">
                <div className="feature-icon">
                  <i className="fa-solid fa-bolt-lightning"></i>
                </div>
                <h4>Same-Day Service</h4>
                <p>Urgent repair slots dispatched across the city.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Booking Call To Action */}
      <section className="pj-cta-section">
        <div className="container">
          <div className="pj-cta-banner">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <span className="pj-cta-pill">Emergency & Scheduled Appliance Repairs</span>
                <h2 className="pj-cta-title">
                  Experiencing Similar Appliance Problems at Home?
                </h2>
                <p className="pj-cta-desc">
                  Don't let a faulty appliance disrupt your household routine. Our fully equipped mobile repair vans carry 90% of genuine OEM parts for fast, single-visit restoration.
                </p>
              </div>
              <div className="col-lg-4 text-lg-end text-center mt-lg-0 mt-4">
                <div className="d-flex flex-column flex-sm-row justify-content-lg-end justify-content-center gap-3">
                  <a href={`tel:+${settings.phone_raw || '18005550199'}`} className="pj-cta-phone-btn">
                    <PhoneIcon size={16} />
                    <span>Call {settings.phone || '(800) 555-0199'}</span>
                  </a>
                  <a href={`https://wa.me/${settings.whatsapp_number || '18005550199'}`} target="_blank" rel="noreferrer" className="pj-cta-wa-btn">
                    <WhatsAppIcon size={18} />
                    <span>WhatsApp Chat</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
