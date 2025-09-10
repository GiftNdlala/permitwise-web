import React, { useState } from 'react';

const LicencesList = () => {
  const [search, setSearch] = useState('');
  const licences = [
    { id: 'LIC-2024-001', holder: 'Metro Taxi Co.', type: 'Metered Taxi', status: 'Active', expiry: '2026-01-10' },
    { id: 'LIC-2024-002', holder: 'Sunrise Tours', type: 'Charter Service', status: 'Suspended', expiry: '2025-11-02' }
  ];
  const filtered = licences.filter(l => l.id.toLowerCase().includes(search.toLowerCase()) || l.holder.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'var(--text)', marginBottom: 12 }}>Licences</h1>
      <div style={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: 12 }}>
        <div style={{ padding: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--card-border)' }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search licences..." style={{ background: 'var(--input-bg)', border: '1px solid var(--input-border)', color: 'var(--text)', borderRadius: 8, padding: '8px 12px', width: 260 }} />
          <button style={{ background: 'var(--primary)', border: 'none', padding: '8px 12px', borderRadius: 8, color: 'white' }}>New Licence</button>
        </div>
        <table style={{ width: '100%', color: 'var(--text)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
              <th style={{ padding: 12 }}>Licence ID</th>
              <th>Holder</th>
              <th>Type</th>
              <th>Status</th>
              <th>Expiry</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(l => (
              <tr key={l.id} style={{ borderTop: '1px solid var(--card-border)' }}>
                <td style={{ padding: 12 }}>{l.id}</td>
                <td>{l.holder}</td>
                <td>{l.type}</td>
                <td>{l.status}</td>
                <td>{l.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LicencesList;