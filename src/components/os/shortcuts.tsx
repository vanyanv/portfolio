import type { ReactNode } from 'react';
import { GithubAppIcon, LinkedinAppIcon } from './icons';
import type { BrowserPage } from './state/browser';
import type { OriginPoint, WindowId } from './state/types';
import { DESKTOP_ICON_ORDER, WINDOW_META } from './windows-meta';

export type ExternalShortcutId = 'github' | 'linkedin';
export type ShortcutId = WindowId | ExternalShortcutId;

export type ShortcutAction =
  | { kind: 'window'; id: WindowId }
  | { kind: 'browser'; page: BrowserPage }
  | { kind: 'external'; href: string };

export type ShortcutMeta = {
  id: ShortcutId;
  label: string;
  searchText: string;
  desktopIcon: ReactNode;
  launcherIcon: ReactNode;
  action: ShortcutAction;
};

const windowShortcuts: ShortcutMeta[] = DESKTOP_ICON_ORDER.map((id) => {
  const meta = WINDOW_META[id];
  return {
    id,
    label: meta.desktopLabel,
    searchText: `${meta.desktopLabel} ${meta.title}`,
    desktopIcon: meta.desktopIcon,
    launcherIcon: meta.launcherIcon,
    action: { kind: 'window', id },
  };
});

export const EXTERNAL_SHORTCUTS: ShortcutMeta[] = [
  {
    id: 'github',
    label: 'GitHub.url',
    searchText: 'GitHub source code repositories',
    desktopIcon: <GithubAppIcon className="h-12 w-12" />,
    launcherIcon: <GithubAppIcon className="h-10 w-10" />,
    action: { kind: 'browser', page: 'github' },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn.url',
    searchText: 'LinkedIn profile professional network',
    desktopIcon: <LinkedinAppIcon className="h-12 w-12" />,
    launcherIcon: <LinkedinAppIcon className="h-10 w-10" />,
    action: { kind: 'browser', page: 'linkedin' },
  },
];

export const DESKTOP_SHORTCUTS: ShortcutMeta[] = [
  ...windowShortcuts,
  ...EXTERNAL_SHORTCUTS,
];

export function openExternalShortcut(href: string) {
  window.open(href, '_blank', 'noopener,noreferrer');
}

export function runShortcut(
  action: ShortcutAction,
  openWindow: (id: WindowId, origin?: OriginPoint | null) => void,
  openBrowser?: (page: BrowserPage, origin?: OriginPoint | null) => void,
  origin?: OriginPoint | null,
) {
  if (action.kind === 'external') {
    openExternalShortcut(action.href);
    return;
  }

  if (action.kind === 'browser') {
    openBrowser?.(action.page, origin);
    return;
  }

  openWindow(action.id, origin);
}
