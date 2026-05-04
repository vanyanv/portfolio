/*
 * Inline SVG icons. Tiny, no library, tree-shakable.
 * All icons inherit currentColor and use stroke for line weight consistency.
 */

import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  fill: 'none',
  viewBox: '0 0 16 16',
  stroke: 'currentColor',
  strokeWidth: 1.25,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function MinimizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 11h8" />
    </svg>
  );
}

export function MaximizeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4.25" y="4.25" width="7.5" height="7.5" rx="0.75" />
    </svg>
  );
}

export function FileIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 1.75H4.25a1 1 0 0 0-1 1v10.5a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5.25z" />
      <path d="M9.5 1.75v3.5h3.25" />
    </svg>
  );
}

export function FolderIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M2 4.5a1 1 0 0 1 1-1h3.25l1.5 1.5H13a1 1 0 0 1 1 1V12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
    </svg>
  );
}

export function PersonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="5.5" r="2.5" />
      <path d="M3 13.5c.5-2.5 2.5-4 5-4s4.5 1.5 5 4" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="3.5" width="12" height="9" rx="1" />
      <path d="M2.5 4.5l5.5 4 5.5-4" />
    </svg>
  );
}

export function PdfIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9.5 1.75H4.25a1 1 0 0 0-1 1v10.5a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5.25z" />
      <path d="M9.5 1.75v3.5h3.25" />
      <path d="M5.5 9.5h5M5.5 11.5h3" />
    </svg>
  );
}

export function GridIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="0.75" />
      <rect x="9" y="2.5" width="4.5" height="4.5" rx="0.75" />
      <rect x="2.5" y="9" width="4.5" height="4.5" rx="0.75" />
      <rect x="9" y="9" width="4.5" height="4.5" rx="0.75" />
    </svg>
  );
}

export function StartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="2.5" width="4.5" height="4.5" rx="0.5" />
      <rect x="9" y="2.5" width="4.5" height="4.5" rx="0.5" />
      <rect x="2.5" y="9" width="4.5" height="4.5" rx="0.5" />
      <rect x="9" y="9" width="4.5" height="4.5" rx="0.5" />
    </svg>
  );
}

export function SunIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1.5v1.5M8 13v1.5M1.5 8h1.5M13 8h1.5M3.3 3.3l1 1M11.7 11.7l1 1M3.3 12.7l1-1M11.7 4.3l1-1" />
    </svg>
  );
}

export function MoonIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 9.2A5.5 5.5 0 0 1 6.8 2.5a5.5 5.5 0 1 0 6.7 6.7z" />
    </svg>
  );
}

export function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5l3 3" />
    </svg>
  );
}

export function ExternalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M9 3h4v4M13 3l-7 7M11 9.5v3a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h3" />
    </svg>
  );
}

export function PowerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2.5v5.5" />
      <path d="M5 4.5a4.5 4.5 0 1 0 6 0" />
    </svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function VanyanLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M4 4h6.5L12 14.5 13.5 4H20L14 22h-4z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ---------------------------------------------------------------- */
/*  Colorful Fluent-style app icons (48 viewBox, gradients, motion)  */
/* ---------------------------------------------------------------- */

const appBase: SVGProps<SVGSVGElement> = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 48 48',
  fill: 'none',
};

export function ReadmeAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="readme-sheet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbfcfd" />
          <stop offset="1" stopColor="#e7ecf2" />
        </linearGradient>
      </defs>
      <rect x="10" y="8" width="30" height="36" rx="2.5" fill="oklch(0.35 0.06 240 / 0.22)" />
      <path
        d="M8 5 h26 l6 6 v28 a2 2 0 0 1 -2 2 H10 a2 2 0 0 1 -2 -2 V7 a2 2 0 0 1 2 -2 z"
        fill="url(#readme-sheet)"
        stroke="oklch(0.7 0.03 240)"
        strokeWidth="0.6"
      />
      <path d="M34 5 v6 h6" fill="oklch(0.84 0.03 240)" stroke="oklch(0.6 0.04 240)" strokeWidth="0.6" />
      <line x1="13" y1="20" x2="35" y2="20" stroke="oklch(0.55 0.18 240)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13" y1="25" x2="32" y2="25" stroke="oklch(0.55 0.18 240)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13" y1="30" x2="35" y2="30" stroke="oklch(0.55 0.18 240)" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="13" y1="35" x2="27" y2="35" stroke="oklch(0.55 0.18 240)" strokeWidth="1.6" strokeLinecap="round" />
      <line className="icon-caret" x1="28.6" y1="33.2" x2="28.6" y2="37" stroke="oklch(0.45 0.22 240)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function AboutAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="about-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.72 0.22 290)" />
          <stop offset="1" stopColor="oklch(0.7 0.2 345)" />
        </linearGradient>
        <clipPath id="about-clip">
          <circle cx="24" cy="24" r="18" />
        </clipPath>
      </defs>
      <circle cx="24" cy="26" r="18" fill="oklch(0.4 0.12 320 / 0.22)" />
      <g clipPath="url(#about-clip)">
        <circle className="icon-about-grad" cx="24" cy="24" r="18" fill="url(#about-grad)" />
        <circle cx="24" cy="21" r="5.4" fill="#fff" opacity="0.96" />
        <ellipse cx="24" cy="41" rx="12" ry="9" fill="#fff" opacity="0.96" />
      </g>
      <circle cx="24" cy="24" r="18" fill="none" stroke="oklch(1 0 0 / 0.25)" strokeWidth="0.8" />
    </svg>
  );
}

export function ProjectsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="proj-back" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.16 75)" />
          <stop offset="1" stopColor="oklch(0.62 0.18 65)" />
        </linearGradient>
        <linearGradient id="proj-front" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.86 0.16 85)" />
          <stop offset="1" stopColor="oklch(0.7 0.18 75)" />
        </linearGradient>
      </defs>
      {/* back tab */}
      <path
        d="M5 14 a3 3 0 0 1 3 -3 h11 l4 4 h17 a3 3 0 0 1 3 3 V37 a3 3 0 0 1 -3 3 H8 a3 3 0 0 1 -3 -3 z"
        fill="url(#proj-back)"
      />
      {/* peeking page */}
      <rect x="11" y="16" width="26" height="20" rx="1.5" fill="#fff" opacity="0.85" />
      <line x1="14" y1="22" x2="34" y2="22" stroke="oklch(0.7 0.02 80)" strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="26" x2="30" y2="26" stroke="oklch(0.7 0.02 80)" strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="30" x2="32" y2="30" stroke="oklch(0.7 0.02 80)" strokeWidth="1" strokeLinecap="round" />
      {/* front face / lid (rotates on hover) */}
      <path
        className="icon-folder-lid"
        d="M5 22 h38 V37 a3 3 0 0 1 -3 3 H8 a3 3 0 0 1 -3 -3 z"
        fill="url(#proj-front)"
      />
    </svg>
  );
}

export function AppsAppIcon(props: SVGProps<SVGSVGElement>) {
  const tile = (x: number, y: number, fill: string, n: number) => (
    <rect
      className={`icon-tile icon-tile-${n}`}
      x={x}
      y={y}
      width="16"
      height="16"
      rx="3"
      fill={fill}
    />
  );
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="tile-r" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.72 0.2 25)" />
          <stop offset="1" stopColor="oklch(0.6 0.22 25)" />
        </linearGradient>
        <linearGradient id="tile-b" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.7 0.18 240)" />
          <stop offset="1" stopColor="oklch(0.58 0.2 245)" />
        </linearGradient>
        <linearGradient id="tile-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.18 145)" />
          <stop offset="1" stopColor="oklch(0.62 0.2 150)" />
        </linearGradient>
        <linearGradient id="tile-y" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.85 0.16 80)" />
          <stop offset="1" stopColor="oklch(0.72 0.18 75)" />
        </linearGradient>
      </defs>
      {tile(6, 6, 'url(#tile-r)', 1)}
      {tile(26, 6, 'url(#tile-b)', 2)}
      {tile(6, 26, 'url(#tile-g)', 3)}
      {tile(26, 26, 'url(#tile-y)', 4)}
      {/* tiny glyphs inside each tile for personality */}
      <circle cx="14" cy="14" r="2.2" fill="#fff" opacity="0.9" />
      <rect x="31" y="11" width="6" height="6" rx="1" fill="#fff" opacity="0.9" />
      <path d="M11 35 l3 -4 l3 4 z" fill="#fff" opacity="0.9" />
      <path d="M30 31 h6 v6 h-6 z m1.5 1.5 v3 h3 v-3z" fill="#fff" opacity="0.9" />
    </svg>
  );
}

export function ResumeAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="resume-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.66 0.2 25)" />
          <stop offset="1" stopColor="oklch(0.55 0.22 25)" />
        </linearGradient>
      </defs>
      <rect x="10" y="8" width="30" height="36" rx="2.5" fill="oklch(0.35 0.1 25 / 0.22)" />
      <path
        d="M8 5 h22 l10 10 v24 a2 2 0 0 1 -2 2 H10 a2 2 0 0 1 -2 -2 V7 a2 2 0 0 1 2 -2 z"
        fill="url(#resume-body)"
      />
      {/* subtle text lines */}
      <line x1="13" y1="20" x2="34" y2="20" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="24" x2="30" y2="24" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="13" y1="28" x2="33" y2="28" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.4" strokeLinecap="round" />
      {/* PDF pill */}
      <rect x="11" y="33" width="15" height="7" rx="1.5" fill="#fff" />
      <text x="18.5" y="38.4" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="5" fontWeight="700" fill="oklch(0.5 0.22 25)" letterSpacing="0.5">
        PDF
      </text>
      {/* folded corner (lifts on hover) */}
      <path
        className="icon-pdf-corner"
        d="M30 5 v10 h10 z"
        fill="oklch(0.85 0.08 25)"
      />
      <path d="M30 5 v10 h10" stroke="oklch(0.45 0.18 25)" strokeWidth="0.6" fill="none" />
    </svg>
  );
}

export function ContactAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="env-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.7 0.18 245)" />
          <stop offset="1" stopColor="oklch(0.55 0.2 250)" />
        </linearGradient>
        <linearGradient id="env-flap" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.78 0.15 240)" />
          <stop offset="1" stopColor="oklch(0.62 0.2 248)" />
        </linearGradient>
      </defs>
      <rect x="6" y="13" width="36" height="28" rx="3" fill="oklch(0.3 0.1 250 / 0.22)" />
      {/* body */}
      <rect x="5" y="11" width="38" height="28" rx="3" fill="url(#env-body)" />
      {/* letter peeking */}
      <rect x="11" y="9" width="26" height="18" rx="1.5" fill="#fff" opacity="0.95" />
      <line x1="14" y1="14" x2="32" y2="14" stroke="oklch(0.7 0.04 250)" strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="17" x2="28" y2="17" stroke="oklch(0.7 0.04 250)" strokeWidth="1" strokeLinecap="round" />
      <line x1="14" y1="20" x2="30" y2="20" stroke="oklch(0.7 0.04 250)" strokeWidth="1" strokeLinecap="round" />
      {/* flap (rotates open on hover) */}
      <path
        className="icon-envelope-flap"
        d="M5 11 L 24 26 L 43 11 z"
        fill="url(#env-flap)"
      />
      {/* unread badge */}
      <circle className="icon-badge" cx="38" cy="11" r="5.5" fill="oklch(0.65 0.22 25)" stroke="#fff" strokeWidth="1.2" />
      <text x="38" y="13.2" textAnchor="middle" fontFamily="ui-sans-serif, system-ui" fontSize="6.5" fontWeight="700" fill="#fff">
        1
      </text>
    </svg>
  );
}

export function GithubAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="gh-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.32 0.025 270)" />
          <stop offset="1" stopColor="oklch(0.18 0.02 270)" />
        </linearGradient>
      </defs>
      <g className="icon-link-tilt">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#gh-body)" />
        {/* git-fork glyph: three nodes, two connecting lines */}
        <circle cx="17" cy="16" r="2.6" fill="#fff" />
        <circle cx="31" cy="16" r="2.6" fill="#fff" />
        <circle cx="24" cy="33" r="2.6" fill="#fff" />
        <path d="M17 18.6 V24 a2 2 0 0 0 2 2 h10 a2 2 0 0 0 2 -2 V18.6" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <line x1="24" y1="26" x2="24" y2="30.4" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      </g>
      {/* shortcut badge */}
      <g>
        <rect x="2" y="32" width="14" height="14" rx="3" fill="#fff" stroke="oklch(0.65 0.02 270)" strokeWidth="0.6" />
        <path d="M6 42 L13 35 M13 35 H8 M13 35 V40" stroke="oklch(0.4 0.04 270)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}

export function LinkedinAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...appBase} {...props}>
      <defs>
        <linearGradient id="li-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.62 0.16 245)" />
          <stop offset="1" stopColor="oklch(0.5 0.18 250)" />
        </linearGradient>
      </defs>
      <g className="icon-link-tilt">
        <rect x="6" y="6" width="36" height="36" rx="8" fill="url(#li-body)" />
        {/* dot of "i" */}
        <circle cx="15" cy="15.5" r="2.4" fill="#fff" />
        {/* stem of "i" */}
        <rect x="12.8" y="20" width="4.4" height="14" rx="0.8" fill="#fff" />
        {/* "n" */}
        <path
          d="M21 20 h4.4 v2 c1 -1.6 2.6 -2.4 4.6 -2.4 c3.4 0 5 2.2 5 5.6 V34 h-4.4 V26.2 c0 -1.6 -0.6 -2.6 -2.2 -2.6 c-1.8 0 -3 1.2 -3 3.2 V34 H21 z"
          fill="#fff"
        />
      </g>
      {/* shortcut badge */}
      <g>
        <rect x="2" y="32" width="14" height="14" rx="3" fill="#fff" stroke="oklch(0.65 0.02 250)" strokeWidth="0.6" />
        <path d="M6 42 L13 35 M13 35 H8 M13 35 V40" stroke="oklch(0.4 0.04 250)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </svg>
  );
}
