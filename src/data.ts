export type ProjectStatus = 'Live' | 'Case study' | 'Prototype';

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
};

const Projects: Project[] = [
  {
    id: 'restaurant-dashboard',
    name: "Chris n Eddy's Restaurant Dashboard",
    description: 'Restaurant operations dashboard for reporting, store management, and analytics.',
    githubUrl: 'https://github.com/vanyanv/restaurant-dashboard',
    linkUrl: 'https://restaurant-dashboard-five.vercel.app',
    tech: [
      'Nextjs',
      'Typescript',
      'Postgres',
      'Prisma',
      'NextAuth',
      'Tailwindcss',
      'shadcn/ui',
      'Recharts',
    ],
    role: 'Full-stack product engineering',
    year: '2026',
    status: 'Live',
    featured: true,
    caseStudy:
      'Built a multi-store restaurant management surface with role-based access, daily reporting, analytics views, and operational workflows that feel fast enough for repeat use.',
    highlights: [
      'Owner and manager flows with protected routes',
      'Daily reports, analytics, and Yelp-oriented business context',
      'Responsive dashboard UI tuned for scanning and repeated action',
    ],
  },
  {
    id: 'ryddo-catalyst',
    name: 'RYDDO Catalyst',
    description: 'Headless commerce experience built on BigCommerce Catalyst.',
    githubUrl: 'https://github.com/ryddo-llc/ryddo-catalyst',
    linkUrl: 'https://ryddo-catalyst.vercel.app/super73-rx?119=128&128=157',
    tech: [
      'Nextjs',
      'Typescript',
      'React',
      'GraphQL',
      'BigCommerce',
      'Tailwindcss',
    ],
    role: 'Commerce front-end engineering',
    year: '2026',
    status: 'Live',
    featured: true,
    caseStudy:
      'Worked with a composable commerce stack to shape fast product detail pages, storefront routing, and a production-ready buying surface for a real brand catalog.',
    highlights: [
      'BigCommerce Catalyst storefront foundation',
      'Dynamic product routes and option-aware product pages',
      'Performance-minded Next.js deployment on Vercel',
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
