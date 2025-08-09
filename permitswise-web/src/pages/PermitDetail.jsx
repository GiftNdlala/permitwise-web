import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Badge = ({ children, type }) => {
  const colors = {
    Approved: '#16a34a',
    Pending: '#f59e0b',
    Rejected: '#ef4444'
  };
  return (
    <span style={{
      background: '#0b1220',
      border: `1px solid ${colors[type] || '#334155'}`,
      color: '#e2e8f0',
      padding: '4px 10px',
      borderRadius: 999,
      fontSize: 12
    }}>{children}</span>
  );
};

const Section = ({ title, children, right }) => (
  <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <h3 style={{ margin: 0, color: 'white', fontSize: 16 }}>{title}</h3>
      {right}
    </div>
    {children}
  </div>
);

const PermitDetail = () => {
  const { id } = useParams();
  const detail = {
    id,
    applicantName: 'Johannes van der Merwe',
    type: 'New',
    serviceType: 'e-hailing',
    status: 'Pending',
    amount: 'R 1,500.00',
    submissionDate: '15 Nov 2023'
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div>
          <h1 style={{ color: 'white', margin: 0 }}>Permit {detail.id}</h1>
          <p style={{ color: '#94a3b8', margin: '6px 0 0 0' }}>{detail.applicantName} • {detail.type} • {detail.serviceType}</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Badge type={detail.status}>{detail.status}</Badge>
          <Link to="/admin/permits/list" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Back to list</Link>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '2fr 1fr' }}>
        <div style={{ display: 'grid', gap: 16 }}>
          <Section title="Application Summary">
            <div style={{ color: '#cbd5e1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Applicant</div>
                <div>{detail.applicantName}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Type</div>
                <div>{detail.type}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Service</div>
                <div>{detail.serviceType}</div>
              </div>
              <div>
                <div style={{ color: '#94a3b8', fontSize: 12 }}>Submitted</div>
                <div>{detail.submissionDate}</div>
              </div>
            </div>
          </Section>

          <Section title="Documents">
            <ul style={{ margin: 0, paddingLeft: 18, color: '#e2e8f0' }}>
              <li>Applicant ID (PDF)</li>
              <li>Vehicle Registration (PDF)</li>
              <li>Proof of Address (PDF)</li>
            </ul>
          </Section>

          <Section title="Audit Trail">
            <div style={{ color: '#cbd5e1', display: 'grid', gap: 8 }}>
              <div>2023-11-15 10:32 • Submitted by Applicant</div>
              <div>2023-11-16 09:04 • Routed to Reviewer</div>
              <div>2023-11-17 14:18 • Reviewer requested additional info</div>
            </div>
          </Section>
        </div>

        <div style={{ display: 'grid', gap: 16 }}>
          <Section title="Status & Actions">
            <div style={{ display: 'grid', gap: 8 }}>
              <button style={{ background: '#16a34a', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Approve</button>
              <button style={{ background: '#f59e0b', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Request Changes</button>
              <button style={{ background: '#ef4444', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Reject</button>
            </div>
          </Section>
          <Section title="Payments">
            <div style={{ color: '#e2e8f0' }}>Due: {detail.amount}</div>
            <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
              <button style={{ background: '#2563eb', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Record Payment</button>
              <button style={{ background: '#0ea5e9', border: 'none', padding: 10, borderRadius: 8, color: 'white' }}>Send Invoice</button>
            </div>
          </Section>
          <Section title="Reviewer Notes">
            <textarea placeholder="Add a note for this application" style={{ width: '100%', minHeight: 120, background: '#0b1220', color: 'white', border: '1px solid #1f2937', borderRadius: 8, padding: 10 }} />
            <div style={{ marginTop: 8, textAlign: 'right' }}>
              <button style={{ background: '#334155', border: 'none', padding: '8px 12px', borderRadius: 8, color: 'white' }}>Save Note</button>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
};

export default PermitDetail;