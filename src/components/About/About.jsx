import React from 'react';
import { Link } from 'react-router-dom';
import Counter from '../UI/Counter';

export default function About() {
  return (
    <section className="tj-about-section" id="about">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="about-images wow fadeInLeft" data-wow-delay=".3s">
              <div className="about-image">
                <img src="/assets/images/about-repairman.jpg" alt="About Us" />
              </div>
              <div className="drop-1"></div>
              <div className="drop-2"></div>
              <div className="drop-3"></div>
              <div className="fun-fact-area">
                <div className="client-icon">
                  <i className="fa-solid fa-medal"></i>
                </div>
                <div className="fun-fact-item">
                  <div className="tj-count">
                    <Counter end={15} suffix="+" />
                  </div>
                  <span className="client">Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="about-content">
              <div className="tj-heading-area wow fadeInUp" data-wow-delay=".5s">
                <div className="subs-title">
                  <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
                  <span className="sub-title">About Us</span>
                </div>
                <h2 className="title">Reliable Appliance Repair Services You Can Trust</h2>
              </div>
              <div className="desc wow fadeInUp" data-wow-delay=".6s">
                <p>
                  With certified master technicians and authentic OEM factory components, we provide fast, high-quality, and dependable appliance repair for all major household brands.
                </p>
              </div>
              <div className="check-list style-2 wow fadeInUp" data-wow-delay=".5s">
                <ul>
                  <li><span><i className="fa-solid fa-check"></i></span> Certified Master Technicians</li>
                  <li><span><i className="fa-solid fa-check"></i></span> Fast Response & Same-Day Dispatch</li>
                  <li><span><i className="fa-solid fa-check"></i></span> Genuine OEM Parts with Warranty</li>
                  <li><span><i className="fa-solid fa-check"></i></span> Transparent Flat-Rate Pricing</li>
                </ul>
              </div>
              <div className="about-button wow fadeInUp" data-wow-delay=".6s">
                <Link className="tj-primary-btn" to="/about">
                  Learn More
                  <span className="icon_box">
                    <i className="icon_first fa-regular fa-arrow-right"></i>
                    <i className="icon_second fa-regular fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="about-shapes">
        <img src="/assets/images/about-shape.svg" alt="Shapes" />
      </div>
    </section>
  );
}
