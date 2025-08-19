import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
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
  MdBusiness
} from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
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

  const isActive = (path) => location.pathname === path;
  const startsWith = (prefix) => location.pathname.startsWith(prefix);

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
            to="/admin/dashboard" 
            className={`nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
          >
            <MdDashboard className="nav-icon" />
            <span className="nav-label">Dashboard</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <div 
            className={`nav-item ${startsWith('/admin/permits') ? 'active' : ''}`}
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
                to="/admin/permits/new" 
                className={`sub-nav-item ${isActive('/admin/permits/new') ? 'active' : ''}`}
              >
                <MdAdd className="sub-nav-icon" />
                <span className="sub-nav-label">New</span>
              </Link>
              <Link 
                to="/admin/permits/amendment" 
                className={`sub-nav-item ${isActive('/admin/permits/amendment') ? 'active' : ''}`}
              >
                <MdEdit className="sub-nav-icon" />
                <span className="sub-nav-label">Amendment</span>
              </Link>
              <Link 
                to="/admin/permits/renewal" 
                className={`sub-nav-item ${isActive('/admin/permits/renewal') ? 'active' : ''}`}
              >
                <MdRefresh className="sub-nav-icon" />
                <span className="sub-nav-label">Renewal</span>
              </Link>
              <Link 
                to="/admin/permits/transfer" 
                className={`sub-nav-item ${isActive('/admin/permits/transfer') ? 'active' : ''}`}
              >
                <MdSwapHoriz className="sub-nav-icon" />
                <span className="sub-nav-label">Transfer</span>
              </Link>
              <Link 
                to="/admin/permits/conversion" 
                className={`sub-nav-item ${isActive('/admin/permits/conversion') ? 'active' : ''}`}
              >
                <MdTransform className="sub-nav-icon" />
                <span className="sub-nav-label">Conversion</span>
              </Link>
              <Link 
                to="/admin/permits/list" 
                className={`sub-nav-item ${isActive('/admin/permits/list') ? 'active' : ''}`}
              >
                <MdList className="sub-nav-icon" />
                <span className="sub-nav-label">All Permits</span>
              </Link>
            </div>
          )}
        </div>

        <div className="nav-item-container">
          <div 
            className={`nav-item ${startsWith('/admin/licences') ? 'active' : ''}`}
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
                to="/admin/licences/new" 
                className={`sub-nav-item ${isActive('/admin/licences/new') ? 'active' : ''}`}
              >
                <MdAdd className="sub-nav-icon" />
                <span className="sub-nav-label">New Licence</span>
              </Link>
              <Link 
                to="/admin/licences/list" 
                className={`sub-nav-item ${isActive('/admin/licences/list') ? 'active' : ''}`}
              >
                <MdList className="sub-nav-icon" />
                <span className="sub-nav-label">All Licences</span>
              </Link>
            </div>
          )}
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/workflows" 
            className={`nav-item ${isActive('/admin/workflows') ? 'active' : ''}`}
          >
            <MdAssignment className="nav-icon" />
            <span className="nav-label">Workflows</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/notifications" 
            className={`nav-item ${isActive('/admin/notifications') ? 'active' : ''}`}
          >
            <MdNotifications className="nav-icon" />
            <span className="nav-label">Notifications</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/payments" 
            className={`nav-item ${isActive('/admin/payments') ? 'active' : ''}`}
          >
            <MdPayment className="nav-icon" />
            <span className="nav-label">Payments</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/analytics" 
            className={`nav-item ${isActive('/admin/analytics') ? 'active' : ''}`}
          >
            <MdAnalytics className="nav-icon" />
            <span className="nav-label">Analytics</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/settings" 
            className={`nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
          >
            <MdSettings className="nav-icon" />
            <span className="nav-label">Settings</span>
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin" 
            className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
          >
            <MdAdminPanelSettings className="nav-icon" />
            <span className="nav-label">Admin</span>
          </Link>
        </div>

        <div className="nav-item-container logout-container">
          <button 
            onClick={async () => { await logout(); navigate('/applicant/login'); }} 
            className="nav-item logout-item"
            style={{ background: 'transparent', border: 'none', width: '100%', textAlign: 'left' }}
          >
            <MdLogout className="nav-icon" />
            <span className="nav-label">Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar; 