import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaHeartbeat } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const { confirmPassword, ...dataToSend } = formData;
    const success = await register(dataToSend);
    setLoading(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '-40px' }}>
      <div className="card border-0 shadow-lg" style={{ maxWidth: '550px', width: '100%' }}>
        <div className="card-header bg-primary-custom text-white text-center py-4 border-0">
          <FaHeartbeat className="fs-1 mb-2" />
          <h3 className="mb-0 fw-bold">Join SmartCareN</h3>
          <p className="mb-0 text-white-50">Create your account to get started</p>
        </div>
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><FaUser className="text-muted" /></span>
                <input type="text" className="form-control border-start-0 ps-0 bg-light" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Email Address</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-muted" /></span>
                  <input type="email" className="form-control border-start-0 ps-0 bg-light" name="email" value={formData.email} onChange={handleChange} required placeholder="name@example.com" />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label fw-semibold">Phone Number</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><FaPhone className="text-muted" /></span>
                  <input type="text" className="form-control border-start-0 ps-0 bg-light" name="phone" value={formData.phone} onChange={handleChange} required placeholder="1234567890" />
                </div>
              </div>
            </div>
            
            <div className="row mb-4">
              <div className="col-md-6 mb-3 mb-md-0">
                <label className="form-label fw-semibold">Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><FaLock className="text-muted" /></span>
                  <input type="password" className="form-control border-start-0 ps-0 bg-light" name="password" value={formData.password} onChange={handleChange} required placeholder="••••••••" />
                </div>
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Confirm Password</label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0"><FaLock className="text-muted" /></span>
                  <input type="password" className="form-control border-start-0 ps-0 bg-light" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="••••••••" />
                </div>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-4" disabled={loading}>
              {loading ? <><span className="spinner-border spinner-border-sm me-2"></span> Registering...</> : "Register"}
            </button>
            
            <div className="text-center text-muted">
              Already have an account? <Link to="/login" className="text-primary-custom fw-semibold">Login here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
