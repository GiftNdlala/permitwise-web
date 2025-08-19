import React, { useMemo, useRef, useState, useEffect } from 'react';

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
    <div style={{ padding: 24 }}>
      <h2 style={{ color: 'white', marginBottom: 16 }}>Dashboard</h2>

      {/* Highlights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
        {highlights.map((h, i) => (
          <HighlightCard key={i} {...h} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
        {/* Application types with descriptions */}
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, padding: 16 }}>
          <div style={{ color: '#cbd5e1', marginBottom: 8 }}>Start a new application</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 12 }}>
            {types.map(t => (
              <a key={t.key} href={`#/applicant/applications/new/${t.key}`} style={{ display: 'block', background: '#111827', border: '1px solid #374151', color: '#e2e8f0', textDecoration: 'none', borderRadius: 10, padding: 14 }}>
                <div style={{ color: 'white', fontWeight: 600 }}>{t.label}</div>
                <div style={{ color: '#94a3b8', fontSize: 12, marginTop: 4 }}>{t.description}</div>
              </a>
            ))}
          </div>
        </div>

        {/* Maestro AI panel */}
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: 16, borderBottom: '1px solid #1f2937', color: '#cbd5e1' }}>Maestro AI</div>
          <div style={{ padding: 12, flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chat.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', background: m.role === 'user' ? '#1d4ed8' : '#111827', border: '1px solid #1f2937', color: 'white', borderRadius: 12, padding: '8px 12px' }}>{m.text}</div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ padding: 12, borderTop: '1px solid #1f2937', display: 'flex', gap: 8 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} placeholder="Ask Maestro..." style={{ flex: 1, background: '#0f172a', border: '1px solid #1f2937', color: 'white', borderRadius: 8, padding: '10px 12px' }} />
            <button onClick={send} style={{ background: '#2563eb', border: 'none', padding: '10px 14px', borderRadius: 8, color: 'white' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDashboard;

