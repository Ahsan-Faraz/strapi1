import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1754578702/x50aedpsjrpfubhn0d8b_-_Edited_cvx0kj.png',
    },
    // Replace the Strapi logo in the main navigation
    menu: {
      logo: 'https://res.cloudinary.com/dgjmm3usy/image/upload/v1754578702/x50aedpsjrpfubhn0d8b_-_Edited_cvx0kj.png',
    },
    // Override theme to force light mode
    theme: {
      light: {
        colors: {
          // Light theme colors - keeping defaults but ensuring light mode
          primary100: '#f0f0ff',
          primary200: '#e0e0ff',
          primary500: '#7b79ff',
          primary600: '#4945ff',
          primary700: '#271fe0',
          neutral0: '#ffffff',
          neutral100: '#f6f6f9',
          neutral200: '#eaeaef',
          neutral500: '#8e8ea9',
          neutral600: '#6b6b7a',
          neutral700: '#4945ff',
          neutral800: '#32324d',
          neutral900: '#212134',
          danger700: '#b72b1a',
        },
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  bootstrap(app: StrapiApp) {
    console.log('Strapi Admin Panel initialized');
  },
};

