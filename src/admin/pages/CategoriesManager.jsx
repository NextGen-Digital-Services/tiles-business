import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, FolderTree } from 'lucide-react';
import { useStorageData, saveCategories } from '../../utils/storage';

export const CategoriesManager = () => {
  const [categories] = useStorageData('CATEGORIES');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [formData, setFormData] = useState({ name: '', slug: '', description: '' });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', slug: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, slug: cat.slug, description: cat.description });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this category? Products assigned to it will remain in database.')) {
      saveCategories(categories.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name) return;

    const slug = formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    if (editingCategory) {
      const updated = categories.map((c) => (c.id === editingCategory.id ? { ...c, ...formData, slug } : c));
      saveCategories(updated);
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        slug,
        description: formData.description
      };
      saveCategories([...categories, newCat]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="admin-categories-manager">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Categories Manager</h1>
          <p className="admin-page-sub">Manage product categories used on the public catalog and filter bars.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add Category
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Slug / Filter ID</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>
                  <strong>{c.name}</strong>
                </td>
                <td>
                  <code style={{ background: 'var(--travertine)', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>{c.slug}</code>
                </td>
                <td>{c.description}</td>
                <td>
                  <div className="action-btn-group">
                    <button className="icon-btn" onClick={() => handleOpenEdit(c)} title="Edit">
                      <Edit2 size={15} />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(c.id)} title="Delete">
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
          <div className="quote-modal-card" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={22} />
            </button>

            <div className="modal-header">
              <span className="modal-eyebrow">
                <FolderTree size={14} /> Category CMS
              </span>
              <h3 className="modal-title">{editingCategory ? 'Edit Category' : 'Add New Category'}</h3>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Category Name *</label>
                <input
                  type="text"
                  required
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">URL Slug (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. marble-look"
                  className="form-input"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Category Description</label>
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
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
