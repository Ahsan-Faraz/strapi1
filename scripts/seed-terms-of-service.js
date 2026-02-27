/**
 * Seed Terms of Service into Strapi via REST API
 *
 * Run: npm run seed:terms
 * Requires: Strapi running (npm run dev) + API token with update permission
 *
 * Setup API Token in Strapi:
 * 1. Admin → Settings → API Tokens (or Global settings → API Tokens)
 * 2. Create token with "Full access" OR Custom: find + update for Terms of Service
 * 3. Add STRAPI_API_TOKEN to strapi1/.env
 */

const path = require('path');
const fs = require('fs');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const API_PREFIX = process.env.STRAPI_API_PREFIX || 'admin/api';

const termsOfServiceData = {
  seoTitle: "Terms of Service | Clensy Cleaning Services",
  seoMetaDescription: "Read Clensy's terms of service. Understand the terms and conditions for using our professional cleaning services.",
  seoKeywords: "terms of service, terms and conditions, cleaning service terms, Clensy terms",
  seoCanonicalUrl: "https://clensy.com/terms-of-service",
  seoRobots: "index, follow",
  ogTitle: "Terms of Service | Clensy",
  ogDescription: "Terms and conditions for using Clensy cleaning services.",
  ogType: "website",
  twitterCard: "summary",
  heroHeading: "Terms & Conditions",
  heroDescription: "Please read these terms and conditions carefully before using our services",
  websiteUrl: "clensy.com",
  companyEmail: "info@clensy.com",
  companyPhone: "(551) 305-4081",
  lastUpdated: "February 2025",
  agreementDescription: "By booking any service with Clensy LLC (\"Clensy Cleaning\"), either through our website, over the phone, or by email/text, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, do not proceed with booking a service.",
  sections: [],
};

const termsJsonPath = path.join(__dirname, '../src/data/terms-sections.json');
if (fs.existsSync(termsJsonPath)) {
  termsOfServiceData.sections = JSON.parse(fs.readFileSync(termsJsonPath, 'utf-8'));
}

async function run() {
  console.log('🔐 Seeding Terms of Service...');
  console.log(`   Target: ${STRAPI_URL}/${API_PREFIX}/terms-of-service\n`);

  if (!STRAPI_API_TOKEN) {
    console.error('❌ STRAPI_API_TOKEN is required. Add it to strapi1/.env');
    console.log('\n📋 To create an API Token:');
    console.log('   1. Open Strapi Admin → Settings → API Tokens');
    console.log('   2. Create new token with "Full access" (or Custom: find+update for Terms of Service)');
    console.log('   3. Add STRAPI_API_TOKEN=your-token to strapi1/.env\n');
    process.exit(1);
  }

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${STRAPI_API_TOKEN}` };
  const res = await fetch(`${STRAPI_URL}/${API_PREFIX}/terms-of-service`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: termsOfServiceData }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('❌ Failed:', err);
    if (res.status === 403 || res.status === 500) {
      console.log('\n💡 Token may lack "update" permission. In Strapi Admin:');
      console.log('   Settings → API Tokens → Edit your token → Enable "update" for Terms of Service\n');
    }
    process.exit(1);
  }

  console.log('✅ Terms of Service seeded! (' + termsOfServiceData.sections.length + ' sections)\n');
}

run().catch((e) => { console.error(e); process.exit(1); });
