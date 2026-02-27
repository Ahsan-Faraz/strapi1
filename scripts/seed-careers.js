/**
 * Seed Careers Page into Strapi via REST API
 *
 * Run: npm run seed:careers
 * Requires: Strapi running (npm run dev) + API token with update permission
 *
 * NOTE: Careers is also seeded on Strapi startup via bootstrap (src/index.ts).
 * If REST seed only partially works (e.g. only benefits), restart Strapi
 * (npm run dev) to trigger bootstrap which seeds all fields reliably.
 *
 * Setup API Token in Strapi:
 * 1. Admin → Settings → API Tokens (or Global settings → API Tokens)
 * 2. Create token with "Full access" OR Custom: find + update for Careers Page
 * 3. Add STRAPI_API_TOKEN to strapi1/.env
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';
const API_PREFIX = process.env.STRAPI_API_PREFIX || 'admin/api';

const careersPageData = {
  heroTopLabel: "Now Hiring - Multiple Positions",
  heroHeading: "Join The Clensy Team",
  heroDescription:
    "Build a rewarding career with New Jersey's premier cleaning service. We offer competitive pay, great benefits, and opportunities for growth in a supportive environment.",
  heroPrimaryButtonText: "View Open Positions",
  heroSecondaryButtonText: "Apply Now",
  heroTeamMembersCount: "50+",
  heroImageUrl:
    "https://www.stathakis.com/hs-fs/hubfs/cleaning-team-more-efficient.png?width=837&height=554&name=cleaning-team-more-efficient.png",
  benefitsHeading: "Why Work With Us?",
  benefitsDescription:
    "We believe in taking care of our team members because happy employees provide the best service to our customers.",
  benefits: [
    {
      icon: "DollarSign",
      title: "Competitive Pay",
      description: "Above-market wages with performance bonuses and regular raises",
    },
    {
      icon: "Shield",
      title: "Health Benefits",
      description: "Comprehensive health, dental, and vision insurance coverage",
    },
    {
      icon: "Clock",
      title: "Flexible Schedule",
      description: "Work-life balance with flexible hours and part-time options",
    },
    {
      icon: "TrendingUp",
      title: "Career Growth",
      description:
        "Training programs and advancement opportunities within the company",
    },
    {
      icon: "Users",
      title: "Team Environment",
      description: "Supportive team culture with collaborative work environment",
    },
    {
      icon: "Award",
      title: "Recognition Program",
      description: "Employee of the month awards and performance recognition",
    },
  ],
  positionsHeading: "Open Positions",
  positionsDescription:
    "Find the perfect role that matches your skills and career goals.",
  positions: [
    {
      title: "Residential Cleaner",
      type: "Full-time / Part-time",
      location: "Multiple NJ Counties",
      description:
        "Join our residential cleaning team and help families maintain beautiful, clean homes.",
      requirements: [
        "Previous cleaning experience preferred but not required",
        "Reliable transportation",
        "Attention to detail",
        "Physical ability to perform cleaning tasks",
        "Background check required",
      ],
      salary: "$18-22/hour",
      link: "https://jobs.gusto.com/postings/clensy-cleaning-residential-cleaner-3c7fb08b-f3fa-4a1a-b198-b2490e6ff648",
    },
    {
      title: "Commercial Cleaner",
      type: "Full-time / Part-time",
      location: "Multiple NJ Counties",
      description:
        "Clean offices, medical facilities, and commercial spaces with our professional team.",
      requirements: [
        "Experience in commercial cleaning preferred",
        "Ability to work evenings/weekends",
        "Reliable and punctual",
        "Team player attitude",
        "Background check required",
      ],
      salary: "$19-23/hour",
      link: "",
    },
    {
      title: "Team Leader",
      type: "Full-time",
      location: "Bergen County",
      description:
        "Lead a team of cleaners and ensure quality standards are met on every job.",
      requirements: [
        "2+ years cleaning experience",
        "Leadership experience",
        "Valid driver's license",
        "Excellent communication skills",
        "Quality control mindset",
      ],
      salary: "$25-30/hour",
      link: "",
    },
    {
      title: "Customer Service Representative",
      type: "Full-time",
      location: "Remote/Office",
      description:
        "Help customers schedule services and manage their cleaning needs.",
      requirements: [
        "Customer service experience",
        "Excellent phone skills",
        "Computer proficiency",
        "Problem-solving abilities",
        "Bilingual (English/Spanish) preferred",
      ],
      salary: "$17-21/hour",
      link: "",
    },
  ],
  testimonialsHeading: "What Our Team Says",
  testimonialsDescription:
    "Hear from our employees about their experience working at Clensy.",
  employeeTestimonials: [
    {
      name: "Sarah M.",
      position: "Residential Cleaner",
      content:
        "I love working at Clensy! The team is supportive, the pay is great, and I have the flexibility I need for my family.",
      rating: 5,
    },
    {
      name: "Mike Rodriguez",
      position: "Team Leader",
      content:
        "Started as a cleaner and worked my way up to team leader. Clensy really invests in their employees' growth.",
      rating: 5,
    },
    {
      name: "Lisa Chen",
      position: "Commercial Cleaner",
      content:
        "Best cleaning company I've worked for. They provide all the equipment and training you need to succeed.",
      rating: 5,
    },
  ],
  applicationHeading: "Ready to Join Our Team?",
  applicationDescription:
    "Fill out the application below and we'll get back to you within 24 hours.",
  applicationSubmitButtonText: "Submit Application",
  contactHeading: "Have Questions About Working With Us?",
  contactDescription:
    "Contact our HR team for more information about career opportunities.",
  contactPhoneText: "Call Us: (551) 305-4081",
  contactEmailText: "Email: careers@clensy.com",
  applicationFormEnabled: true,
};

async function run() {
  console.log("🔐 Seeding Careers Page...");
  console.log(`   Target: ${STRAPI_URL}/${API_PREFIX}/careers-page\n`);

  if (!STRAPI_API_TOKEN) {
    console.error("❌ STRAPI_API_TOKEN is required. Add it to strapi1/.env");
    console.log("\n📋 To create an API Token:");
    console.log("   1. Open Strapi Admin → Settings → API Tokens");
    console.log(
      "   2. Create new token with \"Full access\" (or Custom: find+update for Careers Page)"
    );
    console.log("   3. Add STRAPI_API_TOKEN=your-token to strapi1/.env\n");
    process.exit(1);
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  };

  const res = await fetch(`${STRAPI_URL}/${API_PREFIX}/careers-page`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ data: careersPageData }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("❌ Failed:", err);
    if (res.status === 403 || res.status === 500) {
      console.log("\n💡 Token may lack \"update\" permission. In Strapi Admin:");
      console.log(
        "   Settings → API Tokens → Edit your token → Enable \"update\" for Careers Page\n"
      );
    }
    process.exit(1);
  }

  console.log("✅ Careers Page seeded!");
  console.log(
    `   (${careersPageData.benefits.length} benefits, ${careersPageData.positions.length} positions, ${careersPageData.employeeTestimonials.length} testimonials)\n`
  );
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
