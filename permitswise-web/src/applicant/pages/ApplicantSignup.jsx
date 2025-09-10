import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import '../../pages/AdminLogin.css';

const ApplicantSignup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const { toggleTheme, isLight } = useTheme();
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
        <div className="login-content">
          <h2 className="login-title">Create your PermitWise account</h2>
          <p className="login-subtitle">Sign up to start your application.</p>

          {error && (
            <div className="error-message">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" required type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your full name" />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input className="form-input" required type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat your password" />
            </div>
            <button type="submit" className="login-button">Create account</button>
          </form>

          <div className="login-footer">
            <p className="footer-text">Already have an account? <Link to="/applicant/login" style={{ color: 'var(--primary)' }}>Sign in</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantSignup;