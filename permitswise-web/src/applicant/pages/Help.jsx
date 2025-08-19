import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Help = () => {
  const { user } = useAuth();

  // Support ticket form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState('application');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setName(user?.displayName || '');
    setEmail(user?.email || '');
  }, [user]);

  const submitTicket = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess('');
    // Create a demo ticket and store in localStorage
    const id = `TKT-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`;
    const ticket = {
      id,
      name, email, category, subject, message,
      status: 'Open',
      createdAt: new Date().toISOString()
    };
    try {
      const raw = window.localStorage.getItem('demo_help_tickets');
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(ticket);
      window.localStorage.setItem('demo_help_tickets', JSON.stringify(list));
      setSuccess(`Your query has been submitted. Reference: ${id}`);
      setSubject('');
      setMessage('');
    } finally {
      setSubmitting(false);
    }
  };

  // Maestro Chat AI demo
  const [chatMessages, setChatMessages] = useState(() => ([
    { id: 1, role: 'assistant', text: 'Hi! I\'m Maestro, your PermitWise assistant. How can I help you today?' }
  ]));
  const [chatInput, setChatInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const quickReplies = useMemo(() => ([
    'Where can I find my application status?',
    'How long does approval take?',
    'What documents are required?',
    'How do I pay fees?'
  ]), []);

  const handleSend = (text) => {
    const content = (text ?? chatInput).trim();
    if (!content) return;
    const userMsg = { id: Date.now(), role: 'user', text: content };
    setChatMessages((prev) => [...prev, userMsg]);
    setChatInput('');
    // Simulated response
    setTimeout(() => {
      const reply = generateDemoReply(content);
      setChatMessages((prev) => [...prev, { id: Date.now() + 1, role: 'assistant', text: reply }]);
    }, 600);
  };

  const generateDemoReply = (q) => {
    const lower = q.toLowerCase();
    if (lower.includes('status')) {
      return 'You can track your applications under My Applications. Status values include Submitted, Pending, Approved, or Rejected. For a demo, open the Applications tab in your sidebar.';
    }
    if (lower.includes('approve') || lower.includes('how long')) {
      return 'Typical review takes 5-7 working days in this demo. Complex cases may take longer.';
    }
    if (lower.includes('document') || lower.includes('require')) {
      return 'Common documents: ID, driver\'s licence with PDP, and proof of address. Company applications also need incorporation docs and tax clearance.';
    }
    if (lower.includes('pay') || lower.includes('fee')) {
      return 'In this demo, payments are simulated. In production, you would receive a payment link once your application is accepted for processing.';
    }
    return 'Thanks for your question! In this demo environment, I can guide you through the UI. Try checking the Applications page or starting a new application under New Application.';
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: 'white', marginBottom: 16 }}>Help & Support</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        {/* Support form */}
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12 }}>
          <div style={{ padding: 16, borderBottom: '1px solid #1f2937', color: '#cbd5e1' }}>Submit a Query</div>
          <form onSubmit={submitTicket} style={{ padding: 16, color: '#e2e8f0' }}>
            {success && (
              <div style={{ background: '#052e16', border: '1px solid #14532d', color: '#bbf7d0', padding: 10, borderRadius: 8, marginBottom: 12 }}>{success}</div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white' }} />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12, marginTop: 12 }}>
              <div>
                <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white' }}>
                  <option value="application">Application</option>
                  <option value="profile">Profile / Account</option>
                  <option value="payments">Payments</option>
                  <option value="technical">Technical</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Subject</label>
                <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Brief summary of your issue" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white' }} />
              </div>
            </div>
            <div style={{ marginTop: 12 }}>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Message</label>
              <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Describe your question or issue" required rows={6} style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white', resize: 'vertical' }} />
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#94a3b8', fontSize: 12 }}>We aim to respond within 1 business day (demo).</div>
              <button type="submit" disabled={submitting} style={{ background: '#16a34a', border: 'none', padding: '10px 14px', borderRadius: 8, color: 'white' }}>{submitting ? 'Submitting...' : 'Submit'}</button>
            </div>
          </form>
        </div>

        {/* Maestro Chat AI */}
        <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12, display: 'flex', flexDirection: 'column', minHeight: 420 }}>
          <div style={{ padding: 16, borderBottom: '1px solid #1f2937', color: '#cbd5e1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Maestro Chat AI</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {quickReplies.map((qr) => (
                <button key={qr} onClick={() => handleSend(qr)} style={{ background: '#111827', border: '1px solid #374151', color: '#e2e8f0', borderRadius: 999, padding: '6px 10px', fontSize: 12 }}>{qr}</button>
              ))}
            </div>
          </div>
          <div style={{ padding: 16, flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {chatMessages.map(m => (
              <div key={m.id} style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '80%', background: m.role === 'user' ? '#1d4ed8' : '#111827', border: '1px solid #1f2937', color: 'white', borderRadius: 12, padding: '8px 12px' }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div style={{ padding: 12, borderTop: '1px solid #1f2937', display: 'flex', gap: 8 }}>
            <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }} placeholder="Ask Maestro anything..." style={{ flex: 1, background: '#0f172a', border: '1px solid #1f2937', color: 'white', borderRadius: 8, padding: '10px 12px' }} />
            <button onClick={() => handleSend()} style={{ background: '#2563eb', border: 'none', padding: '10px 14px', borderRadius: 8, color: 'white' }}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;