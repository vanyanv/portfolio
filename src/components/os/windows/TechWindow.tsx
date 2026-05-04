import Image from 'next/image';

const techStack = [
  { name: 'TypeScript', file: 'TypeScript', cat: 'Language' },
  { name: 'JavaScript', file: 'JavaScript', cat: 'Language' },
  { name: 'HTML', file: 'HTML', cat: 'Language' },
  { name: 'CSS', file: 'CSS', cat: 'Language' },
  { name: 'React', file: 'React', cat: 'Framework' },
  { name: 'Next.js', file: 'Nextjs', cat: 'Framework' },
  { name: 'Redux', file: 'Redux', cat: 'State' },
  { name: 'TanStack Query', file: 'Tanstack', cat: 'State' },
  { name: 'Tailwind CSS', file: 'Tailwindcss', cat: 'Styling' },
  { name: 'Material UI', file: 'MaterialUI', cat: 'Styling' },
  { name: 'Node.js', file: 'Node', cat: 'Backend' },
  { name: 'PostgreSQL', file: 'Postgres', cat: 'Database' },
  { name: 'MongoDB', file: 'MongoDB', cat: 'Database' },
  { name: 'GraphQL', file: 'GraphQL', cat: 'API' },
  { name: 'Webpack', file: 'Webpack', cat: 'Tooling' },
  { name: 'Jest', file: 'Jest', cat: 'Testing' },
];

export function TechWindowContent() {
  return (
    <div className="flex h-full flex-col">
      <header className="border-b border-hairline/60 px-6 py-4">
        <h1 className="text-lg font-semibold text-fg-0">Installed Apps</h1>
        <p className="text-[12px] text-fg-2">
          {techStack.length} apps • Last updated today
        </p>
      </header>

      <ul className="flex-1 overflow-y-auto px-3 py-2">
        {techStack.map((tech) => (
          <li
            key={tech.name}
            className="flex items-center gap-4 rounded-chrome px-3 py-2.5 hover:bg-fg-0/5 transition-colors"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-chrome border border-hairline/60 bg-bg-1/30">
              <Image
                src={`/Icons/${tech.file}.svg`}
                alt={tech.name}
                width={22}
                height={22}
              />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-fg-0">{tech.name}</p>
              <p className="text-[11px] text-fg-2">{tech.cat}</p>
            </div>
            <span className="text-[11px] text-fg-2 tracking-wide uppercase">
              Installed
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
