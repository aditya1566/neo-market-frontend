import React from 'react';
import { TrendingUp, Package, Users, ShoppingCart, AlertTriangle, BarChart3, ListChecks, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// FAKE DATA for simulation
const fakeStats = {
  totalRevenue: 245670,
  activeManifests: 89,
  neuralLinks: 124,
  sectorEfficiency: 94
};

const fakeLowStock = [
  { id: 1, name: "Polarizing Filter", category: "Optics", left: 3 },
  { id: 2, name: "Neural-Link Connector", category: "Hardware", left: 8 },
  { id: 3, name: "Biometric Sensor V2", category: "Robotics", left: 5 },
  { id: 4, name: "Cortex Uplink Hub", category: "Cybernetics", left: 9 },
];

const fakeRecentManifests = [
  { id: 'NK-8821', user: 'cipher.link', items: 3, total: 12400, status: 'Processing' },
  { id: 'NK-8822', user: 'echo.node', items: 1, total: 2400, status: 'Pending' },
  { id: 'NK-8823', user: 'nova.flux', items: 2, total: 8900, status: 'Processing' },
  { id: 'NK-8824', user: 'static.null', items: 5, total: 45000, status: 'Delivered' },
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <nav className="nav-glass admin-nav">
        <button className="cart-btn" onClick={() => navigate('/')}>
          <ArrowLeft size={18} /> Back to Market
        </button>
        <div className="brand admin-brand">COMMAND.CENTER v1.0</div>
      </nav>

      <main className="main-content dashboard-container">
        <h1 className="admin-title">Sector Sales Analysis</h1>

        {/* 1. KEY METRICS GRID */}
        <section className="stats-grid">
          <div className="stat-card neon-card-cyan">
            <div className="stat-header">
              <TrendingUp size={24} color="#00f2fe" />
              <span>Total Credits (Revenue)</span>
            </div>
            <h1>₹{fakeStats.totalRevenue.toLocaleString()}</h1>
            <p className="helper-text">+12% vs last cycle</p>
          </div>

          <div className="stat-card neon-card-cyan">
            <div className="stat-header">
              <ShoppingCart size={24} color="#00f2fe" />
              <span>Active Manifests</span>
            </div>
            <h1>{fakeStats.activeManifests}</h1>
            <p className="helper-text">15 pending authorization</p>
          </div>

          <div className="stat-card neon-card-cyan">
            <div className="stat-header">
              <Users size={24} color="#00f2fe" />
              <span>Neural Links (Users)</span>
            </div>
            <h1>{fakeStats.neuralLinks}</h1>
            <p className="helper-text">4 new citizens today</p>
          </div>

          <div className="stat-card neon-card-green">
            <div className="stat-header">
              <ListChecks size={24} color="#10b981" />
              <span>Sector Efficiency</span>
            </div>
            <h1>{fakeStats.sectorEfficiency}%</h1>
            <p className="helper-text helper-green">All link-servers optimal</p>
          </div>
        </section>

        <div className="dashboard-main-content">
          {/* 2. SALES CHART (SIMULATED) */}
          <div className="order-summary-card chart-card">
            <div className="stat-header">
              <BarChart3 size={20} color="#00f2fe" />
              <h3>Cycle Credits Flow (Sales Chart)</h3>
            </div>
            <div className="fake-chart">
              {[60, 45, 80, 55, 90, 100, 75].map((height, index) => (
                <div key={index} className="chart-bar-container">
                  <div className="chart-bar-fill" style={{ height: `${height}%` }}></div>
                  <span className="chart-label">S-{index+1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3. LOW STOCK ALERTS */}
          <div className="admin-inventory-card">
            <div className="stat-header low-stock-header">
              <AlertTriangle size={20} color="#ff4d4d" />
              <h3>Inventory Alerts (Low Stock)</h3>
            </div>
            <div className="low-stock-list">
              {fakeLowStock.map(item => (
                <div key={item.id} className="summary-item low-stock-item">
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600' }}>{item.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#113ec5' }}>{item.category} sector</div>
                  </div>
                  <div className="stock-count pulse-alert">Only {item.left} left</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. RECENT ORDERS TABLE */}
        <section className="recent-orders-section">
          <div className="stat-header" style={{ marginBottom: '20px' }}>
              <Package size={20} color="#00f2fe" />
              <h3>Recent Manifest Logs</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Manifest ID</th>
                <th>Citizen VPA</th>
                <th>Artifacts</th>
                <th>Final Credits</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {fakeRecentManifests.map(order => (
                <tr key={order.id}>
                  <td className="admin-id">{order.id}</td>
                  <td>{order.user}</td>
                  <td>{order.items}</td>
                  <td className="price-text-tiny">₹{order.total.toLocaleString()}</td>
                  <td className={`status-tag status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;