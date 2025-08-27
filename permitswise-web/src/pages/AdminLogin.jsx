import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginAsAdmin } = useAuth();
  const { toggleTheme, isLight } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await loginAsAdmin(email);
      const redirectTo = location.state?.from?.pathname || '/admin/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError('Sign in failed. Please check your credentials.');
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
                <p className="brand-subtitle">Department of Transport</p>
              </div>
            </div>
          </div>
          
          <div className="theme-toggle-section">
            <button 
              onClick={toggleTheme} 
              className="theme-toggle-btn"
              title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            >
              {isLight ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        <div className="login-content">
          <h2 className="login-title">Admin Portal</h2>
          <p className="login-subtitle">Sign in with your staff credentials to access the PermitWise administration system.</p>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@dot.gov.za" 
                required 
                className="form-input"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="Your password" 
                required 
                className="form-input"
              />
            </div>
            
            <button type="submit" className="login-button">
              Sign In to Admin Portal
            </button>
          </form>
          
          <div className="login-footer">
            <p className="footer-text">
              Secure access to permit management, analytics, and administrative functions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;