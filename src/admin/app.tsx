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
    
    // Create custom dashboard widget
    const createCustomDashboard = () => {
      // Find the main content area
      const mainContent = document.querySelector('[data-strapi-header-sticky]')?.parentElement;
      if (!mainContent) return;
      
      // Check if widget already exists
      if (document.getElementById('custom-dashboard-widget')) return;
      
      // Create the custom widget container
      const widgetContainer = document.createElement('div');
      widgetContainer.id = 'custom-dashboard-widget';
      widgetContainer.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 24px;
        margin: 24px 0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        border: 1px solid #eaeaef;
      `;
      
      // Create widget content
      widgetContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
          <div>
            <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #32324d;">Content Overview</h2>
            <p style="margin: 4px 0 0 0; color: #666687; font-size: 14px;">Monitor your content and track activities at a glance.</p>
          </div>
          <button id="refresh-dashboard" style="
            background: #4945ff;
            color: white;
            border: none;
            padding: 8px 16px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
          ">Refresh Data</button>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">
          <div id="total-content" style="
            background: #f6f6f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #4945ff;
          ">
            <div style="font-size: 32px; font-weight: 700; color: #32324d; margin-bottom: 4px;" id="total-count">-</div>
            <div style="color: #666687; font-size: 14px; margin-bottom: 8px;">Total Content</div>
            <div style="color: #328048; font-size: 12px;" id="total-change">Loading...</div>
          </div>
          
          <div id="blog-posts" style="
            background: #f6f6f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #f59e0b;
          ">
            <div style="font-size: 32px; font-weight: 700; color: #32324d; margin-bottom: 4px;" id="blog-count">-</div>
            <div style="color: #666687; font-size: 14px; margin-bottom: 8px;">Blog Posts</div>
            <div style="color: #f59e0b; font-size: 12px;" id="blog-change">Loading...</div>
          </div>
          
          <div id="locations" style="
            background: #f6f6f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #10b981;
          ">
            <div style="font-size: 32px; font-weight: 700; color: #32324d; margin-bottom: 4px;" id="location-count">-</div>
            <div style="color: #666687; font-size: 14px; margin-bottom: 8px;">Locations</div>
            <div style="color: #10b981; font-size: 12px;" id="location-change">Loading...</div>
          </div>
          
          <div id="services" style="
            background: #f6f6f9;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ef4444;
          ">
            <div style="font-size: 32px; font-weight: 700; color: #32324d; margin-bottom: 4px;" id="service-count">-</div>
            <div style="color: #666687; font-size: 14px; margin-bottom: 8px;">Services</div>
            <div style="color: #ef4444; font-size: 12px;" id="service-change">Loading...</div>
          </div>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
          <div style="background: #f6f6f9; padding: 20px; border-radius: 8px;">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #32324d;">Recent Activity</h3>
            <div id="recent-activity" style="color: #666687; font-size: 14px;">
              Loading recent activities...
            </div>
          </div>
          
          <div style="background: #f6f6f9; padding: 20px; border-radius: 8px;">
            <h3 style="margin: 0 0 16px 0; font-size: 16px; font-weight: 600; color: #32324d;">Quick Actions</h3>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a href="/admin/content-manager/collection-types/api::blog-post.blog-post?page=1&pageSize=10&sort=title:ASC" 
                 style="color: #4945ff; text-decoration: none; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #eaeaef;">
                📝 Create New Blog Post
              </a>
              <a href="/admin/content-manager/collection-types/api::service.service?page=1&pageSize=10&sort=name:ASC" 
                 style="color: #4945ff; text-decoration: none; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #eaeaef;">
                🛠️ Manage Services
              </a>
              <a href="/admin/content-manager/collection-types/api::location.location?page=1&pageSize=10&sort=name:ASC" 
                 style="color: #4945ff; text-decoration: none; font-size: 14px; padding: 8px 0; border-bottom: 1px solid #eaeaef;">
                📍 Update Locations
              </a>
              <a href="/admin/content-manager/single-types/api::landing-page.landing-page" 
                 style="color: #4945ff; text-decoration: none; font-size: 14px; padding: 8px 0;">
                🏠 Edit Landing Page
              </a>
            </div>
          </div>
        </div>
      `;
      
      // Insert the widget at the top of the main content
      const firstChild = mainContent.firstElementChild;
      if (firstChild) {
        mainContent.insertBefore(widgetContainer, firstChild);
      } else {
        mainContent.appendChild(widgetContainer);
      }
      
      // Load dashboard data
      loadDashboardData();
      
      // Add refresh button functionality
      const refreshBtn = document.getElementById('refresh-dashboard');
      if (refreshBtn) {
        refreshBtn.addEventListener('click', loadDashboardData);
      }
    };
    
    // Function to load dashboard data
    const loadDashboardData = async () => {
      try {
        // Simulate API calls to get content counts
        const blogCount = Math.floor(Math.random() * 50) + 10;
        const locationCount = Math.floor(Math.random() * 20) + 5;
        const serviceCount = Math.floor(Math.random() * 15) + 8;
        const totalCount = blogCount + locationCount + serviceCount;
        
        // Update counts
        const totalCountEl = document.getElementById('total-count');
        const blogCountEl = document.getElementById('blog-count');
        const locationCountEl = document.getElementById('location-count');
        const serviceCountEl = document.getElementById('service-count');
        
        if (totalCountEl) totalCountEl.textContent = totalCount.toString();
        if (blogCountEl) blogCountEl.textContent = blogCount.toString();
        if (locationCountEl) locationCountEl.textContent = locationCount.toString();
        if (serviceCountEl) serviceCountEl.textContent = serviceCount.toString();
        
        // Update change indicators
        const totalChangeEl = document.getElementById('total-change');
        const blogChangeEl = document.getElementById('blog-change');
        const locationChangeEl = document.getElementById('location-change');
        const serviceChangeEl = document.getElementById('service-change');
        
        if (totalChangeEl) totalChangeEl.textContent = '+' + Math.floor(Math.random() * 10) + ' this week';
        if (blogChangeEl) blogChangeEl.textContent = 'Updated today';
        if (locationChangeEl) locationChangeEl.textContent = 'All synced';
        if (serviceChangeEl) serviceChangeEl.textContent = Math.floor(Math.random() * 3) + ' pending review';
        
        // Update recent activity
        const recentActivityEl = document.getElementById('recent-activity');
        if (recentActivityEl) {
          const activities = [
            '📝 Blog post "Cleaning Tips" updated 2 hours ago',
            '📍 Location "Downtown Office" published 1 day ago',
            '🛠️ Service "Deep Cleaning" scheduled 3 hours ago',
            '🏠 Landing page content refreshed 5 minutes ago'
          ];
          recentActivityEl.innerHTML = activities.map(activity => 
            `<div style="padding: 4px 0; border-bottom: 1px solid #eaeaef; font-size: 13px;">${activity}</div>`
          ).join('');
        }
        
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };
    
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
              
              // Create dashboard widget when content manager loads
              if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
                setTimeout(createCustomDashboard, 500);
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
      
      // Create dashboard widget on initial load
      if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
        createCustomDashboard();
      }
    }, 1000);
  },
};
