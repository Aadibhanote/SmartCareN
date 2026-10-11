import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const CTASection = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) return null; // Don't show to logged-in users

  return (
    <section className="py-5 bg-primary-custom text-white text-center">
      <div className="container py-4">
        <h2 className="fw-bold mb-3">Ready to take control of your health?</h2>
        <p className="lead mb-4 opacity-75">Join SmartCareN today and experience healthcare made simple.</p>
        <Link to="/register" className="btn btn-light btn-lg px-5 rounded-pill fw-bold text-primary-custom">
          Get Started Now
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
