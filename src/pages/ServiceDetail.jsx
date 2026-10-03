import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import {
  HomeIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  PhoneIcon,
  WhatsAppIcon,
  BoltIcon,
  ShieldCheckIcon,
  CheckBadgeIcon,
  CheckIcon,
  ClockIcon,
  InfoIcon,
  AlertIcon,
  WrenchIcon,
  HeadsetIcon,
  MagnifyIcon,
  MedalIcon,
  ClipboardCheckIcon,
  PlusIcon,
  MinusIcon,
  MapPinIcon,
  ThumbsUpIcon,
} from '../components/UI/DetailIcons';
import ApplianceIcon from '../components/Common/ApplianceIcon';
import { submitServiceRequest, submitInquiry } from '../lib/supabase';
import { serviceOptions, brandOptions, cityOptions } from '../data/formOptions';
import { useSiteSettings } from '../context/SiteSettingsContext';
import './ServiceDetail.css';

// ==========================================================
// PHYSICS-BASED SPRING & ENTRANCE VARIANTS
// ==========================================================
const smoothSpring = {
  type: "spring",
  stiffness: 120,
  damping: 18,
};

const popSpring = {
  type: "spring",
  stiffness: 260,
  damping: 19,
};

const superBouncySpring = {
  type: "spring",
  stiffness: 320,
  damping: 14,
  bounce: 0.55,
};

// Container Stagger
const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Standard Fade Up Item
const fadeUpItemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: smoothSpring,
  },
};

// Scale Pop Item
const scalePopVariants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: popSpring,
  },
};

// Slide in Left
const slideLeftVariants = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...smoothSpring, duration: 0.6 },
  },
};

// Slide in Right
const slideRightVariants = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...smoothSpring, duration: 0.6 },
  },
};

export default function ServiceDetail() {
  const { slug } = useParams();
  const { settings } = useSiteSettings();

  const service = servicesData.find(
    (s) => s.slug === slug || (s.legacySlugs && s.legacySlugs.includes(slug))
  );

  // States
  const [activeSymptomIdx, setActiveSymptomIdx] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const [checkedDiySteps, setCheckedDiySteps] = useState(new Set());
  const [activeRegion, setActiveRegion] = useState('all');
  const [showStickyNav, setShowStickyNav] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState('symptoms');

  // Fast Quote Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: service?.title || 'General Appliance Repair',
    brand: '',
    city: '',
    timePreference: 'Immediate / Emergency',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 3D Tilt & Interactive Showcase State
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50, isHover: false });

  const handleMouseMoveShowcase = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    setTilt({
      x: rotateX,
      y: rotateY,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
      isHover: true,
    });
  };

  const handleMouseLeaveShowcase = () => {
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50, isHover: false });
  };

  // Scroll to top & SEO metadata + JSON-LD injection
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setActiveSymptomIdx(0);
    setOpenFaq(0);
    setCheckedDiySteps(new Set());
    setFormSubmitted(false);

    if (service) {
      setFormData((prev) => ({ ...prev, serviceType: service.title }));
      // 1. Dynamic Page Title
      document.title = service.metaTitle || `${service.title} in Massachusetts | Same-Day Service | HomePulse`;

      // 2. Dynamic Meta Description Tag
      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.setAttribute('name', 'description');
        document.head.appendChild(metaDescTag);
      }
      const metaDesc = service.metaDescription || service.heroDesc || service.desc;
      metaDescTag.setAttribute('content', metaDesc);

      // 2b. Dynamic Canonical URL
      const canonicalUrl = `https://homepulserepair.com/service/${service.slug}`;
      let canonicalTag = document.querySelector('link[rel="canonical"]');
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', canonicalUrl);

      // 2c. Dynamic Open Graph Tags
      const ogTitle = service.metaTitle || `${service.title} | HomePulse`;
      const ogImage = service.image ? `https://homepulserepair.com${service.image}` : 'https://homepulserepair.com/homepulse_brand_horizontal.png';
      const ogTags = {
        'og:title': ogTitle,
        'og:description': metaDesc,
        'og:type': 'website',
        'og:url': canonicalUrl,
        'og:image': ogImage,
        'og:image:alt': service.title,
        'og:site_name': 'HomePulse Appliance Repair',
        'og:locale': 'en_US'
      };
      Object.entries(ogTags).forEach(([prop, content]) => {
        let tag = document.querySelector(`meta[property="${prop}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', prop);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      });

      // 2d. Dynamic Twitter Card Tags
      const twitterTags = {
        'twitter:card': 'summary_large_image',
        'twitter:title': ogTitle,
        'twitter:description': metaDesc,
        'twitter:image': ogImage,
        'twitter:image:alt': service.title
      };
      Object.entries(twitterTags).forEach(([name, content]) => {
        let tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      });

      // 2e. Dynamic Keywords
      let keywordsTag = document.querySelector('meta[name="keywords"]');
      if (!keywordsTag) {
        keywordsTag = document.createElement('meta');
        keywordsTag.setAttribute('name', 'keywords');
        document.head.appendChild(keywordsTag);
      }
      keywordsTag.setAttribute('content', `${service.title}, ${service.title} Massachusetts, ${service.title} Boston, same-day ${service.title.toLowerCase()}, HomePulse, appliance repair`);

      // 3. Dynamic Schema.org JSON-LD Injection
      const scriptId = 'homepulse-service-jsonld';
      let jsonLdScript = document.getElementById(scriptId);
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = scriptId;
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }

      const schemas = [
        {
          "@context": "https://schema.org",
          "@type": "Service",
          "serviceType": service.title,
          "name": service.title,
          "description": service.metaDescription || service.desc,
          "image": ogImage,
          "url": canonicalUrl,
          "provider": {
            "@type": "HomeAndConstructionBusiness",
            "name": "HomePulse Appliance Repair",
            "telephone": settings.phone || "+1 (978) 845-1521",
            "priceRange": "$$",
            "url": "https://homepulserepair.com",
            "areaServed": service.serviceAreas ? service.serviceAreas.map((a) => ({ "@type": "Place", "name": a })) : []
          }
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://homepulserepair.com/"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "Services",
              "item": "https://homepulserepair.com/#services"
            },
            {
              "@type": "ListItem",
              "position": 3,
              "name": service.title,
              "item": canonicalUrl
            }
          ]
        }
      ];

      if (service.diagnosticGuide && service.diagnosticGuide.steps) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": service.diagnosticGuide.title,
          "description": service.diagnosticGuide.subtitle,
          "step": service.diagnosticGuide.steps.map((st, idx) => ({
            "@type": "HowToStep",
            "position": idx + 1,
            "name": st.title,
            "text": st.desc
          }))
        });
      }

      if (service.pricingFaqs && service.pricingFaqs.length > 0) {
        schemas.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": service.pricingFaqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer
            }
          }))
        });
      }

      jsonLdScript.textContent = JSON.stringify(schemas);
    }

    return () => {
      const script = document.getElementById('homepulse-service-jsonld');
      if (script) script.remove();
    };
  }, [slug, service]);

  // Sticky sub-nav scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const heroEl = document.getElementById('service-hero');
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        setShowStickyNav(rect.bottom < 80);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!service) {
    return (
      <div className="sd-not-found-container text-center py-5">
        <h2>Service Not Found</h2>
        <Link to="/" className="tj-primary-btn mt-3">
          <ArrowLeftIcon size={16} className="me-2" />
          Back to Home
        </Link>
      </div>
    );
  }

  const phoneDisplay = settings.phone;
  const phoneHref = `tel:+${settings.phone_raw || ''}`;
  const otherServices = servicesData.filter((s) => s.slug !== service.slug);

  // Toggle DIY checkmark
  const toggleDiyStep = (idx) => {
    const next = new Set(checkedDiySteps);
    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }
    setCheckedDiySteps(next);
  };

  // Scroll to section helper
  const scrollToAnchor = (id) => {
    setActiveNavTab(id);
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitServiceRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        serviceType: formData.serviceType || service?.title || 'General Appliance Repair',
        brand: formData.brand || 'Not Specified',
        city: formData.city || 'Massachusetts',
        message: formData.message,
      });
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `${formData.serviceType || service?.title || 'Repair Request'} - ${formData.city || formData.address || 'MA'}`,
        message: `Address: ${formData.address || 'N/A'}\nCity: ${formData.city || 'N/A'}\nBrand: ${formData.brand || 'N/A'}\nService: ${formData.serviceType || service?.title || 'N/A'}\n\nProblem Details:\n${formData.message}`,
      });
    } catch (err) {
      console.error('Error submitting service request:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  // Pre-fill booking message with selected symptom
  const handleBookSymptom = (symptomTitle) => {
    setFormData((prev) => ({
      ...prev,
      message: `Diagnostic requested for: ${symptomTitle}`,
    }));
    scrollToAnchor('booking');
  };

  // Region filtering for Massachusetts
  const allAreas = service.serviceAreas || [];
  const bostonAreas = allAreas.filter((a) =>
    ['Boston', 'Cambridge', 'Somerville', 'Brookline', 'Newton', 'Quincy', 'Waltham', 'Malden', 'Medford', 'Watertown', 'Belmont', 'Milton', 'Chelsea', 'Revere', 'Everett'].some((c) => a.includes(c))
  );
  const centralAreas = allAreas.filter((a) =>
    ['Worcester', 'Framingham', 'Natick', 'Wellesley', 'Needham', 'Lexington', 'Concord', 'Marlborough', 'Shrewsbury', 'Westborough', 'Sudbury', 'Acton'].some((c) => a.includes(c))
  );
  const coastalAreas = allAreas.filter((a) =>
    ['Salem', 'Peabody', 'Beverly', 'Lynn', 'Woburn', 'Burlington', 'Andover', 'Gloucester', 'Braintree', 'Weymouth', 'Plymouth', 'Hingham', 'Brockton', 'Taunton', 'New Bedford', 'Fall River', 'Attleboro', 'Haverhill', 'Lawrence', 'Barnstable'].some((c) => a.includes(c))
  );
  const westernAreas = allAreas.filter((a) =>
    ['Springfield', 'Chicopee', 'Holyoke', 'Westfield', 'Northampton', 'Amherst', 'Pittsfield', 'Greenfield'].some((c) => a.includes(c))
  );

  const filteredAreas =
    activeRegion === 'boston'
      ? bostonAreas
      : activeRegion === 'central'
      ? centralAreas
      : activeRegion === 'coastal'
      ? coastalAreas
      : activeRegion === 'western'
      ? westernAreas
      : allAreas;

  // Comparison Rows
  const comparisonItems = [
    {
      feature: 'Upfront Pricing Policy',
      homepulse: 'Binding flat-rate quote in writing before any repair starts',
      others: 'Vague hourly rates, hidden trip fees, and surprise bills',
    },
    {
      feature: 'Local Dispatch Speed',
      homepulse: 'Same-day arrival across all MA communities (prompt emergency dispatch)',
      others: '3 to 7 business day waiting period',
    },
    {
      feature: 'Parts Authenticity',
      homepulse: '100% Genuine factory OEM components with serial tracking',
      others: 'Unverified generic aftermarket copies',
    },
    {
      feature: 'Warranty Protection',
      homepulse: 'Complete 90-day parts & technician labor warranty',
      others: 'Limited 14–30 days or no written guarantee',
    },
    {
      feature: 'Technician Qualifications',
      homepulse: 'Experienced master specialists with luxury appliance software',
      others: 'General odd-job handymen without diagnostic tools',
    },
  ];

  // 4-Step Repair Journey
  const roadmapSteps = [
    {
      num: '01',
      title: 'Rapid Dispatch & Arrival',
      desc: 'Book by phone or online. An experienced master technician arrives in a fully stocked mobile diagnostic vehicle.',
      icon: HeadsetIcon,
      time: 'Same-Day'
    },
    {
      num: '02',
      title: 'Digital Diagnostics',
      desc: 'We test electrical circuits, sensor values, and mechanical components using factory multimeters and OEM scan tools.',
      icon: MagnifyIcon,
      time: '15–20 Mins'
    },
    {
      num: '03',
      title: 'OEM Precision Repair',
      desc: 'Following your written price approval, we install genuine factory replacement parts directly on-site.',
      icon: WrenchIcon,
      time: 'On-Site'
    },
    {
      num: '04',
      title: 'Multi-Cycle Quality Check',
      desc: 'We run safety and performance cycles to verify exact factory tolerances, backed by our 90-day warranty.',
      icon: CheckBadgeIcon,
      time: 'Verified'
    },
  ];

  // Current selected symptom object
  const rawProblems = service.problems || [];
  const currentSymptom = rawProblems[activeSymptomIdx] || rawProblems[0] || {};
  const currentSymptomTitle =
    typeof currentSymptom === 'object' ? currentSymptom.title : currentSymptom;
  const currentSymptomDesc =
    typeof currentSymptom === 'object'
      ? currentSymptom.desc
      : 'Our experienced master technician evaluates this issue using specialized OEM meters to pinpoint the root cause on-site.';

  // Severity tags based on index
  const severityTags = [
    { label: 'High Priority', color: 'danger' },
    { label: 'Moderate Risk', color: 'warning' },
    { label: 'Mechanical Wear', color: 'primary' },
    { label: 'Efficiency Loss', color: 'info' },
    { label: 'Safety Check', color: 'warning' },
  ];

  // Checklist progress percentage
  const totalDiy = service.diagnosticGuide?.steps?.length || 5;
  const diyProgress = Math.round((checkedDiySteps.size / totalDiy) * 100);

  return (
    <div className="sd-page-wrapper">
      {/* 1. Header Minimal Strip */}
      <header className="sd-top-strip">
        <div className="sd-unified-container">
          <div className="d-flex align-items-center justify-content-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={smoothSpring}
            >
              <Link to="/" className="sd-brand-link" title="HomePulse Appliance Repair">
                <img
                  src="/homepulse_brand_horizontal_white.png"
                  alt="HomePulse Appliance Repair"
                  className="sd-brand-img"
                />
              </Link>
            </motion.div>

            <motion.div
              className="d-flex align-items-center gap-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={smoothSpring}
            >
              <Link to="/" className="sd-back-home-btn">
                <ArrowLeftIcon size={15} className="me-1" />
                <span className="d-none d-sm-inline">Back to Home</span>
              </Link>
              <motion.a
                href={phoneHref}
                className="sd-quick-phone-pill"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="sd-phone-icon-wrap">
                  <PhoneIcon size={14} />
                </span>
                <span className="sd-phone-txt">
                  <small>Direct Dispatch</small>
                  <strong>{phoneDisplay}</strong>
                </span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </header>

      {/* 2. Bespoke Reimagined Hero Section */}
      <section className="sd-hero-section" id="service-hero">
        <div className="sd-hero-bg-shapes"></div>
        <div className="sd-unified-container position-relative z-index-2">
          <div className="row align-items-center g-4 g-lg-5">
            {/* Left: SEO Heading, Live Status, Value Proposition & CTAs */}
            <div className="col-lg-7">
              <div className="sd-hero-content">
                {/* Live Radar Dispatch Status Badge */}
                <motion.div
                  className="sd-live-status-pill"
                  initial={{ opacity: 0, y: -15, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={popSpring}
                >
                  <span className="sd-status-pulse-dot"></span>
                  <span>Live Dispatch: Technicians Active Across Massachusetts Today</span>
                </motion.div>

                {/* Breadcrumb Navigation */}
                <motion.nav
                  aria-label="breadcrumb"
                  className="my-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                >
                  <ol className="sd-breadcrumb-list">
                    <li>
                      <Link to="/">
                        <HomeIcon size={13} className="me-1" />
                        Home
                      </Link>
                    </li>
                    <li className="separator">
                      <ChevronRightIcon size={10} />
                    </li>
                    <li>
                      <a href="/#services">Services</a>
                    </li>
                    <li className="separator">
                      <ChevronRightIcon size={10} />
                    </li>
                    <li className="active" aria-current="page">
                      {service.title}
                    </li>
                  </ol>
                </motion.nav>

                {/* Dynamic High-Intent H1 with Stagger Animation */}
                <motion.h1
                  className="sd-hero-title"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...smoothSpring, delay: 0.15 }}
                >
                  {service.heroTitle || `${service.title} in Massachusetts`}
                </motion.h1>

                {/* Hero Description */}
                <motion.p
                  className="sd-hero-desc"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...smoothSpring, delay: 0.22 }}
                >
                  {service.heroDesc || service.desc}
                </motion.p>

                {/* Core Value Pills Grid with Staggered Entrance */}
                <motion.div
                  className="sd-hero-pillars"
                  initial="hidden"
                  animate="visible"
                  variants={staggerContainerVariants}
                >
                  <motion.div className="sd-pillar-item" variants={fadeUpItemVariants} whileHover={{ scale: 1.03, y: -2 }}>
                    <BoltIcon size={16} className="text-warning" />
                    <span>Same-Day Local Dispatch</span>
                  </motion.div>
                  <motion.div className="sd-pillar-item" variants={fadeUpItemVariants} whileHover={{ scale: 1.03, y: -2 }}>
                    <ShieldCheckIcon size={16} className="text-success" />
                    <span>90-Day Parts &amp; Labor Warranty</span>
                  </motion.div>
                  <motion.div className="sd-pillar-item" variants={fadeUpItemVariants} whileHover={{ scale: 1.03, y: -2 }}>
                    <CheckBadgeIcon size={16} className="text-info" />
                    <span>100% Upfront Binding Pricing</span>
                  </motion.div>
                  <motion.div className="sd-pillar-item" variants={fadeUpItemVariants} whileHover={{ scale: 1.03, y: -2 }}>
                    <WrenchIcon size={16} className="text-warning" />
                    <span>Specialized in Luxury &amp; Major Brands</span>
                  </motion.div>
                </motion.div>

                {/* Direct High-Conversion CTAs */}
                <motion.div
                  className="sd-hero-actions"
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...smoothSpring, delay: 0.45 }}
                >
                  <motion.a
                    href={phoneHref}
                    className="sd-hero-cta-call"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <PhoneIcon size={17} />
                    <span>Call Dispatch: {phoneDisplay}</span>
                  </motion.a>
                  <motion.button
                    type="button"
                    onClick={() => scrollToAnchor('booking')}
                    className="sd-hero-cta-book"
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <span>Book Service Online</span>
                    <ArrowRightIcon size={15} />
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Right: Playful & Interactive 3D Showcase (No Text Overlays on Image) */}
            {/* Right: Clean & Interactive 3D Showcase (No Emojis, No Overlay Lines) */}
            <div className="col-lg-5">
              <motion.div
                className="sd-hero-showcase-box"
                initial={{ opacity: 0, scale: 0.93, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ ...smoothSpring, duration: 0.7, delay: 0.2 }}
              >
                {/* 3D Perspective Tilt Container with Cursor Parallax */}
                <div
                  className="sd-showcase-perspective-wrap"
                  onMouseMove={handleMouseMoveShowcase}
                  onMouseLeave={handleMouseLeaveShowcase}
                >
                  <motion.div
                    className="sd-showcase-tilt-card"
                    animate={{
                      rotateX: tilt.x,
                      rotateY: tilt.y,
                      scale: tilt.isHover ? 1.025 : 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 24,
                    }}
                  >
                    {/* Glowing Ambient Aura Ring behind photo */}
                    <div className="sd-showcase-aura"></div>

                    <div className="sd-showcase-image-wrap">
                      <img
                        src={service.detailImage || service.image}
                        alt={`${service.title} specialist repairing appliance in Massachusetts`}
                        onError={(e) => {
                          e.currentTarget.src = '/assets/images/approach-process.jpg';
                        }}
                      />

                      {/* Dynamic Specular Light Glare following cursor */}
                      {tilt.isHover && (
                        <div
                          className="sd-showcase-glare"
                          style={{
                            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 65%)`,
                          }}
                        ></div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Sticky Quick-Jump Anchor Sub-Nav */}
      <nav
        className={`sd-sticky-subnav ${showStickyNav ? 'is-visible' : ''}`}
        aria-label="Service navigation"
      >
        <div className="sd-unified-container">
          <div className="sd-subnav-inner">
            <div className="sd-subnav-tabs">
              <button
                type="button"
                className={`sd-subnav-btn ${activeNavTab === 'symptoms' ? 'active' : ''}`}
                onClick={() => scrollToAnchor('symptoms')}
              >
                Symptom Explorer
              </button>
              <button
                type="button"
                className={`sd-subnav-btn ${activeNavTab === 'brands' ? 'active' : ''}`}
                onClick={() => scrollToAnchor('brands')}
              >
                Brands
              </button>
              <button
                type="button"
                className={`sd-subnav-btn ${activeNavTab === 'advantage' ? 'active' : ''}`}
                onClick={() => scrollToAnchor('advantage')}
              >
                Why Us
              </button>
              <button
                type="button"
                className={`sd-subnav-btn ${activeNavTab === 'lifespan' ? 'active' : ''}`}
                onClick={() => scrollToAnchor('lifespan')}
              >
                Repair vs. Replace
              </button>
              <button
                type="button"
                className={`sd-subnav-btn ${activeNavTab === 'faqs' ? 'active' : ''}`}
                onClick={() => scrollToAnchor('faqs')}
              >
                Pricing &amp; FAQs
              </button>
              <button
                type="button"
                className={`sd-subnav-btn ${activeNavTab === 'checklist' ? 'active' : ''}`}
                onClick={() => scrollToAnchor('checklist')}
              >
                DIY Checks
              </button>
              <button
                type="button"
                className={`sd-subnav-btn ${activeNavTab === 'areas' ? 'active' : ''}`}
                onClick={() => scrollToAnchor('areas')}
              >
                Service Areas
              </button>
            </div>

            <div className="sd-subnav-quick-cta">
              <a href={phoneHref} className="sd-subnav-call-btn">
                <PhoneIcon size={14} className="me-1" />
                <span>Call Now</span>
              </a>
              <button
                type="button"
                onClick={() => scrollToAnchor('booking')}
                className="sd-subnav-book-btn"
              >
                Book
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Brand Authority Strip */}
      {service.whyChoose && service.whyChoose.luxuryBrands && (
        <section className="sd-brand-strip-section" id="brands">
          <div className="sd-unified-container">
            <motion.div
              className="sd-brand-strip-wrapper"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={smoothSpring}
            >
              <div className="sd-brand-strip-header">
                <div className="d-flex align-items-center gap-2">
                  <CheckBadgeIcon size={20} className="text-primary" />
                  <h3 className="sd-brand-strip-title">
                    Master-Level Service for Luxury &amp; Leading {service.title.replace(' Repair', '')} Brands
                  </h3>
                </div>
                <p className="sd-brand-strip-subtitle">
                  Our master technicians carry specialized manufacturer diagnostic tools and genuine factory OEM replacement parts.
                </p>
              </div>

              <motion.div
                className="sd-brand-chips-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainerVariants}
              >
                {service.whyChoose.luxuryBrands.map((brand, idx) => (
                  <motion.div
                    className="sd-brand-chip-item"
                    key={idx}
                    variants={scalePopVariants}
                    whileHover={{ y: -3, scale: 1.06 }}
                    transition={{ duration: 0.18 }}
                  >
                    <CheckBadgeIcon size={13} className="text-primary me-1" />
                    <span>{brand}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. Interactive Symptom Diagnostic Explorer */}
      <section className="sd-section sd-section-alt" id="symptoms">
        <div className="sd-unified-container">
          <motion.div
            className="sd-section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={smoothSpring}
          >
            <span className="sd-section-tag">Interactive Diagnostic Center</span>
            <h2 className="sd-section-title">
              Common {service.title.replace(' Repair', '')} Symptoms &amp; Root Causes
            </h2>
            <div className="sd-accent-line mx-auto"></div>
            <p className="sd-section-desc mx-auto">
              Select what your appliance is experiencing below to see the probable root cause and what our technician inspects on-site:
            </p>
          </motion.div>

          <div className="sd-symptom-explorer-grid">
            {/* Left: Interactive Symptom Selector */}
            <motion.div
              className="sd-symptom-nav-list"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
              variants={staggerContainerVariants}
            >
              {rawProblems.map((problem, idx) => {
                const isObj = typeof problem === 'object' && problem !== null;
                const pTitle = isObj ? problem.title : problem;
                const isSelected = activeSymptomIdx === idx;
                const tag = severityTags[idx % severityTags.length];

                return (
                  <motion.button
                    type="button"
                    key={idx}
                    variants={fadeUpItemVariants}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    className={`sd-symptom-tab-btn ${isSelected ? 'active' : ''}`}
                    onClick={() => setActiveSymptomIdx(idx)}
                  >
                    <div className="sd-symptom-tab-indicator">
                      {isSelected ? <CheckIcon size={14} /> : <AlertIcon size={14} />}
                    </div>
                    <div className="sd-symptom-tab-info">
                      <span className="sd-symptom-tab-title">{pTitle}</span>
                      <span className={`sd-symptom-tab-badge badge-${tag.color}`}>
                        {tag.label}
                      </span>
                    </div>
                    <ChevronRightIcon size={14} className="sd-symptom-tab-arrow" />
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Right: Dynamic Diagnostic Insight Card with Spring Animation */}
            <div className="sd-diagnostic-insight-panel">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSymptomIdx}
                  className="sd-insight-card"
                  initial={{ opacity: 0, x: 25, filter: 'blur(3px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -20, filter: 'blur(3px)' }}
                  transition={smoothSpring}
                >
                  <div className="sd-insight-header">
                    <div className="sd-insight-icon-bubble">
                      <WrenchIcon size={24} />
                    </div>
                    <div>
                      <span className="sd-insight-pretitle">Diagnostic Breakdown</span>
                      <h3 className="sd-insight-title">{currentSymptomTitle}</h3>
                    </div>
                  </div>

                  <div className="sd-insight-body">
                    <motion.div
                      className="sd-insight-block"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="sd-insight-block-heading">
                        <MagnifyIcon size={16} className="text-primary" />
                        <strong>Probable Root Cause:</strong>
                      </div>
                      <p>{currentSymptomDesc}</p>
                    </motion.div>

                    <motion.div
                      className="sd-insight-block"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.18 }}
                    >
                      <div className="sd-insight-block-heading">
                        <MagnifyIcon size={16} className="text-warning" />
                        <strong>What Our Master Technician Tests On-Site:</strong>
                      </div>
                      <p>
                        We measure electrical voltage and resistance across relays, inspect motor windings, test mechanical clearances, and run OEM diagnostic scan cycles to isolate the precise failing component without guessing.
                      </p>
                    </motion.div>

                    <motion.div
                      className="sd-insight-block callout"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.26 }}
                    >
                      <div className="sd-insight-block-heading">
                        <InfoIcon size={16} className="text-info" />
                        <strong>HomePulse Recommended Action:</strong>
                      </div>
                      <p>
                        Avoid running continuous failed cycles to prevent motor burn-out or electrical control board shorts. Prompt service preserves your appliance.
                      </p>
                    </motion.div>
                  </div>

                  <div className="sd-insight-footer">
                    <motion.button
                      type="button"
                      className="sd-book-symptom-btn"
                      onClick={() => handleBookSymptom(currentSymptomTitle)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <WrenchIcon size={15} className="me-2" />
                      <span>Book Fast Repair for This Issue</span>
                    </motion.button>
                    <a href={phoneHref} className="sd-symptom-call-link">
                      <PhoneIcon size={14} className="me-1" />
                      <span>Or Call {phoneDisplay}</span>
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HomePulse Advantage vs. General Contractors + 4-Step Repair Journey */}
      <section className="sd-section sd-section-white" id="advantage">
        <div className="sd-unified-container">
          <div className="row g-5 align-items-stretch">
            {/* Left Column: Advantage Comparison Table */}
            <div className="col-lg-6">
              <motion.div
                className="sd-advantage-box h-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={slideLeftVariants}
              >
                <span className="sd-section-tag">Why HomePulse</span>
                <h2 className="sd-section-title">
                  HomePulse vs. Standard Repair Services
                </h2>
                <p className="sd-section-desc mb-4">
                  See why homeowners across Greater Boston, Worcester, Springfield, and communities throughout Massachusetts choose HomePulse for appliance peace of mind:
                </p>

                <div className="sd-comparison-table">
                  <div className="sd-comp-header">
                    <span className="col-feature">Service Standard</span>
                    <span className="col-homepulse">HomePulse</span>
                    <span className="col-others">Other Services</span>
                  </div>
                  {comparisonItems.map((item, idx) => (
                    <motion.div
                      className="sd-comp-row"
                      key={idx}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.06 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="col-feature">
                        <strong>{item.feature}</strong>
                      </div>
                      <div className="col-homepulse">
                        <CheckIcon size={14} className="text-success me-1" />
                        <span>{item.homepulse}</span>
                      </div>
                      <div className="col-others">
                        <span className="text-muted">{item.others}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column: 4-Step Repair Journey */}
            <div className="col-lg-6">
              <motion.div
                className="sd-roadmap-box h-100"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={slideRightVariants}
              >
                <span className="sd-section-tag">Seamless Process</span>
                <h2 className="sd-section-title">How Our Repair Process Works</h2>
                <p className="sd-section-desc mb-4">
                  From initial contact to the completed test cycle, our process is built for maximum speed, safety, and price transparency:
                </p>

                <div className="sd-roadmap-stepper">
                  {roadmapSteps.map((step, idx) => {
                    const StepIcon = step.icon;
                    return (
                      <motion.div
                        className="sd-roadmap-item"
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.12 }}
                      >
                        <div className="sd-roadmap-marker">
                          <motion.div
                            className="sd-roadmap-num"
                            whileHover={{ scale: 1.12, rotate: 5 }}
                          >
                            {step.num}
                          </motion.div>
                          {idx < roadmapSteps.length - 1 && (
                            <div className="sd-roadmap-line"></div>
                          )}
                        </div>
                        <div className="sd-roadmap-content">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <h3 className="sd-roadmap-title">{step.title}</h3>
                            <span className="sd-roadmap-time-badge">{step.time}</span>
                          </div>
                          <p className="sd-roadmap-desc">{step.desc}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Interactive Appliance Lifespan & Decision Meter (`#lifespan`) */}
      {service.repairOrReplace && (
        <section className="sd-section sd-section-alt" id="lifespan">
          <div className="sd-unified-container">
            <motion.div
              className="sd-section-header text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={smoothSpring}
            >
              <span className="sd-section-tag">Financial Decision Tool</span>
              <h2 className="sd-section-title">{service.repairOrReplace.title}</h2>
              <div className="sd-accent-line mx-auto"></div>
              <p className="sd-section-desc mx-auto">
                {service.repairOrReplace.subtitle}
              </p>
            </motion.div>

            {/* Visual Lifespan Meter Gauge */}
            <motion.div
              className="sd-lifespan-meter-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={smoothSpring}
            >
              <div className="sd-meter-top">
                <div className="d-flex align-items-center gap-2">
                  <ClockIcon size={20} className="text-primary" />
                  <span className="sd-meter-label">Average Unit Lifespan:</span>
                </div>
                <motion.span
                  className="sd-meter-value-badge"
                  initial={{ scale: 0.8 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={popSpring}
                >
                  {service.repairOrReplace.lifespan}
                </motion.span>
              </div>

              {/* 3 Lifecycle Stages Bar with Fill Animation */}
              <div className="sd-lifecycle-bar">
                <motion.div
                  className="sd-bar-stage stage-green"
                  style={{ width: '33%' }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <span>Years 1–5</span>
                  <small>Always Repair</small>
                </motion.div>
                <motion.div
                  className="sd-bar-stage stage-blue"
                  style={{ width: '34%' }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.25 }}
                >
                  <span>Years 6–10</span>
                  <small>Cost-Effective Repair</small>
                </motion.div>
                <motion.div
                  className="sd-bar-stage stage-slate"
                  style={{ width: '33%' }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <span>Years 11+</span>
                  <small>Evaluate 50% Rule</small>
                </motion.div>
              </div>
            </motion.div>

            {/* Side-by-Side Decision Cards */}
            <div className="sd-decision-grid-modern mt-4">
              {/* Lean Toward Repair */}
              <motion.div
                className="sd-decision-col-card repair-side"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={slideLeftVariants}
              >
                <div className="sd-col-card-header">
                  <div className="sd-col-icon-wrap text-success">
                    <ThumbsUpIcon size={20} />
                  </div>
                  <div>
                    <h3 className="sd-col-title">When to Lean Toward Repair</h3>
                    <small>High Return on Investment</small>
                  </div>
                </div>
                <ul className="sd-col-list">
                  {service.repairOrReplace.repairPoints.map((pt, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <CheckIcon size={14} className="text-success flex-shrink-0" />
                      <span>{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Consider Replacement */}
              <motion.div
                className="sd-decision-col-card replace-side"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                variants={slideRightVariants}
              >
                <div className="sd-col-card-header">
                  <div className="sd-col-icon-wrap text-warning">
                    <AlertIcon size={20} />
                  </div>
                  <div>
                    <h3 className="sd-col-title">When to Consider Replacement</h3>
                    <small>Evaluating Long-Term Value</small>
                  </div>
                </div>
                <ul className="sd-col-list">
                  {service.repairOrReplace.replacePoints.map((pt, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <span className="sd-bullet-dot"></span>
                      <span>{pt}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* HomePulse Honest Rule Callout */}
            {service.repairOrReplace.honestRule && (
              <motion.div
                className="sd-honest-rule-banner mt-4"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={smoothSpring}
              >
                <div className="d-flex align-items-start gap-3">
                  <div className="sd-honest-icon text-primary">
                    <ShieldCheckIcon size={26} />
                  </div>
                  <div>
                    <h4 className="sd-honest-title">HomePulse Honest Advice Rule:</h4>
                    <p className="sd-honest-text">{service.repairOrReplace.honestRule}</p>
                    {service.repairOrReplace.honestRuleSub && (
                      <p className="sd-honest-subtext">{service.repairOrReplace.honestRuleSub}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* 8. Transparent Pricing & Interactive FAQ Center (`#faqs`) */}
      {service.pricingFaqs && (
        <section className="sd-section sd-section-white" id="faqs">
          <div className="sd-unified-container">
            <div className="row g-5 align-items-start">
              {/* Left: Pricing Transparency Guarantee Card */}
              <div className="col-lg-5">
                <motion.div
                  className="sd-pricing-guarantee-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={slideLeftVariants}
                >
                  <span className="sd-section-tag">Transparent Quotes</span>
                  <h2 className="sd-section-title">
                    Transparent {service.title} Pricing
                  </h2>
                  <p className="sd-section-desc mb-4">
                    We believe in complete pricing transparency. Our expert technicians evaluate the appliance first and present a binding, flat-rate quote before any work commences.
                  </p>

                  <div className="sd-pricing-highlights">
                    <motion.div className="sd-price-highlight-item" whileHover={{ x: 3 }}>
                      <CheckBadgeIcon size={18} className="text-primary flex-shrink-0" />
                      <div>
                        <strong>No Hidden Hourly Rates</strong>
                        <p>You pay the agreed flat rate, no matter how long the repair takes.</p>
                      </div>
                    </motion.div>
                    <motion.div className="sd-price-highlight-item" whileHover={{ x: 3 }}>
                      <ShieldCheckIcon size={18} className="text-success flex-shrink-0" />
                      <div>
                        <strong>Written 90-Day Guarantee</strong>
                        <p>All parts and labor are backed in writing for 90 days.</p>
                      </div>
                    </motion.div>
                    <motion.div className="sd-price-highlight-item" whileHover={{ x: 3 }}>
                      <ClockIcon size={18} className="text-info flex-shrink-0" />
                      <div>
                        <strong>No Overtime or Weekend Surcharges</strong>
                        <p>Same fair pricing 7 days a week across all Massachusetts communities.</p>
                      </div>
                    </motion.div>
                  </div>

                  <div className="sd-pricing-cta-box">
                    <span>Need an instant phone quote?</span>
                    <motion.a
                      href={phoneHref}
                      className="sd-pricing-call-pill"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <PhoneIcon size={15} />
                      <span>{phoneDisplay}</span>
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              {/* Right: FAQ Accordion */}
              <div className="col-lg-7">
                <motion.div
                  className="sd-faq-accordion-wrap"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  variants={slideRightVariants}
                >
                  <h3 className="sd-faq-column-heading">Frequently Asked Questions</h3>
                  <div className="sd-faq-accordion">
                    {service.pricingFaqs.map((faq, idx) => {
                      const isOpen = openFaq === idx;
                      return (
                        <motion.div
                          className={`sd-faq-card ${isOpen ? 'active' : ''}`}
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.08 }}
                        >
                          <button
                            type="button"
                            className="sd-faq-card-header"
                            onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                          >
                            <span className="sd-faq-q-text">{faq.question}</span>
                            <motion.span
                              className="sd-faq-toggle-icon"
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              {isOpen ? <MinusIcon size={15} /> : <PlusIcon size={15} />}
                            </motion.span>
                          </button>

                          <AnimatePresence initial={false}>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.28, ease: 'easeInOut' }}
                              >
                                <div className="sd-faq-card-body">
                                  <p>{faq.answer}</p>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. Interactive DIY Pre-Service Safety Checklist (`#checklist`) */}
      {service.diagnosticGuide && service.diagnosticGuide.steps && (
        <section className="sd-section sd-section-alt" id="checklist">
          <div className="sd-unified-container">
            <motion.div
              className="sd-section-header text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={smoothSpring}
            >
              <span className="sd-section-tag">Interactive Safety Guide</span>
              <h2 className="sd-section-title">{service.diagnosticGuide.title}</h2>
              <div className="sd-accent-line mx-auto"></div>
              <p className="sd-section-desc mx-auto">{service.diagnosticGuide.subtitle}</p>
            </motion.div>

            <div className="sd-checklist-container">
              {/* Checklist Status & Animated Progress Bar */}
              <motion.div
                className="sd-checklist-status-bar"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={smoothSpring}
              >
                <div className="d-flex align-items-center gap-2">
                  <ClipboardCheckIcon size={18} className="text-primary" />
                  <span>
                    Your Checklist Progress: <strong>{checkedDiySteps.size} of {totalDiy} Verified ({diyProgress}%)</strong>
                  </span>
                </div>
                <small className="text-muted">Click each step after inspecting safely</small>
              </motion.div>

              <motion.div
                className="sd-checklist-grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainerVariants}
              >
                {service.diagnosticGuide.steps.map((st, idx) => {
                  const isChecked = checkedDiySteps.has(idx);
                  return (
                    <motion.div
                      key={idx}
                      variants={fadeUpItemVariants}
                      whileHover={{ x: 4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className={`sd-check-item-card ${isChecked ? 'checked' : ''}`}
                      onClick={() => toggleDiyStep(idx)}
                    >
                      <motion.div
                        className="sd-check-box-indicator"
                        animate={{ scale: isChecked ? [1, 1.25, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {isChecked ? <CheckIcon size={16} /> : <span>{st.num}</span>}
                      </motion.div>
                      <div className="sd-check-content">
                        <h4 className="sd-check-step-title">{st.title}</h4>
                        <p className="sd-check-step-desc">{st.desc}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>

              <motion.div
                className="sd-checklist-bottom-strip"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="d-flex align-items-center gap-3">
                  <AlertIcon size={20} className="text-warning flex-shrink-0" />
                  <p className="mb-0 small">
                    {service.diagnosticGuide.bottomNote
                      ? service.diagnosticGuide.bottomNote.replace(/\(?571\)?\s*571-1664/g, phoneDisplay)
                      : `If these checks do not resolve the fault, do not attempt to disassemble internal mechanical or electrical parts. Call ${phoneDisplay} for safe on-site diagnosis.`}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* 10. Regional Dispatch Coverage Hub (`#areas`) */}
      {service.serviceAreas && (
        <section className="sd-section sd-section-white" id="areas">
          <div className="sd-unified-container">
            <motion.div
              className="sd-section-header text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={smoothSpring}
            >
              <span className="sd-section-tag">Local Dispatch Radar</span>
              <h2 className="sd-section-title">
                Local {service.title} Dispatch Coverage
              </h2>
              <div className="sd-accent-line mx-auto"></div>
              <p className="sd-section-desc mx-auto">
                We provide prompt same-day service across all cities, towns, and communities throughout Massachusetts. Mobile diagnostic units are stationed across the state:
              </p>

              {/* Regional Filter Tabs */}
              <div className="sd-region-tabs">
                <button
                  type="button"
                  className={`sd-region-tab ${activeRegion === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveRegion('all')}
                >
                  All MA ({allAreas.length})
                </button>
                <button
                  type="button"
                  className={`sd-region-tab ${activeRegion === 'boston' ? 'active' : ''}`}
                  onClick={() => setActiveRegion('boston')}
                >
                  Greater Boston ({bostonAreas.length})
                </button>
                <button
                  type="button"
                  className={`sd-region-tab ${activeRegion === 'central' ? 'active' : ''}`}
                  onClick={() => setActiveRegion('central')}
                >
                  Central &amp; MetroWest ({centralAreas.length})
                </button>
                <button
                  type="button"
                  className={`sd-region-tab ${activeRegion === 'coastal' ? 'active' : ''}`}
                  onClick={() => setActiveRegion('coastal')}
                >
                  North &amp; South Shore ({coastalAreas.length})
                </button>
                <button
                  type="button"
                  className={`sd-region-tab ${activeRegion === 'western' ? 'active' : ''}`}
                  onClick={() => setActiveRegion('western')}
                >
                  Western MA ({westernAreas.length})
                </button>
              </div>
            </motion.div>

            <div className="sd-areas-cloud-wrapper">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeRegion}
                  className="sd-areas-cloud-modern"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                >
                  {filteredAreas.map((area) => (
                    <div
                      className="sd-area-card-chip"
                      key={area}
                    >
                      <MapPinIcon size={13} className="text-primary" />
                      <span className="sd-area-name">{area}</span>
                      <span className="sd-area-live-tag">Active</span>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      )}

      {/* 11. Bottom Fast Booking & Emergency Dispatch Console (`#booking`) */}
      <section className="sd-section sd-section-dark" id="booking">
        <div className="sd-unified-container">
          <motion.div
            className="sd-booking-console-card"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={smoothSpring}
          >
            <div className="row g-4 g-lg-5 align-items-center">
              {/* Left: Hotline & Direct Dispatch Details */}
              <div className="col-lg-5">
                <span className="sd-console-tag">Priority Dispatch</span>
                <h3 className="sd-console-title">
                  Schedule {service.title} Today
                </h3>
                <p className="sd-console-subtitle">
                  Need immediate help? Call our dispatch desk directly for immediate arrival scheduling, or submit the form and we will call you back as soon as possible.
                </p>

                <div className="sd-console-hotline-box">
                  <small>Direct Dispatch Line</small>
                  <strong>{phoneDisplay}</strong>
                  <p>Technicians on-call 7 days a week • 8:00 AM – 9:00 PM</p>

                  <div className="d-flex flex-wrap gap-2 mt-3">
                    <motion.a
                      href={phoneHref}
                      className="tj-primary-btn"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <PhoneIcon size={15} className="me-2" />
                      Call {phoneDisplay}
                    </motion.a>
                    <motion.a
                      href={settings.whatsapp_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sd-whatsapp-btn"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                    >
                      <WhatsAppIcon size={16} className="me-1" />
                      WhatsApp
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Right: Booking Form */}
              <div className="col-lg-7">
                {formSubmitted ? (
                  <motion.div
                    className="sd-quote-success-banner"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={popSpring}
                  >
                    <CheckBadgeIcon size={46} className="mb-2 text-success" />
                    <h4>Thank You! We Received Your Request.</h4>
                    <p>Our dispatch desk will call you back as soon as possible to confirm your technician arrival window.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="sd-booking-form">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="sd-form-label">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. Sarah Jenkins"
                          className="sd-quote-input"
                          value={formData.name}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="sd-form-label">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="e.g. (571) 555-0199"
                          className="sd-quote-input"
                          value={formData.phone}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="sd-form-label">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. name@example.com"
                          className="sd-quote-input"
                          value={formData.email}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="sd-form-label">Street Address *</label>
                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="e.g. 124 Main Street"
                          className="sd-quote-input"
                          value={formData.address}
                          onChange={handleFormChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="sd-form-label">Service / Appliance *</label>
                        <select
                          name="serviceType"
                          required
                          className="sd-quote-select"
                          value={formData.serviceType}
                          onChange={handleFormChange}
                        >
                          <option value="">Select Service / Appliance *</option>
                          {serviceOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="sd-form-label">Appliance Brand</label>
                        <select
                          name="brand"
                          className="sd-quote-select"
                          value={formData.brand}
                          onChange={handleFormChange}
                        >
                          <option value="">Select Brand (if known)</option>
                          {brandOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="sd-form-label">City in Massachusetts *</label>
                        <select
                          name="city"
                          required
                          className="sd-quote-select"
                          value={formData.city}
                          onChange={handleFormChange}
                        >
                          <option value="">Select City / Town in MA *</option>
                          {cityOptions.map((opt, idx) => (
                            <option key={idx} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-12">
                        <label className="sd-form-label">Describe What Is Wrong</label>
                        <textarea
                          name="message"
                          rows="3"
                          placeholder="e.g. Appliance not cooling, making humming noise, leaking water..."
                          className="sd-quote-input"
                          value={formData.message}
                          onChange={handleFormChange}
                        ></textarea>
                      </div>
                      <div className="col-12 mt-2">
                        <motion.button
                          type="submit"
                          className="sd-quote-btn"
                          disabled={isSubmitting}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <span>Scheduling Dispatch...</span>
                          ) : (
                            <>
                              <PhoneIcon size={16} />
                              <span>Submit Fast Service Request</span>
                            </>
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 12. Related Appliance Repairs Section */}
      <section className="sd-section sd-section-white">
        <div className="sd-unified-container">
          <motion.div
            className="sd-section-header text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={smoothSpring}
          >
            <span className="sd-section-tag">Full Service Spectrum</span>
            <h2 className="sd-section-title">Other Appliance Repairs We Provide</h2>
            <div className="sd-accent-line mx-auto"></div>
            <p className="sd-section-desc mx-auto">
              We service all residential kitchen and laundry appliances with the same master technician expertise:
            </p>
          </motion.div>

          <motion.div
            className="sd-other-services-grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainerVariants}
          >
            {otherServices.map((item) => (
              <motion.div
                key={item.id}
                variants={scalePopVariants}
                whileHover={{ y: -3, scale: 1.03 }}
              >
                <Link
                  to={`/service/${item.slug}`}
                  className="sd-other-service-card"
                >
                  <span className="sd-other-service-icon">
                    <ApplianceIcon iconKey={item.iconKey} slug={item.slug} size={20} />
                  </span>
                  <span className="sd-other-service-name">{item.title}</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
