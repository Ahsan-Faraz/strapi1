import type { StrapiApp } from '@strapi/strapi/admin';

/**
 * Finds and replaces "Content Manager" with "Maaz" throughout the admin panel
 */
function replaceContentManagerWithMaaz(): void {
  const replaceText = (node: Node): void => {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent && node.textContent.includes('Content Manager')) {
        node.textContent = node.textContent.replace(/Content Manager/g, 'Maaz');
      }
      if (node.textContent && node.textContent.includes('Content manager')) {
        node.textContent = node.textContent.replace(/Content manager/g, 'Maaz');
      }
    } else {
      node.childNodes.forEach(replaceText);
    }
  };

  // Replace in document body
  replaceText(document.body);

  // Also check and replace in document title
  if (document.title.includes('Content Manager')) {
    document.title = document.title.replace(/Content Manager/g, 'Maaz');
  }
}

/**
 * Sets up a MutationObserver to continuously watch for DOM changes
 * and replace "Content Manager" with "Maaz" as new elements are added
 */
function setupContentManagerObserver(): void {
  // Initial replacement
  replaceContentManagerWithMaaz();

  // Create observer to watch for DOM changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      // Check added nodes
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          replaceContentManagerWithMaaz();
        }
      });
      
      // Check if text content changed
      if (mutation.type === 'characterData') {
        replaceContentManagerWithMaaz();
      }
    });
  });

  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  // Also run periodically to catch any missed changes
  setInterval(replaceContentManagerWithMaaz, 1000);
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
    // Use translations to replace "Content Manager" with "Maaz"
    translations: {
      en: {
        'content-manager.plugin.name': 'Maaz',
        'app.components.LeftMenu.navbrand.title': 'Maaz Dashboard',
        'content-manager.header.name': 'Maaz',
      },
    },
  },
  bootstrap(_app: StrapiApp) {
    console.log('Strapi Admin Panel initialized');
    
    // Wait for DOM to be ready, then setup the observer
    if (typeof window !== 'undefined') {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupContentManagerObserver);
      } else {
        setupContentManagerObserver();
      }
    }
  },
};


