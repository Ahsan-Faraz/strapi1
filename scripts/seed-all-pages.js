/**
 * Seed All Pages Data via Strapi Admin API
 * 
 * This script seeds all page content including:
 * - About Page
 * - FAQ Page
 * - Contact Page
 * - Privacy Policy
 * - Terms of Service
 * - Checklist Page
 * 
 * Usage: 
 *   set STRAPI_ADMIN_EMAIL=ahsanfaraz564@gmail.com
 *   set STRAPI_ADMIN_PASSWORD=AAhsanfaraz176
 *   node scripts/seed-all-pages.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-8d56.up.railway.app';
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD;

// ============================================
// ABOUT PAGE DATA
// ============================================
const aboutPageData = {
  // SEO Fields
  seoTitle: "About Clensy | Professional Cleaning Services in New Jersey",
  seoMetaDescription: "Learn about Clensy - New Jersey's trusted professional cleaning company. Our story, mission, and commitment to exceptional cleaning services.",
  seoKeywords: "about clensy, cleaning company, professional cleaners, New Jersey cleaning service, our story, cleaning team",
  seoCanonicalUrl: "https://clensy.com/company/about",
  seoRobots: "index, follow",
  ogTitle: "About Clensy | Professional Cleaning Services",
  ogDescription: "Discover the Clensy difference. Professional, reliable cleaning services for homes and businesses in New Jersey.",
  ogImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847413/shutterstock_2138293517_1_nqcmei.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "About Clensy | Professional Cleaning Services",
  twitterDescription: "Discover the Clensy difference. Professional, reliable cleaning services.",
  schemaJsonLd: {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Clensy",
    "description": "Learn about Clensy - New Jersey's trusted professional cleaning company",
    "url": "https://clensy.com/company/about",
    "mainEntity": {
      "@type": "Organization",
      "name": "Clensy",
      "description": "Professional cleaning services for homes and offices in New Jersey",
      "url": "https://clensy.com",
      "telephone": "(551) 305-4081",
      "email": "info@clensy.com"
    }
  },
  headScripts: "",
  bodyStartScripts: "",
  bodyEndScripts: "",
  customCss: "",
  
  // Hero Section
  heroHeading: "About Clensy",
  heroTagline: "Raising the Standard, One Clean at a Time.",
  heroBackgroundImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069427/website-images/guvnsgfqcmcx8k1gusum.jpg",
  
  // Our Story Section
  ourStoryHeading: "Our Story",
  ourStoryParagraph1: "Clensy was built to solve a problem — the frustrating experience of unreliable cleaners who are late, don't communicate, and leave you wondering if the job will ever be done right.",
  ourStoryParagraph2: "We set out to create something better. A company that not only delivers amazing results — but makes the entire experience seamless from start to finish.",
  ourStoryParagraph3: "Whether you're managing a busy home, multiple Airbnb properties, or a commercial space that needs to stay spotless and presentable, Clensy is your go-to team.",
  ourStoryImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847413/shutterstock_2138293517_1_nqcmei.jpg",
  
  // Why We Started Section
  whyWeStartedHeading: "Why We Started",
  whyWeStartedSubtitle: "Let's be honest: the cleaning industry is broken.",
  whyWeStartedQuoteText: "My cleaner didn't show up. No one responded. The job was half-done.",
  whyWeStartedParagraph1: "We were tired of the low standards across the industry – Whether it's flaky independent cleaners or cookie-cutter franchises with zero customer service — it's hard to find a company that actually cares and does the job right.",
  whyWeStartedParagraph2: "We listened. And then we built Clensy — a cleaning company that actually shows up, delivers exceptional results, and treats every client like a priority.",
  whyWeStartedParagraph3: "We know that when you book a cleaning, you want peace of mind — not more headaches.",
  
  // What Makes Us Different Section
  whatMakesUsDifferentHeading: "What Makes Us Different?",
  residentialCommercialTitle: "Residential & Commercial Cleaning",
  residentialCommercialParagraph1: "From homes and apartments to offices, retail spaces, gyms, medical facilities, and even construction sites — if it's indoors and needs to be cleaned, we've got it covered.",
  residentialCommercialParagraph2: "Not sure if we handle your specific needs? Chances are, we do. If you're looking for something custom, head over to our Contact Us page or give us a call. We're happy to create a tailored plan that fits exactly what you're looking for.",
  eliteTeamTitle: "Elite Team",
  eliteTeamParagraph1: "Out of every 100 applicants, we only hire 1 cleaner. Seriously. Our hiring process is extensive, and only the best make it through.",
  eliteTeamParagraph2: "We're fully licensed, bonded, and insured, so you can feel confident knowing your home, business, or property is in trusted, professional hands.",
  eliteTeamImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847481/shutterstock_2200915291_vewsyn.jpg",
  
  // Client-Focused Tech
  clientFocusedTechHeading: "Client-Focused Tech",
  clientFocusedTechFeatures: [
    "Customer portal to manage your bookings",
    "Text/email reminders before every job",
    "Real-time ETA when your cleaner is en route",
    "Secure online payments for convenience"
  ],
  
  // Who We Serve Section
  whoWeServeHeading: "Who We Serve",
  whoWeServeSubtitle: "Clensy is made for people and businesses who expect more from a cleaning company.",
  customerTypes: [
    { title: "Busy parents", description: "Who need a safe, clean home without the stress" },
    { title: "Professionals and entrepreneurs", description: "Focused on growing, not cleaning" },
    { title: "Property managers and business owners", description: "Who need reliable commercial upkeep" },
    { title: "Airbnb hosts", description: "Who demand fast, spotless turnovers" },
    { title: "Contractors or developers", description: "Who need sharp post-construction cleanup" },
    { title: "Anyone who values quality", description: "And needs a trustworthy cleaning service" }
  ],
  
  // Our Mission Section
  ourMissionHeading: "Our Mission",
  ourMissionParagraph1: "We're obsessed with making the cleaning process feel effortless for our clients. You book. We show up. We do the job right — the first time.",
  ourMissionParagraph2: "No rescheduling nightmares. No communication breakdowns. No wondering if your space was actually cleaned.",
  ourMissionParagraph3: "With Clensy, you get a team that's committed to your satisfaction — from the first message to the final wipe-down.",
  ourMissionParagraph4: "If you're looking for a company that understands the value of your time, respects your space, and consistently delivers results — welcome to Clensy.",
  ourMissionClosingLine: "We're here to raise the standard.",
  
  // CTA Section
  ctaHeading: "Ready to Experience the Clensy Difference?",
  ctaDescription: "Join thousands of satisfied customers who've discovered what a truly exceptional cleaning service feels like.",
  ctaBookButtonText: "Book Your Cleaning",
  ctaContactButtonText: "Contact Us"
};


// ============================================
// FAQ PAGE DATA
// ============================================
const faqPageData = {
  // SEO Fields
  seoTitle: "FAQ | Frequently Asked Questions | Clensy Cleaning Services",
  seoMetaDescription: "Find answers to common questions about Clensy cleaning services, booking, pricing, and more. Get the information you need about our professional cleaning.",
  seoKeywords: "cleaning FAQ, cleaning questions, house cleaning FAQ, professional cleaning questions, Clensy FAQ, cleaning service questions",
  seoCanonicalUrl: "https://clensy.com/faq",
  seoRobots: "index, follow",
  ogTitle: "FAQ | Clensy Cleaning Services",
  ogDescription: "Get answers to your cleaning questions. Learn about our services, pricing, and booking process.",
  ogImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847616/shutterstock_2209715823_1_x80cn8.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "FAQ | Clensy Cleaning Services",
  twitterDescription: "Get answers to your cleaning questions.",
  schemaJsonLd: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide cleaning services throughout Northern New Jersey, including Bergen, Essex, Hudson, Passaic, and Union counties."
        }
      },
      {
        "@type": "Question",
        "name": "Are your cleaners background checked?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, all of our cleaning professionals undergo thorough background checks before joining our team."
        }
      },
      {
        "@type": "Question",
        "name": "Are you insured and bonded?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we are fully insured and bonded, providing protection for both our clients and our team."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to be home during the cleaning?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, you don't need to be home. Many clients provide a key or access instructions."
        }
      }
    ]
  },
  headScripts: "",
  bodyEndScripts: "",
  customCss: "",
  
  // Hero Section
  heroTopLabel: "Answers to your questions",
  heroHeading: "Frequently Asked <blue>Questions</blue>",
  heroDescription: "Find answers to common questions about our cleaning services, booking process, and pricing. Can't find what you're looking for? Contact us directly for personalized assistance.",
  heroBackgroundImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847616/shutterstock_2209715823_1_x80cn8.jpg",
  
  // FAQ Categories
  faqCategories: {
    general: {
      name: "General Questions",
      questions: [
        { question: "What areas do you serve?", answer: "We provide cleaning services throughout Northern New Jersey, including Bergen, Essex, Hudson, Passaic, and Union counties. We serve all major cities and towns within these counties." },
        { question: "Are your cleaners background checked?", answer: "Yes, all of our cleaning professionals undergo thorough background checks before joining our team. We prioritize your safety and security, and only employ trustworthy individuals with verified credentials." },
        { question: "Are you insured and bonded?", answer: "Yes, we are fully insured and bonded. This provides protection for both our clients and our team in the rare event of an accident or damage during service." },
        { question: "What cleaning products do you use?", answer: "We use a combination of industry-grade professional cleaning products and eco-friendly options. If you have specific preferences or concerns about allergies, we're happy to accommodate your needs with alternative products." },
        { question: "Do I need to be home during the cleaning?", answer: "No, you don't need to be home during the cleaning service. Many of our clients provide a key or access instructions. We ensure secure handling of all property access methods and can arrange for secure key return or storage." }
      ]
    }
  },
  
  // Still Have Questions Section
  stillHaveQuestionsHeading: "Still Have Questions?",
  stillHaveQuestionsDescription: "Here are some other topics our customers frequently ask about.",
  stillHaveQuestionsCards: [
    { title: "First-Time Customers", description: "Learn what to expect during your first cleaning appointment and how to prepare your space.", buttonText: "Get More Information", buttonLink: "/contact", icon: "clock" },
    { title: "Pricing & Estimates", description: "Learn more about our transparent pricing structure and how to get an accurate estimate for your property.", buttonText: "View Pricing", buttonLink: "/booking", icon: "credit-card" },
    { title: "Service Areas", description: "Find out if we service your area and learn about our coverage throughout Northern New Jersey.", buttonText: "Check Service Areas", buttonLink: "/locations", icon: "calendar" }
  ],
  
  // Contact Section
  contactSectionHeading: "Can't Find Your Answer?",
  contactSectionDescription: "Our customer service team is ready to help with any questions not addressed in our FAQ section. Contact us for personalized assistance.",
  contactEmailHeading: "Email Us",
  contactEmailDescription: "Send us a message and we'll respond within 24 hours.",
  contactEmail: "info@clensy.com",
  contactCallHeading: "Call Us",
  contactCallDescription: "Speak with our customer service team directly.",
  contactPhone: "(551) 305-4081",
  contactButtonText: "Contact Us",
  
  // Trust Indicators
  trustIndicators: [
    { number: "1000+", description: "Questions Answered" },
    { number: "24/7", description: "Online Support" },
    { number: "5.0", description: "Customer Satisfaction" },
    { number: "15+", description: "Years of Experience" }
  ]
};


// ============================================
// CONTACT PAGE DATA
// ============================================
const contactPageData = {
  // SEO Fields
  seoTitle: "Contact Us | Clensy Professional Cleaning Services",
  seoMetaDescription: "Get in touch with Clensy for professional cleaning services in New Jersey. Call us, email us, or fill out our contact form for a free quote.",
  seoKeywords: "contact clensy, cleaning service contact, New Jersey cleaning company, get a quote, cleaning consultation, cleaning service phone",
  seoCanonicalUrl: "https://clensy.com/contact",
  seoRobots: "index, follow",
  ogTitle: "Contact Clensy | Professional Cleaning Services",
  ogDescription: "Ready for a cleaner space? Contact Clensy today for professional cleaning services.",
  ogImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847694/shutterstock_2478230727_bt7fos.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Contact Clensy | Professional Cleaning Services",
  twitterDescription: "Ready for a cleaner space? Contact Clensy today.",
  schemaJsonLd: {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Clensy",
    "description": "Get in touch with Clensy for professional cleaning services",
    "url": "https://clensy.com/contact",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "Clensy",
      "telephone": "(551) 305-4081",
      "email": "info@clensy.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Jersey City",
        "addressRegion": "NJ",
        "postalCode": "07302",
        "addressCountry": "US"
      },
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "opens": "08:00", "closes": "18:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Saturday", "opens": "09:00", "closes": "15:00" }
      ]
    }
  },
  headScripts: "",
  bodyEndScripts: "",
  customCss: "",
  
  // Hero Section
  heroTopLabel: "We'd Love To Hear From You",
  heroHeading: "Let's Start A <blue>Conversation</blue>",
  heroDescription: "Have questions or need a personalized cleaning solution? Our team is ready to provide the support you need for all your requirements.",
  heroSendMessageButtonText: "Send a Message",
  heroSupportText: "24/7 Support",
  heroResponseText: "Quick Response",
  heroImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847694/shutterstock_2478230727_bt7fos.jpg",
  
  // Trust Section
  trustMainText: "Trusted by 5,000+ Customers",
  trustSubtitle: "Professional cleaning for every need",
  serviceTags: [{ name: "Residential" }, { name: "Commercial" }, { name: "Specialized" }],
  
  // Stats Section
  statsIndicators: [
    { number: "24/7", description: "Customer Support" },
    { number: "1h", description: "Response Time" },
    { number: "4.9", description: "Customer Rating" },
    { number: "100%", description: "Satisfaction Guarantee" }
  ],
  
  // Contact Information
  contactSectionTitle: "Contact Information",
  phoneTitle: "Phone",
  phoneDescription: "Speak directly with our customer service team",
  phoneNumber: "(551) 305-4081",
  emailTitle: "Email",
  emailDescription: "Get a response within 24 hours",
  emailAddress: "info@clensy.com",
  officeTitle: "Office Location",
  officeDescription: "Our headquarters",
  addressLine1: "123 Cleaning Street",
  addressLine2: "Suite 456",
  cityStateZip: "Jersey City, NJ 07302",
  businessHoursTitle: "Business Hours",
  businessHoursDescription: "When you can reach us",
  businessHours: [
    { day: "Monday - Friday", hours: "8:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "9:00 AM - 3:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ],
  immediateAssistanceTitle: "Need Immediate Assistance?",
  immediateAssistanceDescription: "Our customer support team is available during business hours to help you with any questions.",
  immediateAssistanceButtonText: "Call Us Now",
  
  // Consultation Section
  consultationHeading: "Need a Personalized Cleaning Solution?",
  consultationDescription: "Schedule a consultation with our cleaning experts to discuss your unique requirements and get a customized cleaning plan tailored to your specific needs.",
  consultationButtonText: "Schedule a Consultation"
};


// ============================================
// PRIVACY POLICY DATA
// ============================================
const privacyPolicyData = {
  // SEO Fields
  seoTitle: "Privacy Policy | Clensy Cleaning Services",
  seoMetaDescription: "Read Clensy's privacy policy. Learn how we collect, use, and protect your personal information when you use our cleaning services.",
  seoKeywords: "privacy policy, data protection, personal information, Clensy privacy, data security",
  seoCanonicalUrl: "https://clensy.com/privacy-policy",
  seoRobots: "index, follow",
  ogTitle: "Privacy Policy | Clensy",
  ogDescription: "Your privacy is important to us. Learn how Clensy protects your information.",
  ogType: "website",
  twitterCard: "summary",
  headScripts: "",
  bodyEndScripts: "",
  
  // Content
  heroHeading: "Privacy Policy",
  heroDescription: "Your privacy is important to us. Learn how we collect, use, and protect your information.",
  websiteUrl: "clensy.com",
  companyEmail: "info@clensy.com",
  companyPhone: "(551) 305-4081",
  
  sections: [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, such as when you create an account, book a service, or contact us for support. This may include:\n\n• Name and contact information (email, phone number, address)\n• Payment information\n• Service preferences and history\n• Communications with our team",
      order: 1
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to:\n\n• Provide, maintain, and improve our services\n• Process transactions and send related information\n• Send promotional communications (with your consent)\n• Respond to your comments, questions, and requests\n• Monitor and analyze trends, usage, and activities",
      order: 2
    },
    {
      title: "3. Information Sharing",
      content: "We do not sell, trade, or otherwise transfer your personal information to outside parties except:\n\n• To trusted third parties who assist us in operating our website and conducting our business\n• When required by law or to protect our rights\n• With your consent",
      order: 3
    },
    {
      title: "4. Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.",
      order: 4
    },
    {
      title: "5. Your Rights",
      content: "You have the right to:\n\n• Access your personal information\n• Correct inaccurate data\n• Request deletion of your data\n• Opt-out of marketing communications\n• Lodge a complaint with a supervisory authority",
      order: 5
    },
    {
      title: "6. Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
      order: 6
    },
    {
      title: "7. Changes to This Policy",
      content: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date.",
      order: 7
    }
  ],
  
  smsConsentDescription: "By providing your phone number, you consent to receive SMS messages from Clensy regarding your bookings, service updates, and promotional offers. Message and data rates may apply.",
  smsOptOutInstructions: "To opt out of SMS messages, reply STOP to any message. For help, reply HELP or contact us at info@clensy.com."
};


// ============================================
// TERMS OF SERVICE DATA
// ============================================
const termsOfServiceData = {
  // SEO Fields
  seoTitle: "Terms of Service | Clensy Cleaning Services",
  seoMetaDescription: "Read Clensy's terms of service. Understand the terms and conditions for using our professional cleaning services.",
  seoKeywords: "terms of service, terms and conditions, cleaning service terms, Clensy terms, service agreement",
  seoCanonicalUrl: "https://clensy.com/terms-of-service",
  seoRobots: "index, follow",
  ogTitle: "Terms of Service | Clensy",
  ogDescription: "Terms and conditions for using Clensy cleaning services.",
  ogType: "website",
  twitterCard: "summary",
  headScripts: "",
  bodyEndScripts: "",
  
  // Content
  heroHeading: "Terms & Conditions",
  heroDescription: "Please read these terms and conditions carefully before using our services",
  websiteUrl: "clensy.com",
  companyEmail: "info@clensy.com",
  companyPhone: "(551) 305-4081",
  agreementDescription: "By booking any service with Clensy LLC ('Clensy Cleaning'), either through our website, over the phone, or by email/text, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, do not proceed with booking a service.",
  
  sections: [
    {
      title: "1. Service Agreement",
      content: "By booking a cleaning service with Clensy, you agree to these terms and conditions. Our services are provided on an as-is basis, and we reserve the right to refuse service to anyone for any reason.",
      order: 1
    },
    {
      title: "2. Booking and Cancellation",
      content: "• Bookings can be made online, by phone, or email\n• Cancellations must be made at least 24 hours before the scheduled service\n• Late cancellations (less than 24 hours) may incur a cancellation fee of up to 50% of the service cost\n• No-shows will be charged the full service amount",
      order: 2
    },
    {
      title: "3. Payment Terms",
      content: "• Payment is due upon completion of service unless otherwise arranged\n• We accept major credit cards, debit cards, and electronic payments\n• Recurring service customers may set up automatic billing\n• Prices are subject to change with 30 days notice for recurring customers",
      order: 3
    },
    {
      title: "4. Service Guarantee",
      content: "We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with our cleaning, contact us within 24 hours and we'll return to re-clean the areas of concern at no additional charge.",
      order: 4
    },
    {
      title: "5. Access and Security",
      content: "• You must provide safe and reasonable access to your property\n• If providing keys or access codes, you authorize our team to enter your property\n• We maintain strict security protocols for all access information\n• Pets should be secured during cleaning for safety",
      order: 5
    },
    {
      title: "6. Liability and Insurance",
      content: "• Clensy is fully insured and bonded\n• We are not liable for damage to items not properly secured or fragile items not disclosed\n• Claims for damage must be reported within 24 hours of service\n• Our liability is limited to the cost of repair or replacement, not exceeding the service cost",
      order: 6
    },
    {
      title: "7. Customer Responsibilities",
      content: "• Ensure a safe working environment for our team\n• Disclose any hazardous materials or conditions\n• Secure valuables and fragile items\n• Provide accurate information about your property",
      order: 7
    },
    {
      title: "8. Privacy",
      content: "Your privacy is important to us. Please refer to our Privacy Policy for information on how we collect, use, and protect your personal information.",
      order: 8
    },
    {
      title: "9. Changes to Terms",
      content: "We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to our website. Continued use of our services constitutes acceptance of modified terms.",
      order: 9
    }
  ]
};


// ============================================
// CHECKLIST PAGE DATA
// ============================================
const checklistPageData = {
  // SEO Fields
  seoTitle: "Our Cleaning Checklist | Clensy Professional Cleaning",
  seoMetaDescription: "Explore Clensy's comprehensive cleaning checklist. See exactly what's included in our routine, deep, and move-in/out cleaning services for every room.",
  seoKeywords: "cleaning checklist, house cleaning checklist, professional cleaning checklist, deep cleaning checklist, move out cleaning checklist, 50 point checklist",
  seoCanonicalUrl: "https://clensy.com/company/checklist",
  seoRobots: "index, follow",
  ogTitle: "Our Cleaning Checklist | Clensy",
  ogDescription: "See our comprehensive cleaning checklist. We don't miss a spot!",
  ogImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069438/website-images/j5wxvoguffksq4fwffuc.svg",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Our Cleaning Checklist | Clensy",
  twitterDescription: "See our comprehensive cleaning checklist. We don't miss a spot!",
  schemaJsonLd: {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Clensy Cleaning Checklist",
    "description": "Comprehensive cleaning checklist for routine, deep, and move-in/out cleaning services",
    "step": [
      { "@type": "HowToStep", "name": "Kitchen Cleaning", "text": "Sweep, vacuum, mop floors, wipe countertops, clean appliances, scrub sink" },
      { "@type": "HowToStep", "name": "Bathroom Cleaning", "text": "Scrub showers and tubs, disinfect toilets, clean mirrors, polish fixtures" },
      { "@type": "HowToStep", "name": "Bedroom Cleaning", "text": "Vacuum floors, make beds, dust surfaces, clean mirrors" },
      { "@type": "HowToStep", "name": "Living Area Cleaning", "text": "Vacuum furniture, dust surfaces, clean glass, organize room" }
    ]
  },
  headScripts: "",
  bodyEndScripts: "",
  customCss: "",
  
  // Hero Section
  heroHeading: "Our Clensy Cleaning <blue>Checklist</blue>",
  heroDescription: "We've developed a comprehensive cleaning system that ensures nothing is overlooked. Every detail matters, and our meticulous approach guarantees exceptional results.",
  heroSubDescription: "From high-touch surfaces to hidden corners, our trained professionals follow a systematic process that transforms your space into a spotless sanctuary you can trust.",
  heroBackgroundImageUrl: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?q=80&w=2070&auto=format&fit=crop",
  heroCtaButtonText: "Book Your Cleaning",
  heroRatingText: "4.9/5 Rating",
  heroSatisfactionText: "100% Satisfaction",
  
  // Interactive Guide Section
  interactiveGuideHeading: "Our Clensy Cleaning Guide",
  interactiveGuideDescription: "Click on any room to explore our detailed cleaning protocols and see exactly what's included in each service level.",
  floorPlanImageDesktopUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069438/website-images/j5wxvoguffksq4fwffuc.svg",
  floorPlanImageMobileUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069449/website-images/rzv9r7sgs6wgchwgh7kq.svg",
  
  // Checklist Section
  checklistSectionHeading: "Clensy Cleaning Checklist",
  checklistSectionDescription: "Choose your cleaning level to see exactly what's included in each comprehensive service package",
  
  // Checklist Data
  checklistData: {
    kitchen: {
      title: "Kitchen",
      routine: ["Sweep, Vacuum, & Mop Floors", "Wipe down countertops", "Wipe down Stove Top", "Clean exterior of appliances", "Sinks scrubbed and disinfected", "Wipe exterior of cabinets and handles", "Clean Stove Top", "Trash emptied"],
      deep: ["Everything in routine +", "Clean inside microwave", "Kitchen Backsplash", "Degrease Stovetop", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Tables, chairs, & behind/under furniture", "Window Sills"],
      moving: ["Sweep, Vacuum and mop floors thoroughly", "Clean and disinfect inside and outside of all cabinets and drawers", "Clean inside and outside of refrigerator", "Clean inside and outside of oven", "Scrub and disinfect sink and faucet", "Wipe all countertops and backsplash", "Clean exterior and interior of microwave and other appliances", "Wipe down baseboards, door frames, and light switches"],
      image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069417/website-images/y1jwhpsvkcdznrehbatk.jpg"
    },
    bathroom: {
      title: "Bathrooms",
      routine: ["Sweep, Vacuum, & Mop Floors", "Scrub and sanitize showers and tubs", "Clean and disinfect toilets", "Scrub and disinfect sink and countertops", "Chrome fixtures cleaned and shined", "Clean mirrors", "Towels neatly hung and folded", "Trash Emptied"],
      deep: ["Everything in routine +", "Remove hard water stains (where possible)", "Scrub grout lines (moderate scrubbing)", "Ceiling fans and light fixtures dusted", "Dust vent covers and ceiling corners", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Window Sills"],
      moving: ["Sweep, Vacuum and mop floors thoroughly", "Scrub and disinfect toilet (inside, outside, and behind)", "Deep clean shower/tub (remove soap scum, mildew, grout scrubbing)", "Clean inside and outside of all drawers, cabinets, and vanities", "Scrub and polish sink, faucet, and countertops", "Clean mirrors and any glass shower doors", "Wipe baseboards and door trim", "Dust and clean vents, fan covers, and corners"],
      image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069426/website-images/hbni4r1jfgawyay3od41.jpg"
    },
    bedroom: {
      title: "Bedrooms",
      routine: ["Sweep, Vacuum, & Mop Floors", "Beds made, linens changed (if linens are left on bed)", "Dust bedroom shelving, night stand, & bed frame", "Picture frames dusted", "Mirrors Cleaned", "Light (5 minutes) Organization of room", "Ensure overall room looks neat, tidy, and hotel-fresh", "Trash Emptied"],
      deep: ["Everything in routine +", "Ceiling fans and light fixtures dusted", "Remove cobwebs from corners and ceilings", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Behind/under furniture", "Window Sills", "Wipe down decor items (vases, candle holders, etc.)"],
      moving: ["Sweep, Vacuum and mop floors thoroughly", "Clean inside closets, including shelving and floor", "Wipe baseboards and door trim", "Clean interior window glass and wipe window sills", "Dust and wipe ceiling fans and light fixtures", "Clean light switches, doors, and outlet covers", "Remove cobwebs and dust from ceiling corners", "Trash Emptied"],
      image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069425/website-images/of8tqpfw4nky9boexhhg.jpg"
    },
    living: {
      title: "Living Areas",
      routine: ["Sweep, Vacuum, & Mop Floors", "Upholstered furniture vacuumed", "Dust all surfaces and decor", "Dust electronics and TV stands", "Fluff and straighten couch cushions & pillows", "Clean mirrors and glass surfaces", "Light (5 minutes) Organization of room", "Trash emptied"],
      deep: ["Everything in routine +", "Vacuum inside couch cushions (if removable)", "Ceiling fans and light fixtures dusted", "Remove cobwebs from corners and ceilings", "Wipe baseboards and molding", "Doors, door frames, & light switches", "Behind/under furniture", "Window Sills"],
      moving: ["Sweep, Vacuum and mop floors thoroughly", "Dust and wipe all baseboards and molding", "Clean interior window glass and wipe window sills", "Remove cobwebs from ceilings and corners", "Clean doors, handles, and light switches", "Dust and wipe ceiling fans and light fixtures", "Clean inside closets and shelving (if any)", "Trash Emptied"],
      image: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750069416/website-images/ybxxaliusujslwciplyb.jpg"
    }
  },
  
  // CTA Section
  ctaHeading: "Ready for a Spotless Home?",
  ctaDescription: "Book your cleaning today and experience the Clensy difference. Our comprehensive checklist ensures nothing is missed.",
  ctaButtonText: "Book Now",
  ctaPhoneNumber: "(551) 305-4081"
};


// ============================================
// HELPER FUNCTIONS
// ============================================
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

async function seedSingleType(token, apiName, data, displayName) {
  console.log(`\n📝 Seeding ${displayName}...`);
  
  try {
    // Save content
    const saveResponse = await fetch(`${STRAPI_URL}/content-manager/single-types/api::${apiName}.${apiName}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!saveResponse.ok) {
      const error = await saveResponse.text();
      console.log(`⚠️ ${displayName} save response: ${error}`);
      return false;
    }
    
    console.log(`✅ ${displayName} saved!`);
    
    // Publish
    const publishResponse = await fetch(`${STRAPI_URL}/content-manager/single-types/api::${apiName}.${apiName}/actions/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (publishResponse.ok) {
      console.log(`📢 ${displayName} published!`);
    } else {
      console.log(`⚠️ ${displayName} could not auto-publish. Please publish manually.`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error seeding ${displayName}:`, error.message);
    return false;
  }
}


// ============================================
// MAIN SEED FUNCTION
// ============================================
async function seedAllPages() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log('❌ Missing admin credentials!');
    console.log('\nPlease set environment variables:');
    console.log('  set STRAPI_ADMIN_EMAIL=ahsanfaraz564@gmail.com');
    console.log('  set STRAPI_ADMIN_PASSWORD=AAhsanfaraz176');
    console.log('\nThen run: node scripts/seed-all-pages.js');
    return;
  }
  
  console.log('🚀 Starting All Pages Seed via Admin API...');
  console.log(`📡 Strapi URL: ${STRAPI_URL}`);
  
  try {
    const token = await loginAdmin();
    console.log('✅ Logged in successfully!');
    
    const results = {
      about: await seedSingleType(token, 'about', aboutPageData, 'About Page'),
      faqPage: await seedSingleType(token, 'faq-page', faqPageData, 'FAQ Page'),
      contact: await seedSingleType(token, 'contact', contactPageData, 'Contact Page'),
      privacyPolicy: await seedSingleType(token, 'privacy-policy', privacyPolicyData, 'Privacy Policy'),
      termsOfService: await seedSingleType(token, 'terms-of-service', termsOfServiceData, 'Terms of Service'),
      checklistPage: await seedSingleType(token, 'checklist-page', checklistPageData, 'Checklist Page')
    };
    
    console.log('\n========================================');
    console.log('📊 SEED RESULTS:');
    console.log('========================================');
    Object.entries(results).forEach(([page, success]) => {
      console.log(`${success ? '✅' : '❌'} ${page}: ${success ? 'Success' : 'Failed'}`);
    });
    
    const successCount = Object.values(results).filter(Boolean).length;
    console.log(`\n🎉 Done! ${successCount}/${Object.keys(results).length} pages seeded successfully.`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

seedAllPages();
