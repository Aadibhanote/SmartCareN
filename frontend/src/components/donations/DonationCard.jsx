import React from 'react';
import { FaMapMarkerAlt, FaCalendarAlt, FaTint, FaWheelchair, FaPills, FaBoxOpen } from 'react-icons/fa';

const DonationCard = ({ donation }) => {
  const getIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'blood': return <FaTint className="text-danger" />;
      case 'equipment': return <FaWheelchair className="text-primary" />;
      case 'medicine': return <FaPills className="text-success" />;
      default: return <FaBoxOpen className="text-info" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case 'blood': return 'danger';
      case 'equipment': return 'primary';
      case 'medicine': return 'success';
      default: return 'info';
    }
  };

  return (
    <div className="card h-100 border-0 shadow-sm">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <h5 className="card-title fw-bold mb-0 text-truncate" style={{ maxWidth: '70%' }} title={donation.title}>
            {donation.title}
          </h5>
          <span className={`badge bg-${getCategoryColor(donation.category)}-subtle text-${getCategoryColor(donation.category)} d-flex align-items-center gap-1`}>
            {getIcon(donation.category)} {donation.category || 'Other'}
          </span>
        </div>
        
        <p className="card-text text-muted mb-4" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {donation.description}
        </p>
        
        <div className="mb-4">
          <div className="d-flex align-items-center text-muted small mb-2">
            <FaMapMarkerAlt className="me-2 text-primary" />
            {donation.location}
          </div>
          <div className="d-flex align-items-center text-muted small">
            <FaCalendarAlt className="me-2 text-primary" />
            Posted: {new Date(donation.createdAt || Date.now()).toLocaleDateString()}
          </div>
        </div>
        
        <hr className="text-muted opacity-25" />
        
        <div className="d-flex justify-content-between align-items-center">
          <span className={`badge ${donation.status === 'available' ? 'bg-success' : 'bg-secondary'}`}>
            {donation.status === 'available' ? 'Available' : 'Fulfilled'}
          </span>
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => alert(`Contact info: ${donation.contactInfo || 'Please login to view contact info'}`)}
            disabled={donation.status !== 'available'}
          >
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationCard;
