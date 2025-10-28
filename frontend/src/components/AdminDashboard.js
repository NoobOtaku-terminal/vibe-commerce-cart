import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAdminStats, getAdminOrders, updateOrderStatus, getAdminUsers } from '../api';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [statsRes, ordersRes, usersRes] = await Promise.all([
        getAdminStats(),
        getAdminOrders(),
        getAdminUsers()
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (ordersRes.success) setOrders(ordersRes.data);
      if (usersRes.success) setUsers(usersRes.data);
    } catch (error) {
      console.error('Error loading admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadData();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  if (loading) {
    return <div className="admin-loading">Loading admin panel...</div>;
  }

  return (
    <div className="admin-dashboard">
      <motion.div 
        className="admin-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>Admin Dashboard</h1>
        <p>Manage your e-commerce platform</p>
      </motion.div>

      <div className="admin-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          Orders
        </button>
        <button 
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
      </div>

      {activeTab === 'overview' && stats && (
        <motion.div 
          className="stats-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="stat-card">
            <span className="stat-icon">👥</span>
            <h3>Total Users</h3>
            <p className="stat-value">{stats.totalUsers}</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">📦</span>
            <h3>Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💰</span>
            <h3>Revenue</h3>
            <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
          </div>
          <div className="stat-card">
            <span className="stat-icon">⏳</span>
            <h3>Pending Orders</h3>
            <p className="stat-value">{stats.pendingOrders}</p>
          </div>
        </motion.div>
      )}

      {activeTab === 'orders' && (
        <motion.div 
          className="orders-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Recent Orders</h2>
          <div className="orders-table">
            {orders.map((order) => (
              <div key={order.id} className="order-row">
                <div className="order-info">
                  <strong>Order #{order.id}</strong>
                  <p>{order.user_name} ({order.user_email})</p>
                  <p>${order.total.toFixed(2)}</p>
                </div>
                <div className="order-status">
                  <select 
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className={`status-select status-${order.status}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {activeTab === 'users' && (
        <motion.div 
          className="users-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <h2>Users ({users.length})</h2>
          <div className="users-table">
            {users.map((user) => (
              <div key={user.id} className="user-row">
                <div className="user-info">
                  <strong>{user.name}</strong>
                  <p>{user.email}</p>
                </div>
                <span className={`user-role role-${user.role}`}>{user.role}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default AdminDashboard;
