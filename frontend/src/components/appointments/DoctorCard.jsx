import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaStar, FaMoneyBillWave, FaClock } from 'react-icons/fa';

const DoctorCard = ({ doctor }) => {
  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body text-center p-4">
        <div className="avatar-placeholder bg-primary-custom text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '80px', height: '80px', fontSize: '32px' }}>
          {doctor.profileImage ? (
            <img src={doctor.profileImage} alt={doctor.name} className="w-100 h-100 rounded-circle object-fit-cover" />
          ) : (
            <FaUserMd />
          )}
        </div>
        <h5 className="card-title fw-bold mb-1">Dr. {doctor.name}</h5>
        <p className="text-primary-custom fw-semibold mb-2">{doctor.specialty}</p>
        
        <div className="d-flex justify-content-center gap-3 mb-3 text-muted small">
          <span className="d-flex align-items-center"><FaClock className="me-1" /> {doctor.experience} Yrs</span>
          <span className="d-flex align-items-center"><FaMoneyBillWave className="me-1" /> ${doctor.consultationFee}</span>
        </div>
        
        <div className="mb-4">
          <span className={`badge ${doctor.isAvailable !== false ? 'bg-success-subtle text-success' : 'bg-danger-subtle text-danger'} rounded-pill px-3`}>
            {doctor.isAvailable !== false ? 'Available' : 'Unavailable'}
          </span>
        </div>
        
        <Link to={`/doctors/${doctor._id || doctor.id}`} className="btn btn-outline-primary w-100 rounded-pill">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default DoctorCard;
