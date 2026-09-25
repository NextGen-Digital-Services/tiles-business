import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, Navigation } from 'lucide-react';
import { useStorageData, addInquiry } from '../utils/storage';
import { SectionHeading } from '../components/SectionHeading';
import './Contact.css';

export const Contact = () => {
  const [settings] = useStorageData('SETTINGS');
  const [products] = useStorageData('PRODUCTS');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productInterest: 'General Showroom Visit & Quote',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      productInterest: formData.productInterest,
      message: formData.message
    });

    setSubmitted(true);
  };

  const cleanPhone = (settings.whatsapp || settings.phone || '').replace(/[^0-9]/g, '');

  return (
    <div className="contact-page">
      {/* Editorial Header */}
      <section className="section-wrapper bg-espresso contact-hero">
        <div className="container">
          <SectionHeading
            darkBg
            eyebrow="Flagship Atelier"
            title="Visit Our Showroom & Request a"
            italicTitleText="Bespoke Consultation"
            subtitle="Connect with our stone specialists, inspect physical dry-lay marble slabs, or request direct project estimates."
          />
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="section-wrapper bg-marble">
        <div className="container">
          <div className="contact-main-grid">
            {/* Direct Contact & Showroom Meta Column */}
            <div className="contact-info-col">
              <h3 className="info-col-title">Showroom Details & Concierge</h3>
              <p className="info-col-sub">
                Our flagship studio is designed to give you tactile access to full-scale marble bookmatches and tile collections.
              </p>

              <div className="contact-card-list">
                <div className="contact-meta-card">
                  <MapPin size={22} className="meta-icon" />
                  <div>
                    <h4>Flagship Address</h4>
                    <p>{settings.address || '[CLIENT_CITY / SHOWROOM_ADDRESS]'}</p>
                  </div>
                </div>

                <div className="contact-meta-card">
                  <Phone size={22} className="meta-icon" />
                  <div>
                    <h4>Direct Phone Line</h4>
                    <p><a href={`tel:${settings.phone}`}>{settings.phone || '[CLIENT_PHONE]'}</a></p>
                  </div>
                </div>

                <div className="contact-meta-card">
                  <Mail size={22} className="meta-icon" />
                  <div>
                    <h4>Architectural Inquiries Email</h4>
                    <p><a href={`mailto:${settings.email}`}>{settings.email || '[CLIENT_EMAIL]'}</a></p>
                  </div>
                </div>

                <div className="contact-meta-card">
                  <Clock size={22} className="meta-icon" />
                  <div>
                    <h4>Operating Hours</h4>
                    <p>{settings.workingHours || '[WORKING_HOURS]'}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Chat */}
              <div className="whatsapp-box">
                <MessageSquare size={24} className="wa-icon" />
                <div className="wa-text">
                  <h4>Need Instant Assistance via WhatsApp?</h4>
                  <p>Send project photos or CAD drawings directly to our stone consultant.</p>
                </div>
                <a
                  href={`https://wa.me/${cleanPhone || '15550000000'}?text=Hello%20${encodeURIComponent(settings.businessName || 'Atelier')},%20I%20would%20like%20to%20inquire%20about%20your%20tiles%20and%20marble%20collections.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Inquiry Form Column */}
            <div className="contact-form-col">
              <div className="form-card">
                {submitted ? (
                  <div className="form-success-box">
                    <CheckCircle2 size={56} className="success-icon" />
                    <h3 className="success-title">Message & Inquiry Sent</h3>
                    <p className="success-desc">
                      Thank you, <strong>{formData.name}</strong>. Your message has been saved into our system. Our team will contact you at <strong>{formData.phone}</strong> shortly.
                    </p>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', productInterest: 'General Showroom Visit & Quote', message: '' });
                      }}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <h3 className="form-card-title">Send a Direct Inquiry</h3>
                    <p className="form-card-sub">Submissions appear live in our Admin Portal for immediate review.</p>

                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Sarah Jenkins"
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
                        <label className="form-label">Material / Collection Interest</label>
                        <select
                          className="form-select"
                          value={formData.productInterest}
                          onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                        >
                          <option value="General Showroom Visit & Quote">General Showroom Visit & Quote</option>
                          {products.map((p) => (
                            <option key={p.id} value={p.name}>
                              {p.name} ({p.size})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Message / Project Requirements *</label>
                        <textarea
                          required
                          className="form-textarea"
                          rows="4"
                          placeholder="Specify estimated square footage, room type (bathroom, floor, pool), or special cut requests..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <button type="submit" className="btn btn-primary btn-full">
                        Submit Inquiry to Atelier <Send size={15} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Styled Interactive Map Section */}
      <section className="section-wrapper bg-travertine map-section">
        <div className="container">
          <div className="map-card-wrapper">
            <div className="map-meta-overlay">
              <MapPin size={24} className="map-pin-icon" />
              <div>
                <h4 className="map-overlay-title">{settings.businessName || '[CLIENT_BUSINESS_NAME]'} Flagship</h4>
                <p className="map-overlay-sub">{settings.address || '[CLIENT_CITY / SHOWROOM_ADDRESS]'}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(settings.address || '[CLIENT_CITY / SHOWROOM_ADDRESS]')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline-gold btn-sm map-dir-btn"
                >
                  Get GPS Directions <Navigation size={13} />
                </a>
              </div>
            </div>
            
            <div className="styled-static-map">
              <div className="map-pattern-grid" />
              <span className="map-marker-ping" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
