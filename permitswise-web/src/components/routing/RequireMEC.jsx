import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const isMECUser = (user) => user && user.role === 'mec';

const RequireMEC = ({ children }) => {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div style={{ color: 'var(--text)', padding: 24 }}>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/mec/login" replace state={{ from: location }} />;
  }

  if (!isMECUser(user)) {
    return <Navigate to="/applicant" replace />;
  }

  return children;
};

export default RequireMEC;

