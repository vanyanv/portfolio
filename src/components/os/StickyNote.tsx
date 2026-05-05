'use client';

import { useEffect, useState } from 'react';
import { useWindowManager } from './state/window-manager';

const STORAGE_KEY = 'portfolio-sticky-note-dismissed';

export function StickyNote() {
  const { open } = useWindowManager();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(localStorage.getItem(STORAGE_KEY) !== 'true');
  }, []);

  if (!visible) return null;

  return (
    <aside className="sticky-note fixed right-4 top-6 z-10 w-[min(260px,calc(100vw-32px))] rotate-[-1deg] rounded-chrome border border-[oklch(0.82_0.1_92)] bg-[oklch(0.94_0.12_92)] p-3 text-[oklch(0.22_0.04_80)] shadow-floating max-sm:top-auto max-sm:right-3 max-sm:bottom-20 max-sm:w-[min(238px,calc(100vw-24px))]">
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => open('terminal')}
          className="min-w-0 flex-1 text-left"
        >
          <p className="text-[12px] font-bold uppercase tracking-[0.12em]">
            Try this
          </p>
          <p className="mt-1 text-[13px] leading-5">
            Press Ctrl+K, or open Terminal and type matrix, coffee, or why hire
            me.
          </p>
        </button>
        <button
          type="button"
          aria-label="Dismiss sticky note"
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, 'true');
            setVisible(false);
          }}
          className="rounded px-1.5 text-[14px] font-semibold transition-colors hover:bg-black/10"
        >
          x
        </button>
      </div>
    </aside>
  );
}
