import React, { useState } from 'react';
import { contactAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactAPI.create(formData);
      toast.success("Message sent successfully. We will get back to you soon!");
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Contact Us</h2>
        <p className="text-muted">Have a question or need assistance? We're here to help.</p>
      </div>

      <div className="row g-5">
        <div className="col-lg-5">
          <div className="card border-0 shadow-sm h-100 bg-primary-custom text-white">
            <div className="card-body p-4 p-md-5">
              <h3 className="fw-bold mb-4 text-white">Get in Touch</h3>
              <p className="mb-5 opacity-75">Fill out the form and our team will get back to you within 24 hours.</p>
              
              <div className="d-flex align-items-center mb-4">
                <div className="bg-white text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <FaPhone />
                </div>
                <div>
                  <h6 className="mb-0 fw-semibold text-white">Phone</h6>
                  <span className="opacity-75">+1 (555) 123-4567</span>
                </div>
              </div>
              
              <div className="d-flex align-items-center mb-4">
                <div className="bg-white text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <FaEnvelope />
                </div>
                <div>
                  <h6 className="mb-0 fw-semibold text-white">Email</h6>
                  <span className="opacity-75">support@smartcaren.com</span>
                </div>
              </div>
              
              <div className="d-flex align-items-center">
                <div className="bg-white text-primary-custom rounded-circle d-flex align-items-center justify-content-center me-3 flex-shrink-0" style={{ width: '40px', height: '40px' }}>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h6 className="mb-0 fw-semibold text-white">Location</h6>
                  <span className="opacity-75">123 Healthcare Ave, NY 10001</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Your Name *</label>
                    <input type="text" className="form-control bg-light" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Your Email *</label>
                    <input type="email" className="form-control bg-light" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">Subject *</label>
                  <input type="text" className="form-control bg-light" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
                
                <div className="mb-4">
                  <label className="form-label fw-semibold">Message *</label>
                  <textarea className="form-control bg-light" name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary px-5 py-2 fw-bold" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
