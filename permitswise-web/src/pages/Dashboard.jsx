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
        <div className="header-content">
        <h1 className="dashboard-title">Dashboard</h1>
          <p className="dashboard-subtitle">Welcome to PermitWise Admin Portal. Manage and track all permits efficiently.</p>
        </div>
        <div className="header-stats">
          <div className="stat-item">
            <span className="stat-label">Total Users</span>
            <span className="stat-value">2,847</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active Sessions</span>
            <span className="stat-value">156</span>
          </div>
        </div>
      </div>

      {/* Analytics Highlights */}
      <div className="dashboard-grid kpi-grid">
        {[
          { title: 'Total Applications', value: '1,284', trend: 4.2, icon: '📄', color: 'var(--primary)' },
          { title: 'Avg. Processing Time', value: '5.6 days', trend: -1.1, icon: '⏱️', color: 'var(--warning)' },
          { title: 'Approval Rate', value: '78%', trend: 2.3, icon: '✅', color: 'var(--success)' },
          { title: 'Revenue (30d)', value: 'R 145k', trend: 3.4, icon: '💰', color: 'var(--accent)' }
        ].map((metric, idx) => (
          <div key={idx} className="dashboard-card kpi-card">
            <div className="kpi-header">
              <span className="kpi-icon" style={{ color: metric.color }}>{metric.icon}</span>
              <div className="kpi-trend" style={{ color: metric.trend > 0 ? 'var(--success)' : 'var(--danger)' }}>
                {metric.trend > 0 ? `▲ ${metric.trend}%` : `▼ ${Math.abs(metric.trend)}%`}
              </div>
            </div>
            <div className="kpi-content">
              <div className="kpi-title">{metric.title}</div>
              <div className="kpi-value">{metric.value}</div>
            </div>
            {/* Sparkline chart */}
            <div className="sparkline-container">
              <div className="sparkline-chart">
                {Array.from({ length: 20 }, (_, i) => (
                  <div 
                    key={i} 
                    className="sparkline-bar"
                    style={{ 
                      height: `${Math.random() * 60 + 20}%`,
                      backgroundColor: metric.color,
                      opacity: 0.6
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid main-content-grid">
        <div className="dashboard-card chart-card">
          <div className="card-header">
            <h3 className="card-title">Analytics Overview</h3>
            <p className="card-subtitle">Distribution of applications by type and regional insights.</p>
          </div>
          
          <div className="chart-section">
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
            
            {/* Additional charts */}
            <div className="additional-charts">
              <div className="chart-mini">
                <h4 className="chart-mini-title">Applications by Type</h4>
                <div className="chart-mini-content">
                  <div className="bar-chart">
                    {mockData.applicationTypes.map((item, index) => (
                      <div key={item.type} className="bar-item">
                        <div className="bar-label">{item.type}</div>
                        <div className="bar-container">
                          <div 
                            className="bar-fill" 
                            style={{ 
                              width: `${item.percentage}%`,
                              backgroundColor: item.color
                            }}
                          />
                        </div>
                        <div className="bar-value">{item.percentage}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="chart-mini">
                <h4 className="chart-mini-title">Regional Distribution</h4>
                <div className="chart-mini-content">
                  <div className="region-grid">
                    {['Gauteng', 'Western Cape', 'KZN', 'Eastern Cape'].map((region, index) => (
                      <div key={region} className="region-item">
                        <div className="region-name">{region}</div>
                        <div className="region-value">{Math.floor(Math.random() * 300) + 100}</div>
                      </div>
                    ))}
                  </div>
                </div>
            </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card insights-card">
          <div className="card-header">
          <h3 className="card-title">Insights & Actions</h3>
            <p className="card-subtitle">AI-powered notifications and system suggestions.</p>
          </div>
          
          <div className="insights-content">
            <div className="insights-section">
              <h4 className="section-title">
                <span className="section-icon">🔔</span>
                Recent Notifications
              </h4>
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
                        AI Assist
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="insights-section">
              <h4 className="section-title">
                <span className="section-icon">💡</span>
                AI Insights
              </h4>
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