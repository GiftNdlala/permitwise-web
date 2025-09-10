import React, { useMemo, useState } from 'react';

const MECRegions = () => {
  const provinces = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State'];
  const [province, setProvince] = useState('Gauteng');
  const [search, setSearch] = useState('');

  const regions = useMemo(() => ([
    { id: 'GT-01', name: 'Johannesburg Metro', admins: 5, policies: 12 },
    { id: 'GT-02', name: 'Tshwane', admins: 3, policies: 9 },
    { id: 'GT-03', name: 'Ekurhuleni', admins: 4, policies: 10 },
    { id: 'WC-01', name: 'Cape Town Metro', admins: 6, policies: 11 },
    { id: 'KZN-01', name: 'eThekwini', admins: 4, policies: 8 }
  ].filter(r => r.name.toLowerCase().includes(search.toLowerCase()))), [province, search]);

  return (
    <div style={{ color: 'var(--text)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Regions Management</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search regions..." style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }} />
          <select value={province} onChange={(e) => setProvince(e.target.value)} style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }}>
            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, marginTop: 16 }}>
        <div style={{ padding: 12, borderBottom: `1px solid var(--card-border)`, color: 'var(--muted)' }}>Provinces & Regions</div>
        <table style={{ width: '100%', color: 'var(--text)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
              <th style={{ padding: 12 }}>Region</th>
              <th>Admins</th>
              <th>Policies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {regions.map(r => (
              <tr key={r.id} style={{ borderTop: `1px solid var(--card-border)` }}>
                <td style={{ padding: 12 }}>{r.name}</td>
                <td>{r.admins}</td>
                <td>{r.policies}</td>
                <td>
                  <button style={{ background: 'var(--primary)', border: 'none', padding: '6px 10px', borderRadius: 6, color: 'white', marginRight: 6 }}>Assign Admin</button>
                  <button style={{ background: 'var(--secondary)', border: 'none', padding: '6px 10px', borderRadius: 6, color: 'white' }}>Configure Policies</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MECRegions;

