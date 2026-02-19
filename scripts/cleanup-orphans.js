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
  
  const deletedIds = [31, 35, 37, 39, 72, 73, 74, 76];
  
  // Clean up orphaned component records
  const res = await client.query(
    'DELETE FROM locations_cmps WHERE entity_id = ANY($1::int[]) RETURNING entity_id',
    [deletedIds]
  );
  console.log('Cleaned up ' + res.rowCount + ' orphaned component records');
  
  // Clean up orphaned Page Builder links
  try {
    const res2 = await client.query(
      'DELETE FROM locations_location_page_lnk WHERE location_id = ANY($1::int[]) RETURNING location_id',
      [deletedIds]
    );
    console.log('Cleaned up ' + res2.rowCount + ' orphaned Page Builder links');
  } catch(e) {
    console.log('No PB links to clean: ' + e.message);
  }
  
  // Final verify
  const final = await client.query('SELECT id, slug, name, county FROM locations ORDER BY slug');
  console.log('\nFinal locations:');
  final.rows.forEach(r => console.log('  ' + r.slug + ' | ' + r.name + ' | ' + r.county));
  console.log('\nTotal: ' + final.rows.length);
  
  await client.end();
})();
