'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

export type AchievementId =
  | 'command-palette'
  | 'inspected-project'
  | 'terminal-fun'
  | 'operator-theme'
  | 'contact-ready';

type AchievementToast = {
  id: AchievementId;
  title: string;
  body: string;
  nonce: number;
};

type AchievementContextValue = {
  unlocked: AchievementId[];
  triggerAchievement: (id: AchievementId, title: string, body: string) => void;
};

const STORAGE_KEY = 'portfolio-achievements';
const ACHIEVEMENTS: AchievementId[] = [
  'command-palette',
  'inspected-project',
  'terminal-fun',
  'operator-theme',
  'contact-ready',
];
const AchievementContext = createContext<AchievementContextValue | null>(null);

export function AchievementProvider({ children }: { children: ReactNode }) {
  const [unlocked, setUnlocked] = useState<AchievementId[]>([]);
  const [toasts, setToasts] = useState<AchievementToast[]>([]);
  const unlockedRef = useRef<AchievementId[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      if (!Array.isArray(parsed)) return;
      const valid = parsed.filter((item): item is AchievementId =>
        ACHIEVEMENTS.includes(item),
      );
      unlockedRef.current = valid;
      setUnlocked(valid);
    } catch {
      unlockedRef.current = [];
      setUnlocked([]);
    }
  }, []);

  const triggerAchievement = useCallback(
    (id: AchievementId, title: string, body: string) => {
      if (unlockedRef.current.includes(id)) return;
      const next = [...unlockedRef.current, id];
      unlockedRef.current = next;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setUnlocked(next);
      setToasts((items) => [
        ...items,
        { id, title, body, nonce: Date.now() + Math.random() },
      ]);
    },
    [],
  );

  const dismissToast = useCallback((nonce: number) => {
    setToasts((items) => items.filter((toast) => toast.nonce !== nonce));
  }, []);

  const value = useMemo(
    () => ({ unlocked, triggerAchievement }),
    [unlocked, triggerAchievement],
  );

  return (
    <AchievementContext.Provider value={value}>
      {children}
      <AchievementToasts toasts={toasts} onDismiss={dismissToast} />
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const ctx = useContext(AchievementContext);
  if (!ctx) {
    throw new Error('useAchievements must be used inside AchievementProvider');
  }
  return ctx;
}

function AchievementToasts({
  toasts,
  onDismiss,
}: {
  toasts: AchievementToast[];
  onDismiss: (nonce: number) => void;
}) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timers = toasts.map((toast) =>
      window.setTimeout(() => onDismiss(toast.nonce), 3800),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [onDismiss, toasts]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-20 z-[1300] flex w-[min(360px,calc(100vw-32px))] flex-col gap-2"
    >
      {toasts.map((toast) => (
        <article
          key={toast.nonce}
          className="achievement-toast pointer-events-auto overflow-hidden rounded-window border border-hairline bg-bg-1/95 p-3 shadow-window"
        >
          <div className="flex items-start gap-3">
            <span
              aria-hidden
              className="achievement-pulse mt-0.5 h-8 w-8 shrink-0 rounded-chrome bg-accent/15"
            />
            <div className="min-w-0">
              <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-accent">
                Achievement unlocked
              </p>
              <h2 className="mt-1 text-[14px] font-semibold text-fg-0">
                {toast.title}
              </h2>
              <p className="mt-1 text-[12px] leading-5 text-fg-1">
                {toast.body}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.nonce)}
              className="ml-auto rounded px-1.5 text-[14px] text-fg-2 transition-colors hover:bg-fg-0/10 hover:text-fg-0"
              aria-label="Dismiss achievement"
            >
              x
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
