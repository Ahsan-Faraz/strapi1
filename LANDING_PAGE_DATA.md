# Landing Page Content for Strapi

Go to **Content Manager → Landing Page** in Strapi admin and enter these values:

## Hero Section
- **heroTopLabel**: `Professional Cleaning Services`
- **heroHeading**: `Professional cleaning for your home`
- **heroSubheading**: `We make it easy to get your home cleaned. Professional cleaning services tailored to your needs.`
- **heroButtonText**: `See my price`
- **heroButtonLink**: `/booking`
- **heroFeature1**: `30-second pricing`
- **heroFeature2**: `100% Satisfaction guaranteed`

## How It Works Section
- **howItWorksHeading**: `How It Works`
- **step1Title**: `Order online`
- **step1Description**: `Our easy online pricing lets you set up a cleaning plan right now. See your price and get scheduled today.`
- **step1FeatureText**: `Takes less than 30 seconds`
- **step2Title**: `We clean your home`
- **step2Description**: `Our professional team arrives on time and cleans your home according to our 50-point checklist.`
- **step2FeatureText**: `Trained and background-checked professionals`
- **step3Title**: `Enjoy your clean home`
- **step3Description**: `Relax in your freshly cleaned space. We'll be back on your schedule - weekly, bi-weekly, or monthly.`
- **step3FeatureText**: `Flexible scheduling to fit your lifestyle`
- **howItWorksButtonText**: `Book Now`

## Checklist Section
- **checklistHeading**: `Our Cleaning Checklist`
- **checklistDescription**: `We follow a comprehensive 50-point checklist to ensure nothing is missed during your cleaning service.`
- **checklistButtonText**: `View Full Checklist`
- **checklistItems** (JSON):
```json
{
  "livingRoom": {
    "routine": ["Dust all surfaces and furniture", "Vacuum carpets and rugs", "Mop hard floors", "Clean mirrors and glass", "Empty trash bins", "Wipe light switches and door handles", "Straighten cushions and pillows", "Dust ceiling fans and light fixtures"],
    "deep": ["Clean inside windows", "Deep clean upholstery", "Clean baseboards", "Dust blinds and curtains", "Clean air vents", "Move furniture and clean underneath"],
    "moving": ["Clean inside all cabinets", "Clean inside closets", "Remove all marks from walls", "Deep clean all flooring"]
  },
  "kitchen": {
    "routine": ["Clean countertops and backsplash", "Clean exterior of appliances", "Clean stovetop and range hood", "Clean sink and faucet", "Wipe cabinet fronts", "Mop floors", "Empty trash and recycling", "Clean microwave inside and out"],
    "deep": ["Clean inside oven", "Clean inside refrigerator", "Degrease range hood filter", "Clean inside dishwasher", "Deep clean grout"],
    "moving": ["Clean inside all cabinets and drawers", "Clean behind and under appliances", "Remove all shelf liners"]
  },
  "bathroom": {
    "routine": ["Clean and sanitize toilet", "Clean shower and bathtub", "Clean sink and vanity", "Clean mirrors", "Mop floors", "Empty trash", "Replace towels if provided", "Wipe light switches and handles"],
    "deep": ["Deep clean grout and tile", "Clean exhaust fan", "Descale showerhead", "Clean inside medicine cabinet", "Polish chrome fixtures"],
    "moving": ["Clean inside all cabinets", "Remove soap scum buildup", "Clean behind toilet"]
  },
  "bedroom": {
    "routine": ["Make beds and change linens if provided", "Dust all surfaces", "Vacuum carpets", "Mop hard floors", "Empty trash", "Dust ceiling fan", "Clean mirrors", "Organize visible items"],
    "deep": ["Vacuum under bed", "Clean inside closet", "Dust blinds", "Clean baseboards", "Flip or rotate mattress"],
    "moving": ["Clean inside all closets", "Clean inside all drawers", "Remove marks from walls"]
  }
}
```

## Comparison Section
- **comparisonHeading**: `The Clensy <blue>Difference</blue>`
- **comparisonDescription**: `We're leading the cleaning industry in customer satisfaction and service quality. Try Clensy and see why cleaning is a big deal to us.`
- **comparisonButtonText**: `Book Now`
- **comparisonFeatures** (JSON):
```json
[
  { "name": "Locally Owned and Operated", "clensy": true, "others": true, "icon": "users" },
  { "name": "Customized Cleaning Packages", "clensy": true, "others": true, "icon": "settings" },
  { "name": "Easy Online Booking", "clensy": true, "others": false, "icon": "calendar" },
  { "name": "Over The Phone Estimates", "clensy": true, "others": false, "icon": "phone" },
  { "name": "Bonded and Insured", "clensy": true, "others": false, "icon": "shield-check" },
  { "name": "Eco-Friendly Supplies Included", "clensy": true, "others": false, "icon": "leaf" },
  { "name": "Background Checked Cleaners", "clensy": true, "others": false, "icon": "user-check" },
  { "name": "PRO Clean Promise", "clensy": true, "others": false, "icon": "medal" },
  { "name": "Premium Cleaning Supplies", "clensy": true, "others": false, "icon": "sparkles" }
]
```

## Reviews Section
- **reviewsHeading**: `What People Are <blue>Saying About Us</blue>`
- **reviewsButtonText**: `Load More`
- **testimonials** (JSON):
```json
[
  { "name": "Sarah Johnson", "title": "1 day ago", "text": "Monica was excellent. Went beyond in helping me. My sheets and comforter were not just washed but perfectly folded. Everything was spotless!", "rating": 5, "initial": "S", "initialColor": "#9C27B0" },
  { "name": "Michael Chen", "title": "3 days ago", "text": "Clensy does the best job taking care of our house. Bailey recently cleaned our home and did an amazing job. Very thorough and professional.", "rating": 5, "initial": "M", "initialColor": "#4CAF50" },
  { "name": "Emily Rodriguez", "title": "1 week ago", "text": "Arrived as planned! Great job! Everything polished. Baseboards done. Kitchen and bathroom spotless. Will definitely book again.", "rating": 5, "initial": "E", "initialColor": "#E91E63" },
  { "name": "David Thompson", "title": "2 weeks ago", "text": "My house was cleaned by Clensy today. Susan did a great job. I asked them to pay special attention to the kitchen and they delivered.", "rating": 5, "initial": "D", "initialColor": "#FF5722" },
  { "name": "Jennifer Lee", "title": "1 month ago", "text": "The team did a great job cleaning! They were professional, polite and very thorough. I'm so happy with the results!", "rating": 5, "initial": "J", "initialColor": "#2196F3" },
  { "name": "Robert Garcia", "title": "2 months ago", "text": "Awesome job by Rashida! Consistently excellent work! Keep it up! My home has never looked better.", "rating": 5, "initial": "R", "initialColor": "#673AB7" },
  { "name": "Maxine Patel", "title": "3 months ago", "text": "Maxine was terrific! Worked fast and accurate. Looking forward to her again!!!", "rating": 5, "initial": "P", "initialColor": "#3F51B5" },
  { "name": "Brandon Smith", "title": "4 months ago", "text": "Techs are so friendly and very efficient. You will not regret one single second!", "rating": 5, "initial": "B", "initialColor": "#4CAF50" }
]
```

## CTA Section
- **ctaHeading**: `Home cleaning you can trust`
- **ctaDescription**: `Book our professional cleaning services today and experience the difference.`
- **ctaLeftCardTitle**: `Order online`
- **ctaLeftCardDescription**: `Our easy online pricing lets you set up a cleaning plan right now.`
- **ctaLeftCardButtonText**: `See my price`
- **ctaRightCardTitle**: `Call us now`
- **ctaRightCardDescription**: `Need more information? Prefer a friendly voice over the phone?`
- **ctaRightCardButtonText**: `(551) 305-4081`

---

After entering all data, click **Save** then **Publish**.
