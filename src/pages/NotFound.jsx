import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import './NotFound.css';

export const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-card">
          <span className="eyebrow">Error 404</span>
          <h1 className="not-found-title">
            Page Beyond <span className="serif-italic">The Quarry</span>
          </h1>
          <p className="not-found-desc">
            The architectural collection or page you requested could not be located in our catalog repository. It may have been moved or renamed.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary">
              <ArrowLeft size={16} /> Return to Atelier Home
            </Link>
            <Link to="/collections" className="btn btn-secondary">
              <Compass size={16} /> Explore Collections
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
