import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import './CTASection.css';

export const CTASection = ({ onOpenQuote }) => {
  return (
    <section className="cta-banner">
      <div className="container cta-inner">
        <div className="cta-content">
          <div className="cta-badge">
            <Sparkles size={14} /> Concierge Design Consultation
          </div>
          <h2 className="cta-title">
            Elevate Your Architectural Vision with Italian Stone
          </h2>
          <p className="cta-desc">
            Visit our flagship showroom to feel raw natural marble slabs in person, or request a bespoke project quote & material sample kit delivered to your studio.
          </p>
        </div>

        <div className="cta-buttons">
          <button className="btn btn-dark" onClick={() => onOpenQuote()}>
            Request Free Quote & Samples
          </button>
          <Link to="/contact" className="btn btn-secondary cta-outline-btn">
            Visit Showroom <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};
