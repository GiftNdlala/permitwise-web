import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Simple admin gate for demo: use role field set by demo auth
const isAdminUser = (user) => user && user.role === 'admin';

const RequireAdmin = ({ children }) => {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div style={{ color: 'white', padding: 24 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  if (!isAdminUser(user)) {
    return <Navigate to="/applicant" replace />;
  }

  return children;
};

export default RequireAdmin;

