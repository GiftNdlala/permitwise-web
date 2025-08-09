import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import PermitsList from './pages/PermitsList';
import PermitForm from './pages/PermitForm';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import ApplicantLayout from './components/Layout/ApplicantLayout';
import ApplicantLogin from './applicant/pages/ApplicantLogin';
import ApplicantSignup from './applicant/pages/ApplicantSignup';
import ApplicantApplications from './applicant/pages/ApplicationsList';
import ApplicantSelectType from './applicant/pages/SelectApplicationType';
import ApplicantProfile from './applicant/pages/Profile';
import ApplicantHelp from './applicant/pages/Help';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Entry */}
        <Route path="/" element={<Navigate to="/applicant/login" replace />} />
        <Route path="/login" element={<Navigate to="/applicant/login" replace />} />

        {/* Admin auth */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin portal */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="permits" element={<Navigate to="permits/list" replace />} />
          <Route path="permits/list" element={<PermitsList />} />
          <Route path="permits/new" element={<PermitForm mode="admin" />} />
          <Route path="permits/amendment" element={<PermitForm mode="admin" />} />
          <Route path="permits/renewal" element={<PermitForm mode="admin" />} />
          <Route path="permits/transfer" element={<PermitForm mode="admin" />} />
          <Route path="permits/conversion" element={<PermitForm mode="admin" />} />
          <Route path="settings" element={<Settings />} />
          {/* Placeholders for other admin routes */}
          <Route path="licences" element={<div style={{ padding: '24px', color: 'white' }}>Licence management coming soon.</div>} />
          <Route path="workflows" element={<div style={{ padding: '24px', color: 'white' }}>Workflows coming soon.</div>} />
          <Route path="notifications" element={<div style={{ padding: '24px', color: 'white' }}>Notifications coming soon.</div>} />
          <Route path="payments" element={<div style={{ padding: '24px', color: 'white' }}>Payments coming soon.</div>} />
          <Route path="analytics" element={<div style={{ padding: '24px', color: 'white' }}>Analytics coming soon.</div>} />
          <Route path="users" element={<div style={{ padding: '24px', color: 'white' }}>Users coming soon.</div>} />
        </Route>

        {/* Applicant auth */}
        <Route path="/applicant/login" element={<ApplicantLogin />} />
        <Route path="/applicant/signup" element={<ApplicantSignup />} />

        {/* Applicants portal */}
        <Route path="/applicant" element={<ApplicantLayout />}>
          <Route index element={<Navigate to="applications/new" replace />} />
          <Route path="applications" element={<ApplicantApplications />} />
          <Route path="applications/new" element={<ApplicantSelectType />} />
          <Route path="applications/new/:type" element={<PermitForm mode="applicant" />} />
          <Route path="profile" element={<ApplicantProfile />} />
          <Route path="help" element={<ApplicantHelp />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/applicant/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
