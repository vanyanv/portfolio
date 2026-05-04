'use client';

import { VanyanLogo } from './icons';

export function BootSequence() {
  return (
    <div
      role="status"
      aria-label="Booting"
      aria-live="polite"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-8"
      style={{ background: 'oklch(0.08 0.02 var(--accent-h))' }}
    >
      <div className="animate-boot-pulse text-fg-0">
        <VanyanLogo className="h-16 w-16" />
      </div>
      <BootSpinner />
      <p className="text-[11px] uppercase tracking-[0.3em] text-fg-2">
        Vanyan-OS
      </p>
    </div>
  );
}

function BootSpinner() {
  return (
    <div
      aria-hidden
      className="flex gap-1.5"
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
