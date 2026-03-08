/* ------------------------------------------------------------------ *
 *  On-demand revalidation: notify the Next.js frontend whenever any   *
 *  content is published, updated, unpublished, or deleted so the      *
 *  live site refreshes within seconds instead of waiting for ISR.     *
 * ------------------------------------------------------------------ */

const FRONTEND_REVALIDATE_URL = process.env.FRONTEND_REVALIDATE_URL; // e.g. https://clensy.com/api/revalidate?secret=YOUR_SECRET

async function triggerRevalidation(model: string) {
  if (!FRONTEND_REVALIDATE_URL) return;
  try {
    const res = await fetch(FRONTEND_REVALIDATE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model }),
    });
    const json: any = await res.json().catch(() => ({}));
    strapi.log.info(
      `[revalidate] ${model} → ${res.status} ${JSON.stringify(json.revalidated ?? [])}`
    );
  } catch (err) {
    strapi.log.error(`[revalidate] failed for ${model}: ${err}`);
  }
}

export default {
  register() {},
  async bootstrap() {
    // Document-service middleware: fires for every content type
    strapi.documents.use(async (context, next) => {
      const result = await next();

      const actions = ['publish', 'unpublish', 'update', 'delete', 'create'];
      if (actions.includes(context.action)) {
        // context.uid = "api::about.about", "api::routine-cleaning.routine-cleaning", etc.
        const uid = context.uid as string;
        if (uid?.startsWith('api::')) {
          // Fire-and-forget so it doesn't slow down the admin
          triggerRevalidation(uid);
        }
      }

      return result;
    });
  },
};
