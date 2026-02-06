export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          'frame-src': ["'self'", 'https:', 'http://localhost:3000', 'http://72.60.27.190'],
          'frame-ancestors': ["'self'", 'https://clensy2-0.vercel.app', 'https://*.vercel.app', 'https://clensy.com', 'http://localhost:3000', 'http://localhost:1337', 'http://72.60.27.190'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: '*',
      headers: ['*'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
