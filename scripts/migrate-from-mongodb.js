/**
 * Migration Script: MongoDB to Strapi v5
 * Fixed version with correct API endpoints
 */

const mongoose = require('mongoose');

// Configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clensy';
const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

// Helper to make Strapi API requests
async function strapiRequest(endpoint, method = 'GET', data = null) {
  const url = `${STRAPI_URL}/api${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(STRAPI_API_TOKEN && { 'Authorization': `Bearer ${STRAPI_API_TOKEN}` }),
    },
  };
  
  if (data) {
    options.body = JSON.stringify({ data });
  }
  
  try {
    const response = await fetch(url, options);
    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch {
      result = { error: text };
    }
    
    if (!response.ok) {
      console.error(`  ❌ Error at ${endpoint} (${response.status}):`, JSON.stringify(result.error || result, null, 2));
      return null;
    }
    
    return result;
  } catch (error) {
    console.error(`  ❌ Request failed for ${endpoint}:`, error.message);
    return null;
  }
}

// MongoDB Schema Definitions
const HeroSectionSchema = new mongoose.Schema({}, { strict: false });
const FAQSchema = new mongoose.Schema({}, { strict: false });
const AboutSchema = new mongoose.Schema({}, { strict: false });
const CTASchema = new mongoose.Schema({}, { strict: false });
const ReviewsSchema = new mongoose.Schema({}, { strict: false });
const ServiceSchema = new mongoose.Schema({}, { strict: false });
const LocationSchema = new mongoose.Schema({}, { strict: false });
const ComparisonSchema = new mongoose.Schema({}, { strict: false });
const HowItWorksSchema = new mongoose.Schema({}, { strict: false });
const ChecklistSchema = new mongoose.Schema({}, { strict: false });
const CareersSchema = new mongoose.Schema({}, { strict: false });
const ContactSchema = new mongoose.Schema({}, { strict: false });
const PrivacyPolicySchema = new mongoose.Schema({}, { strict: false });
const TermsOfServiceSchema = new mongoose.Schema({}, { strict: false });

// Migration Functions
async function migrateHeroSection() {
  console.log('\n📦 Migrating Hero Section...');
  
  const HeroSection = mongoose.models.HeroSection || mongoose.model('HeroSection', HeroSectionSchema);
  const heroData = await HeroSection.findOne();
  
  if (!heroData) {
    console.log('  ⚠️ No hero section data found in MongoDB');
    return;
  }
  
  const strapiData = {
    topLabel: heroData.topLabel || 'Professional Cleaning Services',
    heading: heroData.heading || 'Professional cleaning for your home',
    subheading: heroData.subheading || '',
    buttonText: heroData.buttonText || 'See my price',
    buttonLink: '/booking',
    feature1: heroData.feature1 || '30-second pricing',
    feature2: heroData.feature2 || '100% Satisfaction guaranteed',
    backgroundImageUrl: heroData.backgroundImage || '',
  };
  
  // For single types, use PUT to create/update
  const result = await strapiRequest('/hero-section', 'PUT', strapiData);
  if (result) console.log('  ✅ Hero Section migrated');
}

async function migrateFAQ() {
  console.log('\n📦 Migrating FAQ...');
  
  const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);
  const faqData = await FAQ.findOne();
  
  if (!faqData) {
    console.log('  ⚠️ No FAQ data found in MongoDB');
    return;
  }
  
  // Extract FAQ items from categories
  const faqItems = [];
  if (faqData.faqCategories) {
    Object.values(faqData.faqCategories).forEach(category => {
      if (category && category.questions) {
        category.questions.forEach(q => {
          if (q && q.question && q.answer) {
            faqItems.push({
              question: q.question,
              answer: q.answer,
            });
          }
        });
      }
    });
  }
  
  // Extract trust indicators
  const trustIndicators = faqData.trustIndicatorsSection?.indicators?.map(ind => ({
    number: ind.number,
    description: ind.description,
  })) || [];
  
  // Extract still have questions cards
  const stillHaveQuestionsCards = faqData.stillHaveQuestionsSection?.cards?.map(card => ({
    title: card.title,
    description: card.description,
    buttonText: card.buttonText,
    buttonLink: card.buttonLink,
    icon: card.icon,
  })) || [];
  
  const strapiData = {
    heroTopLabel: faqData.heroSection?.topLabel || 'Answers to your questions',
    heroHeading: (faqData.heroSection?.heading || 'Frequently Asked Questions').replace(/<[^>]*>/g, ''),
    heroDescription: faqData.heroSection?.description || '',
    faqCategories: faqData.faqCategories || null,
    faqItems: faqItems.length > 0 ? faqItems : null,
    stillHaveQuestionsHeading: faqData.stillHaveQuestionsSection?.heading || 'Still Have Questions?',
    stillHaveQuestionsDescription: faqData.stillHaveQuestionsSection?.description || '',
    stillHaveQuestionsCards: stillHaveQuestionsCards.length > 0 ? stillHaveQuestionsCards : null,
    contactSectionHeading: faqData.contactSection?.heading || '',
    contactSectionDescription: faqData.contactSection?.description || '',
    contactEmail: faqData.contactSection?.emailSection?.email || 'info@clensy.com',
    contactPhone: faqData.contactSection?.callSection?.phone || '(551) 305-4081',
    trustIndicators: trustIndicators.length > 0 ? trustIndicators : null,
  };
  
  // Note: endpoint is /faq-pages (plural of singularName faq-page)
  const result = await strapiRequest('/faq-page', 'PUT', strapiData);
  if (result) console.log('  ✅ FAQ migrated');
}

async function migrateAbout() {
  console.log('\n📦 Migrating About Page...');
  
  const About = mongoose.models.About || mongoose.model('About', AboutSchema);
  const aboutData = await About.findOne();
  
  if (!aboutData) {
    console.log('  ⚠️ No About data found in MongoDB');
    return;
  }
  
  // Build rich text content from paragraphs
  const ourStoryContent = [
    aboutData.ourStorySection?.paragraph1,
    aboutData.ourStorySection?.paragraph2,
    aboutData.ourStorySection?.paragraph3,
  ].filter(Boolean).join('\n\n');
  
  const whyWeStartedContent = [
    aboutData.whyWeStartedSection?.paragraph1,
    aboutData.whyWeStartedSection?.paragraph2,
    aboutData.whyWeStartedSection?.paragraph3,
  ].filter(Boolean).join('\n\n');
  
  const ourMissionContent = [
    aboutData.ourMissionSection?.paragraph1,
    aboutData.ourMissionSection?.paragraph2,
    aboutData.ourMissionSection?.paragraph3,
    aboutData.ourMissionSection?.paragraph4,
    aboutData.ourMissionSection?.closingLine,
  ].filter(Boolean).join('\n\n');
  
  // Extract differentiators
  const differentiators = [];
  if (aboutData.whatMakesUsDifferentSection?.residentialCommercial) {
    differentiators.push({
      title: aboutData.whatMakesUsDifferentSection.residentialCommercial.title,
      description: [
        aboutData.whatMakesUsDifferentSection.residentialCommercial.paragraph1,
        aboutData.whatMakesUsDifferentSection.residentialCommercial.paragraph2,
      ].filter(Boolean).join(' '),
    });
  }
  if (aboutData.whatMakesUsDifferentSection?.eliteTeam) {
    differentiators.push({
      title: aboutData.whatMakesUsDifferentSection.eliteTeam.title,
      description: [
        aboutData.whatMakesUsDifferentSection.eliteTeam.paragraph1,
        aboutData.whatMakesUsDifferentSection.eliteTeam.paragraph2,
      ].filter(Boolean).join(' '),
    });
  }
  
  // Extract customer types
  const customerTypes = aboutData.whoWeServeSection?.customerTypes?.map(ct => ({
    title: ct.title,
    description: ct.description,
  })) || [];
  
  const strapiData = {
    heroHeading: aboutData.heroSection?.heading || 'About Clensy',
    heroTagline: aboutData.heroSection?.tagline || '',
    ourStoryHeading: aboutData.ourStorySection?.heading || 'Our Story',
    ourStoryContent: ourStoryContent || '',
    whyWeStartedHeading: aboutData.whyWeStartedSection?.heading || '',
    whyWeStartedSubtitle: aboutData.whyWeStartedSection?.subtitle || '',
    whyWeStartedQuote: aboutData.whyWeStartedSection?.quoteText || '',
    whyWeStartedContent: whyWeStartedContent || '',
    whatMakesUsDifferentHeading: aboutData.whatMakesUsDifferentSection?.heading || '',
    differentiators: differentiators.length > 0 ? differentiators : null,
    clientFocusedTechHeading: aboutData.clientFocusedTech?.heading || '',
    clientFocusedTechFeatures: aboutData.clientFocusedTech?.features || null,
    whoWeServeHeading: aboutData.whoWeServeSection?.heading || '',
    whoWeServeSubtitle: aboutData.whoWeServeSection?.subtitle || '',
    customerTypes: customerTypes.length > 0 ? customerTypes : null,
    ourMissionHeading: aboutData.ourMissionSection?.heading || '',
    ourMissionContent: ourMissionContent || '',
    ctaHeading: aboutData.ctaSection?.heading || '',
    ctaDescription: aboutData.ctaSection?.description || '',
    ctaBookButtonText: aboutData.ctaSection?.bookButtonText || 'Book Your Cleaning',
    ctaContactButtonText: aboutData.ctaSection?.contactButtonText || 'Contact Us',
  };
  
  const result = await strapiRequest('/about', 'PUT', strapiData);
  if (result) console.log('  ✅ About Page migrated');
}

async function migrateCTA() {
  console.log('\n📦 Migrating CTA Section...');
  
  const CTA = mongoose.models.CTA || mongoose.model('CTA', CTASchema);
  const ctaData = await CTA.findOne();
  
  if (!ctaData) {
    console.log('  ⚠️ No CTA data found in MongoDB');
    return;
  }
  
  const strapiData = {
    heading: ctaData.heading || 'Home cleaning you can trust',
    description: ctaData.description || '',
    leftCard: ctaData.leftCard ? {
      title: ctaData.leftCard.title,
      description: ctaData.leftCard.description,
      buttonText: ctaData.leftCard.buttonText,
    } : null,
    rightCard: ctaData.rightCard ? {
      title: ctaData.rightCard.title,
      description: ctaData.rightCard.description,
      buttonText: ctaData.rightCard.buttonText,
    } : null,
  };
  
  const result = await strapiRequest('/cta', 'PUT', strapiData);
  if (result) console.log('  ✅ CTA Section migrated');
}

async function migrateReviews() {
  console.log('\n📦 Migrating Reviews Section...');
  
  const Reviews = mongoose.models.Reviews || mongoose.model('Reviews', ReviewsSchema);
  const reviewsData = await Reviews.findOne();
  
  if (!reviewsData) {
    console.log('  ⚠️ No Reviews data found in MongoDB');
    return;
  }
  
  const strapiData = {
    heading: (reviewsData.heading || 'What People Are Saying About Us').replace(/<[^>]*>/g, ''),
    buttonText: reviewsData.buttonText || 'Load More',
  };
  
  const result = await strapiRequest('/review', 'PUT', strapiData);
  if (result) console.log('  ✅ Reviews Section migrated');
}

async function migrateComparison() {
  console.log('\n📦 Migrating Comparison Section...');
  
  const Comparison = mongoose.models.Comparison || mongoose.model('Comparison', ComparisonSchema);
  const compData = await Comparison.findOne();
  
  if (!compData) {
    console.log('  ⚠️ No Comparison data found in MongoDB');
    return;
  }
  
  const strapiData = {
    heading: compData.heading || '',
    subheading: compData.subheading || '',
    comparisonData: compData.comparisonData || compData.items || null,
    leftColumnTitle: compData.leftColumnTitle || 'Other Cleaners',
    rightColumnTitle: compData.rightColumnTitle || 'Clensy',
  };
  
  const result = await strapiRequest('/comparison', 'PUT', strapiData);
  if (result) console.log('  ✅ Comparison Section migrated');
}

async function migrateHowItWorks() {
  console.log('\n📦 Migrating How It Works...');
  
  const HowItWorks = mongoose.models.HowItWorks || mongoose.model('HowItWorks', HowItWorksSchema);
  const hiwData = await HowItWorks.findOne();
  
  if (!hiwData) {
    console.log('  ⚠️ No How It Works data found in MongoDB');
    return;
  }
  
  const strapiData = {
    heading: hiwData.heading || '',
    subheading: hiwData.subheading || '',
    steps: hiwData.steps || null,
  };
  
  const result = await strapiRequest('/how-it-work', 'PUT', strapiData);
  if (result) console.log('  ✅ How It Works migrated');
}

async function migrateChecklist() {
  console.log('\n📦 Migrating Checklist...');
  
  const Checklist = mongoose.models.Checklist || mongoose.model('Checklist', ChecklistSchema);
  const checklistData = await Checklist.findOne();
  
  if (!checklistData) {
    console.log('  ⚠️ No Checklist data found in MongoDB');
    return;
  }
  
  const strapiData = {
    heading: checklistData.heading || '',
    subheading: checklistData.subheading || '',
    checklistItems: checklistData.items || checklistData.checklistItems || null,
  };
  
  const result = await strapiRequest('/checklist', 'PUT', strapiData);
  if (result) console.log('  ✅ Checklist migrated');
}

async function migrateServices() {
  console.log('\n📦 Migrating Services...');
  
  const serviceModels = [
    { name: 'RoutineCleaning', slug: 'routine-cleaning', type: 'routine', displayName: 'Routine Cleaning' },
    { name: 'DeepCleaning', slug: 'deep-cleaning', type: 'deep', displayName: 'Deep Cleaning' },
    { name: 'AirbnbCleaning', slug: 'airbnb-cleaning', type: 'airbnb', displayName: 'Airbnb Cleaning' },
    { name: 'MovingCleaning', slug: 'moving-cleaning', type: 'moving', displayName: 'Moving Cleaning' },
    { name: 'PostConstructionCleaning', slug: 'post-construction-cleaning', type: 'post-construction', displayName: 'Post Construction Cleaning' },
    { name: 'OfficeCleaning', slug: 'office-cleaning', type: 'office', displayName: 'Office Cleaning' },
    { name: 'MedicalCleaning', slug: 'medical-cleaning', type: 'medical', displayName: 'Medical Cleaning' },
    { name: 'GymCleaning', slug: 'gym-cleaning', type: 'gym', displayName: 'Gym Cleaning' },
    { name: 'RetailCleaning', slug: 'retail-cleaning', type: 'retail', displayName: 'Retail Cleaning' },
    { name: 'SchoolCleaning', slug: 'school-cleaning', type: 'school', displayName: 'School Cleaning' },
    { name: 'PropertyCleaning', slug: 'property-cleaning', type: 'property', displayName: 'Property Cleaning' },
    { name: 'ExtrasService', slug: 'extras', type: 'extras', displayName: 'Extras Service' },
    { name: 'OtherCommercialCleaning', slug: 'other-commercial', type: 'other-commercial', displayName: 'Other Commercial Cleaning' },
  ];
  
  for (const serviceInfo of serviceModels) {
    try {
      const ServiceModel = mongoose.models[serviceInfo.name] || mongoose.model(serviceInfo.name, ServiceSchema);
      const serviceData = await ServiceModel.findOne();
      
      if (!serviceData) {
        console.log(`  ⚠️ No ${serviceInfo.name} data found`);
        continue;
      }
      
      // Build cleaning areas
      const cleaningAreas = [];
      if (serviceData.kitchenTitle) {
        cleaningAreas.push({
          title: serviceData.kitchenTitle,
          description: serviceData.kitchenDescription || '',
          features: serviceData.kitchenFeatures || null,
        });
      }
      if (serviceData.bathroomTitle) {
        cleaningAreas.push({
          title: serviceData.bathroomTitle,
          description: serviceData.bathroomDescription || '',
          features: serviceData.bathroomFeatures || null,
        });
      }
      if (serviceData.livingAreasTitle) {
        cleaningAreas.push({
          title: serviceData.livingAreasTitle,
          description: serviceData.livingAreasDescription || '',
          features: serviceData.livingAreasFeatures || null,
        });
      }
      
      // Build benefits
      const benefits = [];
      for (let i = 1; i <= 5; i++) {
        if (serviceData[`benefit${i}Title`]) {
          benefits.push({
            title: serviceData[`benefit${i}Title`],
            description: serviceData[`benefit${i}Description`] || '',
          });
        }
      }
      
      // Build how it works steps
      const howItWorksSteps = [];
      for (let i = 1; i <= 5; i++) {
        if (serviceData[`step${i}Title`]) {
          howItWorksSteps.push({
            title: serviceData[`step${i}Title`],
            description: serviceData[`step${i}Description`] || '',
            badge: serviceData[`step${i}Badge`] || '',
          });
        }
      }
      
      // Build testimonials
      const testimonials = serviceData.clientTestimonials?.map(t => ({
        rating: t.rating || 5,
        review: t.review || '',
        clientName: t.clientName || '',
        clientLocation: t.clientLocation || '',
        avatarBgColor: t.avatarBgColor || 'blue-500',
      })) || [];
      
      // Build FAQs
      const faqs = serviceData.faqs?.map(f => ({
        question: f.question || '',
        answer: f.answer || '',
      })) || [];
      
      // Build frequency guide
      let frequencyGuide = null;
      if (serviceData.weeklyTitle || serviceData.biWeeklyTitle || serviceData.monthlyTitle) {
        frequencyGuide = {};
        if (serviceData.weeklyTitle) {
          frequencyGuide.weekly = {
            title: serviceData.weeklyTitle,
            perfectFor: serviceData.weeklyPerfectFor || [],
            benefits: serviceData.weeklyBenefits || [],
          };
        }
        if (serviceData.biWeeklyTitle) {
          frequencyGuide.biWeekly = {
            title: serviceData.biWeeklyTitle,
            perfectFor: serviceData.biWeeklyPerfectFor || [],
            benefits: serviceData.biWeeklyBenefits || [],
          };
        }
        if (serviceData.monthlyTitle) {
          frequencyGuide.monthly = {
            title: serviceData.monthlyTitle,
            perfectFor: serviceData.monthlyPerfectFor || [],
            benefits: serviceData.monthlyBenefits || [],
          };
        }
      }
      
      const strapiData = {
        name: serviceInfo.displayName,
        slug: serviceInfo.slug,
        serviceType: serviceInfo.type,
        heroTopLabel: serviceData.heroTopLabel || '',
        heroHeading: serviceData.heroHeading || serviceInfo.displayName,
        heroSubheading: serviceData.heroSubheading || '',
        heroBackgroundImageUrl: serviceData.heroBackgroundImage || '',
        heroServiceDuration: serviceData.heroServiceDuration || '',
        heroServiceGuarantee: serviceData.heroServiceGuarantee || '100% Satisfaction',
        includedSectionHeading: serviceData.includedSectionHeading || '',
        includedSectionSubheading: serviceData.includedSectionSubheading || '',
        cleaningAreas: cleaningAreas.length > 0 ? cleaningAreas : [],
        featureSectionHeading: serviceData.featureSectionHeading || '',
        featureSectionSubheading: serviceData.featureSectionSubheading || '',
        featureSectionPoints: serviceData.featureSectionPoints || null,
        howItWorksHeading: serviceData.howItWorksHeading || '',
        howItWorksSubheading: serviceData.howItWorksSubheading || '',
        howItWorksSteps: howItWorksSteps.length > 0 ? howItWorksSteps : null,
        benefitsHeading: serviceData.benefitsHeading || '',
        benefitsSubheading: serviceData.benefitsSubheading || '',
        benefits: benefits.length > 0 ? benefits : [],
        testimonials: testimonials.length > 0 ? testimonials : [],
        faqs: faqs.length > 0 ? faqs : [],
        frequencyGuide: frequencyGuide,
      };
      
      const result = await strapiRequest('/services', 'POST', strapiData);
      if (result) {
        console.log(`  ✅ ${serviceInfo.displayName} migrated`);
      }
    } catch (error) {
      console.error(`  ❌ Error migrating ${serviceInfo.name}:`, error.message);
    }
  }
}

async function migrateLocations() {
  console.log('\n📦 Migrating Locations...');
  
  const locationModels = [
    { name: 'BergenLocation', slug: 'bergen', county: 'Bergen' },
    { name: 'EssexLocation', slug: 'essex', county: 'Essex' },
    { name: 'HudsonLocation', slug: 'hudson', county: 'Hudson' },
    { name: 'MorrisLocation', slug: 'morris', county: 'Morris' },
    { name: 'PassaicLocation', slug: 'passaic', county: 'Passaic' },
    { name: 'UnionLocation', slug: 'union', county: 'Union' },
  ];
  
  for (const locationInfo of locationModels) {
    try {
      const LocationModel = mongoose.models[locationInfo.name] || mongoose.model(locationInfo.name, LocationSchema);
      const locationData = await LocationModel.findOne();
      
      if (!locationData) {
        console.log(`  ⚠️ No ${locationInfo.name} data found`);
        continue;
      }
      
      // Extract operating hours
      const operatingHours = locationData.contactSection?.hours?.map(h => ({
        day: h.day,
        hours: h.hours,
      })) || [];
      
      // Extract service areas
      const serviceAreas = locationData.serviceAreas?.map(area => ({
        name: typeof area === 'string' ? area : area.name,
      })) || [];
      
      const strapiData = {
        name: locationInfo.county,
        slug: locationInfo.slug,
        county: locationInfo.county,
        state: 'NJ',
        heroTitle: locationData.heroSection?.title || `Cleaning Services in ${locationInfo.county} County`,
        heroSubtitle: locationData.heroSection?.subtitle || '',
        heroBackgroundImageUrl: locationData.heroSection?.backgroundImage || '',
        ctaButton1Text: locationData.heroSection?.ctaButton1 || 'Get a Quote',
        ctaButton2Text: locationData.heroSection?.ctaButton2 || 'Contact Us',
        contactPhone: locationData.contactSection?.phone || '(551) 305-4081',
        contactEmail: locationData.contactSection?.email || 'info@clensy.com',
        contactAddress: locationData.contactSection?.address || '',
        operatingHours: operatingHours.length > 0 ? operatingHours : null,
        serviceAreas: serviceAreas.length > 0 ? serviceAreas : null,
        aboutTitle: locationData.aboutSection?.title || '',
        aboutDescription: locationData.aboutSection?.description || '',
        seo: locationData.seo ? {
          metaTitle: locationData.seo.title || '',
          metaDescription: locationData.seo.description || '',
          keywords: locationData.seo.keywords?.join(', ') || '',
        } : null,
        localSeo: {
          city: locationInfo.county,
          county: locationInfo.county,
          state: 'NJ',
          serviceType: 'residential',
        },
      };
      
      const result = await strapiRequest('/locations', 'POST', strapiData);
      if (result) {
        console.log(`  ✅ ${locationInfo.county} Location migrated`);
      }
    } catch (error) {
      console.error(`  ❌ Error migrating ${locationInfo.name}:`, error.message);
    }
  }
}

async function createDefaultGlobalSettings() {
  console.log('\n📦 Creating Global Settings...');
  
  const strapiData = {
    siteName: 'Clensy',
    siteTagline: 'Professional Cleaning Services',
    contactPhone: '(551) 305-4081',
    contactEmail: 'info@clensy.com',
    robotsTxt: `User-agent: *
Allow: /

Sitemap: https://clensy.com/sitemap.xml`,
    defaultSeo: {
      metaTitle: 'Clensy - Professional Cleaning Services in New Jersey',
      metaDescription: 'Professional residential and commercial cleaning services in New Jersey. Book online in 30 seconds. 100% satisfaction guaranteed.',
      metaRobots: 'index,follow',
    },
    defaultOpenGraph: {
      ogTitle: 'Clensy - Professional Cleaning Services',
      ogDescription: 'Professional cleaning services tailored to your needs. Book now!',
      twitterCard: 'summary_large_image',
    },
    defaultSchema: {
      schemaType: 'LocalBusiness',
      businessName: 'Clensy',
      businessType: 'CleaningService',
      telephone: '(551) 305-4081',
      priceRange: '$$',
    },
  };
  
  const result = await strapiRequest('/global-setting', 'PUT', strapiData);
  if (result) console.log('  ✅ Global Settings created');
}

// Main Migration Runner
async function runMigration() {
  console.log('🚀 Starting MongoDB to Strapi Migration (v2)...\n');
  console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/.*:.*@/, '//***:***@'));
  console.log('Strapi URL:', STRAPI_URL);
  console.log('API Token:', STRAPI_API_TOKEN ? '✅ Provided' : '❌ Not provided');
  
  if (!STRAPI_API_TOKEN) {
    console.error('\n❌ Error: STRAPI_API_TOKEN is required');
    console.log('Create a Full Access token in Strapi Admin > Settings > API Tokens');
    process.exit(1);
  }
  
  try {
    // Connect to MongoDB
    console.log('\n📡 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('  ✅ Connected to MongoDB');
    
    // Run migrations - Single Types first
    await createDefaultGlobalSettings();
    await migrateHeroSection();
    await migrateCTA();
    await migrateReviews();
    await migrateFAQ();
    await migrateAbout();
    await migrateComparison();
    await migrateHowItWorks();
    await migrateChecklist();
    
    // Collection Types
    await migrateServices();
    await migrateLocations();
    
    console.log('\n✅ Migration completed!');
    console.log('\n📋 Next steps:');
    console.log('  1. Check Strapi admin panel to verify data');
    console.log('  2. Set up API permissions (Settings > Roles > Public)');
    console.log('  3. Enable find/findOne for content types');
    
  } catch (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error(error.stack);
  } finally {
    await mongoose.disconnect();
    console.log('\n📡 Disconnected from MongoDB');
  }
}

runMigration();
