import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ApplicantSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await signup(email, password, fullName);
      navigate('/applicant', { replace: true });
    } catch (err) {
      setError('Sign up failed. The email may already be in use.');
    }
  };

  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('loginTheme') || 'dark'; } catch { return 'dark'; }
  });
  const isDark = theme === 'dark';
  const toggleTheme = () => {
    const next = isDark ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('loginTheme', next); } catch {}
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: isDark ? '#0f172a' : '#f3f4f6', color: isDark ? 'white' : '#111827', padding: 24 }}>
      <div style={{ maxWidth: 560, width: '100%', background: isDark ? '#111827' : '#ffffff', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button onClick={toggleTheme} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 6, border: '1px solid #374151', background: isDark ? '#0b1220' : '#ffffff', color: isDark ? '#cbd5e1' : '#374151', cursor: 'pointer' }}>{isDark ? 'Light mode' : 'Dark mode'}</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img src="/departmentlogo.png" alt="Department Logo" style={{ height: 64 }} />
        </div>
        <h1 style={{ marginBottom: 8 }}>Create your PermitWise account</h1>
        <p style={{ marginBottom: 24, color: isDark ? '#9ca3af' : '#6b7280' }}>Sign up to start your application.</p>

        {error && (
          <div style={{ background: isDark ? '#451a1a' : '#fef2f2', border: '1px solid #7f1d1d', color: isDark ? '#fecaca' : '#7f1d1d', padding: 10, borderRadius: 8, marginBottom: 12 }}>{error}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Full Name</label>
              <input required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: isDark ? '#0b1220' : '#ffffff', color: isDark ? 'white' : '#111827' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Email</label>
              <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: isDark ? '#0b1220' : '#ffffff', color: isDark ? 'white' : '#111827' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Password</label>
              <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: isDark ? '#0b1220' : '#ffffff', color: isDark ? 'white' : '#111827' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Confirm Password</label>
              <input required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your password" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: isDark ? '#0b1220' : '#ffffff', color: isDark ? 'white' : '#111827' }} />
            </div>
          </div>

          <button type="submit" style={{ display: 'block', width: '100%', marginTop: 16, background: '#16a34a', color: 'white', textAlign: 'center', padding: '12px 16px', borderRadius: 8, border: 'none' }}>Create account</button>
        </form>

        <div style={{ marginTop: 16, textAlign: 'center' }}>
          <span style={{ color: isDark ? '#9ca3af' : '#6b7280' }}>Already have an account? </span>
          <Link to="/applicant/login" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Sign in</Link>
        </div>
      </div>
    </div>
  );
};

export default ApplicantSignup;