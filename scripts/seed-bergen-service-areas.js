/**
 * Seed Bergen County with 65 service area towns
 * Updates only the Bergen location - does not touch other locations or services.
 *
 * Run: npm run seed:bergen  (or node scripts/seed-bergen-service-areas.js)
 * Requires: Strapi running + STRAPI_API_TOKEN in .env
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const API_PREFIX = process.env.STRAPI_API_PREFIX || 'admin/api';

const BERGEN_SERVICE_AREAS = [
  'Allendale', 'Alpine', 'Bergenfield', 'Bogota', 'Carlstadt', 'Cliffside Park', 'Closter', 'Cresskill', 'Demarest', 'Dumont',
  'East Rutherford', 'Edgewater', 'Emerson', 'Englewood', 'Englewood Cliffs', 'Fairview', 'Fort Lee', 'Franklin Lakes', 'Garfield',
  'Glen Rock', 'Hackensack', 'Harrington Park', 'Hasbrouck Heights', 'Haworth', 'Hillsdale', 'Ho Ho Kus', 'Leonia', 'Little Ferry',
  'Lodi', 'Lyndhurst', 'Mahwah', 'Maywood', 'Midland Park', 'Montvale', 'Moonachie', 'New Milford', 'North Arlington', 'Northvale',
  'Norwood', 'Oakland', 'Oradell', 'Palisades Park', 'Paramus', 'Park Ridge', 'Ramsey', 'Ridgefield', 'Ridgefield Park', 'Ridgewood',
  'River Edge', 'Rochelle Park', 'Rutherford', 'Saddle Brook', 'Saddle River', 'South Hackensack', 'Teaneck', 'Tenafly',
  'Teterboro', 'Township of Washington', 'Waldwick', 'Wallington', 'Westwood', 'Wood Ridge', 'Woodcliff Lake', 'Wyckoff'
];

async function run() {
  console.log('📍 Seeding Bergen County service areas (65 towns)...\n');
  console.log(`   Target: ${STRAPI_URL}/${API_PREFIX}/locations\n`);

  if (!STRAPI_API_TOKEN) {
    console.error('❌ STRAPI_API_TOKEN required. Add it to strapi1/.env\n');
    process.exit(1);
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
  };

  // Fetch Bergen location
  const findRes = await fetch(
    `${STRAPI_URL}/${API_PREFIX}/locations?filters[slug][$eq]=bergen`,
    { headers }
  );
  const findData = await findRes.json();

  if (!findRes.ok) {
    console.error('❌ Failed to fetch Bergen:', await findRes.text());
    process.exit(1);
  }

  const bergen = findData.data?.[0];
  if (!bergen) {
    console.error('❌ Bergen County location not found. Run seed:locations first to create it.\n');
    process.exit(1);
  }

  const serviceAreas = BERGEN_SERVICE_AREAS.map((name) => ({ name }));

  // Build update payload - exclude keys Strapi rejects in PUT body
  const attrs = bergen.attributes || bergen;
  const rejectKeys = ['id', 'documentId', 'createdAt', 'updatedAt', 'publishedAt'];
  const cleanAttrs = Object.fromEntries(
    Object.entries(attrs).filter(([k]) => !rejectKeys.includes(k))
  );
  const updatePayload = { ...cleanAttrs, serviceAreas };

  // Strapi v5 uses documentId for REST API, not numeric id
  const locationId = bergen.documentId ?? bergen.id;
  if (!locationId) {
    console.error('❌ Bergen has no documentId or id. Response:', JSON.stringify(bergen, null, 2).slice(0, 500));
    process.exit(1);
  }
  const updateRes = await fetch(
    `${STRAPI_URL}/${API_PREFIX}/locations/${locationId}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: updatePayload }),
    }
  );

  if (!updateRes.ok) {
    console.error('❌ Failed to update Bergen:', await updateRes.text());
    process.exit(1);
  }

  console.log(`✅ Bergen County updated with ${BERGEN_SERVICE_AREAS.length} service areas\n`);
  console.log('Towns:', BERGEN_SERVICE_AREAS.join(', '));
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
