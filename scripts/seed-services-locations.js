/**
 * Seed Locations into Strapi
 * 
 * Run with: node scripts/seed-services-locations.js
 * 
 * NOTE: Services have been moved to seed-commercial-services.js
 *       This script now only seeds locations.
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_PREFIX = process.env.STRAPI_API_PREFIX || 'admin/api';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '67eb2c4b5e9661786cbc07a8e245f6feca5539a6b25d371450b6e47ae586b1696c16d0ed67f45d2eb20b1189f91710d0d422b82abe4763e64467a2f6dcb5526e7d23f37110c7925bcd20e46a115bde10200168b131b4ca703f5c9e5eafa743d6691aba335d9a48c7bae2e47d9da3489b3ffa478ceebcd934f7099c40d622e3b2';

let authToken = null;

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

async function createOrUpdate(endpoint, data, identifierField = 'slug') {
  const identifier = data[identifierField];

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

// ============================================
// LOCATIONS DATA
// ============================================

const locations = [
  {
    name: 'Bergen County',
    slug: 'bergen',
    county: 'Bergen',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Bergen County',
    heroSubtitle: 'Trusted residential and commercial cleaning for Bergen County homes and businesses. Serving Hackensack, Paramus, Fort Lee, and surrounding areas.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(201) 555-0123',
    contactEmail: 'bergen@clensy.com',
    contactAddress: 'Bergen County, New Jersey',
    aboutTitle: 'About Our Bergen County Services',
    aboutDescription: 'Clensy has been proudly serving Bergen County residents and businesses for years. Our team of professional cleaners understands the unique needs of this diverse community, from luxury homes in Alpine to busy offices in Hackensack.\n\nWe offer comprehensive cleaning services including routine cleaning, deep cleaning, move-in/out cleaning, and commercial services. Our Bergen County team is fully insured, background-checked, and committed to delivering exceptional results.',
  },
  {
    name: 'Essex County',
    slug: 'essex',
    county: 'Essex',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Essex County',
    heroSubtitle: 'Quality cleaning services for Essex County homes and businesses. Serving Newark, Montclair, Livingston, and all surrounding communities.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(973) 555-0124',
    contactEmail: 'essex@clensy.com',
    contactAddress: 'Essex County, New Jersey',
    aboutTitle: 'About Our Essex County Services',
    aboutDescription: 'From the historic neighborhoods of Newark to the charming streets of Montclair, Clensy provides top-tier cleaning services throughout Essex County.\n\nOur experienced team handles everything from routine home cleaning to specialized commercial services. We take pride in our attention to detail and commitment to customer satisfaction.',
  },
  {
    name: 'Hudson County',
    slug: 'hudson',
    county: 'Hudson',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Hudson County',
    heroSubtitle: 'Expert cleaning services for Hudson County residences and businesses. Serving Jersey City, Hoboken, Weehawken, and the entire waterfront community.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(201) 555-0125',
    contactEmail: 'hudson@clensy.com',
    contactAddress: 'Hudson County, New Jersey',
    aboutTitle: 'About Our Hudson County Services',
    aboutDescription: 'Hudson County is home to some of New Jersey most vibrant communities, and Clensy is proud to serve them all. From high-rise apartments in Jersey City to brownstones in Hoboken, we adapt our services to meet your needs.\n\nOur Hudson County team specializes in urban living spaces, understanding the unique challenges of city cleaning. We offer flexible scheduling to accommodate busy professionals.',
  },
  {
    name: 'Passaic County',
    slug: 'passaic',
    county: 'Passaic',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Passaic County',
    heroSubtitle: 'Reliable cleaning services for Passaic County homes and businesses. Serving Paterson, Clifton, Wayne, and all surrounding areas.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(973) 555-0126',
    contactEmail: 'passaic@clensy.com',
    contactAddress: 'Passaic County, New Jersey',
    aboutTitle: 'About Our Passaic County Services',
    aboutDescription: 'Clensy brings professional cleaning excellence to Passaic County. Whether you are in the heart of Paterson or the suburbs of Wayne, our team delivers consistent, high-quality cleaning services.\n\nWe understand the diverse needs of Passaic County residents and offer customized cleaning plans to match your lifestyle and budget.',
  },
  {
    name: 'Union County',
    slug: 'union',
    county: 'Union',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Union County',
    heroSubtitle: 'Premium cleaning services for Union County homes and businesses. Serving Elizabeth, Westfield, Summit, and all surrounding communities.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(908) 555-0127',
    contactEmail: 'union@clensy.com',
    contactAddress: 'Union County, New Jersey',
    aboutTitle: 'About Our Union County Services',
    aboutDescription: 'Union County residents deserve the best, and Clensy delivers. From the bustling city of Elizabeth to the charming downtown of Westfield, we provide exceptional cleaning services tailored to your needs.\n\nOur Union County team is known for reliability, attention to detail, and outstanding customer service.',
  },
  {
    name: 'Morris County',
    slug: 'morris',
    county: 'Morris',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Morris County',
    heroSubtitle: 'Expert cleaning services for Morris County homes and businesses. Serving Morristown, Parsippany, Madison, and all surrounding areas.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(973) 555-0128',
    contactEmail: 'morris@clensy.com',
    contactAddress: 'Morris County, New Jersey',
    aboutTitle: 'About Our Morris County Services',
    aboutDescription: 'Morris County is known for its beautiful homes and thriving businesses, and Clensy is here to help keep them spotless. Our team serves communities from historic Morristown to growing Parsippany.\n\nWe offer comprehensive residential and commercial cleaning services with the flexibility and professionalism Morris County expects.',
  }
];

// Add operating hours to each location
locations.forEach(location => {
  location.operatingHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];
});

// Add service areas to each location
const serviceAreasByCounty = {
  'Bergen': [
    'Allendale', 'Alpine', 'Bergenfield', 'Bogota', 'Carlstadt', 'Cliffside Park', 'Closter', 'Cresskill', 'Demarest', 'Dumont',
    'East Rutherford', 'Edgewater', 'Emerson', 'Englewood', 'Englewood Cliffs', 'Fairview', 'Fort Lee', 'Franklin Lakes', 'Garfield',
    'Glen Rock', 'Hackensack', 'Harrington Park', 'Hasbrouck Heights', 'Haworth', 'Hillsdale', 'Ho Ho Kus', 'Leonia', 'Little Ferry',
    'Lodi', 'Lyndhurst', 'Mahwah', 'Maywood', 'Midland Park', 'Montvale', 'Moonachie', 'New Milford', 'North Arlington', 'Northvale',
    'Norwood', 'Oakland', 'Oradell', 'Palisades Park', 'Paramus', 'Park Ridge', 'Ramsey', 'Ridgefield', 'Ridgefield Park', 'Ridgewood',
    'River Edge', 'Rochelle Park', 'Rutherford', 'Saddle Brook', 'Saddle River', 'South Hackensack', 'Teaneck', 'Tenafly',
    'Teterboro', 'Township of Washington', 'Waldwick', 'Wallington', 'Westwood', 'Wood Ridge', 'Woodcliff Lake', 'Wyckoff'
  ],
  'Essex': ['Newark', 'Montclair', 'Livingston', 'West Orange', 'Bloomfield', 'Nutley', 'Belleville', 'Irvington', 'Maplewood', 'South Orange'],
  'Hudson': ['Jersey City', 'Hoboken', 'Weehawken', 'Union City', 'North Bergen', 'West New York', 'Bayonne', 'Secaucus', 'Kearny', 'Harrison'],
  'Passaic': ['Paterson', 'Clifton', 'Wayne', 'Passaic', 'Hawthorne', 'Pompton Lakes', 'Little Falls', 'Totowa', 'Woodland Park', 'Ringwood'],
  'Union': ['Elizabeth', 'Westfield', 'Summit', 'Cranford', 'Scotch Plains', 'Rahway', 'Linden', 'Plainfield', 'Union', 'Springfield'],
  'Morris': ['Morristown', 'Parsippany', 'Madison', 'Denville', 'Randolph', 'Rockaway', 'Dover', 'Chatham', 'Florham Park', 'Morris Plains'],

};

locations.forEach(location => {
  location.serviceAreas = (serviceAreasByCounty[location.county] || []).map(name => ({ name }));
});

// ============================================
// MAIN SEED FUNCTION
// ============================================

async function seedLocations() {
  console.log('\n📍 Seeding Locations...\n');
  
  for (const location of locations) {
    await createOrUpdate('/locations', location);
  }
  
  console.log(`\n✅ Seeded ${locations.length} locations\n`);
}

async function main() {
  try {
    await authenticate();
    await seedLocations();
    
    console.log('\n🎉 All locations seeded successfully!\n');
    console.log('📋 Next steps:');
    console.log('1. Go to Strapi Admin → Settings → Users & Permissions → Roles → Public');
    console.log('2. Enable "find" and "findOne" permissions for Services and Locations');
    console.log('3. Click Save');
    console.log('4. Publish all services and locations in Content Manager\n');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

main();
