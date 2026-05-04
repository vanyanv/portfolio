export const WINDOW_IDS = [
  'readme',
  'about',
  'projects',
  'tech',
  'resume',
  'contact',
] as const;

export type WindowId = (typeof WINDOW_IDS)[number];

export type OriginPoint = { x: number; y: number };
export type WindowSizeMode = 'normal' | 'maximized' | 'snapped-left' | 'snapped-right';

export type WindowState = {
  id: WindowId;
  isOpen: boolean;
  isMinimized: boolean;
  openedAt: number;
  origin: OriginPoint | null;
  position: OriginPoint | null;
  lastNormalPosition: OriginPoint | null;
  sizeMode: WindowSizeMode;
};

export type SessionPhase = 'booting' | 'locked' | 'unlocked';

export type ThemeMode = 'dark' | 'light' | 'system';
export type AccentName = 'indigo' | 'cyan' | 'rose';
