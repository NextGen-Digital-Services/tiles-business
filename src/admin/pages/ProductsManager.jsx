import React, { useState } from 'react';
import { Plus, Edit2, Trash2, X, Check, Image as ImageIcon, Sparkles } from 'lucide-react';
import { useStorageData, saveProducts } from '../../utils/storage';

export const ProductsManager = () => {
  const [products] = useStorageData('PRODUCTS');
  const [categories] = useStorageData('CATEGORIES');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const initialForm = {
    name: '',
    category: 'marble-look',
    priceCategory: 'Luxury Premium',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    size: '1200x2400 mm',
    finish: 'Polished High-Gloss',
    material: 'Vitrified Porcelain',
    thickness: '9 mm',
    application: 'Indoor Living, Feature Walls',
    origin: 'Tuscany, Italy',
    description: '',
    featured: false,
    inStock: true
  };

  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setFormData({ ...product });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this collection from the public catalog?')) {
      const updated = products.filter((p) => p.id !== id);
      saveProducts(updated);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.image) return;

    if (editingProduct) {
      const updated = products.map((p) => (p.id === editingProduct.id ? { ...formData } : p));
      saveProducts(updated);
    } else {
      const newProduct = {
        ...formData,
        id: `prod-${Date.now()}`
      };
      saveProducts([newProduct, ...products]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="admin-products-manager">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Products & Collections Manager</h1>
          <p className="admin-page-sub">Manage items displayed on the public Collections catalog and homepage.</p>
        </div>
        <button className="btn btn-primary" onClick={handleOpenAdd}>
          <Plus size={16} /> Add New Collection
        </button>
      </div>

      <div className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Preview</th>
              <th>Collection Name</th>
              <th>Category</th>
              <th>Size & Finish</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} className="table-img-thumb" />
                </td>
                <td>
                  <strong>{p.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.78rem', color: 'var(--antique-gold)' }}>
                    {p.priceCategory}
                  </span>
                </td>
                <td>
                  <span className="badge">{p.category}</span>
                </td>
                <td>
                  <div>{p.size}</div>
                  <small style={{ color: 'var(--charcoal)' }}>{p.finish}</small>
                </td>
                <td>
                  {p.featured ? (
                    <span className="badge badge-gold">Home Featured</span>
                  ) : (
                    <span style={{ fontSize: '0.8rem', color: '#999' }}>Standard</span>
                  )}
                </td>
                <td>
                  <div className="action-btn-group">
                    <button className="icon-btn" onClick={() => handleOpenEdit(p)} title="Edit">
                      <Edit2 size={15} />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(p.id)} title="Delete">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="quote-modal-card" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsModalOpen(false)}>
              <X size={22} />
            </button>

            <div className="modal-header">
              <span className="modal-eyebrow">
                <Sparkles size={14} /> Catalog CMS
              </span>
              <h3 className="modal-title">{editingProduct ? 'Edit Product Collection' : 'Add New Product Collection'}</h3>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Collection Name *</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    className="form-select"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Image URL (Unsplash or direct image link) *</label>
                <input
                  type="url"
                  required
                  className="form-input"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
                {formData.image && (
                  <div className="image-preview-box">
                    <img src={formData.image} alt="Live preview" />
                  </div>
                )}
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Dimensions / Size</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Surface Finish</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.finish}
                    onChange={(e) => setFormData({ ...formData, finish: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Material Composition</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Thickness</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.thickness}
                    onChange={(e) => setFormData({ ...formData, thickness: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Description & Aesthetic Details</label>
                <textarea
                  className="form-textarea"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="modal-form-grid">
                <div className="form-group">
                  <label className="form-label">Price Category Tag</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.priceCategory}
                    onChange={(e) => setFormData({ ...formData, priceCategory: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    />
                    <span>Feature on Homepage</span>
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
