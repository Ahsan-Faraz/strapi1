/**
 * Production Migration Script
 * 
 * Migrates data from MongoDB to production Strapi (PostgreSQL)
 * 
 * Usage:
 * 1. Set environment variables:
 *    - MONGODB_URI: Your MongoDB connection string
 *    - STRAPI_URL: Your production Strapi URL
 *    - STRAPI_API_TOKEN: Your production Strapi API token
 * 2. Run: node scripts/migrate-to-production.js
 */

const mongoose = require('mongoose');

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clensy';
const STRAPI_URL = process.env.STRAPI_URL || 'https://your-strapi-app.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

if (!STRAPI_API_TOKEN) {
  console.error('❌ Error: STRAPI_API_TOKEN is required');
  console.log('Get your token from Strapi Admin → Settings → API Tokens');
  process.exit(1);
}

// Use the same migration logic as local migration
// Import from migrate-from-mongodb.js or copy the functions here
console.log('🚀 Production Migration Script');
console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@'));
console.log('Strapi URL:', STRAPI_URL);
console.log('API Token:', STRAPI_API_TOKEN ? '✅ Provided' : '❌ Missing');

console.log('\n📋 Note: This script uses the same migration logic as local migration.');
console.log('Run the local migration script with production URLs:');
console.log('  MONGODB_URI="your-mongo-uri" STRAPI_URL="https://your-strapi.railway.app" STRAPI_API_TOKEN="your-token" node scripts/migrate-from-mongodb.js');



