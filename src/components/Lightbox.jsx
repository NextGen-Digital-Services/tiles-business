import React from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import './Lightbox.css';

export const Lightbox = ({ isOpen, onClose, image, title, description, location, onNext, onPrev }) => {
  if (!isOpen || !image) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-container" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <X size={26} />
        </button>

        {onPrev && (
          <button className="lightbox-nav nav-prev" onClick={onPrev}>
            <ChevronLeft size={30} />
          </button>
        )}

        <div className="lightbox-content">
          <div className="lightbox-media">
            <img src={image} alt={title || 'Project preview'} />
          </div>

          {(title || description) && (
            <div className="lightbox-meta">
              <h3 className="lightbox-title">{title}</h3>
              {location && (
                <p className="lightbox-location">
                  <MapPin size={14} /> {location}
                </p>
              )}
              {description && <p className="lightbox-desc">{description}</p>}
            </div>
          )}
        </div>

        {onNext && (
          <button className="lightbox-nav nav-next" onClick={onNext}>
            <ChevronRight size={30} />
          </button>
        )}
      </div>
    </div>
  );
};
