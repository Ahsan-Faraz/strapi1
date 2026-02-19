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

  // Check all service-to-template links + template content
  const r = await c.query(`
    SELECT s.id as service_id, s.name, s.slug, 
           t.id as template_id, t.name as template_name, 
           LENGTH(t.json::text) as json_len, t.json::text as json_text
    FROM services_service_page_lnk lnk
    JOIN services s ON s.id = lnk.service_id
    JOIN templates t ON t.id = lnk.template_id
    ORDER BY s.name
  `);

  console.log('=== ALL SERVICE -> TEMPLATE LINKS ===');
  r.rows.forEach(row => {
    const json = JSON.parse(row.json_text);
    const contentLen = json.content ? json.content.length : 'no content key';
    console.log(`Service: ${row.name} (id:${row.service_id}, slug:${row.slug}) -> Template: ${row.template_name} (id:${row.template_id}) | content items: ${contentLen}`);
  });

  // Also check if any templates still have content
  const check = await c.query(`
    SELECT id, name, json::text
    FROM templates
    WHERE id IN (SELECT template_id FROM services_service_page_lnk)
  `);
  console.log('\n=== SERVICE TEMPLATE STATUS ===');
  check.rows.forEach(row => {
    const json = JSON.parse(row.json);
    console.log(`Template ${row.id} (${row.name}): content=${JSON.stringify(json.content)}, cleared=${json.content && json.content.length === 0 ? 'YES' : 'NO'}`);
  });

  await c.end();
})();
