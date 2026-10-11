import React, { useState, useEffect } from 'react';
import { organDonationAPI } from '../services/api';
import { toast } from 'react-toastify';

const AdminOrganDonations = () => {
  const [pledges, setPledges] = useState([]);
  
  useEffect(() => {
    fetchPledges();
  }, []);

  const fetchPledges = async () => {
    try {
      const res = await organDonationAPI.getAll();
      setPledges(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load pledges");
    }
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await organDonationAPI.updateStatus(id, { status });
      toast.success(`Status updated to ${status}`);
      fetchPledges();
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Organ Donation Pledges</h3>
      
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">User</th>
                  <th>Age/Blood Group</th>
                  <th>Organ Type</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Update Status</th>
                </tr>
              </thead>
              <tbody>
                {pledges.map(item => (
                  <tr key={item._id || item.id}>
                    <td className="ps-4">
                      <div className="fw-semibold">{item.name}</div>
                      <small className="text-muted">{item.phone}</small>
                    </td>
                    <td>{item.age} yrs, {item.bloodGroup}</td>
                    <td className="fw-semibold text-primary">{item.organType}</td>
                    <td>{new Date(item.createdAt || Date.now()).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge ${item.status === 'contacted' ? 'bg-info' : item.status === 'reviewed' ? 'bg-primary' : item.status === 'withdrawn' ? 'bg-secondary' : 'bg-warning'}`}>
                        {item.status || 'pending'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      <select 
                        className="form-select form-select-sm d-inline-block w-auto" 
                        value={item.status || 'pending'}
                        onChange={(e) => handleUpdateStatus(item._id || item.id, e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="contacted">Contacted</option>
                        <option value="withdrawn">Withdrawn</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrganDonations;
