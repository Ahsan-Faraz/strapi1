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
  bootstrap() {
    // Inject custom CSS to force sidebar expanded
    const style = document.createElement('style');
    style.textContent = `
      /* Force left navigation sidebar to be expanded */
      nav[aria-label="Main Navigation"] {
        width: 224px !important;
        min-width: 224px !important;
      }
      
      /* Show text labels in sidebar */
      nav[aria-label="Main Navigation"] span {
        display: inline !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      
      /* Ensure nav items show full width */
      nav[aria-label="Main Navigation"] a,
      nav[aria-label="Main Navigation"] button {
        justify-content: flex-start !important;
        padding-left: 12px !important;
        padding-right: 12px !important;
      }
      
      /* Hide the collapse/expand toggle button */
      nav[aria-label="Main Navigation"] button[aria-label="Collapse the navbar"],
      nav[aria-label="Main Navigation"] button[aria-label="Expand the navbar"] {
        display: none !important;
      }
      
      /* Adjust main content area to account for expanded sidebar */
      main {
        margin-left: 224px !important;
      }
    `;
    document.head.appendChild(style);
    console.log('Strapi Admin Panel initialized with expanded sidebar');
  },
};


