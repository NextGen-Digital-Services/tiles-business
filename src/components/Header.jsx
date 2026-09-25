import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, UserCheck } from 'lucide-react';
import { getSettings } from '../utils/storage';
import './Header.css';

export const Header = ({ onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const settings = getSettings();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'COLLECTIONS', path: '/collections' },
    { name: 'PROJECTS', path: '/projects' },
    { name: 'SERVICES', path: '/services' },
    { name: 'QUALITY & SOURCING', path: '/quality' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'TESTIMONIALS', path: '/testimonials' },
    { name: 'CONTACT', path: '/contact' }
  ];

  return (
    <>
      {/* Top Announcement & Quick Contact Bar */}
      <div className="top-bar">
        <div className="container top-bar-inner">
          <div className="top-bar-left">
            <span className="top-badge">Italian Atelier</span>
            <span className="top-text">Direct Quarry Sourcing & Handcrafted Stone Installation</span>
          </div>
          <div className="top-bar-right">
            <a href={`tel:${settings.phone}`} className="top-contact">
              <Phone size={13} />
              <span>{settings.phone}</span>
            </a>
            <span className="top-divider">|</span>
            <Link to="/admin/login" className="top-admin-link">
              <UserCheck size={13} />
              <span>Admin Panel</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container header-inner">
          {/* Brand Logo (Left Aligned) */}
          <Link to="/" className="brand-logo">
            <span className="brand-name">{settings.businessName || '[CLIENT_BUSINESS_NAME]'}</span>
            <span className="brand-subtext">TILES & MARBLE ATELIER</span>
          </Link>

          {/* Desktop Navigation (Visually Centered) */}
          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Quick Actions / CTA Button (Right Aligned) */}
          <div className="header-actions">
            <button className="btn btn-header-cta" onClick={() => onOpenQuote()}>
              Request Quote
            </button>
            
            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="brand-logo">
            <span className="brand-name">{settings.businessName || '[CLIENT_BUSINESS_NAME]'}</span>
            <span className="brand-subtext">TILES & MARBLE ATELIER</span>
          </div>
          <button className="close-btn" onClick={() => setMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`mobile-nav-item ${location.pathname === link.path ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
          <div className="drawer-footer">
            <button
              className="btn btn-primary btn-full"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
            >
              Request a Custom Quote
            </button>
            <div className="drawer-contact-info">
              <p><strong>Showroom:</strong> {settings.address}</p>
              <p><strong>Call:</strong> {settings.phone}</p>
              <p><strong>Hours:</strong> {settings.workingHours}</p>
            </div>
          </div>
        </nav>
      </div>
      {mobileMenuOpen && <div className="drawer-overlay" onClick={() => setMobileMenuOpen(false)} />}
    </>
  );
};
