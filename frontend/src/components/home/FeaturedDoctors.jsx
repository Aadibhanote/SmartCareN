import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { doctorAPI } from '../../services/api';
import DoctorCard from '../appointments/DoctorCard';
import LoadingSpinner from '../common/LoadingSpinner';

const FeaturedDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await doctorAPI.getAll({ limit: 4 });
        const docs = res.data?.data || [];
        setDoctors(Array.isArray(docs) ? docs.slice(0, 4) : []);
      } catch (err) {
        console.error("Failed to fetch featured doctors", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  if (loading) return <LoadingSpinner text="Loading featured doctors..." />;
  if (doctors.length === 0) return null; // Don't show section if no doctors

  return (
    <section className="py-5 bg-white">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <h2 className="fw-bold mb-0">Featured Specialists</h2>
            <p className="text-muted mt-2 mb-0">Top-rated doctors ready to help you</p>
          </div>
          <Link to="/appointments" className="btn btn-outline-primary d-none d-md-inline-block">
            View All Doctors
          </Link>
        </div>
        
        <div className="row g-4">
          {doctors.map(doctor => (
            <div key={doctor._id || doctor.id} className="col-md-6 col-lg-3">
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4 d-md-none">
          <Link to="/appointments" className="btn btn-outline-primary w-100">
            View All Doctors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDoctors;
