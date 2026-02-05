export default {
  async getStats(ctx) {
    try {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

      // Helper to safely count documents
      const safeCount = async (uid: string, filters: any = {}) => {
        try {
          return await strapi.documents(uid as any).count({ filters });
        } catch {
          return 0;
        }
      };

      // Helper to safely find documents
      const safeFind = async (uid: string, options: any = {}) => {
        try {
          return await strapi.documents(uid as any).findMany(options);
        } catch {
          return [];
        }
      };

      // Get total pages count (pages + landing pages + blog posts + locations)
      const [pages, landingPages, blogPosts, locations] = await Promise.all([
        safeCount('api::page.page', { publishedAt: { $notNull: true } }),
        safeCount('api::landing-page.landing-page', { publishedAt: { $notNull: true } }),
        safeCount('api::blog-post.blog-post', { publishedAt: { $notNull: true } }),
        safeCount('api::location.location', { publishedAt: { $notNull: true } }),
      ]);

      const totalPages = pages + landingPages + blogPosts + locations;

      // Get pages created this week
      const [pagesThisWeek, landingPagesThisWeek, blogPostsThisWeek, locationsThisWeek] = await Promise.all([
        safeCount('api::page.page', { publishedAt: { $gte: oneWeekAgo.toISOString() } }),
        safeCount('api::landing-page.landing-page', { publishedAt: { $gte: oneWeekAgo.toISOString() } }),
        safeCount('api::blog-post.blog-post', { publishedAt: { $gte: oneWeekAgo.toISOString() } }),
        safeCount('api::location.location', { publishedAt: { $gte: oneWeekAgo.toISOString() } }),
      ]);

      const pagesThisWeekCount = pagesThisWeek + landingPagesThisWeek + blogPostsThisWeek + locationsThisWeek;

      // Get all pages with SEO data to check for missing meta titles
      const allPages = await safeFind('api::page.page', {
        filters: { publishedAt: { $notNull: true } },
        populate: ['seo'],
      });

      const allLandingPages = await safeFind('api::landing-page.landing-page', {
        filters: { publishedAt: { $notNull: true } },
      });

      const allBlogPosts = await safeFind('api::blog-post.blog-post', {
        filters: { publishedAt: { $notNull: true } },
        populate: ['seo'],
      });

      const allLocations = await safeFind('api::location.location', {
        filters: { publishedAt: { $notNull: true } },
        populate: ['seo'],
      });

      // Count missing meta titles
      let missingMetaTitles = 0;
      
      allPages.forEach((page: any) => {
        if (!page.seo?.metaTitle) missingMetaTitles++;
      });

      allBlogPosts.forEach((post: any) => {
        if (!post.seo?.metaTitle) missingMetaTitles++;
      });

      allLocations.forEach((location: any) => {
        if (!location.seo?.metaTitle) missingMetaTitles++;
      });

      // Check for noindex pages
      let noindexPages = 0;
      let newNoindexPages = 0;

      [...allPages, ...allBlogPosts, ...allLocations].forEach((item: any) => {
        if (item.seo?.metaRobots?.includes('noindex')) {
          noindexPages++;
          if (item.publishedAt && new Date(item.publishedAt) >= oneWeekAgo) {
            newNoindexPages++;
          }
        }
      });

      // Check redirect issues
      const redirects = await safeFind('api::redirect.redirect', {
        filters: { isActive: true },
      });

      // Detect redirect loops
      const redirectLoops: any[] = [];
      redirects.forEach((redirect: any) => {
        const targetRedirect = redirects.find((r: any) => r.fromPath === redirect.toPath);
        if (targetRedirect && targetRedirect.toPath === redirect.fromPath) {
          redirectLoops.push({
            from: redirect.fromPath,
            to: redirect.toPath,
          });
        }
      });

      // Check for missing OG images
      let missingOgImages = 0;
      [...allPages, ...allBlogPosts, ...allLocations].forEach((item: any) => {
        if (item.openGraph && !item.openGraph.ogImage && !item.openGraph.ogImageUrl) {
          missingOgImages++;
        }
      });

      // Check for missing schema (landing pages)
      let missingSchemaPages = 0;
      allLandingPages.forEach((page: any) => {
        if (!page.schemaJsonLd || Object.keys(page.schemaJsonLd || {}).length === 0) {
          missingSchemaPages++;
        }
      });

      // Get recently edited pages
      const recentlyEdited = await safeFind('api::page.page', {
        filters: { publishedAt: { $notNull: true } },
        sort: { updatedAt: 'desc' },
        limit: 5,
        populate: ['updatedBy'],
      });

      const recentlyEditedFormatted = recentlyEdited.map((page: any) => ({
        id: page.id,
        title: page.title,
        slug: page.slug,
        type: 'Page',
        updatedAt: page.updatedAt,
        updatedBy: page.updatedBy?.username || 'Unknown',
        publishedAt: page.publishedAt,
      }));

      // Get recently published locations
      const recentlyPublishedLocations = await safeFind('api::location.location', {
        filters: { publishedAt: { $notNull: true } },
        sort: { publishedAt: 'desc' },
        limit: 3,
        populate: ['updatedBy'],
      });

      const recentlyPublishedFormatted = recentlyPublishedLocations.map((location: any) => ({
        id: location.id,
        title: location.name,
        slug: location.slug,
        type: 'Location',
        updatedAt: location.updatedAt,
        updatedBy: location.updatedBy?.username || 'Unknown',
        publishedAt: location.publishedAt,
      }));

      // Get recently published blog posts
      const recentlyPublishedBlogs = await safeFind('api::blog-post.blog-post', {
        filters: { publishedAt: { $notNull: true } },
        sort: { publishedAt: 'desc' },
        limit: 3,
        populate: ['updatedBy'],
      });

      const recentlyPublishedBlogsFormatted = recentlyPublishedBlogs.map((post: any) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        type: 'Blog',
        updatedAt: post.updatedAt,
        updatedBy: post.updatedBy?.username || 'Unknown',
        publishedAt: post.publishedAt,
      }));

      // Combine and sort all recent activities
      const allRecentActivities = [
        ...recentlyEditedFormatted.map((item: any) => ({ ...item, action: 'Edited' })),
        ...recentlyPublishedFormatted.map((item: any) => ({ ...item, action: 'Published' })),
        ...recentlyPublishedBlogsFormatted.map((item: any) => ({ ...item, action: 'Published' })),
      ]
        .sort((a: any, b: any) => new Date(b.updatedAt || b.publishedAt).getTime() - new Date(a.updatedAt || a.publishedAt).getTime())
        .slice(0, 5);

      // Format time ago
      const formatTimeAgo = (date: string) => {
        const now = new Date();
        const past = new Date(date);
        const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / 60000);
        
        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
        return `${Math.floor(diffInMinutes / 1440)} days ago`;
      };

      const recentActivitiesWithTime = allRecentActivities.map((item: any) => ({
        ...item,
        timeAgo: formatTimeAgo(item.updatedAt || item.publishedAt),
      }));

      ctx.body = {
        totalPages,
        pagesThisWeek: pagesThisWeekCount,
        missingMetaTitles,
        redirectIssues: redirects.length,
        redirectLoops: redirectLoops.length,
        noindexPages,
        newNoindexPages,
        missingOgImages,
        missingSchemaPages,
        recentActivities: recentActivitiesWithTime,
        sitemapStatus: 'synced',
        sitemapLastUpdated: new Date().toISOString(),
      };
    } catch (error: any) {
      ctx.throw(500, error);
    }
  },
};
