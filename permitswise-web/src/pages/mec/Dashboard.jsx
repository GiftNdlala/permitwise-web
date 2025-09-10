import React from 'react';

const MECDashboard = () => {
  return (
    <div style={{ color: 'var(--text)' }}>
      <h2>Province-wide Overview</h2>
      <p>Metrics across all regions. Filters for Province/Region. Comparison charts.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16, marginTop: 16 }}>
        <div className="card">Total Applications</div>
        <div className="card">Approved</div>
        <div className="card">Pending</div>
        <div className="card">Rejected</div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>Province Comparison Chart</div>
    </div>
  );
};

export default MECDashboard;

