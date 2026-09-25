import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Send, Sparkles } from 'lucide-react';
import { addInquiry, getCategories } from '../utils/storage';
import './QuoteModal.css';

export const QuoteModal = ({ isOpen, onClose, selectedProduct = null }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productInterest: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const categories = getCategories();

  useEffect(() => {
    if (selectedProduct) {
      setFormData((prev) => ({
        ...prev,
        productInterest: typeof selectedProduct === 'string' ? selectedProduct : selectedProduct.name
      }));
    }
  }, [selectedProduct]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      productInterest: formData.productInterest || 'General Atelier Inquiry',
      message: formData.message
    });

    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', phone: '', productInterest: '', message: '' });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="quote-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={22} />
        </button>

        {submitted ? (
          <div className="modal-success-state">
            <CheckCircle size={56} className="success-icon" />
            <h3 className="success-title">Quote Request Received</h3>
            <p className="success-desc">
              Thank you, <strong>{formData.name}</strong>. Our senior natural stone consultant will contact you via <strong>{formData.phone}</strong> within 24 business hours with specifications & estimates.
            </p>
            <button className="btn btn-primary" onClick={handleReset}>
              Close & Return
            </button>
          </div>
        ) : (
          <>
            <div className="modal-header">
              <div className="modal-eyebrow">
                <Sparkles size={14} /> Direct Inquiry
              </div>
              <h3 className="modal-title">Request a Bespoke Quote</h3>
              <p className="modal-sub">
                {selectedProduct
                  ? `Inquiring about: ${typeof selectedProduct === 'string' ? selectedProduct : selectedProduct.name}`
                  : 'Receive estimated pricing, stock availability, and material sample kits.'}
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Architect Sarah Jenkins"
                  className="form-input"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    placeholder="sarah@studio.com"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Collection or Material Interest</label>
                <input
                  type="text"
                  placeholder="e.g. Calacatta Oro, 20mm Outdoor Pavers"
                  className="form-input"
                  value={formData.productInterest}
                  onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Project Details / Estimated Area (Sq Ft / Sq M)</label>
                <textarea
                  placeholder="Tell us about your space, dimensions, or specific installation timeline..."
                  className="form-textarea"
                  rows="3"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Submit Inquiry <Send size={15} />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
