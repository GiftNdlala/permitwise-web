import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PermitsList.css';

const PermitsList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const mockPermits = [
    {
      id: 'APP-2023-001',
      applicantName: 'Johannes van der Merwe',
      vehicleType: 'Sedan',
      status: 'Approved',
      amount: 'R 1,500.00',
      submissionDate: '15 Nov 2023'
    },
    {
      id: 'APP-2023-002',
      applicantName: 'Sipho Ndlovu',
      vehicleType: 'Minibus',
      status: 'Pending',
      amount: 'R 2,500.00',
      submissionDate: '18 Nov 2023'
    },
    {
      id: 'APP-2023-003',
      applicantName: 'Aisha Patel',
      vehicleType: 'Shuttle',
      status: 'Rejected',
      amount: 'R 1,800.00',
      submissionDate: '20 Nov 2023'
    },
    {
      id: 'APP-2024-001',
      applicantName: 'Lefa Molefe',
      vehicleType: 'Truck',
      status: 'Approved',
      amount: 'R 4,500.00',
      submissionDate: '10 Jan 2024'
    },
    {
      id: 'APP-2024-002',
      applicantName: 'Anika Singh',
      vehicleType: 'Bus',
      status: 'Pending',
      amount: 'R 7,500.00',
      submissionDate: '12 Jan 2024'
    }
  ];

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Approved':
        return 'status-badge approved';
      case 'Pending':
        return 'status-badge pending';
      case 'Rejected':
        return 'status-badge rejected';
      default:
        return 'status-badge';
    }
  };

  const filteredPermits = mockPermits.filter(permit =>
    permit.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permit.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permit.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="permits-list">
      <div className="page-header">
        <div className="page-title-section">
          <h1 className="page-title">Permits</h1>
          <p className="page-subtitle">Manage and track all permits.</p>
        </div>
        
        <div className="page-actions">
          <button className="btn-secondary">
            <span className="btn-icon">🔍</span>
            Filters
          </button>
          <Link to="/permits/new" className="btn-primary">
            <span className="btn-icon">➕</span>
            New
          </Link>
        </div>
      </div>

      <div className="table-container">
        <div className="table-header">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search permits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="table-search"
            />
          </div>
        </div>

        <div className="table-wrapper">
          <table className="permits-table">
            <thead>
              <tr>
                <th>Application ID</th>
                <th>Applicant Name</th>
                <th>Vehicle Type</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Submission Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPermits.map((permit) => (
                <tr key={permit.id} className="table-row">
                  <td className="application-id">{permit.id}</td>
                  <td className="applicant-name">{permit.applicantName}</td>
                  <td className="vehicle-type">{permit.vehicleType}</td>
                  <td>
                    <span className={getStatusBadgeClass(permit.status)}>
                      {permit.status}
                    </span>
                  </td>
                  <td className="amount">{permit.amount}</td>
                  <td className="submission-date">{permit.submissionDate}</td>
                  <td className="actions">
                    <button className="action-button">
                      <span className="action-icon">⋯</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredPermits.length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <h3 className="empty-title">No permits found</h3>
            <p className="empty-description">
              {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating your first permit.'}
            </p>
            {!searchTerm && (
              <Link to="/permits/new" className="btn-primary">
                <span className="btn-icon">➕</span>
                Create New Permit
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PermitsList; 