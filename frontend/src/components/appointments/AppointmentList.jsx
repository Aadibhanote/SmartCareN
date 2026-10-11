import React from 'react';
import { FaCalendarAlt, FaClock, FaUserMd, FaTimes, FaCheck } from 'react-icons/fa';

const AppointmentList = ({ appointments, onCancel, isAdmin }) => {
  if (!appointments || appointments.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted mb-0">No appointments found.</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return <span className="badge bg-success-subtle text-success">Confirmed</span>;
      case 'cancelled': return <span className="badge bg-danger-subtle text-danger">Cancelled</span>;
      case 'completed': return <span className="badge bg-primary-subtle text-primary">Completed</span>;
      default: return <span className="badge bg-warning-subtle text-warning">Pending</span>;
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>{isAdmin ? 'Patient' : 'Doctor'}</th>
            <th>Date & Time</th>
            <th>Status</th>
            <th>Reason</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appt) => (
            <tr key={appt._id || appt.id}>
              <td>
                <div className="d-flex align-items-center">
                  <div className="bg-light rounded-circle p-2 me-3 text-primary">
                    {isAdmin ? <FaUserMd /> : <FaUserMd />}
                  </div>
                  <div>
                    <h6 className="mb-0 fw-semibold">
                      {isAdmin ? appt.patient?.name : `Dr. ${appt.doctor?.name || 'Unknown'}`}
                    </h6>
                    {isAdmin && <small className="text-muted">{appt.doctor?.name}</small>}
                  </div>
                </div>
              </td>
              <td>
                <div className="d-flex flex-column">
                  <span className="mb-1"><FaCalendarAlt className="text-muted me-2" /> {new Date(appt.appointmentDate).toLocaleDateString()}</span>
                  <span><FaClock className="text-muted me-2" /> {appt.timeSlot}</span>
                </div>
              </td>
              <td>{getStatusBadge(appt.status)}</td>
              <td><span className="text-truncate d-inline-block" style={{ maxWidth: '150px' }} title={appt.reason}>{appt.reason}</span></td>
              <td className="text-end">
                {(!appt.status || appt.status.toLowerCase() === 'pending' || appt.status.toLowerCase() === 'confirmed') && onCancel && (
                  <button 
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onCancel(appt._id || appt.id)}
                    title="Cancel Appointment"
                  >
                    <FaTimes className="me-1" /> Cancel
                  </button>
                )}
                {isAdmin && (!appt.status || appt.status.toLowerCase() === 'pending') && (
                  <button className="btn btn-sm btn-outline-success ms-2" title="Confirm">
                    <FaCheck />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
