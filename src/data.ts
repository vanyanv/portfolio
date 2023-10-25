import microbserv from '/public/Projects/dashboard.jpg';
import modernPokedex from '/public/Projects/Modern_Pokedex.png';
import whatsnext from '/public/Projects/Whatsnext.jpeg';
import microbservWebsite from '/public/Projects/MicrObserv_Website.png';
import stuffLibrary from '/public/Projects/Stuff_Library.png';
const Projects = [
  {
    name: 'MicrObserv',
    description: 'Open Source Observability Tool for Microservices',
    imageUrl: microbserv,

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
  },
  {
    name: 'Modern Pokedex',
    description: 'A Minimalistic and Modern Pokedex',
    imageUrl: modernPokedex,

    githubUrl: 'https://github.com/vanyanv/Modern-Pokedex',
    linkUrl: 'https://modernpokedex.vercel.app/',
    tech: ['React', 'Typescript', 'Nextjs', 'Tanstack', 'Tailwindcss'],
  },
  {
    name: 'Whatsnext',
    description: 'Minimalistic Daily Mood Journal and Goals Tracker',
    imageUrl: whatsnext,

    githubUrl: 'https://github.com/InnoLVKB/whatsnext',
    linkUrl: 'https://github.com/InnoLVKB/whatsnext',
    tech: ['React', 'Javascript', 'Nextjs', 'Node', 'Postgres', 'Tailwindcss'],
  },
  {
    name: 'Microbserv Website',
    description: 'Website for MicrObserv',
    imageUrl: microbservWebsite,

    githubUrl: 'https://github.com/vanyanv/MicrObserv',
    linkUrl: 'https://micr-observ-website.vercel.app/',
    tech: ['React', 'Typescript', 'Nextjs', 'Tailwindcss'],
  },
  {
    name: 'Stuff Library',
    description: 'Marketplace for loaning and renting stuff',
    imageUrl: stuffLibrary,

    githubUrl: 'https://github.com/Stuff-Library/Stuff-Library',
    linkUrl: 'https://github.com/Stuff-Library/Stuff-Library',
    tech: ['React', 'Javascript', 'Node', 'MongoDB', 'CSS', 'Webpack'],
  },
];

export default Projects;
