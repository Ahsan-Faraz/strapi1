/**
 * Seed Landing Page Data via Strapi Admin API
 * 
 * This script uses the content-manager admin API to create/update the landing page.
 * You need to provide admin credentials.
 * 
 * Usage: 
 *   set STRAPI_ADMIN_EMAIL=your-email@example.com
 *   set STRAPI_ADMIN_PASSWORD=your-password
 *   node scripts/seed-via-admin.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-8d56.up.railway.app';
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD;

const landingPageData = {
  // Hero Section
  heroTopLabel: "Professional Cleaning Services",
  heroHeading: "Professional cleaning for your home",
  heroSubheading: "We make it easy to get your home cleaned. Professional cleaning services tailored to your needs.",
  heroButtonText: "See my price",
  heroButtonLink: "/booking",
  heroFeature1: "30-second pricing",
  heroFeature2: "100% Satisfaction guaranteed",
  
  // How It Works Section
  howItWorksHeading: "How It Works",
  step1Title: "Order online",
  step1Description: "Our easy online pricing lets you set up a cleaning plan right now. See your price and get scheduled today.",
  step1FeatureText: "Takes less than 30 seconds",
  step2Title: "We clean your home",
  step2Description: "Our professional team arrives on time and cleans your home according to our 50-point checklist.",
  step2FeatureText: "Trained and background-checked professionals",
  step3Title: "Enjoy your clean home",
  step3Description: "Relax in your freshly cleaned space. We'll be back on your schedule - weekly, bi-weekly, or monthly.",
  step3FeatureText: "Flexible scheduling to fit your lifestyle",
  howItWorksButtonText: "Book Now",
  
  // Checklist Section
  checklistHeading: "Our 50-Point Cleaning Checklist",
  checklistDescription: "We don't miss a spot. Here's our comprehensive cleaning checklist for every room in your home.",
  checklistButtonText: "View Full Checklist",
  checklistItems: {
    routine: {
      living: ["Sweep, Vacuum, & Mop Floors", "Upholstered furniture vacuumed", "Dust all surfaces and decor", "Dust electronics and TV stands", "Fluff and straighten couch cushions & pillows", "Clean mirrors and glass surfaces", "Light (5 minutes) Organization of room", "Trash emptied"],
      kitchen: ["Sweep, Vacuum, & Mop Floors", "Wipe down countertops", "Wipe down Stove Top", "Clean exterior of appliances", "Sinks scrubbed and disinfected", "Wipe exterior of cabinets and handles", "Clean Stove Top", "Trash emptied"],
      bathroom: ["Sweep, Vacuum, & Mop Floors", "Scrub and sanitize showers and tubs", "Clean and disinfect toilets", "Scrub and disinfect sink and countertops", "Chrome fixtures cleaned and shined", "Clean mirrors", "Towels neatly hung and folded", "Trash Emptied"],
      bedroom: ["Sweep, Vacuum, & Mop Floors", "Beds made, linens changed (if linens are left on bed)", "Dust bedroom shelving, night stand, & bed frame", "Picture frames dusted", "Mirrors Cleaned", "Light (5 minutes) Organization of room", "Ensure overall room looks neat, tidy, and hotel-fresh", "Trash Emptied"]
    },
    deep: {
      living: ["Everything in routine +", "Vacuum inside couch cushions (if removable)", "Ceiling fans and light fixtures dusted", "Remove cobwebs from corners and ceilings", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Behind/under furniture", "Window Sills"],
      kitchen: ["Everything in routine +", "Clean inside microwave", "Kitchen Backsplash", "Degrease Stovetop", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Tables, chairs, & behind/under furniture", "Window Sills"],
      bathroom: ["Everything in routine +", "Remove hard water stains (where possible)", "Scrub grout lines (moderate scrubbing)", "Ceiling fans and light fixtures dusted", "Dust vent covers and ceiling corners", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Window Sills"],
      bedroom: ["Everything in routine +", "Ceiling fans and light fixtures dusted", "Remove cobwebs from corners and ceilings", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Behind/under furniture", "Window Sills", "Inside closets (upon request)"]
    },
    moving: {
      living: ["Everything in deep +", "Inside all cabinets and drawers", "Clean inside closets", "Wipe down all shelving", "Clean inside windows", "Remove all marks from walls", "Deep clean all flooring", "Final walkthrough inspection"],
      kitchen: ["Everything in deep +", "Inside all cabinets and drawers", "Inside oven", "Inside refrigerator", "Inside dishwasher", "Behind and under appliances", "Deep clean all flooring", "Final walkthrough inspection"],
      bathroom: ["Everything in deep +", "Inside all cabinets and drawers", "Deep clean grout and tile", "Remove all soap scum buildup", "Clean behind toilet", "Polish all fixtures", "Deep clean all flooring", "Final walkthrough inspection"],
      bedroom: ["Everything in deep +", "Inside all closets", "Inside all drawers", "Clean inside windows", "Remove all marks from walls", "Deep clean all flooring", "Wipe down all shelving", "Final walkthrough inspection"]
    }
  },
  
  // Comparison Section
  comparisonHeading: "The Clensy <blue>Difference</blue>",
  comparisonDescription: "We're leading the cleaning industry in customer satisfaction and service quality. Try Clensy and see why cleaning is a big deal to us.",
  comparisonButtonText: "Book Now",
  comparisonFeatures: [
    { name: "Locally Owned and Operated", clensy: true, others: true, icon: "users" },
    { name: "Customized Cleaning Packages", clensy: true, others: true, icon: "settings" },
    { name: "Easy Online Booking", clensy: true, others: false, icon: "calendar" },
    { name: "Over The Phone Estimates", clensy: true, others: false, icon: "phone" },
    { name: "Bonded and Insured", clensy: true, others: false, icon: "shield-check" },
    { name: "Eco-Friendly Supplies Included", clensy: true, others: false, icon: "leaf" },
    { name: "Background Checked Cleaners", clensy: true, others: false, icon: "user-check" },
    { name: "PRO Clean Promise", clensy: true, others: false, icon: "medal" },
    { name: "Premium Cleaning Supplies", clensy: true, others: false, icon: "sparkles" }
  ],
  
  // Reviews Section
  reviewsHeading: "What People Are <blue>Saying About Us</blue>",
  reviewsButtonText: "Load More",
  testimonials: [
    { name: "Sarah Johnson", title: "1 day ago", text: "Monica was excellent. Went beyond in helping me. My sheets and comforter were not just washed but perfectly folded. Everything was spotless!", rating: 5, initial: "S", initialColor: "#9C27B0" },
    { name: "Michael Chen", title: "3 days ago", text: "Clensy does the best job taking care of our house. Bailey recently cleaned our home and did an amazing job. Very thorough and professional.", rating: 5, initial: "M", initialColor: "#4CAF50" },
    { name: "Emily Rodriguez", title: "1 week ago", text: "Arrived as planned! Great job! Everything polished. Baseboards done. Kitchen and bathroom spotless. Will definitely book again.", rating: 5, initial: "E", initialColor: "#E91E63" },
    { name: "David Thompson", title: "2 weeks ago", text: "My house was cleaned by Clensy today. Susan did a great job. I asked them to pay special attention to the kitchen and they delivered.", rating: 5, initial: "D", initialColor: "#FF5722" },
    { name: "Jennifer Lee", title: "1 month ago", text: "The team did a great job cleaning! They were professional, polite and very thorough. I'm so happy with the results!", rating: 5, initial: "J", initialColor: "#2196F3" },
    { name: "Robert Garcia", title: "2 months ago", text: "Awesome job by Rashida! Consistently excellent work! Keep it up! My home has never looked better.", rating: 5, initial: "R", initialColor: "#673AB7" },
    { name: "Maxine Patel", title: "3 months ago", text: "Maxine was terrific! Worked fast and accurate. Looking forward to her again!!!", rating: 5, initial: "P", initialColor: "#3F51B5" },
    { name: "Brandon Smith", title: "4 months ago", text: "Techs are so friendly and very efficient. You will not regret one single second!", rating: 5, initial: "B", initialColor: "#4CAF50" }
  ],
  
  // CTA Section
  ctaHeading: "Home cleaning you can trust",
  ctaDescription: "Book our professional cleaning services today and experience the difference.",
  ctaLeftCardTitle: "Order online",
  ctaLeftCardDescription: "Our easy online pricing lets you set up a cleaning plan right now.",
  ctaLeftCardButtonText: "See my price",
  ctaRightCardTitle: "Call us now",
  ctaRightCardDescription: "Need more information? Prefer a friendly voice over the phone?",
  ctaRightCardButtonText: "(551) 305-4081"
};

async function loginAdmin() {
  console.log('🔐 Logging in to Strapi admin...');
  
  const response = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD
    })
  });
  
  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }
  
  const data = await response.json();
  return data.data.token;
}

async function seedLandingPage() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log('❌ Missing admin credentials!');
    console.log('\nPlease set environment variables:');
    console.log('  set STRAPI_ADMIN_EMAIL=your-email@example.com');
    console.log('  set STRAPI_ADMIN_PASSWORD=your-password');
    console.log('\nOr manually enter the data in Strapi admin:');
    console.log(`  ${STRAPI_URL}/admin`);
    console.log('\n📋 Here is the data to enter:\n');
    console.log(JSON.stringify(landingPageData, null, 2));
    return;
  }
  
  console.log('🚀 Starting Landing Page seed via Admin API...');
  console.log(`📡 Strapi URL: ${STRAPI_URL}`);
  
  try {
    const token = await loginAdmin();
    console.log('✅ Logged in successfully!');
    
    // Get existing landing page
    console.log('\n📋 Checking existing landing page...');
    const getResponse = await fetch(`${STRAPI_URL}/content-manager/single-types/api::landing-page.landing-page`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    const existing = await getResponse.json();
    console.log('Existing:', existing.id ? 'Found' : 'Not found');
    
    // Update/Create landing page
    console.log('\n📝 Saving Landing Page content...');
    const saveResponse = await fetch(`${STRAPI_URL}/content-manager/single-types/api::landing-page.landing-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(landingPageData)
    });
    
    if (!saveResponse.ok) {
      const error = await saveResponse.text();
      throw new Error(`Save failed: ${error}`);
    }
    
    const result = await saveResponse.json();
    console.log('✅ Landing Page saved!');
    
    // Publish
    console.log('\n📢 Publishing...');
    const publishResponse = await fetch(`${STRAPI_URL}/content-manager/single-types/api::landing-page.landing-page/actions/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (publishResponse.ok) {
      console.log('✅ Published!');
    } else {
      console.log('⚠️ Could not auto-publish. Please publish manually.');
    }
    
    console.log('\n🎉 Done! Your landing page data is now in Strapi.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

seedLandingPage();
