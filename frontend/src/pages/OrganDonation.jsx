import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { organDonationAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaHandHoldingHeart, FaInfoCircle } from 'react-icons/fa';

const OrganDonation = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    age: '',
    bloodGroup: '',
    organType: '',
    message: '',
    consent: false
  });
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await organDonationAPI.getMy();
      setHistory(res.data?.data || []);
    } catch (err) {
      console.error("Failed to load history", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) {
      toast.warning("You must provide consent to submit this form");
      return;
    }

    setLoading(true);
    try {
      await organDonationAPI.create(formData);
      toast.success("Interest submitted successfully. Our team will contact you.");
      setFormData({ ...formData, age: '', bloodGroup: '', organType: '', message: '', consent: false });
      fetchHistory();
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <FaHandHoldingHeart className="text-danger mb-3" style={{ fontSize: '48px' }} />
        <h2 className="fw-bold">Pledge to Donate Organs</h2>
        <p className="text-muted lead mx-auto" style={{ maxWidth: '700px' }}>
          One organ donor can save up to 8 lives. Express your interest in organ donation and become a hero.
        </p>
      </div>

      <div className="alert alert-info d-flex align-items-start shadow-sm border-0 mb-5">
        <FaInfoCircle className="fs-4 me-3 mt-1 flex-shrink-0 text-info" />
        <div>
          <h5 className="alert-heading fw-bold">Disclaimer</h5>
          <p className="mb-0">This form is to express your interest in organ donation. It is <strong>not</strong> an official legal registry. By submitting this form, our medical coordinators will contact you to explain the process, verify details, and guide you through the official legal registration process in your state/country.</p>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
              <h4 className="fw-bold mb-0">Expression of Interest Form</h4>
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name *</label>
                    <input type="text" className="form-control bg-light" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Age *</label>
                    <input type="number" className="form-control bg-light" name="age" value={formData.age} onChange={handleChange} required min="18" max="100" />
                  </div>
                </div>

                <div className="row g-3 mb-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email *</label>
                    <input type="email" className="form-control bg-light" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone *</label>
                    <input type="text" className="form-control bg-light" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Blood Group *</label>
                    <select className="form-select bg-light" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                      <option value="">Select Blood Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Organ(s) to Donate *</label>
                    <select className="form-select bg-light" name="organType" value={formData.organType} onChange={handleChange} required>
                      <option value="">Select Organ</option>
                      <option value="kidney">Kidneys</option>
                      <option value="liver">Liver</option>
                      <option value="heart">Heart</option>
                      <option value="lungs">Lungs</option>
                      <option value="cornea">Corneas</option>
                      <option value="bone_marrow">Bone Marrow</option>
                      <option value="skin">Skin</option>
                      <option value="other">Other / Any Needed</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Additional Notes (Optional)</label>
                  <textarea className="form-control bg-light" name="message" rows="3" value={formData.message} onChange={handleChange} placeholder="Any medical conditions or questions?"></textarea>
                </div>

                <div className="form-check mb-4">
                  <input className="form-check-input" type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} required />
                  <label className="form-check-label text-muted" htmlFor="consent">
                    I consent to SmartCareN storing my details and contacting me regarding organ donation. I understand this is not a legally binding contract.
                  </label>
                </div>

                <button type="submit" className="btn btn-danger px-5 py-2 fw-bold" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Pledge"}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 pt-4 pb-0 px-4">
              <h5 className="fw-bold mb-0">Your Submissions</h5>
            </div>
            <div className="card-body p-4">
              {history.length > 0 ? (
                <div className="list-group list-group-flush">
                  {history.map((item, idx) => (
                    <div key={idx} className="list-group-item px-0 py-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <strong className="text-dark">{item.organType}</strong>
                        <span className={`badge ${item.status === 'pending' ? 'bg-warning' : item.status === 'contacted' ? 'bg-info' : 'bg-success'}`}>
                          {item.status || 'Pending'}
                        </span>
                      </div>
                      <small className="text-muted d-block">Submitted: {new Date(item.createdAt || Date.now()).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted text-center my-4">No previous submissions.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganDonation;
