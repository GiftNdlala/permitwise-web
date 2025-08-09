import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdAdd, MdList, MdPerson, MdHelp, MdLogout } from 'react-icons/md';
import './Sidebar.css';

const ApplicantSidebar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">PermitWise</h2>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-item-container">
          <Link to="/applicant/applications/new" className={`nav-item ${isActive('/applicant/applications/new') ? 'active' : ''}`}>
            <MdAdd className="nav-icon" />
            <span className="nav-label">New Application</span>
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/applications" className={`nav-item ${isActive('/applicant/applications') ? 'active' : ''}`}>
            <MdList className="nav-icon" />
            <span className="nav-label">My Applications</span>
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/profile" className={`nav-item ${isActive('/applicant/profile') ? 'active' : ''}`}>
            <MdPerson className="nav-icon" />
            <span className="nav-label">Profile</span>
          </Link>
        </div>
        <div className="nav-item-container">
          <Link to="/applicant/help" className={`nav-item ${isActive('/applicant/help') ? 'active' : ''}`}>
            <MdHelp className="nav-icon" />
            <span className="nav-label">Help</span>
          </Link>
        </div>
        <div className="nav-item-container logout-container">
          <Link to="/login" className="nav-item logout-item">
            <MdLogout className="nav-icon" />
            <span className="nav-label">Log Out</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default ApplicantSidebar;