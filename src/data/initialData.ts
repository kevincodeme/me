import { ServicePackage, AddOnItem, Project, Invoice } from '../types';

export const SERVICE_PACKAGES: ServicePackage[] = [
  {
    id: 'local_presence',
    name: 'Local Presence Launch',
    tagline: 'High-converting digital storefront engineered for local discovery and direct customer calls.',
    targetAudience: 'Contractors, Clinics, Boutiques & Neighborhood Services',
    setupPrice: 2400,
    monthlyCarePrice: 99,
    timelineWeeks: 3,
    pagesCount: 'Up to 5 Pages',
    features: [
      'Mobile-first responsive design for phone and tablet',
      'Google Business Profile integration & map embed',
      '1-click click-to-call and quote inquiry forms',
      'Lightning-fast CDN cloud hosting & SSL certificate',
      'Basic on-page local SEO & metadata tuning',
      'ADA accessibility baseline compliance'
    ],
    deliverables: [
      'Figma design preview',
      'Interactive staging site',
      'Google Analytics 4 setup',
      'Domain DNS configuration'
    ]
  },
  {
    id: 'growth_booking',
    name: 'Growth & Booking Engine',
    tagline: 'Complete lead generation machine with 24/7 client self-scheduling and customer review showcase.',
    targetAudience: 'Restaurants, Salons, Wellness Practices & Professional Services',
    setupPrice: 3800,
    monthlyCarePrice: 149,
    timelineWeeks: 4,
    pagesCount: 'Up to 10 Pages',
    features: [
      'Everything in Local Presence, plus:',
      'Integrated real-time appointment booking calendar',
      'Automated email/SMS confirmation & reminders',
      'Live Google & Yelp verified review carousel',
      'High-intent landing pages for top high-margin services',
      'CRM & lead routing webhook integration (HubSpot, Zapier, email)'
    ],
    deliverables: [
      'Interactive prototype',
      'Staging testing sandbox',
      'Automated booking flow test',
      'Staff onboarding video walkthrough'
    ],
    isPopular: true
  },
  {
    id: 'custom_flagship',
    name: 'Commerce & Custom Flagship',
    tagline: 'Artisanal digital flagship with online ordering, customer memberships, and custom workflows.',
    targetAudience: 'Retail Stores, Food & Beverage, Subscription Clubs & Studios',
    setupPrice: 5900,
    monthlyCarePrice: 199,
    timelineWeeks: 6,
    pagesCount: 'Up to 18 Pages',
    features: [
      'Everything in Growth & Booking, plus:',
      'Full e-commerce catalog with Stripe / Apple Pay checkout',
      'Custom customer portal & order tracking',
      'Inventory sync & automated receipt generation',
      'Dynamic menu or product filtering & search',
      'Priority 4-hour SLA support & dedicated account engineer'
    ],
    deliverables: [
      'Custom Figma component system',
      'Payment gateway staging testing',
      'Full inventory migration assistance',
      'Custom analytics conversion dashboard'
    ]
  }
];

export const ADDONS_CATALOG: AddOnItem[] = [
  {
    id: 'addon_local_seo',
    name: 'Local SEO Domination Pack',
    description: 'Schema markup, local citation directory submissions across 40+ portals, and geotargeted service area pages.',
    setupPrice: 450,
    monthlyPrice: 49,
    category: 'seo'
  },
  {
    id: 'addon_booking_flow',
    name: 'Advanced Booking & SMS Intake',
    description: 'Custom deposit payment during scheduling, staff calendar sync, and automated SMS appointment reminders.',
    setupPrice: 350,
    monthlyPrice: 0,
    category: 'conversion'
  },
  {
    id: 'addon_pro_copywriting',
    name: 'Full Brand Storytelling & Copywriting',
    description: 'Interview-based professional copywriting for all main service pages written to overcome customer objections.',
    setupPrice: 650,
    monthlyPrice: 0,
    category: 'content'
  },
  {
    id: 'addon_speed_rush',
    name: 'Express 14-Day Turnaround',
    description: 'Dedicated priority engineering sprint guaranteeing delivery and staging review in under 14 calendar days.',
    setupPrice: 850,
    monthlyPrice: 0,
    category: 'speed'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_bella_sorella',
    clientName: 'Elena Rostova',
    clientCompany: 'Bella Sorella Trattoria',
    businessType: 'Italian Dining & Wine Bar',
    contactEmail: 'elena@bellasorella-trattoria.com',
    contactPhone: '(415) 882-9014',
    domainTarget: 'bellasorellasf.com',
    packageId: 'growth_booking',
    selectedAddonIds: ['addon_booking_flow', 'addon_local_seo'],
    billingSchedule: 'milestone_50_50',
    totalSetupPrice: 4600,
    monthlyCarePrice: 198,
    currentPhaseIndex: 3, // Phase 4: Client Review & Revisions
    startDate: '2026-09-12',
    targetLaunchDate: '2026-10-18',
    stagingUrl: 'https://staging-bellasorella.foundryweb.dev',
    liveUrl: undefined,
    milestones: [
      {
        id: 'm1',
        phaseNumber: 1,
        title: 'Discovery, Brand Intake & Architecture',
        description: 'Review brand identity, menu photography, reservation policies, and structural sitemap.',
        status: 'completed',
        estimatedDate: '2026-09-18',
        completedDate: '2026-09-17',
        approvalStatus: 'approved',
        deliverable: {
          name: 'Architecture & Sitemap Blueprint',
          type: 'pdf',
          url: '#',
          previewSnippet: 'Approved 8-page sitemap including Private Dining, Seasonal Menu, and Table Reservation Engine.'
        },
        billingTriggerNotice: 'Deposit of $2,300 automatically settled on project kick-off.'
      },
      {
        id: 'm2',
        phaseNumber: 2,
        title: 'Visual Design & Typography System',
        description: 'Artisanal Italian trattoria aesthetic, wine list styling, mobile table-booking interface.',
        status: 'completed',
        estimatedDate: '2026-09-28',
        completedDate: '2026-09-27',
        approvalStatus: 'approved',
        deliverable: {
          name: 'Figma Hi-Fi Prototype (Desktop & Mobile)',
          type: 'figma',
          url: '#',
          previewSnippet: 'Warm terracotta & Tuscan cream palette with high-contrast wine reservation module.'
        },
        clientNotes: 'Loving the rustic serif headings! Approved.'
      },
      {
        id: 'm3',
        phaseNumber: 3,
        title: 'Production Frontend Engineering',
        description: 'Responsive React build, Google Maps integration, OpenTable/Resy API sync, and performance optimization.',
        status: 'completed',
        estimatedDate: '2026-10-08',
        completedDate: '2026-10-06',
        approvalStatus: 'approved',
        deliverable: {
          name: 'Interactive Staging Environment',
          type: 'staging_url',
          url: 'https://staging-bellasorella.foundryweb.dev',
          previewSnippet: 'Live staging deployed with functioning table booking and mobile menu filtering.'
        }
      },
      {
        id: 'm4',
        phaseNumber: 4,
        title: 'Client Review & Staging Signoff',
        description: 'Interactive client walkthrough to inspect copy, test reservations, and request final revisions.',
        status: 'review_required',
        estimatedDate: '2026-10-12',
        approvalStatus: 'pending_review',
        deliverable: {
          name: 'Staging Candidate v1.2',
          type: 'staging_url',
          url: 'https://staging-bellasorella.foundryweb.dev',
          previewSnippet: 'Ready for final client approval. Approve to trigger Phase 5 QA and DNS transfer.'
        },
        billingTriggerNotice: 'Approving this phase prepares the final milestone invoice of $2,300 for live launch release.'
      },
      {
        id: 'm5',
        phaseNumber: 5,
        title: 'Security, Speed & QA Audit',
        description: 'Lighthouse 95+ speed tuning, SSL certificate hardening, and cross-browser cross-device verification.',
        status: 'pending',
        estimatedDate: '2026-10-15',
        approvalStatus: 'pending_review'
      },
      {
        id: 'm6',
        phaseNumber: 6,
        title: 'DNS Switch & Live Launch',
        description: 'Domain connection, Google Search Console indexing, automated monthly care plan activation.',
        status: 'pending',
        estimatedDate: '2026-10-18',
        approvalStatus: 'pending_review',
        billingTriggerNotice: 'Automated recurring billing for Monthly Care ($198/mo) starts 30 days post-launch.'
      }
    ],
    activityLog: [
      {
        id: 'act_1',
        timestamp: '2026-10-06 14:20',
        title: 'Staging Candidate v1.2 Deployed',
        description: 'Agency deployed updated reservation engine to staging. Awaiting client review.',
        actor: 'agency',
        type: 'milestone'
      },
      {
        id: 'act_2',
        timestamp: '2026-09-27 10:15',
        title: 'Visual Design Approved',
        description: 'Elena Rostova approved the Figma UI mockups without modifications.',
        actor: 'client',
        type: 'milestone'
      },
      {
        id: 'act_3',
        timestamp: '2026-09-12 09:00',
        title: 'Project Kickoff & Deposit Auto-Billed',
        description: 'Invoice #FW-2026-101 for $2,300 automatically processed via credit card ending in 4242.',
        actor: 'system',
        type: 'billing'
      }
    ]
  },
  {
    id: 'proj_highland_craft',
    clientName: 'Marcus Vance',
    clientCompany: 'Highland Precision Craftsmen',
    businessType: 'Custom Cabinetry & Renovations',
    contactEmail: 'marcus@highlandcraft.com',
    contactPhone: '(503) 714-3329',
    domainTarget: 'highlandcraftmen.com',
    packageId: 'local_presence',
    selectedAddonIds: ['addon_pro_copywriting', 'addon_local_seo'],
    billingSchedule: 'milestone_33_33_34',
    totalSetupPrice: 3500,
    monthlyCarePrice: 148,
    currentPhaseIndex: 4, // Phase 5: QA
    startDate: '2026-08-25',
    targetLaunchDate: '2026-10-10',
    stagingUrl: 'https://staging-highlandcraft.foundryweb.dev',
    liveUrl: undefined,
    milestones: [
      {
        id: 'hm1',
        phaseNumber: 1,
        title: 'Discovery & Project Blueprint',
        description: 'Portfolio project categorization and customer testimonial curation.',
        status: 'completed',
        estimatedDate: '2026-09-02',
        completedDate: '2026-09-01',
        approvalStatus: 'approved'
      },
      {
        id: 'hm2',
        phaseNumber: 2,
        title: 'Architectural Design & Portfolio Showcase',
        description: 'High-contrast portfolio layouts showcasing past residential builds.',
        status: 'completed',
        estimatedDate: '2026-09-12',
        completedDate: '2026-09-11',
        approvalStatus: 'approved'
      },
      {
        id: 'hm3',
        phaseNumber: 3,
        title: 'Development & Contact Routing',
        description: 'Interactive project gallery with before/after sliders and quote estimate form.',
        status: 'completed',
        estimatedDate: '2026-09-24',
        completedDate: '2026-09-23',
        approvalStatus: 'approved'
      },
      {
        id: 'hm4',
        phaseNumber: 4,
        title: 'Client Walkthrough & Revisions',
        description: 'Reviewed copy for the custom kitchen remodel pages.',
        status: 'completed',
        estimatedDate: '2026-10-02',
        completedDate: '2026-10-01',
        approvalStatus: 'approved'
      },
      {
        id: 'hm5',
        phaseNumber: 5,
        title: 'Final Quality Assurance & Speed Tuning',
        description: 'Final image compression, mobile layout checks, and contact form testing.',
        status: 'in_progress',
        estimatedDate: '2026-10-08',
        approvalStatus: 'pending_review'
      },
      {
        id: 'hm6',
        phaseNumber: 6,
        title: 'Official Launch & Domain Switch',
        description: 'Final milestone invoice auto-triggers upon DNS propagation.',
        status: 'pending',
        estimatedDate: '2026-10-10',
        approvalStatus: 'pending_review'
      }
    ],
    activityLog: [
      {
        id: 'hact_1',
        timestamp: '2026-10-01 16:30',
        title: 'Phase 4 Review Approved',
        description: 'Marcus approved all page layouts. Team moved to final QA.',
        actor: 'client',
        type: 'milestone'
      },
      {
        id: 'hact_2',
        timestamp: '2026-09-11 11:00',
        title: 'Milestone 2 Payment Auto-Charged',
        description: 'Invoice #FW-2026-094 for $1,155 processed successfully upon design approval.',
        actor: 'system',
        type: 'billing'
      }
    ]
  }
];

export const INITIAL_INVOICES: Invoice[] = [
  {
    id: 'inv_101',
    invoiceNumber: 'FW-2026-101',
    projectId: 'proj_bella_sorella',
    clientCompany: 'Bella Sorella Trattoria',
    clientEmail: 'elena@bellasorella-trattoria.com',
    issueDate: '2026-09-12',
    dueDate: '2026-09-12',
    paidDate: '2026-09-12',
    amount: 2300,
    status: 'paid',
    title: 'Project Kickoff & Deposit (50%)',
    category: 'deposit',
    lineItems: [
      { id: 'li_1', description: 'Growth & Booking Engine Setup (50% Deposit)', amount: 1900 },
      { id: 'li_2', description: 'Advanced Booking & SMS Intake Add-on (50%)', amount: 175 },
      { id: 'li_3', description: 'Local SEO Domination Setup (50%)', amount: 225 }
    ],
    paymentMethod: 'Mastercard ending in 4242',
    autoPayEnabled: true,
    notes: 'Paid immediately via automated onboarding checkout.'
  },
  {
    id: 'inv_102',
    invoiceNumber: 'FW-2026-128',
    projectId: 'proj_bella_sorella',
    clientCompany: 'Bella Sorella Trattoria',
    clientEmail: 'elena@bellasorella-trattoria.com',
    issueDate: '2026-10-06',
    dueDate: '2026-10-18',
    amount: 2300,
    status: 'scheduled',
    title: 'Final Launch Balance (50%)',
    category: 'launch_final',
    lineItems: [
      { id: 'li_4', description: 'Growth & Booking Engine Final Delivery (50% Balance)', amount: 1900 },
      { id: 'li_5', description: 'Advanced Booking & SMS Intake Final (50%)', amount: 175 },
      { id: 'li_6', description: 'Local SEO Domination Final (50%)', amount: 225 }
    ],
    paymentMethod: 'Mastercard ending in 4242',
    autoPayEnabled: true,
    notes: 'Configured for automated payment upon final client launch sign-off.'
  },
  {
    id: 'inv_091',
    invoiceNumber: 'FW-2026-091',
    projectId: 'proj_highland_craft',
    clientCompany: 'Highland Precision Craftsmen',
    clientEmail: 'marcus@highlandcraft.com',
    issueDate: '2026-08-25',
    dueDate: '2026-08-25',
    paidDate: '2026-08-25',
    amount: 1155,
    status: 'paid',
    title: 'Phase 1 Kickoff Milestone (33%)',
    category: 'deposit',
    lineItems: [
      { id: 'li_7', description: 'Local Presence Package + Copywriting (Deposit)', amount: 1155 }
    ],
    paymentMethod: 'Visa ending in 8831',
    autoPayEnabled: true
  },
  {
    id: 'inv_094',
    invoiceNumber: 'FW-2026-094',
    projectId: 'proj_highland_craft',
    clientCompany: 'Highland Precision Craftsmen',
    clientEmail: 'marcus@highlandcraft.com',
    issueDate: '2026-09-11',
    dueDate: '2026-09-11',
    paidDate: '2026-09-11',
    amount: 1155,
    status: 'paid',
    title: 'Phase 2 Design Signoff Milestone (33%)',
    category: 'milestone',
    lineItems: [
      { id: 'li_8', description: 'Design approval sign-off milestone payment', amount: 1155 }
    ],
    paymentMethod: 'Visa ending in 8831',
    autoPayEnabled: true
  },
  {
    id: 'inv_099',
    invoiceNumber: 'FW-2026-099',
    projectId: 'proj_highland_craft',
    clientCompany: 'Highland Precision Craftsmen',
    clientEmail: 'marcus@highlandcraft.com',
    issueDate: '2026-10-01',
    dueDate: '2026-10-10',
    amount: 1190,
    status: 'pending',
    title: 'Phase 3 Go-Live Balance (34%)',
    category: 'launch_final',
    lineItems: [
      { id: 'li_9', description: 'Final launch balance & domain transfer', amount: 1190 }
    ],
    paymentMethod: 'Visa ending in 8831',
    autoPayEnabled: true,
    notes: 'Scheduled for automatic execution on October 10 or upon live approval.'
  }
];
