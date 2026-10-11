import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeartbeat, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer-custom mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="text-white mb-3 d-flex align-items-center">
              <FaHeartbeat className="me-2" /> SmartCareN
            </h5>
            <p className="text-muted">
              A comprehensive healthcare platform connecting patients with top doctors, facilitating organ donations, and providing essential medical resources. Your health is our priority.
            </p>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h5 className="text-white mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/">Home</Link></li>
              <li className="mb-2"><Link to="/about">About Us</Link></li>
              <li className="mb-2"><Link to="/contact">Contact</Link></li>
              <li className="mb-2"><Link to="/login">Login</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3">Services</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/appointments">Book Appointment</Link></li>
              <li className="mb-2"><Link to="/organ-donation">Organ Donation</Link></li>
              <li className="mb-2"><Link to="/donations">Medical Resources</Link></li>
              <li className="mb-2"><Link to="/appointments">Find Doctors</Link></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h5 className="text-white mb-3">Contact Info</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2 d-flex align-items-center">
                <FaMapMarkerAlt className="me-2" /> 123 Healthcare Ave, NY 10001
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FaPhone className="me-2" /> +1 (555) 123-4567
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FaEnvelope className="me-2" /> info@smartcaren.com
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-secondary mt-4 mb-3" />
        
        <div className="text-center text-muted">
          <small>&copy; {new Date().getFullYear()} SmartCareN. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
