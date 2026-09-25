import React, { useState } from 'react';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import { useStorageData, saveSettings } from '../../utils/storage';

export const SiteSettings = () => {
  const [settings] = useStorageData('SETTINGS');
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="admin-site-settings">
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Global Site Settings</h1>
          <p className="admin-page-sub">Edit business identity, hero headlines, showroom contact details, and milestone counters.</p>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          <Save size={16} /> Save All Changes
        </button>
      </div>

      {savedSuccess && (
        <div style={{ backgroundColor: 'var(--travertine)', border: '1px solid var(--antique-gold)', color: 'var(--espresso)', padding: '1rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <CheckCircle2 size={20} style={{ color: 'var(--antique-gold)' }} />
          <strong>Site Settings Updated Live!</strong> Public website navigation, hero, and footer are now updated.
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ backgroundColor: 'var(--white)', border: '1px solid var(--hairline)', padding: '2.5rem' }}>
        <h3 className="specs-title" style={{ marginBottom: '1.5rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--hairline)' }}>
          Brand Identity & Hero Headlines
        </h3>

        <div className="modal-form-grid">
          <div className="form-group">
            <label className="form-label">Client Business Name *</label>
            <input
              type="text"
              required
              className="form-input"
              value={formData.businessName || ''}
              onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Brand Tagline</label>
            <input
              type="text"
              className="form-input"
              value={formData.tagline || ''}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Homepage Main Hero Headline *</label>
          <input
            type="text"
            required
            className="form-input"
            value={formData.heroHeadline || ''}
            onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Homepage Hero Subheadline</label>
          <textarea
            className="form-textarea"
            rows="2"
            value={formData.heroSubheadline || ''}
            onChange={(e) => setFormData({ ...formData, heroSubheadline: e.target.value })}
          />
        </div>

        <h3 className="specs-title" style={{ margin: '2.5rem 0 1.5rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--hairline)' }}>
          Showroom & Contact Details
        </h3>

        <div className="modal-form-grid">
          <div className="form-group">
            <label className="form-label">Showroom Physical Address</label>
            <input
              type="text"
              className="form-input"
              value={formData.address || ''}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Operating Hours</label>
            <input
              type="text"
              className="form-input"
              value={formData.workingHours || ''}
              onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
            />
          </div>
        </div>

        <div className="modal-form-grid">
          <div className="form-group">
            <label className="form-label">Primary Phone Number</label>
            <input
              type="text"
              className="form-input"
              value={formData.phone || ''}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">WhatsApp Click-to-Chat Number</label>
            <input
              type="text"
              className="form-input"
              value={formData.whatsapp || ''}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Inquiries Email Address</label>
          <input
            type="email"
            className="form-input"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <h3 className="specs-title" style={{ margin: '2.5rem 0 1.5rem 0', paddingBottom: '0.5rem', borderBottom: '1px solid var(--hairline)' }}>
          Stat Counter Strip Values
        </h3>

        <div className="modal-form-grid">
          <div className="form-group">
            <label className="form-label">Years in Business</label>
            <input
              type="text"
              className="form-input"
              value={formData.yearsInBusiness || ''}
              onChange={(e) => setFormData({ ...formData, yearsInBusiness: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Projects Completed</label>
            <input
              type="text"
              className="form-input"
              value={formData.projectsCompleted || ''}
              onChange={(e) => setFormData({ ...formData, projectsCompleted: e.target.value })}
            />
          </div>
        </div>

        <div className="modal-form-grid">
          <div className="form-group">
            <label className="form-label">Sq. Ft. Installed</label>
            <input
              type="text"
              className="form-input"
              value={formData.sqftInstalled || ''}
              onChange={(e) => setFormData({ ...formData, sqftInstalled: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cities Served</label>
            <input
              type="text"
              className="form-input"
              value={formData.citiesServed || ''}
              onChange={(e) => setFormData({ ...formData, citiesServed: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={16} /> Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
};
