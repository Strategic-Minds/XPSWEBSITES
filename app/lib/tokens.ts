// ============================================================
// XPS Design System Tokens
// app/lib/tokens.ts
// Source of truth for ALL visual constants across the system
// ============================================================

export const BRAND = {
  name: 'Phoenix Epoxy Pros',
  tagline: '#1 Epoxy Floor Coating Company in Phoenix, AZ',
  phone: '772-209-0266',
  phoneHref: 'tel:17722090266',
  email: 'JEREMY@SHOPXPS.COM',
  emailHref: 'mailto:jeremy@shopxps.com',
  address: 'Phoenix, AZ',
  domain: 'phoenixepoxypros.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://phoenixepoxypros.com',
} as const;

export const COLORS = {
  // Brand primaries
  black: '#0a0b0c',
  headerBg: '#111214',
  gold: '#c9a227',
  goldHover: '#dbb84a',
  goldDark: '#a07c10',
  white: '#ffffff',
  offWhite: '#f8f7f4',
  // Surface colors
  surfaceCard: '#ffffff',
  surfaceMuted: '#f4f3f0',
  surfaceDark: '#1a1c1e',
  surfaceBorder: '#e2e0dc',
  // Text
  textPrimary: '#0a0b0c',
  textSecondary: '#4a4a4a',
  textMuted: '#888888',
  textInverse: '#ffffff',
  // Status
  statusGreen: '#16a34a',
  statusYellow: '#d97706',
  statusRed: '#dc2626',
  statusBlue: '#2563eb',
  statusGray: '#6b7280',
} as const;

export const TYPOGRAPHY = {
  fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif",
  headingWeight: 800,
  bodyWeight: 400,
  sizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    hero: 'clamp(2.5rem, 5vw, 4rem)',
  },
} as const;

export const SPACING = {
  sectionPad: 'clamp(3rem, 6vw, 6rem)',
  containerMax: '1280px',
  containerPad: 'clamp(1rem, 4vw, 2rem)',
  cardPad: 'clamp(1.25rem, 2vw, 2rem)',
  cardRadius: '8px',
  cardShadow: '0 2px 12px rgba(0,0,0,0.08)',
  cardShadowHover: '0 8px 32px rgba(0,0,0,0.14)',
} as const;

export const ROUTES = {
  home: '/',
  digitalEstimator: '/digital-estimator',
  digitalBid: '/digital-bid',
  visualizer: '/visualizer',
  floorDesignCenter: '/floor-design-center',
  customerPortal: '/customer-portal',
  customerDashboard: '/customer-portal/dashboard',
  adminDashboard: '/admin-dashboard',
  ownerDashboard: '/owner-dashboard',
  crewDashboard: '/crew-leader-dashboard',
  pmDashboard: '/project-manager-dashboard',
  proposalSystem: '/proposal-system',
  installer: '/installer',
  ops: '/ops',
  jobTracker: '/job-tracker',
  gallery: '/gallery',
  aboutUs: '/about-us',
  contactUs: '/contact-us',
  portalSystem: '/portal-system',
} as const;

export const IMAGES = {
  logoHeader: '/images/logo-header.webp',
  logoPanel: '/images/logo-panel.webp',
  heroGarage: '/images/hero-garage-approved.webp',
  beforeAfter: '/images/before-after-approved.webp',
  servicesStrip: '/images/services-strip-approved.webp',
  // CDN images
  beforeAfterCDN: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-before-after.webp?v=1781648570',
  garage: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-garage.webp?v=1781648581',
  commercial: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-commercial.webp?v=1781648591',
  patio: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-patio.webp?v=1781648601',
  repair: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/phoenix-epoxy-pros-service-repair.webp?v=1781648616',
  // Color charts (canonical CDN)
  flakeChart: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-flake-colors-approved.png?v=1781670774',
  metallicChart: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-metallic-colors-standardized.png?v=1781670766',
  quartzChart: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-quartz-colors-standardized.png?v=1781670783',
  solidChart: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-solid-color-epoxy-base-coats.png?v=1781680330',
  glitterChart: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-top-glitter-additive-colors.png?v=1781680348',
  stainChart: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/xps-concrete-dye-stain-colors.png?v=1781680338',
  // Process steps
  processSignUp: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-01-sign-up-schedule.png?v=1781036561',
  processPrepWork: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-02-prep-work.png?v=1781036569',
  processBaseCoat: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-03-base-coat.png?v=1781036578',
  processBeautyCoat: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-04-beauty-coat.png?v=1781036586',
  processTopcoat: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-05-topcoat-finish.png?v=1781036595',
  processFinalInspection: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/nashville-resin-worx-process-06-final-inspection.png?v=1781036605',
} as const;

export const FINISH_OPTIONS = [
  { value: 'flake', label: 'Flake System', description: 'Most popular — durable broadcast flake in dozens of blends', chartImage: IMAGES.flakeChart },
  { value: 'metallic', label: 'Metallic Epoxy', description: 'Premium flowing metallic finish — showroom-quality', chartImage: IMAGES.metallicChart },
  { value: 'quartz', label: 'Quartz System', description: 'Commercial-grade texture, slip-resistant, high-traffic', chartImage: IMAGES.quartzChart },
  { value: 'solid', label: 'Solid Color', description: 'Clean, bold single-color epoxy in 24 standard colors', chartImage: IMAGES.solidChart },
  { value: 'glitter', label: 'Glitter Additive', description: 'Sparkle additive over any base system', chartImage: IMAGES.glitterChart },
  { value: 'stain', label: 'Concrete Stain / Dye', description: 'Natural translucent tones for polished or sealed concrete', chartImage: IMAGES.stainChart },
  { value: 'polished', label: 'Polished Concrete', description: 'Diamond-ground and densified for a natural stone look', chartImage: null },
] as const;

export const PROJECT_TYPES = [
  'Garage Floors',
  'Commercial Floors',
  'Patios & Outdoor Spaces',
  'Floor Repair',
  'Polished Concrete',
  'Decorative Concrete',
  'Epoxy Training Classes',
  'Business Starter Training',
] as const;

export const FLOOR_CONDITIONS = {
  existing: [
    { value: 'bare_concrete', label: 'Bare Concrete' },
    { value: 'paint', label: 'Paint / Sealer' },
    { value: 'laminate', label: 'Laminate / Vinyl' },
    { value: 'tile', label: 'Tile' },
    { value: 'vct', label: 'VCT (Commercial Tile)' },
    { value: 'peeling_epoxy', label: 'Peeling / Old Epoxy' },
    { value: 'carpet', label: 'Carpet' },
  ],
  condition: [
    { value: 'new', label: 'New — no cracks or damage' },
    { value: 'fair', label: 'Fair — some cracks or surface wear' },
    { value: 'bad', label: 'Poor — significant cracks or holes' },
  ],
} as const;

export const WHATSAPP_TEMPLATES = {
  LEAD_SUBMITTED: 'xps_lead_submitted',
  PROPOSAL_SENT: 'xps_proposal_sent',
  PAYMENT_LINK: 'xps_payment_link',
  TRACKER_ISSUED: 'xps_tracker_access',
  NEW_LEAD_ADMIN: 'xps_admin_new_lead',
  CREW_JOB_ASSIGNED: 'xps_crew_assignment',
  CHANGE_ORDER: 'xps_change_order_alert',
  COLOR_APPROVAL: 'xps_color_approval_request',
  JOB_COMPLETE: 'xps_job_complete',
} as const;

export type FinishOption = typeof FINISH_OPTIONS[number]['value'];
export type ProjectType = typeof PROJECT_TYPES[number];
