import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, ShieldCheck, Hammer, Sparkles, Award, Layers, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollReveal';
import { useStorageData } from '../utils/storage';
import { SectionHeading } from '../components/SectionHeading';
import { ProductCard } from '../components/ProductCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { StatCounter } from '../components/StatCounter';
import { CTASection } from '../components/CTASection';
import './Home.css';

export const Home = ({ onOpenQuote }) => {
  const [products] = useStorageData('PRODUCTS');
  const [categories] = useStorageData('CATEGORIES');
  const [testimonials] = useStorageData('TESTIMONIALS');
  const [settings] = useStorageData('SETTINGS');

  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const featuredProducts = products.filter(p => p.featured).slice(0, 4);

  const whyChooseUsItems = [
    {
      icon: Award,
      title: 'Direct Italian Quarry Sourcing',
      desc: 'We personally inspect and select prime Carrara, Tuscan, and Lombardy marble blocks direct from historical European quarries.'
    },
    {
      icon: Compass,
      title: 'Concierge Design Consultation',
      desc: 'Our natural stone architects assist with grain matching, bookmatching, dry-lay inspections, and lighting alignment.'
    },
    {
      icon: Hammer,
      title: 'Precision Master Installation',
      desc: 'Dedicated master masons specializing in ultra-thin 1mm hair-line grout joints and zero-lip large format porcelain slabs.'
    },
    {
      icon: ShieldCheck,
      title: 'Lifetime Structural Warranty',
      desc: 'Every installation is sealed with anti-stain nanotechnology hydrophobic sealants and backed by our full craftsmanship guarantee.'
    }
  ];

  const processSteps = [
    {
      step: '01',
      title: 'Atelier Consultation',
      desc: 'Discuss your architectural blueprints, lighting orientation, and lifestyle usage with our stone specialists in-showroom or online.'
    },
    {
      step: '02',
      title: 'Curation & Dry-Lay Inspection',
      desc: 'Review full-scale slab physical samples or inspect dry-laid floor arrangements to verify vein continuity before cutting.'
    },
    {
      step: '03',
      title: 'Precision Installation',
      desc: 'Our master craftsmen handle levelling, acoustic underlayment, micro-mitering, and diamond-edge slab placement.'
    },
    {
      step: '04',
      title: 'Nanotech Seal & Aftercare',
      desc: 'We coat all porous surfaces with protective Italian sealants and provide dedicated maintenance guidance for decades of beauty.'
    }
  ];

  const categoryImages = {
    'floor': 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=800&auto=format&fit=crop',
    'wall': 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=800&auto=format&fit=crop',
    'marble-look': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop',
    'wood-look': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop',
    'outdoor': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    'mosaic': 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop',
    'bathroom': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop',
    'kitchen': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
  };

  const nextTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="home-page">
      {/* Hero Section — Full Bleed */}
      <section className="hero-section">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Luxury Marble Interior"
            className="hero-img"
          />
          <div className="hero-overlay" />
        </div>

        <div className="container hero-container">
          <motion.div
            className="hero-content"
            initial="hidden"
            animate="visible"
            variants={scrollRevealVariants}
          >
            <span className="eyebrow hero-eyebrow">
              <Sparkles size={14} /> Italian Luxury Tiles & Natural Stone
            </span>
            <h1 className="hero-title">
              {settings.heroHeadline || 'Timeless Italian Elegance & Precision Natural Stone'}
            </h1>
            <p className="hero-subtitle">
              {settings.heroSubheadline || 'Curated Carrara marble, large-format porcelain slabs, and handcrafted architectural tiles for discerning spaces.'}
            </p>

            <div className="hero-actions">
              <Link to="/collections" className="btn btn-primary">
                Explore Collections <ArrowRight size={16} />
              </Link>
              <button className="btn btn-secondary hero-quote-btn" onClick={() => onOpenQuote()}>
                Get a Free Quote
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-wrapper bg-travertine">
        <div className="container">
          <SectionHeading
            eyebrow="The Atelier Distinction"
            title="Why Discerning Clients Choose"
            italicTitleText={settings.businessName || '[CLIENT_BUSINESS_NAME]'}
            subtitle="We bridge the gap between ancient Italian quarry artistry and contemporary architectural precision."
          />

          <div className="why-us-grid">
            {whyChooseUsItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <motion.div
                  key={idx}
                  className="why-us-card"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={idx * 0.1}
                  variants={scrollRevealVariants}
                >
                  <div className="why-us-icon-box">
                    <IconComp size={26} />
                  </div>
                  <h3 className="why-us-card-title">{item.title}</h3>
                  <p className="why-us-card-desc">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Collections Strip */}
      <section className="section-wrapper bg-white">
        <div className="container">
          <div className="section-header-flex">
            <SectionHeading
              eyebrow="Architectural Collections"
              title="Curated Material"
              italicTitleText="Categories"
              subtitle="Explore handpicked marble, porcelain slabs, and artisanal tile surfaces."
            />
            <Link to="/collections" className="btn btn-outline-gold">
              View All Categories <ArrowRight size={14} />
            </Link>
          </div>

          <div className="categories-strip-grid">
            {categories.slice(0, 6).map((cat, idx) => (
              <Link to={`/collections?cat=${cat.slug}`} key={cat.id} className="category-strip-card">
                <img
                  src={categoryImages[cat.slug] || categoryImages['marble-look']}
                  alt={cat.name}
                  className="category-card-img"
                />
                <div className="category-card-overlay">
                  <span className="category-card-count">Collection 0{idx + 1}</span>
                  <h3 className="category-card-name">{cat.name}</h3>
                  <p className="category-card-desc">{cat.description}</p>
                  <span className="category-card-link">
                    Explore Series <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Strip */}
      <section className="section-wrapper bg-marble">
        <div className="container">
          <SectionHeading
            eyebrow="Masterpiece Slabs"
            title="Featured Product"
            italicTitleText="Showcase"
            subtitle="Our most sought-after Italian porcelain slabs and architectural stone surfaces."
          />

          <div className="products-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onOpenQuote={onOpenQuote} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="section-wrapper bg-espresso">
        <div className="container">
          <div className="stats-grid">
            <StatCounter
              label="Years of Excellence"
              value={settings.yearsInBusiness || '[YEARS_IN_BUSINESS]'}
              suffix="+"
              icon={Award}
            />
            <StatCounter
              label="Luxury Projects Completed"
              value={settings.projectsCompleted || '[PROJECTS_COMPLETED]'}
              suffix="+"
              icon={CheckCircle2}
            />
            <StatCounter
              label="Sq. Ft. Stone Installed"
              value={settings.sqftInstalled || '[SQFT_INSTALLED]'}
              suffix="+"
              icon={Layers}
            />
            <StatCounter
              label="Metropolitan Cities Served"
              value={settings.citiesServed || '[CITIES_SERVED]'}
              suffix="+"
              icon={Compass}
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-wrapper bg-travertine">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Seamless Execution"
            title="From Quarry Selection to"
            italicTitleText="Final Seal"
            subtitle="Our signature four-stage methodology ensures immaculate fit, zero lipage, and everlasting stone brilliance."
          />

          <div className="process-timeline">
            {processSteps.map((step, idx) => (
              <div key={idx} className="process-step-card">
                <span className="step-num">{step.step}</span>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {idx < processSteps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      {testimonials.length > 0 && (
        <section className="section-wrapper bg-white">
          <div className="container">
            <div className="section-header-flex">
              <SectionHeading
                eyebrow="Client Praise"
                title="Endorsed by Leading"
                italicTitleText="Architects & Designers"
                subtitle="Read what homeowners, principal architects, and developers say about our craftsmanship."
              />

              <div className="carousel-nav-buttons">
                <button className="carousel-btn" onClick={prevTestimonial} aria-label="Previous">
                  <ChevronLeft size={20} />
                </button>
                <button className="carousel-btn" onClick={nextTestimonial} aria-label="Next">
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            <div className="testimonials-carousel-wrap">
              <TestimonialCard testimonial={testimonials[activeTestimonialIndex]} />
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Banner */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
