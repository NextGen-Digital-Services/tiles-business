import React from 'react';
import { ShieldCheck, Award, Leaf, FileCheck, CheckCircle2, Flame, Droplets, Gauge } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import './Quality.css';

export const Quality = ({ onOpenQuote }) => {
  const qualitySpecs = [
    {
      icon: Droplets,
      title: 'Water Absorption < 0.05%',
      desc: 'Virtually impervious to moisture absorption. Ideal for wet rooms, saunas, and freeze-thaw exterior climates.'
    },
    {
      icon: Gauge,
      title: 'R11 Anti-Slip Friction Index',
      desc: 'Rigorous DIN 51130 wet ramp test compliance for pool decks, commercial kitchens, and public entrances.'
    },
    {
      icon: Flame,
      title: 'Class A1 Fire & Thermal Safety',
      desc: 'Incombustible zero-flame propagation rating. Fully safe for fireplace surrounds and radiant heating coils.'
    },
    {
      icon: ShieldCheck,
      title: 'MOHS 8 Surface Hardness',
      desc: 'High resistance to heavy heel traffic, metal furniture drags, and commercial luggage wheels.'
    }
  ];

  const certifications = [
    { code: 'ISO 9001:2015', label: 'Quality Management Certification' },
    { code: 'CE Declaration', label: 'European Conformity Compliance' },
    { code: 'LEED v4', label: 'Green Building Environmental Standard' },
    { code: 'EPD Certified', label: 'Environmental Product Declaration' }
  ];

  return (
    <div className="quality-page">
      {/* Editorial Header */}
      <section className="section-wrapper bg-espresso quality-hero">
        <div className="container">
          <SectionHeading
            darkBg
            eyebrow="Uncompromising Material Rigor"
            title="Quarry Sourcing & Laboratory"
            italicTitleText="Quality Standards"
            subtitle="Discover how our rigorous material selection, eco-conscious quarrying ethics, and technical testing guarantee generational longevity."
          />
        </div>
      </section>

      {/* Quarry Sourcing Story */}
      <section className="section-wrapper bg-marble">
        <div className="container">
          <div className="quality-story-grid">
            <div className="quality-text-col">
              <SectionHeading
                eyebrow="Ethical Origins"
                title="Generational Sourcing from historical"
                italicTitleText="European Quarries"
              />
              <p className="quality-paragraph">
                Every natural stone slab and vitrified porcelain collection offered by our atelier originates from strictly regulated European quarries adhering to zero-waste restoration policies.
              </p>
              <p className="quality-paragraph">
                We reject low-density, brittle stone deposits. Our geologists personally inspect block vein directionality, micro-fissure density, and mineral uniformity before block extraction.
              </p>

              <div className="cert-pills">
                {certifications.map((c, idx) => (
                  <div key={idx} className="cert-pill">
                    <FileCheck size={16} className="cert-icon" />
                    <div>
                      <strong>{c.code}</strong>
                      <span>{c.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quality-img-col">
              <div className="quality-img-wrap">
                <img
                  src="https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1000&auto=format&fit=crop"
                  alt="Marble Quarry Sourcing"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications & Lab Tests Grid */}
      <section className="section-wrapper bg-travertine">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Engineered Performance"
            title="Tested to Exceed Global"
            italicTitleText="Building Benchmarks"
            subtitle="Our porcelain slabs and natural stone undergo rigorous stress, stain, and thermal testing."
          />

          <div className="specs-card-grid">
            {qualitySpecs.map((spec, idx) => {
              const Icon = spec.icon;
              return (
                <div key={idx} className="spec-card">
                  <div className="spec-icon-box">
                    <Icon size={26} />
                  </div>
                  <h3 className="spec-card-title">{spec.title}</h3>
                  <p className="spec-card-desc">{spec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sustainability & Eco Commitment */}
      <section className="section-wrapper bg-white">
        <div className="container">
          <div className="eco-commit-box">
            <div className="eco-header">
              <Leaf size={28} className="eco-icon" />
              <div>
                <h3 className="eco-title">Sustainable Stone & Circular Production</h3>
                <p className="eco-desc">
                  Our manufacturing partners recycle 100% of industrial water used in stone polishing and utilize up to 40% pre-consumer recycled minerals in porcelain slab formulations.
                </p>
              </div>
            </div>

            <div className="eco-grid">
              <div className="eco-item">
                <CheckCircle2 size={16} className="eco-check" />
                <span>Zero VOC Emission (Greenguard Gold Certified)</span>
              </div>
              <div className="eco-item">
                <CheckCircle2 size={16} className="eco-check" />
                <span>Closed-loop Water Purification in Marble Sawing</span>
              </div>
              <div className="eco-item">
                <CheckCircle2 size={16} className="eco-check" />
                <span>100% Recyclable Wooden Delivery Craters</span>
              </div>
              <div className="eco-item">
                <CheckCircle2 size={16} className="eco-check" />
                <span>Non-Toxic Hydrophobic Surface Treatments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
