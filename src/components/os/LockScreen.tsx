'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSession } from './state/session';
import { Wallpaper } from './Wallpaper';
import { cn } from '@/lib/cn';
import { LazySessionAura3D } from './LazySessionAura3D';

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
        'fixed inset-0 isolate z-[90] overflow-hidden',
        'transition-opacity duration-300',
        closing ? 'opacity-0' : 'opacity-100',
      )}
      >
      <Wallpaper />
      <LazySessionAura3D variant="lock" />

      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(180deg, oklch(0.05 0.012 var(--accent-h) / 0.3), transparent 34%, oklch(0.05 0.014 var(--accent-h) / 0.42)), linear-gradient(110deg, oklch(0.04 0.014 var(--accent-h) / 0.18), transparent 48%, oklch(0.08 0.025 var(--accent-h) / 0.22))',
        }}
      />

      <main className="relative z-10 flex min-h-[100dvh] w-full flex-col items-center justify-between px-6 py-8 text-center sm:px-10 sm:py-10">
        <section className="pt-[8vh]">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-fg-2 drop-shadow-[0_1px_12px_rgba(0,0,0,0.32)]">
            Vanyan-OS
          </p>
          <time className="mt-4 block text-[clamp(2.875rem,12vw,7rem)] font-light leading-none text-fg-0 tabular-nums drop-shadow-[0_8px_30px_rgba(0,0,0,0.36)]">
            {time}
          </time>
          <p className="mt-4 text-[15px] font-medium text-fg-1 drop-shadow-[0_2px_12px_rgba(0,0,0,0.34)] sm:text-[17px]">
            {date}
          </p>
        </section>

        <section className="flex w-full max-w-[320px] flex-col items-center pb-[8vh]">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-fg-0/20 bg-mica-strong shadow-floating backdrop-blur-xl">
            <Image
              src="/Images/optimized/vardan-avatar.webp"
              alt="Vardan Vanyan"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>

          <div className="mt-4 min-w-0">
            <p className="text-[18px] font-semibold text-fg-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.32)]">
              Vardan Vanyan
            </p>
            <p className="mt-1 text-[12px] font-medium text-fg-2 drop-shadow-[0_1px_8px_rgba(0,0,0,0.28)]">
              Software Engineer
            </p>
          </div>

          <button
            type="button"
            onClick={handleUnlock}
            autoFocus
            className={cn(
              'mt-5 flex h-10 w-full max-w-[220px] items-center justify-center rounded-chrome border border-fg-0/20 bg-mica-strong px-5',
              'text-[13px] font-semibold text-fg-0 shadow-floating backdrop-blur-xl',
              'transition-[background,border-color,transform,box-shadow,color] duration-200',
              'hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent hover:text-[oklch(0.98_0.005_var(--accent-h))]',
              'focus-visible:-translate-y-0.5 focus-visible:border-accent/70 focus-visible:bg-accent focus-visible:text-[oklch(0.98_0.005_var(--accent-h))]',
            )}
          >
            Sign in
          </button>

          <div className="mt-4 flex items-center gap-3 text-[11px] text-fg-2 drop-shadow-[0_1px_8px_rgba(0,0,0,0.24)]">
            <span>Los Angeles</span>
            <span className="h-1 w-1 rounded-full bg-fg-2/60" />
            <span>Ready</span>
          </div>
        </section>
      </main>
    </div>
  );
}
