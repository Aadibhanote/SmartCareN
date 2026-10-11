import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminAPI } from '../services/api';
import { FaUsers, FaUserMd, FaCalendarCheck, FaHandHoldingHeart, FaBoxOpen, FaEnvelope } from 'react-icons/fa';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await adminAPI.getDashboard();
        setStats(res.data?.data || {
          users: 0, doctors: 0, appointments: { total: 0, pending: 0 }, donations: 0, organDonations: 0, messages: 0
        });
      } catch (err) {
        console.error(err);
        // Fallback for demo
        setStats({ users: 15, doctors: 8, appointments: { total: 42, pending: 5 }, donations: 12, organDonations: 3, messages: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <LoadingSpinner text="Loading dashboard..." />;

  const cards = [
    { title: "Total Users", value: stats?.users, icon: <FaUsers />, color: "primary", link: "#" },
    { title: "Doctors", value: stats?.doctors, icon: <FaUserMd />, color: "info", link: "/admin/doctors" },
    { title: "Appointments", value: stats?.appointments?.total, icon: <FaCalendarCheck />, color: "success", link: "/admin/appointments" },
    { title: "Pending Appts", value: stats?.appointments?.pending, icon: <FaCalendarCheck />, color: "warning", link: "/admin/appointments" },
    { title: "Active Donations", value: stats?.donations, icon: <FaBoxOpen />, color: "danger", link: "/admin/donations" },
    { title: "Organ Pledges", value: stats?.organDonations, icon: <FaHandHoldingHeart />, color: "secondary", link: "/admin/organ-donations" },
    { title: "Messages", value: stats?.messages || 0, icon: <FaEnvelope />, color: "dark", link: "/admin/contacts" },
  ];

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Admin Dashboard</h2>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <Link to="/admin/doctors" className="btn btn-outline-primary">Manage Doctors</Link>
        <Link to="/admin/appointments" className="btn btn-outline-success">Manage Appointments</Link>
        <Link to="/admin/donations" className="btn btn-outline-danger">Manage Donations</Link>
        <Link to="/admin/organ-donations" className="btn btn-outline-warning">Organ Pledges</Link>
        <Link to="/admin/contacts" className="btn btn-outline-dark">Messages</Link>
      </div>
      
      <div className="row g-4">
        {cards.map((card, idx) => (
          <div key={idx} className="col-md-4 col-lg-3">
            <Link to={card.link} className="text-decoration-none">
              <div className={`card border-0 shadow-sm h-100 bg-${card.color} text-white`}>
                <div className="card-body p-4 d-flex justify-content-between align-items-center">
                  <div>
                    <h6 className="opacity-75 mb-1">{card.title}</h6>
                    <h3 className="fw-bold mb-0">{card.value || 0}</h3>
                  </div>
                  <div className="opacity-50" style={{ fontSize: '40px' }}>
                    {card.icon}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
