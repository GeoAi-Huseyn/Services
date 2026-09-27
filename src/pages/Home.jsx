import React, { useEffect, useMemo } from 'react';
import Header from '../components/Header/Header';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Services from '../components/Services/Services';
import Approach from '../components/Approach/Approach';
import Brands from '../components/Brands/Brands';
import Testimonials from '../components/Testimonials/Testimonials';
import FAQ from '../components/FAQ/FAQ';
import Projects from '../components/Projects/Projects';
import Process from '../components/Process/Process';
import SEOHead, { buildLocalBusinessSchema, buildBreadcrumbSchema, buildFAQSchema } from '../components/SEO/SEOHead';
import { useSiteSettings } from '../context/SiteSettingsContext';

export default function Home() {
  const { settings } = useSiteSettings();

  useEffect(() => {
    // Scroll to top on mount (useful when navigating back from a detail page)
    window.scrollTo(0, 0);
  }, []);

  const jsonLd = useMemo(() => {
    const schemas = [
      buildLocalBusinessSchema(settings),
      buildBreadcrumbSchema([
        { name: 'Home', url: '/' }
      ]),
      buildFAQSchema([
        {
          question: 'What types of home appliances do you service?',
          answer: 'We repair refrigerators, freezers, washing machines, clothes dryers, dishwashers, ovens, stoves, microwaves, range hoods, and wine coolers.'
        },
        {
          question: 'How quickly can a technician arrive?',
          answer: 'After you reach out, a skilled master technician will be assigned and dispatched as soon as possible. The majority of repairs are diagnosed and completed right on-site promptly.'
        },
        {
          question: 'Do you use genuine OEM replacement parts?',
          answer: 'Yes, all repairs are conducted with 100% authentic, factory-tested OEM parts specifically designed for your appliance brand.'
        }
      ])
    ].filter(Boolean);
    return schemas;
  }, [settings]);

  return (
    <>
      <SEOHead
        title="HomePulse — Professional Appliance Repair Services in Massachusetts"
        description="Same-day major home appliance repair by certified master technicians in Massachusetts. Refrigerators, washers, dryers, ovens, dishwashers & more. Transparent pricing & 90-day warranty."
        canonical="/"
        keywords="appliance repair Massachusetts, refrigerator repair Boston, washer repair, dryer repair, dishwasher repair, oven repair, same-day appliance service, HomePulse"
        jsonLd={jsonLd}
      />
      <Header />
      <Hero />
      <About />
      <Services />
      <Approach />
      <Brands />
      <Testimonials />
      <FAQ />
      <Projects />
      <Process />
    </>
  );
}
