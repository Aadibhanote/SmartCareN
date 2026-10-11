import React from 'react';
import { FaHeartbeat, FaUserMd, FaShieldAlt, FaGlobe } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center mb-5">
        <div className="col-lg-8 text-center">
          <FaHeartbeat className="text-primary-custom mb-3" style={{ fontSize: '48px' }} />
          <h2 className="fw-bold mb-3">About SmartCareN</h2>
          <p className="lead text-muted">
            We are dedicated to bridging the gap between healthcare providers and patients through innovative technology, making quality care accessible to everyone.
          </p>
        </div>
      </div>

      <div className="row g-5 mb-5 align-items-center">
        <div className="col-lg-6">
          <img src="https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hospital" className="img-fluid rounded shadow" style={{ objectFit: 'cover', height: '400px', width: '100%' }} />
        </div>
        <div className="col-lg-6">
          <h3 className="fw-bold mb-4">Our Mission</h3>
          <p className="text-muted" style={{ lineHeight: '1.8' }}>
            At SmartCareN, our mission is to empower individuals to take control of their health by providing a seamless, secure, and user-friendly platform. We believe that finding the right doctor, securing a timely appointment, and accessing critical medical resources shouldn't be a daunting task.
          </p>
          <p className="text-muted" style={{ lineHeight: '1.8' }}>
            We also aim to create a community of care by facilitating organ donation pledges and connecting those in need of medical equipment with generous donors.
          </p>
        </div>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-4 text-center">
          <div className="card h-100 border-0 shadow-sm p-4">
            <FaUserMd className="text-primary-custom mb-3 mx-auto" style={{ fontSize: '40px' }} />
            <h5 className="fw-bold">Expert Professionals</h5>
            <p className="text-muted">Verified doctors and specialists across various medical fields.</p>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card h-100 border-0 shadow-sm p-4">
            <FaShieldAlt className="text-success mb-3 mx-auto" style={{ fontSize: '40px' }} />
            <h5 className="fw-bold">Secure & Private</h5>
            <p className="text-muted">Your health data is protected with enterprise-grade security.</p>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="card h-100 border-0 shadow-sm p-4">
            <FaGlobe className="text-info mb-3 mx-auto" style={{ fontSize: '40px' }} />
            <h5 className="fw-bold">Accessible Anywhere</h5>
            <p className="text-muted">Manage your healthcare needs from any device, anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
