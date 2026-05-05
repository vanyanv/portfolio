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
import type { AccentName, ThemeMode } from './types';

type Ctx = {
  theme: ThemeMode;
  resolvedTheme: 'dark' | 'light';
  setTheme: (t: ThemeMode) => void;
  accent: AccentName;
  setAccent: (a: AccentName) => void;
  operatorUnlocked: boolean;
  unlockOperator: () => void;
};

const PreferencesContext = createContext<Ctx | null>(null);

const THEME_KEY = 'theme';
const ACCENT_KEY = 'accent';
const OPERATOR_KEY = 'operator-accent-unlocked';
const ACCENTS: AccentName[] = ['indigo', 'cyan', 'rose', 'operator'];

function resolveSystemTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(resolved: 'dark' | 'light') {
  const root = document.documentElement;
  if (resolved === 'dark') root.classList.add('dark');
  else root.classList.remove('dark');
}

function applyAccent(accent: AccentName) {
  document.documentElement.dataset.accent = accent;
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [accent, setAccentState] = useState<AccentName>('indigo');
  const [operatorUnlocked, setOperatorUnlocked] = useState(false);
  const [systemPrefersDark, setSystemPrefersDark] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const storedAccent = localStorage.getItem(ACCENT_KEY) as AccentName | null;
    setOperatorUnlocked(localStorage.getItem(OPERATOR_KEY) === 'true');
    if (storedTheme) setThemeState(storedTheme);
    if (storedAccent && ACCENTS.includes(storedAccent)) {
      setAccentState(storedAccent);
    }
    setSystemPrefersDark(resolveSystemTheme() === 'dark');

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = (e: MediaQueryListEvent) => setSystemPrefersDark(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const resolvedTheme: 'dark' | 'light' = useMemo(() => {
    if (theme === 'system') return systemPrefersDark ? 'dark' : 'light';
    return theme;
  }, [theme, systemPrefersDark]);

  useEffect(() => {
    applyTheme(resolvedTheme);
  }, [resolvedTheme]);

  useEffect(() => {
    applyAccent(accent);
  }, [accent]);

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    localStorage.setItem(THEME_KEY, t);
  }, []);

  const setAccent = useCallback((a: AccentName) => {
    if (a === 'operator') {
      localStorage.setItem(OPERATOR_KEY, 'true');
      setOperatorUnlocked(true);
    }
    setAccentState(a);
    localStorage.setItem(ACCENT_KEY, a);
  }, []);

  const unlockOperator = useCallback(() => {
    localStorage.setItem(OPERATOR_KEY, 'true');
    setOperatorUnlocked(true);
  }, []);

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
      accent,
      setAccent,
      operatorUnlocked,
      unlockOperator,
    }),
    [
      theme,
      resolvedTheme,
      setTheme,
      accent,
      setAccent,
      operatorUnlocked,
      unlockOperator,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be inside PreferencesProvider');
  return ctx;
}
