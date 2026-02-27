import type { StrapiApp } from '@strapi/strapi/admin';
import { File, ArrowRight, CheckCircle, Search, Clock } from '@strapi/icons';

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
    // Register custom dashboard widgets
    if ('widgets' in app && typeof app.widgets?.register === 'function') {
      // Total Pages Widget
      app.widgets.register({
        id: 'total-pages',
        title: {
          id: 'admin.dashboard.totalPages.title',
          defaultMessage: 'Total Pages',
        },
        icon: File,
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
        icon: File,
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
        icon: ArrowRight,
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
        icon: CheckCircle,
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
        icon: Search,
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
        icon: Clock,
        component: async () => {
          const { default: RecentlyEditedWidget } = await import('./extensions/widgets/RecentlyEditedWidget');
          return RecentlyEditedWidget;
        },
      });
    }
  },
  bootstrap(_app: StrapiApp) {
    // Lightweight: Removed heavy MutationObserver and TreeWalker (observed entire DOM on every change).
    // Use config.translations for "Listings" / "Single Pages" - no runtime DOM mutation needed.
  },
};
