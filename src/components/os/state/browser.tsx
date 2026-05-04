'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { OriginPoint } from './types';
import { useWindowManager } from './window-manager';

export type BrowserPage = 'github' | 'linkedin';

type BrowserContextValue = {
  activePage: BrowserPage;
  openBrowser: (page: BrowserPage, origin?: OriginPoint | null) => void;
  setActivePage: (page: BrowserPage) => void;
};

const BrowserContext = createContext<BrowserContextValue | null>(null);

export function BrowserProvider({ children }: { children: ReactNode }) {
  const { open } = useWindowManager();
  const [activePage, setActivePage] = useState<BrowserPage>('github');

  const openBrowser = useCallback(
    (page: BrowserPage, origin: OriginPoint | null = null) => {
      setActivePage(page);
      open('chrome', origin);
    },
    [open],
  );

  const value = useMemo(
    () => ({ activePage, openBrowser, setActivePage }),
    [activePage, openBrowser],
  );

  return (
    <BrowserContext.Provider value={value}>{children}</BrowserContext.Provider>
  );
}

export function useBrowser() {
  const ctx = useContext(BrowserContext);
  if (!ctx) throw new Error('useBrowser must be used inside BrowserProvider');
  return ctx;
}
