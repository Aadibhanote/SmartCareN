import React, { useState, useEffect } from 'react';
import { contactAPI } from '../services/api';
import { toast } from 'react-toastify';
import { FaCheck, FaEnvelopeOpenText } from 'react-icons/fa';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await contactAPI.getAll();
      setContacts(res.data?.data || []);
    } catch (err) {
      toast.error("Failed to load contacts");
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await contactAPI.update(id, { isRead: true });
      toast.success("Marked as read");
      fetchContacts();
    } catch (err) {
      toast.error("Failed");
    }
  };

  return (
    <div className="container py-4">
      <h3 className="fw-bold mb-4">Contact Messages</h3>
      
      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th className="ps-4">Sender</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th className="text-end pe-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map(item => (
                  <tr key={item._id || item.id} className={!item.isRead ? 'fw-semibold bg-light' : ''}>
                    <td className="ps-4">
                      <div>{item.name}</div>
                      <small className="text-muted fw-normal">{item.email}</small>
                    </td>
                    <td>{item.subject}</td>
                    <td><span className="d-inline-block text-truncate" style={{maxWidth: '200px'}} title={item.message}>{item.message}</span></td>
                    <td>
                      <span className={`badge ${item.isRead ? 'bg-secondary' : 'bg-primary'}`}>
                        {item.isRead ? 'Read' : 'New'}
                      </span>
                    </td>
                    <td className="text-end pe-4">
                      {!item.isRead && (
                        <button className="btn btn-sm btn-outline-success" onClick={() => handleMarkRead(item._id || item.id)} title="Mark as Read">
                          <FaCheck />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminContacts;
