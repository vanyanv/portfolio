'use client';

import { lazy, Suspense, useEffect, useState } from 'react';
import type { ComponentProps } from 'react';
import type { SessionAura3D as SessionAura3DType } from './SessionAura3D';

type Props = ComponentProps<typeof SessionAura3DType>;

const SessionAura3D = lazy(() =>
  import('./SessionAura3D').then((mod) => ({ default: mod.SessionAura3D })),
);

export function LazySessionAura3D(props: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <SessionAura3D {...props} />
    </Suspense>
  );
}
