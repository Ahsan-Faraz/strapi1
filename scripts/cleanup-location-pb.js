/**
 * Cleanup script: Remove all Page Builder records for locations from the database.
 * - Deletes all rows from locations_location_page_lnk (template-location links)
 * - Deletes orphaned location templates from templates table
 * - Deletes related template component records from templates_cmps
 */

const { Client } = require('pg');

const client = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  port: 5432,
  database: 'postgres',
  user: 'postgres.zezyrfmbigoazutisvia',
  password: 'Ahsanfaraz176!',
  ssl: { rejectUnauthorized: false },
});

async function cleanup() {
  await client.connect();
  console.log('Connected to database');

  try {
    // 1. Find all template IDs linked to locations
    const linkResult = await client.query('SELECT * FROM locations_location_page_lnk');
    console.log(`Found ${linkResult.rows.length} location-template links:`, linkResult.rows);

    const templateIds = linkResult.rows.map(r => r.template_id).filter(Boolean);

    // 2. Delete location-template link records
    const deleteLinks = await client.query('DELETE FROM locations_location_page_lnk');
    console.log(`Deleted ${deleteLinks.rowCount} location-template link records`);

    // 3. Delete related template component records
    if (templateIds.length > 0) {
      const deleteCmps = await client.query(
        'DELETE FROM templates_cmps WHERE entity_id = ANY($1::int[])',
        [templateIds]
      );
      console.log(`Deleted ${deleteCmps.rowCount} template component records`);
    }

    // 4. Delete orphaned location templates
    if (templateIds.length > 0) {
      const deleteTemplates = await client.query(
        'DELETE FROM templates WHERE id = ANY($1::int[])',
        [templateIds]
      );
      console.log(`Deleted ${deleteTemplates.rowCount} orphaned location templates`);
    }

    // 5. Also check locations_cmps for any Page Builder component records
    try {
      const locationCmps = await client.query('SELECT * FROM locations_cmps LIMIT 5');
      console.log(`locations_cmps table has ${locationCmps.rows.length}+ rows`);
    } catch (e) {
      console.log('locations_cmps table does not exist (OK)');
    }

    console.log('\n✅ Location Page Builder cleanup complete!');
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

cleanup();
