import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ApplicantLogin = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', padding: 24 }}>
      <div style={{ maxWidth: 520, width: '100%', background: '#111827', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
        <h1 style={{ marginBottom: 8 }}>Applicant Sign In</h1>
        <p style={{ marginBottom: 24, color: '#9ca3af' }}>Use your PermitWise account to continue.</p>

        <div style={{ marginBottom: 24, background: '#0b1220', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: 0, color: '#cbd5e1' }}>Are you with the Department of Transport?</p>
          <Link to="/admin/login" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Click here</Link>
        </div>

        <button onClick={() => navigate('/applicant')} style={{ display: 'block', width: '100%', background: '#16a34a', color: 'white', textAlign: 'center', padding: '12px 16px', borderRadius: 8, border: 'none' }}>Continue</button>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span style={{ color: '#9ca3af' }}>Don't have an account? </span>
          <Link to="/applicant/signup" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantLogin;