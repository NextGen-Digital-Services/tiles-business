import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Shield, ArrowUpRight } from 'lucide-react';
import { getSettings } from '../utils/storage';
import './Footer.css';

export const Footer = ({ onOpenQuote }) => {
  const settings = getSettings();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        {/* Brand & Story */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="logo-title">{settings.businessName || '[CLIENT_BUSINESS_NAME]'}</span>
            <span className="logo-sub">{settings.tagline || 'MARBLE & TILES ATELIER'}</span>
          </Link>
          <p className="footer-bio">
            Curating rare Italian marble, large-format porcelain slabs, and handcrafted architectural tiles for luxury residential estates, commercial developments, and boutique interiors.
          </p>
          <div className="footer-actions">
            <button className="btn btn-outline-gold btn-sm" onClick={() => onOpenQuote()}>
              Request Catalog & Quote
            </button>
          </div>
        </div>

        {/* Collections Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Collections</h4>
          <ul className="footer-links">
            <li><Link to="/collections?cat=marble-look">Marble-Look Slabs</Link></li>
            <li><Link to="/collections?cat=floor">Vitrified Floor Tiles</Link></li>
            <li><Link to="/collections?cat=wall">Artisanal Wall Tiles</Link></li>
            <li><Link to="/collections?cat=wood-look">Wood-Look Planks</Link></li>
            <li><Link to="/collections?cat=outdoor">20mm Exterior Pavers</Link></li>
            <li><Link to="/collections?cat=mosaic">Handmade Mosaics</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Navigation</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Our Atelier</Link></li>
            <li><Link to="/projects">Project Portfolio</Link></li>
            <li><Link to="/services">Installation Services</Link></li>
            <li><Link to="/quality">Italian Sourcing & Standards</Link></li>
            <li><Link to="/testimonials">Client Reviews</Link></li>
            <li><Link to="/contact">Showroom Contact</Link></li>
          </ul>
        </div>

        {/* Showroom & Contact */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Flagship Showroom</h4>
          <ul className="contact-list">
            <li>
              <MapPin size={16} className="contact-icon" />
              <span>{settings.address || '[CLIENT_CITY / SHOWROOM_ADDRESS]'}</span>
            </li>
            <li>
              <Phone size={16} className="contact-icon" />
              <a href={`tel:${settings.phone}`}>{settings.phone || '[CLIENT_PHONE]'}</a>
            </li>
            <li>
              <Mail size={16} className="contact-icon" />
              <a href={`mailto:${settings.email}`}>{settings.email || '[CLIENT_EMAIL]'}</a>
            </li>
            <li>
              <Clock size={16} className="contact-icon" />
              <span>{settings.workingHours || '[WORKING_HOURS]'}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>© {new Date().getFullYear()} {settings.businessName || '[CLIENT_BUSINESS_NAME]'}. All rights reserved. Italian Marble & Tiles Atelier.</p>
          <div className="footer-bottom-links">
            <Link to="/admin/login" className="admin-portal-link">
              <Shield size={14} /> Admin CMS Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
