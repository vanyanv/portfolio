'use client';

import { usePreferences } from './state/preferences';
import type { AccentName } from './state/types';
import { cn } from '@/lib/cn';

const ACCENTS: { name: AccentName; hue: number; label: string }[] = [
  { name: 'indigo', hue: 290, label: 'Indigo' },
  { name: 'cyan', hue: 215, label: 'Cyan' },
  { name: 'rose', hue: 10, label: 'Rose' },
];

export function AccentPicker() {
  const { accent, setAccent } = usePreferences();
  return (
    <div role="radiogroup" aria-label="Accent color" className="flex gap-1">
      {ACCENTS.map((a) => {
        const active = a.name === accent;
        return (
          <button
            key={a.name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${a.label} accent`}
            title={a.label}
            onClick={() => setAccent(a.name)}
            className={cn(
              'h-4 w-4 rounded-full border transition-transform',
              active
                ? 'border-fg-0 scale-110'
                : 'border-hairline hover:scale-110',
            )}
            style={{
              background: `oklch(0.66 0.22 ${a.hue})`,
            }}
          />
        );
      })}
    </div>
  );
}
