import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import 'swiper/css';
import './Testimonials.css';

const clientReviews = [
  {
    id: 1,
    name: 'John D.',
    initial: 'J',
    avatarColor: '#ea580c', // Warm orange
    service: 'Sub-Zero Refrigerator • Boston, MA',
    rating: 5,
    text: "Best appliance technicians we've ever used. Showed up on time, diagnosed the Sub-Zero compressor relay issue quickly, and fixed it properly with genuine OEM parts. Transparent flat pricing and very polite.",
  },
  {
    id: 2,
    name: 'Sarah M.',
    initial: 'S',
    avatarColor: '#0d57d7', // Theme royal blue
    service: 'Bosch 800 Dishwasher • Cambridge, MA',
    rating: 5,
    text: "Our Bosch dishwasher had an E15 error code right before our dinner party. HomePulse dispatched a master technician who replaced the circulation seal the same afternoon. Outstanding same-day service!",
  },
  {
    id: 3,
    name: 'Michael C.',
    initial: 'M',
    avatarColor: '#16a34a', // Forest green
    service: 'Wolf Dual-Fuel Range • Newton, MA',
    rating: 5,
    text: "Extremely knowledgeable with luxury Wolf appliances. Other companies told us we needed a 3-week backorder, but HomePulse already had the spark igniter module in their service van. Highly recommended!",
  },
  {
    id: 4,
    name: 'Emily W.',
    initial: 'E',
    avatarColor: '#9333ea', // Purple
    service: 'Miele Front-Load Washer • Wellesley, MA',
    rating: 5,
    text: "Miele appliances require specialized training, and their technician knew every detail. Replaced the drain pump cleanly without leaving any mess on our hardwood floors. 5-star experience from start to finish.",
  },
  {
    id: 5,
    name: 'David R.',
    initial: 'D',
    avatarColor: '#0284c7', // Sky blue
    service: 'Thermador Wall Oven • Brookline, MA',
    rating: 5,
    text: "Prompt, honest, and completely professional. He tested the temperature sensor and thermal fuse, clearly explained our options, and gave us an upfront quote before doing any work. Will always call them.",
  },
  {
    id: 6,
    name: 'Lisa T.',
    initial: 'L',
    avatarColor: '#e11d48', // Ruby red
    service: 'Viking Gas Cooktop • Worcester, MA',
    rating: 5,
    text: "Called them for burner ignition trouble on our Viking cooktop. The technician arrived right on schedule, cleaned the ports, replaced the microswitch, and verified burner safety. Truly dependable service.",
  },
  {
    id: 7,
    name: 'Robert K.',
    initial: 'R',
    avatarColor: '#d97706', // Amber gold
    service: 'JennAir Induction Cooktop • Quincy, MA',
    rating: 5,
    text: "Our induction cooktop was tripping the circuit breaker. The technician traced a faulty inverter power board, ordered the exact OEM component, and installed it perfectly within 24 hours.",
  },
  {
    id: 8,
    name: 'Amanda B.',
    initial: 'A',
    avatarColor: '#059669', // Emerald
    service: 'Dacor French-Door Fridge • Somerville, MA',
    rating: 5,
    text: "Our Dacor refrigerator wasn't maintaining temperature in the fresh food compartment. Technician quickly identified a defrost cycle issue and replaced the thermistor. Very friendly and tidy!",
  },
  {
    id: 9,
    name: 'James P.',
    initial: 'J',
    avatarColor: '#4f46e5', // Indigo
    service: 'KitchenAid Built-In Oven • Framingham, MA',
    rating: 5,
    text: "Called for urgent oven calibration and fan motor replacement ahead of the holidays. Prompt arrival, fair upfront estimate, and flawless repair work. HomePulse is our top recommendation in MetroWest.",
  },
  {
    id: 10,
    name: 'Patricia L.',
    initial: 'P',
    avatarColor: '#db2777', // Pink
    service: 'Liebherr Wine Cooler • Lexington, MA',
    rating: 5,
    text: "Specialized luxury refrigeration is hard to find service for, but HomePulse has true factory-trained experts. Restored dual-zone cooling to optimal performance effortlessly.",
  },
  {
    id: 11,
    name: 'Daniel H.',
    initial: 'D',
    avatarColor: '#2563eb', // Blue
    service: 'GE Monogram Range • Waltham, MA',
    rating: 5,
    text: "Excellent service on our high-end Monogram range. Diagnosed the dual-flame valve problem quickly and tested all six burners before finishing. Thorough and professional.",
  },
  {
    id: 12,
    name: 'Karen S.',
    initial: 'K',
    avatarColor: '#7c3aed', // Violet
    service: 'Whirlpool Front-Load Dryer • Natick, MA',
    rating: 5,
    text: "Dryer was running but producing zero heat. Technician arrived the same morning, replaced the burnt heating coil and thermal cutoff, and cleaned the internal lint trap. 10 out of 10!",
  },
];

// 20 Massachusetts Hubs across all key service regions
const maRegions = ['All', 'Greater Boston', 'MetroWest', 'North Shore', 'Central & South'];

const maCities = [
  { id: 'boston', name: 'BOSTON', query: 'Boston, MA', county: 'Suffolk County', region: 'Greater Boston' },
  { id: 'cambridge', name: 'CAMBRIDGE', query: 'Cambridge, MA', county: 'Middlesex County', region: 'Greater Boston' },
  { id: 'somerville', name: 'SOMERVILLE', query: 'Somerville, MA', county: 'Middlesex County', region: 'Greater Boston' },
  { id: 'brookline', name: 'BROOKLINE', query: 'Brookline, MA', county: 'Norfolk County', region: 'Greater Boston' },
  { id: 'quincy', name: 'QUINCY', query: 'Quincy, MA', county: 'Norfolk County', region: 'Greater Boston' },
  { id: 'newton', name: 'NEWTON', query: 'Newton, MA', county: 'Middlesex County', region: 'MetroWest' },
  { id: 'waltham', name: 'WALTHAM', query: 'Waltham, MA', county: 'Middlesex County', region: 'MetroWest' },
  { id: 'framingham', name: 'FRAMINGHAM', query: 'Framingham, MA', county: 'Middlesex County', region: 'MetroWest' },
  { id: 'wellesley', name: 'WELLESLEY', query: 'Wellesley, MA', county: 'Norfolk County', region: 'MetroWest' },
  { id: 'natick', name: 'NATICK', query: 'Natick, MA', county: 'Middlesex County', region: 'MetroWest' },
  { id: 'needham', name: 'NEEDHAM', query: 'Needham, MA', county: 'Norfolk County', region: 'MetroWest' },
  { id: 'lexington', name: 'LEXINGTON', query: 'Lexington, MA', county: 'Middlesex County', region: 'MetroWest' },
  { id: 'watertown', name: 'WATERTOWN', query: 'Watertown, MA', county: 'Middlesex County', region: 'MetroWest' },
  { id: 'burlington', name: 'BURLINGTON', query: 'Burlington, MA', county: 'Middlesex County', region: 'MetroWest' },
  { id: 'medford', name: 'MEDFORD', query: 'Medford, MA', county: 'Middlesex County', region: 'North Shore' },
  { id: 'malden', name: 'MALDEN', query: 'Malden, MA', county: 'Middlesex County', region: 'North Shore' },
  { id: 'peabody', name: 'PEABODY', query: 'Peabody, MA', county: 'Essex County', region: 'North Shore' },
  { id: 'salem', name: 'SALEM', query: 'Salem, MA', county: 'Essex County', region: 'North Shore' },
  { id: 'worcester', name: 'WORCESTER', query: 'Worcester, MA', county: 'Worcester County', region: 'Central & South' },
  { id: 'plymouth', name: 'PLYMOUTH', query: 'Plymouth, MA', county: 'Plymouth County', region: 'Central & South' },
];

export default function Testimonials() {
  const { settings } = useSiteSettings();
  const swiperRef = useRef(null);
  const [activeCity, setActiveCity] = useState(maCities[0]);
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cities by selected region and search input
  const filteredCities = maCities.filter((city) => {
    const matchesRegion = selectedRegion === 'All' || city.region === selectedRegion;
    const matchesSearch =
      city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      city.county.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  // Repeat reviews to guarantee a rich buffer so loop never runs out of slides on wide screens
  const infiniteReviews = [...clientReviews, ...clientReviews].map((review, idx) => ({
    ...review,
    slideKey: `review-${review.id}-${idx}`,
  }));

  // HomePulse Google review submission link
  const googleReviewUrl = "https://www.google.com/maps/place/HomePulse+appliance/@42.0369155,-71.6835355,10z/data=!4m8!3m7!1s0xa26984a167ef49b:0x550f9bb0f0506153!8m2!3d42.0369155!4d-71.6835355!9m1!1b1!16s%2Fg%2F11w3_sample?entry=ttu";

  return (
    <section className="tj-testimonial-section" id="reviews">
      <div className="container">
        
        {/* ==================================================================
            PART 1: CLIENT REVIEWS (REFERENCE CAROUSEL DESIGN)
            ================================================================== */}
        <div className="reviews-part-one">
          
          {/* Header */}
          <div className="reviews-heading-area wow fadeInUp" data-wow-delay=".2s">
            <div className="reviews-badge">
              <i className="fa-solid fa-thumbs-up"></i>
              <span>Why Homeowners Choose Us</span>
              <i className="fa-solid fa-thumbs-up"></i>
            </div>
            <h2 className="reviews-main-title">WHAT OUR CLIENTS SAY</h2>
            <p className="reviews-subtitle-desc">
              Here is what homeowners across Massachusetts say about choosing HomePulse for dependable, expert appliance repair.
            </p>
          </div>

          {/* Reference Design Swiper Carousel */}
          <div className="client-reviews-carousel-wrap">
            <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              modules={[Navigation, Autoplay]}
              centeredSlides={true}
              loop={true}
              loopAddBlankSlides={false}
              loopAdditionalSlides={8}
              spaceBetween={28}
              slidesPerView={1.2}
              autoplay={{
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              breakpoints={{
                640: { slidesPerView: 2.1, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 },
                1280: { slidesPerView: 3.5, spaceBetween: 30 },
              }}
              className="client-reviews-slider"
            >
              {infiniteReviews.map((review) => (
                <SwiperSlide key={review.slideKey}>
                  <div className="review-card-ref">
                    
                    {/* Top: Quotation Badge */}
                    <div className="review-quote-badge">
                      <span>“</span>
                    </div>

                    {/* Star Rating (5 Stars) */}
                    <div className="review-stars-row">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star"></i>
                      ))}
                    </div>

                    {/* Review Quote Text */}
                    <div className="review-text-quote">
                      <p>"{review.text}"</p>
                    </div>

                    {/* Bottom Author Pill with Initial Avatar */}
                    <div className="review-author-pill">
                      <div className="review-author-left">
                        <div
                          className="review-avatar-circle"
                          style={{ backgroundColor: review.avatarColor }}
                        >
                          {review.initial}
                        </div>
                        <div className="review-author-meta">
                          <span className="review-author-name">— {review.name}</span>
                          <span className="review-author-sub">{review.service}</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Controls Bar: Prev Button + Google Review CTA Button + Next Button */}
            <div className="reviews-controls-bar wow fadeInUp" data-wow-delay=".3s">
              <button
                className="review-nav-arrow"
                onClick={() => swiperRef.current?.slidePrev()}
                aria-label="Previous review"
              >
                <i className="fa-solid fa-chevron-left"></i>
              </button>

              {/* User requested Google review submission button */}
              <a
                href={googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="google-write-review-btn"
                title="Leave Us a Review on Google"
              >
                <span className="google-btn-icon-wrap">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
                    alt="Google Review"
                  />
                </span>
                <span>Leave Us a Review on Google</span>
              </a>

              <button
                className="review-nav-arrow"
                onClick={() => swiperRef.current?.slideNext()}
                aria-label="Next review"
              >
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            PART 2: OUR SERVICE AREA (INTERACTIVE MAP & EXPANDED LOCATIONS)
            ================================================================== */}
        <div className="service-map-part" id="service-area">
          {/* Angled Polygon Decorative Background Strip */}
          <div className="service-area-polygon-bg" aria-hidden="true">
            <div className="polygon-stripe-1"></div>
            <div className="polygon-stripe-2"></div>
            <div className="polygon-stripe-3"></div>
          </div>

          <div className="map-part-header wow fadeInUp" data-wow-delay=".2s">
            <div className="service-area-pill-badge">
              <i className="fa-solid fa-location-crosshairs"></i>
              <span>Massachusetts Statewide Coverage</span>
            </div>
            <h2 className="map-main-title">OUR SERVICE AREA</h2>
            <p className="map-subtitle-desc">
              We dispatch experienced master technicians across Massachusetts, providing prompt same-day appliance repair into:
            </p>
          </div>

          {/* Interactive Map & Locations Container with Polygon Framing */}
          <div className="service-area-interactive-wrap wow fadeInUp" data-wow-delay=".3s">
            
            {/* Left Locations Control Panel */}
            <div className="locations-control-panel">
              {/* Polygon Header Badge */}
              <div className="locations-panel-header">
                <div className="locations-header-title">
                  <i className="fa-solid fa-city"></i>
                  <span>LOCATIONS ({maCities.length})</span>
                </div>
                <span className="live-status-pill">
                  <span className="pulse-dot"></span> Same-Day Active
                </span>
              </div>

              {/* Search Box */}
              <div className="locations-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder="Search city or county..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              {/* Region Filter Chips */}
              <div className="locations-region-filters">
                {maRegions.map((region) => (
                  <button
                    key={region}
                    type="button"
                    className={`region-chip ${selectedRegion === region ? 'active' : ''}`}
                    onClick={() => setSelectedRegion(region)}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Scrollable City List (Fixed height so section never jumps on search) */}
              <div className="locations-button-list custom-scroll">
                {filteredCities.map((city) => {
                  const isActive = activeCity.id === city.id;
                  return (
                    <button
                      key={city.id}
                      type="button"
                      onClick={() => setActiveCity(city)}
                      className={`location-item-btn ${isActive ? 'active' : ''}`}
                    >
                      <span className="loc-pin-icon">
                        <i className="fa-solid fa-location-dot"></i>
                      </span>
                      <div className="loc-text-col">
                        <span className="loc-city-name">{city.name}</span>
                        <span className="loc-county-name">{city.county}</span>
                      </div>
                      <span className="loc-arrow-indicator">
                        <i className="fa-solid fa-chevron-right"></i>
                      </span>
                    </button>
                  );
                })}
                {filteredCities.length === 0 && (
                  <div className="no-cities-found-box">
                    <div className="no-cities-icon">
                      <i className="fa-solid fa-compass"></i>
                    </div>
                    <strong>We Service "{searchQuery}" & All Surrounding Towns!</strong>
                    <p>We provide prompt same-day appliance repair across all 351 cities and towns in Massachusetts.</p>
                    <a href={`tel:+${settings.phone_raw}`} className="no-cities-call-btn">
                      <i className="fa-solid fa-phone-volume"></i> Call Now: {settings.phone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right Map Canvas with Polygon Frame and Floating Dispatch Van Pin */}
            <div className="map-canvas-wrapper">
              {/* Decorative Polygon Corner Badge */}
              <div className="map-polygon-tag">
                <i className="fa-solid fa-shield-check"></i>
                <span>Direct Mobile Dispatch • {activeCity.name}</span>
              </div>

              <iframe
                key={activeCity.id}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(activeCity.query)}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                title={`HomePulse Service Area - ${activeCity.name}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen=""
              ></iframe>

              {/* Floating Mobile Van Dispatch Badge (Theme Royal Blue & White) */}
              <div className="map-floating-van-badge">
                <div className="van-pin-circle">
                  <i className="fa-solid fa-truck-fast"></i>
                </div>
                <div className="van-badge-info">
                  <div className="van-badge-title">
                    <span className="pulse-dot"></span>
                    <strong>Mobile Unit Active</strong>
                  </div>
                  <div className="van-badge-sub">{activeCity.name}, MA • {activeCity.county}</div>
                </div>
              </div>
            </div>

          </div>

          {/* ==================================================================
              EYE-CATCHING STATEWIDE COVERAGE ANNOUNCEMENT BANNER
              ================================================================== */}
          <div className="statewide-coverage-banner wow fadeInUp" data-wow-delay=".35s">
            <div className="coverage-banner-glow" aria-hidden="true"></div>
            
            <div className="coverage-banner-left">
              <div className="coverage-beacon-wrap">
                <span className="beacon-radar-ring"></span>
                <div className="coverage-beacon-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
              </div>
              <div className="coverage-banner-content">
                <div className="coverage-pill-tag">
                  <i className="fa-solid fa-check-double"></i>
                  <span>100% STATEWIDE COVERAGE • ENTIRE STATE OF MASSACHUSETTS</span>
                </div>
                <h4 className="coverage-banner-heading">
                  Don't See Your Town Listed? <span>We Service 100% of Massachusetts!</span>
                </h4>
                <p className="coverage-banner-desc">
                  In addition to the featured hubs above, our fully equipped mobile service vans cover <strong>all 351 cities and towns across Massachusetts</strong>. Contact our local dispatch center for immediate same-day service to your door.
                </p>
              </div>
            </div>

            <div className="coverage-banner-right">
              <div className="coverage-meta-pills">
                <div className="meta-pill-item">
                  <i className="fa-solid fa-truck-fast"></i>
                  <span>Same-Day Mobile Dispatch</span>
                </div>
                <div className="meta-pill-item">
                  <i className="fa-solid fa-shield-halved"></i>
                  <span>All 351 Cities & Towns Covered</span>
                </div>
              </div>
              <a href={`tel:+${settings.phone_raw}`} className="coverage-banner-cta-btn">
                <i className="fa-solid fa-phone-volume"></i>
                <div className="cta-btn-text-wrap">
                  <span className="cta-small-label">BOOK SAME-DAY DISPATCH</span>
                  <span className="cta-phone-number">{settings.phone}</span>
                </div>
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
