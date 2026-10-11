import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHandHoldingHeart, FaHospital, FaStethoscope } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section className="hero-section text-center position-relative overflow-hidden">
      <div className="container py-5 z-1 position-relative">
        <h1 className="display-3 fw-bold mb-4">Your Health, Our Priority</h1>
        <p className="lead mb-5 mx-auto" style={{ maxWidth: '700px' }}>
          SmartCareN is your comprehensive healthcare platform. Book appointments with top specialists, access vital medical resources, or make a difference through organ donation.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Link to="/appointments" className="btn btn-light btn-lg px-4 rounded-pill fw-semibold text-primary-custom shadow-sm">
            Book Appointment
          </Link>
          <Link to="/donations" className="btn btn-outline-light btn-lg px-4 rounded-pill fw-semibold">
            Explore Donations
          </Link>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100 opacity-10" style={{ pointerEvents: 'none' }}>
        <FaStethoscope className="position-absolute" style={{ fontSize: '200px', top: '-50px', right: '-50px', transform: 'rotate(-30deg)' }} />
        <FaHeartbeat className="position-absolute" style={{ fontSize: '150px', bottom: '20px', left: '-30px', transform: 'rotate(15deg)' }} />
      </div>
    </section>
  );
};

// Assuming FaHeartbeat was imported in the main file, let's just use it here or re-import
import { FaHeartbeat } from 'react-icons/fa';

export default HeroSection;
