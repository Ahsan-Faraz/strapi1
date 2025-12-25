// Function to generate preview pathname based on content type and document
const getPreviewPathname = (uid: string, { locale, document }: { locale?: string; document: any }): string | null => {
  const { slug } = document || {};

  // Handle different content types with their specific URL patterns
  switch (uid) {
    // Service pages
    case 'api::service.service': {
      if (!slug) {
        return '/services';
      }
      return `/services/${slug}`;
    }
    // Location pages
    case 'api::location.location': {
      if (!slug) {
        return '/locations';
      }
      return `/locations/${slug}`;
    }
    // Blog posts
    case 'api::blog-post.blog-post': {
      if (!slug) {
        return '/blog';
      }
      return `/blog/${slug}`;
    }
    // Generic pages
    case 'api::page.page': {
      if (!slug) {
        return null;
      }
      return `/${slug}`;
    }
    // Landing page
    case 'api::landing-page.landing-page': {
      return '/';
    }
    // FAQ page
    case 'api::faq-page.faq-page': {
      return '/faq';
    }
    // About page
    case 'api::about.about': {
      return '/company/about';
    }
    // Contact page
    case 'api::contact.contact': {
      return '/contact';
    }
    // Careers page
    case 'api::careers-page.careers-page': {
      return '/careers';
    }
    // Checklist page
    case 'api::checklist-page.checklist-page': {
      return '/company/checklist';
    }
    // Privacy policy
    case 'api::privacy-policy.privacy-policy': {
      return '/privacy-policy';
    }
    // Terms of service
    case 'api::terms-of-service.terms-of-service': {
      return '/terms-of-service';
    }
    // Global settings and other single types don't have preview
    default: {
      return null;
    }
  }
};

export default ({ env }) => {
  // Get environment variables for preview
  // In production, use the production URL, otherwise use localhost for development
  const isProduction = env('NODE_ENV') === 'production';
  const clientUrl = env('CLIENT_URL') || 
                    env('NEXT_PUBLIC_SITE_URL') || 
                    (isProduction ? 'https://clensy2.0.vercel.app' : 'http://localhost:3000');
  const previewSecret = env('PREVIEW_SECRET') || 
                        env('NEXT_PUBLIC_PREVIEW_SECRET') || 
                        env('STRAPI_PREVIEW_SECRET') ||
                        'your-secret-key';

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    secrets: {
      encryptionKey: env('ENCRYPTION_KEY'),
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
    // Preview configuration
    preview: {
      enabled: true,
      config: {
        allowedOrigins: clientUrl,
        async handler(uid: string, { documentId, locale, status }: { documentId: string; locale?: string; status?: string }) {
          try {
            // Fetch the complete document from Strapi
            const document = await strapi.documents(uid as any).findOne({ documentId });

            // Generate the preview pathname based on content type and document
            const pathname = getPreviewPathname(uid, { locale, document });

            // Disable preview if the pathname is not found
            if (!pathname) {
              return null;
            }

            // Use Next.js draft mode passing it a secret key and the content-type status
            const urlSearchParams = new URLSearchParams({
              url: pathname,
              secret: previewSecret,
              status: status || 'published',
            });
            return `${clientUrl}/api/preview?${urlSearchParams}`;
          } catch (error) {
            console.error('Preview handler error:', error);
            return null;
          }
        },
      },
    },
  };
};
