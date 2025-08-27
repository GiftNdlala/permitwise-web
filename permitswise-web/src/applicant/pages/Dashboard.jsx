import React, { useMemo, useRef, useState, useEffect } from 'react';
import Layout from '../../components/Layout/Layout';
import '../../components/Layout/Layout.css';
import './Dashboard.css';

const HighlightCard = ({ title, value, trend }) => (
  <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16 }}>
    <div style={{ color: '#94a3b8', fontSize: 12 }}>{title}</div>
    <div style={{ color: 'white', fontSize: 24, marginTop: 6 }}>{value}</div>
    <div style={{ color: trend > 0 ? '#16a34a' : '#ef4444', fontSize: 12, marginTop: 4 }}>{trend > 0 ? `▲ ${trend}%` : `▼ ${Math.abs(trend)}%`}</div>
    <div style={{ marginTop: 10, height: 38, background: 'linear-gradient(180deg, rgba(37,99,235,0.15), rgba(37,99,235,0.02))', border: '1px solid #1f2937', borderRadius: 8 }}>
      <div style={{ height: '100%', background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.05) 8px, rgba(255,255,255,0.05) 9px)' }} />
    </div>
  </div>
);

const ApplicantDashboard = () => {
  const highlights = [
    { title: 'My Applications', value: '4', trend: 12.0 },
    { title: 'Pending Actions', value: '1', trend: 0.0 },
    { title: 'Approved', value: '1', trend: 0.0 },
    { title: 'Submitted (30d)', value: '2', trend: 5.0 },
  ];

  const types = useMemo(() => ([
    { key: 'new', label: 'New Operating Licence', description: 'Apply for a new operating licence for your service.' },
    { key: 'renewal', label: 'Renewal', description: 'Renew your existing operating licence before it expires.' },
    { key: 'transfer', label: 'Transfer', description: 'Transfer an operating licence to a new holder.' },
    { key: 'conversion', label: 'Conversion', description: 'Convert an operating licence to a different category.' },
    { key: 'amendment', label: 'Amendment', description: 'Amend/update details on an existing licence.' }
  ]), []);

  // Simple Maestro chat demo (like Help page)
  const [chat, setChat] = useState([{ role: 'assistant', text: 'Hi! Need help starting an application? Ask me anything.' }]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chat]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setChat((c) => [...c, { role: 'user', text }]);
    setInput('');
    setTimeout(() => setChat((c) => [...c, { role: 'assistant', text: 'In this demo, choose a type below to begin a new application, or view My Applications to track status.' }]), 500);
  };

  return (
    <Layout>
      <div className="main-content applicant-dashboard">
        <h2 style={{ color: 'white', marginBottom: 16 }}>Dashboard</h2>

        {/* Highlights */}
        <div className="dashboard-highlights">
          {highlights.map((h, i) => (
            <HighlightCard key={i} {...h} />
          ))}
        </div>

        <div className="dashboard-main">
          {/* Application types with descriptions */}
          <div className="dashboard-app-types">
            <div style={{ color: '#cbd5e1', marginBottom: 8 }}>Start a new application</div>
            <div className="dashboard-app-type-list">
              {types.map(t => (
                <a key={t.key} href={`#/applicant/applications/new/${t.key}`} className="dashboard-app-type-card">
                  <div style={{ color: 'white', fontWeight: 600 }}>{t.label}</div>
                  <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{t.description}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Maestro AI panel */}
          <div className="dashboard-maestro">
            <div className="dashboard-maestro-header">Maestro AI</div>
            <div className="dashboard-maestro-chat">
              {chat.map((m, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '80%', background: m.role === 'user' ? '#1d4ed8' : '#111827', border: '1px solid #1f2937', color: 'white', borderRadius: 12, padding: '8px 12px' }}>{m.text}</div>
                </div>
              ))}
              <div ref={endRef} />
            </div>
            <div className="dashboard-maestro-input">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} placeholder="Ask Maestro..." />
              <button onClick={send}>Send</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ApplicantDashboard;

