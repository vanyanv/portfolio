import Image from 'next/image';
import type { Project } from '@/data';
import { cn } from '@/lib/cn';

const ART: Record<
  string,
  {
    label: string;
    hue: number;
    panels: string[];
  }
> = {
  'restaurant-dashboard': {
    label: 'Restaurant OS',
    hue: 45,
    panels: ['P&L', 'COGS', 'Invoices', 'AI Chat'],
  },
  'ryddo-catalyst': {
    label: 'RYDDO',
    hue: 170,
    panels: ['PDP', 'Add-ons', 'Dealers', 'Cart'],
  },
};

export function ProjectArtwork({
  project,
  className,
  priority = false,
}: {
  project: Project;
  className?: string;
  priority?: boolean;
}) {
  if (project.imageUrl) {
    return (
      <Image
        src={project.imageUrl}
        alt=""
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, 420px"
        className="object-cover"
      />
    );
  }

  const art = ART[project.id] ?? {
    label: project.name,
    hue: 260,
    panels: project.tech.slice(0, 4),
  };

  return (
    <div
      aria-hidden
      className={cn(
        'absolute inset-0 overflow-hidden bg-[oklch(0.18_0.035_var(--art-h))]',
        className,
      )}
      style={{ ['--art-h' as string]: art.hue }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,oklch(0.78_0.16_var(--art-h)/0.38),transparent_32%),radial-gradient(circle_at_84%_18%,oklch(0.72_0.16_25/0.28),transparent_30%)]" />
      <div className="project-art-sheen absolute -inset-x-20 top-0 h-full bg-[linear-gradient(100deg,transparent_34%,oklch(0.98_0.01_var(--art-h)/0.16)_48%,transparent_62%)]" />
      <div className="absolute inset-4 flex flex-col rounded-chrome border border-white/16 bg-[oklch(0.12_0.02_var(--art-h)/0.78)] p-3 shadow-floating">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.16_30)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.16_90)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.18_150)]" />
          <span className="ml-auto h-1.5 w-16 rounded-full bg-white/18" />
        </div>
        <div className="mt-4 grid min-h-0 flex-1 grid-cols-[0.8fr_1.2fr] gap-3">
          <div className="space-y-2">
            <span className="block h-3 w-3/4 rounded-full bg-white/24" />
            <span className="block h-3 w-1/2 rounded-full bg-white/14" />
            <span className="block h-20 rounded bg-white/9" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {art.panels.map((panel, index) => (
              <div
                key={panel}
                className="project-art-tile rounded border border-white/10 bg-white/10 p-2"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <span className="block h-2 w-2/3 rounded-full bg-white/35" />
                <span className="mt-3 block h-5 rounded bg-[oklch(0.72_0.16_var(--art-h)/0.45)]" />
                <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.12em] text-white/62">
                  {panel}
                </span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-3 truncate text-[12px] font-semibold text-white/78">
          {art.label}
        </p>
      </div>
    </div>
  );
}
