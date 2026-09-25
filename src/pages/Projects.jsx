import React, { useState } from 'react';
import { MapPin, Maximize2, Layers } from 'lucide-react';
import { useStorageData } from '../utils/storage';
import { SectionHeading } from '../components/SectionHeading';
import { Lightbox } from '../components/Lightbox';
import { CTASection } from '../components/CTASection';
import './Projects.css';

export const Projects = ({ onOpenQuote }) => {
  const [gallery] = useStorageData('GALLERY');
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxState, setLightboxState] = useState({ isOpen: false, activeIndex: 0 });

  const categories = ['All', 'Residential', 'Commercial', 'Outdoor', 'Bathroom'];

  const filteredGallery = activeCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === activeCategory);

  const openLightbox = (index) => {
    setLightboxState({ isOpen: true, activeIndex: index });
  };

  const closeLightbox = () => {
    setLightboxState({ isOpen: false, activeIndex: 0 });
  };

  const handleNext = () => {
    setLightboxState((prev) => ({
      ...prev,
      activeIndex: (prev.activeIndex + 1) % filteredGallery.length
    }));
  };

  const handlePrev = () => {
    setLightboxState((prev) => ({
      ...prev,
      activeIndex: (prev.activeIndex - 1 + filteredGallery.length) % filteredGallery.length
    }));
  };

  const currentItem = filteredGallery[lightboxState.activeIndex] || {};

  return (
    <div className="projects-page">
      {/* Editorial Header */}
      <section className="section-wrapper bg-espresso projects-hero">
        <div className="container">
          <SectionHeading
            darkBg
            eyebrow="Architectural Portfolio"
            title="Completed Projects & Installation"
            italicTitleText="Masterpieces"
            subtitle="Explore our gallery of private villa estates, luxury hotel lobbies, cliffside spa pools, and executive penthouses finished in our natural stone."
          />
        </div>
      </section>

      {/* Gallery Filter & Grid */}
      <section className="section-wrapper bg-marble">
        <div className="container">
          {/* Category Filter Tabs */}
          <div className="projects-filter-bar">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`proj-tab ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} Projects
              </button>
            ))}
          </div>

          {/* Masonry Editorial Grid */}
          <div className="projects-masonry-grid">
            {filteredGallery.map((item, idx) => (
              <div key={item.id} className="project-card" onClick={() => openLightbox(idx)}>
                <div className="project-img-wrap">
                  <img src={item.image} alt={item.title} className="project-img" loading="lazy" />
                  <span className="project-category-tag">{item.category}</span>
                  <div className="project-hover-overlay">
                    <span className="zoom-btn">
                      <Maximize2 size={18} /> View Project Details
                    </span>
                  </div>
                </div>

                <div className="project-info">
                  <span className="project-location">
                    <MapPin size={13} /> {item.location}
                  </span>
                  <h3 className="project-title">{item.title}</h3>
                  <p className="project-materials">
                    <Layers size={13} /> <strong>Materials:</strong> {item.materialsUsed}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <Lightbox
        isOpen={lightboxState.isOpen}
        onClose={closeLightbox}
        image={currentItem.image}
        title={currentItem.title}
        location={currentItem.location}
        description={`${currentItem.description} — Featured Materials: ${currentItem.materialsUsed}`}
        onNext={filteredGallery.length > 1 ? handleNext : null}
        onPrev={filteredGallery.length > 1 ? handlePrev : null}
      />

      {/* Final CTA */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
