'use client';

import type { ReactNode } from 'react';
import { Wallpaper } from './Wallpaper';
import { DesktopIcon } from './DesktopIcon';
import { WindowLayer } from './WindowLayer';
import { Taskbar } from './Taskbar';
import { DeepLinkOpener } from './DeepLinkOpener';
import type { WindowId } from './state/types';
import { useWindowManager } from './state/window-manager';
import { DESKTOP_SHORTCUTS, runShortcut } from './shortcuts';

type Props = {
  contents: Record<WindowId, ReactNode>;
};

export function Desktop({ contents }: Props) {
  const { open } = useWindowManager();

  return (
    <main className="relative h-[100dvh] w-full overflow-hidden font-sans">
      <Wallpaper />

      <section
        aria-label="Desktop"
        className="relative z-10 grid auto-rows-[100px] grid-cols-2 content-start gap-1 p-4 pt-6 max-w-[200px]"
      >
        {DESKTOP_SHORTCUTS.map((shortcut) => {
          return (
            <DesktopIcon
              key={shortcut.id}
              label={shortcut.label}
              icon={shortcut.desktopIcon}
              onOpen={(origin) => runShortcut(shortcut.action, open, origin)}
            />
          );
        })}
      </section>

      <WindowLayer contents={contents} />

      <Taskbar />
      <DeepLinkOpener />
    </main>
  );
}
