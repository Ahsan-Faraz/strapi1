/**
 * Seed Privacy Policy into Strapi via REST API
 *
 * Run: npm run seed:privacy
 * Requires: Strapi running (npm run dev) + API token with update permission
 *
 * Setup API Token in Strapi:
 * 1. Admin → Settings → API Tokens (or Global settings → API Tokens)
 * 2. Create token with "Full access" OR Custom: find + update for Privacy Policy
 * 3. Add STRAPI_API_TOKEN to strapi1/.env
 */

const path = require('path');
const fs = require('fs');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const API_PREFIX = process.env.STRAPI_API_PREFIX || 'admin/api';

let privacyPolicyData = {
  seoTitle: "Privacy Policy | Clensy Cleaning Services",
  seoMetaDescription: "Your privacy is important to us. Learn how we collect, use, and protect your information.",
  seoKeywords: "privacy policy, data protection, personal information, Clensy privacy, cleaning service privacy",
  seoCanonicalUrl: "https://clensy.com/privacy-policy",
  seoRobots: "index, follow",
  ogTitle: "Privacy Policy | Clensy Cleaning",
  ogDescription: "Your privacy is important to us. Learn how we collect, use, and protect your information.",
  ogType: "website",
  twitterCard: "summary",
  heroHeading: "Clensy Cleaning Privacy Policy",
  heroDescription: "Your privacy is important to us. Learn how we collect, use, and protect your information.",
  websiteUrl: "clensycleaning.com",
  companyEmail: "Info@clensycleaning.com",
  companyPhone: "(551) 305-4081",
  lastUpdated: "February 2025",
  smsConsentDescription: "By providing your phone number to Clensy Cleaning, you are consenting to receive SMS messages related to the services you've requested, such as appointment reminders, service confirmations, and promotions. Your SMS consent will not be shared with third parties for marketing purposes.",
  smsOptOutInstructions: "You can opt-out at any time by replying \"STOP\" to any SMS message. For help, reply HELP or contact Info@clensycleaning.com.",
  sections: [],
};

const privacyJsonPath = path.join(__dirname, '../src/data/privacy-sections.json');
if (fs.existsSync(privacyJsonPath)) {
  privacyPolicyData.sections = JSON.parse(fs.readFileSync(privacyJsonPath, 'utf-8'));
}

async function run() {
  console.log('🔐 Seeding Privacy Policy...');
  console.log(`   Target: ${STRAPI_URL}/${API_PREFIX}/privacy-policy\n`);

  if (!STRAPI_API_TOKEN) {
    console.error('❌ STRAPI_API_TOKEN is required. Add it to strapi1/.env');
    console.log('\n📋 To create an API Token:');
    console.log('   1. Open Strapi Admin → Settings → API Tokens');
    console.log('   2. Create new token with "Full access" (or Custom: find+update for Privacy Policy)');
    console.log('   3. Add STRAPI_API_TOKEN=your-token to strapi1/.env\n');
    process.exit(1);
  }

  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${STRAPI_API_TOKEN}` };
  const res = await fetch(`${STRAPI_URL}/${API_PREFIX}/privacy-policy`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ data: privacyPolicyData }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('❌ Failed:', err);
    if (res.status === 403 || res.status === 500) {
      console.log('\n💡 Token may lack "update" permission. In Strapi Admin:');
      console.log('   Settings → API Tokens → Edit your token → Enable "update" for Privacy Policy\n');
    }
    process.exit(1);
  }

  console.log('✅ Privacy Policy seeded! (' + privacyPolicyData.sections.length + ' sections)\n');
}

run().catch((e) => { console.error(e); process.exit(1); });
