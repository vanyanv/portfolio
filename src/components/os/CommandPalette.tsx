'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import projects from '@/data';
import { cn } from '@/lib/cn';
import { SearchIcon } from './icons';
import { useAchievements } from './state/achievements';
import { useBrowser } from './state/browser';
import { usePreferences } from './state/preferences';
import { useProjectDetails } from './state/project-details';
import { useWindowManager } from './state/window-manager';
import type { WindowId } from './state/types';

type Command = {
  id: string;
  label: string;
  detail: string;
  keywords: string;
  run: () => void;
};

export function CommandPalette() {
  const { open } = useWindowManager();
  const { openBrowser } = useBrowser();
  const { openProjectDetails } = useProjectDetails();
  const { setAccent, unlockOperator } = usePreferences();
  const { triggerAchievement } = useAchievements();
  const [visible, setVisible] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const runWindow = useCallback((id: WindowId) => () => open(id), [open]);

  const commands = useMemo<Command[]>(() => {
    const base: Command[] = [
      {
        id: 'open-vscode',
        label: 'Open VS Code README',
        detail: 'Start with the intro file.',
        keywords: 'readme vscode code about',
        run: runWindow('readme'),
      },
      {
        id: 'open-terminal',
        label: 'Open Terminal',
        detail: 'Try help, matrix, coffee, or why hire me.',
        keywords: 'shell cli commands fun',
        run: runWindow('terminal'),
      },
      {
        id: 'open-projects',
        label: 'Open Projects',
        detail: 'Browse the project explorer.',
        keywords: 'work portfolio apps explorer',
        run: runWindow('projects'),
      },
      {
        id: 'open-resume',
        label: 'Open Resume',
        detail: 'Launch the PDF window.',
        keywords: 'cv pdf hiring',
        run: runWindow('resume'),
      },
      {
        id: 'open-contact',
        label: 'Open Contact',
        detail: 'Email and social paths.',
        keywords: 'email linkedin github',
        run: () => {
          open('contact');
          triggerAchievement(
            'contact-ready',
            'Signal acquired',
            'The contact panel is open and ready.',
          );
        },
      },
      {
        id: 'open-github',
        label: 'Open GitHub in Chrome',
        detail: 'Static preview first, real site button inside.',
        keywords: 'source repositories browser',
        run: () => openBrowser('github'),
      },
      {
        id: 'open-linkedin',
        label: 'Open LinkedIn in Chrome',
        detail: 'Professional profile preview.',
        keywords: 'profile social browser',
        run: () => openBrowser('linkedin'),
      },
      {
        id: 'operator-theme',
        label: 'Unlock Operator Accent',
        detail: 'A tiny hidden green terminal mood.',
        keywords: 'theme accent secret green matrix',
        run: () => {
          unlockOperator();
          setAccent('operator');
          triggerAchievement(
            'operator-theme',
            'Operator theme',
            'The hidden accent is now available in the taskbar picker.',
          );
        },
      },
    ];

    const projectCommands = projects.map<Command>((project) => ({
      id: `project-${project.id}`,
      label: `Inspect ${project.name}`,
      detail: project.description,
      keywords: `${project.name} ${project.tech.join(' ')}`,
      run: () => openProjectDetails(project.id),
    }));

    return [...base, ...projectCommands];
  }, [
    open,
    openBrowser,
    openProjectDetails,
    runWindow,
    setAccent,
    triggerAchievement,
    unlockOperator,
  ]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setVisible((value) => !value);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!visible) return;
    setQuery('');
    setActiveIndex(0);
    requestAnimationFrame(() => inputRef.current?.focus());
    triggerAchievement(
      'command-palette',
      'Power user',
      'Ctrl+K opens the quick launcher. Recruiter speedrun unlocked.',
    );
  }, [triggerAchievement, visible]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((command) =>
      `${command.label} ${command.detail} ${command.keywords}`
        .toLowerCase()
        .includes(q),
    );
  }, [commands, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  if (!visible) return null;

  const active = filtered[activeIndex];

  const runActive = () => {
    if (!active) return;
    active.run();
    setVisible(false);
  };

  return (
    <div className="fixed inset-0 z-[1250] flex items-start justify-center bg-[oklch(0.08_0.02_var(--accent-h)/0.42)] px-3 pt-[12vh]">
      <button
        type="button"
        aria-label="Close command palette"
        className="absolute inset-0 cursor-default"
        onClick={() => setVisible(false)}
      />
      <section
        role="dialog"
        aria-label="Command palette"
        className="command-palette relative w-[min(680px,100%)] overflow-hidden rounded-window border border-hairline bg-bg-1 shadow-window"
      >
        <label className="flex items-center gap-3 border-b border-hairline/60 px-4 py-3">
          <SearchIcon className="h-5 w-5 text-accent" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault();
                setVisible(false);
              }
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                if (filtered.length === 0) return;
                setActiveIndex((index) =>
                  Math.min(index + 1, filtered.length - 1),
                );
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActiveIndex((index) => Math.max(index - 1, 0));
              }
              if (event.key === 'Enter') {
                event.preventDefault();
                runActive();
              }
            }}
            placeholder="Search apps, projects, or secret commands"
            className="min-w-0 flex-1 bg-transparent text-[15px] text-fg-0 placeholder:text-fg-2 outline-none"
          />
          <span className="hidden rounded border border-hairline px-1.5 py-0.5 text-[10px] text-fg-2 sm:block">
            Esc
          </span>
        </label>

        <ul className="max-h-[min(420px,58dvh)] overflow-y-auto p-2">
          {filtered.map((command, index) => (
            <li key={command.id}>
              <button
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  command.run();
                  setVisible(false);
                }}
                className={cn(
                  'palette-result flex w-full items-center gap-3 rounded-chrome px-3 py-2.5 text-left transition-colors',
                  activeIndex === index
                    ? 'bg-accent/14 text-fg-0'
                    : 'text-fg-1 hover:bg-fg-0/8',
                )}
                style={{ animationDelay: `${Math.min(index, 7) * 28}ms` }}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-bg-0/70 text-[12px] font-semibold text-accent">
                  {command.label.slice(0, 1)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-semibold">
                    {command.label}
                  </span>
                  <span className="block truncate text-[12px] text-fg-2">
                    {command.detail}
                  </span>
                </span>
              </button>
            </li>
          ))}
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-[13px] text-fg-2">
              Nothing matched. Try terminal, ryddo, or operator.
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
