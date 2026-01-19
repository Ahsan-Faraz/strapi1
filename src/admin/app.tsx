import type { StrapiApp } from '@strapi/strapi/admin';

/**
 * Force sidebar to stay expanded by injecting CSS
 */
function expandSidebar(): void {
  const style = document.createElement('style');
  style.textContent = `
    /* Force sidebar to stay expanded */
    nav[class*="sc-"] {
      width: 240px !important;
      min-width: 240px !important;
    }
    
    /* Ensure text labels are always visible */
    nav[class*="sc-"] .sc-lgpSej {
      opacity: 1 !important;
      visibility: visible !important;
      display: inline !important;
    }
    
    /* Adjust main content area to accommodate expanded sidebar */
    main[class*="sc-"] {
      margin-left: 240px !important;
    }
    
    /* Hide the hamburger menu button since sidebar is always expanded */
    button[aria-controls="burger-menu"] {
      display: none !important;
    }
    
    /* Ensure sidebar items have proper spacing */
    nav[class*="sc-"] ul li {
      padding: 8px 16px !important;
    }
    
    /* Make sure icons and text are properly aligned */
    nav[class*="sc-"] a[class*="sc-"] {
      display: flex !important;
      align-items: center !important;
      gap: 12px !important;
      padding: 12px 16px !important;
      width: 100% !important;
    }
    
    /* Ensure the logo area is properly sized */
    nav[class*="sc-"] > div:first-child {
      padding: 16px !important;
    }
  `;
  document.head.appendChild(style);
}

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
    console.log(app);
    
    // Inject CSS to expand sidebar when DOM is ready
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', expandSidebar);
      } else {
        expandSidebar();
      }
    }
  },
};
