'use strict';

/**
 * landing-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::landing-page.landing-page', ({ strapi }) => ({
  async find(ctx) {
    const entity = await strapi.documents('api::landing-page.landing-page').findFirst({
      populate: '*',
      status: 'published',
    });
    
    // If no published version, try draft
    if (!entity) {
      const draft = await strapi.documents('api::landing-page.landing-page').findFirst({
        populate: '*',
      });
      return { data: draft };
    }
    
    return { data: entity };
  },

  async update(ctx) {
    const { data } = ctx.request.body;
    
    // Find existing document
    const existing = await strapi.documents('api::landing-page.landing-page').findFirst();
    
    let entity;
    if (existing) {
      // Update existing
      entity = await strapi.documents('api::landing-page.landing-page').update({
        documentId: existing.documentId,
        data,
        status: 'published',
      });
    } else {
      // Create new
      entity = await strapi.documents('api::landing-page.landing-page').create({
        data,
        status: 'published',
      });
    }
    
    return { data: entity };
  },

  async delete(ctx) {
    const existing = await strapi.documents('api::landing-page.landing-page').findFirst();
    
    if (existing) {
      await strapi.documents('api::landing-page.landing-page').delete({
        documentId: existing.documentId,
      });
    }
    
    return { data: null };
  },
}));
