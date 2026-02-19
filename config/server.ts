export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // On VPS: Strapi is served at clensy.com via Nginx proxy
  // The url tells Strapi its public-facing base URL so admin API calls go to the right place
  url: env('STRAPI_PUBLIC_URL', 'https://clensy.com'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
