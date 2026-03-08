/**
 * Seed Checklist Page Single Type into Strapi
 * Content matches the checklist section from Clensy home page (routine, deep, moving).
 * Run with: node scripts/seed-checklist-page.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_PREFIX = 'admin/api';
const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  '67eb2c4b5e9661786cbc07a8e245f6feca5539a6b25d371450b6e47ae586b1696c16d0ed67f45d2eb20b1189f91710d0d422b82abe4763e64467a2f6dcb5526e7d23f37110c7925bcd20e46a115bde10200168b131b4ca703f5c9e5eafa743d6691aba335d9a48c7bae2e47d9da3489b3ffa478ceebcd934f7099c40d622e3b2';

async function seedSingleType(name, data) {
  console.log(`\n🌱 Seeding ${name}...`);
  const url = `${STRAPI_URL}/${API_PREFIX}/${name}`;

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error(`❌ Failed to seed ${name}: ${response.status}`, error);
    return false;
  }

  console.log(`✅ Seeded: ${name}`);

  const publishResponse = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } }),
  });

  if (publishResponse.ok) {
    console.log(`📢 Published: ${name}`);
  } else {
    console.warn(`⚠️  Could not publish ${name}: ${publishResponse.status}`);
  }

  return true;
}

const checklistPageData = {
  // ── SEO Fields ──────────────────────────────────────────────────────
  seoTitle: 'Our Cleaning Checklist | Clensy Professional Cleaning',
  seoMetaDescription: 'Explore Clensy\'s comprehensive cleaning checklist. See exactly what\'s included in our routine, deep, and move-in/out cleaning services for every room.',
  seoKeywords: 'cleaning checklist, house cleaning checklist, professional cleaning checklist, deep cleaning checklist, move out cleaning checklist',
  seoCanonicalUrl: 'https://clensy.com/company/checklist',
  seoRobots: 'index, follow',
  ogTitle: 'Our Cleaning Checklist | Clensy',
  ogDescription: 'See our comprehensive cleaning checklist. We don\'t miss a spot!',
  ogImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069438/website-images/j5wxvoguffksq4fwffuc.svg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Our Cleaning Checklist | Clensy Professional Cleaning',
  twitterDescription: 'Explore Clensy\'s comprehensive cleaning checklist. See exactly what\'s included in our routine, deep, and move-in/out cleaning services.',

  // ── Hero Section ────────────────────────────────────────────────────
  heroHeading: 'Our Clensy Cleaning <blue>Checklist</blue>',
  heroDescription: 'We\'ve developed a comprehensive cleaning system that ensures nothing is overlooked. Every detail matters, and our meticulous approach guarantees exceptional results.',
  heroSubDescription: 'From high-touch surfaces to hidden corners, our trained professionals follow a systematic process that transforms your space into a spotless sanctuary you can trust.',
  heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop',
  heroCtaButtonText: 'Book Your Cleaning',
  heroRatingText: '4.9/5 Rating',
  heroSatisfactionText: '100% Satisfaction',

  // ── Interactive Guide Section ───────────────────────────────────────
  interactiveGuideHeading: 'Our Clensy Cleaning Guide',
  interactiveGuideDescription: 'Click on any room to explore our detailed cleaning protocols and see exactly what\'s included in each service level.',
  floorPlanImageDesktopUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069438/website-images/j5wxvoguffksq4fwffuc.svg',
  floorPlanImageMobileUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069449/website-images/rzv9r7sgs6wgchwgh7kq.svg',

  // ── Checklist Section ───────────────────────────────────────────────
  checklistSectionHeading: 'Clensy Cleaning Checklist',
  checklistSectionDescription: 'Choose your cleaning level to see exactly what\'s included in each comprehensive service package',
  checklistData: {
    kitchen: {
      title: 'Kitchen',
      routine: [
        'Sweep, Vacuum, & Mop Floors',
        'Wipe down countertops',
        'Wipe down Stove Top',
        'Clean exterior of appliances',
        'Sinks scrubbed and disinfected (dishes upon request)',
        'Wipe exterior of cabinets and handles',
        'Clean Stove Top',
        'Trash emptied',
      ],
      deep: [
        'Everything in routine +',
        'Clean inside microwave',
        'Kitchen Backsplash',
        'Degrease Stovetop',
        'Wipe baseboards and molding',
        'Doors, door frames, & light switches',
        'Tables, chairs, & behind/under furniture',
        'Window Sills',
      ],
      moving: [
        'Sweep, Vacuum and mop floors thoroughly',
        'Clean and disinfect inside and outside of all cabinets and drawers',
        'Clean inside and outside of refrigerator',
        'Clean inside and outside of oven',
        'Scrub and disinfect sink and faucet',
        'Wipe all countertops and backsplash',
        'Clean exterior and interior of microwave and other appliances',
        'Wipe down baseboards, door frames, and light switches',
      ],
      image: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069417/website-images/y1jwhpsvkcdznrehbatk.jpg',
    },
    bathroom: {
      title: 'Bathrooms',
      routine: [
        'Sweep, Vacuum, & Mop Floors',
        'Scrub and sanitize showers and tubs',
        'Clean and disinfect toilets',
        'Scrub and disinfect sink and countertops',
        'Chrome fixtures cleaned and shined',
        'Clean mirrors',
        'Towels neatly hung and folded',
        'Trash Emptied',
      ],
      deep: [
        'Everything in routine +',
        'Remove hard water stains (where possible)',
        'Scrub grout lines (moderate scrubbing)',
        'Ceiling fans and light fixtures dusted',
        'Dust vent covers and ceiling corners',
        'Wipe baseboards and molding',
        'Doors, door frames, & light switches',
        'Window Sills',
      ],
      moving: [
        'Sweep, Vacuum and mop floors thoroughly',
        'Scrub and disinfect toilet (inside, outside, and behind)',
        'Deep clean shower/tub (remove soap scum, mildew, grout scrubbing)',
        'Clean inside and outside of all drawers, cabinets, and vanities',
        'Scrub and polish sink, faucet, and countertops',
        'Clean mirrors and any glass shower doors',
        'Wipe baseboards and door trim',
        'Dust and clean vents, fan covers, and corners',
      ],
      image: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069426/website-images/hbni4r1jfgawyay3od41.jpg',
    },
    bedroom: {
      title: 'Bedrooms',
      routine: [
        'Sweep, Vacuum, & Mop Floors',
        'Beds made, linens changed (if linens are left on bed)',
        'Dust bedroom shelving, night stand, & bed frame',
        'Picture frames dusted',
        'Mirrors Cleaned',
        'Light (5 minutes) Organization of room',
        'Ensure overall room looks neat, tidy, and "hotel-fresh"',
        'Trash Emptied',
      ],
      deep: [
        'Everything in routine +',
        'Ceiling fans and light fixtures dusted',
        'Remove cobwebs from corners and ceilings',
        'Wipe baseboards and molding',
        'Doors, door frames, & light switches',
        'Behind/under furniture',
        'Window Sills',
        'Wipe down decor items (vases, candle holders, etc.)',
      ],
      moving: [
        'Sweep, Vacuum and mop floors thoroughly',
        'Clean inside closets, including shelving and floor',
        'Wipe baseboards and door trim',
        'Clean interior window glass and wipe window sills',
        'Dust and wipe ceiling fans and light fixtures',
        'Clean light switches, doors, and outlet covers',
        'Remove cobwebs and dust from ceiling corners',
        'Trash Emptied',
      ],
      image: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069425/website-images/of8tqpfw4nky9boexhhg.jpg',
    },
    living: {
      title: 'Living Areas',
      routine: [
        'Sweep, Vacuum, & Mop Floors',
        'Upholstered furniture vacuumed',
        'Dust all surfaces and decor',
        'Dust electronics and TV stands',
        'Fluff and straighten couch cushions & pillows',
        'Clean mirrors and glass surfaces',
        'Light (5 minutes) Organization of room',
        'Trash emptied',
      ],
      deep: [
        'Everything in routine +',
        'Vacuum inside couch cushions (if removable)',
        'Ceiling fans and light fixtures dusted',
        'Remove cobwebs from corners and ceilings',
        'Wipe baseboards and molding',
        'Doors, door frames, & light switches',
        'Behind/under furniture',
        'Window Sills',
      ],
      moving: [
        'Sweep, Vacuum and mop floors thoroughly',
        'Dust and wipe all baseboards and molding',
        'Clean interior window glass and wipe window sills',
        'Remove cobwebs from ceilings and corners',
        'Clean doors, handles, and light switches',
        'Dust and wipe ceiling fans and light fixtures',
        'Clean inside closets and shelving (if any)',
        'Trash Emptied',
      ],
      image: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069416/website-images/ybxxaliusujslwciplyb.jpg',
    },
  },

  // ── CTA Section ─────────────────────────────────────────────────────
  ctaHeading: 'Ready for a Spotless Home?',
  ctaDescription: 'Book your cleaning today and experience the Clensy difference. Our comprehensive checklist ensures nothing is missed.',
  ctaButtonText: 'Book Now',
  ctaPhoneNumber: '(551) 305-4081',
};

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('  Seeding Checklist Page');
  console.log('═══════════════════════════════════════════════════');

  const success = await seedSingleType('checklist-page', checklistPageData);

  console.log('\n═══════════════════════════════════════════════════');
  if (success) {
    console.log('✅ Checklist page seeded and published successfully!');
  } else {
    console.log('❌ Checklist page seeding failed.');
  }
  console.log('═══════════════════════════════════════════════════');
}

main().catch(console.error);
