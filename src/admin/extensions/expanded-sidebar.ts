/**
 * Expanded Main Sidebar
 *
 * Forces the Strapi admin main navigation (icon sidebar) to always show
 * text labels next to icons on desktop (≥ 1080px). The mobile behaviour
 * (horizontal top-bar + burger menu) is preserved untouched.
 */

const SIDEBAR_WIDTH = '220px';

/* ------------------------------------------------------------------ */
/*  CSS                                                                */
/* ------------------------------------------------------------------ */

function injectStyles(): void {
  if (document.getElementById('clensy-expanded-nav')) return;

  const style = document.createElement('style');
  style.id = 'clensy-expanded-nav';
  style.textContent = `
    /* Hide injected labels by default (mobile) */
    .clensy-nav-label {
      display: none;
    }

    @media (min-width: 1080px) {
      /* ---- Widen the main nav sidebar ---- */
      .clensy-nav-expanded {
        width: ${SIDEBAR_WIDTH} !important;
        min-width: ${SIDEBAR_WIDTH} !important;
      }

      /* ---- Stretch items in the nav list ---- */
      .clensy-nav-expanded ul {
        align-items: stretch !important;
      }

      /* ---- Tooltip wrapper span — fill available width ---- */
      .clensy-nav-expanded ul li > * {
        width: 100% !important;
        display: block !important;
      }

      /* ---- Nav link: icon + label side by side ---- */
      .clensy-nav-expanded a[aria-label] {
        gap: 12px !important;
        padding-inline: 12px !important;
      }

      /* ---- Visible label next to icon ---- */
      .clensy-nav-label {
        display: inline !important;
        font-size: 1.4rem;
        font-weight: 500;
        color: inherit;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      /* Bold label on active link */
      .clensy-nav-expanded a.active .clensy-nav-label {
        font-weight: 600;
      }
    }
  `;
  document.head.appendChild(style);
}

/* ------------------------------------------------------------------ */
/*  DOM helpers                                                        */
/* ------------------------------------------------------------------ */

function getMainNav(): HTMLElement | null {
  const navs = document.querySelectorAll('nav');
  for (const nav of navs) {
    if (
      nav.querySelector('a[href="/admin"]') ||
      nav.querySelector('a[href*="/content-manager"]')
    ) {
      return nav as HTMLElement;
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/*  Injection logic                                                    */
/* ------------------------------------------------------------------ */

function expandNav(): void {
  const nav = getMainNav();
  if (!nav) return;

  // Apply expansion class
  if (!nav.classList.contains('clensy-nav-expanded')) {
    nav.classList.add('clensy-nav-expanded');
  }

  // Inject visible label spans next to each icon
  const links = nav.querySelectorAll<HTMLAnchorElement>('a[aria-label]');
  for (const link of links) {
    if (link.querySelector('.clensy-nav-label')) continue;

    const label = link.getAttribute('aria-label');
    if (!label) continue;

    const span = document.createElement('span');
    span.className = 'clensy-nav-label';
    span.textContent = label;
    link.appendChild(span);
  }
}

/* ------------------------------------------------------------------ */
/*  Public entry point – called from bootstrap()                       */
/* ------------------------------------------------------------------ */

export function setupExpandedSidebar(): void {
  injectStyles();

  // Periodically re-inject in case React re-renders
  setInterval(expandNav, 800);
}
