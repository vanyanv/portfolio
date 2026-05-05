export type ProjectStatus = 'Live' | 'Case study' | 'Prototype';

export type ProjectArchitectureItem = {
  title: string;
  summary: string;
  evidence: string[];
};

export type Project = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  githubUrl: string;
  linkUrl: string;
  tech: string[];
  role: string;
  year: string;
  status: ProjectStatus;
  featured?: boolean;
  caseStudy: string;
  highlights: string[];
  architecture?: ProjectArchitectureItem[];
};

const Projects: Project[] = [
  {
    id: 'restaurant-dashboard',
    name: "Chris n Eddy's Restaurant Dashboard",
    description:
      'Multi-store restaurant OS for analytics, COGS, invoices, P&L, Otter/Yelp sync, AI chat, and operational monitoring.',
    githubUrl: 'https://github.com/vanyanv/restaurant-dashboard',
    linkUrl: 'https://restaurant-dashboard-five.vercel.app',
    tech: [
      'Nextjs',
      'Typescript',
      'React',
      'Postgres',
      'Prisma',
      'NextAuth',
      'Tailwindcss',
      'shadcn/ui',
      'Recharts',
      'OpenAI',
      'Tanstack',
      'Upstash Redis',
      'Zod',
    ],
    role: 'Full-stack product engineering',
    year: '2026',
    status: 'Live',
    featured: true,
    caseStudy:
      'A full-stack operating platform connecting stores, orders, invoices, recipes, vendor prices, ingredients, ratings, P&L, AI tools, and monitoring into one owner-ready workflow.',
    highlights: [
      'Owner and manager workflows with account/store scoping, invites, protected routes, desktop dashboards, and mobile routes',
      'Otter, Yelp, Microsoft Graph invoice, R2 PDF, and cron sync pipelines tracked through JobRun monitoring',
      'COGS engine connects orders, recipes, modifiers, packaging, canonical ingredients, invoice line matching, and P&L reporting',
      'Owner-scoped AI chat routes questions through tools for sales, P&L, invoices, refunds, menu margin, recipes, ingredients, and historical context',
    ],
    architecture: [
      {
        title: 'Access + Stores',
        summary:
          'Account, user, and store scoping keep owner and manager workflows separated while preserving multi-store oversight.',
        evidence: [
          'owner/manager roles',
          'invites',
          'hasOwnerAccess',
          'store-scoped actions',
        ],
      },
      {
        title: 'Sync + Evidence',
        summary:
          'Operational evidence flows in through delivery, review, invoice, and file pipelines, then lands in monitored jobs instead of loose exports.',
        evidence: [
          'Otter orders/metrics',
          'Yelp ratings',
          'invoice PDFs',
          'withJobRun',
        ],
      },
      {
        title: 'COGS + P&L',
        summary:
          'Recipe costing rolls through canonical ingredients, modifiers, packaging, daily COGS rows, and GL-style profit views.',
        evidence: [
          'recipe costs',
          'canonical costs',
          'modifier mapping',
          'daily materialization',
        ],
      },
      {
        title: 'AI Ops Layer',
        summary:
          'The owner chat uses scoped tools and embeddings to answer operational questions without trusting model-provided ownership or store ids.',
        evidence: [
          'tool registry',
          'embeddings',
          'P&L history',
          'AI usage tracking',
        ],
      },
      {
        title: 'Monitoring + Mobile',
        summary:
          'Health views track database, cache, auth, syncs, errors, and AI cost while mobile routes keep daily operations reachable on the floor.',
        evidence: [
          'system status',
          'live presence',
          'mobile P&L',
          'mobile invoices/orders',
        ],
      },
    ],
  },
  {
    id: 'ryddo-catalyst',
    name: 'RYDDO Catalyst',
    description:
      "BigCommerce Catalyst storefront customized for RYDDO's electric mobility catalog, PDPs, dealers, content, and accessory add-ons.",
    githubUrl: 'https://github.com/ryddo-llc/ryddo-catalyst',
    linkUrl: 'https://ryddo-catalyst.vercel.app/super73-rx?119=128&128=157',
    tech: [
      'Nextjs',
      'Typescript',
      'React',
      'GraphQL',
      'BigCommerce',
      'Tailwindcss',
      'Algolia',
      'next-intl',
      'Radix UI',
      'Embla',
    ],
    role: 'Commerce front-end engineering',
    year: '2026',
    status: 'Live',
    featured: true,
    caseStudy:
      'Customized BigCommerce Catalyst into a RYDDO storefront with GraphQL Storefront API data, option-aware product detail pages, custom-field product transformers, cart/session flows, Algolia search, analytics, dealer and content routes, and branded accessory recommendations.',
    highlights: [
      'Built on BigCommerce Catalyst with gql.tada GraphQL, Next.js App Router, next-intl, analytics, and cart/session infrastructure',
      'Product pages transform custom fields, options, images, inventory, pricing, reviews, and schema data into branded PDP sections',
      'RYDDO-specific brand surface includes dealers, about/blog content, payment options, performance visuals, accessory carousel, and product modal interactions',
    ],
  },
  {
    id: 'microbserv',
    name: 'MicrObserv',
    description: 'Observability Tool for Microservices',
    imageUrl: '/Images/optimized/dashboard-thumb.webp',
    githubUrl: 'https://github.com/vanyanv/MicrObserv',
    linkUrl: 'https://micr-observ-website.vercel.app/',
    tech: [
      'React',
      'Typescript',
      'Electron',
      'Node',
      'Postgres',
      'Tailwindcss',
      'Webpack',
    ],
    role: 'Front-end and desktop app engineering',
    year: '2025',
    status: 'Live',
    featured: true,
    caseStudy:
      'Designed and built an observability product surface for understanding microservice health through dashboards, logs, and operational views.',
    highlights: [
      'Electron desktop shell with React UI',
      'Postgres-backed service data model',
      'Product website and app experience kept visually aligned',
    ],
  },
  {
    id: 'modern-pokedex',
    name: 'Modern Pokedex',
    description: 'A Minimalistic and Modern Pokedex',
    imageUrl: '/Images/optimized/pokedex-thumb.webp',
    githubUrl: 'https://github.com/vanyanv/Modern-Pokedex',
    linkUrl: 'https://modernpokedex.vercel.app/',
    tech: ['React', 'Typescript', 'Nextjs', 'Tanstack', 'Tailwindcss'],
    role: 'Front-end product build',
    year: '2025',
    status: 'Live',
    caseStudy:
      'A clean Pokedex interface focused on quick searching, readable creature data, and a compact visual system.',
    highlights: [
      'Typed React and Next.js app structure',
      'Fast filtering and detail exploration',
      'Minimal interface with clear content hierarchy',
    ],
  },
  {
    id: 'whatsnext',
    name: 'Whatsnext',
    description: 'Daily Mood Journal and Goals Tracker',
    imageUrl: '/Images/optimized/whatsnext-thumb.webp',
    githubUrl: 'https://github.com/InnoLVKB/whatsnext',
    linkUrl: 'https://github.com/InnoLVKB/whatsnext',
    tech: ['React', 'Javascript', 'Nextjs', 'Node', 'Postgres', 'Tailwindcss'],
    role: 'Full-stack app engineering',
    year: '2024',
    status: 'Case study',
    caseStudy:
      'A journaling and goal-tracking product centered on daily reflection, mood context, and steady personal progress.',
    highlights: [
      'Daily entries and goal tracking workflows',
      'Node and Postgres application architecture',
      'Collaborative product iteration',
    ],
  },
  {
    id: 'product-website',
    name: 'Product Website',
    description: 'Product Page for MicrObserv',
    imageUrl: '/Images/optimized/webpage-thumb.webp',
    githubUrl: 'https://github.com/vanyanv/MicrObserv',
    linkUrl: 'https://micr-observ-website.vercel.app/',
    tech: ['React', 'Typescript', 'Nextjs', 'Tailwindcss'],
    role: 'Marketing site design and build',
    year: '2025',
    status: 'Live',
    caseStudy:
      'A product website for MicrObserv that explains the tool, shows the interface, and gives the desktop app a more complete launch surface.',
    highlights: [
      'Responsive product storytelling',
      'Next.js landing page build',
      'Consistent visual language with the main app',
    ],
  },
  {
    id: 'stuff-library',
    name: 'Stuff Library',
    description: 'Marketplace for loaning and renting stuff',
    imageUrl: '/Images/optimized/stufflibrary-thumb.webp',
    githubUrl: 'https://github.com/Stuff-Library/Stuff-Library',
    linkUrl: 'https://github.com/Stuff-Library/Stuff-Library',
    tech: ['React', 'Javascript', 'Node', 'MongoDB', 'CSS', 'Webpack'],
    role: 'Full-stack marketplace engineering',
    year: '2024',
    status: 'Prototype',
    caseStudy:
      'A marketplace concept for lending and renting items, with listing flows, discovery, and community-oriented product mechanics.',
    highlights: [
      'React marketplace interface',
      'Node and MongoDB app foundation',
      'Listing and browsing workflows',
    ],
  },
];

export default Projects;
