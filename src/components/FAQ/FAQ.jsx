import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    id: 0,
    question: 'What types of home appliances do you service?',
    answer:
      'We repair refrigerators, freezers, washing machines, clothes dryers, dishwashers, ovens, stoves, microwaves, range hoods, and wine coolers. If you have a specific brand or unit, our specialists are fully equipped to assist.',
  },
  {
    id: 1,
    question: 'How quickly can a technician arrive?',
    answer:
      'After you reach out, a certified technician can be assigned and dispatched within 30 to 60 minutes. The majority of repairs are diagnosed and completed right on-site within 1 to 2 hours.',
  },
  {
    id: 2,
    question: 'Do you use genuine OEM replacement parts?',
    answer:
      'Yes, all repairs are conducted with 100% authentic, factory-tested OEM parts specifically designed for your appliance brand. Repairs are carried out transparently right under your supervision.',
  },
];

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', phone: '', email: '', subject: '', message: '' });
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <section
      className="tj-faq-section"
      id="faq"
      style={{ backgroundImage: "url('assets/images/faq-pattern.svg')" }}
    >
      <div className="container">
        <div className="row align-items-start">
          <div className="col-lg-6">
            <div className="tj-heading-area wow fadeInUp" data-wow-delay=".3s">
              <div className="subs-title">
                <span><i className="fa-solid fa-screwdriver-wrench"></i></span>
                <span className="sub-title">F.A.Q.</span>
              </div>
              <h2 className="title">Frequently Asked Questions</h2>
            </div>

            <div className="accordion tj-faq wow fadeInUp" data-wow-delay=".4s">
              {faqs.map((faq) => {
                const isOpen = activeFaq === faq.id;
                return (
                  <div
                    className={`accordion-item ${isOpen ? 'active' : ''}`}
                    key={faq.id}
                    style={{
                      overflow: 'hidden',
                      marginBottom: '16px',
                      borderRadius: '12px',
                      transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                    }}
                  >
                    <button
                      className={`faq-title ${isOpen ? '' : 'collapsed'}`}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease, color 0.3s ease',
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{faq.question}</span>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginLeft: '12px',
                          flexShrink: 0,
                          fontSize: '14px',
                        }}
                      >
                        <i className="fa-solid fa-chevron-down"></i>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`faq-content-${faq.id}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{
                            height: 'auto',
                            opacity: 1,
                            transition: {
                              height: { duration: 0.35, ease: [0.04, 0.62, 0.23, 0.98] },
                              opacity: { duration: 0.25, delay: 0.08 },
                            },
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                            transition: {
                              height: { duration: 0.28, ease: 'easeInOut' },
                              opacity: { duration: 0.18 },
                            },
                          }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div
                            className="accordion-body faq-text"
                            style={{
                              display: 'block',
                              padding: '16px 22px',
                              lineHeight: '1.65',
                              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
                            }}
                          >
                            <p style={{ margin: 0 }}>{faq.answer}</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="col-lg-6">
            <div className="contact-form-one wow fadeInRight" data-wow-delay=".4s">
              <h3 className="title">Schedule a Repair</h3>
              {formSubmitted ? (
                <div
                  style={{
                    padding: '20px',
                    background: '#28a745',
                    color: '#fff',
                    borderRadius: '8px',
                    textAlign: 'center',
                    fontWeight: 600,
                  }}
                >
                  <i className="fa-solid fa-check-circle" style={{ marginRight: '8px' }}></i>
                  Your message has been sent successfully! Our team will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="form-input">
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-input">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-input">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-input">
                    <input
                      type="text"
                      name="subject"
                      placeholder="Address or City *"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-input">
                    <textarea
                      name="message"
                      placeholder="Describe the appliance and issue (e.g. Refrigerator not cooling).."
                      value={formData.message}
                      onChange={handleInputChange}
                    ></textarea>
                  </div>
                  <div className="submit-button">
                    <button type="submit" className="tj-white-btn style-2">
                      Send Request
                      <span className="icon_box">
                        <i className="icon_first fa-regular fa-arrow-right"></i>
                        <i className="icon_second fa-regular fa-arrow-right"></i>
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
