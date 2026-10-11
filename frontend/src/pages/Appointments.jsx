import React, { useState, useEffect } from 'react';
import { doctorAPI, appointmentAPI } from '../services/api';
import DoctorCard from '../components/appointments/DoctorCard';
import AppointmentList from '../components/appointments/AppointmentList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { FaSearch, FaFilter } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Appointments = () => {
  const [activeTab, setActiveTab] = useState('find'); // 'find' or 'my'
  
  // Find Doctors state
  const [doctors, setDoctors] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('');
  
  // My Appointments state
  const [myAppointments, setMyAppointments] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);

  useEffect(() => {
    fetchDoctors();
  }, [search, specialty]);

  useEffect(() => {
    if (activeTab === 'my') {
      fetchMyAppointments();
    }
  }, [activeTab]);

  const fetchDoctors = async () => {
    setLoadingDocs(true);
    try {
      const res = await doctorAPI.getAll({ search, specialty });
      const docs = res.data?.data || [];
      setDoctors(Array.isArray(docs) ? docs : []);
    } catch (err) {
      toast.error('Failed to fetch doctors');
    } finally {
      setLoadingDocs(false);
    }
  };

  const fetchMyAppointments = async () => {
    setLoadingAppts(true);
    try {
      const res = await appointmentAPI.getMy();
      const appts = res.data?.data || [];
      setMyAppointments(Array.isArray(appts) ? appts : []);
    } catch (err) {
      toast.error('Failed to fetch your appointments');
    } finally {
      setLoadingAppts(false);
    }
  };

  const handleCancelAppointment = async (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await appointmentAPI.cancel(id);
        toast.success("Appointment cancelled");
        fetchMyAppointments();
      } catch (err) {
        toast.error("Failed to cancel appointment");
      }
    }
  };

  // Extract unique specialties
  const specialties = [...new Set(doctors.map(d => d.specialty).filter(Boolean))];

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">Appointments</h2>
      
      <ul className="nav nav-pills mb-4 gap-2">
        <li className="nav-item">
          <button 
            className={`nav-link rounded-pill ${activeTab === 'find' ? 'active bg-primary-custom' : 'bg-light text-dark'}`}
            onClick={() => setActiveTab('find')}
          >
            Find Doctors
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link rounded-pill ${activeTab === 'my' ? 'active bg-primary-custom' : 'bg-light text-dark'}`}
            onClick={() => setActiveTab('my')}
          >
            My Appointments
          </button>
        </li>
      </ul>

      {activeTab === 'find' && (
        <div>
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-3 d-flex flex-column flex-md-row gap-3">
              <div className="input-group">
                <span className="input-group-text bg-light border-end-0"><FaSearch className="text-muted" /></span>
                <input 
                  type="text" 
                  className="form-control border-start-0 ps-0 bg-light" 
                  placeholder="Search doctor by name..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="input-group w-md-50">
                <span className="input-group-text bg-light border-end-0"><FaFilter className="text-muted" /></span>
                <select 
                  className="form-select border-start-0 ps-0 bg-light"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                >
                  <option value="">All Specialties</option>
                  {specialties.map((spec, idx) => (
                    <option key={idx} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {loadingDocs ? (
            <LoadingSpinner text="Finding doctors..." />
          ) : doctors.length > 0 ? (
            <div className="row g-4">
              {doctors.map(doc => (
                <div key={doc._id || doc.id} className="col-md-6 col-lg-3">
                  <DoctorCard doctor={doc} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5 bg-white rounded shadow-sm">
              <h5 className="text-muted">No doctors found matching your criteria.</h5>
            </div>
          )}
        </div>
      )}

      {activeTab === 'my' && (
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            {loadingAppts ? (
              <LoadingSpinner text="Loading your appointments..." />
            ) : (
              <AppointmentList 
                appointments={myAppointments} 
                onCancel={handleCancelAppointment} 
                isAdmin={false}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
