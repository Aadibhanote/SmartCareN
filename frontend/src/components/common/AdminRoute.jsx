import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const AdminRoute = () => {
  const { isAdmin, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  
  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;
