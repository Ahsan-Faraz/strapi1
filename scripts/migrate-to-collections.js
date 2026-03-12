/**
 * Migrate data from single types → collection types
 *
 * Prerequisites:
 *   Strapi must be running with BOTH old single types and new collection types.
 *
 * Run:
 *   node scripts/migrate-to-collections.js
 *
 * After successful migration:
 *   1. Delete the old single-type folders from src/api/
 *   2. Rebuild and restart Strapi
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const API_PREFIX = 'admin/api';
const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  '67eb2c4b5e9661786cbc07a8e245f6feca5539a6b25d371450b6e47ae586b1696c16d0ed67f45d2eb20b1189f91710d0d422b82abe4763e64467a2f6dcb5526e7d23f37110c7925bcd20e46a115bde10200168b131b4ca703f5c9e5eafa743d6691aba335d9a48c7bae2e47d9da3489b3ffa478ceebcd934f7099c40d622e3b2';

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_API_TOKEN}`,
};

// ─── Helper: GET from single type ────────────────────────────────────────
async function getSingleType(name) {
  const url = `${STRAPI_URL}/${API_PREFIX}/${name}`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`❌ GET ${name} → ${res.status}`);
    return null;
  }
  const json = await res.json();
  const { id, documentId, createdAt, updatedAt, publishedAt, locale, ...attributes } = json.data || {};
  return attributes;
}

// ─── Helper: POST to collection type ─────────────────────────────────────
async function createCollectionEntry(pluralName, data) {
  const url = `${STRAPI_URL}/${API_PREFIX}/${pluralName}`;
  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify({ data }),
  });
  if (!res.ok) {
    const err = await res.text();
    console.error(`❌ POST ${pluralName} → ${res.status}`, err);
    return null;
  }
  const json = await res.json();
  console.log(`✅ Created ${pluralName} entry: ${data.slug}`);

  // Publish it
  const docId = json.data?.documentId;
  if (docId) {
    const pubRes = await fetch(`${url}/${docId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: { publishedAt: new Date().toISOString() } }),
    });
    if (pubRes.ok) {
      console.log(`📢 Published: ${data.slug}`);
    }
  }
  return json.data;
}

// ─── Location migration ──────────────────────────────────────────────────
const LOCATION_MAP = {
  'bergen-county': 'bergen',
  'essex-county': 'essex',
  'hudson-county': 'hudson',
  'morris-county': 'morris',
  'passaic-county': 'passaic',
  'union-county': 'union',
};

async function migrateLocations() {
  console.log('\n══════════════════════════════════════');
  console.log('  MIGRATING LOCATIONS');
  console.log('══════════════════════════════════════\n');

  for (const [singleTypeName, slug] of Object.entries(LOCATION_MAP)) {
    const data = await getSingleType(singleTypeName);
    if (!data) {
      console.warn(`⚠️  Skipping ${singleTypeName}: no data`);
      continue;
    }
    await createCollectionEntry('locations', { slug, ...data });
  }
}

// ─── Service migration ───────────────────────────────────────────────────

// Fields that live as top-level columns in the service collection type
const SERVICE_TOP_LEVEL_FIELDS = new Set([
  'seoTitle', 'seoMetaDescription', 'seoKeywords', 'seoCanonicalUrl', 'seoRobots',
  'ogTitle', 'ogDescription', 'ogImageUrl', 'ogType',
  'twitterCard', 'twitterTitle', 'twitterDescription',
  'schemaJsonLd', 'headScripts', 'bodyEndScripts', 'customCss',
  'heroTopLabel', 'heroHeading', 'heroSubheading', 'heroBackgroundImage',
  'heroServiceDuration', 'heroServiceGuarantee',
  'faqs',
]);

const SERVICE_MAP = {
  'routine-cleaning':           { template: 'routine',          name: 'Routine Cleaning' },
  'deep-cleaning':              { template: 'deep',             name: 'Deep Cleaning' },
  'airbnb-cleaning':            { template: 'airbnb',           name: 'Airbnb Cleaning' },
  'moving-cleaning':            { template: 'moving',           name: 'Moving Cleaning' },
  'post-construction-cleaning': { template: 'post-construction', name: 'Post Construction Cleaning' },
  'extras-cleaning':            { template: 'extras',           name: 'Extras & Add-Ons' },
  'office-cleaning':            { template: 'commercial',       name: 'Office Cleaning' },
  'medical-cleaning':           { template: 'commercial',       name: 'Medical Cleaning' },
  'gym-cleaning':               { template: 'commercial',       name: 'Gym Cleaning' },
  'retail-cleaning':            { template: 'commercial',       name: 'Retail Cleaning' },
  'school-cleaning':            { template: 'commercial',       name: 'School Cleaning' },
  'property-cleaning':          { template: 'commercial',       name: 'Property Cleaning' },
  'other-commercial-cleaning':  { template: 'commercial',       name: 'Other Commercial Cleaning' },
};

async function migrateServices() {
  console.log('\n══════════════════════════════════════');
  console.log('  MIGRATING SERVICES');
  console.log('══════════════════════════════════════\n');

  for (const [singleTypeName, { template, name }] of Object.entries(SERVICE_MAP)) {
    const rawData = await getSingleType(singleTypeName);
    if (!rawData) {
      console.warn(`⚠️  Skipping ${singleTypeName}: no data`);
      continue;
    }

    // Split into top-level fields vs pageData JSON
    const entry = {
      slug: singleTypeName,
      name,
      serviceTemplate: template,
    };
    const pageData = {};

    for (const [key, value] of Object.entries(rawData)) {
      if (SERVICE_TOP_LEVEL_FIELDS.has(key)) {
        entry[key] = value;
      } else {
        pageData[key] = value;
      }
    }

    entry.pageData = pageData;
    await createCollectionEntry('services', entry);
  }
}

// ─── Main ────────────────────────────────────────────────────────────────
async function main() {
  console.log('🚀 Starting migration: single types → collection types');
  console.log(`   Strapi: ${STRAPI_URL}/${API_PREFIX}\n`);

  await migrateLocations();
  await migrateServices();

  console.log('\n✅ Migration complete!');
  console.log('   Next steps:');
  console.log('   1. Verify data in Strapi admin panel');
  console.log('   2. Delete old single-type folders from src/api/');
  console.log('   3. Rebuild and restart Strapi');
}

main().catch((err) => {
  console.error('💥 Migration failed:', err);
  process.exit(1);
});
