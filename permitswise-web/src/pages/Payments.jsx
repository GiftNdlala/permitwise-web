import React from 'react';

const Payments = () => {
  const payments = [
    { id: 'PAY-1001', appId: 'APP-2025-006', payer: 'S. Dlamini', amount: 1500, method: 'Card', status: 'Settled' },
    { id: 'PAY-1002', appId: 'APP-2025-001', payer: 'J. van der Merwe', amount: 2500, method: 'EFT', status: 'Pending' }
  ];
  const total = payments.reduce((s, p) => s + p.amount, 0);
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'white', marginBottom: 12 }}>Payments</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12 }}>
          <div style={{ padding: 12, borderBottom: '1px solid #1f2937', color: '#cbd5e1' }}>Payment Records</div>
          <table style={{ width: '100%', color: '#e2e8f0', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: '#94a3b8' }}>
                <th style={{ padding: 12 }}>Payment ID</th>
                <th>Application</th>
                <th>Payer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(p => (
                <tr key={p.id} style={{ borderTop: '1px solid #1f2937' }}>
                  <td style={{ padding: 12 }}>{p.id}</td>
                  <td>{p.appId}</td>
                  <td>{p.payer}</td>
                  <td>R {p.amount.toFixed(2)}</td>
                  <td>{p.method}</td>
                  <td>{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16, color: '#e2e8f0' }}>
          <h3 style={{ marginTop: 0, color: 'white' }}>Reconciliation</h3>
          <div>Total collected: R {total.toFixed(2)}</div>
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <button style={{ background: '#2563eb', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Export CSV</button>
            <button style={{ background: '#16a34a', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Mark All Settled</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;