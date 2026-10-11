import React, { useState, useEffect } from 'react';
import { donationAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: 'blood', description: '', location: '', contactInfo: '', status: 'available' });

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const res = await donationAPI.getAll();
      setDonations(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load");
    }
  };

  const handleOpenModal = (item = null) => {
    if (item) {
      setIsEditing(true);
      setCurrent(item);
      setFormData({ ...item });
    } else {
      setIsEditing(false);
      setCurrent(null);
      setFormData({ title: '', category: 'blood', description: '', location: '', contactInfo: '', status: 'available' });
    }
    setShowModal(true);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await donationAPI.update(current._id || current.id, formData);
        toast.success("Updated");
      } else {
        await donationAPI.create(formData);
        toast.success("Added");
      }
      setShowModal(false);
      fetchDonations();
    } catch (err) {
      toast.error("Failed");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this donation?")) {
      try {
        await donationAPI.delete(id);
        toast.success("Deleted");
        fetchDonations();
      } catch (err) {
        toast.error("Failed");
      }
    }
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">Manage Medical Resources</h3>
        <button className="btn btn-primary" onClick={() => handleOpenModal()}><FaPlus className="me-2" /> Add Resource</button>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-4">Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-end pe-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(item => (
                <tr key={item._id || item.id}>
                  <td className="ps-4 fw-semibold">{item.title}</td>
                  <td><span className="badge bg-light text-dark border">{item.category}</span></td>
                  <td>{item.location}</td>
                  <td><span className={`badge ${item.status === 'available' ? 'bg-success' : 'bg-secondary'}`}>{item.status}</span></td>
                  <td className="text-end pe-4">
                    <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleOpenModal(item)}><FaEdit /></button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id || item.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{isEditing ? 'Edit' : 'Add'} Resource</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Title</label>
                    <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Category</label>
                      <select className="form-select" name="category" value={formData.category} onChange={handleChange}>
                        <option value="blood">Blood</option>
                        <option value="equipment">Equipment</option>
                        <option value="medicine">Medicine</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Status</label>
                      <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                        <option value="available">Available</option>
                        <option value="fulfilled">Fulfilled</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contact Info</label>
                    <input type="text" className="form-control" name="contactInfo" value={formData.contactInfo} onChange={handleChange} required />
                  </div>
                  <div className="mb-4">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" name="description" value={formData.description} onChange={handleChange} rows="3" required></textarea>
                  </div>
                  <div className="text-end">
                    <button type="button" className="btn btn-light me-2" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
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

export default AdminDonations;
