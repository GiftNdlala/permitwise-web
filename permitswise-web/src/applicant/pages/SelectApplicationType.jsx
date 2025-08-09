import React from 'react';
import { Link } from 'react-router-dom';

const Item = ({ to, label, color }) => (
  <Link to={to} style={{ display: 'block', background: '#111827', border: `1px solid ${color}`, color: 'white', borderRadius: 10, padding: 16, textDecoration: 'none' }}>
    {label}
  </Link>
);

const SelectApplicationType = () => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: 'white', marginBottom: 16 }}>Select Application Type</h2>
      <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        <Item to="/applicant/applications/new/new" label="New Operating Licence" color="#10b981" />
        <Item to="/applicant/applications/new/renewal" label="Renewal of Operating Licence" color="#f59e0b" />
        <Item to="/applicant/applications/new/transfer" label="Transfer of Operating Licence" color="#ef4444" />
        <Item to="/applicant/applications/new/conversion" label="Conversion of Operating Licence" color="#3b82f6" />
        <Item to="/applicant/applications/new/amendment" label="Amendment of Operating Licence" color="#8b5cf6" />
      </div>
    </div>
  );
};

export default SelectApplicationType;