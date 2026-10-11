import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock, FaHeartbeat } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(formData);
    setLoading(false);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center min-vh-100" style={{ marginTop: '-80px' }}>
      <div className="card border-0 shadow-lg" style={{ maxWidth: '450px', width: '100%' }}>
        <div className="card-header bg-primary-custom text-white text-center py-4 border-0">
          <FaHeartbeat className="fs-1 mb-2" />
          <h3 className="mb-0 fw-bold">Welcome Back</h3>
          <p className="mb-0 text-white-50">Login to your SmartCareN account</p>
        </div>
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="form-label fw-semibold">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><FaEnvelope className="text-muted" /></span>
                <input 
                  type="email" 
                  className="form-control border-start-0 ps-0 bg-light" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="name@example.com"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="form-label fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><FaLock className="text-muted" /></span>
                <input 
                  type="password" 
                  className="form-control border-start-0 ps-0 bg-light" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  placeholder="••••••••"
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary w-100 py-2 fw-bold mb-4" disabled={loading}>
              {loading ? (
                <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Logging in...</>
              ) : "Login"}
            </button>
            
            <div className="text-center text-muted">
              Don't have an account? <Link to="/register" className="text-primary-custom fw-semibold">Register here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
