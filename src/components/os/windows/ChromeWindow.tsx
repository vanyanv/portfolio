'use client';

import { cn } from '@/lib/cn';
import { GithubAppIcon, LinkedinAppIcon } from '../icons';
import { useBrowser, type BrowserPage } from '../state/browser';
import { openExternalShortcut } from '../shortcuts';

const PAGES: Record<
  BrowserPage,
  {
    label: string;
    url: string;
    externalUrl: string;
  }
> = {
  github: {
    label: 'GitHub',
    url: 'https://github.com/vanyanv',
    externalUrl: 'https://github.com/vanyanv',
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/vardanvanyan/',
    externalUrl: 'https://www.linkedin.com/in/vardanvanyan/',
  },
};

export function ChromeWindowContent() {
  const { activePage, setActivePage } = useBrowser();
  const page = PAGES[activePage];

  return (
    <section className="flex h-full min-h-0 flex-col bg-bg-0 text-fg-0">
      <div className="border-b border-hairline/70 bg-bg-1/80">
        <div className="flex h-9 items-end gap-1 px-2 pt-1">
          {(Object.keys(PAGES) as BrowserPage[]).map((id) => {
            const tab = PAGES[id];
            return (
              <button
                key={id}
                type="button"
                onClick={() => setActivePage(id)}
                className={cn(
                  'flex h-8 min-w-[128px] max-w-[180px] items-center gap-2 rounded-t-chrome px-3 text-[12px] transition-colors',
                  activePage === id
                    ? 'bg-bg-0 text-fg-0'
                    : 'bg-bg-2/45 text-fg-2 hover:bg-bg-2 hover:text-fg-0',
                )}
              >
                {id === 'github' ? (
                  <GithubAppIcon className="h-4 w-4" />
                ) : (
                  <LinkedinAppIcon className="h-4 w-4" />
                )}
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex h-11 items-center gap-2 px-3">
          <BrowserButton label="Back">&lt;</BrowserButton>
          <BrowserButton label="Forward">&gt;</BrowserButton>
          <BrowserButton label="Reload">R</BrowserButton>
          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full border border-hairline/70 bg-bg-0/70 px-3 py-1.5 text-[12px] text-fg-1">
            <span className="text-[10px] text-accent">lock</span>
            <span className="truncate">{page.url}</span>
          </div>
          <button
            type="button"
            onClick={() => openExternalShortcut(page.externalUrl)}
            className="rounded-chrome bg-accent px-3 py-1.5 text-[12px] font-semibold text-[oklch(0.99_0.005_290)] transition-opacity hover:opacity-90"
          >
            Open real site
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {activePage === 'github' ? <GitHubPreview /> : <LinkedInPreview />}
      </div>
    </section>
  );
}

function BrowserButton({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className="flex h-7 w-7 items-center justify-center rounded-full text-[16px] text-fg-2 transition-colors hover:bg-fg-0/10 hover:text-fg-0"
    >
      {children}
    </button>
  );
}

function GitHubPreview() {
  const repos = [
    {
      name: 'MicrObserv',
      description: 'Observability dashboard for microservices.',
      stack: 'React, Electron, Node, Postgres',
    },
    {
      name: 'Modern-Pokedex',
      description: 'Minimal Pokedex with a fast, clean interface.',
      stack: 'Next.js, TypeScript, TanStack',
    },
    {
      name: 'portfolio',
      description: 'A Windows-inspired personal portfolio OS.',
      stack: 'Next.js, React, Tailwind CSS',
    },
  ];

  return (
    <main className="mx-auto max-w-5xl px-5 py-6">
      <section className="grid gap-5 md:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <div className="flex aspect-square max-w-[180px] items-center justify-center rounded-full border border-hairline bg-bg-2 text-5xl font-semibold text-accent">
            VV
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Vardan Vanyan
            </h1>
            <p className="text-[15px] text-fg-2">vanyanv</p>
          </div>
          <p className="text-[13px] leading-6 text-fg-1">
            Software engineer building polished front-end systems, desktop-like
            interfaces, and product experiences that feel good to use.
          </p>
          <button
            type="button"
            onClick={() => openExternalShortcut('https://github.com/vanyanv')}
            className="w-full rounded-chrome border border-hairline bg-bg-1 px-3 py-2 text-[13px] font-semibold hover:bg-bg-2"
          >
            View GitHub profile
          </button>
        </aside>

        <section className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-[12px] text-fg-2">
            <span className="rounded-full bg-accent/12 px-3 py-1 text-accent">
              Public portfolio preview
            </span>
            <span>Static page inside Chrome</span>
          </div>
          <div className="space-y-3">
            {repos.map((repo) => (
              <article
                key={repo.name}
                className="rounded-window border border-hairline bg-bg-1/60 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="truncate text-[15px] font-semibold text-accent">
                      {repo.name}
                    </h2>
                    <p className="mt-1 text-[13px] leading-5 text-fg-1">
                      {repo.description}
                    </p>
                  </div>
                  <span className="rounded-full border border-hairline px-2 py-0.5 text-[11px] text-fg-2">
                    Public
                  </span>
                </div>
                <p className="mt-4 text-[12px] text-fg-2">{repo.stack}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function LinkedInPreview() {
  const highlights = [
    'Front-end engineering',
    'React and TypeScript',
    'Product UI polish',
    'Los Angeles',
  ];

  return (
    <main className="mx-auto max-w-4xl px-5 py-6">
      <section className="overflow-hidden rounded-window border border-hairline bg-bg-1/70">
        <div className="h-32 bg-[linear-gradient(135deg,oklch(0.66_0.18_245),oklch(0.72_0.16_150))]" />
        <div className="px-5 pb-5">
          <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-bg-1 bg-bg-2 text-3xl font-semibold text-accent">
                VV
              </div>
              <div className="pb-2">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Vardan Vanyan
                </h1>
                <p className="text-[14px] text-fg-1">
                  Software Engineer | Front-end Developer
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                openExternalShortcut(
                  'https://www.linkedin.com/in/vardanvanyan/',
                )
              }
              className="rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-[oklch(0.99_0.005_290)] hover:opacity-90"
            >
              View LinkedIn profile
            </button>
          </div>

          <p className="mt-5 max-w-[64ch] text-[14px] leading-6 text-fg-1">
            I care about building interfaces with strong engineering underneath
            and small details that make the whole product feel easier to trust.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-hairline bg-bg-0/60 px-3 py-1 text-[12px] text-fg-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-4 grid gap-3 sm:grid-cols-2">
        <InfoPanel title="Current Focus">
          Building polished, fast front-end experiences with React, TypeScript,
          and product-minded UI systems.
        </InfoPanel>
        <InfoPanel title="Open To">
          Front-end engineering roles, product UI work, and teams that care
          about craft without turning everything into ceremony.
        </InfoPanel>
      </section>
    </main>
  );
}

function InfoPanel({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="rounded-window border border-hairline bg-bg-1/55 p-4">
      <h2 className="text-[13px] font-semibold text-fg-0">{title}</h2>
      <p className="mt-2 text-[13px] leading-6 text-fg-1">{children}</p>
    </article>
  );
}
