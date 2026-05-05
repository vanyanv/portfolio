'use client';

import { useEffect, useRef } from 'react';
import { PreferencesProvider } from './state/preferences';
import { AchievementProvider } from './state/achievements';
import { BrowserProvider } from './state/browser';
import { ProjectDetailsProvider } from './state/project-details';
import { SessionProvider, useSession } from './state/session';
import { WindowManagerProvider, useWindowManager } from './state/window-manager';
import { Desktop } from './Desktop';
import { BootSequence } from './BootSequence';
import { LockScreen } from './LockScreen';

export function OS() {
  return (
    <PreferencesProvider>
      <SessionProvider>
        <WindowManagerProvider>
          <BrowserProvider>
            <ProjectDetailsProvider>
              <AchievementProvider>
                <SessionShell />
              </AchievementProvider>
            </ProjectDetailsProvider>
          </BrowserProvider>
        </WindowManagerProvider>
      </SessionProvider>
    </PreferencesProvider>
  );
}

function SessionShell() {
  const { phase } = useSession();
  const { open } = useWindowManager();
  const openedIntro = useRef(false);

  useEffect(() => {
    if (phase !== 'unlocked' || openedIntro.current) return;
    openedIntro.current = true;
    open('readme');
  }, [open, phase]);

  return (
    <>
      {/* Always render desktop so background work (font load, etc.) is ready */}
      <Desktop />
      {phase === 'locked' && <LockScreen />}
      {phase === 'booting' && <BootSequence />}
    </>
  );
}
