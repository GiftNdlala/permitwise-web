import React from 'react';

const Metric = ({ title, value, trend }) => (
  <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, padding: 16 }}>
    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{title}</div>
    <div style={{ color: 'var(--text)', fontSize: 24, marginTop: 6 }}>{value}</div>
    <div style={{ color: trend >= 0 ? 'var(--success)' : 'var(--danger)', fontSize: 12, marginTop: 4 }}>
      {trend >= 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}
    </div>
  </div>
);

const MECAnalytics = () => {
  const exportCSV = () => {
    const rows = [
      ['Province', 'Applications', 'Approved', 'Pending', 'Rejected'],
      ['Gauteng', '1200', '800', '300', '100'],
      ['Western Cape', '950', '700', '200', '50']
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'mec_analytics.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div style={{ color: 'var(--text)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Province Analytics</h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={exportCSV} style={{ background: 'transparent', border: `1px solid var(--primary)`, color: 'var(--primary)', padding: '8px 12px', borderRadius: 8 }}>Export CSV</button>
          <button onClick={exportPDF} style={{ background: 'var(--primary)', border: 'none', color: 'white', padding: '8px 12px', borderRadius: 8 }}>Export PDF</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 16, marginTop: 16 }}>
        <Metric title="Total Applications" value="3,421" trend={4.2} />
        <Metric title="Approval Rate" value="78%" trend={2.1} />
        <Metric title="Avg. Processing Time" value="5.6 days" trend={-0.6} />
        <Metric title="Revenue (30d)" value="R 245k" trend={3.2} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16, marginTop: 16 }}>
        <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, padding: 16, minHeight: 260 }}>
          <div style={{ fontWeight: 600 }}>Applications Over Time</div>
          <div style={{ height: 200, marginTop: 12, background: 'repeating-linear-gradient(90deg, var(--surface), var(--surface) 10px, var(--bg) 10px, var(--bg) 20px)', borderRadius: 8 }} />
        </div>
        <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, padding: 16, minHeight: 260 }}>
          <div style={{ fontWeight: 600 }}>Regional Heatmap</div>
          <div style={{ height: 200, marginTop: 12, background: 'repeating-linear-gradient(0deg, var(--surface), var(--surface) 10px, var(--bg) 10px, var(--bg) 20px)', borderRadius: 8 }} />
        </div>
      </div>
    </div>
  );
};

export default MECAnalytics;

