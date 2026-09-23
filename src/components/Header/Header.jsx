import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { servicesData } from '../../data/servicesData';

export default function Header() {
  const location = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    let ticking = false;
    let currentSticky = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const shouldSticky = window.scrollY > 250;
          if (shouldSticky !== currentSticky) {
            currentSticky = shouldSticky;
            setIsSticky(shouldSticky);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMenus = () => {
    setIsOffcanvasOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleHomeClick = (e) => {
    closeMenus();
    if (location.pathname === '/') {
      e.preventDefault();
      if (window.location.hash) {
        window.history.replaceState(null, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleLogoClick = (e) => {
    closeMenus();
    if (location.pathname === '/') {
      e.preventDefault();
      if (window.location.hash) {
        window.history.replaceState(null, '', '/');
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      {/* Body / Offcanvas Overlay */}
      {(isOffcanvasOpen || isMobileMenuOpen) && (
        <div
          className="body-overlay active"
          onClick={closeMenus}
          style={{ opacity: 1, visibility: 'visible' }}
        />
      )}

      {/* Offcanvas Area */}
      <div className={`offcanvas-area d-none d-lg-inline-block ${isOffcanvasOpen ? 'opened' : ''}`}>
        <div className="offcanvas-wrapper d-flex align-items-center justify-content-between">
          <div className="canvas-logo">
            <Link to="/" onClick={handleLogoClick}>
              <img src="/homepulse_brand_horizontal_white.png" alt="HomePulse Appliance Repair" />
            </Link>
          </div>
          <div className="offcanvas-icon">
            <button className="close-icon" id="canva_close" onClick={() => setIsOffcanvasOpen(false)} aria-label="Close menu">
              <i className="fa-light fa-xmark"></i>
            </button>
          </div>
        </div>

        <div className="desc">
          <p>Professional major appliance repair and home equipment services.</p>
        </div>

        <div className="contact-infos">
          <h4 className="offcanvas-title">Contact Information</h4>
          <div className="contact-item">
            <div className="contact-icon">
              <span><i className="flaticon-mail"></i></span>
            </div>
            <div className="contact-text">
              <span>Email</span>
              <div className="text"><a className="link" href="mailto:info@homepulse.com">info@homepulse.com</a></div>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <span><i className="flaticon-call"></i></span>
            </div>
            <div className="contact-text">
              <span>Phone Number</span>
              <div className="text"><a className="link" href="tel:+18005550199">(800) 555-0199</a></div>
            </div>
          </div>
          <div className="contact-item">
            <div className="contact-icon">
              <span><i className="flaticon-home"></i></span>
            </div>
            <div className="contact-text">
              <span>Address</span>
              <div className="text">742 Evergreen Terrace, Suite 100, Austin, TX 78701</div>
            </div>
          </div>
        </div>

        <div className="canvas-share">
          <h4 className="offcanvas-title">Social Media</h4>
          <ul>
            <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a></li>
            <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
            <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a></li>
            <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
          </ul>
        </div>

        <div className="canvas-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1517205.5747339479!2d-71.68353554999999!3d42.0369155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa26984a167ef49b%3A0x550f9bb0f0506153!2sHomePulse%20appliance!5e0!3m2!1sen!2saz!4v1789460364924!5m2!1sen!2saz"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps"
          ></iframe>
        </div>
      </div>

      {/* Mobile Hamburger Menu Drawer */}
      <div className={`hamburger-area d-lg-none ${isMobileMenuOpen ? 'opened' : ''}`}>
        <div className="hamburger_wrapper">
          <div className="hamburger_top d-flex align-items-center justify-content-between">
            <div className="hamburger_logo">
              <Link to="/" className="mobile_logo" onClick={handleLogoClick}>
                <img src="/homepulse_brand_horizontal_white.png" alt="HomePulse Appliance Repair" />
              </Link>
            </div>
            <div className="hamburger_close">
              <button className="hamburger_close_btn" onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                <i className="fa-thin fa-times"></i>
              </button>
            </div>
          </div>

          <div className="hamburger_menu">
            <ul className="mobile-nav-list" style={{ listStyle: 'none', padding: 0, margin: '20px 0' }}>
              <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
              <li className="has-dropdown">
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/about" onClick={closeMenus}>About Us</Link>
                  <button
                    className="dropdown-toggle-btn"
                    onClick={() => toggleDropdown('about')}
                    style={{ background: 'none', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer', padding: '6px 12px' }}
                    aria-label="Toggle submenu"
                  >
                    <i className={`fa-regular ${activeDropdown === 'about' ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                  </button>
                </div>
                {activeDropdown === 'about' && (
                  <ul className="sub-menu" style={{ listStyle: 'none', paddingLeft: '15px' }}>
                    <li><Link to="/about" onClick={closeMenus}>Company Overview</Link></li>
                  </ul>
                )}
              </li>
              <li className="has-dropdown">
                <div className="d-flex justify-content-between align-items-center">
                  <a href="/#services" onClick={closeMenus}>Services</a>
                  <button
                    className="dropdown-toggle-btn"
                    onClick={() => toggleDropdown('services')}
                    style={{ background: 'none', border: 'none', color: '#fff', fontSize: '14px', cursor: 'pointer', padding: '6px 12px' }}
                    aria-label="Toggle submenu"
                  >
                    <i className={`fa-regular ${activeDropdown === 'services' ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
                  </button>
                </div>
                {activeDropdown === 'services' && (
                  <ul className="sub-menu" style={{ listStyle: 'none', paddingLeft: '15px' }}>
                    {servicesData.map((item) => (
                      <li key={item.id}>
                        <Link to={`/service/${item.slug}`} onClick={closeMenus}>
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><Link to="/projects" onClick={closeMenus}>Recent Work</Link></li>
              <li><a href="/#contact" onClick={closeMenus}>Contact</a></li>
            </ul>
          </div>

          <div className="hamburger-infos">
            <h4 className="hamburger-title">Contact Information</h4>
            <div className="contact-item">
              <div className="contact-icon">
                <span><i className="flaticon-mail"></i></span>
              </div>
              <div className="contact-text">
                <span>Email</span>
                <div className="text"><a className="link" href="mailto:info@homepulse.com">info@homepulse.com</a></div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <span><i className="flaticon-call"></i></span>
              </div>
              <div className="contact-text">
                <span>Phone Number</span>
                <div className="text"><a className="link" href="tel:+18005550199">(800) 555-0199</a></div>
              </div>
            </div>
            <div className="contact-item">
              <div className="contact-icon">
                <span><i className="flaticon-home"></i></span>
              </div>
              <div className="contact-text">
                <span>Address</span>
                <div className="text">742 Evergreen Terrace, Suite 100, Austin, TX 78701</div>
              </div>
            </div>
          </div>

          <div className="hamburger-socials">
            <ul>
              <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a></li>
              <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
            </ul>
          </div>

          <div className="canvas-map" style={{ marginTop: '25px', borderRadius: '12px', overflow: 'hidden' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1517205.5747339479!2d-71.68353554999999!3d42.0369155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa26984a167ef49b%3A0x550f9bb0f0506153!2sHomePulse%20appliance!5e0!3m2!1sen!2saz!4v1789460364924!5m2!1sen!2saz"
              width="100%"
              height="240"
              style={{ border: 0, display: 'block', width: '100%' }}
              allowFullScreen=""
              loading="lazy"
              title="Google Maps Mobile"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <header className="tj-header-area header-absolute header-1 navbar-entrance-anim">
        {/* Topbar */}
        <div className="header-topbar">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="header-content-area">
                  <div className="header-contact-infos">
                    <ul>
                      <li>
                        <a href="tel:+18005550199"><i className="flaticon-call"></i>(800) 555-0199</a>
                      </li>
                      <li>
                        <a href="mailto:info@homepulse.com"><i className="flaticon-mail"></i>info@homepulse.com</a>
                      </li>
                      <li>
                        <i className="flaticon-home"></i> 742 Evergreen Terrace, Suite 100, Austin, TX 78701
                      </li>
                    </ul>
                  </div>
                  <div className="header-socials">
                    <span className="text">Social Media</span>
                    <ul>
                      <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a></li>
                      <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                      <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a></li>
                      <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mainmenu Area */}
        <div className="mainmenu-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mainmenu-wrapper">
                  <div className="mainmenu-box">
                    <div className="site-logo">
                      <Link className="logo" to="/" onClick={handleLogoClick}>
                        <img src="/homepulse_brand_horizontal.png" alt="HomePulse Appliance Repair" />
                      </Link>
                    </div>
                    <div className="mainmenu main-mobile-menu d-none d-lg-inline-block">
                      <ul>
                        <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
                        <li className="has-dropdown">
                          <Link to="/about">About Us</Link>
                          <ul className="sub-menu">
                            <li><Link to="/about">Company Overview</Link></li>
                          </ul>
                        </li>
                        <li className="has-dropdown">
                          <a href="/#services">Services</a>
                          <ul className="sub-menu">
                            {servicesData.map((item) => (
                              <li key={item.id}>
                                <Link to={`/service/${item.slug}`}>{item.title}</Link>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li><Link to="/projects">Recent Work</Link></li>
                        <li><a href="/#contact">Contact</a></li>
                      </ul>
                    </div>
                  </div>

                  <div className="mainmenu-right-item d-none d-lg-inline-flex">
                    <div className="hamburger-menu">
                      <button
                        className="hamburger canva_expander"
                        onClick={() => setIsOffcanvasOpen(true)}
                        aria-label="Open offcanvas"
                      >
                        <i className="fa-regular fa-bars"></i>
                      </button>
                    </div>
                    <div className="header-button d-none d-xl-inline-flex">
                      <a className="tj-white-btn" href="/#contact">Book Service</a>
                    </div>
                  </div>

                  <div className="menu-bar d-lg-none">
                    <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open mobile menu">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Header (Revealed on Scroll) */}
      <header className={`tj-header-area header-dublicate header-sticky header-1 ${isSticky ? 'sticky' : ''}`}>
        <div className="mainmenu-area">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="mainmenu-wrapper">
                  <div className="site-logo">
                    <Link className="logo" to="/" onClick={handleLogoClick}>
                      <img src="/homepulse_brand_horizontal.png" alt="HomePulse Appliance Repair" />
                    </Link>
                  </div>
                  <div className="mainmenu d-none d-lg-inline-block">
                    <ul>
                      <li><Link to="/" onClick={handleHomeClick}>Home</Link></li>
                      <li className="has-dropdown">
                        <Link to="/about">About Us</Link>
                        <ul className="sub-menu">
                          <li><Link to="/about">Company Overview</Link></li>
                        </ul>
                      </li>
                      <li className="has-dropdown">
                        <a href="/#services">Services</a>
                        <ul className="sub-menu">
                          {servicesData.map((item) => (
                            <li key={item.id}>
                              <Link to={`/service/${item.slug}`}>{item.title}</Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li><Link to="/projects">Recent Work</Link></li>
                      <li><a href="/#contact">Contact</a></li>
                    </ul>
                  </div>

                  <div className="mainmenu-right d-none d-lg-inline-flex">
                    <div className="header-button d-none d-md-inline-block">
                      <a className="tj-white-btn" href="/#contact">Book Service</a>
                    </div>
                  </div>

                  <div className="menu-bar d-lg-none">
                    <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open mobile menu">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
