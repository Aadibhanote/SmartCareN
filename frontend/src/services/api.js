import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

// Response interceptor for auth errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle session expiry
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => API.post('/auth/register', data),
  login: (data) => API.post('/auth/login', data),
  logout: () => API.post('/auth/logout'),
  getMe: () => API.get('/auth/me'),
  updateProfile: (data) => API.patch('/auth/profile', data),
  changePassword: (data) => API.patch('/auth/change-password', data),
};

// Doctor APIs
export const doctorAPI = {
  getAll: (params) => API.get('/doctors', { params }),
  getById: (id) => API.get(`/doctors/${id}`),
  create: (data) => API.post('/doctors', data),
  update: (id, data) => API.patch(`/doctors/${id}`, data),
  delete: (id) => API.delete(`/doctors/${id}`),
};

// Appointment APIs
export const appointmentAPI = {
  create: (data) => API.post('/appointments', data),
  getMy: () => API.get('/appointments/my'),
  getById: (id) => API.get(`/appointments/${id}`),
  cancel: (id) => API.patch(`/appointments/${id}/cancel`),
  getAll: (params) => API.get('/appointments/all', { params }),
  updateStatus: (id, data) => API.patch(`/appointments/${id}/status`, data),
};

// Donation APIs
export const donationAPI = {
  getAll: (params) => API.get('/donations', { params }),
  getById: (id) => API.get(`/donations/${id}`),
  create: (data) => API.post('/donations', data),
  update: (id, data) => API.patch(`/donations/${id}`, data),
  delete: (id) => API.delete(`/donations/${id}`),
};

// Organ Donation APIs
export const organDonationAPI = {
  create: (data) => API.post('/organ-donations', data),
  getMy: () => API.get('/organ-donations/my'),
  getAll: (params) => API.get('/organ-donations/all', { params }),
  updateStatus: (id, data) => API.patch(`/organ-donations/${id}/status`, data),
};

// Contact APIs
export const contactAPI = {
  create: (data) => API.post('/contact', data),
  getAll: (params) => API.get('/contact', { params }),
  update: (id, data) => API.patch(`/contact/${id}`, data),
};

// Admin APIs
export const adminAPI = {
  getDashboard: () => API.get('/admin/dashboard'),
};

// Chat API
export const chatAPI = {
  send: (data) => API.post('/chat', data),
};

export default API;
