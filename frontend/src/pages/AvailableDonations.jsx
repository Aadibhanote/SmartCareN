import React, { useState, useEffect } from 'react';
import { donationAPI } from '../services/api';
import DonationCard from '../components/donations/DonationCard';
import DonationFilter from '../components/donations/DonationFilter';
import LoadingSpinner from '../components/common/LoadingSpinner';

const AvailableDonations = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ category: '', status: 'available' });

  useEffect(() => {
    fetchDonations();
  }, [filters]);

  const fetchDonations = async () => {
    setLoading(true);
    try {
      // Remove empty filters
      const activeFilters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));
      const res = await donationAPI.getAll(activeFilters);
      const docs = res.data?.data || [];
      setDonations(Array.isArray(docs) ? docs : []);
    } catch (err) {
      console.error("Failed to fetch donations", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="mb-5 text-center">
        <h2 className="fw-bold">Medical Resources Hub</h2>
        <p className="text-muted">Find blood donors, medical equipment, and medicines available in your area.</p>
      </div>

      <DonationFilter filters={filters} setFilters={setFilters} />

      {loading ? (
        <LoadingSpinner text="Loading resources..." />
      ) : donations.length > 0 ? (
        <div className="row g-4">
          {donations.map((donation) => (
            <div key={donation._id || donation.id} className="col-md-6 col-lg-4">
              <DonationCard donation={donation} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 bg-white rounded shadow-sm mt-4">
          <h5 className="text-muted mb-0">No resources found matching your filters.</h5>
        </div>
      )}
    </div>
  );
};

export default AvailableDonations;
