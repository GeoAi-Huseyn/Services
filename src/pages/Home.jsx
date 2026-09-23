import React, { useEffect } from 'react';
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

export default function Home() {
  useEffect(() => {
    // Scroll to top on mount (useful when navigating back from a detail page)
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
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
