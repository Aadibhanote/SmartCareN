import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { appointmentAPI, organDonationAPI } from '../services/api';
import AppointmentList from '../components/appointments/AppointmentList';
import { FaUserCircle, FaEnvelope, FaPhone } from 'react-icons/fa';

const Profile = () => {
  const { user, updateProfile, changePassword, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('info'); // info, security, appointments, donations
  
  // Profile Info
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    profileImage: user?.profileImage || ''
  });
  const [savingInfo, setSavingInfo] = useState(false);

  // Security
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [savingPwd, setSavingPwd] = useState(false);

  // Data
  const [appointments, setAppointments] = useState([]);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    if (activeTab === 'appointments') {
      appointmentAPI.getMy().then(res => setAppointments(res.data?.data || [])).catch(console.error);
    } else if (activeTab === 'donations') {
      organDonationAPI.getMy().then(res => setDonations(res.data?.data || [])).catch(console.error);
    }
  }, [activeTab]);

  const handleInfoChange = (e) => setProfileData({ ...profileData, [e.target.name]: e.target.value });
  const handlePwdChange = (e) => setPasswordData({ ...passwordData, [e.target.name]: e.target.value });

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    setSavingInfo(true);
    await updateProfile(profileData);
    setSavingInfo(false);
  };

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    setSavingPwd(true);
    const success = await changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword });
    setSavingPwd(false);
    if (success) setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card border-0 shadow-sm text-center mb-4">
            <div className="card-body p-4">
              <FaUserCircle className="text-primary-custom mb-3" style={{ fontSize: '80px' }} />
              <h5 className="fw-bold mb-1">{user?.name}</h5>
              <p className="text-muted small mb-0">{user?.role === 'admin' ? 'Administrator' : 'Patient'}</p>
            </div>
          </div>
          
          <div className="list-group shadow-sm border-0">
            <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'info' ? 'active bg-primary-custom' : ''}`} onClick={() => setActiveTab('info')}>
              Personal Information
            </button>
            <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'security' ? 'active bg-primary-custom' : ''}`} onClick={() => setActiveTab('security')}>
              Security
            </button>
            <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'appointments' ? 'active bg-primary-custom' : ''}`} onClick={() => setActiveTab('appointments')}>
              My Appointments
            </button>
            <button className={`list-group-item list-group-item-action border-0 ${activeTab === 'donations' ? 'active bg-primary-custom' : ''}`} onClick={() => setActiveTab('donations')}>
              Organ Donation Pledges
            </button>
            <button className="list-group-item list-group-item-action border-0 text-danger" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
        
        <div className="col-lg-9">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 p-md-5">
              {activeTab === 'info' && (
                <div>
                  <h4 className="fw-bold mb-4">Personal Information</h4>
                  <form onSubmit={handleInfoSubmit}>
                    <div className="mb-3">
                      <label className="form-label text-muted">Email (Cannot be changed)</label>
                      <input type="email" className="form-control bg-light" value={user?.email || ''} disabled readOnly />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-control" name="name" value={profileData.name} onChange={handleInfoChange} required />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Phone Number</label>
                      <input type="text" className="form-control" name="phone" value={profileData.phone} onChange={handleInfoChange} />
                    </div>
                    <button type="submit" className="btn btn-primary px-4" disabled={savingInfo}>
                      {savingInfo ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h4 className="fw-bold mb-4">Change Password</h4>
                  <form onSubmit={handlePwdSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Current Password</label>
                      <input type="password" className="form-control" name="currentPassword" value={passwordData.currentPassword} onChange={handlePwdChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-control" name="newPassword" value={passwordData.newPassword} onChange={handlePwdChange} required minLength="6" />
                    </div>
                    <div className="mb-4">
                      <label className="form-label">Confirm New Password</label>
                      <input type="password" className="form-control" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePwdChange} required minLength="6" />
                    </div>
                    <button type="submit" className="btn btn-primary px-4" disabled={savingPwd}>
                      {savingPwd ? "Updating..." : "Update Password"}
                    </button>
                  </form>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div>
                  <h4 className="fw-bold mb-4">My Appointments</h4>
                  <AppointmentList appointments={appointments} isAdmin={false} />
                </div>
              )}

              {activeTab === 'donations' && (
                <div>
                  <h4 className="fw-bold mb-4">My Organ Donation Pledges</h4>
                  {donations.length > 0 ? (
                    <div className="list-group">
                      {donations.map((item, idx) => (
                         <div key={idx} className="list-group-item d-flex justify-content-between align-items-center py-3">
                           <div>
                             <h6 className="mb-1">{item.organType}</h6>
                             <small className="text-muted">Submitted on: {new Date(item.createdAt || Date.now()).toLocaleDateString()}</small>
                           </div>
                           <span className={`badge ${item.status === 'pending' ? 'bg-warning' : item.status === 'contacted' ? 'bg-info' : 'bg-success'}`}>
                             {item.status || 'Pending'}
                           </span>
                         </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted">No pledges found.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
