/**
 * Seed Privacy Policy into Strapi
 * 
 * Run with: node scripts/seed-privacy-policy.js
 */

const STRAPI_URL = process.env.STRAPI_URL || 'https://strapi-production-8d56.up.railway.app';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '67eb2c4b5e9661786cbc07a8e245f6feca5539a6b25d371450b6e47ae586b1696c16d0ed67f45d2eb20b1189f91710d0d422b82abe4763e64467a2f6dcb5526e7d23f37110c7925bcd20e46a115bde10200168b131b4ca703f5c9e5eafa743d6691aba335d9a48c7bae2e47d9da3489b3ffa478ceebcd934f7099c40d622e3b2';

const privacyPolicyData = {
  // SEO Fields
  seoTitle: "Privacy Policy | Clensy Cleaning Services",
  seoMetaDescription: "Read Clensy's privacy policy. Learn how we collect, use, and protect your personal information when you use our cleaning services.",
  seoKeywords: "privacy policy, data protection, personal information, Clensy privacy, cleaning service privacy",
  seoCanonicalUrl: "https://clensy.com/privacy-policy",
  seoRobots: "index, follow",
  ogTitle: "Privacy Policy | Clensy Professional Cleaning",
  ogDescription: "Learn how Clensy protects your privacy and personal information.",
  ogType: "website",
  twitterCard: "summary",
  
  // Hero Section
  heroHeading: "Privacy Policy",
  heroDescription: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.",
  
  // Company Info
  websiteUrl: "clensy.com",
  companyEmail: "info@clensy.com",
  companyPhone: "(551) 305-4081",
  lastUpdated: "January 2025",
  
  // SMS Consent
  smsConsentDescription: "By providing your phone number and using our services, you consent to receive SMS/text messages from Clensy LLC for service-related communications including appointment confirmations, reminders, updates, and promotional offers.",
  smsOptOutInstructions: "You can opt out of promotional messages at any time by replying STOP to any message. Service-related messages (appointment confirmations/reminders) will continue unless you cancel your service. Message and data rates may apply. Message frequency varies. Reply HELP for assistance.",
  
  // Sections
  sections: [
    {
      title: "1. Introduction",
      content: `<p>Clensy LLC ("Clensy," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website clensy.com, use our mobile applications, or engage our cleaning services.</p>
<p>Please read this privacy policy carefully. By using our services, you consent to the practices described in this policy.</p>
<p><strong>Last Updated:</strong> January 2025</p>`,
      order: 1
    },
    {
      title: "2. Information We Collect",
      content: `<h4>Personal Information You Provide</h4>
<p>We collect information you voluntarily provide when you:</p>
<ul>
<li>Book a cleaning service</li>
<li>Create an account</li>
<li>Contact us with inquiries</li>
<li>Subscribe to our newsletter</li>
<li>Participate in promotions</li>
</ul>
<p>This information may include:</p>
<ul>
<li><strong>Contact Information:</strong> Name, email address, phone number, mailing address</li>
<li><strong>Service Information:</strong> Property address, property details, service preferences, special instructions</li>
<li><strong>Payment Information:</strong> Credit card numbers, billing address (processed securely through our payment processor)</li>
<li><strong>Account Information:</strong> Username, password, account preferences</li>
<li><strong>Communication Records:</strong> Emails, chat messages, phone call records</li>
</ul>

<h4>Information Collected Automatically</h4>
<p>When you visit our website, we automatically collect:</p>
<ul>
<li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
<li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, referring URLs</li>
<li><strong>Location Data:</strong> General geographic location based on IP address</li>
<li><strong>Cookies and Tracking:</strong> Information collected through cookies, pixels, and similar technologies</li>
</ul>`,
      order: 2
    },
    {
      title: "3. How We Use Your Information",
      content: `<p>We use the information we collect to:</p>
<ul>
<li><strong>Provide Services:</strong> Schedule and deliver cleaning services, process payments, communicate about appointments</li>
<li><strong>Improve Our Services:</strong> Analyze usage patterns, gather feedback, enhance user experience</li>
<li><strong>Communicate With You:</strong> Send appointment confirmations, reminders, service updates, and respond to inquiries</li>
<li><strong>Marketing:</strong> Send promotional offers, newsletters, and information about new services (with your consent)</li>
<li><strong>Security:</strong> Protect against fraud, unauthorized access, and other security threats</li>
<li><strong>Legal Compliance:</strong> Comply with applicable laws, regulations, and legal processes</li>
<li><strong>Business Operations:</strong> Manage our business, including analytics, accounting, and auditing</li>
</ul>`,
      order: 3
    },
    {
      title: "4. Information Sharing and Disclosure",
      content: `<p>We do not sell your personal information. We may share your information with:</p>

<h4>Service Providers</h4>
<ul>
<li>Payment processors to handle transactions</li>
<li>Communication platforms for SMS and email services</li>
<li>Cloud storage providers for data hosting</li>
<li>Analytics providers to improve our services</li>
</ul>

<h4>Business Partners</h4>
<ul>
<li>Cleaning team members who need your address and service details</li>
<li>Insurance providers for claims processing</li>
</ul>

<h4>Legal Requirements</h4>
<p>We may disclose information when required by law, court order, or government request, or to protect our rights, property, or safety.</p>

<h4>Business Transfers</h4>
<p>In the event of a merger, acquisition, or sale of assets, your information may be transferred to the acquiring entity.</p>`,
      order: 4
    },
    {
      title: "5. Data Security",
      content: `<p>We implement appropriate technical and organizational measures to protect your personal information, including:</p>
<ul>
<li><strong>Encryption:</strong> SSL/TLS encryption for data transmission</li>
<li><strong>Secure Storage:</strong> Encrypted databases and secure cloud infrastructure</li>
<li><strong>Access Controls:</strong> Limited access to personal information on a need-to-know basis</li>
<li><strong>Employee Training:</strong> Regular security awareness training for all team members</li>
<li><strong>Payment Security:</strong> PCI-DSS compliant payment processing</li>
</ul>
<p>While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>`,
      order: 5
    },
    {
      title: "6. Your Rights and Choices",
      content: `<p>You have the following rights regarding your personal information:</p>
<ul>
<li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
<li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
<li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
<li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time</li>
<li><strong>Data Portability:</strong> Request your data in a portable format</li>
</ul>
<p>To exercise these rights, contact us at info@clensy.com or (551) 305-4081.</p>`,
      order: 6
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: `<p>We use cookies and similar technologies to:</p>
<ul>
<li>Remember your preferences and settings</li>
<li>Understand how you use our website</li>
<li>Deliver relevant advertisements</li>
<li>Analyze website traffic and performance</li>
</ul>

<h4>Types of Cookies We Use</h4>
<ul>
<li><strong>Essential Cookies:</strong> Required for website functionality</li>
<li><strong>Analytics Cookies:</strong> Help us understand website usage</li>
<li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
</ul>

<p>You can control cookies through your browser settings. Disabling certain cookies may affect website functionality.</p>`,
      order: 7
    },
    {
      title: "8. SMS/Text Message Policy",
      content: `<p>By providing your phone number, you consent to receive SMS/text messages from Clensy for:</p>
<ul>
<li>Appointment confirmations and reminders</li>
<li>Service updates and notifications</li>
<li>Promotional offers and discounts</li>
</ul>

<h4>Opt-Out Instructions</h4>
<ul>
<li>Reply <strong>STOP</strong> to any message to unsubscribe from promotional messages</li>
<li>Reply <strong>HELP</strong> for assistance</li>
<li>Message and data rates may apply</li>
<li>Message frequency varies based on your service schedule</li>
</ul>

<p>Service-related messages (appointment confirmations) will continue unless you cancel your service.</p>`,
      order: 8
    },
    {
      title: "9. Third-Party Links",
      content: `<p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.</p>`,
      order: 9
    },
    {
      title: "10. Children's Privacy",
      content: `<p>Our services are not directed to individuals under 18 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child, we will take steps to delete it promptly.</p>`,
      order: 10
    },
    {
      title: "11. California Privacy Rights (CCPA)",
      content: `<p>If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA):</p>
<ul>
<li><strong>Right to Know:</strong> Request information about the categories and specific pieces of personal information we collect</li>
<li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
<li><strong>Right to Opt-Out:</strong> Opt out of the sale of personal information (we do not sell personal information)</li>
<li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your privacy rights</li>
</ul>
<p>To exercise your CCPA rights, contact us at info@clensy.com.</p>`,
      order: 11
    },
    {
      title: "12. Data Retention",
      content: `<p>We retain your personal information for as long as necessary to:</p>
<ul>
<li>Provide our services to you</li>
<li>Comply with legal obligations</li>
<li>Resolve disputes</li>
<li>Enforce our agreements</li>
</ul>
<p>When information is no longer needed, we securely delete or anonymize it.</p>`,
      order: 12
    },
    {
      title: "13. Changes to This Policy",
      content: `<p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.</p>
<p>For significant changes, we will notify you via email or prominent notice on our website.</p>
<p>Your continued use of our services after changes constitutes acceptance of the updated policy.</p>`,
      order: 13
    },
    {
      title: "14. Contact Us",
      content: `<p>If you have questions about this Privacy Policy or our privacy practices, please contact us:</p>
<ul>
<li><strong>Company:</strong> Clensy LLC</li>
<li><strong>Email:</strong> <a href="mailto:info@clensy.com">info@clensy.com</a></li>
<li><strong>Phone:</strong> <a href="tel:+15513054081">(551) 305-4081</a></li>
<li><strong>Website:</strong> <a href="https://clensy.com">clensy.com</a></li>
<li><strong>Address:</strong> New Jersey, USA</li>
</ul>
<p>We will respond to your inquiry within 30 days.</p>`,
      order: 14
    }
  ]
};

async function seedPrivacyPolicy() {
  console.log('🔐 Seeding Privacy Policy...\n');
  
  try {
    const response = await fetch(`${STRAPI_URL}/api/privacy-policy`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({ data: privacyPolicyData }),
    });
    
    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Failed to seed Privacy Policy:', error);
      return;
    }
    
    console.log('✅ Privacy Policy seeded successfully!\n');
    
    console.log('📋 Next steps:');
    console.log('1. Go to Strapi Admin → Settings → Users & Permissions → Roles → Public');
    console.log('2. Enable "find" permission for Privacy Policy');
    console.log('3. Click Save');
    console.log('4. Go to Content Manager → Privacy Policy → Click "Publish"\n');
    
  } catch (error) {
    console.error('❌ Error seeding Privacy Policy:', error.message);
  }
}

seedPrivacyPolicy();
