import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const footerServices = [
  'Refrigerator Repair',
  'Freezer Repair',
  'Washer Repair',
  'Dryer Repair',
  'Dishwasher Repair',
  'Oven & Stove Repair',
  'Microwave Repair',
  'Wine Cooler Repair',
  'Range Hood Repair',
];

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSent(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setNewsletterSent(false);
      }, 3000);
    }
  };

  return (
    <footer className="tj-footer-area footer-1" id="contact">
      <div className="footer-top-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="footer-contact-infos">
                <div className="contact-item">
                  <div className="contact-icon">
                    <span><i className="flaticon-mail"></i></span>
                  </div>
                  <div className="contact-text">
                    <span>Email</span>
                    <div className="text">
                      <a className="link" href="mailto:info@homepulse.com">info@homepulse.com</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <span><i className="flaticon-old-typical-phone"></i></span>
                  </div>
                  <div className="contact-text">
                    <span>Phone</span>
                    <div className="text">
                      <a className="link" href="tel:+18005550199">(800) 555-0199</a>
                    </div>
                  </div>
                </div>

                <div className="contact-item">
                  <div className="contact-icon">
                    <span><i className="flaticon-home"></i></span>
                  </div>
                  <div className="contact-text">
                    <span>Address</span>
                    <div className="text">100 State Street, Suite 400, Boston, MA 02109</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom-area">
        <div className="container">
          <div className="row">
            <div className="col-xl-4 col-lg-6 col-md-6">
              <div className="footer-widget footer1-col-1 footer-info">
                <div className="footer-logo">
                  <a
                    className="logo"
                    href="/"
                    onClick={(e) => {
                      if (window.location.pathname === '/') {
                        e.preventDefault();
                        if (window.location.hash) {
                          window.history.replaceState(null, '', '/');
                        }
                        window.scrollTo(0, 0);
                        window.location.reload();
                      }
                    }}
                  >
                    <img src="/homepulse_brand_horizontal_white.png" alt="HomePulse Appliance Repair" />
                  </a>
                </div>
                <div className="desc">
                  <p>HomePulse - Professional major home appliance, cooling, and kitchen equipment repair services.</p>
                </div>
                <div className="footer-share">
                  <ul>
                    <li><a href="https://www.facebook.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-facebook"></i></a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                    <li><a href="https://www.twitter.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-twitter"></i></a></li>
                    <li><a href="https://www.linkedin.com" target="_blank" rel="noreferrer"><i className="fa-brands fa-linkedin"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-6 col-md-6 col-sm-6">
              <div className="footer-widget footer1-col-2 widget_nav_menu">
                <div className="footer-title">
                  <h4 className="title">Quick Links</h4>
                </div>
                <ul>
                  <li>
                    <a href="#services"><span><i className="fa-regular fa-angle-right"></i></span>Services</a>
                  </li>
                  <li>
                    <a href="#contact"><span><i className="fa-regular fa-angle-right"></i></span>Contact</a>
                  </li>
                  <li>
                    <Link to="/projects"><span><i className="fa-regular fa-angle-right"></i></span>Recent Work</Link>
                  </li>
                  <li>
                    <Link to="/about"><span><i className="fa-regular fa-angle-right"></i></span>About Us</Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6 col-sm-6">
              <div className="footer-widget footer1-col-3 widget_nav_menu">
                <div className="footer-title">
                  <h4 className="title">Services</h4>
                </div>
                <ul>
                  {footerServices.map((service, idx) => (
                    <li key={idx}>
                      <a href="#services">
                        <span><i className="fa-regular fa-angle-right"></i></span>
                        {service}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-6 col-md-6">
              <div className="footer-widget footer1-col-4 footer_newsletter">
                <div className="footer-title">
                  <h4 className="title">Get In Touch</h4>
                </div>
                <div className="desc">
                  <p>Send us your email for seasonal maintenance tips and special repair offers.</p>
                </div>
                {newsletterSent ? (
                  <p style={{ color: '#28a745', fontWeight: 600 }}>Thank you! Your email has been registered.</p>
                ) : (
                  <form onSubmit={handleNewsletter}>
                    <div className="form-input">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        required
                      />
                      <button type="submit" className="tj-primary-btn">Subscribe</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tj-copyright-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="copyright-text">
                <p>
                  © Copyright 2024 - All Rights Reserved.{' '}
                  <a href="#">HomePulse Appliance Repair</a>
                </p>
              </div>
            </div>
            <div className="col-lg-6 copy-menu">
              <div className="copyright-menu">
                <ul>
                  <li><Link to="/about">About Us</Link></li>
                  <li><a href="#services">Services</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
