import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const ApplicationsList = () => {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const applications = useMemo(() => ([
    { id: 'APP-2025-001', type: 'New', service: 'E-hailing', submitted: '2025-08-05', status: 'Approved', amount: 'R 1,500.00' },
    { id: 'APP-2025-002', type: 'Renewal', service: 'Minibus', submitted: '2025-08-03', status: 'Pending', amount: 'R 2,400.00' },
    { id: 'APP-2025-003', type: 'Transfer', service: 'Charter', submitted: '2025-07-28', status: 'Submitted', amount: 'R 3,000.00' },
    { id: 'APP-2025-004', type: 'Amendment', service: 'Scheduled bus', submitted: '2025-07-15', status: 'Rejected', amount: 'R 900.00' },
  ]), []);

  const filtered = applications.filter(a => (statusFilter === 'all' || a.status === statusFilter) && (a.id.toLowerCase().includes(search.toLowerCase()) || a.service.toLowerCase().includes(search.toLowerCase())));

  const badgeColor = (status) => ({
    'Approved': '#16a34a',
    'Pending': '#f59e0b',
    'Submitted': '#3b82f6',
    'Rejected': '#ef4444'
  }[status] || '#64748b');

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: 'white', marginBottom: 16 }}>My Applications</h2>

      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        {['all', 'Approved', 'Submitted', 'Pending', 'Rejected'].map(s => (
          <button key={s} onClick={() => setStatusFilter(s)} style={{ background: statusFilter === s ? '#2563eb' : '#0b1220', border: '1px solid #1f2937', color: 'white', borderRadius: 8, padding: '8px 12px', textTransform: 'capitalize' }}>{s}</button>
        ))}
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID or service..." style={{ marginLeft: 'auto', background: '#0f172a', border: '1px solid #1f2937', color: 'white', borderRadius: 8, padding: '8px 12px', width: 280 }} />
      </div>

      <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12 }}>
        <table style={{ width: '100%', color: '#e2e8f0', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#94a3b8' }}>
              <th style={{ padding: 12 }}>Application ID</th>
              <th>Type</th>
              <th>Service</th>
              <th>Submitted</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} style={{ borderTop: '1px solid #1f2937' }}>
                <td style={{ padding: 12 }}>{a.id}</td>
                <td>{a.type}</td>
                <td>{a.service}</td>
                <td>{a.submitted}</td>
                <td>{a.amount}</td>
                <td>
                  <span style={{ background: '#111827', border: `1px solid ${badgeColor(a.status)}`, color: 'white', borderRadius: 999, padding: '4px 8px' }}>{a.status}</span>
                </td>
                <td>
                  <Link to={`/applicant/applications/new/${a.type.toLowerCase()}`} style={{ color: '#60a5fa' }}>View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 16, color: '#9ca3af' }}>No applications match your filters.</div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsList;