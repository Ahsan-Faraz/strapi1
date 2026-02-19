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

  // Check which locations have Page Builder templates linked
  console.log('--- Location → Page Builder links ---');
  const links = await client.query(`
    SELECT l.id as loc_id, l.slug, l.name, lnk.template_id
    FROM locations l
    LEFT JOIN locations_location_page_lnk lnk ON l.id = lnk.location_id
    ORDER BY l.slug, l.id
  `);
  links.rows.forEach(r => {
    const pbStatus = r.template_id ? `Template ID: ${r.template_id}` : 'NO template';
    console.log(`  ${r.slug} (ID ${r.loc_id}) → ${pbStatus}`);
  });

  // Check the templates table
  console.log('\n--- Page Builder templates ---');
  const templates = await client.query(`
    SELECT id, document_id, 
           CASE WHEN json IS NOT NULL THEN 'has JSON' ELSE 'no JSON' END as json_status,
           LENGTH(json::text) as json_size
    FROM pb_templates
    ORDER BY id
  `);
  templates.rows.forEach(r => {
    console.log(`  Template ID ${r.id} | DocID: ${r.document_id} | ${r.json_status} | Size: ${r.json_size} chars`);
  });

  // For templates linked to locations, show the JSON content structure
  console.log('\n--- Templates linked to locations (content overview) ---');
  const linkedTemplates = await client.query(`
    SELECT l.slug, l.name, lnk.template_id, t.json
    FROM locations_location_page_lnk lnk
    JOIN locations l ON l.id = lnk.location_id
    JOIN pb_templates t ON t.id = lnk.template_id
    ORDER BY l.slug
  `);
  
  for (const r of linkedTemplates.rows) {
    console.log(`\n  ${r.slug} (${r.name}) → Template ${r.template_id}:`);
    try {
      const json = typeof r.json === 'string' ? JSON.parse(r.json) : r.json;
      if (json && json.content) {
        console.log(`    Components (${json.content.length}):`);
        json.content.forEach((c, i) => {
          console.log(`      ${i+1}. ${c.type} ${JSON.stringify(Object.keys(c.props || {})).substring(0, 80)}`);
        });
      } else {
        console.log(`    JSON structure: ${JSON.stringify(Object.keys(json || {}))}`);
      }
    } catch(e) {
      console.log(`    Could not parse JSON: ${e.message}`);
    }
  }

  await client.end();
})();
