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

  // Find the correct table name for page builder templates
  const tables = await client.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' AND (table_name LIKE '%template%' OR table_name LIKE '%page_builder%' OR table_name LIKE '%pb%')
    ORDER BY table_name;
  `);
  console.log('Template-related tables:');
  tables.rows.forEach(r => console.log(`  ${r.table_name}`));

  // Get template IDs linked to locations
  const templateIds = [7, 21, 22, 26, 28, 29];
  
  // Try each possible table
  for (const tableName of tables.rows.map(r => r.table_name)) {
    try {
      const cols = await client.query(`
        SELECT column_name FROM information_schema.columns 
        WHERE table_name = '${tableName}' ORDER BY ordinal_position
      `);
      console.log(`\n${tableName} columns: ${cols.rows.map(r => r.column_name).join(', ')}`);
      
      if (cols.rows.some(c => c.column_name === 'json')) {
        console.log(`  → This table has JSON! Checking template content...`);
        const results = await client.query(
          `SELECT id, document_id, json FROM ${tableName} WHERE id = ANY($1::int[])`,
          [templateIds]
        );
        for (const r of results.rows) {
          const json = typeof r.json === 'string' ? JSON.parse(r.json) : r.json;
          const components = json?.content || [];
          // Find which location this template belongs to
          const locLink = await client.query(
            `SELECT l.slug FROM locations_location_page_lnk lnk JOIN locations l ON l.id = lnk.location_id WHERE lnk.template_id = $1 LIMIT 1`,
            [r.id]
          );
          const slug = locLink.rows[0]?.slug || 'unknown';
          console.log(`\n  Template ${r.id} (${slug}):`);
          console.log(`    Components: ${components.length}`);
          components.forEach((c, i) => {
            console.log(`      ${i+1}. ${c.type}`);
          });
        }
      }
    } catch(e) {
      // skip
    }
  }

  await client.end();
})();
