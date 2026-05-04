'use client';

import { usePreferences } from './state/preferences';
import { MoonIcon, SunIcon } from './icons';
import { cn } from '@/lib/cn';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = usePreferences();
  const next = resolvedTheme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={cn(
        'flex h-7 w-7 items-center justify-center rounded-chrome',
        'text-fg-1 hover:text-accent hover:bg-fg-0/10 transition-colors',
      )}
    >
      {resolvedTheme === 'dark' ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </button>
  );
}
