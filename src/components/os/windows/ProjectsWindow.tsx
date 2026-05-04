import Image from 'next/image';
import projects from '@/data';
import { ExternalIcon, FolderIcon } from '../icons';

const ICON_FILE: Record<string, string> = {
  React: 'React',
  Typescript: 'TypeScript',
  Javascript: 'JavaScript',
  Electron: 'Electron',
  Node: 'Node',
  Postgres: 'Postgres',
  Tailwindcss: 'Tailwindcss',
  Webpack: 'Webpack',
  Nextjs: 'Nextjs',
  Tanstack: 'Tanstack',
  CSS: 'CSS',
  HTML: 'HTML',
  MongoDB: 'MongoDB',
  GraphQL: 'GraphQL',
  'Material UI': 'MaterialUI',
  Redux: 'Redux',
  Jest: 'Jest',
};

function techIcon(tech: string) {
  return `/Icons/${ICON_FILE[tech] ?? tech}.svg`;
}

export function ProjectsWindowContent() {
  return (
    <div className="flex h-full flex-col">
      {/* Faux File Explorer toolbar */}
      <div className="flex items-center gap-3 border-b border-hairline/60 px-4 py-2 text-[12px]">
        <span className="text-fg-2">Path:</span>
        <span className="text-fg-1">This PC</span>
        <span className="text-fg-2">/</span>
        <span className="text-fg-1">Vardan</span>
        <span className="text-fg-2">/</span>
        <span className="text-fg-0 font-medium">Projects</span>
        <span className="ml-auto text-fg-2">{projects.length} items</span>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[2.2fr_2.5fr_2fr_auto] gap-3 px-4 py-2 border-b border-hairline/40 text-[11px] uppercase tracking-wider text-fg-2">
        <span>Name</span>
        <span>Description</span>
        <span>Tech</span>
        <span className="text-right">Open</span>
      </div>

      <ul className="flex-1 overflow-y-auto">
        {projects.map((project) => (
          <li
            key={project.name}
            className="group grid grid-cols-[2.2fr_2.5fr_2fr_auto] items-center gap-3 px-4 py-3 border-b border-hairline/30 hover:bg-fg-0/5 transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-10 w-12 shrink-0 overflow-hidden rounded-chrome border border-hairline/60 bg-bg-1">
                <Image
                  src={project.imageUrl}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[13px] font-medium text-fg-0">
                  {project.name}
                </p>
                <p className="text-[11px] text-fg-2">application</p>
              </div>
            </div>

            <p className="text-[13px] text-fg-1 truncate">
              {project.description}
            </p>

            <div className="flex flex-wrap items-center gap-1">
              {project.tech.slice(0, 6).map((t) => (
                <span
                  key={t}
                  title={t}
                  className="flex h-6 w-6 items-center justify-center rounded bg-bg-1/40"
                >
                  <Image
                    src={techIcon(t)}
                    alt={t}
                    width={14}
                    height={14}
                    className="opacity-80"
                  />
                </span>
              ))}
              {project.tech.length > 6 && (
                <span className="text-[11px] text-fg-2 ml-1">
                  +{project.tech.length - 6}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1 justify-end">
              <ProjectLink href={project.githubUrl} label="Source">
                Source
              </ProjectLink>
              <ProjectLink href={project.linkUrl} label="Live">
                Live
              </ProjectLink>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-2 border-t border-hairline/60 px-4 py-2 text-[11px] text-fg-2">
        <FolderIcon className="h-3.5 w-3.5" />
        Drag-and-drop is intentionally disabled. Click links to open.
      </div>
    </div>
  );
}

function ProjectLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex items-center gap-1 rounded px-2 py-1 text-[12px] font-medium text-fg-1 hover:bg-accent/15 hover:text-accent transition-colors"
    >
      {children}
      <ExternalIcon className="h-3 w-3" />
    </a>
  );
}
