'use client';

import { useEffect } from 'react';
import { useWindowManager } from './state/window-manager';
import { WINDOW_IDS } from './state/types';
import type { WindowId } from './state/types';

/**
 * On first mount reads `?app=<id>` from the URL and opens the matching window.
 * Mounted under WindowManagerProvider, after providers settle.
 */
export function DeepLinkOpener() {
  const { open } = useWindowManager();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const app = params.get('app');
    if (!app) return;
    if ((WINDOW_IDS as readonly string[]).includes(app)) {
      open(app as WindowId);
    }
    // strip the param so reload doesn't re-open
    const url = new URL(window.location.href);
    url.searchParams.delete('app');
    window.history.replaceState({}, '', url.toString());
  }, [open]);

  return null;
}
