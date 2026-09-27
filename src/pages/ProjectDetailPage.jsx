import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  ClockIcon,
  MedalIcon,
  ClipboardCheckIcon,
} from '../components/UI/DetailIcons';
import SEOHead, { buildBreadcrumbSchema } from '../components/SEO/SEOHead';
import './ProjectDetailPage.css';

const smoothSpring = {
  type: 'spring',
  stiffness: 190,
  damping: 22,
};

export default function ProjectDetailPage() {
  const { settings } = useSiteSettings();
  const { slug } = useParams();
  const navigate = useNavigate();

  // Find project by slug or id (fallback to first project if not found)
  const project = projectsData.find((p) => p.slug === slug || String(p.id) === slug) || projectsData[0];

  // Gallery Active Index
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Lightbox Modal state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActivePhotoIndex(0);
  }, [slug]);

  // Handle lightbox keyboard controls
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxIndex]);

  const galleryList = project.gallery || [
    {
      id: 1,
      src: project.heroImage,
      title: project.title,
      stage: 'Repair Overview',
      desc: project.problemSummary,
    },
  ];

  const currentPhoto = galleryList[activePhotoIndex] || galleryList[0];

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handlePrevPhoto = () => {
    setLightboxIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setLightboxIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
  };

  // Other related projects
  const relatedProjects = projectsData
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  const seoJsonLd = useMemo(() => [
    buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Recent Work', url: '/projects' },
      { name: project.title, url: `/project/${project.slug || project.id}` }
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": project.title,
      "description": project.problemSummary || project.title,
      "image": project.heroImage ? `https://homepulserepair.com${project.heroImage}` : undefined,
      "author": {
        "@type": "Organization",
        "name": "HomePulse Appliance Repair"
      }
    }
  ], [project]);

  return (
    <div className="pjd-page-wrapper">
      <SEOHead
        title={`${project.title} | HomePulse Appliance Repair`}
        description={project.problemSummary || `Detailed case study of ${project.title} by HomePulse certified technicians in Massachusetts.`}
        canonical={`/project/${project.slug || project.id}`}
        ogImage={project.heroImage}
        ogType="article"
        keywords={`${project.title}, appliance repair case study, ${project.category || ''} repair, Massachusetts`}
        jsonLd={seoJsonLd}
      />
      {/* Top Brand & Navigation Bar */}
      <div className="pjd-top-bar">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="pjd-brand-link">
              <img
                src="/homepulse_brand_horizontal_white.png"
                alt="HomePulse Appliance Repair"
                className="pjd-brand-img"
              />
            </Link>
            <div className="d-flex align-items-center gap-3">
              <Link to="/projects" className="pjd-back-btn">
                <ArrowLeftIcon size={14} />
                <span>All Recent Work</span>
              </Link>
              <a href={`tel:+${settings.phone_raw || '18005550199'}`} className="pjd-phone-pill d-none d-sm-inline-flex">
                <div className="pjd-phone-icon">
                  <PhoneIcon size={14} />
                </div>
                <div className="pjd-phone-txt">
                  <small>Direct Dispatch</small>
                  <strong>{settings.phone || '(800) 555-0199'}</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Header Section */}
      <section className="pjd-hero-section">
        <div className="pjd-hero-glow"></div>
        <div className="container position-relative">
          {/* Breadcrumbs */}
          <ul className="pjd-breadcrumbs">
            <li>
              <Link to="/">
                <HomeIcon size={14} className="me-1" /> Home
              </Link>
            </li>
            <li className="sep">
              <ChevronRightIcon size={12} />
            </li>
            <li>
              <Link to="/projects">Recent Work</Link>
            </li>
            <li className="sep">
              <ChevronRightIcon size={12} />
            </li>
            <li className="active">{project.categoryLabel}</li>
          </ul>

          <div className="row align-items-end justify-content-between">
            <div className="col-lg-8">
              <div className="pjd-badge-row">
                <span className="pjd-cat-badge">
                  <WrenchIcon size={13} /> {project.categoryLabel}
                </span>
                <span className="pjd-model-badge">
                  <i className="fa-solid fa-microchip me-1"></i> {project.brandModel}
                </span>
                <span className="pjd-status-badge">
                  <CheckBadgeIcon size={13} /> 100% Fixed & Verified
                </span>
              </div>

              <h1 className="pjd-title">{project.title}</h1>

              <div className="pjd-meta-strip">
                <div className="pjd-meta-chip">
                  <i className="fa-regular fa-calendar me-1"></i>
                  <span>{project.date}</span>
                </div>
                <div className="pjd-meta-chip">
                  <i className="fa-regular fa-location-dot me-1"></i>
                  <span>{project.location}</span>
                </div>
                <div className="pjd-meta-chip">
                  <i className="fa-solid fa-stopwatch me-1"></i>
                  <span>Duration: {project.duration}</span>
                </div>
                <div className="pjd-meta-chip highlight">
                  <i className="fa-solid fa-shield-halved me-1"></i>
                  <span>{project.warranty}</span>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-lg-end mt-4 mt-lg-0">
              <div className="pjd-quick-cta">
                <span className="label">Need a similar repair?</span>
                <a href={`tel:+${settings.phone_raw || '18005550199'}`} className="pjd-quick-call-btn">
                  <PhoneIcon size={16} />
                  <span>Call Master Technician</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="pjd-content-section">
        <div className="container">
          <div className="row g-4">
            {/* Left Main Column: Real Photos Gallery Showcase & Case Study */}
            <div className="col-lg-8">
              {/* ==========================================================
                 REAL REPAIR PHOTOS GALLERY SHOWCASE (PRIMARY USER FOCUS)
                 ========================================================== */}
              <div className="pjd-gallery-card">
                <div className="pjd-card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
                  <div>
                    <h2 className="pjd-section-heading">
                      <i className="fa-solid fa-camera-retro me-2 text-primary"></i>
                      Real Repair Photo Documentation
                    </h2>
                    <p className="pjd-section-sub">
                      Actual on-site diagnostic, disassembly, and component replacement photos taken during this service call.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="pjd-fullscreen-btn"
                    onClick={() => handleOpenLightbox(activePhotoIndex)}
                  >
                    <i className="fa-solid fa-expand me-1"></i>
                    <span>Fullscreen Gallery ({galleryList.length})</span>
                  </button>
                </div>

                {/* Primary Featured Photo Viewer */}
                <div className="pjd-main-viewer">
                  <div className="pjd-main-img-wrap" onClick={() => handleOpenLightbox(activePhotoIndex)}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentPhoto.id}
                        src={currentPhoto.src}
                        alt={currentPhoto.title}
                        className="pjd-main-img"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>

                    {/* Stage Pill Overlay */}
                    <div className="pjd-viewer-stage-pill">
                      <span className="pulse-dot"></span>
                      <span>{currentPhoto.stage}</span>
                    </div>

                    {/* Zoom icon tooltip */}
                    <div className="pjd-viewer-zoom-hint">
                      <i className="fa-solid fa-magnifying-glass-plus"></i>
                      <span>Click to Enlarge</span>
                    </div>

                    {/* Prev / Next Quick Nav On Image */}
                    {galleryList.length > 1 && (
                      <>
                        <button
                          type="button"
                          className="pjd-nav-arrow left"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex((prev) => (prev === 0 ? galleryList.length - 1 : prev - 1));
                          }}
                          aria-label="Previous photo"
                        >
                          <ArrowLeftIcon size={16} />
                        </button>
                        <button
                          type="button"
                          className="pjd-nav-arrow right"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex((prev) => (prev === galleryList.length - 1 ? 0 : prev + 1));
                          }}
                          aria-label="Next photo"
                        >
                          <ArrowRightIcon size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Active Photo Caption & Technical Explanation */}
                  <div className="pjd-main-caption">
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <h4 className="pjd-caption-title">{currentPhoto.title}</h4>
                      <span className="pjd-caption-counter">
                        Photo {activePhotoIndex + 1} of {galleryList.length}
                      </span>
                    </div>
                    <p className="pjd-caption-desc">{currentPhoto.desc}</p>
                  </div>
                </div>

                {/* Thumbnails Filmstrip Strip */}
                <div className="pjd-thumbs-strip">
                  {galleryList.map((photo, idx) => (
                    <button
                      type="button"
                      key={photo.id}
                      className={`pjd-thumb-btn ${activePhotoIndex === idx ? 'active' : ''}`}
                      onClick={() => setActivePhotoIndex(idx)}
                    >
                      <img src={photo.src} alt={photo.title} />
                      <span className="pjd-thumb-stage-tag">{photo.stage.split(':')[0]}</span>
                    </button>
                  ))}
                </div>
              </div>



              {/* ==========================================================
                 DETAILED DIAGNOSTIC & PROCEDURAL REPORT
                 ========================================================== */}
              <div className="pjd-card">
                <div className="pjd-card-header">
                  <h3 className="pjd-section-heading">
                    <i className="fa-solid fa-clipboard-list-check me-2 text-primary"></i>
                    Diagnostic & Engineering Case Summary
                  </h3>
                </div>

                <div className="pjd-case-content">
                  <div className="pjd-case-block">
                    <div className="block-icon alert-icon">
                      <i className="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div>
                      <h4 className="block-title">Reported Symptom & Initial Complaint</h4>
                      <p>{project.problemSummary}</p>
                    </div>
                  </div>

                  <div className="pjd-case-block">
                    <div className="block-icon search-icon">
                      <i className="fa-solid fa-stethoscope"></i>
                    </div>
                    <div>
                      <h4 className="block-title">Root Cause Identified via Precision Diagnostic</h4>
                      <p>{project.diagnosticDetails}</p>
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Procedure Timeline */}
                <div className="pjd-timeline-block mt-4">
                  <h4 className="pjd-subheading mb-3">
                    <i className="fa-solid fa-list-check me-2 text-primary"></i>
                    Execution Workflow & Precision Installation Steps
                  </h4>
                  <div className="pjd-timeline">
                    {project.solutionSteps.map((stepItem, index) => (
                      <div className="pjd-timeline-step" key={index}>
                        <div className="step-badge">{stepItem.step}</div>
                        <div className="step-content">
                          <h5>{stepItem.title}</h5>
                          <p>{stepItem.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Customer Verified Review Card */}
              {project.customerReview && (
                <div className="pjd-card pjd-review-card">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div className="pjd-avatar-circle">
                        {project.customerReview.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="review-author mb-0">{project.customerReview.name}</h4>
                        <small className="review-meta text-muted">
                          {project.customerReview.location} • {project.customerReview.date}
                        </small>
                      </div>
                    </div>
                    <div className="pjd-stars">
                      {[...Array(5)].map((_, i) => (
                        <i className="fa-solid fa-star" key={i}></i>
                      ))}
                    </div>
                  </div>
                  <p className="review-quote">
                    "{project.customerReview.comment}"
                  </p>
                  <div className="review-verified-tag">
                    <CheckBadgeIcon size={14} /> Verified Homeowner Repair Service
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar: Tech Specs, Qualifications & Booking */}
            <div className="col-lg-4">
              {/* Technical Job Specifications Box */}
              <div className="pjd-sidebar-box">
                <div className="sidebar-box-header">
                  <i className="fa-solid fa-sliders text-primary me-2"></i>
                  <h4>Job Technical Specifications</h4>
                </div>
                <div className="pjd-specs-list">
                  {project.specs.map((item, idx) => (
                    <div className="pjd-spec-row" key={idx}>
                      <span className="spec-label">{item.label}</span>
                      <span className="spec-val">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Master Technician Card */}
              <div className="pjd-sidebar-box pjd-tech-box">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="tech-avatar-box">
                    <i className="fa-solid fa-user-gear"></i>
                  </div>
                  <div>
                    <span className="tech-role">Master Lead Specialist</span>
                    <h5 className="tech-name mb-0">{project.technician.split('(')[0]}</h5>
                    <small className="text-muted">{project.technician.includes('(') ? project.technician.split('(')[1].replace(')', '') : 'Master Appliance Tech'}</small>
                  </div>
                </div>
                <ul className="tech-skills-list">
                  <li><i className="fa-solid fa-check text-success me-2"></i> EPA Universal Compliant</li>
                  <li><i className="fa-solid fa-check text-success me-2"></i> Factory OEM Precision Procedures</li>
                  <li><i className="fa-solid fa-check text-success me-2"></i> Background-Checked & Insured</li>
                </ul>
              </div>

              {/* Direct Urgent Booking Action Card */}
              <div className="pjd-sidebar-box pjd-booking-card">
                <div className="booking-badge">FASTEST DISPATCH</div>
                <h3>Have a Faulty {project.categoryLabel}?</h3>
                <p>
                  We have experienced technicians in your neighborhood with mobile vans stocked with 90% of frequently needed OEM parts.
                </p>
                <div className="d-grid gap-2">
                  <a href={`tel:+${settings.phone_raw || '18005550199'}`} className="pjd-btn-primary">
                    <PhoneIcon size={16} />
                    <span>Call {settings.phone || '(800) 555-0199'}</span>
                  </a>
                  <a href={`https://wa.me/${settings.whatsapp_number || '18005550199'}`} target="_blank" rel="noreferrer" className="pjd-btn-whatsapp">
                    <WhatsAppIcon size={18} />
                    <span>Message on WhatsApp</span>
                  </a>
                </div>
                <div className="booking-perks">
                  <span><i className="fa-solid fa-shield-check me-1"></i> 90-Day Warranty</span>
                  <span><i className="fa-solid fa-clock me-1"></i> Same-Day Arrival</span>
                </div>
              </div>

              {/* Share / Back Link */}
              <div className="pjd-sidebar-box text-center">
                <Link to="/projects" className="pjd-view-all-sidebar-btn">
                  <i className="fa-solid fa-arrow-left me-2"></i>
                  <span>Browse More Recent Repairs</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Recent Repairs Carousel/Grid */}
          {relatedProjects.length > 0 && (
            <div className="pjd-related-section mt-5 pt-4">
              <div className="d-flex align-items-center justify-content-between mb-4 flex-wrap gap-2">
                <div>
                  <h3 className="related-title">Explore Related Appliance Repairs</h3>
                  <p className="related-sub text-muted">More proven case studies completed by our master technician team.</p>
                </div>
                <Link to="/projects" className="btn btn-outline-primary btn-sm rounded-pill px-3">
                  View All ({projectsData.length}) <ArrowRightIcon size={12} className="ms-1" />
                </Link>
              </div>

              <div className="row g-4">
                {relatedProjects.map((rel) => (
                  <div className="col-lg-4 col-md-6" key={rel.id}>
                    <div className="pjd-rel-card">
                      <div className="pjd-rel-thumb">
                        <Link to={`/project/${rel.slug}`}>
                          <img src={rel.heroImage} alt={rel.title} />
                        </Link>
                        <span className="pjd-rel-badge">{rel.categoryLabel}</span>
                        <span className="pjd-rel-photos-badge">
                          <i className="fa-solid fa-camera me-1"></i> {rel.gallery?.length || 4} Photos
                        </span>
                      </div>
                      <div className="pjd-rel-body">
                        <h4 className="pjd-rel-title">
                          <Link to={`/project/${rel.slug}`}>{rel.shortTitle || rel.title}</Link>
                        </h4>
                        <p className="pjd-rel-desc">{rel.problemSummary}</p>
                        <Link to={`/project/${rel.slug}`} className="pjd-rel-link">
                          <span>View Real Photos & Case Study</span>
                          <ArrowRightIcon size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ==========================================================
         INTERACTIVE FULLSCREEN LIGHTBOX MODAL
         ========================================================== */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            className="pjd-lightbox-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <div className="pjd-lightbox-container" onClick={(e) => e.stopPropagation()}>
              {/* Top Controls Bar */}
              <div className="pjd-lightbox-topbar">
                <div className="pjd-lb-info">
                  <span className="pjd-lb-counter">
                    {lightboxIndex + 1} / {galleryList.length}
                  </span>
                  <span className="pjd-lb-stage">
                    {galleryList[lightboxIndex].stage}
                  </span>
                </div>
                <button
                  type="button"
                  className="pjd-lb-close-btn"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close Lightbox"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Main Lightbox Image View */}
              <div className="pjd-lightbox-body">
                <button
                  type="button"
                  className="pjd-lb-arrow left"
                  onClick={handlePrevPhoto}
                  aria-label="Previous"
                >
                  <ArrowLeftIcon size={24} />
                </button>

                <div className="pjd-lb-image-wrapper">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={lightboxIndex}
                      src={galleryList[lightboxIndex].src}
                      alt={galleryList[lightboxIndex].title}
                      className="pjd-lb-img"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.25 }}
                    />
                  </AnimatePresence>
                </div>

                <button
                  type="button"
                  className="pjd-lb-arrow right"
                  onClick={handleNextPhoto}
                  aria-label="Next"
                >
                  <ArrowRightIcon size={24} />
                </button>
              </div>

              {/* Bottom Lightbox Caption Strip */}
              <div className="pjd-lightbox-footer">
                <h5>{galleryList[lightboxIndex].title}</h5>
                <p>{galleryList[lightboxIndex].desc}</p>
                <div className="pjd-lb-strip">
                  {galleryList.map((thumb, tIdx) => (
                    <button
                      type="button"
                      key={thumb.id}
                      className={`pjd-lb-thumb-btn ${lightboxIndex === tIdx ? 'active' : ''}`}
                      onClick={() => setLightboxIndex(tIdx)}
                    >
                      <img src={thumb.src} alt={thumb.title} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
