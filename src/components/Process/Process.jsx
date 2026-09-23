import React from 'react';

const processSteps = [
  {
    step: '01',
    title: 'Diagnostic Assessment',
    desc: 'Our technicians perform comprehensive diagnostics to accurately identify the root malfunction.',
    icon: 'fa-solid fa-headset',
  },
  {
    step: '02',
    title: 'Genuine OEM Parts',
    desc: 'We install factory-certified, guaranteed replacement parts tailored to your appliance brand.',
    icon: 'fa-solid fa-gears',
  },
  {
    step: '03',
    title: 'Expert Precision Repair',
    desc: 'Repairs are carried out with industry-leading precision and care right in your home.',
    icon: 'fa-solid fa-screwdriver-wrench',
  },
  {
    step: '04',
    title: 'Testing & Handover',
    desc: 'All cycle operations and components are safety-tested before completing the job.',
    icon: 'fa-solid fa-check-double',
  },
];

export default function Process() {
  return (
    <section className="tj-process-section" id="surec-2">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tj-heading-area text-center wow fadeInUp" data-wow-delay=".3s">
              <div className="subs-title justify-content-center">
                <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
                <span className="sub-title">How We Work</span>
                <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
              </div>
              <h2 className="title">Simple & Seamless Process</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <div className="process-content-area">
              {processSteps.map((step, idx) => (
                <div className="process-item wow fadeInUp" data-wow-delay={`${0.3 + idx * 0.1}s`} key={step.step}>
                  <div className="process-content">
                    <div className="process-icon">
                      <div className="icon-inner">
                        <i className={step.icon}></i>
                      </div>
                    </div>
                    <div className="process-text">
                      <div className="process-number">
                        <span>{step.step}</span>
                      </div>
                      <h4 className="title">{step.title}</h4>
                      <div className="desc">
                        <p>{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
