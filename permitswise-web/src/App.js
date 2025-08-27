import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import PermitsList from './pages/PermitsList';
import PermitForm from './pages/PermitForm';
import PermitDetail from './pages/PermitDetail';
import Settings from './pages/Settings';
import AdminLogin from './pages/AdminLogin';
import ApplicantLayout from './components/Layout/ApplicantLayout';
import ApplicantLogin from './applicant/pages/ApplicantLogin';
import ApplicantSignup from './applicant/pages/ApplicantSignup';
import ApplicantApplications from './applicant/pages/ApplicationsList';
import ApplicantSelectType from './applicant/pages/SelectApplicationType';
import ApplicantProfile from './applicant/pages/Profile';
import ApplicantHelp from './applicant/pages/Help';
import ApplicantDashboard from './applicant/pages/Dashboard';
import Workflows from './pages/Workflows';
import Notifications from './pages/Notifications';
import Payments from './pages/Payments';
import Analytics from './pages/Analytics';
import LicencesList from './pages/LicencesList';
import Users from './pages/Users';
import './App.css';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import RequireAuth from './components/routing/RequireAuth';
import RequireAdmin from './components/routing/RequireAdmin';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
        <Routes>
          {/* Entry */}
          <Route path="/" element={<Navigate to="/applicant/login" replace />} />
          <Route path="/login" element={<Navigate to="/applicant/login" replace />} />

          {/* Admin auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin portal */}
          <Route path="/admin" element={<RequireAdmin><Layout /></RequireAdmin>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="permits" element={<Navigate to="permits/list" replace />} />
            <Route path="permits/list" element={<PermitsList />} />
            <Route path="permits/new" element={<PermitForm mode="admin" presetType="New" />} />
            <Route path="permits/amendment" element={<PermitForm mode="admin" presetType="Amendment" />} />
            <Route path="permits/renewal" element={<PermitForm mode="admin" presetType="Renewal" />} />
            <Route path="permits/transfer" element={<PermitForm mode="admin" presetType="Transfer" />} />
            <Route path="permits/conversion" element={<PermitForm mode="admin" presetType="Conversion" />} />
            <Route path="permits/:id" element={<PermitDetail />} />
            <Route path="licences" element={<LicencesList />} />
            <Route path="workflows" element={<Workflows />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="payments" element={<Payments />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* Applicant auth */}
          <Route path="/applicant/login" element={<ApplicantLogin />} />
          <Route path="/applicant/signup" element={<ApplicantSignup />} />

          {/* Applicants portal */}
          <Route path="/applicant" element={<RequireAuth><ApplicantLayout /></RequireAuth>}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ApplicantDashboard />} />
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
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;