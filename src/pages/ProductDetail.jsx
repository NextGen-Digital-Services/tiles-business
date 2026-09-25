import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ShieldCheck, Sparkles, Maximize2, Layers, MapPin, PackageCheck, Send } from 'lucide-react';
import { useStorageData } from '../utils/storage';
import { ProductCard } from '../components/ProductCard';
import { CTASection } from '../components/CTASection';
import './ProductDetail.css';

export const ProductDetail = ({ onOpenQuote }) => {
  const { id } = useParams();
  const [products] = useStorageData('PRODUCTS');

  const product = products.find((p) => p.id === id) || products[0];

  const galleryImages = product.galleryImages && product.galleryImages.length > 0
    ? product.galleryImages
    : [product.image];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);

  // Related products
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="product-detail-page">
      {/* Top Breadcrumb Header */}
      <section className="section-wrapper bg-espresso detail-header">
        <div className="container">
          <Link to="/collections" className="back-link">
            <ArrowLeft size={16} /> Back to Collections Catalog
          </Link>
          <div className="detail-header-meta">
            <span className="eyebrow">{product.priceCategory || 'Signature Collection'}</span>
            <h1 className="detail-title">{product.name}</h1>
          </div>
        </div>
      </section>

      {/* Main Detail Grid */}
      <section className="section-wrapper bg-white">
        <div className="container">
          <div className="detail-main-grid">
            {/* Gallery Column */}
            <div className="detail-gallery-col">
              <div className="main-image-wrap">
                <img src={activeImage || product.image} alt={product.name} className="main-detail-img" />
                {product.inStock && (
                  <span className="stock-badge">
                    <PackageCheck size={14} /> Ready in Stock
                  </span>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="thumbnails-strip">
                  {galleryImages.map((imgUrl, idx) => (
                    <button
                      key={idx}
                      className={`thumbnail-btn ${activeImage === imgUrl ? 'active' : ''}`}
                      onClick={() => setActiveImage(imgUrl)}
                    >
                      <img src={imgUrl} alt={`${product.name} thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Meta & Specs Column */}
            <div className="detail-info-col">
              <div className="product-overview">
                <h2 className="overview-heading">Collection Overview</h2>
                <p className="product-desc-text">{product.description}</p>

                <div className="cta-box">
                  <div className="cta-box-text">
                    <Sparkles size={18} className="sparkle-icon" />
                    <div>
                      <strong>Need a Quote or Material Sample?</strong>
                      <p>Get estimated costs, cut sheet specs, and freight delivery timeline.</p>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-full" onClick={() => onOpenQuote(product)}>
                    Request Quote for This Collection <Send size={15} />
                  </button>
                </div>
              </div>

              {/* Technical Specifications Table */}
              <div className="specs-table-container">
                <h3 className="specs-title">Technical Specifications</h3>
                <table className="specs-table">
                  <tbody>
                    <tr>
                      <td className="spec-label">Dimensions / Size</td>
                      <td className="spec-value"><strong>{product.size}</strong></td>
                    </tr>
                    <tr>
                      <td className="spec-label">Surface Finish</td>
                      <td className="spec-value">{product.finish}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Material Composition</td>
                      <td className="spec-value">{product.material}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Thickness</td>
                      <td className="spec-value">{product.thickness}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Recommended Application</td>
                      <td className="spec-value">{product.application}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Aesthetic Origin</td>
                      <td className="spec-value">{product.origin}</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Stain Resistance</td>
                      <td className="spec-value">Class 5 Non-Porous Hydrophobic Glaze</td>
                    </tr>
                    <tr>
                      <td className="spec-label">Thermal Heating Compatibility</td>
                      <td className="spec-value">100% Radiant Floor Heating Safe</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-wrapper bg-marble">
          <div className="container">
            <h3 className="related-title">Complementary & Similar Collections</h3>
            <div className="products-grid">
              {relatedProducts.map((relProd) => (
                <ProductCard key={relProd.id} product={relProd} onOpenQuote={onOpenQuote} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Banner */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
