/**
 * Fix Location Slugs in Supabase PostgreSQL
 * 
 * Changes:
 * 1. Update 6 location slugs from "x-county" → "x"
 * 2. Delete 4 extra locations (Middlesex, Monmouth, Somerset, Ocean)
 * 
 * Run with: node scripts/fix-location-slugs.js
 */

const { Client } = require('pg');

const client = new Client({
  host: 'aws-1-ap-south-1.pooler.supabase.com',
  database: 'postgres',
  user: 'postgres.zezyrfmbigoazutisvia',
  password: 'Ahsanfaraz176!',
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

async function main() {
  try {
    await client.connect();
    console.log('✅ Connected to Supabase PostgreSQL\n');

    // First, let's see what tables exist for locations
    const tablesResult = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name LIKE '%location%'
      ORDER BY table_name;
    `);
    console.log('📋 Location-related tables:');
    tablesResult.rows.forEach(r => console.log(`   - ${r.table_name}`));
    console.log('');

    // Check current locations
    const currentLocations = await client.query(`
      SELECT id, document_id, slug, name, county FROM locations ORDER BY id;
    `);
    console.log('📍 Current locations in database:');
    currentLocations.rows.forEach(r => {
      console.log(`   ID: ${r.id} | DocID: ${r.document_id} | Slug: ${r.slug} | Name: ${r.name} | County: ${r.county}`);
    });
    console.log('');

    // ==========================================
    // STEP 1: Update slugs for 6 locations
    // ==========================================
    const slugUpdates = [
      { old: 'bergen-county', new: 'bergen' },
      { old: 'essex-county', new: 'essex' },
      { old: 'hudson-county', new: 'hudson' },
      { old: 'passaic-county', new: 'passaic' },
      { old: 'union-county', new: 'union' },
      { old: 'morris-county', new: 'morris' },
    ];

    console.log('🔄 Updating slugs...');
    for (const update of slugUpdates) {
      const result = await client.query(
        `UPDATE locations SET slug = $1 WHERE slug = $2 RETURNING id, slug, name;`,
        [update.new, update.old]
      );
      if (result.rowCount > 0) {
        console.log(`   ✅ ${update.old} → ${update.new} (${result.rowCount} row(s))`);
      } else {
        // Maybe already has the short slug
        const check = await client.query(`SELECT id, slug FROM locations WHERE slug = $1`, [update.new]);
        if (check.rowCount > 0) {
          console.log(`   ⏭️  ${update.new} already exists (no change needed)`);
        } else {
          console.log(`   ⚠️  ${update.old} not found in database`);
        }
      }
    }
    console.log('');

    // ==========================================
    // STEP 2: Delete 4 extra locations
    // ==========================================
    const slugsToDelete = ['middlesex-county', 'middlesex', 'monmouth-county', 'monmouth', 'somerset-county', 'somerset', 'ocean-county', 'ocean'];

    console.log('🗑️  Deleting extra locations...');
    
    // First, find the IDs and document_ids of locations to delete
    const toDelete = await client.query(
      `SELECT id, document_id, slug, name FROM locations WHERE slug = ANY($1);`,
      [slugsToDelete]
    );

    if (toDelete.rows.length === 0) {
      console.log('   No extra locations found to delete.');
    } else {
      for (const row of toDelete.rows) {
        console.log(`   Deleting: ${row.name} (slug: ${row.slug}, id: ${row.id}, doc: ${row.document_id})`);
        
        // Delete related records in join/component tables first
        // Operating hours components
        try {
          await client.query(`DELETE FROM locations_components WHERE entity_id = $1;`, [row.id]);
        } catch (e) {
          // Table might not exist or different structure
        }
        
        // Delete from any localizations link table
        try {
          await client.query(`DELETE FROM locations_localizations_lnk WHERE location_id = $1;`, [row.id]);
        } catch (e) {}
        
        // Delete Page Builder template link
        try {
          await client.query(`DELETE FROM locations_location_page_lnk WHERE location_id = $1;`, [row.id]);
        } catch (e) {}

        // Delete the location itself
        await client.query(`DELETE FROM locations WHERE id = $1;`, [row.id]);
        console.log(`   ✅ Deleted: ${row.name}`);
      }
    }
    console.log('');

    // ==========================================
    // VERIFY
    // ==========================================
    const finalLocations = await client.query(`
      SELECT id, document_id, slug, name, county FROM locations ORDER BY id;
    `);
    console.log('📍 Final locations in database:');
    finalLocations.rows.forEach(r => {
      console.log(`   ID: ${r.id} | Slug: ${r.slug} | Name: ${r.name} | County: ${r.county}`);
    });
    console.log(`\n✅ Total: ${finalLocations.rows.length} locations\n`);

    console.log('🎉 Done! Changes are now reflected in Strapi CMS and Page Builder.');
    console.log('   Refresh your Strapi admin panel to see the updated locations.');

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error(error);
  } finally {
    await client.end();
  }
}

main();
