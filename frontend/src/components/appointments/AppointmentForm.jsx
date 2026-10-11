import React, { useState, useEffect } from 'react';
import { appointmentAPI } from '../../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AppointmentForm = ({ doctor }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    date: '',
    timeSlot: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);
  
  // Calculate minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const availableSlots = doctor.timeSlots || ["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.timeSlot || !formData.reason) {
      toast.warning("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await appointmentAPI.create({
        doctorId: doctor._id || doctor.id,
        appointmentDate: formData.date,
        timeSlot: formData.timeSlot,
        reason: formData.reason
      });
      toast.success("Appointment booked successfully!");
      navigate('/appointments'); // Redirect to my appointments
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-body p-4">
        <h4 className="fw-bold mb-4">Book Appointment</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Select Date *</label>
            <input 
              type="date" 
              className="form-control" 
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={minDate}
              required 
            />
            {doctor.availableDays && (
              <div className="form-text">
                Available days: {doctor.availableDays.join(', ')}
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Select Time Slot *</label>
            <select 
              className="form-select" 
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleChange}
              required
              disabled={!formData.date}
            >
              <option value="">-- Choose time --</option>
              {availableSlots.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Reason for Visit *</label>
            <textarea 
              className="form-control" 
              name="reason"
              rows="3" 
              placeholder="Briefly describe your symptoms or reason for visit..."
              value={formData.reason}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 py-2 fw-bold"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Booking...</>
            ) : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
