import React, { useState } from 'react';

const Notifications = () => {
  const [filter, setFilter] = useState('all');
  const notifications = [
    { id: 1, type: 'review', text: 'New application #APP-2025-006 needs review', time: '2m ago' },
    { id: 2, type: 'warning', text: 'Route flagged for congestion on #APP-2025-001', time: '1h ago' },
    { id: 3, type: 'success', text: 'Payment received for #APP-2024-103', time: '3h ago' }
  ];
  const filtered = notifications.filter(n => filter === 'all' || n.type === filter);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'white', marginBottom: 12 }}>Notifications</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['all', 'review', 'warning', 'success'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? '#2563eb' : '#0b1220', border: '1px solid #1f2937', color: 'white', borderRadius: 8, padding: '8px 12px' }}>{f}</button>
        ))}
      </div>
      <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12 }}>
        {filtered.map(n => (
          <div key={n.id} style={{ padding: 12, borderBottom: '1px solid #1f2937', color: '#e2e8f0', display: 'flex', justifyContent: 'space-between' }}>
            <span>{n.text}</span>
            <span style={{ color: '#94a3b8', fontSize: 12 }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;