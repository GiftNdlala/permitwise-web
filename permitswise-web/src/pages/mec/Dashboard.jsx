import React, { useMemo, useState } from 'react';

const StatCard = ({ label, value, trend }) => (
  <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, padding: 16 }}>
    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{label}</div>
    <div style={{ color: 'var(--text)', fontSize: 24, marginTop: 6 }}>{value}</div>
    <div style={{ color: trend >= 0 ? 'var(--success)' : 'var(--danger)', fontSize: 12, marginTop: 4 }}>
      {trend >= 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}
    </div>
  </div>
);

const MECDashboard = () => {
  const provinces = ['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Free State'];
  const [province, setProvince] = useState('Gauteng');
  const [region, setRegion] = useState('All Regions');

  const stats = useMemo(() => ({
    total: 3421,
    approved: 2240,
    pending: 870,
    rejected: 311
  }), [province, region]);

  return (
    <div style={{ color: 'var(--text)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Province-wide Overview</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <select value={province} onChange={(e) => setProvince(e.target.value)} style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }}>
            {provinces.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
          <select value={region} onChange={(e) => setRegion(e.target.value)} style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }}>
            {['All Regions', 'North', 'South', 'East', 'West', 'Central'].map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16, marginTop: 16 }}>
        <StatCard label="Total Applications" value={stats.total.toLocaleString()} trend={4.2} />
        <StatCard label="Approved" value={stats.approved.toLocaleString()} trend={2.1} />
        <StatCard label="Pending" value={stats.pending.toLocaleString()} trend={-0.6} />
        <StatCard label="Rejected" value={stats.rejected.toLocaleString()} trend={0.2} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16, marginTop: 16 }}>
        <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, padding: 16, minHeight: 260 }}>
          <div style={{ fontWeight: 600 }}>Province Comparison</div>
          <div style={{ height: 200, marginTop: 12, background: 'repeating-linear-gradient(90deg, var(--surface), var(--surface) 10px, var(--bg) 10px, var(--bg) 20px)', borderRadius: 8 }} />
        </div>
        <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, padding: 16, minHeight: 260 }}>
          <div style={{ fontWeight: 600 }}>Top Regions (by volume)</div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 12, color: 'var(--text)' }}>
            {['Johannesburg Metro', 'Tshwane', 'Ekurhuleni', 'Cape Town Metro', 'eThekwini'].map((r, i) => (
              <li key={r} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: i ? `1px solid var(--card-border)` : 'none' }}>
                <span>{r}</span>
                <span style={{ color: 'var(--muted)' }}>{(Math.random()*1000+500|0).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MECDashboard;

