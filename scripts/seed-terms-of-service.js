/**
 * Seed Terms of Service into Strapi
 * 
 * Run with: node scripts/seed-terms-of-service.js
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

// Load sections from src/data/terms-sections.json
const termsJsonPath = path.join(__dirname, '../src/data/terms-sections.json');
if (fs.existsSync(termsJsonPath)) {
  termsOfServiceData.sections = JSON.parse(fs.readFileSync(termsJsonPath, 'utf-8'));
} else {
  console.warn('⚠️ terms-sections.json not found, using minimal fallback');
  termsOfServiceData.sections = [
    { title: "1. Booking Confirmation", content: "Appointments are not confirmed until you receive written or verbal confirmation from a Clensy representative.", order: 1 },
  ];
}

async function seedTermsOfService() {
  console.log('🔐 Seeding Terms of Service...');
  console.log(`   Target: ${STRAPI_URL}/${API_PREFIX}/terms-of-service\n`);
  
  try {
    const headers = {
      'Content-Type': 'application/json',
    };
    if (STRAPI_API_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(`${STRAPI_URL}/${API_PREFIX}/terms-of-service`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ data: termsOfServiceData }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to seed Terms of Service:', error);
      if (STRAPI_URL.includes('localhost')) {
        console.log('\n💡 Make sure Strapi is running: cd strapi1 && npm run develop');
      }
      return;
    }
    
    console.log('✅ Terms of Service seeded successfully! (' + termsOfServiceData.sections.length + ' sections)\n');
    
    console.log('📋 Next steps:');
    console.log('1. Go to Strapi Admin → Content Manager → Terms of Service');
    console.log('2. Click "Publish" if draft\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (STRAPI_URL.includes('localhost')) {
      console.log('\n💡 For local dev: Start Strapi first (npm run develop), then run this script.');
    }
  }
}

seedTermsOfService();
