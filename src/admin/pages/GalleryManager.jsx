import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';
import { useStorageData, saveGallery } from '../../utils/storage';

export const GalleryManager = () => {
  const [gallery] = useStorageData('GALLERY');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const initialForm = {
    title: '',
    category: 'Residential',
    location: '',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    materialsUsed: '',
    description: ''
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingItem(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({ ...item });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this project from portfolio gallery?')) {
      saveGallery(gallery.filter((g) => g.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) return;

    if (editingItem) {
      saveGallery(gallery.map((g) => (g.id === editingItem.id ? { ...formData } : g)));
    } else {
      const newItem = {
        ...formData,
        id: `proj-${Date.now()}`
      };
      saveGallery([newItem, ...gallery]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="admin-gallery-manager">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Projects Gallery Manager</h1>
          <p className="admin-page-sub">Manage completed stone installation showcase projects.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add New Project
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Project Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Materials Used</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gallery.map((g) => (
              <tr key={g.id}>
                <td>
                  <img src={g.image} alt={g.title} className="table-img-thumb" />
                </td>
                <td>
                  <strong>{g.title}</strong>
                </td>
                <td>
                  <span className="badge">{g.category}</span>
                </td>
                <td>{g.location}</td>
                <td>{g.materialsUsed}</td>
                <td>
                  <div className="action-btn-group">
                    <button className="icon-btn" onClick={() => handleOpenEdit(g)} title="Edit">
                      <Edit2 size={15} />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(g.id)} title="Delete">
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
          <div className="quote-modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={22} />
            </button>

            <div className="modal-header">
              <span className="modal-eyebrow">
                <ImageIcon size={14} /> Portfolio CMS
              </span>
              <h3 className="modal-title">{editingItem ? 'Edit Project Entry' : 'Add New Portfolio Project'}</h3>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Project Title *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Outdoor">Outdoor</option>
                    <option value="Bathroom">Bathroom</option>
                    <option value="Kitchen">Kitchen</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Location / City</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Materials Used</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.materialsUsed}
                    onChange={(e) => setFormData({ ...formData, materialsUsed: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL *</label>
                <input
                  type="url"
                  required
                  className="form-input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                {formData.image && (
                  <div className="image-preview-box">
                    <img src={formData.image} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Project Story / Description</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Project Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
