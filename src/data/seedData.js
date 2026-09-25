export const INITIAL_CATEGORIES = [
  { id: 'floor', name: 'Floor Tiles', slug: 'floor', description: 'Heavy-traffic vitrified and natural stone porcelain for majestic floors.' },
  { id: 'wall', name: 'Wall Tiles', slug: 'wall', description: 'Artisanal ceramic, textured stone, and decorative accent wall slabs.' },
  { id: 'marble-look', name: 'Marble-Look Porcelain', slug: 'marble-look', description: 'High-definition 1:1 Carrara, Calacatta, and Nero Marquina marble recreations.' },
  { id: 'wood-look', name: 'Wood-Look Planks', slug: 'wood-look', description: 'Warm Italian timber aesthetic with 100% waterproof vitrified durability.' },
  { id: 'outdoor', name: 'Outdoor & Exterior Slabs', slug: 'outdoor', description: '20mm thick anti-slip paver tiles engineered for driveways, pools & facades.' },
  { id: 'mosaic', name: 'Mosaic & Accent', slug: 'mosaic', description: 'Handcrafted geometric mosaics, herringbone, and gold-flaked glass tiles.' },
  { id: 'bathroom', name: 'Bathroom Collections', slug: 'bathroom', description: 'Waterproof slip-resistant luxury floor and wall combinations.' },
  { id: 'kitchen', name: 'Kitchen & Backsplash', slug: 'kitchen', description: 'Stain-resistant large format slabs and decorative backsplashes.' },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Calacatta Oro Extra Marble Slab',
    category: 'marble-look',
    priceCategory: 'Luxury Premium',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '1200x2400 mm (Large Format)',
    finish: 'Polished High-Gloss',
    material: 'Vitrified Porcelain',
    thickness: '9 mm',
    application: 'Indoor Living, Villa Foyers, Feature Walls',
    origin: 'Tuscany, Italy (Design Source)',
    description: 'Distinctive warm gold and subtle grey veining over a luminous Carrara ivory base. Perfectly reproduces rarest Italian quarry marble with stain-proof zero porosity.',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-2',
    name: 'Nero Marquina Velvet Slab',
    category: 'marble-look',
    priceCategory: 'Luxury Premium',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '1200x1800 mm',
    finish: 'Satin Silk / Velvet Matte',
    material: 'Full-Body Vitrified Stone',
    thickness: '10 mm',
    application: 'Executive Restrooms, Bar Counters, Luxury Foyers',
    origin: 'Basque Quarry Aesthetic',
    description: 'Deep midnight obsidian base laced with razor-sharp striking white calcite veins. Soft-touch silk finish absorbs reflections while exuding opulence.',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-3',
    name: 'Travertino Navona Honed',
    category: 'floor',
    priceCategory: 'Signature Collection',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '800x1600 mm',
    finish: 'Honed Matte Touch',
    material: 'Natural Travertine Porcelain',
    thickness: '9.5 mm',
    application: 'Main Living, Sunrooms, Boutique Retail',
    origin: 'Tivoli Inspiration',
    description: 'Organic warm beige linear striations capturing Roman architectural limestone. Tactile matte finish with subtle micro-pitting effect for authentic feel.',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-4',
    name: 'Rovere Warm Oak Vitrified Plank',
    category: 'wood-look',
    priceCategory: 'Signature Collection',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '200x1200 mm Planks',
    finish: '3D Synchronized Wood Grain',
    material: 'High-Density Vitrified',
    thickness: '9 mm',
    application: 'Bedrooms, Spa Areas, Kitchen Floors',
    origin: 'Alpine Wood Series',
    description: 'Combines the cozy warmth of aged Italian oak with complete zero-maintenance waterproof protection. Non-warping, scratch-proof, thermal heating compatible.',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-5',
    name: 'Pietra di Grey Structured Exterior 20mm',
    category: 'outdoor',
    priceCategory: 'Heavy Duty Architectural',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '600x1200 mm',
    finish: 'R11 Anti-Slip Textured',
    material: '20mm Monolithic Porcelain',
    thickness: '20 mm',
    application: 'Pool Decks, Patios, Car Driveways, Terraces',
    origin: 'Lombardy Basalt Look',
    description: 'Engineered for extreme exterior conditions. Withstands vehicles, frost, salt, and heavy rains while offering R11 safety anti-slip rating.',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-6',
    name: 'Zellige Emerald Green Gloss Accent',
    category: 'wall',
    priceCategory: 'Artisanal Hand-Crafted',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '100x100 mm Handcrafted Cut',
    finish: 'High-Gloss Undulating Glaze',
    material: 'Glazed Artisanal Ceramic',
    thickness: '10 mm',
    application: 'Kitchen Backsplash, Shower Walls, Bar Facades',
    origin: 'Artisan Atelier Series',
    description: 'Uneven surfaces and tonal color variance produce a hypnotic play of light. Every piece carries subtle organic character.',
    featured: true,
    inStock: true
  },
  {
    id: 'prod-7',
    name: 'Statuario Supreme Polished Slab',
    category: 'bathroom',
    priceCategory: 'Luxury Premium',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '1200x2780 mm (Full Wall Height)',
    finish: 'Mirror Polished',
    material: 'Bookmatch Porcelain Slab',
    thickness: '6 mm',
    application: 'Bathroom Enclosures, Master Suite Walls',
    origin: 'Carrara Bookmatch',
    description: 'Dramatic bold graphite veins sweeping across purest white background. Available in continuous bookmatch pattern pairs for uninterrupted bathroom walls.',
    featured: false,
    inStock: true
  },
  {
    id: 'prod-8',
    name: 'Terrazzo Veneziano Micro Mosaic',
    category: 'mosaic',
    priceCategory: 'Design Specialty',
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
    galleryImages: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop'
    ],
    size: '300x300 mm Mesh Sheet',
    finish: 'Smooth Satin Matte',
    material: 'Recycled Quartz & Mineral Mix',
    thickness: '8 mm',
    application: 'Feature Niches, Shower Floors, Entry Borders',
    origin: 'Venetian Atelier',
    description: 'Eco-conscious Italian terrazzo mosaic with embedded brass wire detail and marble fragments. Comes pre-mounted on easy-install fiberglass mesh sheets.',
    featured: false,
    inStock: true
  }
];

export const INITIAL_GALLERY = [
  {
    id: 'proj-1',
    title: 'The Grand Palazzo Residence',
    category: 'Residential',
    location: '[CLIENT_CITY / SHOWROOM_ADDRESS]',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop',
    materialsUsed: 'Calacatta Oro Extra 1200x2400mm & Rovere Warm Oak Planks',
    description: 'A 12,000 sq. ft. private estate featuring seamless bookmatched floor slabs across living areas, integrated warm timber planks in private quarters, and custom marble vanity tops.'
  },
  {
    id: 'proj-2',
    title: 'Aura Luxury Wellness Spa & Hotel',
    category: 'Commercial',
    location: 'Metropolitan Hotel Quarter',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
    materialsUsed: 'Travertino Navona Honed & Zellige Emerald Green Accent',
    description: 'Thermal bath areas, steam rooms, and reception lobby paved in anti-slip honed travertine with handcrafted emerald accent walls for a serene sensory atmosphere.'
  },
  {
    id: 'proj-3',
    title: 'Infinity Sky Villa Terrace & Pool',
    category: 'Outdoor',
    location: 'Cliffside Estate',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    materialsUsed: 'Pietra di Grey 20mm Anti-Slip Pavers',
    description: 'Heavy duty 20mm exterior pavers laid over pedastal systems for weather-resistant drainage around an infinity edge pool overlooking scenic views.'
  },
  {
    id: 'proj-4',
    title: 'Contemporary Minimalist Penthouse',
    category: 'Bathroom',
    location: 'Urban Tower',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1200&auto=format&fit=crop',
    materialsUsed: 'Statuario Supreme Polished Slab & Nero Marquina Velvet',
    description: 'High-contrast monochrome bathroom with full-height floor-to-ceiling porcelain slabs eliminating grout lines for ultra-hygienic architectural grandeur.'
  }
];

export const INITIAL_TESTIMONIALS = [
  {
    id: 'test-1',
    name: 'Alessio Rossi',
    role: 'Principal Architect, Studio Moderno',
    quote: '[CLIENT_BUSINESS_NAME] transformed our vision into reality. The quality of their Calacatta marble slabs and precision mitering on-site set a standard unmatched by any supplier in the region.',
    rating: 5,
    projectType: 'Luxury Villa Design',
    date: 'August 2026'
  },
  {
    id: 'test-2',
    name: 'Elena Vance',
    role: 'Lead Interior Designer',
    quote: 'Finding true 20mm exterior porcelain that matched our indoor travertine look was impossible until we visited [CLIENT_BUSINESS_NAME]\'s showroom. Incredible collection and concierge service.',
    rating: 5,
    projectType: 'Commercial Boutique Hotel',
    date: 'July 2026'
  },
  {
    id: 'test-3',
    name: 'Marcus & Sophia Sterling',
    role: 'Homeowners',
    quote: 'From selection to the final coat of sealant, the installation team was punctual, clean, and meticulously detailed. Walking into our living room feels like entering a European palace every day.',
    rating: 5,
    projectType: 'Private Residence Renovation',
    date: 'May 2026'
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'inq-101',
    name: 'Dr. Arthur Pendelton',
    email: 'arthur.p@example.com',
    phone: '+1 (555) 234-5678',
    productInterest: 'Calacatta Oro Extra Marble Slab',
    message: 'We are designing a 8,000 sq ft home and would like a quote for approximately 350 sq meters of polished floor slabs plus installation assistance.',
    date: '2026-09-24T10:30:00Z',
    status: 'New'
  },
  {
    id: 'inq-102',
    name: 'Claire Dupont',
    email: 'claire@dupontinteriors.com',
    phone: '+1 (555) 987-6543',
    productInterest: 'Travertino Navona Honed',
    message: 'Requesting material samples for a hotel lobby renovation project. Please send specs sheet and bulk pricing catalog.',
    date: '2026-09-23T16:15:00Z',
    status: 'Handled'
  }
];

export const INITIAL_SETTINGS = {
  businessName: '[CLIENT_BUSINESS_NAME]',
  tagline: '[CLIENT_TAGLINE]',
  heroHeadline: 'Timeless Italian Elegance & Precision Natural Stone',
  heroSubheadline: 'Curated Carrara marble, large-format porcelain slabs, and handcrafted architectural tiles for discerning spaces.',
  address: '[CLIENT_CITY / SHOWROOM_ADDRESS]',
  phone: '[CLIENT_PHONE]',
  whatsapp: '[CLIENT_WHATSAPP]',
  email: '[CLIENT_EMAIL]',
  yearsInBusiness: '[YEARS_IN_BUSINESS]',
  projectsCompleted: '[PROJECTS_COMPLETED]',
  sqftInstalled: '[SQFT_INSTALLED]',
  citiesServed: '[CITIES_SERVED]',
  workingHours: '[WORKING_HOURS]',
  instagram: 'https://instagram.com',
  pinterest: 'https://pinterest.com',
  linkedin: 'https://linkedin.com'
};
