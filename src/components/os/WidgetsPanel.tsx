'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { useBrowser } from './state/browser';
import { useWindowManager } from './state/window-manager';
import {
  ExternalIcon,
  GithubAppIcon,
  LinkedinAppIcon,
  MailIcon,
  PdfIcon,
  SunIcon,
} from './icons';
import { cn } from '@/lib/cn';

type Props = {
  open: boolean;
  onClose: () => void;
};

type LoadState<T> =
  | { status: 'idle' | 'loading' }
  | { status: 'ready'; data: T }
  | { status: 'error'; message: string };

type GithubWidgetData = {
  profile: {
    name: string;
    login: string;
    htmlUrl: string;
    publicRepos: number;
    followers: number;
  };
  repos: {
    name: string;
    htmlUrl: string;
    description: string | null;
    language: string | null;
    stars: number;
    pushedAt: string | null;
  }[];
  fetchedAt: string;
};

type WeatherWidgetData = {
  location: string;
  temperature: number;
  apparentTemperature: number;
  windSpeed: number;
  condition: string;
  fetchedAt: string;
};

export function WidgetsPanel({ open, onClose }: Props) {
  const { open: openWindow } = useWindowManager();
  const { openBrowser } = useBrowser();
  const [now, setNow] = useState<Date | null>(null);
  const [github, setGithub] = useState<LoadState<GithubWidgetData>>({
    status: 'idle',
  });
  const [weather, setWeather] = useState<LoadState<WeatherWidgetData>>({
    status: 'idle',
  });

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (!open) return;

    let active = true;
    setGithub({ status: 'loading' });
    setWeather({ status: 'loading' });

    fetch('/api/widgets/github')
      .then((res) => {
        if (!res.ok) throw new Error('GitHub is unavailable');
        return res.json() as Promise<GithubWidgetData>;
      })
      .then((data) => active && setGithub({ status: 'ready', data }))
      .catch((error: Error) => {
        if (active) setGithub({ status: 'error', message: error.message });
      });

    fetch('/api/widgets/weather')
      .then((res) => {
        if (!res.ok) throw new Error('Weather is unavailable');
        return res.json() as Promise<WeatherWidgetData>;
      })
      .then((data) => active && setWeather({ status: 'ready', data }))
      .catch((error: Error) => {
        if (active) setWeather({ status: 'error', message: error.message });
      });

    return () => {
      active = false;
    };
  }, [open]);

  if (!open) return null;

  const displayTime = now
    ? now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    : '--:--';
  const displayDate = now
    ? now.toLocaleDateString([], {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    : 'Loading date';

  return (
    <>
      <div className="fixed inset-0 z-[45]" onClick={onClose} aria-hidden />
      <aside
        aria-label="Widgets"
        className={cn(
          'fixed right-2 top-4 bottom-[68px] z-[60]',
          'w-[min(380px,calc(100vw-16px))] overflow-hidden',
          'mica-strong rounded-window border border-hairline shadow-window',
          'animate-window-open',
        )}
      >
        <div className="flex h-full flex-col">
          <header className="flex items-end justify-between border-b border-hairline/50 px-4 py-3">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-fg-2">
                Widgets
              </p>
              <h2 className="text-lg font-semibold tracking-wide text-fg-0">
                {displayTime}
              </h2>
            </div>
            <time className="max-w-[140px] text-right text-[12px] leading-4 text-fg-1">
              {displayDate}
            </time>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            <WeatherWidget state={weather} />
            <GithubWidget state={github} />

            <section className="rounded-window border border-hairline/60 bg-bg-1 p-3">
              <h3 className="text-[12px] font-semibold text-fg-0">
                Quick links
              </h3>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <QuickLink
                  icon={<MailIcon className="h-4 w-4" />}
                  label="Contact"
                  onClick={() => {
                    openWindow('contact');
                    onClose();
                  }}
                />
                <QuickLink
                  icon={<PdfIcon className="h-4 w-4" />}
                  label="Resume"
                  onClick={() => {
                    openWindow('resume');
                    onClose();
                  }}
                />
                <QuickLink
                  icon={<GithubAppIcon className="h-6 w-6" />}
                  label="GitHub"
                  onClick={() => {
                    openBrowser('github');
                    onClose();
                  }}
                />
                <QuickLink
                  icon={<LinkedinAppIcon className="h-6 w-6" />}
                  label="LinkedIn"
                  onClick={() => {
                    openBrowser('linkedin');
                    onClose();
                  }}
                />
              </div>
            </section>
          </div>
        </div>
      </aside>
    </>
  );
}

function WeatherWidget({ state }: { state: LoadState<WeatherWidgetData> }) {
  return (
    <section className="rounded-window border border-hairline/60 bg-bg-1 p-3">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-chrome bg-accent/15 text-accent">
          <SunIcon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-[12px] font-semibold text-fg-0">
            Los Angeles weather
          </h3>
          {state.status === 'ready' ? (
            <>
              <p className="mt-1 text-3xl font-semibold tracking-wide text-fg-0">
                {Math.round(state.data.temperature)}°F
              </p>
              <p className="text-[12px] leading-5 text-fg-1">
                {state.data.condition}, feels like{' '}
                {Math.round(state.data.apparentTemperature)}°F
              </p>
              <p className="text-[11px] text-fg-2">
                Wind {Math.round(state.data.windSpeed)} mph
              </p>
            </>
          ) : (
            <WidgetStatus
              state={state}
              loading="Checking the sky"
              fallback="Weather unavailable"
            />
          )}
        </div>
      </div>
    </section>
  );
}

function GithubWidget({ state }: { state: LoadState<GithubWidgetData> }) {
  return (
    <section className="rounded-window border border-hairline/60 bg-bg-1 p-3">
      <div className="mb-3 flex items-center gap-3">
        <GithubAppIcon className="h-10 w-10 shrink-0" />
        <div className="min-w-0">
          <h3 className="truncate text-[12px] font-semibold text-fg-0">
            GitHub activity
          </h3>
          <p className="text-[11px] text-fg-2">github.com/vanyanv</p>
        </div>
      </div>

      {state.status === 'ready' ? (
        <>
          <div className="grid grid-cols-2 gap-2">
            <Stat label="Repos" value={state.data.profile.publicRepos} />
            <Stat label="Followers" value={state.data.profile.followers} />
          </div>
          <ul className="mt-3 space-y-1">
            {state.data.repos.slice(0, 3).map((repo) => (
              <li key={repo.htmlUrl}>
                <a
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 rounded-chrome px-2 py-1.5 text-left transition-colors hover:bg-fg-0/8"
                >
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[12px] font-medium text-fg-0 group-hover:text-accent">
                      {repo.name}
                    </span>
                    <span className="block truncate text-[11px] text-fg-2">
                      {repo.language ?? 'Public repo'}
                      {repo.stars > 0 ? `, ${repo.stars} stars` : ''}
                    </span>
                  </span>
                  <ExternalIcon className="h-3.5 w-3.5 shrink-0 text-fg-2 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <WidgetStatus
          state={state}
          loading="Loading public repos"
          fallback="GitHub unavailable"
        />
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-chrome bg-bg-2/45 px-3 py-2">
      <p className="text-lg font-semibold leading-none text-fg-0">{value}</p>
      <p className="mt-1 text-[11px] text-fg-2">{label}</p>
    </div>
  );
}

function WidgetStatus<T>({
  state,
  loading,
  fallback,
}: {
  state: LoadState<T>;
  loading: string;
  fallback: string;
}) {
  return (
    <p className="mt-2 rounded-chrome bg-bg-2/45 px-3 py-2 text-[12px] text-fg-2">
      {state.status === 'error' ? fallback : loading}
    </p>
  );
}

function QuickLink({
  icon,
  label,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-2 rounded-chrome bg-bg-2/45 px-2.5 py-2 text-left text-[12px] font-medium text-fg-1 transition-colors hover:bg-accent/15 hover:text-accent"
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}
