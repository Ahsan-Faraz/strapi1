import { factories } from '@strapi/strapi';

// Selective populate: only fields needed for frontend (reduces payload and query time)
const SERVICE_BY_SLUG_POPULATE = [
  'heroBackgroundImage',
  'cleaningAreas',
  'featureSectionImage',
  'step1Image',
  'step2Image',
  'step3Image',
  'benefitsImage',
  'clientTestimonials',
  'faqs',
  'seo',
  'openGraph',
  'schema',
  'scripts',
  'htmlBlocks',
  'extrasPricing',
  'premiumExtraServices',
  'howToAddExtraServicesSteps',
  'extrasTrustIndicators',
  'extrasClientTestimonials',
  'reduceStressSection',
  'beforeAfter',
  'deepCleaningComparison',
  'whenToChoose',
  'successStories',
  'serviceFeatures',
  'businessBenefits',
  'specializedEquipment',
  'healthAndSafetyStandards',
  'serviceTrustIndicators',
  'movingClientTestimonials',
  'postConstructionSafety',
  'postConstructionClientTestimonials',
];

export default factories.createCoreController('api::service.service', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return ctx.badRequest('Missing slug');
    }

    const status = ctx.query.status === 'draft' ? 'draft' : 'published';
    const entries = await strapi.documents('api::service.service').findMany({
      filters: { slug },
      status,
      populate: SERVICE_BY_SLUG_POPULATE as never,
    });

    const entry = Array.isArray(entries) ? entries[0] : entries;
    if (!entry) {
      const fallbackStatus = status === 'published' ? 'draft' : 'published';
      const fallbackEntries = await strapi.documents('api::service.service').findMany({
        filters: { slug },
        status: fallbackStatus,
        populate: SERVICE_BY_SLUG_POPULATE as never,
      });
      const fallbackEntry = Array.isArray(fallbackEntries) ? fallbackEntries[0] : fallbackEntries;
      if (!fallbackEntry) {
        return ctx.notFound('Service not found');
      }
      const sanitized = await this.sanitizeOutput(fallbackEntry, ctx);
      return { data: [sanitized] };
    }

    const sanitized = await this.sanitizeOutput(entry, ctx);
    return { data: [sanitized] };
  },
}));



