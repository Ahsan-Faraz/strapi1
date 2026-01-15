/**
 * Seed Services and Locations into Strapi
 * 
 * Run with: node scripts/seed-services-locations.js
 * 
 * Make sure to set environment variables:
 * - STRAPI_ADMIN_EMAIL
 * - STRAPI_ADMIN_PASSWORD
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-8d56.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '67eb2c4b5e9661786cbc07a8e245f6feca5539a6b25d371450b6e47ae586b1696c16d0ed67f45d2eb20b1189f91710d0d422b82abe4763e64467a2f6dcb5526e7d23f37110c7925bcd20e46a115bde10200168b131b4ca703f5c9e5eafa743d6691aba335d9a48c7bae2e47d9da3489b3ffa478ceebcd934f7099c40d622e3b2';

let authToken = null;

async function authenticate() {
  console.log('🔐 Using API Token for authentication...');
  
  // Use API token instead of admin login
  authToken = STRAPI_API_TOKEN;
  
  // Verify token works
  const response = await fetch(`${STRAPI_URL}/api/services`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  });
  
  if (!response.ok) {
    throw new Error(`API Token verification failed: ${response.status}`);
  }
  
  console.log('✅ API Token verified successfully');
}

async function createOrUpdate(endpoint, data, identifierField = 'slug') {
  const identifier = data[identifierField];
  
  // Check if exists
  const checkResponse = await fetch(
    `${STRAPI_URL}/api${endpoint}?filters[${identifierField}][$eq]=${encodeURIComponent(identifier)}`,
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
    }
  );
  
  const existing = await checkResponse.json();
  
  if (existing.data && existing.data.length > 0) {
    // Update existing
    const id = existing.data[0].id;
    const updateResponse = await fetch(`${STRAPI_URL}/api${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ data }),
    });
    
    if (!updateResponse.ok) {
      const error = await updateResponse.text();
      console.error(`❌ Failed to update ${identifier}:`, error);
      return null;
    }
    
    console.log(`📝 Updated: ${identifier}`);
    return await updateResponse.json();
  } else {
    // Create new
    const createResponse = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ data }),
    });
    
    if (!createResponse.ok) {
      const error = await createResponse.text();
      console.error(`❌ Failed to create ${identifier}:`, error);
      return null;
    }
    
    console.log(`✅ Created: ${identifier}`);
    return await createResponse.json();
  }
}

// ============================================
// SERVICES DATA
// ============================================

const services = [
  {
    name: 'Routine Cleaning',
    slug: 'routine-cleaning',
    serviceType: 'routine',
    heroTopLabel: 'Premium Home Care',
    heroHeading: 'Professional Routine Cleaning Services',
    heroSubheading: 'Keep your home consistently clean and fresh with our regular cleaning service. Our trained professionals handle all the essential tasks so you can enjoy a spotless living space.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '2-3 Hour Service',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: "What's Included in Our Routine Cleaning",
    includedSectionSubheading: 'Our comprehensive cleaning service ensures every essential area receives meticulous attention.',
    featureSectionHeading: 'Exceptional Cleaning Results, Every Time',
    featureSectionSubheading: 'Our professional cleaners follow a meticulous process to ensure your space receives the highest standard of cleaning.',
    featureSectionPoints: [
      'Consistently thorough cleaning with attention to detail',
      'Eco-friendly cleaning products for a healthier environment',
      'Professionally trained and background-checked staff',
      'Flexible scheduling to fit your lifestyle'
    ],
    howItWorksHeading: 'How Our Routine Cleaning Works',
    howItWorksSubheading: 'Getting started with our premium cleaning service is seamless and convenient.',
    step1Title: 'Book Online',
    step1Description: 'Schedule your cleaning service online in minutes. Choose your preferred date and time.',
    step2Title: 'We Clean',
    step2Description: 'Our professional team arrives promptly and meticulously cleans your space.',
    step3Title: 'Relax & Enjoy',
    step3Description: 'Return to a pristine, fresh space. Set up recurring cleanings to maintain it effortlessly.',
    benefitsHeading: 'Why Choose Our Routine Cleaning Service',
    benefitsSubheading: 'Our premium cleaning service offers exceptional benefits to maintain your space in pristine condition.',
    benefit1Title: 'Consistent Excellence',
    benefit1Description: 'Regular professional cleanings ensure your space maintains a consistently pristine appearance.',
    benefit2Title: 'Reclaimed Time & Energy',
    benefit2Description: 'Regain your valuable time by entrusting your cleaning needs to our professional team.',
    benefit3Title: 'Enhanced Well-being',
    benefit3Description: 'Regular professional cleaning significantly reduces allergens, dust, and bacteria.',
    clientTestimonialsHeading: 'What Our Clients Say',
    clientTestimonialsSubheading: 'Hear from our satisfied clients about their experience with our routine cleaning service.',
    frequencyGuideHeading: 'How Often Should You Schedule Cleaning?',
    frequencyGuideSubheading: 'Finding the right cleaning frequency depends on your specific needs and preferences.',
    frequencyOptions: [
      { title: 'Weekly', color: 'green', perfectFor: ['Busy families with children', 'Homes with pets', 'High-traffic areas', 'Allergy sufferers'], benefits: 'Maintains a consistently clean home with no build-up of dust or allergens.', label: 'Most Popular Choice' },
      { title: 'Bi-Weekly', color: 'blue', perfectFor: ['Couples or small families', 'Average-sized homes', 'Those who tidy regularly', 'Moderate use spaces'], benefits: 'Good balance between maintaining cleanliness and budget.', label: 'Best Value Option' },
      { title: 'Monthly', color: 'purple', perfectFor: ['Singles or couples', 'Smaller living spaces', 'Those who clean regularly', 'Limited use areas'], benefits: 'Good for getting a professional deep clean while handling regular maintenance yourself.', label: 'Budget-Friendly Option' }
    ],
    faqs: [
      { question: 'What does routine cleaning include?', answer: 'Our routine cleaning covers all essential areas including dusting, vacuuming, mopping, bathroom sanitization, kitchen cleaning, and general tidying of living spaces.' },
      { question: 'How long does a routine cleaning take?', answer: 'A typical routine cleaning takes 2-3 hours depending on the size of your home and its current condition.' },
      { question: 'Do I need to be home during the cleaning?', answer: 'No, many of our clients provide access and go about their day. We are fully insured and background-checked.' }
    ]
  },
  {
    name: 'Deep Cleaning',
    slug: 'deep-cleaning',
    serviceType: 'deep',
    heroTopLabel: 'Intensive Care',
    heroHeading: 'Professional Deep Cleaning Services',
    heroSubheading: 'A thorough, top-to-bottom cleaning that reaches every corner. Perfect for seasonal refreshes, move-ins, or when your home needs extra attention.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '4-6 Hour Service',
    heroServiceGuarantee: '100% Satisfaction',
    includedSectionHeading: "What's Included in Our Deep Cleaning",
    includedSectionSubheading: 'Our deep cleaning goes beyond the surface to tackle built-up grime, hidden dust, and neglected areas.',
    featureSectionHeading: 'The Most Thorough Clean Your Home Has Ever Had',
    featureSectionSubheading: 'Our deep cleaning service addresses areas that regular cleaning misses.',
    featureSectionPoints: [
      'Inside appliances including oven and refrigerator',
      'Behind and under furniture',
      'Baseboards, door frames, and light fixtures',
      'Window sills and tracks',
      'Cabinet fronts and handles'
    ],
    howItWorksHeading: 'How Our Deep Cleaning Works',
    howItWorksSubheading: 'A comprehensive cleaning process designed to restore your home to pristine condition.',
    step1Title: 'Assessment',
    step1Description: 'We evaluate your home to create a customized deep cleaning plan.',
    step2Title: 'Deep Clean',
    step2Description: 'Our team systematically cleans every area with professional-grade equipment.',
    step3Title: 'Final Inspection',
    step3Description: 'We walk through your home to ensure every detail meets our high standards.',
    benefitsHeading: 'Why Choose Our Deep Cleaning Service',
    benefitsSubheading: 'Experience the difference a professional deep clean makes.',
    benefit1Title: 'Healthier Environment',
    benefit1Description: 'Remove allergens, bacteria, and built-up contaminants for better indoor air quality.',
    benefit2Title: 'Extended Surface Life',
    benefit2Description: 'Proper deep cleaning helps preserve your floors, fixtures, and appliances.',
    benefit3Title: 'Fresh Start',
    benefit3Description: 'Perfect for new beginnings - moving in, seasonal changes, or post-renovation.',
    clientTestimonialsHeading: 'Deep Cleaning Success Stories',
    clientTestimonialsSubheading: 'See why our clients trust us for their deep cleaning needs.',
    frequencyGuideHeading: 'When Should You Schedule Deep Cleaning?',
    frequencyGuideSubheading: 'Deep cleaning is recommended at key moments throughout the year.',
    frequencyOptions: [
      { title: 'Quarterly', color: 'green', perfectFor: ['Families with children', 'Pet owners', 'Allergy sufferers', 'Busy households'], benefits: 'Maintains a consistently deep-cleaned home throughout the year.', label: 'Recommended' },
      { title: 'Bi-Annually', color: 'blue', perfectFor: ['Couples without pets', 'Smaller homes', 'Those who maintain regularly'], benefits: 'Spring and fall deep cleans keep your home fresh.', label: 'Popular Choice' },
      { title: 'Annually', color: 'purple', perfectFor: ['Minimal use spaces', 'Well-maintained homes', 'Budget-conscious clients'], benefits: 'A yearly reset to tackle accumulated grime.', label: 'Minimum Recommended' }
    ],
    faqs: [
      { question: 'What is the difference between routine and deep cleaning?', answer: 'Deep cleaning is more intensive and includes areas not covered in routine cleaning like inside appliances, behind furniture, baseboards, and detailed scrubbing of all surfaces.' },
      { question: 'How often should I get a deep cleaning?', answer: 'We recommend deep cleaning at least twice a year, or quarterly for homes with pets, children, or allergy sufferers.' },
      { question: 'How long does deep cleaning take?', answer: 'Deep cleaning typically takes 4-6 hours depending on home size and condition. Larger homes may require a full day.' }
    ]
  },
  {
    name: 'Airbnb Cleaning',
    slug: 'airbnb-cleaning',
    serviceType: 'airbnb',
    heroTopLabel: 'Hospitality Excellence',
    heroHeading: 'Professional Airbnb & Vacation Rental Cleaning',
    heroSubheading: 'Impress your guests with spotless accommodations. Our turnover cleaning ensures 5-star reviews and happy guests every time.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '2-4 Hour Turnover',
    heroServiceGuarantee: '5-Star Ready',
    includedSectionHeading: "What's Included in Our Airbnb Cleaning",
    includedSectionSubheading: 'Complete turnover service designed for vacation rental success.',
    featureSectionHeading: 'Guest-Ready Every Time',
    featureSectionSubheading: 'Our Airbnb cleaning service is designed to maximize your reviews and bookings.',
    featureSectionPoints: [
      'Complete linen change and bed making',
      'Restocking of amenities and supplies',
      'Thorough sanitization of high-touch surfaces',
      'Kitchen reset including dishes and appliances',
      'Photo-ready staging of spaces'
    ],
    howItWorksHeading: 'How Our Airbnb Turnover Works',
    howItWorksSubheading: 'Seamless coordination between guest checkouts and check-ins.',
    step1Title: 'Schedule',
    step1Description: 'Sync your booking calendar with our system for automatic scheduling.',
    step2Title: 'Turnover',
    step2Description: 'Our team arrives promptly after checkout to prepare for the next guest.',
    step3Title: 'Confirmation',
    step3Description: 'Receive photos and confirmation that your property is guest-ready.',
    benefitsHeading: 'Why Hosts Choose Our Airbnb Cleaning',
    benefitsSubheading: 'Maximize your rental income with professional turnover service.',
    benefit1Title: 'Better Reviews',
    benefit1Description: 'Consistently clean properties lead to 5-star cleanliness ratings.',
    benefit2Title: 'More Bookings',
    benefit2Description: 'Great reviews attract more guests and allow premium pricing.',
    benefit3Title: 'Peace of Mind',
    benefit3Description: 'Never worry about turnover timing or quality again.',
    clientTestimonialsHeading: 'What Hosts Say About Us',
    clientTestimonialsSubheading: 'Join hundreds of successful Airbnb hosts who trust our service.',
    frequencyGuideHeading: 'Turnover Cleaning Packages',
    frequencyGuideSubheading: 'Choose the package that fits your hosting needs.',
    frequencyOptions: [
      { title: 'Per Turnover', color: 'green', perfectFor: ['Occasional hosts', 'Single property owners', 'Flexible scheduling'], benefits: 'Pay only when you need cleaning between guests.', label: 'Most Flexible' },
      { title: 'Monthly Package', color: 'blue', perfectFor: ['Regular hosts', 'Multiple turnovers per month', 'Consistent scheduling'], benefits: 'Discounted rate for committed monthly service.', label: 'Best Value' },
      { title: 'Property Management', color: 'purple', perfectFor: ['Multiple properties', 'Full-time hosts', 'Hands-off management'], benefits: 'Complete turnover management with priority scheduling.', label: 'Premium Service' }
    ],
    faqs: [
      { question: 'How quickly can you turn over a property?', answer: 'We can complete most turnovers in 2-4 hours, allowing for same-day check-ins after checkout.' },
      { question: 'Do you provide linens and supplies?', answer: 'We can work with your existing supplies or provide linen service and restocking for an additional fee.' },
      { question: 'Can you sync with my booking calendar?', answer: 'Yes, we integrate with Airbnb, VRBO, and other major platforms for automatic scheduling.' }
    ]
  },
  {
    name: 'Move In/Out Cleaning',
    slug: 'moving-cleaning',
    serviceType: 'moving',
    heroTopLabel: 'Transition Ready',
    heroHeading: 'Professional Move In/Out Cleaning Services',
    heroSubheading: 'Start fresh in your new home or leave your old one spotless. Our move cleaning ensures a clean transition for everyone.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: '4-8 Hour Service',
    heroServiceGuarantee: 'Deposit-Back Guarantee',
    includedSectionHeading: "What's Included in Our Move Cleaning",
    includedSectionSubheading: 'Comprehensive cleaning for empty or nearly-empty spaces.',
    featureSectionHeading: 'Leave Nothing Behind But Cleanliness',
    featureSectionSubheading: 'Our move cleaning covers every surface in your empty home.',
    featureSectionPoints: [
      'Inside all cabinets, closets, and drawers',
      'Complete appliance cleaning inside and out',
      'All light fixtures and ceiling fans',
      'Window cleaning including tracks and sills',
      'Garage and storage area cleaning'
    ],
    howItWorksHeading: 'How Our Move Cleaning Works',
    howItWorksSubheading: 'Coordinated with your moving schedule for seamless transitions.',
    step1Title: 'Schedule',
    step1Description: 'Book your cleaning around your move date for optimal timing.',
    step2Title: 'Deep Clean',
    step2Description: 'Our team thoroughly cleans the empty space from top to bottom.',
    step3Title: 'Walkthrough',
    step3Description: 'Final inspection ensures the property meets landlord or buyer standards.',
    benefitsHeading: 'Why Choose Our Move Cleaning Service',
    benefitsSubheading: 'Make your move stress-free with professional cleaning.',
    benefit1Title: 'Get Your Deposit Back',
    benefit1Description: 'Our thorough cleaning helps ensure you receive your full security deposit.',
    benefit2Title: 'Fresh Start',
    benefit2Description: 'Move into a perfectly clean home without lifting a finger.',
    benefit3Title: 'Save Time',
    benefit3Description: 'Focus on your move while we handle the cleaning.',
    clientTestimonialsHeading: 'Moving Success Stories',
    clientTestimonialsSubheading: 'See how we have helped others with their moves.',
    frequencyGuideHeading: 'Move Cleaning Options',
    frequencyGuideSubheading: 'Choose the service level that fits your needs.',
    frequencyOptions: [
      { title: 'Move Out', color: 'green', perfectFor: ['Renters leaving', 'Home sellers', 'Landlords between tenants'], benefits: 'Leave the property in perfect condition for the next occupant.', label: 'Most Common' },
      { title: 'Move In', color: 'blue', perfectFor: ['New homeowners', 'New renters', 'Anyone wanting a fresh start'], benefits: 'Start your new chapter in a perfectly clean space.', label: 'Fresh Start' },
      { title: 'Both', color: 'purple', perfectFor: ['Moving locally', 'Overlapping leases', 'Complete peace of mind'], benefits: 'Bundle both services for the best value.', label: 'Best Value' }
    ],
    faqs: [
      { question: 'When should I schedule move cleaning?', answer: 'For move-out, schedule after furniture is removed. For move-in, schedule before your belongings arrive.' },
      { question: 'Will this help me get my deposit back?', answer: 'Yes! Our thorough cleaning addresses all the areas landlords check during move-out inspections.' },
      { question: 'Do you clean inside appliances?', answer: 'Absolutely. We clean inside ovens, refrigerators, dishwashers, and all other appliances.' }
    ]
  },
  {
    name: 'Post-Construction Cleaning',
    slug: 'post-construction-cleaning',
    serviceType: 'post-construction',
    heroTopLabel: 'Construction Cleanup',
    heroHeading: 'Professional Post-Construction Cleaning',
    heroSubheading: 'Transform your construction site into a move-in ready space. We remove dust, debris, and construction residue for a spotless finish.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: 'Project-Based',
    heroServiceGuarantee: 'Move-In Ready',
    includedSectionHeading: "What's Included in Post-Construction Cleaning",
    includedSectionSubheading: 'Specialized cleaning for newly built or renovated spaces.',
    featureSectionHeading: 'From Construction Site to Showroom',
    featureSectionSubheading: 'Our post-construction cleaning removes all traces of building work.',
    featureSectionPoints: [
      'Fine dust removal from all surfaces',
      'Window and glass cleaning including labels',
      'Paint splatter and adhesive removal',
      'HVAC vent and duct cleaning',
      'Floor finishing and polishing'
    ],
    howItWorksHeading: 'Our Post-Construction Process',
    howItWorksSubheading: 'A systematic approach to construction cleanup.',
    step1Title: 'Assessment',
    step1Description: 'We evaluate the space and create a customized cleaning plan.',
    step2Title: 'Rough Clean',
    step2Description: 'Remove large debris and initial dust accumulation.',
    step3Title: 'Final Detail',
    step3Description: 'Detailed cleaning of every surface for move-in readiness.',
    benefitsHeading: 'Why Choose Our Post-Construction Service',
    benefitsSubheading: 'Specialized expertise for construction cleanup.',
    benefit1Title: 'Specialized Equipment',
    benefit1Description: 'Industrial-grade vacuums and tools designed for construction dust.',
    benefit2Title: 'Experienced Team',
    benefit2Description: 'Our crews are trained specifically for post-construction environments.',
    benefit3Title: 'Faster Occupancy',
    benefit3Description: 'Get your space ready for use or sale faster.',
    clientTestimonialsHeading: 'Builder & Contractor Reviews',
    clientTestimonialsSubheading: 'Trusted by construction professionals across New Jersey.',
    frequencyGuideHeading: 'Post-Construction Cleaning Phases',
    frequencyGuideSubheading: 'Choose the level of cleaning your project needs.',
    frequencyOptions: [
      { title: 'Rough Clean', color: 'green', perfectFor: ['During construction', 'Between phases', 'Debris removal'], benefits: 'Clear the space for the next construction phase.', label: 'Phase 1' },
      { title: 'Final Clean', color: 'blue', perfectFor: ['Project completion', 'Before inspection', 'Move-in prep'], benefits: 'Detailed cleaning for occupancy readiness.', label: 'Phase 2' },
      { title: 'Touch-Up', color: 'purple', perfectFor: ['After punch list', 'Pre-closing', 'Final details'], benefits: 'Address any remaining items after final walkthrough.', label: 'Phase 3' }
    ],
    faqs: [
      { question: 'When should post-construction cleaning be scheduled?', answer: 'Schedule after all construction work is complete but before final inspection or move-in.' },
      { question: 'How long does post-construction cleaning take?', answer: 'Time varies based on project size and condition. A typical home takes 1-2 days.' },
      { question: 'Do you work with contractors directly?', answer: 'Yes, we regularly partner with builders and contractors for seamless project completion.' }
    ]
  },
  {
    name: 'Office Cleaning',
    slug: 'office-cleaning',
    serviceType: 'office',
    heroTopLabel: 'Commercial Excellence',
    heroHeading: 'Professional Office Cleaning Services',
    heroSubheading: 'Create a productive, healthy workplace with our commercial cleaning services. Customized solutions for offices of all sizes.',
    heroBackgroundImageUrl: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1750838311/home-2573375_1280_ckf686.png',
    heroServiceDuration: 'Flexible Scheduling',
    heroServiceGuarantee: 'Business Ready',
    includedSectionHeading: "What's Included in Our Office Cleaning",
    includedSectionSubheading: 'Comprehensive commercial cleaning tailored to your business needs.',
    featureSectionHeading: 'A Clean Office is a Productive Office',
    featureSectionSubheading: 'Our office cleaning promotes employee health and productivity.',
    featureSectionPoints: [
      'Workstation and desk sanitization',
      'Common area and break room cleaning',
      'Restroom deep cleaning and restocking',
      'Floor care including carpet and hard surfaces',
      'Trash removal and recycling management'
    ],
    howItWorksHeading: 'How Our Office Cleaning Works',
    howItWorksSubheading: 'Minimal disruption to your business operations.',
    step1Title: 'Consultation',
    step1Description: 'We assess your space and create a customized cleaning plan.',
    step2Title: 'Schedule',
    step2Description: 'Choose cleaning times that work around your business hours.',
    step3Title: 'Maintain',
    step3Description: 'Consistent service keeps your office always presentable.',
    benefitsHeading: 'Why Choose Our Office Cleaning Service',
    benefitsSubheading: 'Professional commercial cleaning for businesses.',
    benefit1Title: 'Healthier Workplace',
    benefit1Description: 'Reduce sick days with regular sanitization and cleaning.',
    benefit2Title: 'Professional Image',
    benefit2Description: 'Impress clients and visitors with a spotless office.',
    benefit3Title: 'Employee Satisfaction',
    benefit3Description: 'A clean workspace boosts morale and productivity.',
    clientTestimonialsHeading: 'What Businesses Say',
    clientTestimonialsSubheading: 'Trusted by offices throughout New Jersey.',
    frequencyGuideHeading: 'Office Cleaning Schedules',
    frequencyGuideSubheading: 'Choose the frequency that fits your business.',
    frequencyOptions: [
      { title: 'Daily', color: 'green', perfectFor: ['High-traffic offices', 'Customer-facing businesses', 'Large teams'], benefits: 'Maintain a consistently clean environment every day.', label: 'Most Thorough' },
      { title: '3x Weekly', color: 'blue', perfectFor: ['Medium-sized offices', 'Professional services', 'Moderate traffic'], benefits: 'Regular cleaning without daily service costs.', label: 'Popular Choice' },
      { title: 'Weekly', color: 'purple', perfectFor: ['Small offices', 'Low traffic', 'Budget-conscious'], benefits: 'Essential cleaning to maintain a professional space.', label: 'Budget-Friendly' }
    ],
    faqs: [
      { question: 'Do you clean during business hours?', answer: 'We offer flexible scheduling including evenings and weekends to minimize disruption.' },
      { question: 'Can you handle large office buildings?', answer: 'Yes, we service offices of all sizes from small suites to multi-floor buildings.' },
      { question: 'Do you provide cleaning supplies?', answer: 'Yes, we bring all necessary supplies and equipment. We can also use your preferred products.' }
    ]
  }
];


// ============================================
// LOCATIONS DATA
// ============================================

const locations = [
  {
    name: 'Bergen County',
    slug: 'bergen-county',
    county: 'Bergen',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Bergen County',
    heroSubtitle: 'Trusted residential and commercial cleaning for Bergen County homes and businesses. Serving Hackensack, Paramus, Fort Lee, and surrounding areas.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(201) 555-0123',
    contactEmail: 'bergen@clensy.com',
    contactAddress: 'Bergen County, New Jersey',
    aboutTitle: 'About Our Bergen County Services',
    aboutDescription: 'Clensy has been proudly serving Bergen County residents and businesses for years. Our team of professional cleaners understands the unique needs of this diverse community, from luxury homes in Alpine to busy offices in Hackensack.\n\nWe offer comprehensive cleaning services including routine cleaning, deep cleaning, move-in/out cleaning, and commercial services. Our Bergen County team is fully insured, background-checked, and committed to delivering exceptional results.',
  },
  {
    name: 'Essex County',
    slug: 'essex-county',
    county: 'Essex',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Essex County',
    heroSubtitle: 'Quality cleaning services for Essex County homes and businesses. Serving Newark, Montclair, Livingston, and all surrounding communities.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(973) 555-0124',
    contactEmail: 'essex@clensy.com',
    contactAddress: 'Essex County, New Jersey',
    aboutTitle: 'About Our Essex County Services',
    aboutDescription: 'From the historic neighborhoods of Newark to the charming streets of Montclair, Clensy provides top-tier cleaning services throughout Essex County.\n\nOur experienced team handles everything from routine home cleaning to specialized commercial services. We take pride in our attention to detail and commitment to customer satisfaction.',
  },
  {
    name: 'Hudson County',
    slug: 'hudson-county',
    county: 'Hudson',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Hudson County',
    heroSubtitle: 'Expert cleaning services for Hudson County residences and businesses. Serving Jersey City, Hoboken, Weehawken, and the entire waterfront community.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(201) 555-0125',
    contactEmail: 'hudson@clensy.com',
    contactAddress: 'Hudson County, New Jersey',
    aboutTitle: 'About Our Hudson County Services',
    aboutDescription: 'Hudson County is home to some of New Jersey most vibrant communities, and Clensy is proud to serve them all. From high-rise apartments in Jersey City to brownstones in Hoboken, we adapt our services to meet your needs.\n\nOur Hudson County team specializes in urban living spaces, understanding the unique challenges of city cleaning. We offer flexible scheduling to accommodate busy professionals.',
  },
  {
    name: 'Passaic County',
    slug: 'passaic-county',
    county: 'Passaic',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Passaic County',
    heroSubtitle: 'Reliable cleaning services for Passaic County homes and businesses. Serving Paterson, Clifton, Wayne, and all surrounding areas.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(973) 555-0126',
    contactEmail: 'passaic@clensy.com',
    contactAddress: 'Passaic County, New Jersey',
    aboutTitle: 'About Our Passaic County Services',
    aboutDescription: 'Clensy brings professional cleaning excellence to Passaic County. Whether you are in the heart of Paterson or the suburbs of Wayne, our team delivers consistent, high-quality cleaning services.\n\nWe understand the diverse needs of Passaic County residents and offer customized cleaning plans to match your lifestyle and budget.',
  },
  {
    name: 'Union County',
    slug: 'union-county',
    county: 'Union',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Union County',
    heroSubtitle: 'Premium cleaning services for Union County homes and businesses. Serving Elizabeth, Westfield, Summit, and all surrounding communities.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(908) 555-0127',
    contactEmail: 'union@clensy.com',
    contactAddress: 'Union County, New Jersey',
    aboutTitle: 'About Our Union County Services',
    aboutDescription: 'Union County residents deserve the best, and Clensy delivers. From the bustling city of Elizabeth to the charming downtown of Westfield, we provide exceptional cleaning services tailored to your needs.\n\nOur Union County team is known for reliability, attention to detail, and outstanding customer service.',
  },
  {
    name: 'Morris County',
    slug: 'morris-county',
    county: 'Morris',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Morris County',
    heroSubtitle: 'Expert cleaning services for Morris County homes and businesses. Serving Morristown, Parsippany, Madison, and all surrounding areas.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(973) 555-0128',
    contactEmail: 'morris@clensy.com',
    contactAddress: 'Morris County, New Jersey',
    aboutTitle: 'About Our Morris County Services',
    aboutDescription: 'Morris County is known for its beautiful homes and thriving businesses, and Clensy is here to help keep them spotless. Our team serves communities from historic Morristown to growing Parsippany.\n\nWe offer comprehensive residential and commercial cleaning services with the flexibility and professionalism Morris County expects.',
  },
  {
    name: 'Middlesex County',
    slug: 'middlesex-county',
    county: 'Middlesex',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Middlesex County',
    heroSubtitle: 'Quality cleaning services for Middlesex County homes and businesses. Serving New Brunswick, Edison, Woodbridge, and all surrounding communities.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(732) 555-0129',
    contactEmail: 'middlesex@clensy.com',
    contactAddress: 'Middlesex County, New Jersey',
    aboutTitle: 'About Our Middlesex County Services',
    aboutDescription: 'Middlesex County is one of New Jersey most populous counties, and Clensy is proud to serve its diverse communities. From college town New Brunswick to suburban Edison, we bring professional cleaning to every corner.\n\nOur Middlesex County team handles homes of all sizes and commercial spaces of every type.',
  },
  {
    name: 'Monmouth County',
    slug: 'monmouth-county',
    county: 'Monmouth',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Monmouth County',
    heroSubtitle: 'Premium cleaning services for Monmouth County homes and businesses. Serving Red Bank, Freehold, Long Branch, and the entire Shore area.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(732) 555-0130',
    contactEmail: 'monmouth@clensy.com',
    contactAddress: 'Monmouth County, New Jersey',
    aboutTitle: 'About Our Monmouth County Services',
    aboutDescription: 'From the Jersey Shore to inland communities, Clensy provides exceptional cleaning services throughout Monmouth County. We understand the unique needs of shore properties and year-round residents alike.\n\nOur team offers specialized services including vacation rental turnovers, seasonal deep cleaning, and regular maintenance for homes and businesses.',
  },
  {
    name: 'Somerset County',
    slug: 'somerset-county',
    county: 'Somerset',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Somerset County',
    heroSubtitle: 'Expert cleaning services for Somerset County homes and businesses. Serving Bridgewater, Franklin, Somerville, and all surrounding areas.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(908) 555-0131',
    contactEmail: 'somerset@clensy.com',
    contactAddress: 'Somerset County, New Jersey',
    aboutTitle: 'About Our Somerset County Services',
    aboutDescription: 'Somerset County is home to beautiful estates and thriving corporate centers, and Clensy serves them all. Our team brings professional cleaning excellence to every community in the county.\n\nWe offer customized cleaning plans for homes of all sizes and commercial spaces from small offices to large corporate facilities.',
  },
  {
    name: 'Ocean County',
    slug: 'ocean-county',
    county: 'Ocean',
    state: 'NJ',
    heroTitle: 'Professional Cleaning Services in Ocean County',
    heroSubtitle: 'Quality cleaning services for Ocean County homes and businesses. Serving Toms River, Lakewood, Brick, and the entire Shore region.',
    heroBackgroundImageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920',
    ctaButton1Text: 'Get a Quote',
    ctaButton2Text: 'Contact Us',
    contactPhone: '(732) 555-0132',
    contactEmail: 'ocean@clensy.com',
    contactAddress: 'Ocean County, New Jersey',
    aboutTitle: 'About Our Ocean County Services',
    aboutDescription: 'Ocean County residents enjoy beautiful beaches and a relaxed lifestyle, and Clensy helps keep their homes just as beautiful. We serve communities from Toms River to the barrier islands.\n\nOur Ocean County team specializes in shore property maintenance, vacation rental turnovers, and year-round residential cleaning.',
  }
];

// Add operating hours to each location
locations.forEach(location => {
  location.operatingHours = [
    { day: 'Monday - Friday', hours: '8:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];
});

// Add service areas to each location
const serviceAreasByCounty = {
  'Bergen': ['Hackensack', 'Paramus', 'Fort Lee', 'Teaneck', 'Englewood', 'Ridgewood', 'Fair Lawn', 'Bergenfield', 'Garfield', 'Lodi'],
  'Essex': ['Newark', 'Montclair', 'Livingston', 'West Orange', 'Bloomfield', 'Nutley', 'Belleville', 'Irvington', 'Maplewood', 'South Orange'],
  'Hudson': ['Jersey City', 'Hoboken', 'Weehawken', 'Union City', 'North Bergen', 'West New York', 'Bayonne', 'Secaucus', 'Kearny', 'Harrison'],
  'Passaic': ['Paterson', 'Clifton', 'Wayne', 'Passaic', 'Hawthorne', 'Pompton Lakes', 'Little Falls', 'Totowa', 'Woodland Park', 'Ringwood'],
  'Union': ['Elizabeth', 'Westfield', 'Summit', 'Cranford', 'Scotch Plains', 'Rahway', 'Linden', 'Plainfield', 'Union', 'Springfield'],
  'Morris': ['Morristown', 'Parsippany', 'Madison', 'Denville', 'Randolph', 'Rockaway', 'Dover', 'Chatham', 'Florham Park', 'Morris Plains'],
  'Middlesex': ['New Brunswick', 'Edison', 'Woodbridge', 'Perth Amboy', 'Piscataway', 'Old Bridge', 'East Brunswick', 'South Brunswick', 'Sayreville', 'Metuchen'],
  'Monmouth': ['Red Bank', 'Freehold', 'Long Branch', 'Asbury Park', 'Middletown', 'Holmdel', 'Marlboro', 'Manalapan', 'Tinton Falls', 'Ocean Township'],
  'Somerset': ['Bridgewater', 'Franklin', 'Somerville', 'Hillsborough', 'Bound Brook', 'Bernardsville', 'Watchung', 'Warren', 'Bedminster', 'Montgomery'],
  'Ocean': ['Toms River', 'Lakewood', 'Brick', 'Jackson', 'Howell', 'Manchester', 'Barnegat', 'Point Pleasant', 'Seaside Heights', 'Long Beach Island']
};

locations.forEach(location => {
  location.serviceAreas = (serviceAreasByCounty[location.county] || []).map(name => ({ name }));
});

// ============================================
// MAIN SEED FUNCTION
// ============================================

async function seedServices() {
  console.log('\n📦 Seeding Services...\n');
  
  for (const service of services) {
    await createOrUpdate('/services', service);
  }
  
  console.log(`\n✅ Seeded ${services.length} services\n`);
}

async function seedLocations() {
  console.log('\n📍 Seeding Locations...\n');
  
  for (const location of locations) {
    await createOrUpdate('/locations', location);
  }
  
  console.log(`\n✅ Seeded ${locations.length} locations\n`);
}

async function main() {
  try {
    await authenticate();
    await seedServices();
    await seedLocations();
    
    console.log('\n🎉 All data seeded successfully!\n');
    console.log('📋 Next steps:');
    console.log('1. Go to Strapi Admin → Settings → Users & Permissions → Roles → Public');
    console.log('2. Enable "find" and "findOne" permissions for Services and Locations');
    console.log('3. Click Save');
    console.log('4. Publish all services and locations in Content Manager\n');
  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  }
}

main();
