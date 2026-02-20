import { factories } from '@strapi/strapi';

// Selective populate: only fields needed for frontend (reduces payload and query time)
const LOCATION_BY_SLUG_POPULATE = [
  'heroBackgroundImage',
  'operatingHours',
  'serviceAreas',
  'seo',
  'openGraph',
  'localSeo',
  'schema',
  'scripts',
] as const;

export default factories.createCoreController('api::location.location', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    if (!slug) {
      return ctx.badRequest('Missing slug');
    }

    const status = ctx.query.status === 'draft' ? 'draft' : 'published';
    const entries = await strapi.documents('api::location.location').findMany({
      filters: { slug },
      status,
      populate: [...LOCATION_BY_SLUG_POPULATE],
    });

    const entry = Array.isArray(entries) ? entries[0] : entries;
    if (!entry) {
      // Try opposite status
      const fallbackStatus = status === 'published' ? 'draft' : 'published';
      const fallbackEntries = await strapi.documents('api::location.location').findMany({
        filters: { slug },
        status: fallbackStatus,
        populate: [...LOCATION_BY_SLUG_POPULATE],
      });
      const fallbackEntry = Array.isArray(fallbackEntries) ? fallbackEntries[0] : fallbackEntries;
      if (!fallbackEntry) {
        return ctx.notFound('Location not found');
      }
      const sanitized = await this.sanitizeOutput(fallbackEntry, ctx);
      return { data: [sanitized] };
    }

    const sanitized = await this.sanitizeOutput(entry, ctx);
    return { data: [sanitized] };
  },
}));



