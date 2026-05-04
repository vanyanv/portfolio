'use client';

import { useEffect, useRef, useState } from 'react';
import { useBrowser } from '../state/browser';
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
      openGitHub: () => openBrowser('github'),
      openLinkedIn: () => openBrowser('linkedin'),
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
          <div key={`${line.kind}-${index}`} className="min-h-6 whitespace-pre-wrap">
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

function resolveCommand(
  command: string,
  actions: {
    openProjects: () => void;
    openContact: () => void;
    openGitHub: () => void;
    openLinkedIn: () => void;
  },
) {
  switch (command) {
    case 'help':
      return [
        'Available commands:',
        '  whoami          print the person behind this desktop',
        '  ls              list portfolio apps',
        '  cat README.md   read the intro file',
        '  projects        open the project explorer',
        '  contact         open contact mail',
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
    case 'contact':
      actions.openContact();
      return ['Opening Contact.eml...'];
    case 'open github':
      actions.openGitHub();
      return ['Opening github.com/vanyanv in Chrome...'];
    case 'open linkedin':
      actions.openLinkedIn();
      return ['Opening linkedin.com/in/vardanvanyan in Chrome...'];
    default:
      return [`Command not found: ${command}`, 'Try "help".'];
  }
}
