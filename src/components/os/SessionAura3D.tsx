'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { usePreferences } from './state/preferences';

type SessionAuraVariant = 'boot' | 'lock';

type Props = {
  variant: SessionAuraVariant;
};

type Palette = {
  accent: THREE.Color;
  secondary: THREE.Color;
  mist: THREE.Color;
};

const accentHues = {
  indigo: 0.78,
  cyan: 0.56,
  rose: 0.02,
};

export function SessionAura3D({ variant }: Props) {
  const canRender = useCanRender3D();
  const { accent, resolvedTheme } = usePreferences();

  if (!canRender) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 z-0 ${
        variant === 'boot' ? 'opacity-90' : 'opacity-55'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance',
        }}
      >
        <AuraScene
          accentHue={accentHues[accent]}
          theme={resolvedTheme}
          variant={variant}
        />
      </Canvas>
    </div>
  );
}

function AuraScene({
  accentHue,
  theme,
  variant,
}: {
  accentHue: number;
  theme: 'dark' | 'light';
  variant: SessionAuraVariant;
}) {
  const palette = useMemo<Palette>(() => {
    const isDark = theme === 'dark';
    return {
      accent: new THREE.Color().setHSL(accentHue, 0.82, isDark ? 0.66 : 0.48),
      secondary: new THREE.Color().setHSL(
        (accentHue + 0.12) % 1,
        0.72,
        isDark ? 0.58 : 0.52,
      ),
      mist: new THREE.Color().setHSL(
        (accentHue + 0.92) % 1,
        0.5,
        isDark ? 0.82 : 0.38,
      ),
    };
  }, [accentHue, theme]);

  return (
    <>
      {variant === 'boot' && <AuraPanes palette={palette} variant={variant} />}
      <AuraParticles palette={palette} variant={variant} />
      {variant === 'boot' && <AuraRings palette={palette} variant={variant} />}
    </>
  );
}

function AuraPanes({
  palette,
  variant,
}: {
  palette: Palette;
  variant: SessionAuraVariant;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);
  const boot = variant === 'boot';

  const panes = useMemo(
    () =>
      Array.from({ length: boot ? 9 : 12 }, (_, index) => {
        const side = index % 2 === 0 ? -1 : 1;
        const row = Math.floor(index / 2);
        return {
          x: side * (0.55 + row * 0.18),
          y: (index % 3 - 1) * 0.48,
          z: -0.35 - row * 0.28,
          width: 1.45 + (index % 4) * 0.26,
          height: 0.5 + (index % 3) * 0.15,
          rotation: side * (0.18 + row * 0.035),
          opacity: boot ? 0.18 - row * 0.012 : 0.11 - row * 0.006,
        };
      }),
    [boot],
  );

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;
    const bootProgress = boot ? Math.min(t / 1.5, 1) : 1;
    const idle = boot ? 0.5 : 0.18;

    groupRef.current.rotation.x =
      pointer.y * -0.045 + Math.sin(t * idle) * 0.035;
    groupRef.current.rotation.y =
      pointer.x * 0.085 + Math.cos(t * idle) * 0.075;
    groupRef.current.rotation.z = Math.sin(t * 0.16) * 0.018;
    groupRef.current.scale.setScalar(0.86 + bootProgress * 0.14);
  });

  return (
    <group ref={groupRef} position={[0, boot ? 0.12 : -0.08, 0]}>
      {panes.map((pane, index) => (
        <mesh
          key={index}
          position={[
            pane.x,
            pane.y,
            pane.z + (boot ? (1 - Math.min(index / 8, 1)) * 0.18 : 0),
          ]}
          rotation={[
            pane.rotation * 0.55,
            pane.rotation,
            pane.rotation * -0.35,
          ]}
        >
          <planeGeometry args={[pane.width, pane.height, 1, 1]} />
          <meshBasicMaterial
            blending={THREE.AdditiveBlending}
            color={index % 3 === 0 ? palette.secondary : palette.accent}
            depthWrite={false}
            opacity={Math.max(pane.opacity, 0.025)}
            side={THREE.DoubleSide}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function AuraParticles({
  palette,
  variant,
}: {
  palette: Palette;
  variant: SessionAuraVariant;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const elapsedRef = useRef(0);
  const boot = variant === 'boot';
  const particleCount = boot ? 130 : 150;

  const positions = useMemo(() => {
    const values = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      if (boot) {
        const radius = 1.2 + seededUnit(i, 3) * 2.5;
        const angle = seededUnit(i, 11) * Math.PI * 2;
        values[i * 3] = Math.cos(angle) * radius;
        values[i * 3 + 1] = (seededUnit(i, 19) - 0.5) * 2.6;
        values[i * 3 + 2] = Math.sin(angle) * radius - 1.1;
      } else {
        values[i * 3] = (seededUnit(i, 3) - 0.5) * 8.2;
        values[i * 3 + 1] = (seededUnit(i, 11) - 0.5) * 4.6;
        values[i * 3 + 2] = -0.8 - seededUnit(i, 19) * 3.4;
      }
    }
    return values;
  }, [boot, particleCount]);

  useFrame(({ pointer }, delta) => {
    if (!pointsRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;
    pointsRef.current.rotation.y = t * (boot ? 0.1 : 0.012) + pointer.x * (boot ? 0.06 : 0.018);
    pointsRef.current.rotation.x =
      Math.sin(t * (boot ? 0.18 : 0.08)) * (boot ? 0.08 : 0.025) -
      pointer.y * (boot ? 0.035 : 0.012);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        blending={THREE.AdditiveBlending}
        color={palette.mist}
        depthWrite={false}
        opacity={boot ? 0.45 : 0.18}
        size={boot ? 0.035 : 0.022}
        sizeAttenuation
        transparent
      />
    </points>
  );
}

function AuraRings({
  palette,
  variant,
}: {
  palette: Palette;
  variant: SessionAuraVariant;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const elapsedRef = useRef(0);
  const boot = variant === 'boot';

  useFrame(({ pointer }, delta) => {
    if (!groupRef.current) return;
    elapsedRef.current += delta;
    const t = elapsedRef.current;
    groupRef.current.rotation.x = pointer.y * -0.05 + Math.sin(t * 0.25) * 0.04;
    groupRef.current.rotation.y = pointer.x * 0.08 + t * (boot ? 0.18 : 0.055);
    groupRef.current.rotation.z = t * (boot ? 0.12 : 0.035);
  });

  return (
    <group ref={groupRef} position={[0, boot ? 0.05 : -0.12, -0.55]}>
      {[0, 1, 2].map((ring) => (
        <mesh
          key={ring}
          rotation={[
            Math.PI / 2 + ring * 0.34,
            ring * 0.62,
            ring * 0.27,
          ]}
          scale={1 + ring * 0.28}
        >
          <torusGeometry args={[1.04, 0.006, 8, 96]} />
          <meshBasicMaterial
            blending={THREE.AdditiveBlending}
            color={ring === 1 ? palette.secondary : palette.accent}
            depthWrite={false}
            opacity={boot ? 0.34 - ring * 0.075 : 0.18 - ring * 0.045}
            transparent
          />
        </mesh>
      ))}
    </group>
  );
}

function useCanRender3D() {
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const evaluate = () => {
      const verySmallScreen = window.innerWidth < 420 || window.innerHeight < 560;
      const lowConcurrency =
        typeof navigator.hardwareConcurrency === 'number' &&
        navigator.hardwareConcurrency > 0 &&
        navigator.hardwareConcurrency < 4;

      setCanRender(
        !reducedMotion.matches &&
          !verySmallScreen &&
          !lowConcurrency &&
          canUseWebGL(),
      );
    };

    evaluate();
    window.addEventListener('resize', evaluate);
    reducedMotion.addEventListener('change', evaluate);

    return () => {
      window.removeEventListener('resize', evaluate);
      reducedMotion.removeEventListener('change', evaluate);
    };
  }, []);

  return canRender;
}

function canUseWebGL() {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    );
  } catch {
    return false;
  }
}

function seededUnit(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
