import React, { useState, useEffect } from 'react';
import { doctorAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa';

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentDoc, setCurrentDoc] = useState(null);
  
  const initialForm = { name: '', specialty: '', qualifications: '', experience: '', consultationFee: '', bio: '', availableDays: '', timeSlots: '' };
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await doctorAPI.getAll({});
      setDoctors(res.data?.data || []);
    } catch (err) {
      toast.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (doc = null) => {
    if (doc) {
      setIsEditing(true);
      setCurrentDoc(doc);
      setFormData({
        name: doc.name, specialty: doc.specialty, qualifications: doc.qualifications || '', experience: doc.experience, consultationFee: doc.consultationFee,
        bio: doc.bio || '', availableDays: (doc.availableDays || []).join(', '), timeSlots: (doc.timeSlots || []).join(', ')
      });
    } else {
      setIsEditing(false);
      setCurrentDoc(null);
      setFormData(initialForm);
    }
    setShowModal(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      experience: Number(formData.experience),
      consultationFee: Number(formData.consultationFee),
      availableDays: formData.availableDays.split(',').map(s => s.trim()).filter(Boolean),
      timeSlots: formData.timeSlots.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (isEditing) {
        await doctorAPI.update(currentDoc._id || currentDoc.id, dataToSend);
        toast.success("Doctor updated");
      } else {
        await doctorAPI.create(dataToSend);
        toast.success("Doctor added");
      }
      setShowModal(false);
      fetchDoctors();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await doctorAPI.delete(id);
        toast.success("Doctor deleted");
        fetchDoctors();
      } catch (err) {
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Manage Doctors</h3>
        <button className="btn btn-primary d-flex align-items-center" onClick={() => handleOpenModal()}>
          <FaPlus className="me-2" /> Add Doctor
        </button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Name</th>
                  <th>Specialty</th>
                  <th>Experience</th>
                  <th>Fee</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(doc => (
                  <tr key={doc._id || doc.id}>
                    <td className="ps-4 fw-semibold">{doc.name}</td>
                    <td>{doc.specialty}</td>
                    <td>{doc.experience} yrs</td>
                    <td>${doc.consultationFee}</td>
                    <td className="text-end pe-4">
                      <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(doc)}>
                        <FaEdit />
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(doc._id || doc.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header border-0 pb-0">
                <h5 className="modal-title fw-bold">{isEditing ? 'Edit Doctor' : 'Add Doctor'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3 mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Specialty</label>
                      <input type="text" className="form-control" name="specialty" value={formData.specialty} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Qualifications</label>
                      <input type="text" className="form-control" name="qualifications" value={formData.qualifications} onChange={handleChange} placeholder="e.g. MBBS, MD" />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Experience (Years)</label>
                      <input type="number" className="form-control" name="experience" value={formData.experience} onChange={handleChange} required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Consultation Fee ($)</label>
                      <input type="number" className="form-control" name="consultationFee" value={formData.consultationFee} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Available Days (comma separated)</label>
                    <input type="text" className="form-control" name="availableDays" value={formData.availableDays} onChange={handleChange} placeholder="e.g. Monday, Wednesday, Friday" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Time Slots (comma separated)</label>
                    <input type="text" className="form-control" name="timeSlots" value={formData.timeSlots} onChange={handleChange} placeholder="e.g. 09:00 AM, 10:00 AM" />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Bio</label>
                    <textarea className="form-control" name="bio" value={formData.bio} onChange={handleChange} rows="3"></textarea>
                  </div>
                  <div className="text-end">
                    <button type="button" className="btn btn-light me-2" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">{isEditing ? 'Save Changes' : 'Add Doctor'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDoctors;
