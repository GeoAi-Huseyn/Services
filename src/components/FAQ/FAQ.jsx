import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { submitServiceRequest, submitInquiry } from '../../lib/supabase';
import { serviceOptions, brandOptions, cityOptions } from '../../data/formOptions';
import CustomDropdown from '../Common/CustomDropdown';
import './FAQ.css';

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
      'After you reach out, a skilled master technician will be assigned and dispatched as soon as possible. The majority of repairs are diagnosed and completed right on-site promptly.',
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    serviceType: '',
    brand: '',
    city: '',
    message: '',
  });

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitServiceRequest({
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        serviceType: formData.serviceType || 'General Appliance Repair',
        brand: formData.brand || 'Not Specified',
        city: formData.city || 'Massachusetts',
        message: formData.message,
      });
      await submitInquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `${formData.serviceType || 'Repair Request'} - ${formData.city || formData.address || 'MA'}`,
        message: `Address: ${formData.address || 'N/A'}\nCity: ${formData.city || 'N/A'}\nBrand: ${formData.brand || 'N/A'}\nService: ${formData.serviceType || 'N/A'}\n\nProblem Details:\n${formData.message}`,
      });
    } catch (err) {
      console.error('Error submitting repair request:', err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          phone: '',
          email: '',
          address: '',
          serviceType: '',
          brand: '',
          city: '',
          message: '',
        });
        setFormSubmitted(false);
      }, 4000);
    }
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
                const itemClass = 'accordion-item faq-accordion-item' + (isOpen ? ' active' : '');
                const btnClass = 'faq-title' + (isOpen ? '' : ' collapsed');
                const bodyKey = 'faq-body-' + faq.id;
                return (
                  <div className={itemClass} key={faq.id}>
                    <button
                      className={btnClass}
                      type="button"
                      onClick={() => toggleFaq(faq.id)}
                      aria-expanded={isOpen}
                    >
                      <span className="faq-question-text">{faq.question}</span>
                      <span className="faq-chevron">
                        <i className="fa-solid fa-chevron-down"></i>
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={bodyKey}
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
                          <div className="accordion-body faq-accordion-body">
                            <p>{faq.answer}</p>
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
                <div className="form-success-message">
                  <i className="fa-solid fa-check-circle"></i>
                  Your message has been sent successfully! Our team will contact you shortly.
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="row g-2">
                    <div className="col-sm-6">
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
                    </div>
                    <div className="col-sm-6">
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
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address *"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <input
                          type="text"
                          name="address"
                          placeholder="Street Address *"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <CustomDropdown
                          name="serviceType"
                          placeholder="Select Service / Appliance *"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          options={serviceOptions}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-input">
                        <CustomDropdown
                          name="brand"
                          placeholder="Select Brand (if known)"
                          value={formData.brand}
                          onChange={handleInputChange}
                          options={brandOptions}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-input">
                        <CustomDropdown
                          name="city"
                          placeholder="Select City / Town in MA *"
                          value={formData.city}
                          onChange={handleInputChange}
                          options={cityOptions}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-input">
                        <textarea
                          name="message"
                          rows="3"
                          placeholder="Describe the issue (e.g. Refrigerator not cooling, leaking water, humming noise)..."
                          value={formData.message}
                          onChange={handleInputChange}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="submit-button mt-3">
                    <button type="submit" className="tj-white-btn style-2 w-100" disabled={isSubmitting}>
                      {isSubmitting ? 'Sending Request...' : 'Send Request'}
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
