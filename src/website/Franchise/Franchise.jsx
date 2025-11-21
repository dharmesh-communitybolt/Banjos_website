import React from 'react';
import HeroSection from './components/HeroSection';
import OverviewSection from './components/OverviewSection';
import WhyBanjosSection from './components/WhyBanjosSection';
import SupportSection from './components/SupportSection';
import TestimonialsSection from './components/TestimonialsSection';
import ApplySection from './components/ApplySection';

const Franchise = () => {
  return (
    <div className="franchise-page">
      <HeroSection />
      <OverviewSection />
      <WhyBanjosSection />
      <SupportSection />
      <TestimonialsSection />
      <ApplySection />
    </div>
  );
};

export default Franchise;