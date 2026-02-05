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
          'frame-src': ["'self'", 'https:', 'http://localhost:3000'],
          'frame-ancestors': ["'self'", 'https://clensy2-0.vercel.app', 'https://clensy.com', 'http://localhost:3000'],
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: (ctx) => {
        const allowedOrigins = [
          'http://localhost:3000',
          'https://clensy.com',
          'https://clensy2-0.vercel.app',
          process.env.FRONTEND_URL,
        ].filter(Boolean);
        
        const requestOrigin = ctx.request.header.origin;
        
        // Allow all Vercel preview deployments
        if (requestOrigin && requestOrigin.endsWith('.vercel.app')) {
          return requestOrigin;
        }
        
        // Allow explicitly listed origins
        if (allowedOrigins.includes(requestOrigin)) {
          return requestOrigin;
        }
        
        return false;
      },
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
