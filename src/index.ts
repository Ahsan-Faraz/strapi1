import * as fs from 'fs';
import * as path from 'path';

export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
    const isProduction = process.env.NODE_ENV === 'production';
    if (!isProduction) {
      await seedTermsAndPrivacy(strapi);
      await seedCareers(strapi);
      await seedBergenServiceAreas(strapi);
    }
    const landingPageData = {
      heroTopLabel: "Professional Cleaning Services",
      heroHeading: "Professional cleaning for your home",
      heroSubheading: "We make it easy to get your home cleaned. Professional cleaning services tailored to your needs.",
      heroButtonText: "See my price",
      heroButtonLink: "/booking",
      heroFeature1: "30-second pricing",
      heroFeature2: "100% Satisfaction guaranteed",
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
      checklistHeading: "Our Cleaning Checklist",
      checklistDescription: "We follow a comprehensive 50-point checklist to ensure nothing is missed during your cleaning service.",
      checklistButtonText: "View Full Checklist",
      checklistItems: {
        livingRoom: {
          routine: ["Dust all surfaces", "Vacuum carpets", "Mop floors", "Clean mirrors", "Empty trash", "Wipe switches", "Straighten cushions", "Dust fans"],
          deep: ["Clean windows", "Deep clean upholstery", "Clean baseboards", "Dust blinds", "Clean vents", "Move furniture"],
          moving: ["Clean cabinets", "Clean closets", "Remove wall marks", "Deep clean floors"]
        },
        kitchen: {
          routine: ["Clean countertops", "Clean appliances", "Clean stovetop", "Clean sink", "Wipe cabinets", "Mop floors", "Empty trash", "Clean microwave"],
          deep: ["Clean oven", "Clean refrigerator", "Degrease hood", "Clean dishwasher", "Deep clean grout"],
          moving: ["Clean all cabinets", "Clean behind appliances", "Remove shelf liners"]
        },
        bathroom: {
          routine: ["Sanitize toilet", "Clean shower", "Clean sink", "Clean mirrors", "Mop floors", "Empty trash", "Replace towels", "Wipe handles"],
          deep: ["Deep clean grout", "Clean exhaust fan", "Descale showerhead", "Clean medicine cabinet", "Polish fixtures"],
          moving: ["Clean all cabinets", "Remove soap scum", "Clean behind toilet"]
        },
        bedroom: {
          routine: ["Make beds", "Dust surfaces", "Vacuum carpets", "Mop floors", "Empty trash", "Dust fan", "Clean mirrors", "Organize items"],
          deep: ["Vacuum under bed", "Clean closet", "Dust blinds", "Clean baseboards", "Flip mattress"],
          moving: ["Clean all closets", "Clean all drawers", "Remove wall marks"]
        }
      },
      comparisonHeading: "The Clensy <blue>Difference</blue>",
      comparisonDescription: "We're leading the cleaning industry in customer satisfaction and service quality.",
      comparisonButtonText: "Book Now",
      comparisonFeatures: [
        { name: "Locally Owned and Operated", clensy: true, others: true, icon: "users" },
        { name: "Customized Cleaning Packages", clensy: true, others: true, icon: "settings" },
        { name: "Easy Online Booking", clensy: true, others: false, icon: "calendar" },
        { name: "Over The Phone Estimates", clensy: true, others: false, icon: "phone" },
        { name: "Bonded and Insured", clensy: true, others: false, icon: "shield-check" },
        { name: "Eco-Friendly Supplies", clensy: true, others: false, icon: "leaf" },
        { name: "Background Checked Cleaners", clensy: true, others: false, icon: "user-check" },
        { name: "PRO Clean Promise", clensy: true, others: false, icon: "medal" },
        { name: "Premium Cleaning Supplies", clensy: true, others: false, icon: "sparkles" }
      ],
      reviewsHeading: "What People Are <blue>Saying About Us</blue>",
      reviewsButtonText: "Load More",
      testimonials: [
        { name: "Sarah Johnson", title: "1 day ago", text: "Monica was excellent. Everything was spotless!", rating: 5, initial: "S", initialColor: "#9C27B0" },
        { name: "Michael Chen", title: "3 days ago", text: "Clensy does the best job. Very thorough and professional.", rating: 5, initial: "M", initialColor: "#4CAF50" },
        { name: "Emily Rodriguez", title: "1 week ago", text: "Great job! Kitchen and bathroom spotless.", rating: 5, initial: "E", initialColor: "#E91E63" },
        { name: "David Thompson", title: "2 weeks ago", text: "Susan did a great job on the kitchen.", rating: 5, initial: "D", initialColor: "#FF5722" }
      ],
      ctaHeading: "Home cleaning you can trust",
      ctaDescription: "Book our professional cleaning services today and experience the difference.",
      ctaLeftCardTitle: "Order online",
      ctaLeftCardDescription: "Our easy online pricing lets you set up a cleaning plan right now.",
      ctaLeftCardButtonText: "See my price",
      ctaRightCardTitle: "Call us now",
      ctaRightCardDescription: "Need more information? Prefer a friendly voice over the phone?",
      ctaRightCardButtonText: "(551) 305-4081"
    };

    try {
      console.log('🌱 Checking Landing Page...');
      
      // Use entityService for Strapi v5
      const existing = await strapi.entityService.findMany('api::landing-page.landing-page', {
        limit: 1
      });
      
      console.log('Existing records:', existing ? (Array.isArray(existing) ? existing.length : 1) : 0);
      
      if (!existing || (Array.isArray(existing) && existing.length === 0)) {
        console.log('🌱 Creating Landing Page with default content...');
        
        const created = await strapi.entityService.create('api::landing-page.landing-page', {
          data: {
            ...landingPageData,
            publishedAt: new Date()
          }
        });
        
        console.log('✅ Landing Page created! ID:', created?.id);
      } else {
        const record = Array.isArray(existing) ? existing[0] : existing;
        
        // Check if it has content
        if (!record.heroHeading) {
          console.log('🌱 Updating Landing Page with default content...');
          
          await strapi.entityService.update('api::landing-page.landing-page', record.id, {
            data: {
              ...landingPageData,
              publishedAt: new Date()
            }
          });
          
          console.log('✅ Landing Page updated!');
        } else {
          console.log('📄 Landing Page already has content:', record.heroHeading);
        }
      }
    } catch (error: any) {
      console.error('❌ Bootstrap error:', error?.message || error);
    }
  },
};

async function seedTermsAndPrivacy(strapi: any) {
  try {
    const dataDir = path.join(__dirname, 'data');
    const termsSectionsPath = path.join(dataDir, 'terms-sections.json');
    const privacySectionsPath = path.join(dataDir, 'privacy-sections.json');

    const termsSections = fs.existsSync(termsSectionsPath)
      ? JSON.parse(fs.readFileSync(termsSectionsPath, 'utf-8'))
      : [];
    const privacySections = fs.existsSync(privacySectionsPath)
      ? JSON.parse(fs.readFileSync(privacySectionsPath, 'utf-8'))
      : [];

    const termsData = {
      heroHeading: 'Terms & Conditions',
      heroDescription: 'Please read these terms and conditions carefully before using our services',
      websiteUrl: 'clensy.com',
      companyEmail: 'info@clensy.com',
      companyPhone: '(551) 305-4081',
      lastUpdated: 'February 2025',
      agreementDescription: "By booking any service with Clensy LLC (\"Clensy Cleaning\"), either through our website, over the phone, or by email/text, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, do not proceed with booking a service.",
      sections: termsSections,
      publishedAt: new Date(),
    };

    const privacyData = {
      heroHeading: 'Privacy Policy',
      heroDescription: 'Your privacy is important to us. Learn how we collect, use, and protect your information.',
      websiteUrl: 'clensy.com',
      companyEmail: 'Info@clensycleaning.com',
      companyPhone: '(551) 305-4081',
      lastUpdated: 'February 2025',
      sections: privacySections,
      smsConsentDescription: 'By opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Clensy Cleaning. This includes SMS messages for appointment scheduling, appointment reminders, post-visit instructions, and billing notifications. Message frequency varies. Message and data rates may apply. See our privacy policy at https://clensy.com/privacy-policy. Message HELP for help. Reply STOP to any message to opt out.',
      smsOptOutInstructions: 'To opt out of SMS messages, reply STOP to any message. For help, reply HELP or contact us at Info@clensycleaning.com.',
      publishedAt: new Date(),
    };

    console.log('🌱 Checking Terms of Service...');
    const existingTerms = await strapi.entityService.findMany('api::terms-of-service.terms-of-service', { limit: 1 });
    const termsRecord = Array.isArray(existingTerms) ? existingTerms[0] : existingTerms;

    if (!termsRecord) {
      console.log('🌱 Creating Terms of Service...');
      await strapi.entityService.create('api::terms-of-service.terms-of-service', { data: termsData });
      console.log('✅ Terms of Service created!');
    } else {
      console.log('🌱 Updating Terms of Service with new content...');
      await strapi.entityService.update('api::terms-of-service.terms-of-service', termsRecord.id, { data: termsData });
      console.log('✅ Terms of Service updated!');
    }

    console.log('🌱 Checking Privacy Policy...');
    const existingPrivacy = await strapi.entityService.findMany('api::privacy-policy.privacy-policy', { limit: 1 });
    const privacyRecord = Array.isArray(existingPrivacy) ? existingPrivacy[0] : existingPrivacy;

    if (!privacyRecord) {
      console.log('🌱 Creating Privacy Policy...');
      await strapi.entityService.create('api::privacy-policy.privacy-policy', { data: privacyData });
      console.log('✅ Privacy Policy created!');
    } else {
      console.log('🌱 Updating Privacy Policy with new content...');
      await strapi.entityService.update('api::privacy-policy.privacy-policy', privacyRecord.id, { data: privacyData });
      console.log('✅ Privacy Policy updated!');
    }
  } catch (error: any) {
    console.error('❌ Terms/Privacy seed error:', error?.message || error);
  }
}

async function seedCareers(strapi: any) {
  try {
    const careersData = {
      heroTopLabel: 'Now Hiring - Multiple Positions',
      heroHeading: 'Join The Clensy Team',
      heroDescription:
        "Build a rewarding career with New Jersey's premier cleaning service. We offer competitive pay, great benefits, and opportunities for growth in a supportive environment.",
      heroPrimaryButtonText: 'View Open Positions',
      heroSecondaryButtonText: 'Apply Now',
      heroTeamMembersCount: '50+',
      heroImageUrl:
        'https://www.stathakis.com/hs-fs/hubfs/cleaning-team-more-efficient.png?width=837&height=554&name=cleaning-team-more-efficient.png',
      benefitsHeading: 'Why Work With Us?',
      benefitsDescription:
        'We believe in taking care of our team members because happy employees provide the best service to our customers.',
      benefits: [
        { icon: 'DollarSign', title: 'Competitive Pay', description: 'Above-market wages with performance bonuses and regular raises' },
        { icon: 'Shield', title: 'Health Benefits', description: 'Comprehensive health, dental, and vision insurance coverage' },
        { icon: 'Clock', title: 'Flexible Schedule', description: 'Work-life balance with flexible hours and part-time options' },
        { icon: 'TrendingUp', title: 'Career Growth', description: 'Training programs and advancement opportunities within the company' },
        { icon: 'Users', title: 'Team Environment', description: 'Supportive team culture with collaborative work environment' },
        { icon: 'Award', title: 'Recognition Program', description: 'Employee of the month awards and performance recognition' },
      ],
      positionsHeading: 'Open Positions',
      positionsDescription: 'Find the perfect role that matches your skills and career goals.',
      positions: [
        {
          title: 'Residential Cleaner',
          type: 'Full-time / Part-time',
          location: 'Multiple NJ Counties',
          description: 'Join our residential cleaning team and help families maintain beautiful, clean homes.',
          requirements: [
            'Previous cleaning experience preferred but not required',
            'Reliable transportation',
            'Attention to detail',
            'Physical ability to perform cleaning tasks',
            'Background check required',
          ],
          salary: '$18-22/hour',
          link: 'https://jobs.gusto.com/postings/clensy-cleaning-residential-cleaner-3c7fb08b-f3fa-4a1a-b198-b2490e6ff648',
        },
        {
          title: 'Commercial Cleaner',
          type: 'Full-time / Part-time',
          location: 'Multiple NJ Counties',
          description: 'Clean offices, medical facilities, and commercial spaces with our professional team.',
          requirements: ['Experience in commercial cleaning preferred', 'Ability to work evenings/weekends', 'Reliable and punctual', 'Team player attitude', 'Background check required'],
          salary: '$19-23/hour',
          link: '',
        },
        {
          title: 'Team Leader',
          type: 'Full-time',
          location: 'Bergen County',
          description: 'Lead a team of cleaners and ensure quality standards are met on every job.',
          requirements: ['2+ years cleaning experience', 'Leadership experience', 'Valid driver\'s license', 'Excellent communication skills', 'Quality control mindset'],
          salary: '$25-30/hour',
          link: '',
        },
        {
          title: 'Customer Service Representative',
          type: 'Full-time',
          location: 'Remote/Office',
          description: 'Help customers schedule services and manage their cleaning needs.',
          requirements: ['Customer service experience', 'Excellent phone skills', 'Computer proficiency', 'Problem-solving abilities', 'Bilingual (English/Spanish) preferred'],
          salary: '$17-21/hour',
          link: '',
        },
      ],
      testimonialsHeading: 'What Our Team Says',
      testimonialsDescription: 'Hear from our employees about their experience working at Clensy.',
      employeeTestimonials: [
        { name: 'Sarah M.', position: 'Residential Cleaner', content: "I love working at Clensy! The team is supportive, the pay is great, and I have the flexibility I need for my family.", rating: 5 },
        { name: 'Mike Rodriguez', position: 'Team Leader', content: "Started as a cleaner and worked my way up to team leader. Clensy really invests in their employees' growth.", rating: 5 },
        { name: 'Lisa Chen', position: 'Commercial Cleaner', content: "Best cleaning company I've worked for. They provide all the equipment and training you need to succeed.", rating: 5 },
      ],
      applicationHeading: 'Ready to Join Our Team?',
      applicationDescription: "Fill out the application below and we'll get back to you within 24 hours.",
      applicationSubmitButtonText: 'Submit Application',
      contactHeading: 'Have Questions About Working With Us?',
      contactDescription: 'Contact our HR team for more information about career opportunities.',
      contactPhoneText: 'Call Us: (551) 305-4081',
      contactEmailText: 'Email: careers@clensy.com',
      applicationFormEnabled: true,
      publishedAt: new Date(),
    };

    console.log('🌱 Checking Careers Page...');
    const existing = await strapi.entityService.findMany('api::careers-page.careers-page', { limit: 1 });
    const record = Array.isArray(existing) ? existing[0] : existing;

    if (!record) {
      console.log('🌱 Creating Careers Page...');
      await strapi.entityService.create('api::careers-page.careers-page', { data: careersData });
      console.log('✅ Careers Page created!');
    } else {
      console.log('🌱 Updating Careers Page with full content...');
      await strapi.entityService.update('api::careers-page.careers-page', record.id, { data: careersData });
      console.log('✅ Careers Page updated!');
    }
  } catch (error: any) {
    console.error('❌ Careers seed error:', error?.message || error);
  }
}

async function seedBergenServiceAreas(strapi: any) {
  try {
    const dataPath = path.join(__dirname, 'data', 'bergen-service-areas.json');
    if (!fs.existsSync(dataPath)) {
      console.log('⏭️ bergen-service-areas.json not found, skipping Bergen seed');
      return;
    }
    const townNames = JSON.parse(fs.readFileSync(dataPath, 'utf-8')) as string[];
    const serviceAreas = townNames.map((name) => ({ name }));

    const bergenList = await strapi.entityService.findMany('api::location.location', {
      filters: { slug: 'bergen' },
      limit: 1,
    });
    const bergen = Array.isArray(bergenList) ? bergenList[0] : bergenList;
    if (!bergen) {
      console.log('⏭️ Bergen location not found, skipping service areas seed');
      return;
    }

    await strapi.entityService.update('api::location.location', bergen.id, {
      data: { serviceAreas, publishedAt: bergen.publishedAt ?? new Date() },
    });
    console.log(`✅ Bergen County updated with ${townNames.length} service areas`);
  } catch (error: any) {
    console.error('❌ Bergen seed error:', error?.message || error);
  }
}
