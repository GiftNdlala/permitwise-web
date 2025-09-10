import React, { useMemo, useState } from 'react';

const MECAdmins = () => {
  const [search, setSearch] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', role: 'Admin' });

  const admins = useMemo(() => ([
    { id: 'A-001', name: 'Admin One', email: 'admin1@dot.gov', role: 'Admin', region: 'Gauteng' },
    { id: 'A-002', name: 'Reviewer Two', email: 'reviewer2@dot.gov', role: 'Reviewer', region: 'Western Cape' },
    { id: 'A-003', name: 'Clerk Three', email: 'clerk3@dot.gov', role: 'Clerk', region: 'Gauteng' }
  ].filter(a => a.name.toLowerCase().includes(search.toLowerCase()) || a.email.toLowerCase().includes(search.toLowerCase()))), [search]);

  return (
    <div style={{ color: 'var(--text)', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Admin Management</h2>
        <div style={{ display: 'flex', gap: 12 }}>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search admins..." style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }} />
          <button onClick={() => setShowAdd(true)} style={{ background: 'var(--primary)', border: 'none', padding: '8px 12px', borderRadius: 8, color: 'white' }}>Add Admin</button>
        </div>
      </div>

      <div style={{ background: 'var(--card-bg)', border: `1px solid var(--card-border)`, borderRadius: 12, marginTop: 16 }}>
        <div style={{ padding: 12, borderBottom: `1px solid var(--card-border)`, color: 'var(--muted)' }}>Admins</div>
        <table style={{ width: '100%', color: 'var(--text)', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: 'var(--muted)' }}>
              <th style={{ padding: 12 }}>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Region</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(a => (
              <tr key={a.id} style={{ borderTop: `1px solid var(--card-border)` }}>
                <td style={{ padding: 12 }}>{a.name}</td>
                <td>{a.email}</td>
                <td>{a.role}</td>
                <td>{a.region}</td>
                <td>
                  <button style={{ background: 'var(--secondary)', border: 'none', padding: '6px 10px', borderRadius: 6, color: 'white', marginRight: 6 }}>Assign Region</button>
                  <button style={{ background: 'var(--primary)', border: 'none', padding: '6px 10px', borderRadius: 6, color: 'white', marginRight: 6 }}>Promote</button>
                  <button style={{ background: 'var(--danger)', border: 'none', padding: '6px 10px', borderRadius: 6, color: 'white' }}>Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAdd && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: 'var(--surface)', border: `1px solid var(--card-border)`, borderRadius: 12, width: 420, padding: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 12 }}>Add New Admin</div>
            <div style={{ display: 'grid', gap: 10 }}>
              <input value={newAdmin.name} onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })} placeholder="Full name" style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }} />
              <input value={newAdmin.email} onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })} placeholder="name@dot.gov" style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }} />
              <select value={newAdmin.role} onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })} style={{ background: 'var(--input-bg)', color: 'var(--text)', border: `1px solid var(--input-border)`, padding: '8px 10px', borderRadius: 8 }}>
                <option>Admin</option>
                <option>Reviewer</option>
                <option>Clerk</option>
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 12 }}>
              <button onClick={() => setShowAdd(false)} style={{ background: 'transparent', border: `1px solid var(--card-border)`, padding: '8px 12px', borderRadius: 8, color: 'var(--text)' }}>Cancel</button>
              <button onClick={() => setShowAdd(false)} style={{ background: 'var(--primary)', border: 'none', padding: '8px 12px', borderRadius: 8, color: 'white' }}>Create</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MECAdmins;

