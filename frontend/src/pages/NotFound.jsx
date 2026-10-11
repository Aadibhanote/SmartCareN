import React from 'react';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="container py-5 text-center d-flex flex-column justify-content-center align-items-center min-vh-100" style={{ marginTop: '-80px' }}>
      <FaExclamationTriangle className="text-warning mb-4" style={{ fontSize: '80px' }} />
      <h1 className="display-4 fw-bold">404</h1>
      <h3 className="mb-4">Page Not Found</h3>
      <p className="text-muted mb-4" style={{ maxWidth: '500px' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" className="btn btn-primary px-4 py-2">
        Return to Home
      </Link>
    </div>
  );
};

export default NotFound;
