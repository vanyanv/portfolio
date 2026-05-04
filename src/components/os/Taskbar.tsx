'use client';

import { useEffect, useState } from 'react';
import { useWindowManager } from './state/window-manager';
import { DESKTOP_ICON_ORDER, WINDOW_META } from './windows-meta';
import { Clock } from './Clock';
import { ThemeToggle } from './ThemeToggle';
import { AccentPicker } from './AccentPicker';
import { StartMenu } from './StartMenu';
import { WidgetsPanel } from './WidgetsPanel';
import { GridIcon, StartIcon } from './icons';
import { cn } from '@/lib/cn';
import type { WindowId } from './state/types';

export function Taskbar() {
  const { state, open: openWindow, focus } = useWindowManager();
  const [startOpen, setStartOpen] = useState(false);
  const [widgetsOpen, setWidgetsOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Meta' || (e.key === ' ' && e.ctrlKey)) {
        e.preventDefault();
        setStartOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const handleLaunch = (id: WindowId) => {
    const w = state.windows[id];
    if (w.isOpen && !w.isMinimized) {
      focus(id);
    } else {
      openWindow(id);
    }
  };

  return (
    <>
      <StartMenu open={startOpen} onClose={() => setStartOpen(false)} />
      <div
        role="toolbar"
        aria-label="Taskbar"
        className={cn(
          'fixed inset-x-2 bottom-2 mx-auto flex h-12 max-w-[760px] items-center gap-1 px-2 sm:px-3',
          'mica rounded-window border border-hairline shadow-floating',
          'z-50',
        )}
      >
        {/* Start button */}
        <button
          type="button"
          onClick={() => {
            setWidgetsOpen(false);
            setStartOpen((v) => !v);
          }}
          aria-label="Start menu"
          aria-expanded={startOpen}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-chrome',
            'transition-colors',
            startOpen
              ? 'bg-accent/20 text-accent'
              : 'text-fg-1 hover:text-accent hover:bg-fg-0/10',
          )}
        >
          <StartIcon className="h-4 w-4" />
        </button>

        <span className="mx-1 h-5 w-px bg-hairline/60" aria-hidden />

        {/* Pinned launcher */}
        <div className="flex items-center gap-0.5">
          {DESKTOP_ICON_ORDER.map((id) => {
            const meta = WINDOW_META[id];
            const w = state.windows[id];
            const isOpen = w.isOpen;
            const isFocused = state.focusedId === id;
            return (
              <button
                key={id}
                type="button"
                aria-label={`${isOpen ? 'Switch to' : 'Open'} ${meta.desktopLabel}`}
                aria-pressed={isFocused}
                onClick={() => handleLaunch(id)}
                className={cn(
                  'group relative flex h-8 w-8 items-center justify-center rounded-chrome',
                  'transition-colors',
                  isFocused && 'bg-accent/15 text-accent',
                  !isFocused && isOpen && 'text-fg-0 bg-fg-0/8',
                  !isOpen && 'text-fg-1 hover:text-accent hover:bg-fg-0/10',
                )}
                title={meta.desktopLabel}
              >
                {meta.titleBarIcon}
                {isOpen && (
                  <span
                    aria-hidden
                    className={cn(
                      'absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all',
                      isFocused ? 'w-3 bg-accent' : 'w-1.5 bg-fg-1',
                    )}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* System tray */}
        <div className="flex items-center gap-1.5 sm:gap-2 pr-1 sm:pr-2">
          <div className="hidden sm:flex items-center gap-2">
            <AccentPicker />
            <span className="h-5 w-px bg-hairline/60" aria-hidden />
          </div>
          <button
            type="button"
            onClick={() => {
              setStartOpen(false);
              setWidgetsOpen((v) => !v);
            }}
            aria-label="Widgets"
            aria-expanded={widgetsOpen}
            title="Widgets"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-chrome',
              'transition-colors',
              widgetsOpen
                ? 'bg-accent/20 text-accent'
                : 'text-fg-1 hover:bg-fg-0/10 hover:text-accent',
            )}
          >
            <GridIcon className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <span className="h-5 w-px bg-hairline/60" aria-hidden />
          <Clock />
        </div>
      </div>
      <WidgetsPanel open={widgetsOpen} onClose={() => setWidgetsOpen(false)} />
    </>
  );
}
