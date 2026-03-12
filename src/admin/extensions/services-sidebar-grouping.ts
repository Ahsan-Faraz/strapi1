/**
 * Sidebar Grouping
 *
 * Injects grouped sections into the Content Manager sidebar:
 *  - Services (Residential / Commercial subheadings)
 *  - Locations (flat list)
 *  - Company (Checklist, About Us, Careers)
 *  - FAQ
 *  - Contact Us
 *  - Legal (Privacy Policy, Terms of Service)
 *  - Landing Page
 *  - Global Settings
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

const GROUPS: GroupDef[] = [
  {
    id: 'residential',
    label: 'Residential',
    services: [
      { slug: 'routine-cleaning', label: 'Routine Cleaning' },
      { slug: 'deep-cleaning', label: 'Deep Cleaning' },
      { slug: 'airbnb-cleaning', label: 'Airbnb Cleaning' },
      { slug: 'moving-cleaning', label: 'Moving Cleaning' },
      { slug: 'post-construction-cleaning', label: 'Post Construction' },
      { slug: 'extras-cleaning', label: 'Extras' },
    ],
  },
  {
    id: 'commercial',
    label: 'Commercial',
    services: [
      { slug: 'office-cleaning', label: 'Office Cleaning' },
      { slug: 'medical-cleaning', label: 'Medical Cleaning' },
      { slug: 'gym-cleaning', label: 'Gym Cleaning' },
      { slug: 'retail-cleaning', label: 'Retail Cleaning' },
      { slug: 'school-cleaning', label: 'School Cleaning' },
      { slug: 'property-cleaning', label: 'Property Cleaning' },
      { slug: 'other-commercial-cleaning', label: 'Other Commercial' },
    ],
  },
];

const LOCATIONS: ServiceDef[] = [
  { slug: 'bergen-county', label: 'Bergen County' },
  { slug: 'essex-county', label: 'Essex County' },
  { slug: 'hudson-county', label: 'Hudson County' },
  { slug: 'morris-county', label: 'Morris County' },
  { slug: 'passaic-county', label: 'Passaic County' },
  { slug: 'union-county', label: 'Union County' },
];

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

const ALL_SERVICE_SLUGS = GROUPS.flatMap((g) => g.services.map((s) => s.slug));
const ALL_LOCATION_SLUGS = LOCATIONS.map((l) => l.slug);
const ALL_EXTRA_SLUGS = [
  ...COMPANY.map((c) => c.slug),
  ...FAQ.map((f) => f.slug),
  ...CONTACT.map((c) => c.slug),
  ...LEGAL.map((l) => l.slug),
  ...LANDING.map((l) => l.slug),
  ...SETTINGS.map((s) => s.slug),
];
const ALL_SLUGS = [...ALL_SERVICE_SLUGS, ...ALL_LOCATION_SLUGS, ...ALL_EXTRA_SLUGS];

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
    [data-theme="dark"], .theme-dark {
      --clensy-heading: #f6f6f9;
      --clensy-subheading: #a5a5ba;
      --clensy-link: #c0c0cf;
      --clensy-link-hover-bg: rgba(73,69,255,0.15);
      --clensy-link-hover: #7b79ff;
      --clensy-active-bg: rgba(73,69,255,0.2);
      --clensy-active: #7b79ff;
    }
    /* Auto-detect via prefers-color-scheme if no data-theme attr */
    @media (prefers-color-scheme: dark) {
      :root:not([data-theme="light"]) {
        --clensy-heading: #f6f6f9;
        --clensy-subheading: #a5a5ba;
        --clensy-link: #c0c0cf;
        --clensy-link-hover-bg: rgba(73,69,255,0.15);
        --clensy-link-hover: #7b79ff;
        --clensy-active-bg: rgba(73,69,255,0.2);
        --clensy-active: #7b79ff;
      }
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

function createGroupedSection(): HTMLElement {
  const wrapper = document.createElement('li');
  wrapper.id = 'clensy-services-dropdown';

  // Main heading
  const heading = document.createElement('div');
  heading.className = 'clensy-svc-heading';
  heading.textContent = 'Services';
  wrapper.appendChild(heading);

  // Build each subgroup
  for (const group of GROUPS) {
    const subHeading = document.createElement('div');
    subHeading.className = 'clensy-svc-subheading';
    subHeading.textContent = group.label;
    wrapper.appendChild(subHeading);

    for (const svc of group.services) {
      const link = document.createElement('a');
      link.className = 'clensy-svc-link';
      link.href = getSingleTypeUrl(svc.slug);
      link.textContent = svc.label;
      link.addEventListener('click', onLinkClick);
      wrapper.appendChild(link);
    }
  }

  return wrapper;
}

function createLocationsSection(): HTMLElement {
  const wrapper = document.createElement('li');
  wrapper.id = 'clensy-locations-dropdown';

  const heading = document.createElement('div');
  heading.className = 'clensy-svc-heading';
  heading.textContent = 'Locations';
  wrapper.appendChild(heading);

  for (const loc of LOCATIONS) {
    const link = document.createElement('a');
    link.className = 'clensy-loc-link';
    link.href = getSingleTypeUrl(loc.slug);
    link.textContent = loc.label;
    link.addEventListener('click', onLinkClick);
    wrapper.appendChild(link);
  }

  return wrapper;
}

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
  'clensy-services-dropdown',
  'clensy-locations-dropdown',
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


}

/* ------------------------------------------------------------------ */
/*  Injection logic                                                    */
/* ------------------------------------------------------------------ */

function tryInject(): void {
  // Services section
  if (!document.getElementById('clensy-services-dropdown')) {
    const anchor = document.querySelector<HTMLAnchorElement>(
      'nav a[href*="api::routine-cleaning.routine-cleaning"]'
    );
    if (anchor) {
      const anchorLi = anchor.closest('li');
      const parentList = anchorLi?.parentElement;
      if (parentList) {
        hideOriginals();
        const section = createGroupedSection();
        parentList.insertBefore(section, anchorLi);
      }
    }
  }

  // Locations section
  if (!document.getElementById('clensy-locations-dropdown')) {
    const anchor = document.querySelector<HTMLAnchorElement>(
      'nav a[href*="api::bergen-county.bergen-county"]'
    );
    if (anchor) {
      const anchorLi = anchor.closest('li');
      const parentList = anchorLi?.parentElement;
      if (parentList) {
        hideOriginals();
        const section = createLocationsSection();
        parentList.insertBefore(section, anchorLi);
      }
    }
  }

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

  // Periodically check: re-hide originals & re-inject if React re-rendered
  setInterval(() => {
    if (window.location.pathname.includes('/content-manager')) {
      hideOriginals();
      tryInject();
    }
  }, 800);

  // Keep active state in sync on back / forward
  window.addEventListener('popstate', () =>
    requestAnimationFrame(refreshActiveStates)
  );
}
