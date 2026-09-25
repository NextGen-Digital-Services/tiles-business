import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Layers, Check, X } from 'lucide-react';
import { useStorageData } from '../utils/storage';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { CTASection } from '../components/CTASection';
import './Collections.css';

export const Collections = ({ onOpenQuote }) => {
  const [products] = useStorageData('PRODUCTS');
  const [categories] = useStorageData('CATEGORIES');
  const [searchParams, setSearchParams] = useSearchParams();

  const currentCat = searchParams.get('cat') || 'all';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFinish, setSelectedFinish] = useState('all');

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Category match
      const matchCat = currentCat === 'all' || item.category === currentCat;
      // Search match
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase());
      // Finish match
      const matchFinish = selectedFinish === 'all' || item.finish.toLowerCase().includes(selectedFinish.toLowerCase());

      return matchCat && matchSearch && matchFinish;
    });
  }, [products, currentCat, searchQuery, selectedFinish]);

  const handleCategoryChange = (slug) => {
    if (slug === 'all') {
      searchParams.delete('cat');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ cat: slug });
    }
  };

  return (
    <div className="collections-page">
      {/* Editorial Header */}
      <section className="section-wrapper bg-espresso collections-hero">
        <div className="container">
          <SectionHeading
            darkBg
            eyebrow="Architectural Catalog"
            title="Exquisite Stone & Ceramic"
            italicTitleText="Collections"
            subtitle="Browse our comprehensive inventory of Italian vitrified slabs, Carrara marble, 20mm outdoor pavers, and handcrafted accent tiles."
          />
        </div>
      </section>

      {/* Filter & Search Bar Section */}
      <section className="section-wrapper bg-travertine catalog-controls-section">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="category-filter-bar no-scrollbar">
            <button
              className={`cat-tab ${currentCat === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              All Collections ({products.length})
            </button>
            {categories.map((cat) => {
              const count = products.filter((p) => p.category === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  className={`cat-tab ${currentCat === cat.slug ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat.slug)}
                >
                  {cat.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Search & Secondary Filter Toolbar */}
          <div className="catalog-toolbar">
            <div className="search-box">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search marble name, material, finish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button className="clear-search" onClick={() => setSearchQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="finish-filter">
              <span className="filter-label">Finish:</span>
              <select
                value={selectedFinish}
                onChange={(e) => setSelectedFinish(e.target.value)}
                className="finish-select"
              >
                <option value="all">All Surface Finishes</option>
                <option value="polished">Polished / High Gloss</option>
                <option value="matte">Matte / Honed</option>
                <option value="satin">Satin Silk / Velvet</option>
                <option value="anti-slip">R11 Anti-Slip Exterior</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-wrapper bg-white">
        <div className="container">
          <div className="results-count-bar">
            <span>Showing <strong>{filteredProducts.length}</strong> collections</span>
            {currentCat !== 'all' && (
              <span className="active-cat-badge">
                Filtered by: {categories.find((c) => c.slug === currentCat)?.name || currentCat}
              </span>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div className="collections-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onOpenQuote={onOpenQuote} />
              ))}
            </div>
          ) : (
            <div className="empty-catalog-state">
              <h3>No Collections Found</h3>
              <p>We couldn't find any products matching your selected criteria. Try adjusting your search query or filters.</p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleCategoryChange('all');
                  setSearchQuery('');
                  setSelectedFinish('all');
                }}
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
