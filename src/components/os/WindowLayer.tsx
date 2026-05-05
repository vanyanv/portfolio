'use client';

import dynamic from 'next/dynamic';
import { useMemo, type ComponentType } from 'react';
import { useWindowManager } from './state/window-manager';
import { Window } from './Window';
import type { WindowId } from './state/types';
import { WINDOW_META } from './windows-meta';

type WindowContentComponent = ComponentType<Record<string, never>>;

const windowContentLoading = (label: string) =>
  function WindowContentLoading() {
    return (
      <div className="flex h-full items-center justify-center bg-bg-0/35 p-6 text-center text-[12px] font-medium text-fg-2">
        Loading {label}...
      </div>
    );
  };

const WINDOW_CONTENTS: Record<WindowId, WindowContentComponent> = {
  readme: dynamic(
    () =>
      import('./windows/ReadmeWindow').then((mod) => mod.ReadmeWindowContent),
    { loading: windowContentLoading('README.md'), ssr: false },
  ),
  terminal: dynamic(
    () =>
      import('./windows/TerminalWindow').then(
        (mod) => mod.TerminalWindowContent,
      ),
    { loading: windowContentLoading('Terminal'), ssr: false },
  ),
  chrome: dynamic(
    () =>
      import('./windows/ChromeWindow').then((mod) => mod.ChromeWindowContent),
    { loading: windowContentLoading('Chrome'), ssr: false },
  ),
  about: dynamic(
    () => import('./windows/AboutWindow').then((mod) => mod.AboutWindowContent),
    { loading: windowContentLoading('About'), ssr: false },
  ),
  projects: dynamic(
    () =>
      import('./windows/ProjectsWindow').then(
        (mod) => mod.ProjectsWindowContent,
      ),
    { loading: windowContentLoading('Projects'), ssr: false },
  ),
  projectDetails: dynamic(
    () =>
      import('./windows/ProjectDetailsWindow').then(
        (mod) => mod.ProjectDetailsWindowContent,
      ),
    { loading: windowContentLoading('Project Properties'), ssr: false },
  ),
  tech: dynamic(
    () => import('./windows/TechWindow').then((mod) => mod.TechWindowContent),
    { loading: windowContentLoading('Installed Apps'), ssr: false },
  ),
  resume: dynamic(
    () =>
      import('./windows/ResumeWindow').then((mod) => mod.ResumeWindowContent),
    { loading: windowContentLoading('Resume'), ssr: false },
  ),
  contact: dynamic(
    () =>
      import('./windows/ContactWindow').then((mod) => mod.ContactWindowContent),
    { loading: windowContentLoading('Contact'), ssr: false },
  ),
};

export function WindowLayer() {
  const { state } = useWindowManager();

  const openWindows = useMemo(() => {
    return Object.values(state.windows)
      .filter((w) => w.isOpen && !w.isMinimized)
      .sort((a, b) => a.openedAt - b.openedAt);
  }, [state.windows]);

  return (
    <div
      aria-label="Open windows"
      className="pointer-events-none fixed inset-0 z-20"
    >
      {openWindows.map((w, i) => {
        const meta = WINDOW_META[w.id];
        const Content = WINDOW_CONTENTS[w.id];
        return (
          <div key={w.id} className="pointer-events-auto">
            <Window
              id={w.id}
              title={meta.title}
              icon={meta.titleBarIcon}
              size={meta.size}
              stackIndex={i}
            >
              <Content />
            </Window>
          </div>
        );
      })}
    </div>
  );
}
