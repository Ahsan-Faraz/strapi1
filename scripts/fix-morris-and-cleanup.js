const { Client } = require('pg');
const client = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  database: 'postgres',
  user: 'postgres.zezyrfmbigoazutisvia',
  password: 'Ahsanfaraz176!',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

(async () => {
  await client.connect();
  console.log('Connected to Supabase\n');

  // 1. Fix Morris County name
  console.log('--- Fixing Morris County name ---');
  const morrisRes = await client.query(
    `UPDATE locations SET name = 'Morris County' WHERE slug = 'morris' AND name != 'Morris County' RETURNING id, slug, name;`
  );
  console.log(`Updated ${morrisRes.rowCount} Morris rows`);
  morrisRes.rows.forEach(r => console.log(`  ID ${r.id}: ${r.name}`));

  // 2. Delete test entries: new-county and kalmar-county
  console.log('\n--- Deleting test entries ---');
  const testSlugs = ['new-county', 'kalmar-county'];

  // Find test entry IDs first
  const testEntries = await client.query(
    `SELECT id, document_id, slug, name FROM locations WHERE slug = ANY($1::text[])`,
    [testSlugs]
  );
  console.log(`Found ${testEntries.rows.length} test entries to delete:`);
  testEntries.rows.forEach(r => console.log(`  ID ${r.id}: ${r.slug} - ${r.name}`));

  if (testEntries.rows.length > 0) {
    const testIds = testEntries.rows.map(r => r.id);

    // Delete component records
    const cmpsRes = await client.query(
      `DELETE FROM locations_cmps WHERE entity_id = ANY($1::int[]) RETURNING entity_id`,
      [testIds]
    );
    console.log(`Deleted ${cmpsRes.rowCount} component records`);

    // Delete Page Builder links
    try {
      const pbRes = await client.query(
        `DELETE FROM locations_location_page_lnk WHERE location_id = ANY($1::int[]) RETURNING location_id`,
        [testIds]
      );
      console.log(`Deleted ${pbRes.rowCount} Page Builder links`);
    } catch(e) {
      console.log('No PB links to clean');
    }

    // Delete the locations themselves
    const delRes = await client.query(
      `DELETE FROM locations WHERE slug = ANY($1::text[]) RETURNING id, slug, name`,
      [testSlugs]
    );
    console.log(`Deleted ${delRes.rowCount} test location rows`);
  }

  // 3. Verify final state
  console.log('\n--- Final state ---');
  const final = await client.query('SELECT id, slug, name, county FROM locations ORDER BY slug, id');
  final.rows.forEach(r => console.log(`  ID ${r.id} | ${r.slug} | ${r.name} | ${r.county}`));
  console.log(`Total: ${final.rows.length} rows`);

  await client.end();
})();
