'use client';

import { useEffect, useRef, useState } from 'react';
import projects from '@/data';
import { useAchievements } from '../state/achievements';
import { useBrowser } from '../state/browser';
import { usePreferences } from '../state/preferences';
import { useProjectDetails } from '../state/project-details';
import { useWindowManager } from '../state/window-manager';

type TerminalLine = {
  kind: 'prompt' | 'output';
  text: string;
};

const INITIAL_LINES: TerminalLine[] = [
  { kind: 'output', text: 'Vardan Terminal [Portfolio OS]' },
  { kind: 'output', text: 'Type "help" to see available commands.' },
];

export function TerminalWindowContent() {
  const { open: openWindow } = useWindowManager();
  const { openBrowser } = useBrowser();
  const { setAccent, unlockOperator } = usePreferences();
  const { openProjectDetails } = useProjectDetails();
  const { triggerAchievement } = useAchievements();
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [lines]);

  const runCommand = (raw: string) => {
    const command = raw.trim().toLowerCase();
    if (!command) return;

    if (command === 'clear') {
      setLines(INITIAL_LINES);
      return;
    }

    const output = resolveCommand(command, {
      openProjects: () => openWindow('projects'),
      openContact: () => openWindow('contact'),
      openResume: () => openWindow('resume'),
      openGitHub: () => openBrowser('github'),
      openLinkedIn: () => openBrowser('linkedin'),
      openProjectDetails,
      setOperatorTheme: () => {
        unlockOperator();
        setAccent('operator');
        triggerAchievement(
          'operator-theme',
          'Operator theme',
          'The hidden accent is now available in the taskbar picker.',
        );
      },
      triggerFun: () =>
        triggerAchievement(
          'terminal-fun',
          'Terminal tourist',
          'You found the commands hiding under the professional surface.',
        ),
      triggerContact: () =>
        triggerAchievement(
          'contact-ready',
          'Signal acquired',
          'The contact panel is open and ready.',
        ),
    });

    setLines((current) => [
      ...current,
      { kind: 'prompt', text: raw },
      ...output.map((text) => ({ kind: 'output' as const, text })),
    ]);
  };

  return (
    <section
      className="flex h-full flex-col bg-[oklch(0.13_0.025_150)] font-mono text-[12px] text-[oklch(0.88_0.04_150)]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex h-8 shrink-0 items-center gap-2 border-b border-white/10 bg-[oklch(0.18_0.025_160)] px-3 text-[11px] text-white/62">
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.72_0.16_30)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.8_0.16_90)]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[oklch(0.74_0.18_150)]" />
        <span className="ml-2">zsh - portfolio</span>
      </div>

      <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto p-4">
        {lines.map((line, index) => (
          <div
            key={`${line.kind}-${index}`}
            className="terminal-line min-h-6 whitespace-pre-wrap"
          >
            {line.kind === 'prompt' ? (
              <>
                <span className="text-[oklch(0.78_0.18_150)]">
                  vardan@portfolio
                </span>
                <span className="text-white/45">:~$ </span>
                <span className="text-white">{line.text}</span>
              </>
            ) : (
              <span>{line.text}</span>
            )}
          </div>
        ))}

        <form
          className="mt-1 flex min-h-6 items-center"
          onSubmit={(event) => {
            event.preventDefault();
            runCommand(input);
            setInput('');
          }}
        >
          <span className="text-[oklch(0.78_0.18_150)]">
            vardan@portfolio
          </span>
          <span className="text-white/45">:~$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            aria-label="Terminal command"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent pl-1 text-white caret-[oklch(0.78_0.18_150)] outline-none"
          />
        </form>
      </div>

      <footer className="border-t border-white/10 px-3 py-2 text-[11px] text-white/42">
        Local commands only. No server CPU, no shell access.
      </footer>
    </section>
  );
}

export function resolveCommand(
  command: string,
  actions: {
    openProjects: () => void;
    openContact: () => void;
    openResume: () => void;
    openGitHub: () => void;
    openLinkedIn: () => void;
    openProjectDetails: (id: string) => void;
    setOperatorTheme: () => void;
    triggerFun: () => void;
    triggerContact: () => void;
  },
) {
  const projectMatch = getProjectFromCommand(command);
  if (projectMatch) {
    actions.openProjectDetails(projectMatch.id);
    return [
      `Opening ${projectMatch.name} properties...`,
      projectMatch.description,
      `Stack: ${projectMatch.tech.slice(0, 5).join(', ')}`,
    ];
  }

  switch (command) {
    case 'help':
      return [
        'Available commands:',
        '  whoami          print the person behind this desktop',
        '  ls              list portfolio apps',
        '  cat README.md   read the intro file',
        '  projects        open the project explorer',
        '  resume          open the resume window',
        '  contact         open contact mail',
        '  skills --ranked show the strongest stack signals',
        '  why hire me     print the short pitch',
        '  case ryddo      inspect the RYDDO project',
        '  case restaurant inspect the restaurant dashboard',
        '  matrix          run a tiny visual test',
        '  coffee          print the build fuel',
        '  theme operator  unlock the hidden accent',
        '  open github     open GitHub in Chrome',
        '  open linkedin   open LinkedIn in Chrome',
        '  clear           reset this terminal',
      ];
    case 'whoami':
      return [
        'Vardan Vanyan',
        'Software engineer focused on thoughtful front-end products.',
        'Based in Los Angeles.',
      ];
    case 'ls':
      return [
        'README.md',
        'Projects/',
        'Project Properties/',
        'Installed Apps/',
        'Resume.pdf',
        'Contact.eml',
        'Chrome',
      ];
    case 'cat readme.md':
    case 'cat README.md':
      return [
        'Hi, I am Vardan.',
        'I build polished UI systems, product interfaces, and front-end tools.',
        'This portfolio behaves like a little desktop, so click around.',
      ];
    case 'projects':
      actions.openProjects();
      return ['Opening Projects...'];
    case 'resume':
      actions.openResume();
      return ['Opening Resume.pdf...'];
    case 'contact':
    case 'email':
      actions.openContact();
      actions.triggerContact();
      return ['Opening Contact.eml...'];
    case 'open github':
      actions.openGitHub();
      return ['Opening github.com/vanyanv in Chrome...'];
    case 'open linkedin':
      actions.openLinkedIn();
      return ['Opening linkedin.com/in/vardanvanyan in Chrome...'];
    case 'skills --ranked':
      return [
        '1. React + TypeScript product UI',
        '2. Next.js app routing, server/client boundaries, deployment',
        '3. Tailwind CSS systems and responsive interaction design',
        '4. Full-stack product wiring with Node, Postgres, Prisma',
        '5. Polishing weird ideas until they feel usable',
      ];
    case 'why hire me':
      return [
        'Because I care about both sides of the interface:',
        'the code has to hold up, and the thing has to feel good in the hand.',
        'I move fast, but I like leaving behind UI that feels considered.',
      ];
    case 'first computer':
      actions.triggerFun();
      return [
        'The important part was not the machine.',
        'It was realizing you can poke at software until it answers back.',
      ];
    case 'favorite stack':
      actions.triggerFun();
      return [
        'React, TypeScript, Next.js, Tailwind CSS.',
        'Add Postgres/Prisma when the product needs real memory.',
      ];
    case 'debug story':
      actions.triggerFun();
      return [
        'A good debugging session is 20% tools, 30% patience,',
        'and 50% admitting the bug is probably exactly where you are avoiding looking.',
      ];
    case 'coffee':
      actions.triggerFun();
      return [
        '     )  (',
        '    (   ) )',
        '     ) ( (',
        '   _______)_',
        ' .-         -.',
        '(  espresso  )',
        ' `-._____.-`',
        'Build fuel loaded.',
      ];
    case 'matrix':
      actions.triggerFun();
      return [
        '01010110 01000001 01010010 01000100 01000001 01001110',
        'wake up, portfolio visitor...',
        'follow the shipped work.',
        'projects -> details -> live site',
      ];
    case 'theme operator':
      actions.setOperatorTheme();
      return [
        'Operator accent unlocked.',
        'The taskbar color picker now has a green mode.',
      ];
    default:
      return [`Command not found: ${command}`, 'Try "help".'];
  }
}

function getProjectFromCommand(command: string) {
  const normalized = command
    .replace(/^case\s+/, '')
    .replace(/^open project\s+/, '')
    .trim();

  if (normalized === command) return null;

  if (normalized === 'restaurant' || normalized === 'restaurant-dashboard') {
    return projects.find((project) => project.id === 'restaurant-dashboard');
  }

  if (normalized === 'ryddo' || normalized === 'ryddo-catalyst') {
    return projects.find((project) => project.id === 'ryddo-catalyst');
  }

  return projects.find(
    (project) =>
      project.id.toLowerCase() === normalized ||
      project.name.toLowerCase() === normalized,
  );
}
