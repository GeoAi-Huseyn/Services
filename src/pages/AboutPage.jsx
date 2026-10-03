import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSiteSettings } from '../context/SiteSettingsContext';
import {
  HomeIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  PhoneIcon,
  WhatsAppIcon,
  BoltIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  CheckIcon,
  CertificateIcon,
  ClockIcon,
  WrenchIcon,
  HeadsetIcon,
  MagnifyIcon,
  MedalIcon,
  StepsIcon,
  ClipboardCheckIcon,
} from '../components/UI/DetailIcons';
import SEOHead, { buildBreadcrumbSchema, buildWebPageSchema } from '../components/SEO/SEOHead';
import './AboutPage.css';

// Physics Spring Motion Configs
const smoothSpring = {
  type: 'spring',
  stiffness: 190,
  damping: 22,
};

const bouncySpring = {
  type: 'spring',
  stiffness: 260,
  damping: 18,
  bounce: 0.45,
};

// Motion Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: bouncySpring,
  },
};

export default function AboutPage() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    {
      id: 1,
      icon: <WrenchIcon size={26} />,
      number: 'Careful Work',
      title: 'Meticulous & Tidy Repairs',
    },
    {
      id: 2,
      icon: <MedalIcon size={26} />,
      number: 'Many Years',
      title: 'Of Dedicated Experience',
    },
    {
      id: 3,
      icon: <CertificateIcon size={26} />,
      number: 'Qualified Team',
      title: 'Experienced Master Techs',
    },
    {
      id: 4,
      icon: <ClockIcon size={26} />,
      number: 'Dependable',
      title: 'Prompt Scheduling & Care',
    },
  ];

  const values = [
    {
      id: 1,
      icon: <ShieldCheckIcon size={28} />,
      title: 'Honest & Clear Pricing',
      desc: 'Transparent quotes explained upfront before any work begins. No unexpected add-ons or hidden charges.',
    },
    {
      id: 2,
      icon: <CheckBadgeIcon size={28} />,
      title: 'Genuine OEM Parts',
      desc: 'We install authentic manufacturer components built specifically for your appliance to ensure lasting reliability.',
    },
    {
      id: 3,
      icon: <BoltIcon size={28} />,
      title: 'Tidy & Respectful Service',
      desc: 'We protect your floors and counters with clean work mats and runners, leaving your home as clean as we found it.',
    },
    {
      id: 4,
      icon: <CertificateIcon size={28} />,
      title: 'Solid Service Warranty',
      desc: 'Every repair is backed by a dependable warranty on parts and labor, so you can have complete confidence in our work.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      icon: <MagnifyIcon size={26} />,
      title: 'Smart Diagnostic',
      desc: 'Experienced technician performs thorough electrical and mechanical inspection of your appliance.',
    },
    {
      step: '02',
      icon: <ClipboardCheckIcon size={26} />,
      title: 'Fixed Quote',
      desc: 'We present a crystal-clear quote detailing the issue, parts required, and final investment.',
    },
    {
      step: '03',
      icon: <WrenchIcon size={26} />,
      title: 'Precision Repair',
      desc: 'Using specialized calibration tools and OEM components, your equipment is expertly restored.',
    },
    {
      step: '04',
      icon: <CheckBadgeIcon size={26} />,
      title: 'Cycle Testing',
      desc: 'Comprehensive multi-stage testing and safety validation before signing off on complete recovery.',
    },
  ];

  const seoJsonLd = useMemo(() => [
    buildWebPageSchema(
      'About HomePulse — Trusted Appliance Repair Specialists in Massachusetts',
      'Learn about HomePulse Appliance Repair: our mission, values, experienced technicians, and commitment to honest, high-quality home appliance repair across Massachusetts.',
      '/about'
    ),
    buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' }
    ])
  ], []);

  return (
    <div className="about-page-wrapper">
      <SEOHead
        title="About HomePulse — Trusted Appliance Repair Specialists | Massachusetts"
        description="Learn about HomePulse Appliance Repair: our mission, values, experienced technicians, and commitment to honest, high-quality home appliance repair across Massachusetts."
        canonical="/about"
        keywords="about HomePulse, appliance repair company, Massachusetts appliance technicians, trusted repair specialists, home appliance service"
        jsonLd={seoJsonLd}
      />
      {/* Top Strip Navigation Bar */}
      <div className="ab-top-strip">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between">
            <Link to="/" className="ab-brand-link">
              <img
                src="/homepulse_brand_horizontal_white.png"
                alt="HomePulse Appliance Repair"
                className="ab-brand-img"
              />
            </Link>
            <div className="d-flex align-items-center gap-3">
              <Link to="/" className="ab-back-home-btn">
                <ArrowLeftIcon size={14} />
                <span>Back to Home</span>
              </Link>
              <a href={`tel:+${settings.phone_raw}`} className="ab-phone-pill d-none d-sm-inline-flex">
                <div className="ab-phone-icon-wrap">
                  <PhoneIcon size={14} />
                </div>
                <div className="ab-phone-txt">
                  <small>Dispatch Hotline</small>
                  <strong>{settings.phone}</strong>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero / Page Banner Section */}
      <section className="ab-hero-section">
        <div className="ab-hero-bg-shapes"></div>
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                {/* Breadcrumb Navigation */}
                <motion.ul variants={fadeUpVariants} className="ab-breadcrumb-list">
                  <li>
                    <Link to="/">
                      <HomeIcon size={14} className="me-1" /> Home
                    </Link>
                  </li>
                  <li className="separator">
                    <ChevronRightIcon size={12} />
                  </li>
                  <li className="active">About Us</li>
                </motion.ul>

                {/* Subtitle Badge */}
                <motion.div variants={fadeUpVariants}>
                  <div className="ab-subs-badge">
                    <span className="badge-icon">
                      <MedalIcon size={16} />
                    </span>
                    <span className="badge-text">Trusted Local Appliance Specialists</span>
                  </div>
                </motion.div>

                {/* Page Title */}
                <motion.h1 variants={fadeUpVariants} className="ab-hero-title">
                  Dedicated To Restoring Your Home Comfort With Precision & Care
                </motion.h1>

                {/* Page Description */}
                <motion.p variants={fadeUpVariants} className="ab-hero-desc">
                  Built on a simple commitment to doing things right, HomePulse provides dependable, high-quality appliance repair across Massachusetts. For many years, we have focused on honest diagnostics, clean and careful workmanship, and respectful customer service that local homeowners can count on.
                </motion.p>

                {/* Trust Chips */}
                <motion.div variants={fadeUpVariants} className="ab-trust-row">
                  <span className="ab-trust-chip">
                    <ShieldCheckIcon size={15} /> Fully Licensed & Insured
                  </span>
                  <span className="ab-trust-chip">
                    <WrenchIcon size={15} /> Skilled Technicians
                  </span>
                  <span className="ab-trust-chip">
                    <ClockIcon size={15} /> Dependable Service Warranty
                  </span>
                </motion.div>
              </motion.div>
            </div>

            <div className="col-lg-4 d-none d-lg-block">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={scaleInVariants}
              >
                <div className="ab-hero-badge-circle">
                  <div className="ab-badge-icon">
                    <MedalIcon size={46} />
                  </div>
                  <div className="ab-badge-number">Many Years</div>
                  <div className="ab-badge-label">Of Dedicated Service</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Stats Bar */}
      <section className="ab-stats-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="row g-4"
          >
            {stats.map((stat) => (
              <motion.div key={stat.id} variants={fadeUpVariants} className="col-lg-3 col-sm-6">
                <div className="ab-stat-card">
                  <div className="ab-stat-icon">{stat.icon}</div>
                  <div className="ab-stat-content">
                    <h3>{stat.number}</h3>
                    <p>{stat.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Company Story & Mission */}
      <section className="ab-story-section">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={smoothSpring}
                className="ab-story-img-wrapper"
              >
                <img
                  src="/assets/images/about-repairman.jpg"
                  alt="HomePulse Master Technician"
                  className="ab-story-img"
                />
                <div className="ab-story-floating-badge">
                  <div className="ab-pulse-dot"></div>
                  <div className="ab-floating-badge-text">
                    <strong>Experienced Master Technicians</strong>
                    <span>Full Diagnostic & Repair Fleet</span>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="col-lg-6">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={smoothSpring}
              >
                <span className="ab-section-subtitle">Our Approach & Commitment</span>
                <h2 className="ab-section-title">
                  We Take Pride in Doing Honest, High-Quality Work
                </h2>
                <p className="ab-story-text">
                  A broken refrigerator, a leaking washer, or an oven refusing to heat brings your daily routine to an abrupt halt. At HomePulse, our mission is simple: solve the problem properly, without shortcuts, rush jobs, or unnecessary sales pressure.
                </p>
                <p className="ab-story-text">
                  For many years, we have approached every single service call with the same mindset: do clean, honest, and meticulous work. Our technicians take the time to accurately diagnose the root cause, explain your repair options clearly, and install proper manufacturer parts so your equipment runs smoothly for the long term. We treat your home with care, protect your living space with clean mats, and make sure everything is tested thoroughly before we leave.
                </p>

                <ul className="ab-checklist">
                  <li>
                    <span className="ab-check-icon">
                      <CheckIcon size={14} />
                    </span>
                    <span>Comprehensive repair for all major kitchen and laundry appliances</span>
                  </li>
                  <li>
                    <span className="ab-check-icon">
                      <CheckIcon size={14} />
                    </span>
                    <span>Strict adherence to manufacturer safety and installation procedures</span>
                  </li>
                  <li>
                    <span className="ab-check-icon">
                      <CheckIcon size={14} />
                    </span>
                    <span>Fully equipped service vans for prompt, one-trip solutions</span>
                  </li>
                </ul>

                <a href="#contact-now" className="ab-btn-call">
                  <HeadsetIcon size={16} /> Schedule an Evaluation
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="ab-values-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="ab-section-subtitle">Our Core Commitments</span>
            <h2 className="ab-section-title">The Principles Guiding Every Service Call</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="row g-4"
          >
            {values.map((item) => (
              <motion.div key={item.id} variants={fadeUpVariants} className="col-lg-3 col-md-6">
                <div className="ab-value-card">
                  <div className="ab-value-icon-box">{item.icon}</div>
                  <h3 className="ab-value-title">{item.title}</h3>
                  <p className="ab-value-desc">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 4-Step Repair Roadmap */}
      <section className="ab-process-section">
        <div className="container">
          <div className="text-center mb-5">
            <span className="ab-section-subtitle">How We Work</span>
            <h2 className="ab-section-title">A Frictionless 4-Step Diagnostic & Repair Path</h2>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
            className="row g-4"
          >
            {processSteps.map((step) => (
              <motion.div key={step.step} variants={fadeUpVariants} className="col-lg-3 col-sm-6">
                <div className="ab-step-card">
                  <span className="ab-step-badge">STEP {step.step}</span>
                  <div className="ab-step-icon">{step.icon}</div>
                  <h3 className="ab-step-title">{step.title}</h3>
                  <p className="ab-step-desc">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="ab-cta-section" id="contact-now">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={smoothSpring}
            className="ab-cta-box"
          >
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <h2 className="ab-cta-title">Need Immediate Appliance Service?</h2>
                <p className="ab-cta-desc">
                  Our dispatchers are standing by. Get in touch right now for same-day service availability and transparent quotes.
                </p>
              </div>
              <div className="col-lg-5">
                <div className="ab-cta-buttons">
                  <a href={`tel:+${settings.phone_raw}`} className="ab-btn-call">
                    <PhoneIcon size={16} /> {settings.phone}
                  </a>
                  <a
                    href={settings.whatsapp_link}
                    target="_blank"
                    rel="noreferrer"
                    className="ab-btn-whatsapp"
                  >
                    <WhatsAppIcon size={18} /> WhatsApp Chat
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
