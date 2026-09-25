import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Inbox, Image, MessageSquareQuote, Plus, ArrowRight, Clock, CheckCircle2 } from 'lucide-react';
import { useStorageData } from '../../utils/storage';
import { StatCounter } from '../../components/StatCounter';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const [products] = useStorageData('PRODUCTS');
  const [inquiries] = useStorageData('INQUIRIES');
  const [gallery] = useStorageData('GALLERY');
  const [testimonials] = useStorageData('TESTIMONIALS');

  const recentInquiries = inquiries.slice(0, 5);
  const pendingInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <div className="admin-dashboard-page">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Executive Dashboard</h1>
          <p className="admin-page-sub">Overview of your online catalog, client quote leads, and site content.</p>
        </div>
        <div className="dashboard-header-actions">
          <Link to="/admin/products" className="btn btn-primary btn-sm">
            <Plus size={15} /> Add New Product
          </Link>
          <Link to="/admin/gallery" className="btn btn-secondary btn-sm">
            <Plus size={15} /> Add Gallery Project
          </Link>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="admin-metrics-grid">
        <div className="metric-box">
          <div className="metric-icon-box">
            <Package size={24} />
          </div>
          <div className="metric-data">
            <StatCounter label="Active Products" value={products.length} />
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-box">
            <Inbox size={24} />
          </div>
          <div className="metric-data">
            <StatCounter label="Total Leads & Inquiries" value={inquiries.length} />
            {pendingInquiriesCount > 0 && (
              <span className="metric-sub-badge">{pendingInquiriesCount} New Leads</span>
            )}
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-box">
            <Image size={24} />
          </div>
          <div className="metric-data">
            <StatCounter label="Portfolio Projects" value={gallery.length} />
          </div>
        </div>

        <div className="metric-box">
          <div className="metric-icon-box">
            <MessageSquareQuote size={24} />
          </div>
          <div className="metric-data">
            <StatCounter label="Client Testimonials" value={testimonials.length} />
          </div>
        </div>
      </div>

      {/* Recent Inquiries Panel */}
      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <h3>Recent Quote Requests & Inquiries</h3>
          <Link to="/admin/inquiries" className="view-all-link">
            View All Inquiries ({inquiries.length}) <ArrowRight size={14} />
          </Link>
        </div>

        <div className="admin-table-card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Contact Phone</th>
                <th>Product Interest</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <span className="inq-date">{new Date(inq.date).toLocaleDateString()}</span>
                  </td>
                  <td>
                    <strong>{inq.name}</strong>
                    {inq.email && <span className="inq-email">{inq.email}</span>}
                  </td>
                  <td>{inq.phone}</td>
                  <td>
                    <span className="badge">{inq.productInterest}</span>
                  </td>
                  <td>
                    {inq.status === 'New' ? (
                      <span className="badge badge-terracotta">New Inquiry</span>
                    ) : (
                      <span className="badge badge-gold">Handled</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
