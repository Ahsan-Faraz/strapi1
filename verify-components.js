/**
 * Quick verification script to check if all schema components are properly set up
 * Run: node verify-components.js
 */

const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src/components/shared');

console.log('🔍 Verifying Strapi Schema Components...\n');

// Expected components
const expectedComponents = [
  'local-business-schema.json',
  'service-schema.json',
  'faq-page-schema.json',
  'review-schema.json',
  'postal-address.json',
  'geo-coordinates.json',
  'aggregate-rating.json',
  'organization.json',
  'offer.json',
  'faq-item.json',
  'rating.json',
  'person.json',
  'schema-template.json'
];

let allGood = true;

// Check if all component files exist
console.log('📁 Checking component files...');
expectedComponents.forEach(component => {
  const filePath = path.join(componentsDir, component);
  if (fs.existsSync(filePath)) {
    try {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      console.log(`  ✅ ${component} - Valid JSON`);
    } catch (error) {
      console.log(`  ❌ ${component} - Invalid JSON: ${error.message}`);
      allGood = false;
    }
  } else {
    console.log(`  ❌ ${component} - File not found`);
    allGood = false;
  }
});

// Check schema-template.json references
console.log('\n🔗 Checking component references in schema-template.json...');
const schemaTemplatePath = path.join(componentsDir, 'schema-template.json');
if (fs.existsSync(schemaTemplatePath)) {
  try {
    const schemaTemplate = JSON.parse(fs.readFileSync(schemaTemplatePath, 'utf8'));
    const requiredRefs = [
      'shared.local-business-schema',
      'shared.service-schema',
      'shared.faq-page-schema',
      'shared.review-schema'
    ];
    
    requiredRefs.forEach(ref => {
      const found = JSON.stringify(schemaTemplate).includes(`"${ref}"`);
      if (found) {
        console.log(`  ✅ Reference found: ${ref}`);
      } else {
        console.log(`  ❌ Reference missing: ${ref}`);
        allGood = false;
      }
    });
  } catch (error) {
    console.log(`  ❌ Error reading schema-template.json: ${error.message}`);
    allGood = false;
  }
}

// Check if content types use schema-template
console.log('\n📋 Checking content types...');
const serviceSchemaPath = path.join(__dirname, 'src/api/service/content-types/service/schema.json');
const locationSchemaPath = path.join(__dirname, 'src/api/location/content-types/location/schema.json');

[serviceSchemaPath, locationSchemaPath].forEach(schemaPath => {
  const typeName = path.basename(path.dirname(path.dirname(schemaPath)));
  if (fs.existsSync(schemaPath)) {
    try {
      const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
      const hasSchema = JSON.stringify(schema).includes('shared.schema-template');
      if (hasSchema) {
        console.log(`  ✅ ${typeName} - Uses schema-template`);
      } else {
        console.log(`  ⚠️  ${typeName} - Does not use schema-template`);
      }
    } catch (error) {
      console.log(`  ❌ ${typeName} - Error reading schema: ${error.message}`);
    }
  }
});

console.log('\n' + '='.repeat(50));
if (allGood) {
  console.log('✅ All components verified! Ready to use.');
  console.log('\n📝 Next steps:');
  console.log('   1. Start Strapi: npm run develop');
  console.log('   2. Check admin panel → Content-Type Builder → Components');
  console.log('   3. Test in Content Manager → Service/Location → Schema field');
} else {
  console.log('❌ Some issues found. Please fix them before using.');
}
console.log('='.repeat(50));


