import React, { useEffect, useRef, useState } from 'react';
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
  MdBusiness,
  MdMenu,
  MdClose
} from 'react-icons/md';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sidebarRef = useRef(null);
  const [expandedSections, setExpandedSections] = useState({
    permits: true,
    licences: false
  });

  // Initialize responsive state and persisted preference
  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth <= 1024);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    // Load persisted collapsed preference
    const persisted = localStorage.getItem('sidebar-collapsed');
    if (persisted !== null) {
      setIsCollapsed(persisted === 'true');
    } else {
      // Default collapsed on mobile/tablet, expanded on desktop
      setIsCollapsed(window.innerWidth <= 1024);
    }
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // Sync CSS var and persist preference
  useEffect(() => {
    const width = isCollapsed ? '80px' : '280px';
    document.documentElement.style.setProperty('--sidebar-width', width);
    try {
      localStorage.setItem('sidebar-collapsed', String(isCollapsed));
    } catch {}
    // Prevent body scroll when mobile sidebar is open
    if (isMobile && !isCollapsed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isCollapsed, isMobile]);

  // Close on Escape when overlay is active
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && isMobile && !isCollapsed) {
        setIsCollapsed(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMobile, isCollapsed]);

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => location.pathname === path;
  const startsWith = (prefix) => location.pathname.startsWith(prefix);

  return (
    <>
    {/* Overlay for mobile open state */}
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
                <span className="brand-subtitle">Admin Portal</span>
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
            to="/admin/dashboard" 
            className={`nav-item ${isActive('/admin/dashboard') ? 'active' : ''}`}
            data-tooltip="Dashboard"
          >
            <MdDashboard className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Dashboard</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <div 
            className={`nav-item ${startsWith('/admin/permits') ? 'active' : ''}`}
            onClick={() => toggleSection('permits')}
            style={{ cursor: 'pointer' }}
            role="button"
            aria-expanded={expandedSections.permits && !isCollapsed}
            aria-controls="subnav-permits"
            data-tooltip="Permits"
          >
            <MdDescription className="nav-icon" />
            {!isCollapsed && (
              <>
                <span className="nav-label">Permits</span>
                {expandedSections.permits ? (
                  <MdKeyboardArrowDown className="nav-arrow" />
                ) : (
                  <MdChevronRight className="nav-arrow" />
                )}
              </>
            )}
          </div>
          
          {expandedSections.permits && !isCollapsed && (
            <div id="subnav-permits" className="sub-nav">
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
            role="button"
            aria-expanded={expandedSections.licences && !isCollapsed}
            aria-controls="subnav-licences"
            data-tooltip="Licences"
          >
            <MdBusiness className="nav-icon" />
            {!isCollapsed && (
              <>
                <span className="nav-label">Licences</span>
                {expandedSections.licences ? (
                  <MdKeyboardArrowDown className="nav-arrow" />
                ) : (
                  <MdChevronRight className="nav-arrow" />
                )}
              </>
            )}
          </div>
          
          {expandedSections.licences && !isCollapsed && (
            <div id="subnav-licences" className="sub-nav">
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
            data-tooltip="Workflows"
          >
            <MdAssignment className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Workflows</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/notifications" 
            className={`nav-item ${isActive('/admin/notifications') ? 'active' : ''}`}
            data-tooltip="Notifications"
          >
            <MdNotifications className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Notifications</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/payments" 
            className={`nav-item ${isActive('/admin/payments') ? 'active' : ''}`}
            data-tooltip="Payments"
          >
            <MdPayment className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Payments</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/analytics" 
            className={`nav-item ${isActive('/admin/analytics') ? 'active' : ''}`}
            data-tooltip="Analytics"
          >
            <MdAnalytics className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Analytics</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin/settings" 
            className={`nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
            data-tooltip="Settings"
          >
            <MdSettings className="nav-icon" />
            {!isCollapsed && <span className="nav-label">Settings</span>}
          </Link>
        </div>

        <div className="nav-item-container">
          <Link 
            to="/admin" 
            className={`nav-item ${isActive('/admin') ? 'active' : ''}`}
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

export default Sidebar; 