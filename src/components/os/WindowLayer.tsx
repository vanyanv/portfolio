'use client';

import { useMemo, type ReactNode } from 'react';
import { useWindowManager } from './state/window-manager';
import { Window } from './Window';
import type { WindowId } from './state/types';
import { WINDOW_META } from './windows-meta';

type Props = {
  contents: Record<WindowId, ReactNode>;
};

export function WindowLayer({ contents }: Props) {
  const { state } = useWindowManager();

  const openWindows = useMemo(() => {
    return Object.values(state.windows)
      .filter((w) => w.isOpen && !w.isMinimized)
      .sort((a, b) => a.openedAt - b.openedAt);
  }, [state.windows]);

  return (
    <div aria-label="Open windows" className="pointer-events-none fixed inset-0">
      {openWindows.map((w, i) => {
        const meta = WINDOW_META[w.id];
        return (
          <div key={w.id} className="pointer-events-auto">
            <Window
              id={w.id}
              title={meta.title}
              icon={meta.titleBarIcon}
              size={meta.size}
              stackIndex={i}
            >
              {contents[w.id]}
            </Window>
          </div>
        );
      })}
    </div>
  );
}
