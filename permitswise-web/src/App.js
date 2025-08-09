import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import PermitsList from './pages/PermitsList';
import PermitForm from './pages/PermitForm';
import Settings from './pages/Settings';
import './App.css';

// Placeholder components for other pages
const PlaceholderPage = ({ title, description }) => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
    <h1 style={{ color: 'white', marginBottom: '16px' }}>{title}</h1>
    <p style={{ color: '#9ca3af' }}>{description}</p>
  </div>
);

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Permits Routes */}
          <Route path="/permits" element={<Navigate to="/permits/list" replace />} />
          <Route path="/permits/list" element={<PermitsList />} />
          <Route path="/permits/new" element={<PermitForm />} />
          <Route path="/permits/amendment" element={<PermitForm />} />
          <Route path="/permits/renewal" element={<PermitForm />} />
          <Route path="/permits/transfer" element={<PermitForm />} />
          <Route path="/permits/conversion" element={<PermitForm />} />
          
          {/* Other Routes */}
          <Route path="/licences" element={<PlaceholderPage title="Licences" description="Licence management system coming soon." />} />
          <Route path="/workflows" element={<PlaceholderPage title="Workflows" description="Workflow management system coming soon." />} />
          <Route path="/notifications" element={<PlaceholderPage title="Notifications" description="Notification center coming soon." />} />
          <Route path="/payments" element={<PlaceholderPage title="Payments" description="Payment processing system coming soon." />} />
          <Route path="/analytics" element={<PlaceholderPage title="Analytics" description="Analytics dashboard coming soon." />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/admin" element={<PlaceholderPage title="Admin Panel" description="Administrative tools coming soon." />} />
          <Route path="/logout" element={<PlaceholderPage title="Logout" description="Logout functionality coming soon." />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
