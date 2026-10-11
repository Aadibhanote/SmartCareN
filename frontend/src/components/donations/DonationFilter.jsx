import React from 'react';
import { FaFilter, FaTimes } from 'react-icons/fa';

const DonationFilter = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleClear = () => {
    setFilters({ category: '', status: '' });
  };

  return (
    <div className="card border-0 shadow-sm mb-4">
      <div className="card-body p-3 d-flex flex-column flex-md-row align-items-center gap-3">
        <div className="d-flex align-items-center text-muted fw-semibold me-md-3">
          <FaFilter className="me-2" /> Filters
        </div>
        
        <select 
          className="form-select w-auto flex-grow-1"
          name="category"
          value={filters.category}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          <option value="blood">Blood</option>
          <option value="equipment">Medical Equipment</option>
          <option value="medicine">Medicine</option>
          <option value="other">Other</option>
        </select>
        
        <select 
          className="form-select w-auto flex-grow-1"
          name="status"
          value={filters.status}
          onChange={handleChange}
        >
          <option value="">All Statuses</option>
          <option value="available">Available</option>
          <option value="fulfilled">Fulfilled</option>
        </select>
        
        <button 
          className="btn btn-outline-secondary d-flex align-items-center"
          onClick={handleClear}
          disabled={!filters.category && !filters.status}
        >
          <FaTimes className="me-1" /> Clear
        </button>
      </div>
    </div>
  );
};

export default DonationFilter;
