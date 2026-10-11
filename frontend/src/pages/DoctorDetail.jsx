import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doctorAPI } from '../services/api';
import LoadingSpinner from '../components/common/LoadingSpinner';
import AppointmentForm from '../components/appointments/AppointmentForm';
import { FaUserMd, FaGraduationCap, FaBriefcase, FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';

const DoctorDetail = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await doctorAPI.getById(id);
        setDoctor(res.data?.data || null);
      } catch (err) {
        toast.error("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) return <LoadingSpinner text="Loading profile..." />;
  if (!doctor) return <div className="container py-5 text-center"><h2>Doctor not found</h2><Link to="/appointments" className="btn btn-primary mt-3">Back to Doctors</Link></div>;

  return (
    <div className="container py-5">
      <Link to="/appointments" className="btn btn-link text-decoration-none p-0 mb-4 d-inline-flex align-items-center">
        <FaArrowLeft className="me-2" /> Back to Doctors
      </Link>
      
      <div className="row g-4">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4 p-md-5">
              <div className="d-flex flex-column flex-md-row gap-4 align-items-center align-items-md-start mb-4">
                <div className="bg-primary-custom text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '120px', height: '120px', fontSize: '48px' }}>
                  {doctor.profileImage ? (
                    <img src={doctor.profileImage} alt={doctor.name} className="w-100 h-100 rounded-circle object-fit-cover" />
                  ) : (
                    <FaUserMd />
                  )}
                </div>
                <div className="text-center text-md-start">
                  <h2 className="fw-bold mb-1">Dr. {doctor.name}</h2>
                  <h5 className="text-primary-custom mb-3">{doctor.specialty}</h5>
                  <div className="d-flex flex-wrap justify-content-center justify-content-md-start gap-3 text-muted">
                    <span className="d-flex align-items-center"><FaGraduationCap className="me-2" /> {doctor.qualifications || 'MBBS, MD'}</span>
                    <span className="d-flex align-items-center"><FaBriefcase className="me-2" /> {doctor.experience} Years Experience</span>
                    <span className="d-flex align-items-center"><FaMoneyBillWave className="me-2" /> Consultation: ${doctor.consultationFee}</span>
                  </div>
                </div>
              </div>
              
              <hr className="my-4" />
              
              <h5 className="fw-bold mb-3">About</h5>
              <p className="text-muted" style={{ lineHeight: '1.8' }}>
                {doctor.bio || `Dr. ${doctor.name} is a highly experienced ${doctor.specialty} dedicated to providing the best possible care to patients. With over ${doctor.experience} years of clinical experience, they have developed a strong reputation for excellence in their field.`}
              </p>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4">
          <AppointmentForm doctor={doctor} />
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
