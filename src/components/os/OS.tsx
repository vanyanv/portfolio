'use client';

import type { ReactNode } from 'react';
import { PreferencesProvider } from './state/preferences';
import { SessionProvider, useSession } from './state/session';
import { WindowManagerProvider } from './state/window-manager';
import { Desktop } from './Desktop';
import { BootSequence } from './BootSequence';
import { LockScreen } from './LockScreen';
import type { WindowId } from './state/types';

type Props = {
  contents: Record<WindowId, ReactNode>;
};

export function OS({ contents }: Props) {
  return (
    <PreferencesProvider>
      <SessionProvider>
        <WindowManagerProvider>
          <SessionShell contents={contents} />
        </WindowManagerProvider>
      </SessionProvider>
    </PreferencesProvider>
  );
}

function SessionShell({ contents }: Props) {
  const { phase } = useSession();

  return (
    <>
      {/* Always render desktop so background work (font load, etc.) is ready */}
      <Desktop contents={contents} />
      {phase === 'locked' && <LockScreen />}
      {phase === 'booting' && <BootSequence />}
    </>
  );
}
