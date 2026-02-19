/**
 * Clear Page Builder template content for all page types
 * This forces all pages to fall back to their original hardcoded UI
 * No code is removed — only the template JSON in the database is emptied
 * 
 * Affected templates:
 * - ID 1: Landing Page Layout (4 components)
 * - ID 2: About Page Layout (6 components)
 * - ID 3: Contact Page Layout (1 component)
 * - ID 4: Checklist Page Layout (4 components)
 * - ID 5: FAQ Page Layout (3 components)
 * - ID 6: Routine Service Page Layout (6 components)
 * - IDs 9-20: Other service layouts (already empty, clearing for safety)
 */

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
  console.log('Connected to database.\n');

  // Template IDs to clear
  // 1 = Landing Page, 2 = About, 3 = Contact, 4 = Checklist, 5 = FAQ
  // 6 = Routine Service, 9-20 = Other services
  // 23-25, 27 = Location templates (already orphaned from earlier cleanup)
  const templateIds = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 23, 24, 25, 27];

  // Empty JSON that Page Builder recognizes as "no template"
  const emptyJson = JSON.stringify({ content: [], root: {} });

  console.log('=== BEFORE: Template content lengths ===');
  const before = await c.query(
    `SELECT id, name, LENGTH(json::text) as json_len FROM templates WHERE id = ANY($1) ORDER BY id`,
    [templateIds]
  );
  before.rows.forEach(r => console.log(`  ID ${r.id}: ${r.name} (${r.json_len} chars)`));

  // Clear all template JSON content
  console.log('\n--- Clearing template content ---');
  const result = await c.query(
    `UPDATE templates SET json = $1::jsonb WHERE id = ANY($2)`,
    [emptyJson, templateIds]
  );
  console.log(`Updated ${result.rowCount} templates.`);

  console.log('\n=== AFTER: Template content lengths ===');
  const after = await c.query(
    `SELECT id, name, LENGTH(json::text) as json_len FROM templates WHERE id = ANY($1) ORDER BY id`,
    [templateIds]
  );
  after.rows.forEach(r => console.log(`  ID ${r.id}: ${r.name} (${r.json_len} chars)`));

  // Verify: no templates with substantial content should exist
  const check = await c.query(`
    SELECT id, name, LENGTH(json::text) as json_len 
    FROM templates 
    WHERE LENGTH(json::text) > 50 
    ORDER BY id
  `);
  if (check.rows.length === 0) {
    console.log('\n✅ SUCCESS: All templates cleared. All pages will now use their original fallback UI.');
  } else {
    console.log('\n⚠️  WARNING: Some templates still have content:');
    check.rows.forEach(r => console.log(`  ID ${r.id}: ${r.name} (${r.json_len} chars)`));
  }

  await c.end();
})();
