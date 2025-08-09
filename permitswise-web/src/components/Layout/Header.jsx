import React from 'react';
import { useLocation } from 'react-router-dom';
import { 
  MdSearch, 
  MdNotifications, 
  MdPerson, 
  MdStar,
  MdLightMode,
  MdHelp
} from 'react-icons/md';
import './Header.css';

const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/dashboard') return 'Dashboard';
    if (path.startsWith('/permits')) {
      if (path === '/permits/new') return 'New Permit';
      if (path === '/permits/list') return 'Permits List';
      if (path === '/permits/amendment') return 'Permit Amendment';
      if (path === '/permits/renewal') return 'Permit Renewal';
      if (path === '/permits/transfer') return 'Permit Transfer';
      if (path === '/permits/conversion') return 'Permit Conversion';
      return 'Permits';
    }
    if (path === '/licences') return 'Licences';
    if (path === '/workflows') return 'Workflows';
    if (path === '/notifications') return 'Notifications';
    if (path === '/payments') return 'Payments';
    if (path === '/analytics') return 'Analytics';
    if (path === '/settings') return 'Settings';
    if (path === '/admin') return 'Admin Panel';
    return 'PermitWise';
  };

  const getPageIcon = () => {
    const path = location.pathname;
    if (path.startsWith('/permits')) return '📄';
    if (path === '/dashboard') return '📊';
    if (path === '/settings') return '⚙️';
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