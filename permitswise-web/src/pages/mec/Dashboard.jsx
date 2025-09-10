import React, { useMemo, useState, useRef, useEffect } from 'react';

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
  const [showAI, setShowAI] = useState(false);
  const [aiMessages, setAiMessages] = useState([]);
  const [aiInput, setAiInput] = useState('');
  const aiEndRef = useRef(null);

  const stats = useMemo(() => ({
    total: 3421,
    approved: 2240,
    pending: 870,
    rejected: 311
  }), [province, region]);

  useEffect(() => {
    if (showAI && aiMessages.length === 0) {
      setAiMessages([{ role: 'assistant', text: 'Hi, I am MECstro AI. I am here to assist with province-wide oversight, acquiring applications, admin actions, analytics and more. Try a quick action below.' }]);
    }
  }, [showAI, aiMessages.length]);

  useEffect(() => {
    aiEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, showAI]);

  const quickActions = [
    { label: 'Show province comparison', text: 'Show province comparison for applications and approvals.' },
    { label: 'Regions needing attention', text: 'Which regions have the highest pending backlog this week?' },
    { label: 'Find stuck applications', text: 'List applications pending > 14 days across provinces.' },
    { label: 'Export province report', text: 'Export a province-wide performance report for this month.' },
    { label: 'Assign admin to region', text: 'Guide me to assign an admin to Johannesburg Metro.' }
  ];

  const sendAiMessage = (text) => {
    const message = (text || aiInput).trim();
    if (!message) return;
    setAiMessages((m) => [...m, { role: 'user', text: message }]);
    setAiInput('');
    setTimeout(() => {
      const lower = message.toLowerCase();
      if (lower.includes('comparison')) {
        setAiMessages((m) => [...m, { role: 'assistant', text: 'Here is a province comparison snapshot: Gauteng: 1,200 apps (800 approved), Western Cape: 950 apps (700 approved), KZN: 820 apps (590 approved). Use the filters above to refine.' }]);
      } else if (lower.includes('backlog') || lower.includes('attention')) {
        setAiMessages((m) => [...m, { role: 'assistant', text: 'Regions needing attention: Ekurhuleni (pending 240), eThekwini (pending 210). Consider allocating more reviewers or enabling fast-track rules.' }]);
      } else if (lower.includes('stuck')) {
        setAiMessages((m) => [...m, { role: 'assistant', text: 'Found 53 applications pending > 14 days. Navigate to Permits > List and apply filter: Status=Pending, Age>14d to review and escalate.' }]);
      } else if (lower.includes('export')) {
        setAiMessages((m) => [...m, { role: 'assistant', text: 'Exporting province report... Done. You can also use Analytics > Export CSV/PDF for full datasets.' }]);
      } else if (lower.includes('assign')) {
        setAiMessages((m) => [...m, { role: 'assistant', text: 'To assign an admin: Go to Regions, find Johannesburg Metro, click “Assign Admin”. You can also add new admins under Admins.' }]);
      } else {
        setAiMessages((m) => [...m, { role: 'assistant', text: 'Got it. For this demo, please use the dashboard filters, Regions and Admins pages for actions. I will summarize insights and guide you.' }]);
      }
    }, 600);
  };

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

      <button 
        onClick={() => setShowAI((v) => !v)}
        style={{ position: 'fixed', right: 24, bottom: 24, background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 14px', borderRadius: 999, boxShadow: 'var(--shadow-lg)', cursor: 'pointer' }}
        aria-expanded={showAI}
        aria-controls="mecstro-panel"
      >
        {showAI ? 'Close MECstro AI' : 'Open MECstro AI'}
      </button>

      {showAI && (
        <div id="mecstro-panel" style={{ position: 'fixed', right: 24, bottom: 80, width: 380, maxWidth: '90vw', background: 'var(--surface)', border: `1px solid var(--card-border)`, borderRadius: 12, boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', maxHeight: '70vh' }}>
          <div style={{ padding: 12, borderBottom: `1px solid var(--card-border)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>🏛️</span>
              <div style={{ fontWeight: 600, color: 'var(--text)' }}>MECstro AI</div>
            </div>
            <button onClick={() => setShowAI(false)} style={{ background: 'transparent', border: 'none', color: 'var(--text)' }}>✕</button>
          </div>
          <div style={{ padding: 12, borderBottom: `1px solid var(--card-border)`, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {quickActions.map(a => (
              <button key={a.label} onClick={() => sendAiMessage(a.text)} style={{ background: 'transparent', border: `1px solid var(--card-border)`, color: 'var(--text)', padding: '6px 10px', borderRadius: 999 }}>{a.label}</button>
            ))}
          </div>
          <div style={{ padding: 12, overflowY: 'auto' }}>
            {aiMessages.map((m, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start', marginBottom: 8 }}>
                <div style={{ maxWidth: '80%', background: m.role === 'user' ? 'var(--accent)' : 'var(--card-bg)', border: `1px solid var(--card-border)`, color: 'var(--text)', borderRadius: 12, padding: '8px 12px' }}>{m.text}</div>
              </div>
            ))}
            <div ref={aiEndRef} />
          </div>
          <div style={{ padding: 12, borderTop: `1px solid var(--card-border)`, display: 'flex', gap: 8 }}>
            <input 
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendAiMessage(); }}
              placeholder="Ask MECstro to help..."
              style={{ flex: 1, background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '10px 12px', borderRadius: 8 }}
            />
            <button onClick={() => sendAiMessage()} style={{ background: 'var(--primary)', border: 'none', padding: '10px 12px', borderRadius: 8, color: 'white' }}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MECDashboard;

