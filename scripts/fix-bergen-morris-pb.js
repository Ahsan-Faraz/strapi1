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
  console.log('Connected\n');

  // Clear the Page Builder template JSON for Bergen (ID 7) and Morris (ID 29)
  // Set their content to empty array so they match the other 4 locations (fallback rendering)
  const emptyJson = JSON.stringify({ content: [], root: {} });
  
  const result = await client.query(
    `UPDATE templates SET json = $1 WHERE id = ANY($2::int[]) RETURNING id, name, short_name, content_type`,
    [emptyJson, [7, 29]]
  );
  
  console.log(`Updated ${result.rowCount} templates:`);
  result.rows.forEach(r => {
    console.log(`  Template ${r.id}: ${r.name || r.short_name || r.content_type} → cleared to empty content`);
  });

  // Verify all templates now have 0 components
  console.log('\n--- Verification ---');
  const verify = await client.query(`
    SELECT t.id, l.slug, t.json
    FROM templates t
    JOIN locations_location_page_lnk lnk ON t.id = lnk.template_id
    JOIN locations l ON l.id = lnk.location_id
    GROUP BY t.id, l.slug, t.json
    ORDER BY l.slug
  `);
  
  for (const r of verify.rows) {
    const json = typeof r.json === 'string' ? JSON.parse(r.json) : r.json;
    const count = json?.content?.length || 0;
    console.log(`  ${r.slug} → Template ${r.id} → ${count} components ${count === 0 ? '✅' : '❌'}`);
  }

  await client.end();
  console.log('\nDone! Bergen and Morris will now use the same fallback UI as other locations.');
})();
