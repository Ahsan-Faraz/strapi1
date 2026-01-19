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
  register(app: StrapiApp) {
    console.log('=== Strapi Admin App Register Called ===');
    console.log('App object:', app);
    console.log('Has widgets property:', 'widgets' in app);
    console.log('Widgets type:', typeof app.widgets);
    
    // Register custom dashboard widgets
    if ('widgets' in app && typeof app.widgets?.register === 'function') {
      console.log('✅ Widgets API is available! Registering custom widgets...');
      // Total Pages Widget
      app.widgets.register({
        id: 'total-pages',
        title: {
          id: 'admin.dashboard.totalPages.title',
          defaultMessage: 'Total Pages',
        },
        component: async () => {
          const { default: TotalPagesWidget } = await import('./extensions/widgets/TotalPagesWidget');
          return TotalPagesWidget;
        },
        link: {
          href: '/admin/content-manager',
          label: {
            id: 'admin.dashboard.totalPages.link',
            defaultMessage: 'View all pages',
          },
        },
      });

      // Missing Meta Titles Widget
      app.widgets.register({
        id: 'missing-meta-titles',
        title: {
          id: 'admin.dashboard.missingMetaTitles.title',
          defaultMessage: 'Missing Meta Titles',
        },
        component: async () => {
          const { default: MissingMetaTitlesWidget } = await import('./extensions/widgets/MissingMetaTitlesWidget');
          return MissingMetaTitlesWidget;
        },
        link: {
          href: '/admin/content-manager/collection-types/api::page.page',
          label: {
            id: 'admin.dashboard.missingMetaTitles.link',
            defaultMessage: 'Fix now',
          },
        },
      });

      // Redirect Issues Widget
      app.widgets.register({
        id: 'redirect-issues',
        title: {
          id: 'admin.dashboard.redirectIssues.title',
          defaultMessage: 'Redirect Issues',
        },
        component: async () => {
          const { default: RedirectIssuesWidget } = await import('./extensions/widgets/RedirectIssuesWidget');
          return RedirectIssuesWidget;
        },
        link: {
          href: '/admin/content-manager/collection-types/api::redirect.redirect',
          label: {
            id: 'admin.dashboard.redirectIssues.link',
            defaultMessage: 'View redirects',
          },
        },
      });

      // Sitemap Status Widget
      app.widgets.register({
        id: 'sitemap-status',
        title: {
          id: 'admin.dashboard.sitemapStatus.title',
          defaultMessage: 'Sitemap Status',
        },
        component: async () => {
          const { default: SitemapStatusWidget } = await import('./extensions/widgets/SitemapStatusWidget');
          return SitemapStatusWidget;
        },
      });

      // SEO Issues Widget
      app.widgets.register({
        id: 'seo-issues',
        title: {
          id: 'admin.dashboard.seoIssues.title',
          defaultMessage: 'Open SEO Issues',
        },
        component: async () => {
          const { default: SeoIssuesWidget } = await import('./extensions/widgets/SeoIssuesWidget');
          return SeoIssuesWidget;
        },
      });

      // Recently Edited Widget
      app.widgets.register({
        id: 'recently-edited',
        title: {
          id: 'admin.dashboard.recentlyEdited.title',
          defaultMessage: 'Recently Edited Pages',
        },
        component: async () => {
          const { default: RecentlyEditedWidget } = await import('./extensions/widgets/RecentlyEditedWidget');
          return RecentlyEditedWidget;
        },
      });
      console.log('Custom widgets registered successfully');
    } else {
      console.warn('Widgets API not available. Strapi version might be too old or widgets API not supported.');
    }
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
    
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
              
              // Hide specific collection types after DOM changes
              hideUnwantedCollectionTypes();
            }
          });
        }
      });
    });
    
    // Function to hide unwanted collection types
    const hideUnwantedCollectionTypes = () => {
      // Find and hide specific collection types by their href
      const linksToHide = [
        'a[href*="/admin/content-manager/collection-types/api::redirect.redirect"]',
        'a[href*="/admin/content-manager/collection-types/api::page.page"]', 
        'a[href*="/admin/content-manager/collection-types/plugin::users-permissions.user"]'
      ];
      
      linksToHide.forEach(selector => {
        const links = document.querySelectorAll(selector);
        links.forEach(link => {
          const listItem = link.closest('li');
          if (listItem) {
            listItem.style.display = 'none';
          }
        });
      });
      
      // Update the count to show only visible collection types (3 instead of 6)
      const countElements = document.querySelectorAll('span.sc-bRKDuR.bCZExY.sc-fhHczv.dkpjez');
      countElements.forEach(countElement => {
        if (countElement.textContent === '6') {
          countElement.textContent = '3';
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
