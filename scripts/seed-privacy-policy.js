/**
 * Seed Privacy Policy into Strapi
 * 
 * Run with: node scripts/seed-privacy-policy.js
 * 
 * For local dev: STRAPI_URL defaults to http://localhost:1337 (Strapi must be running)
 * For production: set STRAPI_URL and STRAPI_API_TOKEN env vars
 */

const path = require('path');
const fs = require('fs');

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
// Match config/api.ts rest.prefix: '/admin/api'
const API_PREFIX = process.env.STRAPI_API_PREFIX || 'admin/api';

let privacyPolicyData = {
  // SEO Fields
  seoTitle: "Privacy Policy | Clensy Cleaning Services",
  seoMetaDescription: "Your privacy is important to us. Learn how we collect, use, and protect your information.",
  seoKeywords: "privacy policy, data protection, personal information, Clensy privacy, cleaning service privacy",
  seoCanonicalUrl: "https://clensy.com/privacy-policy",
  seoRobots: "index, follow",
  ogTitle: "Privacy Policy | Clensy Cleaning",
  ogDescription: "Your privacy is important to us. Learn how we collect, use, and protect your information.",
  ogType: "website",
  twitterCard: "summary",
  
  // Hero Section
  heroHeading: "Clensy Cleaning Privacy Policy",
  heroDescription: "Your privacy is important to us. Learn how we collect, use, and protect your information.",
  
  // Company Info
  websiteUrl: "clensycleaning.com",
  companyEmail: "Info@clensycleaning.com",
  companyPhone: "(551) 305-4081",
  lastUpdated: "February 2025",
  
  // SMS Consent (matches section content)
  smsConsentDescription: "By providing your phone number to Clensy Cleaning, you are consenting to receive SMS messages related to the services you've requested, such as appointment reminders, service confirmations, and promotions. Your SMS consent will not be shared with third parties for marketing purposes.",
  smsOptOutInstructions: "You can opt-out at any time by replying \"STOP\" to any SMS message. For help, reply HELP or contact Info@clensycleaning.com.",
  
  // Sections - loaded from src/data/privacy-sections.json
  sections: [],
};

// Load sections from src/data/privacy-sections.json
const privacyJsonPath = path.join(__dirname, '../src/data/privacy-sections.json');
if (fs.existsSync(privacyJsonPath)) {
  privacyPolicyData.sections = JSON.parse(fs.readFileSync(privacyJsonPath, 'utf-8'));
} else {
  console.warn('⚠️ privacy-sections.json not found');
}

async function seedPrivacyPolicy() {
  console.log('🔐 Seeding Privacy Policy...');
  console.log(`   Target: ${STRAPI_URL}/${API_PREFIX}/privacy-policy\n`);
  
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (STRAPI_API_TOKEN) headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;

    const response = await fetch(`${STRAPI_URL}/${API_PREFIX}/privacy-policy`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: privacyPolicyData }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to seed Privacy Policy:', error);
      if (STRAPI_URL.includes('localhost')) {
        console.log('\n💡 Make sure Strapi is running: cd strapi1 && npm run develop');
      }
      return;
    }
    
    console.log('✅ Privacy Policy seeded successfully! (' + privacyPolicyData.sections.length + ' sections)\n');
    
    console.log('📋 Next steps:');
    console.log('1. Go to Strapi Admin → Content Manager → Privacy Policy');
    console.log('2. Click "Publish" if draft\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (STRAPI_URL.includes('localhost')) {
      console.log('\n💡 For local dev: Start Strapi first (npm run develop), then run this script.');
    }
  }
}

seedPrivacyPolicy();
