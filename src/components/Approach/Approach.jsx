import React from 'react';
import Counter from '../UI/Counter';

export default function Approach() {
  return (
    <section className="tj-approach-section" id="approach">
      <div className="approach-top-content-area">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-lg-6">
              <div className="approach-images text-end wow unusual-flip-in-left" data-wow-delay=".4s">
                <div className="approach-image">
                  <img src="/assets/images/approach-process.jpg" alt="Approach" />
                </div>
                <div className="drop-1"></div>
                <div className="drop-2"></div>
                <div className="drop-3"></div>
                <div className="drop-4"></div>
                <div className="drop-5"></div>
                <div className="fun-fact-area">
                  <div className="client-icon">
                    <i className="fa-solid fa-users"></i>
                  </div>
                  <div className="fun-fact-item">
                    <div className="tj-count">
                      <Counter end={30} suffix="k+" />
                    </div>
                    <span className="client">Happy Clients</span>
                  </div>
                </div>
                <div className="approach-shapes">
                  <img src="/assets/images/approach-shape.svg" alt="Approach Shapes" />
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="approach-right-content">
                <div className="tj-heading-area">
                  <div className="subs-title wow anim-slide-down" data-wow-delay=".4s">
                    <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
                    <span className="sub-title">Name the Problem, We'll Fix It</span>
                  </div>
                  <h2 className="title wow anim-fade-right" data-wow-delay=".5s">Leaders in Appliance Repair</h2>
                  <div className="desc wow anim-pop-up" data-wow-delay=".6s">
                    <p>
                      We repair your faulty household appliances quickly and reliably. With our experienced expert team, we bring your essential equipment back to peak operating performance.
                    </p>
                  </div>
                  <div className="check-list style-3 wow anim-pop-up" data-wow-delay=".7s">
                    <ul>
                      <li><span><i className="fa-solid fa-check"></i></span> Reliable Service</li>
                      <li><span><i className="fa-solid fa-check"></i></span> Fast Same-Day Turnaround</li>
                      <li><span><i className="fa-solid fa-check"></i></span> Guaranteed High Quality</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="approach-bottom-content-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="approach-main-content-area">
                <div className="approach-item wow anim-card-left" data-wow-delay=".4s">
                  <div className="approach-infos">
                    <div className="approach-icon">
                      <span><i className="fa-solid fa-phone-volume"></i></span>
                    </div>
                    <div className="approach-number">
                      <svg viewBox="0 0 75 50" width="75" height="50">
                        <text className="number" x="0" y="40">01</text>
                      </svg>
                    </div>
                  </div>
                  <h4 className="title">Report the Issue</h4>
                  <div className="desc">
                    <p>Contact us via phone or our quick online form. Share the details of your appliance and describe the symptoms you're experiencing.</p>
                  </div>
                </div>

                <div className="approach-item wow anim-card-up" data-wow-delay=".5s">
                  <div className="approach-infos">
                    <div className="approach-icon">
                      <span><i className="fa-solid fa-magnifying-glass-chart"></i></span>
                    </div>
                    <div className="approach-number">
                      <svg viewBox="0 0 75 50" width="75" height="50">
                        <text className="number" x="0" y="40">02</text>
                      </svg>
                    </div>
                  </div>
                  <h4 className="title">Inspection & Quote</h4>
                  <div className="desc">
                    <p>Our licensed technician inspects the appliance on-site, pinpoints the root cause, and provides an honest upfront estimate.</p>
                  </div>
                </div>

                <div className="approach-item wow anim-card-right" data-wow-delay=".6s">
                  <div className="approach-infos">
                    <div className="approach-icon">
                      <span><i className="fa-solid fa-truck-fast"></i></span>
                    </div>
                    <div className="approach-number">
                      <svg viewBox="0 0 75 50" width="75" height="50">
                        <text className="number" x="0" y="40">03</text>
                      </svg>
                    </div>
                  </div>
                  <h4 className="title">Repair & Testing</h4>
                  <div className="desc">
                    <p>Upon your approval, repairs begin immediately using authentic OEM parts, followed by thorough cycle testing before handover.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
