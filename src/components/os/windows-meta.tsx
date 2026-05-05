import type { ReactNode } from 'react';
import {
  AboutAppIcon,
  AppsAppIcon,
  ChromeAppIcon,
  ChromeIcon,
  ContactAppIcon,
  CodeAppIcon,
  FolderIcon,
  GridIcon,
  MailIcon,
  PdfIcon,
  PersonIcon,
  ProjectsAppIcon,
  ResumeAppIcon,
  TerminalAppIcon,
  TerminalIcon,
} from './icons';
import type { WindowId } from './state/types';

export type WindowMeta = {
  id: WindowId;
  title: string;
  desktopLabel: string;
  desktopIcon: ReactNode;
  launcherIcon: ReactNode;
  titleBarIcon: ReactNode;
  size: 'sm' | 'md' | 'lg' | 'xl';
};

export const WINDOW_META: Record<WindowId, WindowMeta> = {
  readme: {
    id: 'readme',
    title: 'README.md - portfolio - Visual Studio Code',
    desktopLabel: 'VS Code',
    desktopIcon: <CodeAppIcon className="h-12 w-12" />,
    launcherIcon: <CodeAppIcon className="h-10 w-10" />,
    titleBarIcon: <CodeAppIcon className="h-4 w-4" />,
    size: 'xl',
  },
  terminal: {
    id: 'terminal',
    title: 'Vardan Terminal',
    desktopLabel: 'Terminal',
    desktopIcon: <TerminalAppIcon className="h-12 w-12" />,
    launcherIcon: <TerminalAppIcon className="h-10 w-10" />,
    titleBarIcon: <TerminalIcon className="h-4 w-4" />,
    size: 'lg',
  },
  chrome: {
    id: 'chrome',
    title: 'Vanyan Chrome',
    desktopLabel: 'Chrome',
    desktopIcon: <ChromeAppIcon className="h-12 w-12" />,
    launcherIcon: <ChromeAppIcon className="h-10 w-10" />,
    titleBarIcon: <ChromeIcon className="h-4 w-4" />,
    size: 'xl',
  },
  about: {
    id: 'about',
    title: 'About Me',
    desktopLabel: 'About Me.app',
    desktopIcon: <AboutAppIcon className="h-12 w-12" />,
    launcherIcon: <AboutAppIcon className="h-10 w-10" />,
    titleBarIcon: <PersonIcon className="h-4 w-4" />,
    size: 'lg',
  },
  projects: {
    id: 'projects',
    title: 'Projects — File Explorer',
    desktopLabel: 'Projects',
    desktopIcon: <ProjectsAppIcon className="h-12 w-12" />,
    launcherIcon: <ProjectsAppIcon className="h-10 w-10" />,
    titleBarIcon: <FolderIcon className="h-4 w-4" />,
    size: 'xl',
  },
  projectDetails: {
    id: 'projectDetails',
    title: 'Project Properties',
    desktopLabel: 'Project Properties',
    desktopIcon: <ProjectsAppIcon className="h-12 w-12" />,
    launcherIcon: <ProjectsAppIcon className="h-10 w-10" />,
    titleBarIcon: <FolderIcon className="h-4 w-4" />,
    size: 'lg',
  },
  tech: {
    id: 'tech',
    title: 'Installed Apps — Settings',
    desktopLabel: 'Installed Apps',
    desktopIcon: <AppsAppIcon className="h-12 w-12" />,
    launcherIcon: <AppsAppIcon className="h-10 w-10" />,
    titleBarIcon: <GridIcon className="h-4 w-4" />,
    size: 'md',
  },
  resume: {
    id: 'resume',
    title: 'Resume.pdf',
    desktopLabel: 'Resume.pdf',
    desktopIcon: <ResumeAppIcon className="h-12 w-12" />,
    launcherIcon: <ResumeAppIcon className="h-10 w-10" />,
    titleBarIcon: <PdfIcon className="h-4 w-4" />,
    size: 'lg',
  },
  contact: {
    id: 'contact',
    title: 'Contact.eml — Mail',
    desktopLabel: 'Contact.eml',
    desktopIcon: <ContactAppIcon className="h-12 w-12" />,
    launcherIcon: <ContactAppIcon className="h-10 w-10" />,
    titleBarIcon: <MailIcon className="h-4 w-4" />,
    size: 'md',
  },
};

export const DESKTOP_ICON_ORDER: WindowId[] = [
  'readme',
  'terminal',
  'chrome',
  'about',
  'projects',
  'tech',
  'resume',
  'contact',
];
