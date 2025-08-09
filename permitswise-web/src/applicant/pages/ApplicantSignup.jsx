import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ApplicantSignup = () => {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white', padding: 24 }}>
      <div style={{ maxWidth: 560, width: '100%', background: '#111827', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
        <h1 style={{ marginBottom: 8 }}>Create your PermitWise account</h1>
        <p style={{ marginBottom: 24, color: '#9ca3af' }}>Sign up to start your application.</p>

        <form onSubmit={(e) => { e.preventDefault(); navigate('/applicant'); }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Full Name</label>
              <input required type="text" placeholder="Enter your full name" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0b1220', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Email</label>
              <input required type="email" placeholder="you@example.com" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0b1220', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Password</label>
              <input required type="password" placeholder="Create a password" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0b1220', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Confirm Password</label>
              <input required type="password" placeholder="Repeat your password" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0b1220', color: 'white' }} />
            </div>
          </div>

          <button type="submit" style={{ display: 'block', width: '100%', marginTop: 16, background: '#16a34a', color: 'white', textAlign: 'center', padding: '12px 16px', borderRadius: 8, border: 'none' }}>Create account</button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span style={{ color: '#9ca3af' }}>Already have an account? </span>
          <Link to="/applicant/login" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantSignup;