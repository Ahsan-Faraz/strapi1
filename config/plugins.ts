export default ({ env }) => ({
  seo: {
    enabled: true,
  },
  'strapi-page-builder': {
    enabled: true,
    config: {
      apiKey: env('STRAPI_PAGE_BUILDER_API_KEY', ''),
    },
  },
  'users-permissions': {
    config: {
      jwt: {
        expiresIn: '7d',
      },
      ratelimit: {
        interval: 60000,
        max: 100,
      },
    },
  },
});
