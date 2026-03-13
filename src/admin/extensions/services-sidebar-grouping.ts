/**
 * Sidebar Grouping
 *
 * - Services & Locations: visible under Listings (collection types),
 *   hidden from Single Pages (single types) if any leftover entries exist.
 * - Injects grouped sections for single-type pages:
 *   Company, FAQ, Contact Us, Legal, Landing Page, Global Settings.
 * Always expanded.
 */

interface ServiceDef {
  slug: string;
  label: string;
}

interface GroupDef {
  id: string;
  label: string;
  services: ServiceDef[];
}

// Services and Locations are now collection types — no more individual single-type entries.
// We link directly to the collection type list views.

const COMPANY: ServiceDef[] = [
  { slug: 'checklist-page', label: 'Checklist Page' },
  { slug: 'about', label: 'About Us' },
  { slug: 'careers-page', label: 'Careers Page' },
];

const FAQ: ServiceDef[] = [
  { slug: 'faq-page', label: 'FAQ Page' },
];

const CONTACT: ServiceDef[] = [
  { slug: 'contact', label: 'Contact Us Page' },
];

const LEGAL: ServiceDef[] = [
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'terms-of-service', label: 'Terms of Service' },
];

const LANDING: ServiceDef[] = [
  { slug: 'landing-page', label: 'Landing Page' },
];

const SETTINGS: ServiceDef[] = [
  { slug: 'global-setting', label: 'Global Settings' },
];

const ALL_EXTRA_SLUGS = [
  ...COMPANY.map((c) => c.slug),
  ...FAQ.map((f) => f.slug),
  ...CONTACT.map((c) => c.slug),
  ...LEGAL.map((l) => l.slug),
  ...LANDING.map((l) => l.slug),
  ...SETTINGS.map((s) => s.slug),
];
const ALL_SLUGS = [...ALL_EXTRA_SLUGS];

function getSingleTypeUrl(slug: string): string {
  return `/admin/content-manager/single-types/api::${slug}.${slug}`;
}

/* ------------------------------------------------------------------ */
/*  CSS                                                                */
/* ------------------------------------------------------------------ */

function injectStyles(): void {
  if (document.getElementById('clensy-svc-styles')) return;

  const style = document.createElement('style');
  style.id = 'clensy-svc-styles';
  style.textContent = `
    /* ---- Theme-aware color vars ---- */
    :root {
      --clensy-heading: #32324d;
      --clensy-subheading: #8e8ea9;
      --clensy-link: #666687;
      --clensy-link-hover-bg: #f0f0ff;
      --clensy-link-hover: #4945ff;
      --clensy-active-bg: #f0f0ff;
      --clensy-active: #4945ff;
    }
    /* Dark mode — detected by JS and set as data-clensy-theme */
    [data-clensy-theme="dark"] {
      --clensy-heading: #f6f6f9;
      --clensy-subheading: #a5a5ba;
      --clensy-link: #c0c0cf;
      --clensy-link-hover-bg: rgba(73,69,255,0.15);
      --clensy-link-hover: #7b79ff;
      --clensy-active-bg: rgba(73,69,255,0.2);
      --clensy-active: #7b79ff;
    }

    /* ---- Hide Service & Location from Single Pages only ---- */
    /* Collection-type (Listings) items are left visible. */
    nav li:has(> a[href*="/single-types/api::service.service"]),
    nav li:has(> a[href*="/single-types/api::location.location"]) {
      display: none !important;
    }

    /* ---- Main heading (Services, Locations, etc.) ---- */
    .clensy-svc-heading {
      padding: 10px 12px 4px;
      font-size: 14px;
      font-weight: 700;
      color: var(--clensy-heading);
      font-family: inherit;
    }

    /* ---- Subgroup heading (Residential / Commercial) ---- */
    .clensy-svc-subheading {
      padding: 8px 12px 4px 20px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--clensy-subheading);
      font-family: inherit;
    }

    /* ---- Individual service links ---- */
    .clensy-svc-link {
      display: flex;
      align-items: center;
      padding: 7px 12px 7px 32px;
      font-size: 12px;
      color: var(--clensy-link);
      text-decoration: none;
      border-radius: 4px;
      margin: 1px 4px;
      transition: background 0.15s, color 0.15s;
      font-family: inherit;
    }
    .clensy-svc-link:hover {
      background: var(--clensy-link-hover-bg);
      color: var(--clensy-link-hover);
    }
    .clensy-svc-link[data-active="true"] {
      background: var(--clensy-active-bg);
      color: var(--clensy-active);
      font-weight: 600;
    }

    /* ---- Flat section links (Locations, Company, etc.) ---- */
    .clensy-loc-link {
      display: flex;
      align-items: center;
      padding: 7px 12px 7px 20px;
      font-size: 12px;
      color: var(--clensy-link);
      text-decoration: none;
      border-radius: 4px;
      margin: 1px 4px;
      transition: background 0.15s, color 0.15s;
      font-family: inherit;
    }
    .clensy-loc-link:hover {
      background: var(--clensy-link-hover-bg);
      color: var(--clensy-link-hover);
    }
    .clensy-loc-link[data-active="true"] {
      background: var(--clensy-active-bg);
      color: var(--clensy-active);
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);
}

/* ------------------------------------------------------------------ */
/*  DOM construction                                                   */
/* ------------------------------------------------------------------ */

function createFlatSection(id: string, title: string, items: ServiceDef[]): HTMLElement {
  const wrapper = document.createElement('li');
  wrapper.id = id;

  const heading = document.createElement('div');
  heading.className = 'clensy-svc-heading';
  heading.textContent = title;
  wrapper.appendChild(heading);

  for (const item of items) {
    const link = document.createElement('a');
    link.className = 'clensy-loc-link';
    link.href = getSingleTypeUrl(item.slug);
    link.textContent = item.label;
    link.addEventListener('click', onLinkClick);
    wrapper.appendChild(link);
  }

  return wrapper;
}

/* ------------------------------------------------------------------ */
/*  Navigation                                                         */
/* ------------------------------------------------------------------ */

function onLinkClick(e: Event): void {
  e.preventDefault();
  const href = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
  if (!href) return;

  // Client-side navigation via pushState + popstate
  window.history.pushState(null, '', href);
  window.dispatchEvent(new PopStateEvent('popstate'));

  requestAnimationFrame(refreshActiveStates);
}

function refreshActiveStates(): void {
  const path = window.location.pathname;
  document
    .querySelectorAll<HTMLAnchorElement>('.clensy-svc-link, .clensy-loc-link')
    .forEach((a) => {
      a.setAttribute('data-active', String(path === a.getAttribute('href')));
    });
}

/* ------------------------------------------------------------------ */
/*  Hide original flat items                                           */
/* ------------------------------------------------------------------ */

const SECTION_IDS = [
  'clensy-company-dropdown',
  'clensy-faq-dropdown',
  'clensy-contact-dropdown',
  'clensy-legal-dropdown',
  'clensy-landing-dropdown',
  'clensy-settings-dropdown',
];

function hideOriginals(): void {
  // Hide original single-type items that are now grouped
  for (const slug of ALL_SLUGS) {
    const a = document.querySelector<HTMLAnchorElement>(
      `nav a[href*="api::${slug}.${slug}"]`
    );
    if (!a) continue;
    const li = a.closest('li');
    if (li && !SECTION_IDS.includes(li.id)) {
      li.style.display = 'none';
    }
  }

  // Hide Service & Location from Single Pages (single-types) only.
  // They remain visible under Listings (collection-types).
  const singleTypeSlugs = ['service', 'location'];
  for (const name of singleTypeSlugs) {
    document
      .querySelectorAll<HTMLAnchorElement>(`nav a[href*="/single-types/api::${name}.${name}"]`)
      .forEach((a) => {
        const li = a.closest('li');
        if (li) li.style.display = 'none';
      });
  }
}

/* ------------------------------------------------------------------ */
/*  Theme detection                                                    */
/* ------------------------------------------------------------------ */

function detectAndApplyTheme(): void {
  const root = document.documentElement;

  // Check explicit Strapi theme attributes
  const htmlTheme = root.getAttribute('data-theme');
  const bodyTheme = document.body?.getAttribute('data-theme');

  if (htmlTheme === 'dark' || bodyTheme === 'dark' ||
      root.classList.contains('theme-dark') ||
      document.body?.classList.contains('theme-dark')) {
    root.setAttribute('data-clensy-theme', 'dark');
    return;
  }

  if (htmlTheme === 'light' || bodyTheme === 'light') {
    root.setAttribute('data-clensy-theme', 'light');
    return;
  }

  // Sample background color of the content-manager sidebar to detect dark mode
  const sidebar = document.querySelector('nav[aria-label]') || document.querySelector('nav');
  if (sidebar) {
    const bg = getComputedStyle(sidebar).backgroundColor;
    const match = bg.match(/(\d+)/g);
    if (match && match.length >= 3) {
      const [r, g, b] = match.map(Number);
      const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      root.setAttribute('data-clensy-theme', luminance < 0.4 ? 'dark' : 'light');
      return;
    }
  }

  // Fall back to system preference
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-clensy-theme', prefersDark ? 'dark' : 'light');
}

/* ------------------------------------------------------------------ */
/*  Injection logic                                                    */
/* ------------------------------------------------------------------ */

function findSidebarList(): HTMLElement | null {
  // Find the sidebar nav list by looking for any single-type or collection-type link
  const anyLink = document.querySelector<HTMLAnchorElement>(
    'nav a[href*="/content-manager/"]'
  );
  if (!anyLink) return null;
  const li = anyLink.closest('li');
  return li?.parentElement || null;
}

function tryInject(): void {
  const parentList = findSidebarList();
  if (!parentList) return;

  // Company section
  injectFlatSection('clensy-company-dropdown', 'Company', COMPANY, 'checklist-page');

  // FAQ section
  injectFlatSection('clensy-faq-dropdown', 'FAQ', FAQ, 'faq-page');

  // Contact Us section
  injectFlatSection('clensy-contact-dropdown', 'Contact Us', CONTACT, 'contact');

  // Legal section
  injectFlatSection('clensy-legal-dropdown', 'Legal', LEGAL, 'privacy-policy');

  // Landing Page section
  injectFlatSection('clensy-landing-dropdown', 'Landing Page', LANDING, 'landing-page');

  // Global Settings section
  injectFlatSection('clensy-settings-dropdown', 'Global Settings', SETTINGS, 'global-setting');

  hideOriginals();
  refreshActiveStates();
}

function injectFlatSection(
  id: string,
  title: string,
  items: ServiceDef[],
  anchorSlug: string
): void {
  if (document.getElementById(id)) return;

  const anchor = document.querySelector<HTMLAnchorElement>(
    `nav a[href*="api::${anchorSlug}.${anchorSlug}"]`
  );
  if (!anchor) return;

  const anchorLi = anchor.closest('li');
  const parentList = anchorLi?.parentElement;
  if (!parentList) return;

  hideOriginals();
  const section = createFlatSection(id, title, items);
  parentList.insertBefore(section, anchorLi);
}

/* ------------------------------------------------------------------ */
/*  Public entry point – called from bootstrap()                       */
/* ------------------------------------------------------------------ */

export function setupServicesSidebarGrouping(): void {
  injectStyles();
  detectAndApplyTheme();

  // Periodically check: re-hide originals, re-inject if React re-rendered, and sync theme
  setInterval(() => {
    detectAndApplyTheme();
    if (window.location.pathname.includes('/content-manager')) {
      hideOriginals();
      tryInject();
    }
  }, 800);

  // Keep active state in sync on back / forward
  window.addEventListener('popstate', () =>
    requestAnimationFrame(refreshActiveStates)
  );

  // React to system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', detectAndApplyTheme);
}
