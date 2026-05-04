'use client';

import { Wallpaper } from './Wallpaper';
import { VanyanLogo } from './icons';
import { LazySessionAura3D } from './LazySessionAura3D';

export function BootSequence() {
  return (
    <div
      role="status"
      aria-label="Booting"
      aria-live="polite"
      className="fixed inset-0 isolate z-[100] flex flex-col items-center justify-center gap-8 overflow-hidden"
    >
      <Wallpaper />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{ background: 'oklch(0.08 0.02 var(--accent-h) / 0.88)' }}
      />
      <LazySessionAura3D variant="boot" />

      <div className="relative z-10 animate-boot-pulse text-fg-0 drop-shadow-[0_0_28px_oklch(0.66_0.22_var(--accent-h)_/_0.42)]">
        <VanyanLogo className="h-16 w-16" />
      </div>
      <BootSpinner />
      <p className="relative z-10 text-[11px] uppercase tracking-[0.3em] text-fg-2">
        Vanyan-OS
      </p>
    </div>
  );
}

function BootSpinner() {
  return (
    <div
      aria-hidden
      className="relative z-10 flex gap-1.5"
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-accent"
          style={{
            animation: `boot-pulse 1.4s ease-in-out infinite`,
            animationDelay: `${i * 120}ms`,
          }}
        />
      ))}
    </div>
  );
}
