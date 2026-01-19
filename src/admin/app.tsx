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
              
              // Only add widgets if we're on the home page
              if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
                setTimeout(() => addCustomWidgets(), 500);
              }
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

    // Function to fetch content statistics
    const fetchContentStats = async () => {
      try {
        const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
        if (!token) {
          return { blogPosts: 0, services: 0, locations: 0, totalContent: 0 };
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [blogResponse, servicesResponse, locationsResponse] = await Promise.all([
          fetch('/admin/content-manager/collection-types/api::blog-post.blog-post?page=1&pageSize=1', { headers }),
          fetch('/admin/content-manager/collection-types/api::service.service?page=1&pageSize=1', { headers }),
          fetch('/admin/content-manager/collection-types/api::location.location?page=1&pageSize=1', { headers })
        ]);

        const [blogData, servicesData, locationsData] = await Promise.all([
          blogResponse.ok ? blogResponse.json() : { pagination: { total: 0 } },
          servicesResponse.ok ? servicesResponse.json() : { pagination: { total: 0 } },
          locationsResponse.ok ? locationsResponse.json() : { pagination: { total: 0 } }
        ]);

        const blogPosts = blogData.pagination?.total || 0;
        const services = servicesData.pagination?.total || 0;
        const locations = locationsData.pagination?.total || 0;

        return {
          blogPosts,
          services,
          locations,
          totalContent: blogPosts + services + locations
        };
      } catch (error) {
        console.error('Error fetching content stats:', error);
        return { blogPosts: 0, services: 0, locations: 0, totalContent: 0 };
      }
    };

    // Function to add custom widgets (only once)
    const addCustomWidgets = async () => {
      // Check if we're on the home page and widgets haven't been added yet
      if (window.location.pathname !== '/admin' && window.location.pathname !== '/admin/') {
        return;
      }

      if (document.querySelector('#custom-widgets-container')) {
        return; // Already added
      }

      // Wait for the main content to be available
      const mainContent = document.querySelector('main[data-strapi="main-content"]') || 
                          document.querySelector('main') || 
                          document.querySelector('[role="main"]');
      
      if (!mainContent) {
        return;
      }

      const stats = await fetchContentStats();
      
      // Create widgets container
      const widgetsContainer = document.createElement('div');
      widgetsContainer.id = 'custom-widgets-container';
      widgetsContainer.style.cssText = `
        margin: 0 0 32px 0;
        padding: 24px;
        background: transparent;
      `;

      // Create header
      const header = document.createElement('div');
      header.style.cssText = `
        margin-bottom: 24px;
      `;

      const title = document.createElement('h2');
      title.textContent = 'Content Overview';
      title.style.cssText = `
        font-size: 24px;
        font-weight: 600;
        color: #32324d;
        margin: 0 0 8px 0;
      `;

      const subtitle = document.createElement('p');
      subtitle.textContent = 'Monitor your content and track activities at a glance.';
      subtitle.style.cssText = `
        font-size: 14px;
        color: #666687;
        margin: 0;
      `;

      header.appendChild(title);
      header.appendChild(subtitle);

      // Create widgets grid
      const widgetsGrid = document.createElement('div');
      widgetsGrid.style.cssText = `
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
        gap: 16px;
      `;

      // Widget data
      const widgets = [
        {
          title: 'Total Content',
          value: stats.totalContent.toString(),
          subtitle: 'All published content',
          color: '#4945ff',
          bgColor: '#f0f0ff'
        },
        {
          title: 'Blog Posts',
          value: stats.blogPosts.toString(),
          subtitle: 'Published articles',
          color: '#328048',
          bgColor: '#f0fff4'
        },
        {
          title: 'Services',
          value: stats.services.toString(),
          subtitle: 'Active services',
          color: '#b72b1a',
          bgColor: '#fff5f5'
        },
        {
          title: 'Locations',
          value: stats.locations.toString(),
          subtitle: 'Service areas',
          color: '#b54708',
          bgColor: '#fffbeb'
        }
      ];

      // Create widget elements
      widgets.forEach(widget => {
        const widgetElement = document.createElement('div');
        widgetElement.style.cssText = `
          background: white;
          border: 1px solid #eaeaef;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
          cursor: pointer;
        `;

        widgetElement.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
            <div style="width: 40px; height: 40px; border-radius: 8px; background: ${widget.bgColor}; display: flex; align-items: center; justify-content: center;">
              <div style="width: 20px; height: 20px; background: ${widget.color}; border-radius: 4px;"></div>
            </div>
          </div>
          <div style="font-size: 28px; font-weight: 700; color: #32324d; margin-bottom: 4px;">${widget.value}</div>
          <div style="font-size: 16px; font-weight: 600; color: #32324d; margin-bottom: 4px;">${widget.title}</div>
          <div style="font-size: 14px; color: #666687;">${widget.subtitle}</div>
        `;

        widgetElement.addEventListener('mouseenter', () => {
          widgetElement.style.transform = 'translateY(-2px)';
          widgetElement.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });

        widgetElement.addEventListener('mouseleave', () => {
          widgetElement.style.transform = 'translateY(0)';
          widgetElement.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });

        widgetsGrid.appendChild(widgetElement);
      });

      // Assemble the widgets
      widgetsContainer.appendChild(header);
      widgetsContainer.appendChild(widgetsGrid);

      // Insert widgets at the top of main content
      const firstChild = mainContent.firstChild;
      if (firstChild) {
        mainContent.insertBefore(widgetsContainer, firstChild);
      } else {
        mainContent.appendChild(widgetsContainer);
      }
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
      
      // Hide unwanted collection types and add widgets only on home page
      hideUnwantedCollectionTypes();
      
      if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
        setTimeout(() => addCustomWidgets(), 1000);
      }
    }, 1500);
  },
};
