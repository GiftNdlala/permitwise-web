import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MdAdd, MdList, MdPerson, MdHelp, MdLogout, MdDashboard } from 'react-icons/md';
import './Sidebar.css';

const ApplicantSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const width = isCollapsed ? '80px' : '240px';
    document.documentElement.style.setProperty('--sidebar-width', width);
  }, [isCollapsed]);

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">PermitWise</h2>
        <button className="sidebar-toggle" onClick={() => setIsCollapsed(!isCollapsed)}>
          {isCollapsed ? <span>&#9776;</span> : <span>&#10005;</span>}
        </button>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-item-container">
          <Link to="/applicant/dashboard" className={`nav-item ${isActive('/applicant/dashboard') ? 'active' : ''}`}>
            <MdDashboard className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Dashboard</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/applications/new" className={`nav-item ${isActive('/applicant/applications/new') ? 'active' : ''}`}>
            <MdAdd className="nav-icon" />
            {!isCollapsed && <span className="nav-label">New Application</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/applications" className={`nav-item ${isActive('/applicant/applications') ? 'active' : ''}`}>
            <MdList className="nav-icon" />
            {!isCollapsed && <span className="nav-label">My Applications</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/profile" className={`nav-item ${isActive('/applicant/profile') ? 'active' : ''}`}>
            <MdPerson className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Profile</span>}
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/help" className={`nav-item ${isActive('/applicant/help') ? 'active' : ''}`}>
            <MdHelp className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Help</span>}
          </Link>
        </div>
        <div className="nav-item-container logout-container">
          <button onClick={async () => { await logout(); navigate('/applicant/login'); }} className="nav-item logout-item" style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}>
            <MdLogout className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Log Out</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default ApplicantSidebar;