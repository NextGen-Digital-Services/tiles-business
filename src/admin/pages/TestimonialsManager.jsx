import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Star, MessageSquareQuote } from 'lucide-react';
import { useStorageData, saveTestimonials } from '../../utils/storage';

export const TestimonialsManager = () => {
  const [testimonials] = useStorageData('TESTIMONIALS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    name: '',
    role: '',
    quote: '',
    rating: 5,
    projectType: 'Luxury Villa Design',
    date: 'Recent'
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t) => {
    setEditingItem(t);
    setFormData({ ...t });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this client review?')) {
      saveTestimonials(testimonials.filter((t) => t.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.quote) return;

    if (editingItem) {
      saveTestimonials(testimonials.map((t) => (t.id === editingItem.id ? { ...formData } : t)));
    } else {
      const newItem = {
        ...formData,
        id: `test-${Date.now()}`
      };
      saveTestimonials([newItem, ...testimonials]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="admin-testimonials-manager">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Testimonials Manager</h1>
          <p className="admin-page-sub">Manage client reviews and ratings displayed across public site.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Role / Studio</th>
              <th>Rating</th>
              <th>Quote Snippet</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td>
                  <strong>{t.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--antique-gold)' }}>{t.projectType}</span>
                </td>
                <td>{t.role}</td>
                <td>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} size={13} fill="#B08D57" color="#B08D57" />
                    ))}
                  </div>
                </td>
                <td style={{ maxWidth: '300px' }}>
                  <p style={{ fontStyle: 'italic', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    "{t.quote}"
                  </p>
                </td>
                <td>
                  <div className="action-btn-group">
                    <button className="icon-btn" onClick={() => handleOpenEdit(t)} title="Edit">
                      <Edit2 size={15} />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(t.id)} title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="quote-modal-card" style={{ maxWidth: '560px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={22} />
            </button>

            <div className="modal-header">
              <span className="modal-eyebrow">
                <MessageSquareQuote size={14} /> Reviews CMS
              </span>
              <h3 className="modal-title">{editingItem ? 'Edit Testimonial' : 'Add Client Testimonial'}</h3>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Client Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Role / Studio Name</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                />
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Project Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Star Rating (1 to 5)</label>
                  <select
                    className="form-select"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Full Quote / Testimonial *</label>
                <textarea
                  required
                  className="form-textarea"
                  rows="4"
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
