import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import '../../pages/AdminLogin.css';

const ApplicantLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      const redirectTo = location.state?.from?.pathname || '/applicant';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('Sign in failed. Please check your email and password.');
    }
  };

  const { toggleTheme, isLight } = useTheme();

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-section">
            <div className="brand-logo">
              <span className="brand-icon">🚦</span>
              <div className="brand-text">
                <h1 className="brand-title">PermitWise</h1>
                <p className="brand-subtitle">Applicant Portal</p>
              </div>
            </div>
          </div>
          <div className="theme-toggle-section">
            <button onClick={toggleTheme} className="theme-toggle-btn" title={`Switch to ${isLight ? 'dark' : 'light'} mode`}>
              {isLight ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img src="/departmentlogo.png" alt="Department Logo" style={{ height: 64 }} />
        </div>
        <div className="login-content">
          <h2 className="login-title">Applicant Sign In</h2>
          <p className="login-subtitle">Use your PermitWise account to continue.</p>

          <div style={{ marginBottom: 24, background: 'var(--background-light)', padding: 16, borderRadius: 8, border: '1px solid var(--card-border)' }}>
            <p style={{ margin: 0, color: 'var(--text)' }}>Are you with the Department of Transport?</p>
            <Link to="/admin/login" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Click here</Link>
          </div>

          {error && (
            <div className="error-message">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required />
            </div>
            <button type="submit" className="login-button">Sign in</button>
          </form>

          <div className="login-footer">
            <p className="footer-text">Don't have an account? <Link to="/applicant/signup" style={{ color: 'var(--primary)' }}>Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantLogin;