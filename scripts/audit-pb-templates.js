const { Client } = require('pg');

const c = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres.zezyrfmbigoazutisvia',
  password: 'Ahsanfaraz176!',
  ssl: { rejectUnauthorized: false }
});

(async () => {
  await c.connect();

  // 1. List ALL templates
  const templates = await c.query(`
    SELECT id, name, LENGTH(json::text) as json_len 
    FROM templates ORDER BY id
  `);
  console.log('=== ALL TEMPLATES ===');
  templates.rows.forEach(r => 
    console.log(`ID: ${r.id} | Name: ${r.name} | JSON len: ${r.json_len}`)
  );

  // 2. Find all PB link tables
  const links = await c.query(`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name LIKE '%_page_lnk'
    ORDER BY table_name
  `);
  console.log('\n=== LINK TABLES ===');
  for (const row of links.rows) {
    try {
      const data = await c.query(`SELECT * FROM ${row.table_name}`);
      console.log(`${row.table_name}: ${data.rows.length} rows`);
      data.rows.forEach(r => console.log('  ', JSON.stringify(r)));
    } catch (e) {
      console.log(`${row.table_name}: ERROR - ${e.message}`);
    }
  }

  // 3. Check which templates have actual content (non-empty JSON)
  const nonEmpty = await c.query(`
    SELECT id, name, json::text 
    FROM templates 
    WHERE json IS NOT NULL 
      AND json::text != 'null' 
      AND json::text != '{}'
      AND LENGTH(json::text) > 50
    ORDER BY id
  `);
  console.log('\n=== TEMPLATES WITH CONTENT ===');
  nonEmpty.rows.forEach(r => {
    const json = JSON.parse(r.json);
    const contentLen = json.content ? json.content.length : 0;
    console.log(`ID: ${r.id} | Name: ${r.name} | Content items: ${contentLen}`);
  });

  await c.end();
})();
