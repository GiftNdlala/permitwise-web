import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MdSearch, 
  MdNotifications, 
  MdPerson, 
  MdStar,
  MdLightMode
} from 'react-icons/md';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const [theme, setTheme] = useState(() => (document.documentElement.getAttribute('data-theme') || 'dark'));
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [chatMessages, setChatMessages] = useState([{ role: 'assistant', text: 'Hi, I am Maestro. How can I assist you?' }]);
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const notifications = useMemo(() => ([
    { id: 1, text: 'New application received: APP-2025-006', time: '2m ago' },
    { id: 2, text: 'Payment pending for APP-2025-002', time: '1h ago' },
    { id: 3, text: 'Profile updated successfully', time: '3h ago' }
  ]), []);

  const getPageTitle = () => {
    const path = location.pathname;
    // Admin
    if (path === '/admin/dashboard') return 'Dashboard';
    if (path.startsWith('/admin/permits')) {
      if (path === '/admin/permits/new') return 'New Permit';
      if (path === '/admin/permits/list') return 'Permits List';
      if (path === '/admin/permits/amendment') return 'Permit Amendment';
      if (path === '/admin/permits/renewal') return 'Permit Renewal';
      if (path === '/admin/permits/transfer') return 'Permit Transfer';
      if (path === '/admin/permits/conversion') return 'Permit Conversion';
      return 'Permits';
    }
    if (path === '/admin/licences') return 'Licences';
    if (path === '/admin/workflows') return 'Workflows';
    if (path === '/admin/notifications') return 'Notifications';
    if (path === '/admin/payments') return 'Payments';
    if (path === '/admin/analytics') return 'Analytics';
    if (path === '/admin/settings') return 'Settings';
    if (path === '/admin/users') return 'User Management';

    // Applicant
    if (path.startsWith('/applicant')) {
      if (path === '/applicant/applications') return 'My Applications';
      if (path === '/applicant/applications/new') return 'Select Application Type';
      if (path.startsWith('/applicant/applications/new/')) return 'Application Form';
      if (path === '/applicant/profile') return 'Profile';
      if (path === '/applicant/help') return 'Help & Support';
      return 'Applicant Portal';
    }

    return 'PermitWise';
  };

  const getPageIcon = () => {
    const path = location.pathname;
    if (path.startsWith('/admin/permits') || path.startsWith('/applicant/applications')) return '📄';
    if (path === '/admin/dashboard') return '📊';
    if (path.endsWith('/settings')) return '⚙️';
    return '📋';
  };

  return (
    <header className="header">
      <div className="header-left">
        <div className="page-title-container">
          <span className="page-icon">{getPageIcon()}</span>
          <h1 className="page-title">{getPageTitle()}</h1>
        </div>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <MdSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Q Search for anything..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right" style={{ position: 'relative' }}>
        <button className="header-button ai-button" onClick={() => { setShowChat((v) => !v); setShowNotifications(false); setShowProfile(false); }}>
          <MdStar className="header-icon" />
          <span className="button-text">Ask Maestro AI</span>
        </button>
        
        <button className="header-button theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle theme">
          <MdLightMode className="header-icon" />
        </button>
        
        <div style={{ position: 'relative' }}>
        <button className="header-button" onClick={() => { setShowNotifications((v) => !v); setShowChat(false); setShowProfile(false); }}>
          <MdNotifications className="header-icon" />
          <span className="button-text">Notifications</span>
        </button>
        {showNotifications && (
          <div className="dropdown">
            {notifications.map(n => (
              <div key={n.id} className="dropdown-item" style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text)' }}>
                <span style={{ maxWidth: 200 }}>{n.text}</span>
                <span style={{ color: 'var(--muted)', fontSize: 12 }}>{n.time}</span>
              </div>
            ))}
          </div>
        )}
        </div>
        
        <div className="user-menu">
          <button className="user-button" onClick={() => { setShowProfile((v) => !v); setShowChat(false); setShowNotifications(false); }}>
            <div className="user-avatar">
              <MdPerson className="user-icon" />
            </div>
            <span className="user-name">R</span>
          </button>
          {showProfile && (
            <div className="dropdown" style={{ right: 0 }}>
              <div className="dropdown-item" style={{ fontWeight: 600 }}>Signed in as <span style={{ color: 'var(--muted)' }}>user@example.com</span></div>
              <div className="dropdown-item">Manage Account</div>
              <div className="dropdown-item">Profile</div>
              <div className="dropdown-item">Settings</div>
            </div>
          )}
        </div>
      </div>

      {showChat && (
        <div className="side-chat">
          <div className="side-chat-header">Maestro AI</div>
          <div className="side-chat-body">
            {chatMessages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', background: m.role === 'user' ? 'var(--accent)' : 'var(--surface)', border: `1px solid var(--card-border)`, color: 'var(--text)', borderRadius: 12, padding: '8px 12px' }}>{m.text}</div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="side-chat-input">
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && chatInput.trim()) { setChatMessages((c) => [...c, { role: 'user', text: chatInput.trim() }]); setChatInput(''); setTimeout(() => setChatMessages((c) => [...c, { role: 'assistant', text: 'Thanks for your question! In this demo, please check the relevant page for details.' }]), 600); } }} placeholder="Ask Maestro..." style={{ flex: 1, background: 'var(--input-bg)', border: `1px solid var(--input-border)`, color: 'var(--text)', borderRadius: 8, padding: '10px 12px' }} />
            <button onClick={() => { if (chatInput.trim()) { setChatMessages((c) => [...c, { role: 'user', text: chatInput.trim() }]); setChatInput(''); setTimeout(() => setChatMessages((c) => [...c, { role: 'assistant', text: 'Thanks for your question! In this demo, please check the relevant page for details.' }]), 600); } }} style={{ background: 'var(--accent)', border: 'none', padding: '10px 14px', borderRadius: 8, color: 'white' }}>Send</button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 