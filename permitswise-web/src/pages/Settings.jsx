import React, { useState } from 'react';
import { 
  MdPerson, 
  MdNotifications, 
  MdSettings, 
  MdSecurity, 
  MdLock, 
  MdLanguage,
  MdSave,
  MdToggleOn,
  MdToggleOff
} from 'react-icons/md';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [inAppNotifications, setInAppNotifications] = useState(true);
  const [timezone, setTimezone] = useState('(GMT+02:00) Johannesburg');
  const [dateFormat, setDateFormat] = useState('DD MMM YYYY (e.g., 15 Nov 2023)');
  const [language, setLanguage] = useState('English');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: MdPerson },
    { id: 'notifications', label: 'Notifications', icon: MdNotifications },
    { id: 'system', label: 'System', icon: MdSettings },
    { id: 'access', label: 'Access', icon: MdSecurity },
    { id: 'password', label: 'Password', icon: MdLock },
    { id: 'language', label: 'Language', icon: MdLanguage }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="settings-section">
            <h3 className="section-title">Profile Settings</h3>
            <p className="section-description">Update your personal information and preferences.</p>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="form-input"
                />
              </div>
              
              <div className="form-field">
                <label className="field-label">Email Address *</label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Phone Number</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="form-input"
                />
              </div>
              
              <div className="form-field">
                <label className="field-label">Company</label>
                <input
                  type="text"
                  placeholder="Enter your company name"
                  className="form-input"
                />
              </div>
            </div>
            
            <button className="btn btn-primary">
              <MdSave className="btn-icon" />
              Save Profile
            </button>
          </div>
        );

      case 'notifications':
        return (
          <div className="settings-section">
            <h3 className="section-title">Notification Preferences</h3>
            <p className="section-description">Choose how you receive notifications.</p>
            
            <div className="notification-options">
              <div className="notification-option">
                <div className="option-content">
                  <h4 className="option-title">Email Notifications</h4>
                  <p className="option-description">
                    Receive updates about application statuses and system alerts via email.
                  </p>
                </div>
                <div className="toggle-container">
                  <button
                    className={`toggle-switch ${emailNotifications ? 'active' : ''}`}
                    onClick={() => setEmailNotifications(!emailNotifications)}
                  >
                    {emailNotifications ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>
              </div>
              
              <div className="notification-option">
                <div className="option-content">
                  <h4 className="option-title">In-App Notifications</h4>
                  <p className="option-description">
                    Display notifications within the PermitWise application.
                  </p>
                </div>
                <div className="toggle-container">
                  <button
                    className={`toggle-switch ${inAppNotifications ? 'active' : ''}`}
                    onClick={() => setInAppNotifications(!inAppNotifications)}
                  >
                    {inAppNotifications ? <MdToggleOn /> : <MdToggleOff />}
                  </button>
                </div>
              </div>
            </div>
            
            <button className="btn btn-primary">
              <MdSave className="btn-icon" />
              Save Preferences
            </button>
          </div>
        );

      case 'system':
        return (
          <div className="settings-section">
            <h3 className="section-title">System Preferences</h3>
            <p className="section-description">Configure system-wide settings.</p>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Timezone</label>
                <select
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="form-input"
                >
                  <option value="(GMT+02:00) Johannesburg">(GMT+02:00) Johannesburg</option>
                  <option value="(GMT+00:00) London">(GMT+00:00) London</option>
                  <option value="(GMT-05:00) New York">(GMT-05:00) New York</option>
                  <option value="(GMT+08:00) Singapore">(GMT+08:00) Singapore</option>
                </select>
              </div>
              
              <div className="form-field">
                <label className="field-label">Date Format</label>
                <select
                  value={dateFormat}
                  onChange={(e) => setDateFormat(e.target.value)}
                  className="form-input"
                >
                  <option value="DD MMM YYYY (e.g., 15 Nov 2023)">DD MMM YYYY (e.g., 15 Nov 2023)</option>
                  <option value="MM/DD/YYYY (e.g., 11/15/2023)">MM/DD/YYYY (e.g., 11/15/2023)</option>
                  <option value="YYYY-MM-DD (e.g., 2023-11-15)">YYYY-MM-DD (e.g., 2023-11-15)</option>
                </select>
              </div>
            </div>
            
            <button className="btn btn-primary">
              <MdSave className="btn-icon" />
              Save System Settings
            </button>
          </div>
        );

      case 'access':
        return (
          <div className="settings-section">
            <h3 className="section-title">Access Control</h3>
            <p className="section-description">Manage your account access and permissions.</p>
            
            <div className="access-options">
              <div className="access-option">
                <h4 className="option-title">Two-Factor Authentication</h4>
                <p className="option-description">
                  Add an extra layer of security to your account.
                </p>
                <button className="btn btn-secondary">Enable 2FA</button>
              </div>
              
              <div className="access-option">
                <h4 className="option-title">Session Management</h4>
                <p className="option-description">
                  View and manage your active sessions.
                </p>
                <button className="btn btn-secondary">View Sessions</button>
              </div>
            </div>
          </div>
        );

      case 'password':
        return (
          <div className="settings-section">
            <h3 className="section-title">Change Password</h3>
            <p className="section-description">Update your account password.</p>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Current Password *</label>
                <input
                  type="password"
                  placeholder="Enter your current password"
                  className="form-input"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">New Password *</label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="form-input"
                />
              </div>
              
              <div className="form-field">
                <label className="field-label">Confirm New Password *</label>
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  className="form-input"
                />
              </div>
            </div>
            
            <button className="btn btn-primary">
              <MdSave className="btn-icon" />
              Update Password
            </button>
          </div>
        );

      case 'language':
        return (
          <div className="settings-section">
            <h3 className="section-title">Language Settings</h3>
            <p className="section-description">Choose your preferred language for the application.</p>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">Select Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="form-input"
                >
                  <option value="English">English</option>
                  <option value="Afrikaans">Afrikaans</option>
                  <option value="Zulu">Zulu</option>
                  <option value="Xhosa">Xhosa</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
            </div>
            
            <button className="btn btn-primary">
              <MdSave className="btn-icon" />
              Save Language
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="settings-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <span>Dashboard</span>
        <span className="breadcrumb-separator">></span>
        <span>Settings</span>
      </div>

      {/* Page Header */}
      <div className="settings-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Manage your account and system preferences.</p>
      </div>

      {/* Settings Tabs */}
      <div className="settings-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon className="tab-icon" />
              <span className="tab-label">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Settings Content */}
      <div className="settings-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Settings;
