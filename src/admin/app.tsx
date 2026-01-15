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
    // Locales for the admin panel
    locales: ['en'],
  },
  bootstrap(app: StrapiApp) {
    console.log('Strapi Admin Panel initialized');
    
    // Inject custom CSS to keep sidebar expanded with visible labels
    const style = document.createElement('style');
    style.innerHTML = `
      /* Keep sidebar always expanded */
      nav[aria-label="Main Navigation"] {
        width: 230px !important;
        min-width: 230px !important;
      }
      
      /* Always show menu item labels */
      nav[aria-label="Main Navigation"] span {
        display: inline !important;
        opacity: 1 !important;
        visibility: visible !important;
        width: auto !important;
        overflow: visible !important;
      }
      
      /* Hide the collapse button */
      nav[aria-label="Main Navigation"] button[aria-label="Collapse the navbar"],
      nav[aria-label="Main Navigation"] button[aria-label="Expand the navbar"] {
        display: none !important;
      }
      
      /* Ensure main content adjusts */
      main {
        margin-left: 230px !important;
      }
      
      /* Style menu items for better readability */
      nav[aria-label="Main Navigation"] a,
      nav[aria-label="Main Navigation"] button {
        padding: 10px 16px !important;
        font-size: 14px !important;
      }
      
      /* Make sure the logo area is visible */
      nav[aria-label="Main Navigation"] > div:first-child {
        padding: 16px !important;
      }
    `;
    document.head.appendChild(style);
  },
};


