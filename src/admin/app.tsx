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
    // Custom translations to change "Collection Types" to "Listings" and "Single Types" to "Single Pages"
    translations: {
      en: {
        'content-manager.containers.Home.collectionTypes': 'Listings',
        'content-manager.containers.Home.singleTypes': 'Single Pages',
        'content-manager.components.DragLayer.item.collection-type': 'Listing',
        'content-manager.components.DragLayer.item.single-type': 'Single Page',
        'content-type-builder.menu.section.models.name.collectionType': 'Listing',
        'content-type-builder.menu.section.models.name.singleType': 'Single Page',
        'content-type-builder.menu.section.models.name.collectionTypes': 'Listings',
        'content-type-builder.menu.section.models.name.singleTypes': 'Single Pages',
        'global.collectionType': 'Listing',
        'global.singleType': 'Single Page',
        'global.collectionTypes': 'Listings',
        'global.singleTypes': 'Single Pages',
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { releases: false },
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
    
    // Add custom CSS to hide specific collection types
    const style = document.createElement('style');
    style.textContent = `
      /* Hide Redirect collection type */
      a[href*="/admin/content-manager/collection-types/api::redirect.redirect"] {
        display: none !important;
      }
      
      /* Hide Page collection type */
      a[href*="/admin/content-manager/collection-types/api::page.page"] {
        display: none !important;
      }
      
      /* Hide User collection type */
      a[href*="/admin/content-manager/collection-types/plugin::users-permissions.user"] {
        display: none !important;
      }
      
      /* Hide the parent li elements as well */
      li:has(a[href*="/admin/content-manager/collection-types/api::redirect.redirect"]) {
        display: none !important;
      }
      
      li:has(a[href*="/admin/content-manager/collection-types/api::page.page"]) {
        display: none !important;
      }
      
      li:has(a[href*="/admin/content-manager/collection-types/plugin::users-permissions.user"]) {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Replace text content using MutationObserver
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              if (node.textContent === 'Collection Types') {
                node.textContent = 'Listings';
              } else if (node.textContent === 'Single Types') {
                node.textContent = 'Single Pages';
              }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT,
                null,
                false
              );
              
              let textNode;
              while (textNode = walker.nextNode()) {
                if (textNode.textContent === 'Collection Types') {
                  textNode.textContent = 'Listings';
                } else if (textNode.textContent === 'Single Types') {
                  textNode.textContent = 'Single Pages';
                }
              }
              
              // Also hide elements after DOM changes
              hideUnwantedCollectionTypes();
            }
          });
        }
      });
    });
    
    // Function to hide unwanted collection types
    const hideUnwantedCollectionTypes = () => {
      // Hide by href attribute
      const redirectLinks = document.querySelectorAll('a[href*="/admin/content-manager/collection-types/api::redirect.redirect"]');
      const pageLinks = document.querySelectorAll('a[href*="/admin/content-manager/collection-types/api::page.page"]');
      const userLinks = document.querySelectorAll('a[href*="/admin/content-manager/collection-types/plugin::users-permissions.user"]');
      
      [...redirectLinks, ...pageLinks, ...userLinks].forEach(link => {
        const listItem = link.closest('li');
        if (listItem) {
          listItem.style.display = 'none';
        }
      });
    };
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Replace existing text and hide elements on page load
    setTimeout(() => {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let textNode;
      while (textNode = walker.nextNode()) {
        if (textNode.textContent === 'Collection Types') {
          textNode.textContent = 'Listings';
        } else if (textNode.textContent === 'Single Types') {
          textNode.textContent = 'Single Pages';
        }
      }
      
      // Hide unwanted collection types
      hideUnwantedCollectionTypes();
    }, 1000);
  },
};
