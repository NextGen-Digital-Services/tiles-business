import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Maximize2 } from 'lucide-react';
import './ProductCard.css';

export const ProductCard = ({ product, onOpenQuote }) => {
  const { id, name, category, image, size, finish, priceCategory } = product;

  const categoryLabels = {
    'floor': 'Floor Tiles',
    'wall': 'Wall Tiles',
    'marble-look': 'Marble-Look Slab',
    'wood-look': 'Wood Plank',
    'outdoor': '20mm Outdoor',
    'mosaic': 'Mosaic Accent',
    'bathroom': 'Bathroom',
    'kitchen': 'Kitchen'
  };

  return (
    <div className="product-card">
      <div className="product-image-wrap">
        <img src={image} alt={name} className="product-img" loading="lazy" />
        <span className="product-badge">{categoryLabels[category] || category}</span>
        {priceCategory && <span className="product-tier">{priceCategory}</span>}
      </div>

      <div className="product-info">
        <h3 className="product-title">{name}</h3>
        
        <div className="product-specs">
          <div className="spec-item">
            <Maximize2 size={13} className="spec-icon" />
            <span>{size}</span>
          </div>
          <div className="spec-item">
            <Layers size={13} className="spec-icon" />
            <span>{finish}</span>
          </div>
        </div>

        <div className="product-card-footer">
          <Link to={`/product/${id}`} className="btn-link">
            View Details <ArrowRight size={14} />
          </Link>
          <button
            className="btn btn-outline-gold btn-sm"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onOpenQuote(product);
            }}
          >
            Quote
          </button>
        </div>
      </div>
    </div>
  );
};
