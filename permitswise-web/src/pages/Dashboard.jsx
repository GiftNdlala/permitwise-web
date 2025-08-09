import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const mockData = {
    applicationTypes: [
      { type: 'New', percentage: 41, color: '#10b981' },
      { type: 'Renewal', percentage: 25, color: '#f59e0b' },
      { type: 'Amendment', percentage: 21, color: '#3b82f6' },
      { type: 'Transfer', percentage: 14, color: '#ef4444' }
    ],
    notifications: [
      {
        id: 1,
        title: 'New application #APP-2025-006 from S. Dlamini needs review.',
        time: '2m ago',
        type: 'review'
      },
      {
        id: 2,
        title: 'Route for #APP-2025-001 (J. van der Merwe) flagged for congestion.',
        time: '1h ago',
        type: 'warning'
      },
      {
        id: 3,
        title: 'Payment received for #APP-2024-103.',
        time: '3h ago',
        type: 'success'
      }
    ],
    insights: [
      {
        id: 1,
        text: 'Consider reviewing processing times for Minibus applications, they are trending higher.',
        type: 'analysis'
      }
    ]
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">Manage and track all permits.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <h3 className="card-title">Application Type Distribution</h3>
          <p className="card-subtitle">Distribution of applications by type.</p>
          
          <div className="pie-chart">
            <div className="chart-container">
              <div className="pie-chart-visual">
                {mockData.applicationTypes.map((item, index) => (
                  <div
                    key={item.type}
                    className="pie-slice"
                    style={{
                      background: `conic-gradient(${item.color} 0deg ${item.percentage * 3.6}deg, transparent ${item.percentage * 3.6}deg)`,
                      transform: `rotate(${index * 90}deg)`
                    }}
                  />
                ))}
              </div>
              <div className="chart-legend">
                {mockData.applicationTypes.map((item) => (
                  <div key={item.type} className="legend-item">
                    <div 
                      className="legend-color" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="legend-text">{item.type} ({item.percentage}%)</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card insights-card">
          <h3 className="card-title">Insights & Actions</h3>
          <p className="card-subtitle">Notifications, system suggestions, and AI-powered actions.</p>
          
          <div className="insights-content">
            <div className="insights-section">
              <h4 className="section-title">Notifications</h4>
              <div className="notifications-list">
                {mockData.notifications.map((notification) => (
                  <div key={notification.id} className="notification-item">
                    <div className="notification-content">
                      <p className="notification-text">{notification.title}</p>
                      <span className="notification-time">{notification.time}</span>
                    </div>
                    <div className="notification-actions">
                      <button className="action-button primary">
                        {notification.type === 'review' ? 'Review →' : 
                         notification.type === 'warning' ? 'View →' : 'View →'}
                      </button>
                      <button className="action-button ai">
                        <span className="ai-icon">⭐</span>
                        Call with AI
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="insights-section">
              <h4 className="section-title">Suggested Insights</h4>
              <div className="insights-list">
                {mockData.insights.map((insight) => (
                  <div key={insight.id} className="insight-item">
                    <p className="insight-text">{insight.text}</p>
                    <button className="action-button ai">
                      <span className="ai-icon">⭐</span>
                      Analyze with AI
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 