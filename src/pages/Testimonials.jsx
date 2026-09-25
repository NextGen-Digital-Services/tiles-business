import React, { useState } from 'react';
import { Star, Plus, CheckCircle, Send, Sparkles } from 'lucide-react';
import { useStorageData, saveTestimonials } from '../utils/storage';
import { SectionHeading } from '../components/SectionHeading';
import { TestimonialCard } from '../components/TestimonialCard';
import { CTASection } from '../components/CTASection';
import './Testimonials.css';

export const Testimonials = ({ onOpenQuote }) => {
  const [testimonials] = useStorageData('TESTIMONIALS');
  const [filterType, setFilterType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [newReview, setNewReview] = useState({
    name: '',
    role: '',
    quote: '',
    rating: 5,
    projectType: 'Luxury Villa Design'
  });

  const categories = ['All', 'Luxury Villa Design', 'Commercial Boutique Hotel', 'Private Residence Renovation'];

  const filteredTestimonials = filterType === 'All'
    ? testimonials
    : testimonials.filter(t => t.projectType === filterType);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.quote) return;

    const item = {
      id: `test-${Date.now()}`,
      name: newReview.name,
      role: newReview.role || 'Homeowner',
      quote: newReview.quote,
      rating: Number(newReview.rating),
      projectType: newReview.projectType,
      date: 'Just Now'
    };

    saveTestimonials([item, ...testimonials]);
    setSubmitted(true);
  };

  const handleResetModal = () => {
    setSubmitted(false);
    setIsModalOpen(false);
    setNewReview({ name: '', role: '', quote: '', rating: 5, projectType: 'Luxury Villa Design' });
  };

  return (
    <div className="testimonials-page">
      {/* Editorial Header */}
      <section className="section-wrapper bg-espresso testimonials-hero">
        <div className="container">
          <SectionHeading
            darkBg
            eyebrow="Architectural Endorsements"
            title="What Leading Designers & Owners Say About"
            italicTitleText="Our Atelier"
            subtitle="Discover unedited testimonials from principal architects, interior design studios, and luxury villa owners."
          />

          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Submit Your Client Experience
          </button>
        </div>
      </section>

      {/* Testimonials Wall */}
      <section className="section-wrapper bg-marble">
        <div className="container">
          {/* Filter Bar */}
          <div className="testimonials-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${filterType === cat ? 'active' : ''}`}
                onClick={() => setFilterType(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="testimonials-grid">
            {filteredTestimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* Submit Review Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={handleResetModal}>
          <div className="review-modal-card" onClick={(e) => e.stopPropagation()}>
            {submitted ? (
              <div className="modal-success-state">
                <CheckCircle size={56} className="success-icon" />
                <h3 className="success-title">Review Published</h3>
                <p className="success-desc">
                  Thank you, <strong>{newReview.name}</strong>. Your feedback has been saved and published to our testimonials directory.
                </p>
                <button className="btn btn-primary" onClick={handleResetModal}>
                  Close Window
                </button>
              </div>
            ) : (
              <>
                <div className="modal-header">
                  <span className="modal-eyebrow">
                    <Sparkles size={14} /> Share Experience
                  </span>
                  <h3 className="modal-title">Write a Client Review</h3>
                </div>

                <form className="modal-form" onSubmit={handleSubmitReview}>
                  <div className="form-group">
                    <label className="form-label">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Architect Marcus Vance"
                      className="form-input"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Professional Role / Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Principal Architect / Homeowner"
                      className="form-input"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Project Type</label>
                      <select
                        className="form-select"
                        value={newReview.projectType}
                        onChange={(e) => setNewReview({ ...newReview, projectType: e.target.value })}
                      >
                        <option value="Luxury Villa Design">Luxury Villa Design</option>
                        <option value="Commercial Boutique Hotel">Commercial Boutique Hotel</option>
                        <option value="Private Residence Renovation">Private Residence Renovation</option>
                        <option value="Spa & Hospitality">Spa & Hospitality</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Rating (1 to 5 Stars)</label>
                      <select
                        className="form-select"
                        value={newReview.rating}
                        onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                      >
                        <option value="5">5 Stars — Outstanding</option>
                        <option value="4">4 Stars — Excellent</option>
                        <option value="3">3 Stars — Good</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Review & Feedback *</label>
                    <textarea
                      required
                      className="form-textarea"
                      placeholder="Describe the material quality, stone installation, and overall showroom experience..."
                      value={newReview.quote}
                      onChange={(e) => setNewReview({ ...newReview, quote: e.target.value })}
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="button" className="btn btn-secondary" onClick={handleResetModal}>
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Publish Review <Send size={15} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Final CTA */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
