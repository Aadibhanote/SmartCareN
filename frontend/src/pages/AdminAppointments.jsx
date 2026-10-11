import React, { useState, useEffect } from 'react';
import { appointmentAPI } from '../services/api';
import { toast } from 'react-toastify';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, [filter]);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const res = await appointmentAPI.getAll(filter ? { status: filter } : {});
      setAppointments(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await appointmentAPI.updateStatus(id, { status });
      toast.success(`Status updated to ${status}`);
      fetchAppointments();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-warning text-dark',
      confirmed: 'bg-primary',
      completed: 'bg-success',
      cancelled: 'bg-danger'
    };
    return badges[status] || 'bg-secondary';
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold mb-0">All Appointments</h3>
        <select className="form-select w-auto" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th className="text-end pe-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      {loading ? 'Loading appointments...' : 'No appointments found'}
                    </td>
                  </tr>
                ) : (
                  appointments.map((appt) => {
                    const id = appt._id || appt.id;
                    const formattedDate = appt.appointmentDate
                      ? new Date(appt.appointmentDate).toLocaleDateString()
                      : 'N/A';
                    const patientName = appt.patient?.name || appt.patientName || appt.user?.name || 'N/A';
                    const doctorName = appt.doctor?.name || appt.doctorName || 'N/A';

                    return (
                      <tr key={id}>
                        <td className="ps-4 fw-semibold">{patientName}</td>
                        <td>{doctorName}</td>
                        <td>{formattedDate}</td>
                        <td>{appt.timeSlot || appt.time || 'N/A'}</td>
                        <td>
                          <span className={`badge ${getStatusBadge(appt.status)}`}>
                            {appt.status}
                          </span>
                        </td>
                        <td>{appt.reason || 'N/A'}</td>
                        <td className="text-end pe-4">
                          <select
                            className="form-select form-select-sm d-inline-block w-auto"
                            value={appt.status}
                            onChange={(e) => handleStatusUpdate(id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAppointments;
