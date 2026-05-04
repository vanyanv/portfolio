'use client';

import { useRef, useState, type ReactNode } from 'react';
import type { OriginPoint } from './state/types';
import { cn } from '@/lib/cn';

type Props = {
  label: string;
  icon: ReactNode;
  onOpen: (origin: OriginPoint | null) => void;
};

export function DesktopIcon({ label, icon, onOpen }: Props) {
  const [selected, setSelected] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const trigger = () => {
    const rect = ref.current?.getBoundingClientRect();
    const origin = rect
      ? {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        }
      : null;
    onOpen(origin);
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => {
        setSelected(true);
        trigger();
      }}
      onBlur={() => setSelected(false)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          trigger();
        }
      }}
      aria-label={`Open ${label}`}
      className={cn(
        'group flex h-[88px] w-20 select-none flex-col items-center gap-1 rounded-chrome p-2',
        'text-fg-0 transition-colors duration-150',
        'hover:bg-fg-0/8',
        selected && 'bg-accent-glow ring-1 ring-accent/40',
      )}
    >
      <span
        className={cn(
          'flex h-14 w-14 items-center justify-center rounded-chrome',
          'transition-transform duration-200 ease-out',
          'drop-shadow-[0_10px_18px_rgba(0,0,0,0.24)]',
          'group-hover:-translate-y-1 group-hover:scale-[1.04]',
        )}
      >
        {icon}
      </span>
      <span
        className={cn(
          'text-center text-[11px] leading-tight font-medium tracking-wide',
          'text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.55)]',
        )}
      >
        {label}
      </span>
    </button>
  );
}
