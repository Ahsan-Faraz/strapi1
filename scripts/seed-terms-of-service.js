/**
 * Seed Terms of Service into Strapi
 * 
 * Run with: node scripts/seed-terms-of-service.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-8d56.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '67eb2c4b5e9661786cbc07a8e245f6feca5539a6b25d371450b6e47ae586b1696c16d0ed67f45d2eb20b1189f91710d0d422b82abe4763e64467a2f6dcb5526e7d23f37110c7925bcd20e46a115bde10200168b131b4ca703f5c9e5eafa743d6691aba335d9a48c7bae2e47d9da3489b3ffa478ceebcd934f7099c40d622e3b2';

const termsOfServiceData = {
  // SEO Fields
  seoTitle: "Terms of Service | Clensy Cleaning Services",
  seoMetaDescription: "Read Clensy's terms of service. Understand the terms and conditions for using our professional cleaning services in New Jersey.",
  seoKeywords: "terms of service, terms and conditions, cleaning service terms, Clensy terms, NJ cleaning terms",
  seoCanonicalUrl: "https://clensy.com/terms-of-service",
  seoRobots: "index, follow",
  ogTitle: "Terms of Service | Clensy Professional Cleaning",
  ogDescription: "Terms and conditions for using Clensy cleaning services in New Jersey.",
  ogType: "website",
  twitterCard: "summary",
  
  // Hero Section
  heroHeading: "Terms & Conditions",
  heroDescription: "Please read these terms and conditions carefully before using our services. By booking with Clensy, you agree to these terms.",
  
  // Company Info
  websiteUrl: "clensy.com",
  companyEmail: "info@clensy.com",
  companyPhone: "(551) 305-4081",
  
  // Agreement
  lastUpdated: "January 2025",
  agreementDescription: "By booking any service with Clensy LLC ('Clensy Cleaning'), either through our website, over the phone, or by email/text, you agree to comply with these Terms & Conditions. If you do not agree with any part of these terms, do not proceed with booking a service.",
  
  // Sections
  sections: [
    {
      title: "1. Service Agreement",
      content: `<p>By booking a cleaning service with Clensy LLC ("Clensy," "we," "us," or "our"), you ("Customer," "you," or "your") agree to be bound by these Terms and Conditions. These terms constitute a legally binding agreement between you and Clensy.</p>
<p>Our services are provided on an as-is basis, and we reserve the right to refuse service to anyone for any reason. We may modify these terms at any time, and your continued use of our services constitutes acceptance of any modifications.</p>`,
      order: 1
    },
    {
      title: "2. Booking and Scheduling",
      content: `<ul>
<li><strong>Booking Methods:</strong> Services can be booked online at clensy.com, by phone at (551) 305-4081, or via email</li>
<li><strong>Confirmation:</strong> All bookings are subject to confirmation. You will receive a confirmation email or text within 24 hours</li>
<li><strong>Scheduling:</strong> We offer flexible scheduling including same-day and next-day appointments based on availability</li>
<li><strong>Recurring Services:</strong> Recurring cleaning schedules (weekly, bi-weekly, monthly) can be set up with preferred day and time slots</li>
<li><strong>Access:</strong> You must ensure our team can access your property at the scheduled time</li>
</ul>`,
      order: 2
    },
    {
      title: "3. Cancellation and Rescheduling Policy",
      content: `<ul>
<li><strong>Free Cancellation:</strong> Cancel or reschedule at no charge with at least 24 hours notice before your scheduled service</li>
<li><strong>Late Cancellation Fee:</strong> Cancellations made less than 24 hours before the scheduled service may incur a fee of up to 50% of the service cost</li>
<li><strong>No-Show Policy:</strong> If our team arrives and cannot access the property or the appointment was not cancelled, you will be charged the full service amount</li>
<li><strong>Rescheduling:</strong> We're happy to reschedule your appointment at no charge with 24+ hours notice</li>
<li><strong>Weather:</strong> In cases of severe weather, we will contact you to reschedule at no additional cost</li>
</ul>`,
      order: 3
    },
    {
      title: "4. Pricing and Payment",
      content: `<ul>
<li><strong>Pricing:</strong> All prices are provided upfront before booking. Prices may vary based on home size, condition, and services requested</li>
<li><strong>Payment Due:</strong> Payment is due upon completion of service unless otherwise arranged for recurring customers</li>
<li><strong>Accepted Methods:</strong> We accept all major credit cards, debit cards, Apple Pay, Google Pay, and electronic bank transfers</li>
<li><strong>Automatic Billing:</strong> Recurring service customers may opt into automatic billing for convenience</li>
<li><strong>Price Changes:</strong> Prices are subject to change with 30 days written notice for recurring customers</li>
<li><strong>Additional Charges:</strong> Extra charges may apply for excessive mess, biohazard cleanup, or services not included in the original quote</li>
</ul>`,
      order: 4
    },
    {
      title: "5. Our 100% Satisfaction Guarantee",
      content: `<p>We stand behind our work with a <strong>100% Satisfaction Guarantee</strong>. Your satisfaction is our top priority.</p>
<ul>
<li><strong>Re-Clean Policy:</strong> If you're not completely satisfied with any aspect of our cleaning, contact us within 24 hours of service completion</li>
<li><strong>Free Re-Clean:</strong> We will return to re-clean the areas of concern at absolutely no additional charge</li>
<li><strong>How to Request:</strong> Simply call (551) 305-4081 or email info@clensy.com with details of your concern</li>
<li><strong>Response Time:</strong> We will schedule a re-clean within 48 hours of your request</li>
</ul>
<p>This guarantee applies to the quality of cleaning work performed and does not cover pre-existing damage or conditions.</p>`,
      order: 5
    },
    {
      title: "6. Property Access and Security",
      content: `<ul>
<li><strong>Access Requirements:</strong> You must provide safe and reasonable access to your property at the scheduled time</li>
<li><strong>Key/Code Authorization:</strong> If you provide keys, lockbox codes, or smart lock access, you authorize our team to enter your property for cleaning purposes only</li>
<li><strong>Security Protocols:</strong> All access information is stored securely and only shared with assigned cleaning team members</li>
<li><strong>Key Return:</strong> Keys will be returned to the designated location or held securely for recurring services</li>
<li><strong>Lockouts:</strong> If our team is locked out and cannot reach you, a lockout fee may apply</li>
</ul>`,
      order: 6
    },
    {
      title: "7. Pet Policy",
      content: `<ul>
<li><strong>Pet Safety:</strong> For the safety of your pets and our team, please secure pets in a safe area during cleaning</li>
<li><strong>Notification:</strong> Please inform us of any pets in the home when booking</li>
<li><strong>Pet Accidents:</strong> We will clean up minor pet accidents as part of our service. Excessive pet mess may incur additional charges</li>
<li><strong>Aggressive Animals:</strong> We reserve the right to leave a property if we feel unsafe due to an aggressive animal</li>
</ul>`,
      order: 7
    },
    {
      title: "8. Insurance and Liability",
      content: `<ul>
<li><strong>Fully Insured:</strong> Clensy LLC is fully insured and bonded for your protection</li>
<li><strong>Damage Claims:</strong> Any claims for damage must be reported within 24 hours of service completion</li>
<li><strong>Investigation:</strong> All damage claims will be investigated promptly and fairly</li>
<li><strong>Liability Limits:</strong> Our liability is limited to the cost of repair or replacement of damaged items, not exceeding the cost of the service provided</li>
<li><strong>Exclusions:</strong> We are not liable for:
  <ul>
    <li>Pre-existing damage or wear</li>
    <li>Items not properly secured or disclosed as fragile</li>
    <li>Damage caused by defective or worn items</li>
    <li>Items of extraordinary value not disclosed prior to service</li>
  </ul>
</li>
</ul>`,
      order: 8
    },
    {
      title: "9. Customer Responsibilities",
      content: `<p>To ensure the best service experience, customers agree to:</p>
<ul>
<li>Provide a safe working environment free from hazards</li>
<li>Disclose any hazardous materials, chemicals, or conditions</li>
<li>Secure or remove valuable items, jewelry, cash, and irreplaceable items</li>
<li>Inform us of any fragile or delicate items requiring special care</li>
<li>Provide accurate information about property size and condition</li>
<li>Ensure utilities (water, electricity) are functioning</li>
<li>Clear excessive clutter that may impede cleaning (additional charges may apply)</li>
</ul>`,
      order: 9
    },
    {
      title: "10. Background Checks and Team Members",
      content: `<ul>
<li><strong>Background Checked:</strong> All Clensy team members undergo comprehensive background checks</li>
<li><strong>Trained Professionals:</strong> Our cleaners are professionally trained in cleaning techniques and safety protocols</li>
<li><strong>Identification:</strong> Team members will arrive in Clensy uniforms and can provide identification upon request</li>
<li><strong>Consistency:</strong> We strive to send the same team members for recurring services when possible</li>
</ul>`,
      order: 10
    },
    {
      title: "11. Cleaning Products and Equipment",
      content: `<ul>
<li><strong>Our Supplies:</strong> We bring all necessary cleaning supplies and equipment</li>
<li><strong>Eco-Friendly Options:</strong> We offer eco-friendly, non-toxic cleaning products upon request</li>
<li><strong>Your Products:</strong> If you prefer we use your own products, please have them available and inform us at booking</li>
<li><strong>Allergies:</strong> Please inform us of any allergies or sensitivities to cleaning products</li>
</ul>`,
      order: 11
    },
    {
      title: "12. Privacy Policy",
      content: `<p>Your privacy is important to us. By using our services, you acknowledge that:</p>
<ul>
<li>We collect personal information necessary to provide our services</li>
<li>Your information is stored securely and never sold to third parties</li>
<li>We may use your contact information to send service updates and promotional offers</li>
<li>You may opt out of marketing communications at any time</li>
</ul>
<p>For complete details, please refer to our <a href="/privacy-policy">Privacy Policy</a>.</p>`,
      order: 12
    },
    {
      title: "13. SMS/Text Message Consent",
      content: `<p>By providing your phone number, you consent to receive:</p>
<ul>
<li>Appointment confirmations and reminders</li>
<li>Service updates and notifications</li>
<li>Promotional offers (you may opt out at any time)</li>
</ul>
<p>Message and data rates may apply. Reply STOP to unsubscribe from promotional messages. Reply HELP for assistance.</p>`,
      order: 13
    },
    {
      title: "14. Dispute Resolution",
      content: `<ul>
<li><strong>Contact Us First:</strong> If you have any concerns or disputes, please contact us directly at info@clensy.com or (551) 305-4081</li>
<li><strong>Resolution:</strong> We are committed to resolving any issues promptly and fairly</li>
<li><strong>Governing Law:</strong> These terms are governed by the laws of the State of New Jersey</li>
<li><strong>Jurisdiction:</strong> Any disputes shall be resolved in the courts of New Jersey</li>
</ul>`,
      order: 14
    },
    {
      title: "15. Modifications to Terms",
      content: `<p>Clensy reserves the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to our website at clensy.com.</p>
<p>For recurring customers, we will provide 30 days notice of any material changes via email.</p>
<p>Your continued use of our services after any modifications constitutes acceptance of the updated terms.</p>`,
      order: 15
    },
    {
      title: "16. Contact Information",
      content: `<p>If you have any questions about these Terms and Conditions, please contact us:</p>
<ul>
<li><strong>Company:</strong> Clensy LLC</li>
<li><strong>Website:</strong> <a href="https://clensy.com">clensy.com</a></li>
<li><strong>Email:</strong> <a href="mailto:info@clensy.com">info@clensy.com</a></li>
<li><strong>Phone:</strong> <a href="tel:+15513054081">(551) 305-4081</a></li>
<li><strong>Service Area:</strong> New Jersey</li>
</ul>`,
      order: 16
    }
  ]
};

async function seedTermsOfService() {
  console.log('🔐 Seeding Terms of Service...\n');
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/terms-of-service`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: termsOfServiceData }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to seed Terms of Service:', error);
      return;
    }
    
    console.log('✅ Terms of Service seeded successfully!\n');
    
    console.log('📋 Next steps:');
    console.log('1. Go to Strapi Admin → Settings → Users & Permissions → Roles → Public');
    console.log('2. Enable "find" permission for Terms of Service');
    console.log('3. Click Save');
    console.log('4. Go to Content Manager → Terms of Service → Click "Publish"\n');
    
  } catch (error) {
    console.error('❌ Error seeding Terms of Service:', error.message);
  }
}

seedTermsOfService();
