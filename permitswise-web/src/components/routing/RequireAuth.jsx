import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RequireAuth = ({ children }) => {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return (
      <div style={{ color: 'white', padding: 24 }}>Loading...</div>
    );
  }

  if (!user) {
    return <Navigate to="/applicant/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;

