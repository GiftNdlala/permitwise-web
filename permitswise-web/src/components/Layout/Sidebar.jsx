import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MdDashboard, 
  MdDescription, 
  MdAdd, 
  MdList, 
  MdAssignment, 
  MdNotifications, 
  MdPayment, 
  MdAnalytics, 
  MdSettings, 
  MdAdminPanelSettings, 
  MdLogout,
  MdChevronRight,
  MdKeyboardArrowDown,
  MdEdit,
  MdRefresh,
  MdSwapHoriz,
  MdTransform,
  MdBusiness,
  MdAssignment,
  MdPerson
} from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState({
    permits: true,
    licences: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">PermitWise</h2>
        <button className="sidebar-toggle">
          <MdChevronRight className="toggle-icon" />
        </button>
      </div>
      
      <nav className="sidebar-nav">
        <div className="nav-item-container">
          <Link 
            to="/dashboard" 
            className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}
          >
            <MdDashboard className="nav-icon" />
            <span className="nav-label">Dashboard</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <div 
            className={`nav-item ${location.pathname.startsWith('/permits') ? 'active' : ''}`}
            onClick={() => toggleSection('permits')}
            style={{ cursor: 'pointer' }}
          >
            <MdDescription className="nav-icon" />
            <span className="nav-label">Permits</span>
            {expandedSections.permits ? (
              <MdKeyboardArrowDown className="nav-arrow" />
            ) : (
              <MdChevronRight className="nav-arrow" />
            )}
          </div>
          
          {expandedSections.permits && (
            <div className="sub-nav">
              <Link 
                to="/permits/new" 
                className={`sub-nav-item ${location.pathname === '/permits/new' ? 'active' : ''}`}
              >
                <MdAdd className="sub-nav-icon" />
                <span className="sub-nav-label">New</span>
              </Link>
              <Link 
                to="/permits/amendment" 
                className={`sub-nav-item ${location.pathname === '/permits/amendment' ? 'active' : ''}`}
              >
                <MdEdit className="sub-nav-icon" />
                <span className="sub-nav-label">Amendment</span>
              </Link>
              <Link 
                to="/permits/renewal" 
                className={`sub-nav-item ${location.pathname === '/permits/renewal' ? 'active' : ''}`}
              >
                <MdRefresh className="sub-nav-icon" />
                <span className="sub-nav-label">Renewal</span>
              </Link>
              <Link 
                to="/permits/transfer" 
                className={`sub-nav-item ${location.pathname === '/permits/transfer' ? 'active' : ''}`}
              >
                <MdSwapHoriz className="sub-nav-icon" />
                <span className="sub-nav-label">Transfer</span>
              </Link>
              <Link 
                to="/permits/conversion" 
                className={`sub-nav-item ${location.pathname === '/permits/conversion' ? 'active' : ''}`}
              >
                <MdTransform className="sub-nav-icon" />
                <span className="sub-nav-label">Conversion</span>
              </Link>
            </div>
          )}
        </div>

        <div className="nav-item-container">
          <div 
            className={`nav-item ${location.pathname.startsWith('/licences') ? 'active' : ''}`}
            onClick={() => toggleSection('licences')}
            style={{ cursor: 'pointer' }}
          >
            <MdBusiness className="nav-icon" />
            <span className="nav-label">Licences</span>
            {expandedSections.licences ? (
              <MdKeyboardArrowDown className="nav-arrow" />
            ) : (
              <MdChevronRight className="nav-arrow" />
            )}
          </div>
          
          {expandedSections.licences && (
            <div className="sub-nav">
              <Link 
                to="/licences/new" 
                className={`sub-nav-item ${location.pathname === '/licences/new' ? 'active' : ''}`}
              >
                <MdAdd className="sub-nav-icon" />
                <span className="sub-nav-label">New Licence</span>
              </Link>
              <Link 
                to="/licences/list" 
                className={`sub-nav-item ${location.pathname === '/licences/list' ? 'active' : ''}`}
              >
                <MdList className="sub-nav-icon" />
                <span className="sub-nav-label">All Licences</span>
              </Link>
            </div>
          )}
        </div>

        <div className="nav-item-container">
          <Link 
            to="/workflows" 
            className={`nav-item ${location.pathname === '/workflows' ? 'active' : ''}`}
          >
            <MdAssignment className="nav-icon" />
            <span className="nav-label">Workflows</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/notifications" 
            className={`nav-item ${location.pathname === '/notifications' ? 'active' : ''}`}
          >
            <MdNotifications className="nav-icon" />
            <span className="nav-label">Notifications</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/payments" 
            className={`nav-item ${location.pathname === '/payments' ? 'active' : ''}`}
          >
            <MdPayment className="nav-icon" />
            <span className="nav-label">Payments</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/analytics" 
            className={`nav-item ${location.pathname === '/analytics' ? 'active' : ''}`}
          >
            <MdAnalytics className="nav-icon" />
            <span className="nav-label">Analytics</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/settings" 
            className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}
          >
            <MdSettings className="nav-icon" />
            <span className="nav-label">Settings</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin" 
            className={`nav-item ${location.pathname === '/admin' ? 'active' : ''}`}
          >
            <MdAdminPanelSettings className="nav-icon" />
            <span className="nav-label">Admin</span>
          </Link>
        </div>

        <div className="nav-item-container logout-container">
          <Link 
            to="/logout" 
            className="nav-item logout-item"
          >
            <MdLogout className="nav-icon" />
            <span className="nav-label">Log Out</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 