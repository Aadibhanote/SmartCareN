import React from 'react';
import HeroSection from '../components/home/HeroSection';
import ServicesSection from '../components/home/ServicesSection';
import HowItWorks from '../components/home/HowItWorks';
import FeaturedDoctors from '../components/home/FeaturedDoctors';
import CTASection from '../components/home/CTASection';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <HowItWorks />
      <FeaturedDoctors />
      <CTASection />
    </div>
  );
};

export default Home;
