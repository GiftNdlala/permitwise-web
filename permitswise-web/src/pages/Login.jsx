import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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
      <div style={{ maxWidth: 520, width: '100%', background: isDark ? '#111827' : '#ffffff', borderRadius: 12, padding: 24, boxShadow: '0 10px 30px rgba(0,0,0,0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button onClick={toggleTheme} style={{ fontSize: 12, padding: '6px 10px', borderRadius: 6, border: '1px solid #374151', background: isDark ? '#0b1220' : '#ffffff', color: isDark ? '#cbd5e1' : '#374151', cursor: 'pointer' }}>{isDark ? 'Light mode' : 'Dark mode'}</button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
          <img src="/departmentlogo.png" alt="Department Logo" style={{ height: 64 }} />
        </div>
        <h1 style={{ marginBottom: 8 }}>PermitWise</h1>
        <p style={{ marginBottom: 24, color: isDark ? '#9ca3af' : '#6b7280' }}>Sign in to continue</p>

        <div style={{ marginBottom: 24, background: isDark ? '#0b1220' : '#f3f4f6', padding: 16, borderRadius: 8 }}>
          <p style={{ margin: 0, color: isDark ? '#cbd5e1' : '#374151' }}>Are you with the Department of Transport?</p>
          <Link to="/admin/login" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Click here</Link>
        </div>

        <div style={{ marginTop: 16 }}>
          <Link to="/applicant/login" style={{ display: 'block', width: '100%', background: '#2563eb', color: 'white', textAlign: 'center', padding: '12px 16px', borderRadius: 8, textDecoration: 'none' }}>Applicant Sign In</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;