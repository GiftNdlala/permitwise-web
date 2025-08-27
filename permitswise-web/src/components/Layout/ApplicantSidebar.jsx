import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdAdd, MdList, MdPerson, MdHelp, MdLogout, MdDashboard } from 'react-icons/md';
import './Sidebar.css';

const ApplicantSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const isActive = (path) => location.pathname === path;

  // Responsive init + persistence
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 1024);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    const persisted = localStorage.getItem('applicant-sidebar-collapsed');
    if (persisted !== null) {
      setIsCollapsed(persisted === 'true');
    } else {
      setIsCollapsed(window.innerWidth <= 1024);
    }
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const width = isCollapsed ? '80px' : '240px';
    document.documentElement.style.setProperty('--sidebar-width', width);
    try { localStorage.setItem('applicant-sidebar-collapsed', String(isCollapsed)); } catch {}
    if (isMobile && !isCollapsed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCollapsed, isMobile]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isMobile && !isCollapsed) setIsCollapsed(true);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile, isCollapsed]);

  return (
    <>
      {isMobile && !isCollapsed && (
        <div className="sidebar-overlay" onClick={() => setIsCollapsed(true)} aria-hidden="true" />
      )}
      <div ref={sidebarRef} className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile' : ''}`} aria-label="Primary" aria-expanded={!isCollapsed}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">PermitWise</h2>
          <button className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)} aria-label={isCollapsed ? 'Open sidebar' : 'Close sidebar'} aria-expanded={!isCollapsed} aria-controls="applicant-sidebar-nav">
            {isCollapsed ? <span>&#9776;</span> : <span>&#10005;</span>}
          </button>
        </div>
      <nav id="applicant-sidebar-nav" className="sidebar-nav" role="navigation">
        <div className="nav-item-container">
          <Link to="/applicant/dashboard" className={`nav-item ${isActive('/applicant/dashboard') ? 'active' : ''}`} data-tooltip="Dashboard">
            <MdDashboard className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Dashboard</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/applications/new" className={`nav-item ${isActive('/applicant/applications/new') ? 'active' : ''}`} data-tooltip="New Application">
            <MdAdd className="nav-icon" />
            {!isCollapsed && <span className="nav-label">New Application</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/applications" className={`nav-item ${isActive('/applicant/applications') ? 'active' : ''}`} data-tooltip="My Applications">
            <MdList className="nav-icon" />
            {!isCollapsed && <span className="nav-label">My Applications</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/profile" className={`nav-item ${isActive('/applicant/profile') ? 'active' : ''}`} data-tooltip="Profile">
            <MdPerson className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Profile</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/help" className={`nav-item ${isActive('/applicant/help') ? 'active' : ''}`} data-tooltip="Help">
            <MdHelp className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Help</span>}
          </Link>
        </div>
        <div className="nav-item-container logout-container">
          <button onClick={async () => { await logout(); navigate('/applicant/login'); }} className="nav-item logout-item" style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }} data-tooltip="Log Out">
            <MdLogout className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Log Out</span>}
          </button>
        </div>
      </nav>
    </div>
    </>
  );
};

export default ApplicantSidebar;