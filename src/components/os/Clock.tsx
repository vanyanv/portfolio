'use client';

import { useEffect, useState } from 'react';

export function Clock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const tick = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(tick);
  }, []);

  if (!now) {
    return (
      <div
        className="flex flex-col items-end leading-tight tabular-nums text-fg-1"
        aria-hidden
      >
        <span className="text-[12px] font-medium">--:--</span>
        <span className="text-[10px] text-fg-2">---</span>
      </div>
    );
  }

  const time = now
    .toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    .toLowerCase();
  const date = now.toLocaleDateString([], {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return (
    <time
      dateTime={now.toISOString()}
      className="flex flex-col items-end leading-tight tabular-nums text-fg-1"
    >
      <span className="text-[12px] font-medium">{time}</span>
      <span className="hidden sm:inline text-[10px] text-fg-2">{date}</span>
    </time>
  );
}
