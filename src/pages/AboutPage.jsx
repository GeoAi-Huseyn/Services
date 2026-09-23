import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    {
      id: 1,
      icon: <WrenchIcon size={26} />,
      number: '25,000+',
      title: 'Repairs Completed',
    },
    {
      id: 2,
      icon: <MedalIcon size={26} />,
      number: '98.9%',
      title: 'Customer Satisfaction',
    },
    {
      id: 3,
      icon: <CertificateIcon size={26} />,
      number: '50+',
      title: 'Certified Technicians',
    },
    {
      id: 4,
      icon: <ClockIcon size={26} />,
      number: 'Same-Day',
      title: 'Rapid Response',
    },
  ];

  const values = [
    {
      id: 1,
      icon: <ShieldCheckIcon size={28} />,
      title: 'Upfront Honest Pricing',
      desc: 'Transparent flat-rate quotes provided prior to work commencing. Never any hidden fees or surprise diagnostic add-ons.',
    },
    {
      id: 2,
      icon: <CheckBadgeIcon size={28} />,
      title: 'OEM Factory Parts',
      desc: 'We install only genuine manufacturer replacement parts backed by comprehensive manufacturer reliability guarantees.',
    },
    {
      id: 3,
      icon: <BoltIcon size={28} />,
      title: 'Fast Same-Day Dispatch',
      desc: 'Mobile repair vans stocked with 90% of frequently needed components for one-trip turnaround and minimal household disruption.',
    },
    {
      id: 4,
      icon: <CertificateIcon size={28} />,
      title: '90-Day Ironclad Warranty',
      desc: 'Every service call includes our 90-day parts and labor warranty, giving you total peace of mind in our craftsmanship.',
    },
  ];

  const processSteps = [
    {
      step: '01',
      icon: <MagnifyIcon size={26} />,
      title: 'Smart Diagnostic',
      desc: 'Certified technician performs thorough electrical and mechanical inspection of your appliance.',
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

  return (
    <div className="about-page-wrapper">
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
              <a href="tel:+18005550199" className="ab-phone-pill d-none d-sm-inline-flex">
                <div className="ab-phone-icon-wrap">
                  <PhoneIcon size={14} />
                </div>
                <div className="ab-phone-txt">
                  <small>Dispatch Hotline</small>
                  <strong>(800) 555-0199</strong>
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
                  Dedicated To Restoring Your Home Comfort With Precision & Integrity
                </motion.h1>

                {/* Page Description */}
                <motion.p variants={fadeUpVariants} className="ab-hero-desc">
                  Founded with a customer-first philosophy, HomePulse delivers high-caliber appliance repairs across the region. We combine decades of technical expertise, prompt scheduling, and uncompromising standards to keep your essential household equipment operating at peak performance.
                </motion.p>

                {/* Trust Chips */}
                <motion.div variants={fadeUpVariants} className="ab-trust-row">
                  <span className="ab-trust-chip">
                    <ShieldCheckIcon size={15} /> 100% Licensed & Insured
                  </span>
                  <span className="ab-trust-chip">
                    <CertificateIcon size={15} /> EPA Certified Technicians
                  </span>
                  <span className="ab-trust-chip">
                    <ClockIcon size={15} /> 90-Day Service Guarantee
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
                  <div className="ab-badge-number">15+</div>
                  <div className="ab-badge-label">Years of Excellence</div>
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
                  alt="Certified HomePulse Master Technician"
                  className="ab-story-img"
                />
                <div className="ab-story-floating-badge">
                  <div className="ab-pulse-dot"></div>
                  <div className="ab-floating-badge-text">
                    <strong>Certified Master Technicians</strong>
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
                <span className="ab-section-subtitle">Our Heritage & Mission</span>
                <h2 className="ab-section-title">
                  We Don't Just Fix Appliances — We Restore Peace of Mind
                </h2>
                <p className="ab-story-text">
                  A broken refrigerator, a flooded laundry room, or an oven refusing to heat can bring your household to a standstill. At HomePulse, we understand the frustration appliance malfunctions cause.
                </p>
                <p className="ab-story-text">
                  That’s why we’ve built our company around immediate responsiveness, transparent upfront pricing, and factory-trained specialists who get the job done right on the very first visit. Our technicians are non-commissioned, meaning our diagnosis is always honest, objective, and solely focused on the most cost-effective solution for you.
                </p>

                <ul className="ab-checklist">
                  <li>
                    <span className="ab-check-icon">
                      <CheckIcon size={14} />
                    </span>
                    <span>All major residential & commercial appliance brands supported</span>
                  </li>
                  <li>
                    <span className="ab-check-icon">
                      <CheckIcon size={14} />
                    </span>
                    <span>Strict adherence to manufacturer safety & OEM specifications</span>
                  </li>
                  <li>
                    <span className="ab-check-icon">
                      <CheckIcon size={14} />
                    </span>
                    <span>Fully stocked service vehicles for immediate single-day fixes</span>
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
                  <a href="tel:+18005550199" className="ab-btn-call">
                    <PhoneIcon size={16} /> (800) 555-0199
                  </a>
                  <a
                    href="https://wa.me/18005550199"
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
