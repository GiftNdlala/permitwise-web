import React from 'react';

const Card = ({ title, value, trend }) => (
  <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16 }}>
    <div style={{ color: '#94a3b8', fontSize: 12 }}>{title}</div>
    <div style={{ color: 'white', fontSize: 24, marginTop: 6 }}>{value}</div>
    <div style={{ color: trend > 0 ? '#16a34a' : '#ef4444', fontSize: 12, marginTop: 4 }}>{trend > 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}</div>
  </div>
);

const Analytics = () => {
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'white', marginBottom: 12 }}>Analytics</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        <Card title="Total Applications" value="1,284" trend={4.2} />
        <Card title="Avg. Processing Time" value="5.6 days" trend={-1.1} />
        <Card title="Approval Rate" value="78%" trend={2.3} />
        <Card title="Revenue (30d)" value="R 145k" trend={3.4} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16, color: '#e2e8f0', minHeight: 260 }}>
          <h3 style={{ marginTop: 0, color: 'white' }}>Applications by Type</h3>
          <div style={{ height: 200, background: 'repeating-linear-gradient(90deg,#111827,#111827 10px,#0f172a 10px,#0f172a 20px)', borderRadius: 8 }} />
        </div>
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16, color: '#e2e8f0', minHeight: 260 }}>
          <h3 style={{ marginTop: 0, color: 'white' }}>Regional Heatmap</h3>
          <div style={{ height: 200, background: 'repeating-linear-gradient(0deg,#111827,#111827 10px,#0f172a 10px,#0f172a 20px)', borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;