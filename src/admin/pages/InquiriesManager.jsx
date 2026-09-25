import React, { useState } from 'react';
import { Inbox, CheckCircle2, Clock, Trash2, Search, Eye } from 'lucide-react';
import { useStorageData, saveInquiries } from '../../utils/storage';

export const InquiriesManager = () => {
  const [inquiries] = useStorageData('INQUIRIES');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const toggleStatus = (id) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status: inq.status === 'New' ? 'Handled' : 'New' };
      }
      return inq;
    });
    saveInquiries(updated);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this inquiry record?')) {
      saveInquiries(inquiries.filter((i) => i.id !== id));
      if (selectedInquiry && selectedInquiry.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const filteredInquiries = filterStatus === 'All'
    ? inquiries
    : inquiries.filter((i) => i.status === filterStatus);

  return (
    <div className="admin-inquiries-manager">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Leads & Quote Requests</h1>
          <p className="admin-page-sub">Submissions received from the public website contact form and product quote modals.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            className={`btn btn-sm ${filterStatus === 'All' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus('All')}
          >
            All ({inquiries.length})
          </button>
          <button
            className={`btn btn-sm ${filterStatus === 'New' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus('New')}
          >
            New ({inquiries.filter((i) => i.status === 'New').length})
          </button>
          <button
            className={`btn btn-sm ${filterStatus === 'Handled' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus('Handled')}
          >
            Handled ({inquiries.filter((i) => i.status === 'Handled').length})
          </button>
        </div>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Client Name</th>
              <th>Phone</th>
              <th>Product / Service Interest</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInquiries.map((inq) => (
              <tr key={inq.id}>
                <td>
                  <span style={{ fontSize: '0.8rem' }}>{new Date(inq.date).toLocaleString()}</span>
                </td>
                <td>
                  <strong>{inq.name}</strong>
                  {inq.email && <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--antique-gold)' }}>{inq.email}</span>}
                </td>
                <td>
                  <a href={`tel:${inq.phone}`} style={{ color: 'var(--espresso)', fontWeight: 600 }}>{inq.phone}</a>
                </td>
                <td>
                  <span className="badge">{inq.productInterest}</span>
                </td>
                <td>
                  <button
                    className={`badge ${inq.status === 'New' ? 'badge-terracotta' : 'badge-gold'}`}
                    style={{ border: 'none', cursor: 'pointer' }}
                    onClick={() => toggleStatus(inq.id)}
                    title="Click to toggle status"
                  >
                    {inq.status === 'New' ? '● New Lead' : '✓ Handled'}
                  </button>
                </td>
                <td>
                  <div className="action-btn-group">
                    <button className="icon-btn" onClick={() => setSelectedInquiry(inq)} title="View Details">
                      <Eye size={15} />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(inq.id)} title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Inquiry Detail View Modal */}
      {selectedInquiry && (
        <div className="modal-overlay" onClick={() => setSelectedInquiry(null)}>
          <div className="quote-modal-card" style={{ maxWidth: '580px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedInquiry(null)}>
              ✕
            </button>

            <div className="modal-header">
              <span className="modal-eyebrow">
                <Inbox size={14} /> Submission Details
              </span>
              <h3 className="modal-title">{selectedInquiry.name}</h3>
              <p className="modal-sub">Received on: {new Date(selectedInquiry.date).toLocaleString()}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--antique-gold)' }}>Phone: </strong>
                <a href={`tel:${selectedInquiry.phone}`}>{selectedInquiry.phone}</a>
              </div>
              {selectedInquiry.email && (
                <div>
                  <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--antique-gold)' }}>Email: </strong>
                  <a href={`mailto:${selectedInquiry.email}`}>{selectedInquiry.email}</a>
                </div>
              )}
              <div>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--antique-gold)' }}>Material Interest: </strong>
                <span>{selectedInquiry.productInterest}</span>
              </div>
              <div style={{ backgroundColor: 'var(--travertine)', padding: '1rem', border: '1px solid var(--hairline)' }}>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--espresso)', display: 'block', marginBottom: '0.4rem' }}>
                  Project Message:
                </strong>
                <p style={{ fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--charcoal)' }}>
                  {selectedInquiry.message || 'No additional message provided.'}
                </p>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className={`btn ${selectedInquiry.status === 'New' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => {
                  toggleStatus(selectedInquiry.id);
                  setSelectedInquiry({ ...selectedInquiry, status: selectedInquiry.status === 'New' ? 'Handled' : 'New' });
                }}
              >
                Mark as {selectedInquiry.status === 'New' ? 'Handled' : 'New Lead'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setSelectedInquiry(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
