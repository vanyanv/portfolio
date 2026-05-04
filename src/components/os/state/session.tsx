'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { SessionPhase } from './types';

type Ctx = {
  phase: SessionPhase;
  unlock: () => void;
  signOut: () => void;
  skipBoot: () => void;
};

const SessionContext = createContext<Ctx | null>(null);

const BOOTED_KEY = 'has_booted';
const BOOT_DURATION = 1500;

export function SessionProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<SessionPhase>('booting');

  useEffect(() => {
    const hasBooted = localStorage.getItem(BOOTED_KEY) === '1';
    if (hasBooted) {
      setPhase('unlocked');
      return;
    }
    const t = setTimeout(() => {
      setPhase('locked');
      localStorage.setItem(BOOTED_KEY, '1');
    }, BOOT_DURATION);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (phase !== 'booting') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPhase('locked');
        localStorage.setItem(BOOTED_KEY, '1');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase]);

  const unlock = useCallback(() => setPhase('unlocked'), []);
  const signOut = useCallback(() => setPhase('locked'), []);
  const skipBoot = useCallback(() => {
    setPhase('locked');
    localStorage.setItem(BOOTED_KEY, '1');
  }, []);

  const value = useMemo(
    () => ({ phase, unlock, signOut, skipBoot }),
    [phase, unlock, signOut, skipBoot],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be inside SessionProvider');
  return ctx;
}
