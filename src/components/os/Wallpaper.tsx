/*
 * Atmospheric wallpaper. Pure CSS gradients + inline SVG grain.
 * Themes via accent CSS vars; dark/light variants via the `:root.dark` class.
 */
export function Wallpaper() {
  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden wallpaper"
      />
      <svg
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-[0.07] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="vanyan-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#vanyan-grain)" />
      </svg>
      <style>{`
        .wallpaper {
          background-color: oklch(0.22 0.08 var(--accent-h));
          background-image:
            radial-gradient(
              ellipse 90% 80% at 12% 18%,
              oklch(0.55 0.3 var(--accent-h) / 0.95) 0%,
              oklch(0.45 0.28 var(--accent-h) / 0.65) 25%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 70% 65% at 88% 22%,
              oklch(0.65 0.26 calc(var(--accent-h) + 55) / 0.85) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 95% 80% at 78% 105%,
              oklch(0.5 0.3 calc(var(--accent-h) - 35) / 0.95) 0%,
              oklch(0.4 0.28 calc(var(--accent-h) - 35) / 0.55) 30%,
              transparent 75%
            ),
            radial-gradient(
              ellipse 60% 55% at 30% 90%,
              oklch(0.55 0.24 calc(var(--accent-h) + 25) / 0.7) 0%,
              transparent 60%
            );
        }
        :root:not(.dark) .wallpaper {
          background-color: oklch(0.78 0.12 var(--accent-h));
          background-image:
            radial-gradient(
              ellipse 80% 75% at 12% 18%,
              oklch(0.7 0.22 var(--accent-h) / 0.9) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 70% 65% at 88% 22%,
              oklch(0.78 0.2 calc(var(--accent-h) + 55) / 0.8) 0%,
              transparent 65%
            ),
            radial-gradient(
              ellipse 95% 80% at 78% 105%,
              oklch(0.65 0.24 calc(var(--accent-h) - 35) / 0.85) 0%,
              transparent 75%
            ),
            radial-gradient(
              ellipse 60% 55% at 30% 90%,
              oklch(0.72 0.22 calc(var(--accent-h) + 25) / 0.75) 0%,
              transparent 60%
            );
        }
      `}</style>
    </>
  );
}
