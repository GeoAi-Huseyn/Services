import React from 'react';
import { Link } from 'react-router-dom';

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
                  <div className="tj-count" style={{ fontSize: '22px', fontWeight: 800 }}>
                    Many Years
                  </div>
                  <span className="client">Of Dedicated Service</span>
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
                  For many years, our skilled master technicians have taken pride in doing high-quality, honest, and meticulous appliance repairs for homeowners across Massachusetts. Using genuine OEM components and thorough diagnostics, we treat every home with care and ensure your appliances work properly.
                </p>
              </div>
              <div className="check-list style-2 wow fadeInUp" data-wow-delay=".5s">
                <ul>
                  <li><span><i className="fa-solid fa-check"></i></span> Meticulous & Tidy Workmanship</li>
                  <li><span><i className="fa-solid fa-check"></i></span> Prompt & Responsive Scheduling</li>
                  <li><span><i className="fa-solid fa-check"></i></span> Genuine OEM Factory Parts with Warranty</li>
                  <li><span><i className="fa-solid fa-check"></i></span> Transparent, Upfront Pricing Without Surprises</li>
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
