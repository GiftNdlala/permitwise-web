import React, { useState } from 'react';

const Workflows = () => {
  const [workflows] = useState([
    { id: 'WF-01', name: 'New Permit Review', steps: 5, active: true },
    { id: 'WF-02', name: 'Renewal Fast-Track', steps: 3, active: true },
    { id: 'WF-03', name: 'Transfer Verification', steps: 4, active: false }
  ]);
  const [designerSteps, setDesignerSteps] = useState([
    { id: 'S1', name: 'Intake', type: 'form', assignee: 'Clerk' },
    { id: 'S2', name: 'Review', type: 'manual', assignee: 'Reviewer' }
  ]);

  const addStep = () => {
    const nextIndex = designerSteps.length + 1;
    setDesignerSteps([...designerSteps, { id: `S${nextIndex}`, name: `Step ${nextIndex}`, type: 'manual', assignee: 'Reviewer' }]);
  };
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'var(--text)', marginBottom: 12 }}>Workflows</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12 }}>
          <div style={{ padding: 12, borderBottom: '1px solid var(--card-border)', color: 'var(--muted)' }}>Available Workflows</div>
          <ul style={{ margin: 0, padding: 12, listStyle: 'none', color: 'var(--text)' }}>
            {workflows.map(w => (
              <li key={w.id} style={{ padding: 10, borderBottom: '1px solid var(--card-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{w.name}</span>
                  <span style={{ fontSize: 12, color: 'var(--muted)' }}>{w.steps} steps • {w.active ? 'Active' : 'Inactive'}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12, padding: 16, color: 'var(--text)' }}>
          <h3 style={{ marginTop: 0, color: 'var(--text)' }}>Workflow Designer</h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
            {designerSteps.map(step => (
              <div key={step.id} style={{ background: 'var(--surface)', border: '1px solid var(--card-border)', borderRadius: 8, padding: 10, minWidth: 180 }}>
                <div style={{ color: 'var(--text)', fontWeight: 600 }}>{step.name}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Type: {step.type}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>Assignee: {step.assignee}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={addStep} style={{ background: 'var(--primary)', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Add Step</button>
            <button onClick={() => alert('Changes saved for demo.')} style={{ background: 'var(--success)', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workflows;