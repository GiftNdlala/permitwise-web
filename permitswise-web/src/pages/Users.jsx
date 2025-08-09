import React from 'react';

const Users = () => {
  const users = [
    { id: 'U-001', name: 'Admin One', email: 'admin1@dot.gov', role: 'Admin' },
    { id: 'U-002', name: 'Reviewer Two', email: 'reviewer2@dot.gov', role: 'Reviewer' },
    { id: 'U-003', name: 'Clerk Three', email: 'clerk3@dot.gov', role: 'Clerk' }
  ];
  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ color: 'white', marginBottom: 12 }}>Users & Roles</h1>
      <div style={{ background: '#0b1220', border: '1px solid #1f2937', borderRadius: 12 }}>
        <div style={{ padding: 12, borderBottom: '1px solid #1f2937', color: '#cbd5e1' }}>User Accounts</div>
        <table style={{ width: '100%', color: '#e2e8f0', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ textAlign: 'left', color: '#94a3b8' }}>
              <th style={{ padding: 12 }}>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderTop: '1px solid #1f2937' }}>
                <td style={{ padding: 12 }}>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button style={{ background: '#2563eb', border: 'none', padding: '6px 10px', borderRadius: 6, color: 'white', marginRight: 6 }}>Edit</button>
                  <button style={{ background: '#ef4444', border: 'none', padding: '6px 10px', borderRadius: 6, color: 'white' }}>Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;