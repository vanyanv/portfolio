/*
 * Inline SVG icons. Tiny, no library, tree-shakable.
 * All icons inherit currentColor and use stroke for line weight consistency.
 * App icons use local Icons8 PNGs and intentionally skip Next image optimization.
 */
/* eslint-disable @next/next/no-img-element */

import type { ImgHTMLAttributes, SVGProps } from 'react';

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

export function CodeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M6.25 4.25L3 8l3.25 3.75" />
      <path d="M9.75 4.25L13 8l-3.25 3.75" />
      <path d="M8.8 2.75l-1.6 10.5" />
    </svg>
  );
}

export function TerminalIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 4.5l3.2 3.5L3 11.5" />
      <path d="M7.5 11.5H13" />
    </svg>
  );
}

export function ChromeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="5.75" />
      <circle cx="8" cy="8" r="2.2" />
      <path d="M8 2.25h5.25M3.1 5.15l2.65 4.6M10.25 9.75l-2.7 4.55" />
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
/*  Icons8 Windows-style app icons                                  */
/* ---------------------------------------------------------------- */

type AppIconProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'alt' | 'src'>;

function AppImageIcon({
  alt,
  className,
  src,
  ...props
}: AppIconProps & { alt: string; src: string }) {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      className={className}
      draggable={false}
    />
  );
}

export function ReadmeAppIcon(props: AppIconProps) {
  return <CodeAppIcon {...props} />;
}

export function CodeAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon
      {...props}
      src="/Icons/os/vscode.png"
      alt="Visual Studio Code icon"
    />
  );
}

export function TerminalAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon
      {...props}
      src="/Icons/os/terminal.png"
      alt="Terminal icon"
    />
  );
}

export function ChromeAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon {...props} src="/Icons/os/chrome.png" alt="Chrome icon" />
  );
}

export function AboutAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon {...props} src="/Icons/os/about.png" alt="Profile icon" />
  );
}

export function ProjectsAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon
      {...props}
      src="/Icons/os/projects.png"
      alt="Projects folder icon"
    />
  );
}

export function AppsAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon
      {...props}
      src="/Icons/os/apps.png"
      alt="Installed apps icon"
    />
  );
}

export function ResumeAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon {...props} src="/Icons/os/resume.png" alt="Resume PDF icon" />
  );
}

export function ContactAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon {...props} src="/Icons/os/contact.png" alt="Contact icon" />
  );
}

export function GithubAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon {...props} src="/Icons/os/github.png" alt="GitHub icon" />
  );
}

export function LinkedinAppIcon(props: AppIconProps) {
  return (
    <AppImageIcon {...props} src="/Icons/os/linkedin.png" alt="LinkedIn icon" />
  );
}
