export default {
  register() {},

  async bootstrap({ strapi }: { strapi: any }) {
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
