import React from 'react';

const Workflows = () => {
  const workflows = [
    { id: 'WF-01', name: 'New Permit Review', steps: 5, active: true },
    { id: 'WF-02', name: 'Renewal Fast-Track', steps: 3, active: true },
    { id: 'WF-03', name: 'Transfer Verification', steps: 4, active: false }
  ];
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'white', marginBottom: 12 }}>Workflows</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12 }}>
          <div style={{ padding: 12, borderBottom: '1px solid #1f2937', color: '#cbd5e1' }}>Available Workflows</div>
          <ul style={{ margin: 0, padding: 12, listStyle: 'none', color: '#e2e8f0' }}>
            {workflows.map(w => (
              <li key={w.id} style={{ padding: 10, borderBottom: '1px solid #1f2937' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{w.name}</span>
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{w.steps} steps • {w.active ? 'Active' : 'Inactive'}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16, color: '#e2e8f0' }}>
          <h3 style={{ marginTop: 0, color: 'white' }}>Workflow Designer</h3>
          <p>Visual designer placeholder for building and editing workflow steps, conditions, and actions.</p>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button style={{ background: '#2563eb', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Add Step</button>
            <button style={{ background: '#16a34a', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflows;