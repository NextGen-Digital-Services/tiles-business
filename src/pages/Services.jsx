import React from 'react';
import { Truck, Hammer, Compass, Globe, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { CTASection } from '../components/CTASection';
import './Services.css';

export const Services = ({ onOpenQuote }) => {
  const serviceBlocks = [
    {
      id: 'supply',
      icon: Truck,
      eyebrow: 'Service 01',
      title: 'Material Supply Only (Retail & Wholesale)',
      tagline: 'Direct crate-packed delivery of Italian marble slabs & vitrified tile collections.',
      desc: 'Ideal for contractors, property developers, or homeowners with existing installation crews. We manage freight logistics, wooden crate reinforced packaging, and curb-side delivery directly to your job site.',
      features: [
        'Inspected & batch-matched shade lot control',
        'Reinforced ISPM-15 wooden export crate packaging',
        'Doorstep hydraulic tail-gate delivery options',
        'Full technical data sheets & installation manuals provided'
      ],
      ctaText: 'Inquire for Material Delivery'
    },
    {
      id: 'installation',
      icon: Hammer,
      eyebrow: 'Service 02',
      title: 'Turnkey Supply + Master Installation',
      tagline: 'End-to-end artisan installation by certified master stone masons.',
      desc: 'Achieve zero-lipage perfection and 1mm hair-line grout joints with our dedicated in-house masonry team. We take full structural responsibility from subfloor levelling to final nanotech seal coat.',
      features: [
        'Subfloor acoustic membrane & moisture barrier prep',
        'Waterjet precision miter cutting & bookmatching',
        'Ultra-thin 1mm epoxy grout joint application',
        'Hydrophobic stain-proof sealant application with 10-year warranty'
      ],
      ctaText: 'Book Installation Consultation'
    },
    {
      id: 'consultation',
      icon: Compass,
      eyebrow: 'Service 03',
      title: 'Architectural & Interior Design Consultation',
      tagline: 'Concierge grain matching, lighting alignment & CAD slab layout mapping.',
      desc: 'Collaborate with our senior stone architects in our dry-lay studio or send us your DWG/BIM files. We digitalize slab veins to map exact cuts across feature walls and floor runs before touching a diamond saw.',
      features: [
        'High-resolution 3D dry-lay slab vein mapping',
        'Material suitability analysis for high-moisture/high-traffic areas',
        'Physical sample kit curation delivered to your design firm',
        'Custom mitered edge profile selection (Ogee, Bullnose, Chamfer, Bevel)'
      ],
      ctaText: 'Schedule Design Consultation'
    },
    {
      id: 'export',
      icon: Globe,
      eyebrow: 'Service 04',
      title: 'B2B Commercial Bulk Procurement & Export',
      tagline: 'FOB/CIF container-load shipments for hotels, resorts, & multi-family developments.',
      desc: 'Serving commercial developers, hotel groups, and international architectural firms. We handle container loading, custom quarry production runs, and international maritime shipping paperwork.',
      features: [
        'Dedicated container-load pricing & volume discounts',
        'ASTM C97 / C170 quarry test lab certificates',
        'Custom size slab cutting & edge profiling at origin factory',
        'CIF / FOB international port delivery logistics'
      ],
      ctaText: 'Request B2B Export Pricing'
    }
  ];

  return (
    <div className="services-page">
      {/* Editorial Header */}
      <section className="section-wrapper bg-espresso services-hero">
        <div className="container">
          <SectionHeading
            darkBg
            eyebrow="Comprehensive Atelier Capabilities"
            title="End-to-End Stone Services for"
            italicTitleText="Architectural Excellence"
            subtitle="Whether you require direct container-load material supply or turnkey white-glove master installation, our team executes with absolute precision."
          />
        </div>
      </section>

      {/* Service Content Blocks */}
      <section className="section-wrapper bg-marble">
        <div className="container">
          <div className="service-blocks-list">
            {serviceBlocks.map((block, idx) => {
              const IconComp = block.icon;
              const isEven = idx % 2 === 1;

              return (
                <div key={block.id} className={`service-block ${isEven ? 'reverse' : ''}`}>
                  <div className="service-content-col">
                    <span className="eyebrow">{block.eyebrow}</span>
                    <h2 className="service-title">{block.title}</h2>
                    <p className="service-tagline">{block.tagline}</p>
                    <p className="service-desc">{block.desc}</p>

                    <ul className="service-features-list">
                      {block.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <CheckCircle2 size={16} className="feat-icon" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <button className="btn btn-primary" onClick={() => onOpenQuote(block.title)}>
                      {block.ctaText} <ArrowRight size={15} />
                    </button>
                  </div>

                  <div className="service-card-visual">
                    <div className="visual-icon-box">
                      <IconComp size={48} />
                    </div>
                    <div className="visual-badge">
                      <ShieldCheck size={16} /> Certified Quality Guarantee
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
