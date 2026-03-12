/**
 * Seed ALL 6 Locations into the "location" Collection Type in Strapi
 * Auto-generated from MongoDB exports.
 * Run with: node scripts/seed-locations.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_PREFIX = 'admin/api';
const STRAPI_API_TOKEN =process.env.STRAPI_API_TOKEN;

// Map old single-type name → collection slug
const SLUG_MAP = {
  'bergen-county': 'bergen',
  'essex-county': 'essex',
  'hudson-county': 'hudson',
  'morris-county': 'morris',
  'passaic-county': 'passaic',
  'union-county': 'union',
};

async function seedLocation(oldName, data) {
  const slug = SLUG_MAP[oldName];
  console.log(`\n🌱 Seeding location: ${slug}...`);
  const url = `${STRAPI_URL}/${API_PREFIX}/locations`;
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  };

  // Check if already exists
  const checkRes = await fetch(`${url}?filters[slug][$eq]=${slug}`, { headers });
  const checkJson = await checkRes.json();
  const existing = checkJson.data?.[0];

  let docId;
  if (existing) {
    // Update existing entry
    docId = existing.documentId;
    const response = await fetch(`${url}/${docId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: { slug, ...data } }),
    });
    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Failed to update ${slug}: ${response.status}`, error);
      return false;
    }
    console.log(`✅ Updated: ${slug}`);
  } else {
    // Create new entry
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ data: { slug, ...data } }),
    });
    if (!response.ok) {
      const error = await response.text();
      console.error(`❌ Failed to create ${slug}: ${response.status}`, error);
      return false;
    }
    const json = await response.json();
    docId = json.data?.documentId;
    console.log(`✅ Created: ${slug}`);
  }

  // Publish
  if (docId) {
    const pubRes = await fetch(`${url}/${docId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } }),
    });
    if (pubRes.ok) console.log(`📢 Published: ${slug}`);
  }

  return true;
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOCATION DATA
// ═══════════════════════════════════════════════════════════════════════════════

const locations = {
  // ══════════════════════════════════════════════════════════════════════
  // BERGEN COUNTY
  // ══════════════════════════════════════════════════════════════════════
  'bergen-county': {
    // SEO
    seoTitle: 'Professional Cleaning Services in Bergen County, NJ | Clensy',
    seoMetaDescription: 'Clensy offers professional cleaning services in Bergen County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    seoKeywords: [
      'cleaning services Bergen County',
      'house cleaning Bergen County',
      'commercial cleaning Bergen County',
      'professional cleaners Bergen',
      'maid service Bergen County',
      'office cleaning Bergen',
    ],
    seoCanonicalUrl: 'https://clensy.com/locations/bergen',
    seoRobots: 'index, follow',
    ogTitle: 'Professional Cleaning Services in Bergen County, NJ | Clensy',
    ogDescription: 'Clensy offers professional cleaning services in Bergen County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    ogImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528394/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002_vpkfcx.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Professional Cleaning Services in Bergen County, NJ | Clensy',
    twitterDescription: 'Clensy offers professional cleaning services in Bergen County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    schemaJsonLd: null,
    headScripts: '',
    bodyEndScripts: '',
    customCss: '',
    // Hero
    heroTitle: 'Bergen County',
    heroSubtitle: 'Professional Cleaning Services in Bergen County, NJ',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528394/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002_vpkfcx.jpg',
    heroCtaButton1: 'SCHEDULE SERVICE',
    heroCtaButton2: 'CALL US NOW',
    // Contact
    contactTitle: 'Contact Information',
    contactPhone: '551-305-4081',
    contactEmail: 'info@clensy.com',
    contactAddress: '123 Bergen Ave, Bergen County, NJ 07000',
    operatingHours: [
      { day: 'Monday', hours: '8:00 am - 8:00 pm' },
      { day: 'Tuesday', hours: '8:00 am - 8:00 pm' },
      { day: 'Wednesday', hours: '8:00 am - 8:00 pm' },
      { day: 'Thursday', hours: '8:00 am - 8:00 pm' },
      { day: 'Friday', hours: '8:00 am - 8:00 pm' },
      { day: 'Saturday', hours: '9:00 am - 4:00 pm' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    // Service Areas (alphabetical)
    serviceAreas: [
      'Allendale',
      'Alpine',
      'Bergenfield',
      'Bogota',
      'Carlstadt',
      'Cliffside Park',
      'Closter',
      'Cresskill',
      'Demarest',
      'Dumont',
      'East Rutherford',
      'Edgewater',
      'Emerson',
      'Englewood',
      'Englewood Cliffs',
      'Fairview',
      'Fort Lee',
      'Franklin Lakes',
      'Garfield',
      'Glen Rock',
      'Hackensack',
      'Harrington Park',
      'Hasbrouck Heights',
      'Haworth',
      'Hillsdale',
      'Ho Ho Kus',
      'Leonia',
      'Little Ferry',
      'Lodi',
      'Lyndhurst',
      'Mahwah',
      'Maywood',
      'Midland Park',
      'Montvale',
      'Moonachie',
      'New Milford',
      'North Arlington',
      'Northvale',
      'Norwood',
      'Oakland',
      'Oradell',
      'Palisades Park',
      'Paramus',
      'Park Ridge',
      'Ramsey',
      'Ridgefield',
      'Ridgefield Park',
      'Ridgewood',
      'River Edge',
      'Rochelle Park',
      'Rutherford',
      'Saddle Brook',
      'Saddle River',
      'South Hackensack',
      'Teaneck',
      'Tenafly',
      'Teterboro',
      'Township of Washington',
      'Waldwick',
      'Wallington',
      'Westwood',
      'Wood Ridge',
      'Woodcliff Lake',
      'Wyckoff',
    ],
    // About
    aboutTitle: 'About Our Bergen County Services',
    aboutDescription: 'Serving Bergen County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail.',
    mapImageUrl: 'https://www.cccarto.com/nj/bergen_zipcodes/files/bergen_county_zip_codes.jpg',
  },

  // ══════════════════════════════════════════════════════════════════════
  // ESSEX COUNTY
  // ══════════════════════════════════════════════════════════════════════
  'essex-county': {
    // SEO
    seoTitle: 'Professional Cleaning Services in Essex County, NJ | Clensy',
    seoMetaDescription: 'Clensy offers professional cleaning services in Essex County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    seoKeywords: [
      'cleaning services Essex County',
      'house cleaning Essex County',
      'commercial cleaning Essex County',
      'professional cleaners Essex',
      'maid service Essex County',
      'office cleaning Essex',
    ],
    seoCanonicalUrl: 'https://clensy.com/locations/essex',
    seoRobots: 'index, follow',
    ogTitle: 'Professional Cleaning Services in Essex County, NJ | Clensy',
    ogDescription: 'Clensy offers professional cleaning services in Essex County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    ogImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528515/pasted-image-0-1_goc4cv.png',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Professional Cleaning Services in Essex County, NJ | Clensy',
    twitterDescription: 'Clensy offers professional cleaning services in Essex County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    schemaJsonLd: null,
    headScripts: '',
    bodyEndScripts: '',
    customCss: '',
    // Hero
    heroTitle: 'Essex County',
    heroSubtitle: 'Professional Cleaning Services in Essex County, NJ',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528515/pasted-image-0-1_goc4cv.png',
    heroCtaButton1: 'SCHEDULE SERVICE',
    heroCtaButton2: 'CALL US NOW',
    // Contact
    contactTitle: 'Contact Information',
    contactPhone: '973-555-7890',
    contactEmail: 'essex@clensy.com',
    contactAddress: '123 Essex Ave, Essex County, NJ 07000',
    operatingHours: [
      { day: 'Monday', hours: '8:00 am - 6:00 pm' },
      { day: 'Tuesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Wednesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Thursday', hours: '8:00 am - 6:00 pm' },
      { day: 'Friday', hours: '8:00 am - 6:00 pm' },
      { day: 'Saturday', hours: '9:00 am - 3:00 pm' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    // Service Areas (alphabetical)
    serviceAreas: [
      'Bloomfield',
      'Caldwell',
      'Cedar Grove',
      'East Orange',
      'Fairfield',
      'Livingston',
      'Maplewood',
      'Millburn',
      'Montclair',
      'Newark',
      'Orange',
      'South Orange',
      'Verona',
      'West Caldwell',
      'West Orange',
    ],
    // About
    aboutTitle: 'About Our Essex County Services',
    aboutDescription: 'Serving Essex County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail.',
    // Essex has no map image intentionally
  },

  // ══════════════════════════════════════════════════════════════════════
  // HUDSON COUNTY
  // ══════════════════════════════════════════════════════════════════════
  'hudson-county': {
    // SEO
    seoTitle: 'Professional Cleaning Services in Hudson County, NJ | Clensy',
    seoMetaDescription: 'Clensy offers professional cleaning services in Hudson County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    seoKeywords: [
      'cleaning services Hudson County',
      'house cleaning Hudson County',
      'commercial cleaning Hudson County',
      'professional cleaners Hudson',
      'maid service Hudson County',
      'office cleaning Hudson',
    ],
    seoCanonicalUrl: 'https://clensy.com/locations/hudson',
    seoRobots: 'index, follow',
    ogTitle: 'Professional Cleaning Services in Hudson County, NJ | Clensy',
    ogDescription: 'Clensy offers professional cleaning services in Hudson County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    ogImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528451/c01b3f0cb3f32f34ac1670ff10991d9e47-hoboken-lede.2x.rsocial.w600_bvqxiu.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Professional Cleaning Services in Hudson County, NJ | Clensy',
    twitterDescription: 'Clensy offers professional cleaning services in Hudson County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    schemaJsonLd: null,
    headScripts: '',
    bodyEndScripts: '',
    customCss: '',
    // Hero
    heroTitle: 'Hudson County',
    heroSubtitle: 'Professional Cleaning Services in Hudson County, NJ',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528451/c01b3f0cb3f32f34ac1670ff10991d9e47-hoboken-lede.2x.rsocial.w600_bvqxiu.jpg',
    heroCtaButton1: 'SCHEDULE SERVICE',
    heroCtaButton2: 'CALL US NOW',
    // Contact
    contactTitle: 'Contact Information',
    contactPhone: '201-555-7890',
    contactEmail: 'hudson@clensy.com',
    contactAddress: '123 Hudson Ave, Hudson County, NJ 07000',
    operatingHours: [
      { day: 'Monday', hours: '8:00 am - 6:00 pm' },
      { day: 'Tuesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Wednesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Thursday', hours: '8:00 am - 6:00 pm' },
      { day: 'Friday', hours: '8:00 am - 6:00 pm' },
      { day: 'Saturday', hours: '9:00 am - 3:00 pm' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    // Service Areas (alphabetical)
    serviceAreas: [
      'Bayonne',
      'Harrison',
      'Hoboken',
      'Jersey City',
      'Kearny',
      'North Bergen',
      'Secaucus',
      'Union City',
      'Weehawken',
      'West New York',
    ],
    // About
    aboutTitle: 'About Our Hudson County Services',
    aboutDescription: 'Serving Hudson County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail.',
    mapImageUrl: 'https://www.cccarto.com/nj/hudson_zipcodes/files/hudson_county_zip_codes.jpg',
  },

  // ══════════════════════════════════════════════════════════════════════
  // MORRIS COUNTY
  // ══════════════════════════════════════════════════════════════════════
  'morris-county': {
    // SEO
    seoTitle: 'Professional Cleaning Services in Morris County, NJ | Clensy',
    seoMetaDescription: 'Clensy offers professional cleaning services in Morris County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    seoKeywords: [
      'cleaning services Morris County',
      'house cleaning Morris County',
      'commercial cleaning Morris County',
      'professional cleaners Morristown',
      'maid service Morris County',
      'office cleaning Morris',
    ],
    seoCanonicalUrl: 'https://clensy.com/locations/morris',
    seoRobots: 'index, follow',
    ogTitle: 'Professional Cleaning Services in Morris County, NJ | Clensy',
    ogDescription: 'Clensy offers professional cleaning services in Morris County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    ogImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528634/GettyImages-1403661247_nfwwdl.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Professional Cleaning Services in Morris County, NJ | Clensy',
    twitterDescription: 'Clensy offers professional cleaning services in Morris County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    schemaJsonLd: null,
    headScripts: '',
    bodyEndScripts: '',
    customCss: '',
    // Hero
    heroTitle: 'Morris County',
    heroSubtitle: 'Professional Cleaning Services in Morris County, NJ',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528634/GettyImages-1403661247_nfwwdl.jpg',
    heroCtaButton1: 'SCHEDULE SERVICE',
    heroCtaButton2: 'CALL US NOW',
    // Contact
    contactTitle: 'Contact Information',
    contactPhone: '973-555-2468',
    contactEmail: 'morris@clensy.com',
    contactAddress: '123 Morris Ave, Morristown, NJ 07960',
    operatingHours: [
      { day: 'Monday', hours: '8:00 am - 6:00 pm' },
      { day: 'Tuesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Wednesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Thursday', hours: '8:00 am - 6:00 pm' },
      { day: 'Friday', hours: '8:00 am - 6:00 pm' },
      { day: 'Saturday', hours: '10:00 am - 2:00 pm' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    // Service Areas (alphabetical)
    serviceAreas: [
      'Boonton',
      'Butler',
      'Chatham',
      'Denville',
      'Florham Park',
      'Lincoln Park',
      'Madison',
      'Morristown',
      'Mountain Lakes',
      'Parsippany',
      'Pine Brook',
    ],
    // About
    aboutTitle: 'About Our Morris County Services',
    aboutDescription: 'Serving Morris County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail.',
    mapImageUrl: 'https://www.njitalianheritage.org/wp-content/uploads/2016/06/Morris-County-Municipalities-Map.gif',
  },

  // ══════════════════════════════════════════════════════════════════════
  // PASSAIC COUNTY
  // ══════════════════════════════════════════════════════════════════════
  'passaic-county': {
    // SEO
    seoTitle: 'Professional Cleaning Services in Passaic County, NJ | Clensy',
    seoMetaDescription: 'Clensy offers professional cleaning services in Passaic County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    seoKeywords: [
      'cleaning services Passaic County',
      'house cleaning Passaic County',
      'commercial cleaning Passaic County',
      'professional cleaners Passaic',
      'maid service Passaic County',
      'office cleaning Passaic',
    ],
    seoCanonicalUrl: 'https://clensy.com/locations/passaic',
    seoRobots: 'index, follow',
    ogTitle: 'Professional Cleaning Services in Passaic County, NJ | Clensy',
    ogDescription: 'Clensy offers professional cleaning services in Passaic County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    ogImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528559/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002_tqa9si.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Professional Cleaning Services in Passaic County, NJ | Clensy',
    twitterDescription: 'Clensy offers professional cleaning services in Passaic County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    schemaJsonLd: null,
    headScripts: '',
    bodyEndScripts: '',
    customCss: '',
    // Hero
    heroTitle: 'Passaic County',
    heroSubtitle: 'Professional Cleaning Services in Passaic County, NJ',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528559/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002_tqa9si.jpg',
    heroCtaButton1: 'SCHEDULE SERVICE',
    heroCtaButton2: 'CALL US NOW',
    // Contact
    contactTitle: 'Contact Information',
    contactPhone: '973-555-7890',
    contactEmail: 'passaic@clensy.com',
    contactAddress: '123 Passaic Ave, Passaic County, NJ 07000',
    operatingHours: [
      { day: 'Monday', hours: '8:00 am - 6:00 pm' },
      { day: 'Tuesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Wednesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Thursday', hours: '8:00 am - 6:00 pm' },
      { day: 'Friday', hours: '8:00 am - 6:00 pm' },
      { day: 'Saturday', hours: '9:00 am - 3:00 pm' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    // Service Areas (alphabetical)
    serviceAreas: [
      'Bloomingdale',
      'Clifton',
      'Haledon',
      'Haskell',
      'Hewitt',
      'Little Falls',
      'Newfoundland',
      'Paterson',
      'Prospect Park',
      'Ringwood',
      'Totowa',
      'Wanaque',
      'Wayne',
      'West Milford',
    ],
    // About
    aboutTitle: 'About Our Passaic County Services',
    aboutDescription: 'Serving Passaic County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail.',
    mapImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Passaic_County%2C_New_Jersey_Municipalities.png',
  },

  // ══════════════════════════════════════════════════════════════════════
  // UNION COUNTY
  // ══════════════════════════════════════════════════════════════════════
  'union-county': {
    // SEO
    seoTitle: 'Professional Cleaning Services in Union County, NJ | Clensy',
    seoMetaDescription: 'Clensy offers professional cleaning services in Union County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    seoKeywords: [
      'cleaning services Union County',
      'house cleaning Union County',
      'commercial cleaning Union County',
      'professional cleaners Union',
      'maid service Union County',
      'office cleaning Union',
    ],
    seoCanonicalUrl: 'https://clensy.com/locations/union',
    seoRobots: 'index, follow',
    ogTitle: 'Professional Cleaning Services in Union County, NJ | Clensy',
    ogDescription: 'Clensy offers professional cleaning services in Union County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    ogImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528599/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002_yu0uvx.jpg',
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: 'Professional Cleaning Services in Union County, NJ | Clensy',
    twitterDescription: 'Clensy offers professional cleaning services in Union County, NJ. Book online for residential and commercial cleaning services with guaranteed satisfaction.',
    schemaJsonLd: null,
    headScripts: '',
    bodyEndScripts: '',
    customCss: '',
    // Hero
    heroTitle: 'Union County',
    heroSubtitle: 'Professional Cleaning Services in Union County, NJ',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1751528599/718c5a20-c480-4df5-bf12-006e5614d111-112720-Paramus-BlackFriday-002_yu0uvx.jpg',
    heroCtaButton1: 'SCHEDULE SERVICE',
    heroCtaButton2: 'CALL US NOW',
    // Contact
    contactTitle: 'Contact Information',
    contactPhone: '908-555-7890',
    contactEmail: 'union@clensy.com',
    contactAddress: '123 Union Ave, Union County, NJ 07000',
    operatingHours: [
      { day: 'Monday', hours: '8:00 am - 6:00 pm' },
      { day: 'Tuesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Wednesday', hours: '8:00 am - 6:00 pm' },
      { day: 'Thursday', hours: '8:00 am - 6:00 pm' },
      { day: 'Friday', hours: '8:00 am - 6:00 pm' },
      { day: 'Saturday', hours: '9:00 am - 3:00 pm' },
      { day: 'Sunday', hours: 'Closed' },
    ],
    // Service Areas (alphabetical)
    serviceAreas: [
      'Clark',
      'Cranford',
      'Elizabeth',
      'Fanwood',
      'Garwood',
      'Hillside',
      'Kenilworth',
      'Linden',
      'Rahway',
      'Scotch Plains',
      'Springfield',
      'Summit',
      'Union',
      'Vauxhall',
      'Westfield',
    ],
    // About
    aboutTitle: 'About Our Union County Services',
    aboutDescription: 'Serving Union County with top-quality cleaning services for both residential and commercial properties. Our team of professional cleaners is dedicated to providing exceptional service with attention to detail.',
    mapImageUrl: 'https://media.istockphoto.com/id/1432144928/vector/nj-union-county-vector-map-green.jpg?s=612x612&w=0&k=20&c=MO1sD_9MQa1CBP1TelSLuU4ELsyx_IyxsS2KTOsTIdQ=',
  },
};

// ─── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting seed of all 6 locations into collection type...\n');

  let success = 0;
  let failed = 0;

  for (const [name, data] of Object.entries(locations)) {
    const ok = await seedLocation(name, data);
    if (ok) success++;
    else failed++;
  }

  console.log(`\n${'═'.repeat(60)}`);
  console.log(`✅ Seeded: ${success} | ❌ Failed: ${failed} | Total: ${Object.keys(locations).length}`);
  console.log(`${'═'.repeat(60)}\n`);
}

main().catch(console.error);
