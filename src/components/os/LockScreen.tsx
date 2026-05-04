'use client';

import { useEffect, useState } from 'react';
import { useSession } from './state/session';
import { Wallpaper } from './Wallpaper';
import { cn } from '@/lib/cn';

export function LockScreen() {
  const { unlock } = useSession();
  const [now, setNow] = useState<Date | null>(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleUnlock();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnlock = () => {
    if (closing) return;
    setClosing(true);
    setTimeout(unlock, 300);
  };

  const time =
    now?.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      .toLowerCase() ?? '';
  const date =
    now?.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    }) ?? '';

  return (
    <div
      role="dialog"
      aria-label="Lock screen — sign in to continue"
      className={cn(
        'fixed inset-0 z-[90] flex flex-col items-center justify-center gap-12',
        'transition-opacity duration-300',
        closing ? 'opacity-0' : 'opacity-100',
      )}
    >
      <Wallpaper />

      {/* Clock + date */}
      <div className="text-center">
        <div className="text-[88px] font-light leading-none tracking-tight text-fg-0 tabular-nums drop-shadow-[0_2px_24px_rgba(0,0,0,0.4)]">
          {time}
        </div>
        <div className="mt-2 text-[15px] font-medium tracking-wide text-fg-1 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]">
          {date}
        </div>
      </div>

      {/* Avatar + sign in */}
      <div className="flex flex-col items-center gap-3">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full border border-hairline bg-mica-strong text-2xl font-semibold text-fg-0"
        >
          V
        </div>
        <p className="text-[13px] font-medium text-fg-0">Vardan</p>
        <button
          type="button"
          onClick={handleUnlock}
          autoFocus
          className={cn(
            'mt-1 rounded-chrome border border-hairline bg-mica-strong px-6 py-2',
            'text-[13px] font-medium text-fg-0',
            'hover:bg-accent hover:border-accent hover:text-white transition-colors',
            'focus-visible:bg-accent focus-visible:border-accent focus-visible:text-white',
          )}
        >
          Sign in
        </button>
        <p className="mt-1 text-[11px] tracking-wide text-fg-2">
          Press Enter or click to continue
        </p>
      </div>
    </div>
  );
}
