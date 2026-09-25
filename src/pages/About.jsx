import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, ShieldCheck, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { scrollRevealVariants } from '../hooks/useScrollReveal';
import { useStorageData } from '../utils/storage';
import { SectionHeading } from '../components/SectionHeading';
import { StatCounter } from '../components/StatCounter';
import { CTASection } from '../components/CTASection';
import './About.css';

export const About = ({ onOpenQuote }) => {
  const [settings] = useStorageData('SETTINGS');

  const leadershipTeam = [
    {
      name: '[FOUNDER_OR_PRINCIPAL_NAME]',
      role: 'Managing Director & Founder',
      bio: 'Over 25 years inspecting Italian quarries from Carrara to Verona, curating monumental natural stone for ultra-luxury private residences.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: '[CHIEF_ARCHITECT_NAME]',
      role: 'Head of Architectural Consultation',
      bio: 'Specializing in large-format porcelain slab engineering, dry-lay grain matching, and acoustic underlayment solutions.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop'
    },
    {
      name: '[MASTER_MASON_LEAD]',
      role: 'Director of Stone Installation',
      bio: 'Pioneered zero-lipage installation techniques for 1200x2400mm slabs with precision diamond beveling.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="about-page">
      {/* Editorial Header */}
      <section className="section-wrapper bg-espresso about-hero">
        <div className="container">
          <motion.div
            className="about-hero-content"
            initial="hidden"
            animate="visible"
            variants={scrollRevealVariants}
          >
            <span className="eyebrow">Heritage & Artistry</span>
            <h1 className="about-hero-title">
              Crafting Sacred Surfaces with <span className="serif-italic">Italian Mastery</span>
            </h1>
            <p className="about-hero-lead">
              At {settings.businessName || '[CLIENT_BUSINESS_NAME]'}, we view natural marble and fine porcelain not merely as flooring materials, but as the enduring architectural canvas upon which human memories are made.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story & Heritage */}
      <section className="section-wrapper bg-marble">
        <div className="container">
          <div className="story-grid">
            <div className="story-text-col">
              <SectionHeading
                eyebrow="Quarry Heritage"
                title="Sourced Directly from historical"
                italicTitleText="Tuscan Quarries"
              />
              <p className="story-paragraph">
                Founded with a singular passion for authentic European stone, {settings.businessName || '[CLIENT_BUSINESS_NAME]'} maintains direct relationships with generational quarry owners across Carrara, Tivoli, and Lombardy. 
              </p>
              <p className="story-paragraph">
                Every slab that enters our studio is hand-selected at the quarry face. We evaluate vein purity, crystal density, and structural integrity before approving blocks for diamond slicing and precision surface honing.
              </p>

              <div className="story-highlights">
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="highlight-icon" />
                  <span>100% Verified Italian & European Sourcing</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="highlight-icon" />
                  <span>Zero-Porosity Nanotechnology Protective Sealants</span>
                </div>
                <div className="highlight-item">
                  <CheckCircle2 size={18} className="highlight-icon" />
                  <span>In-House Master Masons & Dry-Lay Studio</span>
                </div>
              </div>
            </div>

            <div className="story-img-col">
              <div className="story-img-frame">
                <img
                  src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000&auto=format&fit=crop"
                  alt="Marble Slabs Curation"
                  className="story-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Showroom Experience */}
      <section className="section-wrapper bg-travertine">
        <div className="container">
          <div className="story-grid reverse">
            <div className="story-img-col">
              <div className="story-img-frame">
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                  alt="Showroom Experience"
                  className="story-img"
                />
              </div>
            </div>

            <div className="story-text-col">
              <SectionHeading
                eyebrow="The Showroom Experience"
                title="A Boutique Atelier Designed for"
                italicTitleText="Architectural Tactility"
              />
              <p className="story-paragraph">
                Located in {settings.address || '[CLIENT_CITY / SHOWROOM_ADDRESS]'}, our flagship gallery is engineered as an inspiring design sanctuary for architects, interior designers, and homeowners.
              </p>
              <p className="story-paragraph">
                Unlike chaotic warehouse outlets, our studio features full-scale 1:1 bathroom suites, dry-lay floor tables, specialized lighting simulation rigs, and private consultation lounges.
              </p>

              <div className="showroom-card">
                <MapPin size={20} className="showroom-icon" />
                <div>
                  <h4 className="showroom-card-title">Visit Our Flagship Studio</h4>
                  <p className="showroom-card-address">{settings.address || '[CLIENT_CITY / SHOWROOM_ADDRESS]'}</p>
                  <p className="showroom-card-hours">Open: {settings.workingHours || '[WORKING_HOURS]'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones / Counter Strip */}
      <section className="section-wrapper bg-espresso">
        <div className="container">
          <div className="stats-grid">
            <StatCounter
              label="Years in Business"
              value={settings.yearsInBusiness || '[YEARS_IN_BUSINESS]'}
              suffix="+"
              icon={Award}
            />
            <StatCounter
              label="Projects Completed"
              value={settings.projectsCompleted || '[PROJECTS_COMPLETED]'}
              suffix="+"
              icon={CheckCircle2}
            />
            <StatCounter
              label="Sq. Ft. Installed"
              value={settings.sqftInstalled || '[SQFT_INSTALLED]'}
              suffix="+"
              icon={Sparkles}
            />
            <StatCounter
              label="Cities Served"
              value={settings.citiesServed || '[CITIES_SERVED]'}
              suffix="+"
              icon={Compass}
            />
          </div>
        </div>
      </section>

      {/* Leadership Block */}
      <section className="section-wrapper bg-white">
        <div className="container">
          <SectionHeading
            centered
            eyebrow="Leadership & Artisans"
            title="Guided by Generations of"
            italicTitleText="Stone Knowledge"
            subtitle="Meet the leaders, architects, and master masons driving our atelier."
          />

          <div className="team-grid">
            {leadershipTeam.map((member, idx) => (
              <div key={idx} className="team-card">
                <div className="team-img-wrap">
                  <img src={member.image} alt={member.name} className="team-img" />
                </div>
                <div className="team-info">
                  <h3 className="team-name">{member.name}</h3>
                  <span className="team-role">{member.role}</span>
                  <p className="team-bio">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <CTASection onOpenQuote={onOpenQuote} />
    </div>
  );
};
