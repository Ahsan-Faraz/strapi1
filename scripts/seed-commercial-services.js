/**
 * Seed ALL Services into Strapi (Residential + Commercial)
 * 
 * Seeds all 14 services using the unified 7-section template:
 *
 * Residential:
 *   - routine-cleaning
 *   - deep-cleaning
 *   - airbnb-cleaning
 *   - moving-cleaning
 *   - post-construction-cleaning
 *   - office-cleaning
 *
 * Commercial:
 *   - gym-cleaning
 *   - medical-cleaning
 *   - retail-cleaning
 *   - school-cleaning
 *   - property-cleaning
 *   - other-commercial-cleaning
 *   - extras (add-on services)
 * 
 * Run with: node scripts/seed-commercial-services.js
 * 
 * Environment variables:
 *   STRAPI_URL        - Strapi base URL (default: http://localhost:1337)
 *   STRAPI_API_PREFIX - API prefix (default: admin/api)
 *   STRAPI_API_TOKEN  - Full-access API token
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_PREFIX = process.env.STRAPI_API_PREFIX || 'admin/api';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '67eb2c4b5e9661786cbc07a8e245f6feca5539a6b25d371450b6e47ae586b1696c16d0ed67f45d2eb20b1189f91710d0d422b82abe4763e64467a2f6dcb5526e7d23f37110c7925bcd20e46a115bde10200168b131b4ca703f5c9e5eafa743d6691aba335d9a48c7bae2e47d9da3489b3ffa478ceebcd934f7099c40d622e3b2';

let authToken = null;

// ─── Auth ───────────────────────────────────────────────────────────────────
async function authenticate() {
  console.log('🔐 Using API Token for authentication...');
  authToken = STRAPI_API_TOKEN;

  const response = await fetch(`${STRAPI_URL}/${API_PREFIX}/services`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`API Token verification failed: ${response.status}`);
  }

  console.log('✅ API Token verified successfully');
}

// ─── Create or Update ───────────────────────────────────────────────────────
async function createOrUpdate(endpoint, data, identifierField = 'slug') {
  const identifier = data[identifierField];

  // Check if exists
  const checkResponse = await fetch(
    `${STRAPI_URL}/${API_PREFIX}${endpoint}?filters[${identifierField}][$eq]=${encodeURIComponent(identifier)}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    }
  );

  const existing = await checkResponse.json();

  if (existing.data && existing.data.length > 0) {
    // Update existing — Strapi v5 uses documentId for individual CRUD
    const id = existing.data[0].documentId || existing.data[0].id;
    const updateResponse = await fetch(`${STRAPI_URL}/${API_PREFIX}${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      console.error(`❌ Failed to update ${identifier}:`, error);
      return null;
    }

    console.log(`📝 Updated: ${identifier}`);
    return await updateResponse.json();
  } else {
    // Create new
    const createResponse = await fetch(`${STRAPI_URL}/${API_PREFIX}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ data }),
    });

    if (!createResponse.ok) {
      const error = await createResponse.text();
      console.error(`❌ Failed to create ${identifier}:`, error);
      return null;
    }

    console.log(`✅ Created: ${identifier}`);
    return await createResponse.json();
  }
}

// ─── Publish helper ─────────────────────────────────────────────────────────
async function publishEntry(endpoint, slug) {
  const checkResponse = await fetch(
    `${STRAPI_URL}/${API_PREFIX}${endpoint}?filters[slug][$eq]=${encodeURIComponent(slug)}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    }
  );

  const existing = await checkResponse.json();
  if (!existing.data || existing.data.length === 0) return;

  const entry = existing.data[0];
  const id = entry.documentId || entry.id;

  // Strapi v5 publish via PUT with publishedAt
  const publishResponse = await fetch(`${STRAPI_URL}/${API_PREFIX}${endpoint}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
    body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } }),
  });

  if (publishResponse.ok) {
    console.log(`📢 Published: ${slug}`);
  } else {
    console.warn(`⚠️  Could not publish ${slug}: ${publishResponse.status}`);
  }
}

// ============================================================================
// ALL SERVICES DATA — Residential + Commercial (unified 7-section template)
// ============================================================================

const allServices = [
  // ══════════════════════════════════════════════════════════════════════════
  // RESIDENTIAL SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────────────────────
  // 1. ROUTINE CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Routine Cleaning',
    slug: 'routine-cleaning',
    serviceType: 'routine',
    heroTopLabel: 'Premium Home Care',
    heroHeading: 'Professional Routine Cleaning Services',
    heroSubheading: 'Keep your home consistently clean and fresh with our regular cleaning service. Our trained professionals handle all the essential tasks so you can enjoy a spotless living space.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '2-3 Hour Service',
    heroServiceGuarantee: '100% Satisfaction',

    serviceTrustIndicators: [
      { number: '12K+', text: 'Happy Customers' },
      { number: '24/7', text: 'Customer Support' },
      { number: '4.9', text: 'Average Rating' },
      { number: '100%', text: 'Satisfaction Guarantee' },
    ],

    includedSectionHeading: "What's Included in Our Routine Cleaning",
    includedSectionSubheading: 'Our comprehensive cleaning service ensures every essential area receives meticulous attention.',
    cleaningAreas: [
      {
        title: 'Kitchen & Dining',
        description: 'We thoroughly clean countertops, sinks, appliance exteriors, and dining surfaces so your kitchen stays hygienic and inviting.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Countertop and sink sanitization', 'Appliance exterior wipe-down', 'Stovetop and backsplash cleaning', 'Floor sweeping and mopping'],
      },
      {
        title: 'Bathrooms',
        description: 'Every fixture is scrubbed, disinfected, and polished — including toilets, showers, tubs, sinks, and mirrors.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Toilet and tub deep scrub', 'Shower door and tile cleaning', 'Mirror and fixture polishing', 'Floor sanitization'],
      },
      {
        title: 'Living Areas & Bedrooms',
        description: 'Dusting, vacuuming, and tidying all living spaces so every room feels fresh and welcoming.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Dusting of all surfaces and furniture', 'Vacuuming carpets and rugs', 'Hard-floor sweeping and mopping', 'Trash removal and bin sanitization'],
      },
    ],

    whyChooseHeading: 'Why Choose Our Routine Cleaning Service',
    whyChooseSubheading: 'Our premium cleaning service offers exceptional benefits to maintain your space in pristine condition.',
    benefit1Title: 'Consistent Excellence',
    benefit1Description: 'Regular professional cleanings ensure your space maintains a consistently pristine appearance.',
    benefit1Icon: 'Sparkles',
    benefit2Title: 'Reclaimed Time & Energy',
    benefit2Description: 'Regain your valuable time by entrusting your cleaning needs to our professional team.',
    benefit2Icon: 'Clock',
    benefit3Title: 'Enhanced Well-being',
    benefit3Description: 'Regular professional cleaning significantly reduces allergens, dust, and bacteria.',
    benefit3Icon: 'Heart',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: 'Hear from our satisfied clients about their experience with our routine cleaning service.',
    clientTestimonials: [
      { rating: 5, review: 'Clensy has been cleaning our home every two weeks for over a year. The consistency and attention to detail is remarkable. I never have to worry about coming home to a messy house.', clientName: 'Jennifer Walsh', clientLocation: 'Bergen County, NJ' },
      { rating: 5, review: 'As a busy working mom, Clensy has been a lifesaver. Their team is always on time, thorough, and leaves our home sparkling. Highly recommended!', clientName: 'Maria Santos', clientLocation: 'Essex County, NJ' },
      { rating: 5, review: 'We switched to Clensy from another service and the difference is night and day. Truly professional and reliable. Worth every penny.', clientName: 'Robert Kim', clientLocation: 'Hudson County, NJ' },
    ],

    faqs: [
      { question: 'What does routine cleaning include?', answer: 'Our routine cleaning covers all essential areas including dusting, vacuuming, mopping, bathroom sanitization, kitchen cleaning, and general tidying of living spaces.' },
      { question: 'How long does a routine cleaning take?', answer: 'A typical routine cleaning takes 2-3 hours depending on the size of your home and its current condition.' },
      { question: 'Do I need to be home during the cleaning?', answer: 'No, many of our clients provide access and go about their day. We are fully insured and background-checked.' },
      { question: 'How often should I schedule routine cleaning?', answer: 'Most clients prefer weekly or bi-weekly service to maintain a consistently clean home. We also offer monthly options for lighter needs.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. DEEP CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Deep Cleaning',
    slug: 'deep-cleaning',
    serviceType: 'deep',
    heroTopLabel: 'Intensive Care',
    heroHeading: 'Professional Deep Cleaning Services',
    heroSubheading: 'A thorough, top-to-bottom cleaning that reaches every corner. Perfect for seasonal refreshes, move-ins, or when your home needs extra attention.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '4-6 Hour Service',
    heroServiceGuarantee: '100% Satisfaction',

    serviceTrustIndicators: [
      { number: '10K+', text: 'Deep Cleans Done' },
      { number: '4.9', text: 'Average Rating' },
      { number: '100%', text: 'Satisfaction Guarantee' },
      { number: '5-Star', text: 'Rated Service' },
    ],

    includedSectionHeading: "What's Included in Our Deep Cleaning",
    includedSectionSubheading: 'Our deep cleaning goes beyond the surface to tackle built-up grime, hidden dust, and neglected areas.',
    cleaningAreas: [
      {
        title: 'Kitchen Deep Clean',
        description: 'Inside and out — we degrease ovens, clean behind appliances, scrub tile grout, and sanitize every surface.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Inside oven and refrigerator cleaning', 'Behind and under appliances', 'Cabinet fronts and handles', 'Backsplash and tile grout scrubbing'],
      },
      {
        title: 'Bathroom Intensive',
        description: 'Hard-water stains, soap scum, and grout buildup are no match for our deep cleaning protocols.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Hard-water stain removal', 'Grout and tile deep scrub', 'Exhaust fan and vent cleaning', 'Disinfection of all fixtures'],
      },
      {
        title: 'Whole-Home Detail',
        description: 'Baseboards, window sills, door frames, ceiling fans, and every overlooked corner get thorough attention.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Baseboards and door frames', 'Light fixtures and ceiling fans', 'Window sills and tracks', 'Behind and under furniture'],
      },
    ],

    whyChooseHeading: 'Why Choose Our Deep Cleaning Service',
    whyChooseSubheading: 'Experience the difference a professional deep clean makes.',
    benefit1Title: 'Healthier Environment',
    benefit1Description: 'Remove allergens, bacteria, and built-up contaminants for better indoor air quality.',
    benefit1Icon: 'Shield',
    benefit2Title: 'Extended Surface Life',
    benefit2Description: 'Proper deep cleaning helps preserve your floors, fixtures, and appliances.',
    benefit2Icon: 'Home',
    benefit3Title: 'Fresh Start',
    benefit3Description: 'Perfect for new beginnings — moving in, seasonal changes, or post-renovation.',
    benefit3Icon: 'Sparkles',

    clientTestimonialsHeading: 'Deep Cleaning Success Stories',
    clientTestimonialsSubheading: 'See why our clients trust us for their deep cleaning needs.',
    clientTestimonials: [
      { rating: 5, review: 'We had our home deep cleaned before listing it and received multiple offers within the first weekend. The Clensy team made every room look like a showroom.', clientName: 'Tom & Angela Davis', clientLocation: 'Passaic County, NJ' },
      { rating: 5, review: 'After two years of putting off a deep clean, I finally booked Clensy. The transformation was unbelievable. Places I had completely forgotten about were spotless.', clientName: 'Priya Patel', clientLocation: 'Union County, NJ' },
      { rating: 5, review: 'I schedule a deep clean every quarter and it makes such a difference. My home feels brand new every time. Clensy is incredibly thorough.', clientName: 'Daniel Foster', clientLocation: 'Bergen County, NJ' },
    ],

    faqs: [
      { question: 'What is the difference between routine and deep cleaning?', answer: 'Deep cleaning is more intensive and includes areas not covered in routine cleaning like inside appliances, behind furniture, baseboards, and detailed scrubbing of all surfaces.' },
      { question: 'How often should I get a deep cleaning?', answer: 'We recommend deep cleaning at least twice a year, or quarterly for homes with pets, children, or allergy sufferers.' },
      { question: 'How long does deep cleaning take?', answer: 'Deep cleaning typically takes 4-6 hours depending on home size and condition. Larger homes may require a full day.' },
      { question: 'Should I deep clean before starting routine service?', answer: 'Yes! A deep clean provides the perfect baseline, and then routine cleaning maintains that level of cleanliness going forward.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. AIRBNB CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Airbnb Cleaning',
    slug: 'airbnb-cleaning',
    serviceType: 'airbnb',
    heroTopLabel: 'Hospitality Excellence',
    heroHeading: 'Professional Airbnb & Vacation Rental Cleaning',
    heroSubheading: 'Impress your guests with spotless accommodations. Our turnover cleaning ensures 5-star reviews and happy guests every time.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '2-4 Hour Turnover',
    heroServiceGuarantee: '5-Star Ready',

    serviceTrustIndicators: [
      { number: '3K+', text: 'Turnovers Completed' },
      { number: '5.0', text: 'Host Satisfaction' },
      { number: '100%', text: 'On-Time Rate' },
      { number: '500+', text: 'Active Host Partners' },
    ],

    includedSectionHeading: "What's Included in Our Airbnb Cleaning",
    includedSectionSubheading: 'Complete turnover service designed for vacation rental success.',
    cleaningAreas: [
      {
        title: 'Guest Bedrooms & Linens',
        description: 'Fresh linens, perfectly made beds, and spotless bedrooms that make every guest feel like they are checking into a luxury hotel.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Complete linen change and bed making', 'Dusting and surface sanitization', 'Closet and drawer tidy', 'Trash removal and supply restock'],
      },
      {
        title: 'Kitchen & Dining Reset',
        description: 'Dishes done, counters gleaming, and everything restocked — your kitchen is guest-ready in record time.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Dish washing and appliance wipe-down', 'Countertop and sink sanitization', 'Restocking of essentials', 'Floor sweeping and mopping'],
      },
      {
        title: 'Bathrooms & Common Spaces',
        description: 'Bathrooms sparkling, living areas staged, and every high-touch surface disinfected for a photo-ready listing.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Bathroom deep sanitization', 'Amenity and toiletry restock', 'Living area tidying and staging', 'High-touch surface disinfection'],
      },
    ],

    whyChooseHeading: 'Why Hosts Choose Our Airbnb Cleaning',
    whyChooseSubheading: 'Maximize your rental income with professional turnover service.',
    benefit1Title: 'Better Reviews',
    benefit1Description: 'Consistently clean properties lead to 5-star cleanliness ratings and more bookings.',
    benefit1Icon: 'Star',
    benefit2Title: 'Calendar Sync',
    benefit2Description: 'We integrate with Airbnb, VRBO, and major platforms for automatic scheduling between turnovers.',
    benefit2Icon: 'Clock',
    benefit3Title: 'Peace of Mind',
    benefit3Description: 'Never worry about turnover timing or quality again. We handle it all so you can focus on hosting.',
    benefit3Icon: 'Shield',

    clientTestimonialsHeading: 'What Hosts Say About Us',
    clientTestimonialsSubheading: 'Join hundreds of successful Airbnb hosts who trust our service.',
    clientTestimonials: [
      { rating: 5, review: 'Since partnering with Clensy my average guest rating went from 4.5 to 4.9 stars. The turnover team is fast, reliable, and incredibly thorough. I manage 4 listings and they handle them all flawlessly.', clientName: 'Chris Reynolds', clientLocation: 'Superhost, Jersey City' },
      { rating: 5, review: 'I used to stress about back-to-back bookings. Now Clensy handles all turnovers and I just get a photo confirmation when it is done. Game changer for my hosting business.', clientName: 'Samantha Lee', clientLocation: 'Superhost, Hoboken' },
      { rating: 5, review: 'The attention to staging details sets Clensy apart. My listing photos always look perfect and guests constantly comment on how clean and welcoming the space is.', clientName: 'Marcus Johnson', clientLocation: 'Property Manager, Montclair' },
    ],

    faqs: [
      { question: 'How quickly can you turn over a property?', answer: 'We can complete most turnovers in 2-4 hours, allowing for same-day check-ins after checkout.' },
      { question: 'Do you provide linens and supplies?', answer: 'We can work with your existing supplies or provide linen service and restocking for an additional fee.' },
      { question: 'Can you sync with my booking calendar?', answer: 'Yes, we integrate with Airbnb, VRBO, and other major platforms for automatic scheduling.' },
      { question: 'What happens if a guest checks out late?', answer: 'We build flexibility into our scheduling. If a guest is late, we adjust and still deliver your property guest-ready on time.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. MOVE IN/OUT CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Move In/Out Cleaning',
    slug: 'moving-cleaning',
    serviceType: 'moving',
    heroTopLabel: 'Transition Ready',
    heroHeading: 'Professional Move In/Out Cleaning Services',
    heroSubheading: 'Start fresh in your new home or leave your old one spotless. Our move cleaning ensures a clean transition for everyone.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '4-8 Hour Service',
    heroServiceGuarantee: 'Deposit-Back Guarantee',

    serviceTrustIndicators: [
      { number: '8K+', text: 'Moves Cleaned' },
      { number: '99%', text: 'Deposit Recovery' },
      { number: '4.9', text: 'Average Rating' },
      { number: '100%', text: 'Satisfaction Guarantee' },
    ],

    includedSectionHeading: "What's Included in Our Move Cleaning",
    includedSectionSubheading: 'Comprehensive cleaning for empty or nearly-empty spaces.',
    cleaningAreas: [
      {
        title: 'Kitchen & Appliances',
        description: 'Every appliance cleaned inside and out, cabinets wiped, and all surfaces sanitized for the next occupant.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Inside oven, fridge, and dishwasher', 'Cabinet and drawer interiors', 'Countertop and backsplash scrub', 'Floor degreasing and mopping'],
      },
      {
        title: 'Bathrooms & Fixtures',
        description: 'Deep scrubbing of every fixture, tile, and surface to remove all buildup and leave bathrooms sparkling.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Tile and grout deep clean', 'Toilet, tub, and shower scrub', 'Vanity and medicine cabinet cleaning', 'Mirror and chrome polishing'],
      },
      {
        title: 'All Rooms & Storage',
        description: 'Closets, baseboards, window sills, and every empty room cleaned top-to-bottom for a perfect handoff.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Closet and storage area cleaning', 'Baseboards and door frames', 'Light fixtures and ceiling fans', 'Window sills and tracks'],
      },
    ],

    whyChooseHeading: 'Why Choose Our Move Cleaning Service',
    whyChooseSubheading: 'Make your move stress-free with professional cleaning.',
    benefit1Title: 'Get Your Deposit Back',
    benefit1Description: 'Our thorough cleaning helps ensure you receive your full security deposit.',
    benefit1Icon: 'DollarSign',
    benefit2Title: 'Fresh Start',
    benefit2Description: 'Move into a perfectly clean home without lifting a finger.',
    benefit2Icon: 'Home',
    benefit3Title: 'Save Time',
    benefit3Description: 'Focus on your move while we handle the cleaning. One less thing to worry about.',
    benefit3Icon: 'Clock',

    clientTestimonialsHeading: 'Moving Success Stories',
    clientTestimonialsSubheading: 'See how we have helped others with their moves.',
    clientTestimonials: [
      { rating: 5, review: 'I got my full $2,500 security deposit back thanks to Clensy. My landlord said the apartment looked better than when I moved in. Money well spent!', clientName: 'Alex Rivera', clientLocation: 'Jersey City, NJ' },
      { rating: 5, review: 'We moved into a previously neglected rental and Clensy transformed it before our furniture arrived. It felt like a brand new apartment.', clientName: 'Emily Chen', clientLocation: 'Hoboken, NJ' },
      { rating: 5, review: 'Coordinating a move is stressful enough. Clensy handled the cleaning seamlessly around our schedule and the results were perfect.', clientName: 'James Patterson', clientLocation: 'Newark, NJ' },
    ],

    faqs: [
      { question: 'When should I schedule move cleaning?', answer: 'For move-out, schedule after furniture is removed. For move-in, schedule before your belongings arrive.' },
      { question: 'Will this help me get my deposit back?', answer: 'Yes! Our thorough cleaning addresses all the areas landlords check during move-out inspections.' },
      { question: 'Do you clean inside appliances?', answer: 'Absolutely. We clean inside ovens, refrigerators, dishwashers, and all other appliances.' },
      { question: 'Can you do both move-out and move-in?', answer: 'Yes! Many clients bundle both services for the best value. We can coordinate both cleanings around your move schedule.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 5. POST-CONSTRUCTION CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Post-Construction Cleaning',
    slug: 'post-construction-cleaning',
    serviceType: 'post-construction',
    heroTopLabel: 'Construction Cleanup',
    heroHeading: 'Professional Post-Construction Cleaning',
    heroSubheading: 'Transform your construction site into a move-in ready space. We remove dust, debris, and construction residue for a spotless finish.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: 'Project-Based',
    heroServiceGuarantee: 'Move-In Ready',

    serviceTrustIndicators: [
      { number: '2K+', text: 'Projects Completed' },
      { number: '100%', text: 'Inspection Pass Rate' },
      { number: '4.9', text: 'Contractor Rating' },
      { number: '48hr', text: 'Typical Turnaround' },
    ],

    includedSectionHeading: "What's Included in Post-Construction Cleaning",
    includedSectionSubheading: 'Specialized cleaning for newly built or renovated spaces.',
    cleaningAreas: [
      {
        title: 'Dust & Debris Removal',
        description: 'Industrial-grade HEPA vacuuming and damp-wiping of every surface to eliminate fine construction dust.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['HEPA vacuum all surfaces and crevices', 'Damp-wipe walls, ceilings, and trim', 'HVAC vent and duct cleaning', 'Air quality restoration'],
      },
      {
        title: 'Windows & Glass',
        description: 'Removal of labels, paint splatter, and adhesive residue from all glass and window surfaces.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Sticker and label removal', 'Paint splatter scraping', 'Interior and exterior glass cleaning', 'Track and sill detailing'],
      },
      {
        title: 'Floor Finishing',
        description: 'Final cleaning and polishing of all floor types — hardwood, tile, concrete, or carpet — to show-ready condition.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
        features: ['Grout haze removal from tile', 'Hardwood dust-mopping and polish', 'Carpet deep extraction', 'Concrete sealing prep'],
      },
    ],

    whyChooseHeading: 'Why Choose Our Post-Construction Service',
    whyChooseSubheading: 'Specialized expertise for construction cleanup.',
    benefit1Title: 'Specialized Equipment',
    benefit1Description: 'Industrial-grade vacuums and tools designed for construction dust that regular cleaners cannot handle.',
    benefit1Icon: 'Sparkles',
    benefit2Title: 'Experienced Crews',
    benefit2Description: 'Our crews are trained specifically for post-construction environments and safety protocols.',
    benefit2Icon: 'Users',
    benefit3Title: 'Faster Occupancy',
    benefit3Description: 'Get your space ready for use or sale faster with our efficient multi-phase cleaning process.',
    benefit3Icon: 'Clock',

    clientTestimonialsHeading: 'Builder & Contractor Reviews',
    clientTestimonialsSubheading: 'Trusted by construction professionals across New Jersey.',
    clientTestimonials: [
      { rating: 5, review: 'We use Clensy for all our new construction projects. They consistently deliver move-in ready results and pass inspection every time. A reliable partner for any builder.', clientName: 'Tony Moretti', clientLocation: 'Moretti Construction, NJ' },
      { rating: 5, review: 'After a major kitchen and bathroom renovation, Clensy made our home look brand new. The dust was everywhere and they got every last bit of it. Incredible job.', clientName: 'Sarah & David Kim', clientLocation: 'Montclair, NJ' },
      { rating: 5, review: 'Fast turnaround, professional crew, and the finished result speaks for itself. We have referred Clensy to every contractor we work with.', clientName: 'Jake Henderson', clientLocation: 'Horizon Builders, NJ' },
    ],

    faqs: [
      { question: 'When should post-construction cleaning be scheduled?', answer: 'Schedule after all construction work is complete but before final inspection or move-in.' },
      { question: 'How long does post-construction cleaning take?', answer: 'Time varies based on project size and condition. A typical home takes 1-2 days.' },
      { question: 'Do you work with contractors directly?', answer: 'Yes, we regularly partner with builders and contractors for seamless project completion.' },
      { question: 'Can you handle commercial construction projects?', answer: 'Absolutely. We clean both residential renovations and full commercial buildouts of any size.' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COMMERCIAL SERVICES
  // ══════════════════════════════════════════════════════════════════════════

  // ──────────────────────────────────────────────────────────────────────────
  // 6. OFFICE CLEANING (update existing with full component data)
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Office Cleaning',
    slug: 'office-cleaning',
    serviceType: 'office',
    heroTopLabel: 'Premium Commercial Services',
    heroHeading: 'Professional Office & Corporate Cleaning',
    heroSubheading: 'Create a pristine work environment that boosts productivity and makes a lasting impression on clients and employees alike with our professional office cleaning services.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845773/photo-1497215842964-222b430dc094_myg23r.jpg',
    heroServiceDuration: 'Tailored for Businesses',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Office Cleaning Services',
    includedSectionSubheading: 'We provide comprehensive cleaning solutions tailored to meet the unique needs of offices and corporate environments.',

    cleaningAreas: [
      {
        title: 'Reception & Common Areas',
        description: 'First impressions matter. Our team ensures your reception areas and common spaces are immaculate, creating a welcoming environment for clients and staff.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845862/reception-are-ideas-blog-webres_bchsoe.jpg',
        features: [
          'Dusting and polishing of reception desks and furniture',
          'Vacuuming and spot cleaning of carpets and mats',
          'Glass cleaning of entrance doors and partitions',
          'Sanitizing of high-touch surfaces and fixtures',
        ],
      },
      {
        title: 'Workstations & Office Areas',
        description: 'Create a productive environment with meticulously cleaned workspaces that boost employee morale and efficiency.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845904/photo-1604328698692-f76ea9498e76_apywe7.jpg',
        features: [
          'Dusting and wiping of desks, monitors, and equipment',
          'Sanitizing of phones, keyboards, and office supplies',
          'Emptying and cleaning of waste receptacles',
          'Detailed cleaning of desk chairs and furniture',
        ],
      },
      {
        title: 'Meeting & Conference Rooms',
        description: 'Ensure your meeting spaces are always presentation-ready with our detailed cleaning services designed for collaborative areas.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845940/Header_Veranstaltungen_K_C3_96_Desktopansicht___2__tngenb.png',
        features: [
          'Cleaning and polishing of conference tables and furniture',
          'Dusting of projectors, screens, and AV equipment',
          'Sanitizing of whiteboards and shared meeting tools',
          'Vacuuming and spot treatment of carpets and flooring',
        ],
      },
    ],

    serviceTrustIndicators: [
      { number: '500+', text: 'Corporate Clients' },
      { number: '24/7', text: 'Business Support' },
      { number: '4.9', text: 'Business Rating' },
      { number: '100%', text: 'Satisfaction Guarantee' },
    ],

    whyChooseHeading: 'Why Choose Clensy for Your Office Cleaning',
    whyChooseSubheading: 'We understand the unique cleaning requirements of professional work environments and deliver reliable, consistent service.',

    benefit1Title: 'Trained Professionals',
    benefit1Description: 'Our cleaning team consists of vetted, background-checked professionals with specific training in commercial cleaning protocols.',
    benefit1Icon: 'Users',
    benefit2Title: 'Flexible Scheduling',
    benefit2Description: 'We work around your business hours, providing after-hours, early morning, or weekend services to minimize disruption to your operations.',
    benefit2Icon: 'Clock',
    benefit3Title: 'Eco-Friendly Practices',
    benefit3Description: 'We use environmentally responsible cleaning products and practices that are safe for your employees and better for the planet.',
    benefit3Icon: 'Sparkles',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: '',

    clientTestimonials: [
      {
        rating: 5,
        review: 'Clensy has been cleaning our corporate headquarters for over two years. Their attention to detail and reliability is exceptional. Our employees and clients always comment on how clean and professional our office looks.',
        clientName: 'Sarah Johnson',
        clientLocation: 'Operations Manager, TechCorp',
      },
      {
        rating: 5,
        review: 'The flexibility of Clensy\'s scheduling has been a game-changer for our business. They work around our hours and never disrupt our operations. The quality of their work is consistently excellent.',
        clientName: 'Michael Chen',
        clientLocation: 'Facility Director, Financial Services Inc.',
      },
    ],

    faqs: [
      { question: 'Do I need to be present during the office cleaning?', answer: 'No, you do not need to be present. Many clients provide access instructions so we can clean outside of business hours. Our team is fully vetted and insured for your peace of mind.' },
      { question: 'Can you accommodate special cleaning requests for our office?', answer: 'Absolutely! We tailor our cleaning services to your office\'s unique needs. Please let us know any special requirements or areas of focus when booking.' },
      { question: 'What cleaning products do you use in offices?', answer: 'We use high-quality, eco-friendly cleaning products that are safe for office environments. If you have specific product preferences, we are happy to accommodate them.' },
      { question: 'What if we are not satisfied with the cleaning?', answer: 'Your satisfaction is our priority. If any area does not meet your expectations, contact us within 24 hours and we will return to address the issue at no extra cost.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 7. GYM CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Gym Cleaning',
    slug: 'gym-cleaning',
    serviceType: 'gym',
    heroTopLabel: 'Premium Fitness Facility Services',
    heroHeading: 'Gym & Fitness Center Cleaning Services',
    heroSubheading: 'Specialized cleaning and sanitization services designed for fitness environments, ensuring a healthy, hygienic space for members and staff alike.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846490/image94_krf7c0.png',
    heroServiceDuration: 'Fitness Specialists',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Fitness Facility Cleaning Services',
    includedSectionSubheading: 'We provide comprehensive cleaning solutions tailored to meet the unique demands of gyms and fitness centers.',

    cleaningAreas: [
      {
        title: 'Equipment & Workout Areas',
        description: 'Proper cleaning and sanitization of fitness equipment is essential for member health and safety. Our specialized protocols ensure every machine and surface is thoroughly disinfected.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846533/photo-1571902943202-507ec2618e8f_g98vlk.jpg',
        features: [
          'Disinfection of all equipment touchpoints and surfaces',
          'Cleaning of weight benches, racks, and free weight areas',
          'Sanitization of cardio machines and electronics',
          'Floor care specifically designed for workout areas',
        ],
      },
      {
        title: 'Locker Rooms & Shower Facilities',
        description: 'Locker rooms and showers require meticulous attention to prevent the spread of bacteria and fungi. Our deep cleaning protocols ensure these high-risk areas stay hygienic.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846563/kiilto-wetroom-hygiene-concept-hygiene-in-locker-rooms-1300-x-650-px-1_c2ymkt.jpg',
        features: [
          'Deep cleaning of shower stalls and bathroom fixtures',
          'Sanitization of benches, lockers, and changing areas',
          'Treatment of floors with anti-fungal and anti-bacterial solutions',
          'Regular replenishment of soap and paper products',
        ],
      },
      {
        title: 'Studio & Class Spaces',
        description: 'Group exercise areas need special attention between classes to maintain hygiene and create a welcoming environment for the next session.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846589/photo-1518611012118-696072aa579a_gp0qsn.jpg',
        features: [
          'Cleaning and disinfection of studio floors and mirrors',
          'Sanitization of yoga mats, blocks, and other equipment',
          'Air purification and ventilation system maintenance',
          'Specialized floor treatments for dance and exercise rooms',
        ],
      },
    ],

    serviceTrustIndicators: [
      { number: '300+', text: 'Fitness Clients' },
      { number: '24/7', text: 'Facility Support' },
      { number: '4.9', text: 'Industry Rating' },
      { number: '100%', text: 'Hygiene Guarantee' },
    ],

    whyChooseHeading: 'Why Choose Clensy for Your Fitness Facility',
    whyChooseSubheading: 'We understand the unique cleaning requirements of gym environments and deliver specialized solutions that promote health and hygiene.',

    benefit1Title: 'Specialized Sanitization',
    benefit1Description: 'We use hospital-grade disinfectants and antimicrobial treatments specifically designed to eliminate bacteria, viruses, and fungi common in fitness environments.',
    benefit1Icon: 'Shield',
    benefit2Title: '24/7 Flexibility',
    benefit2Description: 'We adapt to your facility\'s schedule, offering cleaning during off-peak hours, overnight, or during temporary closures to minimize disruption to your members.',
    benefit2Icon: 'Clock',
    benefit3Title: 'Health-Focused Approach',
    benefit3Description: 'Our cleaning protocols are designed with member health in mind, targeting high-touch surfaces and using eco-friendly products that are effective yet safe.',
    benefit3Icon: 'Heart',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: 'Trusted by fitness facility owners across New Jersey.',

    clientTestimonials: [
      {
        rating: 5,
        review: 'Our members constantly comment on how clean the gym is since we started working with Clensy. Their sanitization protocols are top-notch and the equipment always looks and smells fresh.',
        clientName: 'Mike Torres',
        clientLocation: 'Owner, Iron Athletics Gym',
      },
      {
        rating: 5,
        review: 'Clensy transformed our locker rooms. The deep cleaning and consistent maintenance have made a huge difference in member satisfaction and retention.',
        clientName: 'Rachel Kim',
        clientLocation: 'Manager, FitLife Studios',
      },
      {
        rating: 5,
        review: 'We operate 24/7 and Clensy works around our schedule seamlessly. The overnight cleaning crew is professional and thorough — exactly what a fitness center needs.',
        clientName: 'Derek Simmons',
        clientLocation: 'Director, Peak Performance Center',
      },
    ],

    faqs: [
      { question: 'How often should a gym be professionally cleaned?', answer: 'We recommend daily cleaning for high-traffic areas like locker rooms and equipment, with deep cleaning performed weekly. During peak seasons or flu outbreaks, we can increase frequency to ensure optimal hygiene standards.' },
      { question: 'What cleaning products do you use in fitness environments?', answer: 'We use EPA-approved, hospital-grade disinfectants that are effective against bacteria, viruses, and fungi while being safe for gym equipment and member health. All products are specifically chosen for fitness facility environments.' },
      { question: 'Can you clean around our operating hours?', answer: 'Absolutely! We understand gyms operate on extended hours. We offer flexible scheduling including early morning, late evening, overnight, and weekend cleaning to minimize disruption to your members and operations.' },
      { question: 'Do you provide specialized equipment cleaning?', answer: 'Yes, we provide thorough cleaning and sanitization of all types of fitness equipment including cardio machines, weight equipment, yoga props, and specialized studio equipment. Our team is trained on proper cleaning protocols for different equipment types.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 8. MEDICAL CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Medical Cleaning',
    slug: 'medical-cleaning',
    serviceType: 'medical',
    heroTopLabel: 'Premium Healthcare Services',
    heroHeading: 'Medical & Healthcare Facility Cleaning',
    heroSubheading: 'Specialized cleaning and sanitization services designed to meet the stringent requirements of healthcare environments, ensuring safety for patients and staff.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846005/photo-1579684385127-1ef15d508118_pwceg2.jpg',
    heroServiceDuration: 'Healthcare Compliant',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Healthcare Cleaning Services',
    includedSectionSubheading: 'Specialized cleaning solutions tailored to the unique demands and strict requirements of healthcare environments.',

    cleaningAreas: [
      {
        title: 'Reception & Waiting Areas',
        description: 'Create a reassuring first impression for patients with meticulously cleaned reception and waiting areas that inspire confidence.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846050/image6_ydkdec.png',
        features: [
          'Thorough disinfection of all seating and surfaces',
          'Sanitization of high-touch areas like check-in kiosks',
          'Specialized cleaning of magazine racks and displays',
          'HEPA-filtered vacuuming of all floors and upholstery',
        ],
      },
      {
        title: 'Examination & Treatment Rooms',
        description: 'Our specialized cleaning protocols ensure examination and treatment rooms meet the highest standards of hygiene and infection control.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846159/shutterstock_2407190313_1_ekavzo.jpg',
        features: [
          'Terminal cleaning between patient visits',
          'Disinfection of examination tables and equipment',
          'Proper disposal of medical waste',
          'Application of hospital-grade disinfectants',
        ],
      },
      {
        title: 'Restrooms & Common Areas',
        description: 'Enhanced cleaning and disinfection protocols for healthcare facility restrooms and common areas to minimize cross-contamination.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846255/image12_oygjub.png',
        features: [
          'Rigorous sanitization of all fixtures and surfaces',
          'Use of EPA-approved disinfectants effective against pathogens',
          'Regular replenishment of soap, sanitizer, and paper products',
          'Cleaning log maintenance for compliance verification',
        ],
      },
    ],

    serviceTrustIndicators: [
      { number: '350+', text: 'Healthcare Clients' },
      { number: '24/7', text: 'Healthcare Support' },
      { number: '4.9', text: 'Industry Rating' },
      { number: '100%', text: 'Compliance Guarantee' },
    ],

    whyChooseHeading: 'Why Choose Clensy for Healthcare Cleaning',
    whyChooseSubheading: 'Our specialized expertise and commitment to healthcare-specific protocols set us apart in medical facility cleaning.',

    benefit1Title: 'Healthcare Compliance',
    benefit1Description: 'We adhere to all healthcare cleaning regulations, including CDC guidelines, OSHA requirements, and Joint Commission standards.',
    benefit1Icon: 'Shield',
    benefit2Title: 'Specialized Training',
    benefit2Description: 'Our cleaning professionals undergo rigorous healthcare-specific training in infection control, bloodborne pathogens, and medical waste handling.',
    benefit2Icon: 'Heart',
    benefit3Title: 'Advanced Technology',
    benefit3Description: 'We employ state-of-the-art equipment including electrostatic sprayers, UV-C disinfection, and microfiber systems for superior results.',
    benefit3Icon: 'Activity',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: '',

    clientTestimonials: [
      {
        rating: 5,
        review: 'Clensy\'s understanding of healthcare facility cleaning is unmatched. They consistently maintain our clinic to the highest standards, giving our staff and patients confidence in our infection control practices.',
        clientName: 'Dr. Michael Chen',
        clientLocation: 'Northside Medical Center',
      },
      {
        rating: 5,
        review: 'Since partnering with Clensy, our infection control metrics have improved significantly. Their attention to detail in our operatories and sterilization areas has been exceptional. I appreciate their documentation and adherence to our protocols.',
        clientName: 'Sarah Johnson, RN',
        clientLocation: 'Eastside Dental Group',
      },
      {
        rating: 5,
        review: 'Clensy provides the level of clean that our patients expect and deserve. Their cleaning technicians understand the unique requirements of medical environments, and their detailed cleaning protocols have helped us maintain a safe and sanitary facility for everyone.',
        clientName: 'Dr. Rebecca Taylor',
        clientLocation: 'Westview Medical Associates',
      },
    ],

    faqs: [
      { question: 'Do you follow healthcare cleaning regulations?', answer: 'Yes, we strictly adhere to all healthcare cleaning regulations including CDC guidelines, OSHA requirements, and Joint Commission standards. Our team is trained in infection control protocols specific to medical environments.' },
      { question: 'How often should medical facilities be cleaned?', answer: 'Medical facilities require daily cleaning with deep cleaning performed weekly or bi-weekly depending on the type of facility. High-traffic areas and patient rooms need more frequent attention than administrative areas.' },
      { question: 'What cleaning products do you use in healthcare settings?', answer: 'We use EPA-approved, hospital-grade disinfectants that are effective against healthcare-associated pathogens. All products are safe for use in patient care areas and meet stringent healthcare facility requirements.' },
      { question: 'Can you accommodate after-hours cleaning schedules?', answer: 'Absolutely! We understand that medical facilities operate around the clock. We offer flexible scheduling including after-hours, weekend, and holiday cleaning to minimize disruption to patient care and staff operations.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 9. RETAIL CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Retail Cleaning',
    slug: 'retail-cleaning',
    serviceType: 'retail',
    heroTopLabel: 'Premium Retail Services',
    heroHeading: 'Retail Store & Shop Cleaning',
    heroSubheading: 'Create an impeccable shopping environment that enhances customer experience and protects your merchandise with our specialized retail cleaning services.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846308/photo-1567401893414-76b7b1e5a7a5_p9uaiq.jpg',
    heroServiceDuration: 'Retail Specialists',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Retail Cleaning Services',
    includedSectionSubheading: 'We provide comprehensive cleaning solutions tailored to meet the unique needs of retail environments and shopping spaces.',

    cleaningAreas: [
      {
        title: 'Entrances & Display Areas',
        description: 'First impressions matter. We ensure your store entrance and display areas shine to create a welcoming environment that attracts customers.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846352/Retail-Store-Layout-Guide_rxsiwy.jpg',
        features: [
          'Glass door and window cleaning for crystal clear visibility',
          'Dusting and cleaning of display shelves and fixtures',
          'Floor cleaning and polishing for high-traffic entryways',
          'Sanitizing of doorknobs, handles, and railings',
        ],
      },
      {
        title: 'Sales Floor & Merchandise Areas',
        description: 'Create an inviting shopping environment with meticulously cleaned sales floors that showcase your merchandise in the best light.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846388/642c66600054c7783cbff234_commercial_c2lbev.jpg',
        features: [
          'Thorough floor care tailored to your flooring type',
          'Gentle dusting of merchandise shelves and product displays',
          'Sanitizing of high-touch surfaces throughout your store',
          'Cleaning and polishing of display cases and counters',
        ],
      },
      {
        title: 'Fitting Rooms & Customer Areas',
        description: 'Keep your fitting rooms and customer service areas pristine to enhance the shopping experience and encourage purchases.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846425/image7_e44b5z.png',
        features: [
          'Disinfection of fitting room surfaces and seating',
          'Mirror cleaning for smudge-free reflections',
          'Sanitization of customer service counters and points of sale',
          'Regular emptying and cleaning of fitting room waste receptacles',
        ],
      },
    ],

    serviceTrustIndicators: [
      { number: '400+', text: 'Retail Clients' },
      { number: '24/7', text: 'Business Support' },
      { number: '4.9', text: 'Customer Rating' },
      { number: '100%', text: 'Satisfaction Guarantee' },
    ],

    whyChooseHeading: 'Why Choose Clensy for Your Retail Cleaning',
    whyChooseSubheading: 'We understand the unique cleaning requirements of retail environments and deliver reliable, consistent service.',

    benefit1Title: 'Flexible Scheduling',
    benefit1Description: 'We work around your store hours, providing after-hours, early morning, or specialized scheduling to ensure cleaning never disrupts your business operations.',
    benefit1Icon: 'Clock',
    benefit2Title: 'Retail Experience',
    benefit2Description: 'Our cleaning teams have specific experience with retail environments, understanding how to clean merchandise displays, fitting rooms, and customer areas with care.',
    benefit2Icon: 'Smile',
    benefit3Title: 'Safe, Gentle Products',
    benefit3Description: 'We use retail-friendly cleaning products that effectively clean without damaging merchandise, displays, or sensitive surfaces in your store.',
    benefit3Icon: 'Sparkles',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: '',

    clientTestimonials: [
      {
        rating: 5,
        review: 'Clensy has transformed our boutique\'s appearance. Their attention to detail is remarkable - from polishing our glass display cases to keeping our fitting rooms pristine. Our customers frequently comment on how clean and inviting our store feels.',
        clientName: 'Rebecca Martin',
        clientLocation: 'Store Manager, Urban Fashion Boutique',
      },
      {
        rating: 5,
        review: 'What sets Clensy apart is their understanding of retail spaces. They know how to clean around delicate merchandise and fixtures without causing damage. Their flexible scheduling means they work around our store hours, and we never have to worry about cleaning disrupting our business.',
        clientName: 'Marcus Johnson',
        clientLocation: 'Owner, Luxury Home Goods',
      },
      {
        rating: 5,
        review: 'Since partnering with Clensy for our retail store cleaning, we\'ve seen a noticeable increase in customer dwell time and positive feedback. The detailed cleaning of our display cases and product shelving has significantly enhanced our merchandise presentation.',
        clientName: 'Jennifer Torres',
        clientLocation: 'Regional Manager, HomeStyle Decor',
      },
    ],

    faqs: [
      { question: 'Can you clean outside of retail business hours?', answer: 'Yes, we offer flexible scheduling and can clean before opening or after closing to minimize disruption to your business and customers.' },
      { question: 'Do you use safe cleaning products for retail environments?', answer: 'We use only high-quality, eco-friendly cleaning products that are safe for both staff and customers. If you have specific preferences, let us know.' },
      { question: 'Can you handle large or multi-location retail spaces?', answer: 'Yes, our team is equipped to clean retail spaces of all sizes, including multi-location businesses. We can create a custom cleaning plan for your needs.' },
      { question: 'What if I am not satisfied with the cleaning?', answer: 'If you are not completely satisfied, contact us within 24 hours and we will return to address any concerns at no additional cost.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 10. SCHOOL CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'School Cleaning',
    slug: 'school-cleaning',
    serviceType: 'school',
    heroTopLabel: 'Premium Educational Facility Services',
    heroHeading: 'School & Childcare Cleaning Services',
    heroSubheading: 'Specialized cleaning and sanitization services designed for educational environments, ensuring a healthy, safe space for students, teachers, and staff.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846630/photo-1580582932707-520aed937b7b_h9uf5z.jpg',
    heroServiceDuration: 'Education Specialists',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Educational Facility Cleaning Services',
    includedSectionSubheading: 'We provide comprehensive cleaning solutions tailored to meet the unique demands of schools, daycares, and educational environments.',

    cleaningAreas: [
      {
        title: 'Classrooms & Learning Spaces',
        description: 'Create an optimal learning environment with thoroughly sanitized classrooms, desks, and educational equipment.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846661/photo-1588072432836-e10032774350_ydjsls.jpg',
        features: [
          'Desk and chair sanitization',
          'Whiteboard and smartboard cleaning',
          'Educational equipment disinfection',
          'Floor cleaning and maintenance',
          'Window and glass surface cleaning',
          'Air vent cleaning and dust removal',
        ],
      },
      {
        title: 'Cafeterias & Food Service Areas',
        description: 'Maintain the highest hygiene standards in food service areas with specialized cleaning protocols for health and safety compliance.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846752/shutterstock_2567781381_apqkc9.jpg',
        features: [
          'Food preparation surface sanitization',
          'Kitchen equipment deep cleaning',
          'Dining table and chair disinfection',
          'Floor degreasing and sanitization',
          'Trash removal and bin sanitization',
          'Health code compliance cleaning',
        ],
      },
      {
        title: 'Restrooms & Common Areas',
        description: 'Ensure student and staff health with thorough sanitization of high-traffic areas and restroom facilities.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846826/image64_pqa4og.png',
        features: [
          'Toilet and urinal deep cleaning',
          'Sink and faucet sanitization',
          'Mirror and fixture cleaning',
          'Floor mopping and disinfection',
          'Supply restocking and maintenance',
          'Hallway and corridor cleaning',
        ],
      },
    ],

    serviceTrustIndicators: [
      { number: '450+', text: 'Educational Facilities' },
      { number: '24/7', text: 'School Support' },
      { number: '4.9', text: 'Industry Rating' },
      { number: '100%', text: 'Safety Guarantee' },
    ],

    whyChooseHeading: 'Why Choose Our School Cleaning Services',
    whyChooseSubheading: 'We understand the unique challenges of maintaining educational facilities and provide specialized solutions for a safe learning environment.',

    benefit1Title: 'Child-Safe Products',
    benefit1Description: 'We use only non-toxic, eco-friendly cleaning products that are safe for children and meet all educational facility standards.',
    benefit1Icon: 'Shield',
    benefit2Title: 'Flexible Scheduling',
    benefit2Description: 'Our cleaning services work around your school schedule, including after-hours, weekends, and holiday cleaning options.',
    benefit2Icon: 'Clock',
    benefit3Title: 'Health-Focused Approach',
    benefit3Description: 'Our specialized protocols reduce the spread of germs and create a healthier environment for students and staff.',
    benefit3Icon: 'Heart',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: '',

    clientTestimonials: [
      {
        rating: 5,
        review: 'Clensy has been instrumental in maintaining a clean and healthy environment for our students. Their attention to detail and use of child-safe products gives us complete peace of mind.',
        clientName: 'Sarah Johnson',
        clientLocation: 'Elementary School Principal',
      },
      {
        rating: 5,
        review: 'The flexibility of their scheduling has been amazing. They work around our school hours and special events, ensuring minimal disruption to our educational programs.',
        clientName: 'Michael Chen',
        clientLocation: 'Daycare Center Director',
      },
      {
        rating: 5,
        review: 'Since partnering with Clensy, we\'ve noticed a significant reduction in sick days among our staff and students. Their thorough sanitization protocols make a real difference.',
        clientName: 'Lisa Rodriguez',
        clientLocation: 'High School Administrator',
      },
    ],

    faqs: [
      { question: 'Do you use child-safe cleaning products?', answer: 'Yes, absolutely. We exclusively use non-toxic, eco-friendly cleaning products that are specifically approved for educational facilities. All our products are safe for children and meet or exceed school district safety standards.' },
      { question: 'Can you clean during school hours?', answer: 'We typically recommend after-hours cleaning to minimize disruption to classes and ensure thorough cleaning. However, we can work during school hours for emergency cleanings or specific areas as needed, following all safety protocols.' },
      { question: 'How do you handle sensitive areas like computer labs and libraries?', answer: 'We have specialized protocols for technology-rich environments. Our team uses appropriate cleaning methods for electronic equipment, delicate materials, and valuable resources while ensuring thorough sanitization of these important learning spaces.' },
      { question: 'What\'s included in your school cleaning checklist?', answer: 'Our comprehensive checklist includes classroom sanitization, restroom deep cleaning, cafeteria hygiene protocols, hallway maintenance, gym and sports facility cleaning, office areas, and specialized cleaning for labs and libraries. We customize our checklist based on your facility\'s specific needs.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 11. PROPERTY CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Property Cleaning',
    slug: 'property-cleaning',
    serviceType: 'property',
    heroTopLabel: 'Premium Property Services',
    heroHeading: 'Property & Building Common Areas Cleaning',
    heroSubheading: 'Specialized cleaning services for apartment buildings, condominiums, and commercial property common areas that enhance property value and resident satisfaction.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750846901/shutterstock_2129156702_qeucgi.jpg',
    heroServiceDuration: 'Property Specialists',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Property Cleaning Services',
    includedSectionSubheading: 'We provide comprehensive cleaning solutions tailored to meet the unique demands of multi-unit residential and commercial properties.',

    cleaningAreas: [
      {
        title: 'Lobbies & Entrance Areas',
        description: 'Create an impeccable first impression with meticulously maintained lobbies and entrances that welcome residents and visitors.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847028/shutterstock_670152970_1_gsbf4k.jpg',
        features: [
          'Detailed floor cleaning tailored to your flooring type',
          'Glass door and window cleaning',
          'Dusting and cleaning of reception furniture and fixtures',
          'Disinfection of high-touch areas and surfaces',
        ],
      },
      {
        title: 'Hallways & Corridors',
        description: 'Maintain pristine, safe passageways throughout your property with our thorough hallway and corridor cleaning services.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847089/hallway-interior-design_d5danz.jpg',
        features: [
          'Vacuuming and floor maintenance for all corridor areas',
          'Spot cleaning of walls and surfaces',
          'Sanitization of handrails, door handles, and light switches',
          'Trash removal and maintenance of waste receptacles',
        ],
      },
      {
        title: 'Stairwells & Elevators',
        description: 'Ensure safe, clean vertical transportation areas with our specialized stairwell and elevator cleaning services.',
        imageUrl: 'https://www.westcoastelevators.com.au/wp-content/uploads/2021/05/Location-1-The-Staircase-scaled.jpg',
        features: [
          'Thorough cleaning of stair treads, risers, and handrails',
          'Complete disinfection of elevator buttons and panels',
          'Cleaning of elevator doors, tracks, and interior surfaces',
          'Maintenance of emergency exit signage and pathways',
        ],
      },
    ],

    serviceTrustIndicators: [
      { number: '250+', text: 'Buildings Serviced' },
      { number: '24/7', text: 'Property Support' },
      { number: '4.9', text: 'Management Rating' },
      { number: '100%', text: 'Property Manager Satisfaction' },
    ],

    whyChooseHeading: 'Why Choose Clensy for Your Property',
    whyChooseSubheading: 'We understand the unique cleaning requirements of multi-unit buildings and deliver specialized solutions that enhance property value and resident satisfaction.',

    benefit1Title: 'Property Management Focus',
    benefit1Description: 'We partner with property managers to develop customized cleaning programs that align with your operational goals and budget requirements.',
    benefit1Icon: 'Building',
    benefit2Title: 'Reliable Scheduling',
    benefit2Description: 'Our consistent cleaning schedules ensure your property always looks its best, with flexibility to accommodate special events or seasonal needs.',
    benefit2Icon: 'Clock',
    benefit3Title: 'Resident Satisfaction',
    benefit3Description: 'Our meticulous cleaning services create living environments that residents are proud to call home, enhancing tenant retention and property reputation.',
    benefit3Icon: 'Home',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: '',

    clientTestimonials: [
      {
        rating: 5,
        review: 'Since contracting with Clensy for our common area cleaning, resident satisfaction scores have increased significantly. Their attention to detail and consistent quality have made my job easier and our building more appealing to current and prospective residents.',
        clientName: 'Michael Rivera',
        clientLocation: 'Property Manager, The Grand Residences',
      },
      {
        rating: 5,
        review: 'Our condominium association has worked with several cleaning companies over the years, but Clensy stands out for their professionalism and thoroughness. Their team is responsive to our requests and proactive about identifying issues before they become problems. The value they provide to our community is exceptional.',
        clientName: 'Lauren Thompson',
        clientLocation: 'HOA President, Parkview Condominiums',
      },
      {
        rating: 5,
        review: 'As a property developer, maintaining a pristine appearance in our buildings is crucial for attracting tenants. Clensy\'s attention to detail and reliable service have helped us maintain high occupancy rates and positive tenant reviews across all our properties.',
        clientName: 'Jonathan Santiago',
        clientLocation: 'Director, Urban Living Properties',
      },
    ],

    faqs: [
      { question: 'How often should common areas be professionally cleaned?', answer: 'We recommend daily cleaning for high-traffic areas like lobbies and hallways, with weekly deep cleaning for stairwells and monthly comprehensive cleaning for all common areas. The frequency can be adjusted based on building size, resident count, and specific needs.' },
      { question: 'Do you work with property management companies?', answer: 'Yes, we specialize in working with property management companies and building owners. We provide customized cleaning programs, detailed reporting, and flexible scheduling to meet the unique needs of multi-unit residential and commercial properties.' },
      { question: 'Can you provide emergency cleaning services?', answer: 'Absolutely! We offer 24/7 emergency cleaning services for unexpected situations like spills, accidents, or urgent preparations for property showings or special events. Our rapid response team can be on-site quickly when needed.' },
      { question: 'What\'s included in your property cleaning service?', answer: 'Our comprehensive service includes lobby and entrance cleaning, hallway and corridor maintenance, stairwell cleaning, elevator sanitization, common bathroom maintenance, trash removal, and cleaning of all common area surfaces. We customize our service based on your property\'s specific layout and needs.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 12. OTHER COMMERCIAL CLEANING
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Other Commercial Cleaning',
    slug: 'other-commercial-cleaning',
    serviceType: 'other-commercial',
    heroTopLabel: 'Premium Commercial Services',
    heroHeading: 'Specialized Commercial Cleaning Services',
    heroSubheading: 'From bustling restaurants to sacred worship spaces, every specialized venue deserves exceptional care. Our customized cleaning solutions are crafted specifically for your unique commercial environment.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847158/image53_kdmkgy.png',
    heroServiceDuration: 'Industry Specialists',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Specialized Commercial Cleaning Services',
    includedSectionSubheading: 'We provide comprehensive cleaning solutions tailored to meet the unique demands of various commercial environments.',

    cleaningAreas: [
      {
        title: 'Restaurants & Food Service',
        description: 'Maintain the highest standards of cleanliness and hygiene in food service environments with our specialized restaurant cleaning services.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847199/restaurant-cleaning-services-london_qaonjw.jpg',
        features: [
          'Kitchen deep cleaning and sanitization',
          'Dining area and front-of-house cleaning',
          'Restroom sanitation and maintenance',
          'Compliance with food safety regulations',
        ],
      },
      {
        title: 'Warehouses & Industrial Spaces',
        description: 'Keep your industrial facilities clean, safe, and efficient with our specialized warehouse and industrial cleaning services.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847223/photo-1586528116311-ad8dd3c8310d_h0y5hk.jpg',
        features: [
          'Large-area floor cleaning with industrial equipment',
          'Dust control and air quality maintenance',
          'Cleaning of machinery areas and equipment exteriors',
          'Staff facilities and break room maintenance',
        ],
      },
      {
        title: 'Places of Worship',
        description: 'Provide a clean, welcoming environment for worship with our respectful, thorough church and religious facility cleaning services.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847250/20220103-quiapo-church-aa_qbucog.webp',
        features: [
          'Sanctuary and worship area cleaning',
          'Community rooms and fellowship halls',
          'Offices and administrative areas',
          'Event cleanup and special service preparation',
        ],
      },
    ],

    serviceTrustIndicators: [
      { number: '600+', text: 'Commercial Clients' },
      { number: '24/7', text: 'Business Support' },
      { number: '4.9', text: 'Business Rating' },
      { number: '100%', text: 'Quality Guarantee' },
    ],

    whyChooseHeading: 'Why Choose Clensy for Your Specialized Space',
    whyChooseSubheading: 'We understand the unique cleaning requirements of different commercial environments and deliver tailored solutions that meet industry-specific needs.',

    benefit1Title: 'Industry Expertise',
    benefit1Description: 'Our cleaning teams receive specialized training for different commercial environments, understanding the unique requirements of each industry.',
    benefit1Icon: 'Award',
    benefit2Title: 'Custom Scheduling',
    benefit2Description: 'We work around your business hours and operational needs, providing cleaning services at times that minimize disruption to your activities.',
    benefit2Icon: 'Clock',
    benefit3Title: 'Value-Focused Solutions',
    benefit3Description: 'Our cleaning programs are designed to deliver the highest standards of cleanliness while respecting your budget constraints and business priorities.',
    benefit3Icon: 'DollarSign',

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: '',

    clientTestimonials: [
      {
        rating: 5,
        review: 'In the restaurant business, cleanliness isn\'t just about appearance—it\'s about food safety and customer confidence. Clensy understands this perfectly. Their team has been handling our after-hours cleaning for three years, and their attention to detail in our kitchen and dining areas has helped us maintain our perfect health inspection record.',
        clientName: 'Carlos Mendez',
        clientLocation: 'Owner, Seaside Grill Restaurant',
      },
      {
        rating: 5,
        review: 'Our worship center serves hundreds of people each week, and Clensy ensures our facility is always immaculate and welcoming. They\'re respectful of our sacred spaces and artifacts while providing thorough cleaning. Their flexibility in handling both our regular maintenance and special event cleanups has made them an invaluable partner to our ministry.',
        clientName: 'Reverend Sarah Williams',
        clientLocation: 'Administrator, Grace Community Church',
      },
      {
        rating: 5,
        review: 'We hired Clensy to handle the specialized cleaning needs of our manufacturing facility, and they\'ve exceeded our expectations. Their understanding of industrial cleaning requirements and attention to safety protocols has made our facility both cleaner and safer for our employees.',
        clientName: 'Anita Kapur',
        clientLocation: 'Operations Manager, PrecisionTech Industries',
      },
    ],

    faqs: [
      { question: 'What types of commercial spaces do you clean?', answer: 'We provide specialized cleaning for a wide variety of commercial environments including restaurants and food service facilities, warehouses and industrial spaces, places of worship, automotive dealerships, manufacturing facilities, banks, law offices, and other unique commercial venues. Each space receives customized cleaning protocols suited to its specific needs.' },
      { question: 'Do you follow industry-specific cleaning standards?', answer: 'Absolutely! We tailor our cleaning procedures to meet the specific regulatory requirements of each industry. For restaurants, we follow food safety protocols; for industrial spaces, we adhere to safety standards; and for places of worship, we use respectful, gentle cleaning methods appropriate for sacred spaces.' },
      { question: 'Can you work around our business hours?', answer: 'Yes, we understand that every business has unique operational schedules. We offer flexible scheduling including after-hours, weekend, and holiday cleaning to ensure minimal disruption to your business operations. We\'ll work with you to find the perfect cleaning schedule.' },
      { question: 'How do you handle specialized equipment or delicate items?', answer: 'Our team is trained to work around and carefully clean specialized equipment, delicate items, and valuable assets. We use appropriate cleaning methods and products for different surfaces and materials, and we can coordinate with your team for specific handling requirements or restricted areas.' },
    ],
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 13. EXTRAS (Add-On Services)
  // ──────────────────────────────────────────────────────────────────────────
  {
    name: 'Extras',
    slug: 'extras',
    serviceType: 'extras',
    heroTopLabel: 'Premium Add-On Services',
    heroHeading: 'Extra Cleaning Services On Demand',
    heroSubheading: 'Enhance your regular cleaning experience with our specialized add-on services. From window cleaning to oven scrubbing, customize your cleaning package to address your specific needs.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845101/ai-generated-minimalist-vivid-advertisment-spring-cleaning-background-with-copy-space-free-photo_mklbfv.jpg',
    heroServiceDuration: 'Customizable Services',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: 'Our Premium Extra Services',
    includedSectionSubheading: 'Customize your cleaning experience with these specialized add-on services, designed to address specific cleaning needs beyond our standard service packages.',

    cleaningAreas: [
      {
        title: 'Window Cleaning',
        description: 'Crystal-clear windows inside and out. We remove grime, hard water stains, and buildup so natural light floods your space.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845101/ai-generated-minimalist-vivid-advertisment-spring-cleaning-background-with-copy-space-free-photo_mklbfv.jpg',
        features: ['Interior and exterior glass cleaning', 'Track and sill detailing', 'Screen dusting and wiping', 'Hard water stain removal'],
      },
      {
        title: 'Oven & Appliance Deep Clean',
        description: 'Inside-out cleaning of ovens, refrigerators, microwaves, and other kitchen appliances to restore them to like-new condition.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845101/ai-generated-minimalist-vivid-advertisment-spring-cleaning-background-with-copy-space-free-photo_mklbfv.jpg',
        features: ['Oven interior degreasing', 'Refrigerator shelf and drawer cleaning', 'Microwave and dishwasher detailing', 'Stovetop deep scrub'],
      },
      {
        title: 'Organization & Laundry',
        description: 'Closet organization, laundry folding, dish washing, and other household tasks to complement your cleaning service.',
        imageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750845101/ai-generated-minimalist-vivid-advertisment-spring-cleaning-background-with-copy-space-free-photo_mklbfv.jpg',
        features: ['Closet and pantry organization', 'Laundry washing and folding', 'Dish washing and kitchen reset', 'Linen changing and bed making'],
      },
    ],

    whyChooseHeading: 'Why Add Extras to Your Cleaning',
    whyChooseSubheading: 'Get more out of every visit with specialized add-on services tailored to your needs.',
    benefit1Title: 'Fully Customizable',
    benefit1Description: 'Mix and match any extras to create the perfect cleaning package for your home or business.',
    benefit1Icon: 'Sparkles',
    benefit2Title: 'Same Trusted Team',
    benefit2Description: 'Your regular cleaning professionals handle extras too — no strangers, no surprises.',
    benefit2Icon: 'Users',
    benefit3Title: 'Convenient Add-Ons',
    benefit3Description: 'Add extras when booking or request them during your regular cleaning visit.',
    benefit3Icon: 'Clock',

    serviceTrustIndicators: [
      { number: '8+', text: 'Extra Services' },
      { number: '100%', text: 'Customizable' },
      { number: '5.0', text: 'Satisfaction Rating' },
      { number: '1000+', text: 'Extra Services Completed' },
    ],

    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: '',

    clientTestimonials: [
      {
        rating: 5,
        review: 'I added window cleaning to my regular service and the difference is incredible. The natural light in my home is so much better with crystal clear windows!',
        clientName: 'Amanda Peterson',
        clientLocation: 'Window Cleaning Client',
      },
      {
        rating: 5,
        review: 'The oven cleaning service is worth every penny. My oven looked brand new after years of built-up grease. I didn\'t even know it could look that clean again!',
        clientName: 'David Richards',
        clientLocation: 'Oven Cleaning Client',
      },
      {
        rating: 5,
        review: 'Having my refrigerator completely emptied, cleaned, and reorganized was amazing. It\'s so much more efficient now and I can find everything!',
        clientName: 'Jennifer Liu',
        clientLocation: 'Refrigerator Cleaning Client',
      },
    ],

    faqs: [
      { question: 'Can I add extra services to my regular cleaning?', answer: 'Absolutely! Extra services are designed to complement your regular cleaning. You can add any combination of our extra services when booking your appointment or even request them during a scheduled cleaning.' },
      { question: 'How much extra time do these services add?', answer: 'Extra services typically add 30 minutes to 2 hours depending on what you select. Window cleaning and organization services tend to take longer, while simpler additions like washing dishes or cleaning the fridge are quicker.' },
      { question: 'Do you bring all the supplies for extra services?', answer: 'Yes, we bring all professional-grade supplies and equipment needed for our extra services. This includes specialized window cleaning solutions, organization containers, and commercial-grade cleaning products.' },
      { question: 'Can I request extra services on short notice?', answer: 'While we recommend booking extra services in advance for the best scheduling, we can often accommodate same-day requests depending on availability and the complexity of the service requested.' },
    ],
  },
];

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  console.log('🏢 Seeding ALL Services into Strapi (Residential + Commercial)...');
  console.log(`   URL: ${STRAPI_URL}`);
  console.log(`   API: ${API_PREFIX}`);
  console.log('');

  await authenticate();
  console.log('');

  // Seed each service
  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const service of allServices) {
    console.log(`\n─── ${service.name} (${service.serviceType}) ───`);
    const result = await createOrUpdate('/services', service);
    if (result) {
      if (result.data?.id) {
        // Try to publish
        await publishEntry('/services', service.slug);
      }
      // Check if it was create or update based on console output
      created++;
    } else {
      failed++;
    }
  }

  console.log('\n════════════════════════════════════════');
  console.log(`✅ Seeding complete!`);
  console.log(`   Processed: ${allServices.length} services`);
  console.log(`   Succeeded: ${created}`);
  console.log(`   Failed: ${failed}`);
  console.log('════════════════════════════════════════\n');
}

main().catch((err) => {
  console.error('💥 Fatal error:', err);
  process.exit(1);
});
