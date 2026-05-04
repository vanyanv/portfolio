'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useWindowManager } from './state/window-manager';
import { useSession } from './state/session';
import { WINDOW_META } from './windows-meta';
import { DESKTOP_SHORTCUTS, runShortcut, type ShortcutMeta } from './shortcuts';
import { PowerIcon, SearchIcon } from './icons';
import { cn } from '@/lib/cn';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function StartMenu({ open, onClose }: Props) {
  const { open: openWindow, state } = useWindowManager();
  const { signOut } = useSession();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return DESKTOP_SHORTCUTS;
    const q = query.trim().toLowerCase();
    return DESKTOP_SHORTCUTS.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.searchText.toLowerCase().includes(q),
    );
  }, [query]);

  const recents = state.recents
    .map((id) => WINDOW_META[id])
    .filter(Boolean)
    .slice(0, 4);

  const handleOpen = (shortcut: ShortcutMeta) => {
    runShortcut(shortcut.action, openWindow);
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* click-outside backdrop — sits below taskbar (z-50) so taskbar stays interactive */}
      <div
        className="fixed inset-0 z-[40]"
        onClick={onClose}
        aria-hidden
      />
      <div
        className="fixed left-1/2 bottom-[68px] -translate-x-1/2 z-[70]"
      >
      <div
        role="menu"
        aria-label="Start menu"
        className={cn(
          'mica-strong rounded-window border border-hairline shadow-window',
          'w-[min(480px,calc(100vw-16px))] max-h-[min(560px,calc(100dvh-110px))] flex flex-col origin-bottom',
          'animate-window-open',
        )}
      >
        {/* Search */}
        <div className="p-4 pb-3 border-b border-hairline/40">
          <label className="flex items-center gap-2 rounded-chrome border border-hairline/70 bg-bg-1/40 px-3 py-2 focus-within:border-accent">
            <SearchIcon className="h-4 w-4 text-fg-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filtered[0]) {
                  e.preventDefault();
                  handleOpen(filtered[0]);
                }
              }}
              placeholder="Search apps"
              className="flex-1 bg-transparent text-[13px] text-fg-0 placeholder:text-fg-2 outline-none"
              aria-label="Search apps"
            />
          </label>
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-3 space-y-5">
          <section aria-labelledby="pinned-h">
            <h3
              id="pinned-h"
              className="text-[11px] uppercase tracking-wider text-fg-2 mb-2"
            >
              Pinned
            </h3>
            <ul className="grid grid-cols-3 gap-1">
              {filtered.map((meta) => (
                <li key={meta.id}>
                  <button
                    type="button"
                    onClick={() => handleOpen(meta)}
                    className="group flex w-full flex-col items-center gap-1 rounded-chrome p-2 hover:bg-fg-0/10 transition-colors"
                  >
                    <span className="flex h-11 w-11 items-center justify-center transition-transform duration-200 ease-out drop-shadow-[0_8px_14px_rgba(0,0,0,0.18)] group-hover:-translate-y-0.5 group-hover:scale-[1.03]">
                      {meta.launcherIcon}
                    </span>
                    <span className="text-[11px] text-fg-1 group-hover:text-fg-0 text-center truncate w-full">
                      {meta.label.replace(/\.[^.]+$/, '')}
                    </span>
                  </button>
                </li>
              ))}
              {filtered.length === 0 && (
                <li className="col-span-3 text-center text-[12px] text-fg-2 py-4">
                  No matches.
                </li>
              )}
            </ul>
          </section>

          {recents.length > 0 && !query.trim() && (
            <section aria-labelledby="recent-h">
              <h3
                id="recent-h"
                className="text-[11px] uppercase tracking-wider text-fg-2 mb-2"
              >
                Recommended
              </h3>
              <ul className="space-y-0.5">
                {recents.map((meta) => (
                  <li key={meta.id}>
                    <button
                      type="button"
                      onClick={() => {
                        openWindow(meta.id);
                        onClose();
                      }}
                      className="flex w-full items-center gap-3 rounded-chrome px-2 py-1.5 hover:bg-fg-0/8 transition-colors text-left"
                    >
                      <span className="flex h-6 w-6 items-center justify-center text-accent">
                        {meta.titleBarIcon}
                      </span>
                      <span className="flex-1 text-[12px] text-fg-1">
                        {meta.desktopLabel}
                      </span>
                      <span className="text-[10px] text-fg-2">
                        Recently opened
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <footer className="flex items-center justify-between border-t border-hairline/40 px-4 py-2.5">
          <span className="text-[11px] text-fg-2">Vardan Vanyan</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              signOut();
            }}
            className="flex items-center gap-1.5 rounded-chrome px-2 py-1 text-[11px] text-fg-1 hover:bg-fg-0/10 transition-colors"
          >
            <PowerIcon className="h-3.5 w-3.5" />
            Sign out
          </button>
        </footer>
      </div>
      </div>
    </>
  );
}
