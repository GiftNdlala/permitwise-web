import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  MdDashboard,
  MdDescription,
  MdList,
  MdNotifications,
  MdPayment,
  MdAnalytics,
  MdSettings,
  MdAdminPanelSettings,
  MdLogout,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdPublic,
  MdPeople,
  MdMenu,
  MdClose
} from 'react-icons/md';
import './Sidebar.css';

const MECSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const [expandedSections, setExpandedSections] = useState({
    permits: true
  });

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 1024);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    const persisted = localStorage.getItem('sidebar-collapsed');
    if (persisted !== null) {
      setIsCollapsed(persisted === 'true');
    } else {
      setIsCollapsed(window.innerWidth <= 1024);
    }
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const width = isCollapsed ? '80px' : '280px';
    document.documentElement.style.setProperty('--sidebar-width', width);
    try {
      localStorage.setItem('sidebar-collapsed', String(isCollapsed));
    } catch {}
    if (isMobile && !isCollapsed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCollapsed, isMobile]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isMobile && !isCollapsed) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile, isCollapsed]);

  const toggleSidebar = () => setIsCollapsed(prev => !prev);
  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  const isActive = (path) => location.pathname === path;
  const startsWith = (prefix) => location.pathname.startsWith(prefix);

  return (
    <>
    {isMobile && !isCollapsed && (
      <div className="sidebar-overlay" onClick={() => setIsCollapsed(true)} aria-hidden="true" />
    )}
    <div ref={sidebarRef} className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`} aria-label="Primary" aria-expanded={!isCollapsed}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-logo">
            <span className="brand-icon">🚦</span>
            {!isCollapsed && (
              <div className="brand-text">
                <h2 className="sidebar-title">PermitWise</h2>
                <span className="brand-subtitle">MEC Superuser</span>
              </div>
            )}
          </div>
        </div>
        <button className="sidebar-toggle" onClick={toggleSidebar} aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'} aria-expanded={!isCollapsed} aria-controls="sidebar-nav">
          {isCollapsed ? <MdMenu className="toggle-icon" /> : <MdClose className="toggle-icon" />}
        </button>
      </div>

      <nav id="sidebar-nav" className="sidebar-nav" role="navigation">
        <div className="nav-item-container">
          <Link 
            to="/mec/dashboard" 
            className={`nav-item ${isActive('/mec/dashboard') ? 'active' : ''}`}
            data-tooltip="Dashboard"
          >
            <MdDashboard className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Dashboard</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/mec/permits" 
            className={`nav-item ${startsWith('/mec/permits') ? 'active' : ''}`}
            data-tooltip="Permits"
          >
            <MdDescription className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Permits</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/mec/regions" 
            className={`nav-item ${startsWith('/mec/regions') ? 'active' : ''}`}
            data-tooltip="Regions"
          >
            <MdPublic className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Regions</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/mec/admins" 
            className={`nav-item ${startsWith('/mec/admins') ? 'active' : ''}`}
            data-tooltip="Admins"
          >
            <MdPeople className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Admins</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/mec/analytics" 
            className={`nav-item ${startsWith('/mec/analytics') ? 'active' : ''}`}
            data-tooltip="Analytics"
          >
            <MdAnalytics className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Analytics</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/mec/payments" 
            className={`nav-item ${startsWith('/mec/payments') ? 'active' : ''}`}
            data-tooltip="Payments"
          >
            <MdPayment className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Payments</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/mec/notifications" 
            className={`nav-item ${startsWith('/mec/notifications') ? 'active' : ''}`}
            data-tooltip="Notifications"
          >
            <MdNotifications className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Notifications</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/mec/settings" 
            className={`nav-item ${startsWith('/mec/settings') ? 'active' : ''}`}
            data-tooltip="Settings"
          >
            <MdSettings className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Settings</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/dashboard" 
            className={`nav-item ${startsWith('/admin') ? 'active' : ''}`}
            data-tooltip="Admin"
          >
            <MdAdminPanelSettings className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Admin</span>}
          </Link>
        </div>

        <div className="nav-item-container logout-container">
          <button 
            onClick={async () => { await logout(); navigate('/applicant/login'); }} 
            className="nav-item logout-item"
            style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
            data-tooltip="Log Out"
          >
            <MdLogout className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Log Out</span>}
          </button>
        </div>
      </nav>
    </div>
    </>
  );
};

export default MECSidebar;

