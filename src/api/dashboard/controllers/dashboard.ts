const CACHE_TTL_MS = 5 * 60 * 1000;
let statsCache: { data: any; time: number } | null = null;
let statsPromise: Promise<any> | null = null;

const PUBLISHED = { status: 'published' as const };

export default {
  async getStats(ctx) {
    if (statsCache && Date.now() - statsCache.time < CACHE_TTL_MS) {
      ctx.body = statsCache.data;
      return;
    }
    if (!statsPromise) {
      statsPromise = (async () => {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const safeCount = async (uid: string, opts: { filters?: any; status?: string } = {}) => {
          try {
            const params: any = {};
            if (opts.filters) params.filters = opts.filters;
            if (opts.status) params.status = opts.status;
            return await strapi.documents(uid as any).count(params);
          } catch { return 0; }
        };
        const safeFind = async (uid: string, options: any = {}) => {
          try { return await strapi.documents(uid as any).findMany(options); } catch { return []; }
        };
        const [pages, landingPages, blogPosts, locations] = await Promise.all([
          safeCount('api::page.page', { ...PUBLISHED }),
          safeCount('api::landing-page.landing-page', { ...PUBLISHED }),
          safeCount('api::blog-post.blog-post', { ...PUBLISHED }),
          safeCount('api::location.location', { ...PUBLISHED }),
        ]);
        const totalPages = pages + landingPages + blogPosts + locations;
        const [pw, lw, bw, lcw] = await Promise.all([
          safeCount('api::page.page', { status: 'published', filters: { publishedAt: { $gte: oneWeekAgo.toISOString() } } }),
          safeCount('api::landing-page.landing-page', { status: 'published', filters: { publishedAt: { $gte: oneWeekAgo.toISOString() } } }),
          safeCount('api::blog-post.blog-post', { status: 'published', filters: { publishedAt: { $gte: oneWeekAgo.toISOString() } } }),
          safeCount('api::location.location', { status: 'published', filters: { publishedAt: { $gte: oneWeekAgo.toISOString() } } }),
        ]);
        const pagesThisWeekCount = pw + lw + bw + lcw;
        const redirectCount = await safeCount('api::redirect.redirect', { filters: { isActive: true } });
        const [allPages, allLandingPages, allBlogPosts, allLocations, redirects] = await Promise.all([
          safeFind('api::page.page', { ...PUBLISHED, populate: ['seo', 'openGraph'], limit: 200 }),
          safeFind('api::landing-page.landing-page', { ...PUBLISHED, limit: 20 }),
          safeFind('api::blog-post.blog-post', { ...PUBLISHED, populate: ['seo', 'openGraph'], limit: 200 }),
          safeFind('api::location.location', { ...PUBLISHED, populate: ['seo', 'openGraph'], limit: 200 }),
          safeFind('api::redirect.redirect', { filters: { isActive: true }, limit: 500 }),
        ]);
        let missingMetaTitles = 0, noindexPages = 0, newNoindexPages = 0, missingOgImages = 0, missingSchemaPages = 0;
        [...allPages, ...allBlogPosts, ...allLocations].forEach((item: any) => {
          if (!item.seo?.metaTitle) missingMetaTitles++;
          if (item.seo?.metaRobots?.includes('noindex')) { noindexPages++; if (item.publishedAt && new Date(item.publishedAt) >= oneWeekAgo) newNoindexPages++; }
          if (item.openGraph && !item.openGraph.ogImage && !item.openGraph.ogImageUrl) missingOgImages++;
        });
        allLandingPages.forEach((page: any) => {
          if (!page.schemaJsonLd || Object.keys(page.schemaJsonLd || {}).length === 0) missingSchemaPages++;
        });
        const redirectLoops: any[] = [];
        redirects.forEach((r: any) => {
          const t = redirects.find((x: any) => x.fromPath === r.toPath);
          if (t && t.toPath === r.fromPath) redirectLoops.push({ from: r.fromPath, to: r.toPath });
        });
        const [recentlyEdited, recentlyPublishedLocations, recentlyPublishedBlogs] = await Promise.all([
          safeFind('api::page.page', { ...PUBLISHED, sort: { updatedAt: 'desc' }, limit: 5, populate: ['updatedBy'] }),
          safeFind('api::location.location', { ...PUBLISHED, sort: { publishedAt: 'desc' }, limit: 3, populate: ['updatedBy'] }),
          safeFind('api::blog-post.blog-post', { ...PUBLISHED, sort: { publishedAt: 'desc' }, limit: 3, populate: ['updatedBy'] }),
        ]);
        const fmt = (p: any) => ({ id: p.id, title: p.title || p.name, slug: p.slug, type: p.name ? 'Location' : (p.slug ? 'Page' : 'Blog'), updatedAt: p.updatedAt, updatedBy: p.updatedBy?.username || 'Unknown', publishedAt: p.publishedAt });
        const allRecent = [...recentlyEdited.map((p: any) => ({ ...fmt(p), type: 'Page', action: 'Edited' })), ...recentlyPublishedLocations.map((p: any) => ({ ...fmt(p), type: 'Location', action: 'Published' })), ...recentlyPublishedBlogs.map((p: any) => ({ ...fmt(p), type: 'Blog', action: 'Published' }))]
          .sort((a: any, b: any) => new Date(b.updatedAt || b.publishedAt).getTime() - new Date(a.updatedAt || a.publishedAt).getTime()).slice(0, 5);
        const formatTimeAgo = (d: string) => { const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000); return m < 60 ? `${m} min ago` : m < 1440 ? `${Math.floor(m/60)}h ago` : `${Math.floor(m/1440)}d ago`; };
        return { totalPages, pagesThisWeek: pagesThisWeekCount, missingMetaTitles, redirectIssues: redirectCount, redirectLoops: redirectLoops.length, noindexPages, newNoindexPages, missingOgImages, missingSchemaPages, recentActivities: allRecent.map((i: any) => ({ ...i, timeAgo: formatTimeAgo(i.updatedAt || i.publishedAt) })), sitemapStatus: 'synced', sitemapLastUpdated: new Date().toISOString() };
      })();
    }
    try {
      const body = await statsPromise;
      statsCache = { data: body, time: Date.now() };
      statsPromise = null;
      ctx.body = body;
    } catch (e) {
      statsPromise = null;
      throw e;
    }
    return;
  },
};
