/**
 * Seed FAQ Page with 110+ Comprehensive FAQs
 * 
 * Usage: 
 *   set STRAPI_ADMIN_EMAIL=ahsanfaraz564@gmail.com
 *   set STRAPI_ADMIN_PASSWORD=AAhsanfaraz176
 *   node scripts/seed-faq-page.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-8d56.up.railway.app';
const ADMIN_EMAIL = process.env.STRAPI_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.STRAPI_ADMIN_PASSWORD;

// All 110 Comprehensive FAQs organized by category
const comprehensiveFAQs = [
  // ==================== GENERAL (15) ====================
  { id: 1, question: "What areas do you serve?", answer: "We provide cleaning services throughout Northern New Jersey, including Bergen, Essex, Hudson, Passaic, and Union counties. We serve all major cities and towns within these counties.", category: "general", order: 1 },
  { id: 2, question: "Are your cleaners background checked?", answer: "Yes, all of our cleaning professionals undergo thorough background checks before joining our team. We prioritize your safety and security, and only employ trustworthy individuals with verified credentials.", category: "general", order: 2 },
  { id: 3, question: "Are you insured and bonded?", answer: "Yes, we are fully insured and bonded. This provides protection for both our clients and our team in the rare event of an accident or damage during service.", category: "general", order: 3 },
  { id: 4, question: "What cleaning products do you use?", answer: "We use a combination of industry-grade professional cleaning products and eco-friendly options. If you have specific preferences or concerns about allergies, we're happy to accommodate your needs with alternative products.", category: "general", order: 4 },
  { id: 5, question: "Do I need to be home during the cleaning?", answer: "No, you don't need to be home during the cleaning service. Many of our clients provide a key or access instructions. We ensure secure handling of all property access methods.", category: "general", order: 5 },
  { id: 6, question: "How do I prepare for my cleaning appointment?", answer: "We recommend picking up any personal items, securing valuables, and ensuring our team has clear access to all areas that need cleaning. You don't need to pre-clean - that's our job!", category: "general", order: 6 },
  { id: 7, question: "What if I need to reschedule my appointment?", answer: "You can reschedule your appointment up to 24 hours before the scheduled time without any fees. Contact us via phone, email, or through your customer portal to make changes.", category: "general", order: 7 },
  { id: 8, question: "Do you bring your own cleaning supplies?", answer: "Yes, we bring all necessary cleaning supplies and equipment. However, if you prefer we use specific products you own, just let us know and we'll be happy to accommodate.", category: "general", order: 8 },
  { id: 9, question: "How long does a typical cleaning take?", answer: "Cleaning time varies based on home size and service type. A standard cleaning for a 2-bedroom home typically takes 2-3 hours. Deep cleaning may take 4-6 hours.", category: "general", order: 9 },
  { id: 10, question: "Can I request the same cleaner each time?", answer: "Yes! We understand the value of consistency. You can request the same cleaning professional for your recurring appointments, subject to their availability.", category: "general", order: 10 },
  { id: 11, question: "What is your satisfaction guarantee?", answer: "We offer a 100% satisfaction guarantee. If you're not completely happy with our service, contact us within 24 hours and we'll return to re-clean the areas of concern at no additional charge.", category: "general", order: 11 },
  { id: 12, question: "Do you offer gift certificates?", answer: "Yes, we offer gift certificates for any of our cleaning services. They make great gifts for new homeowners, busy parents, or anyone who could use a break from cleaning.", category: "general", order: 12 },
  { id: 13, question: "Are your services available on weekends?", answer: "Yes, we offer cleaning services Monday through Saturday. Weekend appointments are popular, so we recommend booking in advance to secure your preferred time slot.", category: "general", order: 13 },
  { id: 14, question: "What happens if something is damaged during cleaning?", answer: "While rare, if any damage occurs during our service, please report it within 24 hours. We're fully insured and will work with you to resolve the issue promptly and fairly.", category: "general", order: 14 },
  { id: 15, question: "How do I contact customer support?", answer: "You can reach our customer support team by phone at (551) 305-4081, email at info@clensy.com, or through the contact form on our website. We typically respond within 1 hour during business hours.", category: "general", order: 15 },

  // ==================== BOOKING (15) ====================
  { id: 16, question: "How do I book a cleaning service?", answer: "You can book online through our website, call us at (551) 305-4081, or email info@clensy.com. Our online booking system is available 24/7 for your convenience.", category: "booking", order: 1 },
  { id: 17, question: "How far in advance should I book?", answer: "We recommend booking at least 48-72 hours in advance for regular cleanings. For deep cleaning or move-in/out services, 1 week advance notice is ideal, especially during busy seasons.", category: "booking", order: 2 },
  { id: 18, question: "Can I book a same-day cleaning?", answer: "Same-day bookings are available based on our schedule. Call us directly for same-day requests as availability varies. A small rush fee may apply.", category: "booking", order: 3 },
  { id: 19, question: "What is your cancellation policy?", answer: "Cancellations made 24+ hours before your appointment are free. Cancellations within 24 hours may incur a fee of up to 50% of the service cost. No-shows are charged the full amount.", category: "booking", order: 4 },
  { id: 20, question: "Can I schedule recurring cleanings?", answer: "Yes! We offer weekly, bi-weekly, and monthly recurring cleaning schedules. Recurring customers enjoy priority scheduling and discounted rates.", category: "booking", order: 5 },
  { id: 21, question: "How do I modify my booking?", answer: "You can modify your booking through your customer portal, by calling us, or by email. Changes should be made at least 24 hours before your scheduled appointment.", category: "booking", order: 6 },
  { id: 22, question: "What time slots are available?", answer: "We offer flexible scheduling with time slots from 8 AM to 6 PM, Monday through Saturday. Morning slots (8-10 AM) and afternoon slots (1-3 PM) are most popular.", category: "booking", order: 7 },
  { id: 23, question: "Do you offer emergency cleaning services?", answer: "Yes, we offer emergency cleaning services for unexpected situations. Contact us directly to discuss your needs and we'll do our best to accommodate you.", category: "booking", order: 8 },
  { id: 24, question: "Can I book multiple services at once?", answer: "Absolutely! You can combine services like regular cleaning with add-ons such as oven cleaning, refrigerator cleaning, or window washing for a comprehensive clean.", category: "booking", order: 9 },
  { id: 25, question: "How do I set up automatic recurring bookings?", answer: "During checkout or through your customer portal, select your preferred frequency (weekly, bi-weekly, monthly). Your cleanings will be automatically scheduled at your chosen interval.", category: "booking", order: 10 },
  { id: 26, question: "What if I need to skip a recurring cleaning?", answer: "You can skip a recurring cleaning by notifying us at least 24 hours in advance. Your regular schedule will resume with the next scheduled appointment.", category: "booking", order: 11 },
  { id: 27, question: "Do you send appointment reminders?", answer: "Yes, we send email and text reminders 24 hours before your appointment, and again 1 hour before your cleaner arrives.", category: "booking", order: 12 },
  { id: 28, question: "Can I book for a specific cleaner?", answer: "Yes, you can request a specific cleaner when booking. We'll do our best to accommodate your preference based on their availability.", category: "booking", order: 13 },
  { id: 29, question: "What information do I need to provide when booking?", answer: "We'll need your address, contact information, home size, service type, and any special instructions or access details.", category: "booking", order: 14 },
  { id: 30, question: "Is there a minimum booking requirement?", answer: "Our minimum booking is 2 hours for standard cleaning services. This ensures we can provide thorough, quality service.", category: "booking", order: 15 },

  // ==================== PRICING (15) ====================
  { id: 31, question: "How much does a cleaning service cost?", answer: "Pricing varies based on home size, service type, and frequency. Standard cleaning starts around $120-$180 for a 2-bedroom home. Get an instant quote on our booking page.", category: "pricing", order: 1 },
  { id: 32, question: "Do you offer free estimates?", answer: "Yes, we provide free estimates! You can get an instant quote online or contact us for a personalized estimate based on your specific needs.", category: "pricing", order: 2 },
  { id: 33, question: "What payment methods do you accept?", answer: "We accept all major credit cards, debit cards, and electronic payments. Payment is processed securely after your cleaning is complete.", category: "pricing", order: 3 },
  { id: 34, question: "Do you require a deposit?", answer: "For first-time customers, we may require a deposit for larger jobs. Recurring customers typically don't need to pay deposits.", category: "pricing", order: 4 },
  { id: 35, question: "Are there any hidden fees?", answer: "No hidden fees! Our quotes include all standard cleaning services. Any additional services or special requests are clearly communicated and priced upfront.", category: "pricing", order: 5 },
  { id: 36, question: "Do you offer discounts for recurring services?", answer: "Yes! Recurring customers receive 10-20% off regular rates depending on frequency. Weekly cleanings receive the highest discount.", category: "pricing", order: 6 },
  { id: 37, question: "When is payment due?", answer: "Payment is due upon completion of service. For recurring customers, we can set up automatic billing for convenience.", category: "pricing", order: 7 },
  { id: 38, question: "Do you charge extra for pets?", answer: "We don't charge extra for homes with pets. However, please let us know about pets so our team can be prepared and ensure their safety during cleaning.", category: "pricing", order: 8 },
  { id: 39, question: "Is there a charge for heavily soiled homes?", answer: "Extremely dirty or neglected homes may require additional time and effort. We'll assess and provide a fair quote before starting work.", category: "pricing", order: 9 },
  { id: 40, question: "Do you offer senior or military discounts?", answer: "Yes, we offer 10% discounts for seniors (65+) and active military/veterans. Just mention this when booking.", category: "pricing", order: 10 },
  { id: 41, question: "What's included in the base price?", answer: "Our base price includes all standard cleaning tasks: dusting, vacuuming, mopping, bathroom cleaning, kitchen cleaning, and general tidying.", category: "pricing", order: 11 },
  { id: 42, question: "How do add-on services affect pricing?", answer: "Add-on services like oven cleaning, refrigerator cleaning, or window washing are priced separately and added to your base cleaning cost.", category: "pricing", order: 12 },
  { id: 43, question: "Do prices change for larger homes?", answer: "Yes, pricing is based on square footage and number of bedrooms/bathrooms. Larger homes require more time and are priced accordingly.", category: "pricing", order: 13 },
  { id: 44, question: "Is tipping expected?", answer: "Tipping is not required but always appreciated. If you're happy with your service, tips go directly to your cleaning professional.", category: "pricing", order: 14 },
  { id: 45, question: "Can I get a refund if I'm not satisfied?", answer: "If you're not satisfied, contact us within 24 hours. We'll return to re-clean at no charge. If still unsatisfied, we'll discuss refund options.", category: "pricing", order: 15 },

  // ==================== SERVICES (20) ====================
  { id: 46, question: "What types of cleaning services do you offer?", answer: "We offer standard cleaning, deep cleaning, move-in/move-out cleaning, post-construction cleaning, Airbnb turnover cleaning, and commercial cleaning services.", category: "services", order: 1 },
  { id: 47, question: "What's the difference between standard and deep cleaning?", answer: "Standard cleaning covers regular maintenance tasks. Deep cleaning is more thorough, including baseboards, inside appliances, detailed scrubbing, and areas often missed in routine cleaning.", category: "services", order: 2 },
  { id: 48, question: "Do you offer move-in/move-out cleaning?", answer: "Yes! Our move-in/move-out cleaning is comprehensive, ensuring the property is spotless for new occupants. This includes inside cabinets, appliances, and detailed cleaning of all areas.", category: "services", order: 3 },
  { id: 49, question: "Do you clean inside refrigerators and ovens?", answer: "Inside refrigerator and oven cleaning are available as add-on services. They're included in deep cleaning and move-in/move-out packages.", category: "services", order: 4 },
  { id: 50, question: "Do you offer window cleaning?", answer: "Yes, interior window cleaning is available as an add-on service. We clean window glass, sills, and tracks.", category: "services", order: 5 },
  { id: 51, question: "Can you clean after a party or event?", answer: "Absolutely! We offer post-event cleaning to help you recover from parties, gatherings, or special occasions.", category: "services", order: 6 },
  { id: 52, question: "Do you provide post-construction cleaning?", answer: "Yes, we specialize in post-construction cleaning, removing dust, debris, and construction residue to make your newly renovated space move-in ready.", category: "services", order: 7 },
  { id: 53, question: "Do you offer Airbnb/vacation rental cleaning?", answer: "Yes! We provide quick-turnaround cleaning for Airbnb hosts and vacation rental owners, ensuring your property is guest-ready.", category: "services", order: 8 },
  { id: 54, question: "Do you clean commercial spaces?", answer: "Yes, we offer commercial cleaning for offices, retail spaces, medical facilities, and other business environments.", category: "services", order: 9 },
  { id: 55, question: "Can you clean garages or basements?", answer: "Yes, garage and basement cleaning are available as add-on services. These spaces often require additional time and are priced accordingly.", category: "services", order: 10 },
  { id: 56, question: "Do you offer laundry services?", answer: "Basic laundry services (washing, drying, folding) are available as an add-on. We can also change bed linens as part of our service.", category: "services", order: 11 },
  { id: 57, question: "Do you clean outdoor areas?", answer: "Our focus is interior cleaning. However, we can clean enclosed patios, sunrooms, and similar spaces. Outdoor areas like decks are not included.", category: "services", order: 12 },
  { id: 58, question: "Can you organize while cleaning?", answer: "Light organization (5-10 minutes per room) is included. For extensive organizing, we recommend our dedicated organization service.", category: "services", order: 13 },
  { id: 59, question: "Do you clean ceiling fans and light fixtures?", answer: "Yes, dusting ceiling fans and light fixtures is included in our standard cleaning. Deep cleaning includes more thorough attention to these areas.", category: "services", order: 14 },
  { id: 60, question: "Do you clean blinds and curtains?", answer: "Dusting blinds is included in standard cleaning. Curtain cleaning and detailed blind cleaning are available as add-ons.", category: "services", order: 15 },
  { id: 61, question: "Can you clean pet areas?", answer: "Yes, we can clean pet areas including litter boxes, pet beds, and feeding stations. Just let us know your pet-related cleaning needs.", category: "services", order: 16 },
  { id: 62, question: "Do you offer green/eco-friendly cleaning?", answer: "Yes! We offer eco-friendly cleaning using environmentally safe products. Just request this option when booking.", category: "services", order: 17 },
  { id: 63, question: "Can you clean homes with allergies in mind?", answer: "Absolutely. We can use hypoallergenic products and HEPA-filtered vacuums for clients with allergies or sensitivities.", category: "services", order: 18 },
  { id: 64, question: "Do you clean high-touch surfaces?", answer: "Yes, we pay special attention to high-touch surfaces like doorknobs, light switches, and handles, especially important for health-conscious clients.", category: "services", order: 19 },
  { id: 65, question: "What areas are included in bathroom cleaning?", answer: "Bathroom cleaning includes toilet, shower/tub, sink, mirrors, counters, floors, and fixtures. Deep cleaning adds grout scrubbing and detailed attention.", category: "services", order: 20 },

  // ==================== KITCHEN (10) ====================
  { id: 66, question: "What's included in kitchen cleaning?", answer: "Kitchen cleaning includes countertops, stovetop exterior, sink, appliance exteriors, cabinet fronts, floors, and general tidying. Inside appliances are add-ons.", category: "kitchen", order: 1 },
  { id: 67, question: "Do you clean inside the microwave?", answer: "Inside microwave cleaning is included in deep cleaning. For standard cleaning, it's available as an add-on service.", category: "kitchen", order: 2 },
  { id: 68, question: "Will you clean the dishwasher?", answer: "Exterior dishwasher cleaning is standard. Interior cleaning and sanitizing is available as an add-on.", category: "kitchen", order: 3 },
  { id: 69, question: "Do you clean kitchen backsplashes?", answer: "Yes, backsplash cleaning is included in our kitchen cleaning. Deep cleaning includes detailed grout cleaning.", category: "kitchen", order: 4 },
  { id: 70, question: "Can you degrease the stovetop?", answer: "Standard cleaning includes wiping the stovetop. Deep degreasing for heavy buildup is part of deep cleaning or available as an add-on.", category: "kitchen", order: 5 },
  { id: 71, question: "Do you clean under kitchen appliances?", answer: "Moving and cleaning under heavy appliances is included in deep cleaning. For standard cleaning, we clean around accessible areas.", category: "kitchen", order: 6 },
  { id: 72, question: "Will you do the dishes?", answer: "Dish washing is available upon request. Please let us know in advance if you'd like this included in your service.", category: "kitchen", order: 7 },
  { id: 73, question: "Do you clean pantry shelves?", answer: "Pantry cleaning is available as an add-on. We can wipe shelves and organize items upon request.", category: "kitchen", order: 8 },
  { id: 74, question: "Can you clean the range hood?", answer: "Exterior range hood cleaning is standard. Filter cleaning and interior degreasing are part of deep cleaning.", category: "kitchen", order: 9 },
  { id: 75, question: "Do you sanitize kitchen surfaces?", answer: "Yes, we sanitize countertops and high-touch kitchen surfaces using food-safe disinfectants.", category: "kitchen", order: 10 },

  // ==================== BEDROOM & LIVING (10) ====================
  { id: 76, question: "What's included in bedroom cleaning?", answer: "Bedroom cleaning includes dusting, vacuuming/mopping, making beds, tidying, and cleaning mirrors. We can change linens if fresh ones are provided.", category: "bedroom", order: 1 },
  { id: 77, question: "Do you clean under beds?", answer: "We vacuum under beds when accessible. For deep cleaning, we move furniture to clean thoroughly underneath.", category: "bedroom", order: 2 },
  { id: 78, question: "Will you change bed sheets?", answer: "Yes, we'll change bed sheets if fresh linens are left out. We can also make beds with existing linens.", category: "bedroom", order: 3 },
  { id: 79, question: "Do you clean closets?", answer: "Closet cleaning is included in move-in/move-out and deep cleaning. For standard cleaning, it's available as an add-on.", category: "bedroom", order: 4 },
  { id: 80, question: "Can you vacuum upholstered furniture?", answer: "Yes, vacuuming upholstered furniture like sofas and chairs is included in our standard cleaning service.", category: "bedroom", order: 5 },
  { id: 81, question: "Do you dust electronics?", answer: "Yes, we carefully dust TVs, computers, and other electronics. We use appropriate methods to avoid damage.", category: "bedroom", order: 6 },
  { id: 82, question: "Will you clean picture frames and decor?", answer: "Yes, dusting picture frames, shelves, and decorative items is part of our standard cleaning.", category: "bedroom", order: 7 },
  { id: 83, question: "Do you clean ceiling corners for cobwebs?", answer: "Yes, removing cobwebs from ceiling corners and high areas is included in our cleaning service.", category: "bedroom", order: 8 },
  { id: 84, question: "Can you clean home office spaces?", answer: "Yes, home office cleaning is included. We dust desks, shelves, and equipment while being careful with paperwork and electronics.", category: "bedroom", order: 9 },
  { id: 85, question: "Do you clean baseboards?", answer: "Baseboard dusting is included in standard cleaning. Detailed baseboard scrubbing is part of deep cleaning.", category: "bedroom", order: 10 },

  // ==================== SAFETY & TRUST (10) ====================
  { id: 86, question: "How do you screen your employees?", answer: "All employees undergo comprehensive background checks, reference verification, and in-person interviews. We only hire 1 out of every 100 applicants.", category: "safety", order: 1 },
  { id: 87, question: "Are your cleaners trained?", answer: "Yes, all cleaners complete our comprehensive training program covering cleaning techniques, safety protocols, and customer service standards.", category: "safety", order: 2 },
  { id: 88, question: "How do you handle keys and access codes?", answer: "We have strict security protocols for handling keys and access codes. All access information is stored securely and only shared with assigned cleaners.", category: "safety", order: 3 },
  { id: 89, question: "What COVID-19 precautions do you take?", answer: "Our team follows health guidelines including symptom monitoring, hand hygiene, and sanitization of equipment between jobs.", category: "safety", order: 4 },
  { id: 90, question: "Do cleaners wear uniforms or identification?", answer: "Yes, our cleaning professionals wear branded uniforms and carry company identification for your peace of mind.", category: "safety", order: 5 },
  { id: 91, question: "What if I have concerns about a cleaner?", answer: "Contact us immediately with any concerns. We take all feedback seriously and will address issues promptly, including assigning a different cleaner if needed.", category: "safety", order: 6 },
  { id: 92, question: "How do you protect my privacy?", answer: "We respect your privacy completely. Our team is trained to focus on cleaning, not personal items. We never share client information.", category: "safety", order: 7 },
  { id: 93, question: "Are cleaners supervised?", answer: "Our team leads conduct quality checks, and we have systems in place to ensure consistent service quality across all appointments.", category: "safety", order: 8 },
  { id: 94, question: "What happens if a cleaner calls in sick?", answer: "We have backup cleaners available. If your assigned cleaner is unavailable, we'll send a qualified replacement or offer to reschedule.", category: "safety", order: 9 },
  { id: 95, question: "Do you have a code of conduct?", answer: "Yes, all employees sign and follow our strict code of conduct covering professionalism, respect, confidentiality, and service standards.", category: "safety", order: 10 },

  // ==================== SPECIAL SITUATIONS (15) ====================
  { id: 96, question: "Can you clean homes with pets?", answer: "Absolutely! We love pets. Just let us know about your furry friends so we can ensure their safety and comfort during cleaning.", category: "special", order: 1 },
  { id: 97, question: "Do you clean homes with children?", answer: "Yes, we're experienced with family homes. We use child-safe products and are careful around toys and children's items.", category: "special", order: 2 },
  { id: 98, question: "Can you clean during home renovations?", answer: "Yes, we offer cleaning during and after renovations. Post-construction cleaning is one of our specialties.", category: "special", order: 3 },
  { id: 99, question: "Do you clean hoarder homes?", answer: "We can help with cluttered homes on a case-by-case basis. Contact us to discuss your specific situation and we'll provide a customized plan.", category: "special", order: 4 },
  { id: 100, question: "Can you clean homes with elderly residents?", answer: "Yes, we're experienced and respectful when cleaning homes with elderly residents. We can work around schedules and special needs.", category: "special", order: 5 },
  { id: 101, question: "Do you clean homes with disabilities accommodations?", answer: "Yes, we're trained to work respectfully in homes with accessibility equipment and can accommodate special requirements.", category: "special", order: 6 },
  { id: 102, question: "Can you clean vacation homes between guests?", answer: "Yes! We specialize in vacation rental turnovers, ensuring your property is guest-ready with quick turnaround times.", category: "special", order: 7 },
  { id: 103, question: "Do you clean model homes or staging properties?", answer: "Yes, we provide cleaning services for real estate staging and model homes to ensure they look their best for showings.", category: "special", order: 8 },
  { id: 104, question: "Can you clean after water damage?", answer: "We can help with cleaning after water damage restoration is complete. For active water damage, please contact a restoration specialist first.", category: "special", order: 9 },
  { id: 105, question: "Do you clean homes being sold?", answer: "Yes, we offer pre-listing cleaning to help homes show their best. A clean home can make a great impression on potential buyers.", category: "special", order: 10 },
  { id: 106, question: "Can you clean foreclosed or abandoned properties?", answer: "Yes, we can clean foreclosed or abandoned properties. These often require deep cleaning and may need a custom quote.", category: "special", order: 11 },
  { id: 107, question: "Do you offer cleaning for estate cleanouts?", answer: "Yes, we can help clean properties during or after estate cleanouts, working alongside or after removal services.", category: "special", order: 12 },
  { id: 108, question: "Can you clean homes with smokers?", answer: "Yes, we can clean homes with smoke residue. Heavy smoke damage may require specialized treatment beyond standard cleaning.", category: "special", order: 13 },
  { id: 109, question: "Do you clean homes with mold issues?", answer: "We can clean surface mold in bathrooms and kitchens. For serious mold problems, please consult a mold remediation specialist first.", category: "special", order: 14 },
  { id: 110, question: "Can you accommodate religious or cultural requirements?", answer: "Yes, we respect all religious and cultural requirements. Please let us know about any specific needs when booking.", category: "special", order: 15 },
];

// FAQ Page Data with all content
const faqPageData = {
  // SEO Fields
  seoTitle: "FAQ | Frequently Asked Questions | Clensy Cleaning Services",
  seoMetaDescription: "Find answers to 110+ common questions about Clensy cleaning services, booking, pricing, and more. Get the information you need about our professional cleaning.",
  seoKeywords: "cleaning FAQ, cleaning questions, house cleaning FAQ, professional cleaning questions, Clensy FAQ, cleaning service questions",
  seoCanonicalUrl: "https://clensy.com/faq",
  seoRobots: "index, follow",
  ogTitle: "FAQ | Clensy Cleaning Services",
  ogDescription: "Get answers to 110+ cleaning questions. Learn about our services, pricing, and booking process.",
  ogImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847616/shutterstock_2209715823_1_x80cn8.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "FAQ | Clensy Cleaning Services",
  twitterDescription: "Get answers to your cleaning questions.",
  schemaJsonLd: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": comprehensiveFAQs.slice(0, 10).map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  },
  headScripts: "",
  bodyEndScripts: "",
  customCss: "",
  
  // Hero Section
  heroTopLabel: "Answers to your questions",
  heroHeading: "Frequently Asked <blue>Questions</blue>",
  heroDescription: "Find answers to 110+ common questions about our cleaning services, booking process, and pricing. Can't find what you're looking for? Contact us directly for personalized assistance.",
  heroBackgroundImageUrl: "https://res.cloudinary.com/dgjmm3usy/image/upload/v1750847616/shutterstock_2209715823_1_x80cn8.jpg",
  
  // All 110 FAQs
  comprehensiveFAQs: comprehensiveFAQs,
  
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
  contactEmail: "info@clensy.com",
  contactPhone: "(551) 305-4081",
  contactButtonText: "Contact Us",
  
  // Trust Indicators
  trustIndicators: [
    { number: "110+", description: "Questions Answered" },
    { number: "24/7", description: "Online Support" },
    { number: "5.0", description: "Customer Satisfaction" },
    { number: "15+", description: "Years of Experience" }
  ]
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

async function seedFAQPage(token) {
  console.log('\n📝 Seeding FAQ Page with 110 FAQs...');
  
  try {
    // Save content
    const saveResponse = await fetch(`${STRAPI_URL}/content-manager/single-types/api::faq-page.faq-page`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(faqPageData)
    });
    
    if (!saveResponse.ok) {
      const error = await saveResponse.text();
      console.log(`⚠️ FAQ Page save response: ${error}`);
      return false;
    }
    
    console.log(`✅ FAQ Page saved with ${comprehensiveFAQs.length} FAQs!`);
    
    // Publish
    const publishResponse = await fetch(`${STRAPI_URL}/content-manager/single-types/api::faq-page.faq-page/actions/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (publishResponse.ok) {
      console.log(`📢 FAQ Page published!`);
    } else {
      console.log(`⚠️ FAQ Page could not auto-publish. Please publish manually in Strapi admin.`);
    }
    
    return true;
  } catch (error) {
    console.error(`❌ Error seeding FAQ Page:`, error.message);
    return false;
  }
}

// ============================================
// MAIN FUNCTION
// ============================================
async function main() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.log('❌ Missing admin credentials!');
    console.log('\nPlease set environment variables:');
    console.log('  set STRAPI_ADMIN_EMAIL=ahsanfaraz564@gmail.com');
    console.log('  set STRAPI_ADMIN_PASSWORD=AAhsanfaraz176');
    console.log('\nThen run: node scripts/seed-faq-page.js');
    return;
  }
  
  console.log('🚀 Starting FAQ Page Seed...');
  console.log(`📡 Strapi URL: ${STRAPI_URL}`);
  console.log(`📊 Total FAQs: ${comprehensiveFAQs.length}`);
  
  // Show category breakdown
  const categories = {};
  comprehensiveFAQs.forEach(faq => {
    categories[faq.category] = (categories[faq.category] || 0) + 1;
  });
  console.log('\n📋 FAQ Categories:');
  Object.entries(categories).forEach(([cat, count]) => {
    console.log(`   - ${cat}: ${count} questions`);
  });
  
  try {
    const token = await loginAdmin();
    console.log('✅ Logged in successfully!');
    
    const success = await seedFAQPage(token);
    
    console.log('\n========================================');
    if (success) {
      console.log('🎉 FAQ Page seeded successfully with 110 FAQs!');
      console.log('\n📌 Next steps:');
      console.log('   1. Go to Strapi Admin > Settings > Users & Permissions > Roles > Public');
      console.log('   2. Enable "find" for FAQ Page');
      console.log('   3. Save permissions');
    } else {
      console.log('❌ FAQ Page seeding failed. Check errors above.');
    }
    console.log('========================================');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

main();
