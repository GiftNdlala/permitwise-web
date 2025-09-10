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
      <h1 style={{ color: 'var(--text)', marginBottom: 12 }}>Notifications</h1>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['all', 'review', 'warning', 'success'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ background: filter === f ? 'var(--primary)' : 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text)', borderRadius: 8, padding: '8px 12px' }}>{f}</button>
        ))}
      </div>
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12 }}>
        {filtered.map(n => (
          <div key={n.id} style={{ padding: 12, borderBottom: '1px solid var(--card-border)', color: 'var(--text)', display: 'flex', justifyContent: 'space-between' }}>
            <span>{n.text}</span>
            <span style={{ color: 'var(--muted)', fontSize: 12 }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;