import React from 'react';
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
      
      <div className="header-right">
        <button className="header-button ai-button">
          <MdStar className="header-icon" />
          <span className="button-text">Ask Maestro AI</span>
        </button>
        
        <button className="header-button theme-toggle">
          <MdLightMode className="header-icon" />
        </button>
        
        <button className="header-button">
          <MdNotifications className="header-icon" />
          <span className="button-text">Notifications</span>
        </button>
        
        <div className="user-menu">
          <button className="user-button">
            <div className="user-avatar">
              <MdPerson className="user-icon" />
            </div>
            <span className="user-name">R</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 