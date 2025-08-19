import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Simple admin gate: check email domain contains dot.gov
const isAdminUser = (user) => {
  if (!user || !user.email) return false;
  return user.email.endsWith('@dot.gov') || user.email.endsWith('@transport.gov');
};

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

