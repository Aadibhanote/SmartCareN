import React from 'react';

const AlertMessage = ({ variant = 'info', message, dismissible = true, onClose }) => {
  return (
    <div className={`alert alert-${variant} ${dismissible ? 'alert-dismissible' : ''} fade show`} role="alert">
      {message}
      {dismissible && (
        <button type="button" className="btn-close" onClick={onClose} data-bs-dismiss="alert" aria-label="Close"></button>
      )}
    </div>
  );
};

export default AlertMessage;
