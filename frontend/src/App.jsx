import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';
import DoctorDetail from './pages/DoctorDetail';
import OrganDonation from './pages/OrganDonation';
import AvailableDonations from './pages/AvailableDonations';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminDoctors from './pages/AdminDoctors';
import AdminAppointments from './pages/AdminAppointments';
import AdminDonations from './pages/AdminDonations';
import AdminContacts from './pages/AdminContacts';
import AdminOrganDonations from './pages/AdminOrganDonations';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="donations" element={<AvailableDonations />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors/:id" element={<DoctorDetail />} />
          <Route path="organ-donation" element={<OrganDonation />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* Admin Routes */}
        <Route path="admin" element={<AdminRoute />}>
          <Route index element={<AdminDashboard />} />
          <Route path="doctors" element={<AdminDoctors />} />
          <Route path="appointments" element={<AdminAppointments />} />
          <Route path="donations" element={<AdminDonations />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="organ-donations" element={<AdminOrganDonations />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
