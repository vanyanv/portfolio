'use client';

import { useEffect } from 'react';
import projects from '@/data';
import { cn } from '@/lib/cn';
import { ProjectArtwork } from '../ProjectArtwork';
import { ExternalIcon, FolderIcon } from '../icons';
import { useAchievements } from '../state/achievements';
import { useProjectDetails } from '../state/project-details';
import { openExternalShortcut } from '../shortcuts';

export function ProjectDetailsWindowContent() {
  const { selectedProjectId, setSelectedProjectId } = useProjectDetails();
  const { triggerAchievement } = useAchievements();
  const project =
    projects.find((item) => item.id === selectedProjectId) ?? projects[0];

  useEffect(() => {
    triggerAchievement(
      'inspected-project',
      'Inspector mode',
      'You opened a project properties sheet instead of just skimming links.',
    );
  }, [triggerAchievement]);

  return (
    <section className="flex h-full min-h-0 flex-col bg-bg-0 text-fg-0">
      <div className="grid min-h-0 flex-1 gap-0 md:grid-cols-[230px_minmax(0,1fr)]">
        <aside className="hidden border-r border-hairline/60 bg-bg-1/95 p-3 md:block">
          <p className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-2">
            Recent projects
          </p>
          <div className="space-y-1">
            {projects.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedProjectId(item.id)}
                className={cn(
                  'group flex w-full items-center gap-2 rounded-chrome px-2 py-2 text-left text-[12px] transition-colors',
                  item.id === project.id
                    ? 'bg-accent/14 text-accent'
                    : 'text-fg-1 hover:bg-fg-0/10 hover:text-fg-0',
                )}
              >
                <FolderIcon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5" />
                <span className="min-w-0 flex-1 truncate">{item.name}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="min-h-0 overflow-y-auto">
          <div className="project-detail-hero relative min-h-[220px] overflow-hidden border-b border-hairline/60">
            <ProjectArtwork project={project} priority />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_18%,oklch(0.12_0.015_var(--accent-h)/0.84))]" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="project-detail-title max-w-2xl">
                <span className="rounded-full bg-bg-0/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-accent">
                  {project.status} | {project.year}
                </span>
                <h1 className="mt-3 text-2xl font-semibold tracking-tight text-[oklch(0.98_0.006_var(--accent-h))] sm:text-3xl">
                  {project.name}
                </h1>
                <p className="mt-2 max-w-[64ch] text-[13px] leading-6 text-white/74">
                  {project.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_230px]">
            <section className="min-w-0 space-y-5">
              <InfoBlock title="Case Notes">
                {project.caseStudy}
              </InfoBlock>

              <section>
                <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-fg-2">
                  Highlights
                </h2>
                <ul className="space-y-2">
                  {project.highlights.map((highlight, index) => (
                    <li
                      key={highlight}
                      className="project-detail-row flex gap-3 rounded-chrome border border-hairline/60 bg-bg-1/95 px-3 py-2 text-[13px] leading-5 text-fg-1"
                      style={{ animationDelay: `${index * 70}ms` }}
                    >
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-fg-2">
                  Stack
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <span
                      key={tech}
                      className="project-chip rounded-full border border-hairline/60 bg-bg-1 px-3 py-1 text-[12px] font-medium text-fg-1"
                      style={{ animationDelay: `${index * 34}ms` }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </section>
            </section>

            <aside className="space-y-3">
              <div className="rounded-window border border-hairline bg-bg-1 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-2">
                  Role
                </p>
                <p className="mt-2 text-[13px] font-medium text-fg-0">
                  {project.role}
                </p>
              </div>
              <button
                type="button"
                onClick={() => openExternalShortcut(project.linkUrl)}
                className="flex w-full items-center justify-between rounded-chrome bg-accent px-3 py-2 text-[13px] font-semibold text-[oklch(0.99_0.005_290)] transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95"
              >
                Open live
                <ExternalIcon className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => openExternalShortcut(project.githubUrl)}
                className="flex w-full items-center justify-between rounded-chrome border border-hairline bg-bg-1 px-3 py-2 text-[13px] font-semibold text-fg-1 transition-colors hover:bg-bg-2 hover:text-fg-0"
              >
                Source
                <ExternalIcon className="h-4 w-4" />
              </button>
            </aside>
          </div>
        </main>
      </div>
    </section>
  );
}

function InfoBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-fg-2">
        {title}
      </h2>
      <p className="max-w-[72ch] text-[14px] leading-7 text-fg-1">
        {children}
      </p>
    </section>
  );
}
