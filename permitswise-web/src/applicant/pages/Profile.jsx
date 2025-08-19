import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState('');

  useEffect(() => {
    setFullName(user?.displayName || '');
    try {
      const raw = window.localStorage.getItem('demo_profile');
      if (raw) {
        const p = JSON.parse(raw);
        setPhone(p.phone || '');
        setOrganization(p.organization || '');
      }
    } catch (_) {}
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaved('');
    try {
      await updateProfile({ displayName: fullName });
      window.localStorage.setItem('demo_profile', JSON.stringify({ phone, organization }));
      setSaved('Profile updated');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: 'white', marginBottom: 16 }}>Profile</h2>
      <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12 }}>
        <form onSubmit={handleSave} style={{ padding: 16, color: '#e2e8f0' }}>
          {saved && (
            <div style={{ background: '#052e16', border: '1px solid #14532d', color: '#bbf7d0', padding: 10, borderRadius: 8, marginBottom: 12 }}>{saved}</div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Full Name</label>
              <input value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your name" required style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Email</label>
              <input value={user?.email || ''} readOnly style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#111827', color: 'white' }} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Phone</label>
              <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +27 82 123 4567" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: 6, color: '#cbd5e1' }}>Organization</label>
              <input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="Your company (optional)" style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #374151', background: '#0f172a', color: 'white' }} />
            </div>
          </div>
          <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={saving} style={{ background: '#16a34a', border: 'none', padding: '10px 14px', borderRadius: 8, color: 'white' }}>{saving ? 'Saving...' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;