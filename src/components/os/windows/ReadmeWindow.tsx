'use client';

import Editor, { type Monaco } from '@monaco-editor/react';
import { useMemo, useState } from 'react';
import type { editor } from 'monaco-editor';
import { cn } from '@/lib/cn';

type FileId = 'readme' | 'package' | 'page' | 'terminal' | 'browser';

type MiniFile = {
  id: FileId;
  name: string;
  path: string;
  language: string;
  editorLanguage: string;
  lines: string[];
};

const FILES: MiniFile[] = [
  {
    id: 'readme',
    name: 'README.md',
    path: 'README.md',
    language: 'Markdown',
    editorLanguage: 'markdown',
    lines: [
      '# Vardan Vanyan',
      '',
      'Software engineer in Los Angeles.',
      '',
      'I build front-end products that feel sharp, calm, and usable.',
      'This portfolio is a tiny operating system: windows, widgets,',
      'shortcuts, themes, and now a little code tour.',
      '',
      '## Try these',
      '',
      '- Press Ctrl+K for the command palette',
      '- Open Projects for shipped work',
      '- Launch Terminal and type help',
      "- Inspect Chris n Eddy's Dashboard and RYDDO Catalyst",
      '- Open Chrome for GitHub and LinkedIn previews',
      '- Snap windows to the sides like a desktop',
    ],
  },
  {
    id: 'package',
    name: 'package.json',
    path: 'package.json',
    language: 'JSON',
    editorLanguage: 'json',
    lines: [
      '{',
      '  "name": "portfolio-os",',
      '  "private": true,',
      '  "scripts": {',
      '    "dev": "next dev",',
      '    "build": "next build",',
      '    "lint": "eslint .",',
      '    "test": "vitest"',
      '  },',
      '  "stack": ["Next.js", "React", "TypeScript", "Tailwind CSS"]',
      '}',
    ],
  },
  {
    id: 'page',
    name: 'page.tsx',
    path: 'src/app/page.tsx',
    language: 'TypeScript React',
    editorLanguage: 'typescript',
    lines: [
      "import { OS } from '@/components/os/OS';",
      '',
      'export default function Home() {',
      '  return (',
      '    <OS',
      '      contents={{',
      '        readme: <ReadmeWindowContent />,',
      '        terminal: <TerminalWindowContent />,',
      '        chrome: <ChromeWindowContent />,',
      '        projects: <ProjectsWindowContent />',
      '      }}',
      '    />',
      '  );',
      '}',
    ],
  },
  {
    id: 'terminal',
    name: 'terminal.ts',
    path: 'src/features/terminal.ts',
    language: 'TypeScript',
    editorLanguage: 'typescript',
    lines: [
      'const commands = {',
      '  help: "show available commands",',
      '  whoami: "print the person behind the OS",',
      '  projects: "open the project explorer",',
      '  "case ryddo": "inspect a commerce project",',
      '  "matrix": "run a tiny visual test",',
      '  "open github": "launch GitHub inside Chrome",',
      '  clear: "reset the terminal"',
      '};',
      '',
      'export function run(command: string) {',
      '  return commands[command] ?? "Command not found";',
      '}',
    ],
  },
  {
    id: 'browser',
    name: 'browser-preview.tsx',
    path: 'src/features/browser-preview.tsx',
    language: 'TypeScript React',
    editorLanguage: 'typescript',
    lines: [
      'export function BrowserPreview() {',
      '  return (',
      '    <ChromeShell>',
      '      <GitHubProfile />',
      '      <LinkedInProfile />',
      '    </ChromeShell>',
      '  );',
      '}',
      '',
      '// Static previews keep Vercel Active CPU at zero.',
    ],
  },
];

const editorOptions: editor.IStandaloneEditorConstructionOptions = {
  automaticLayout: true,
  cursorBlinking: 'smooth',
  cursorSmoothCaretAnimation: 'on',
  fontFamily:
    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontLigatures: false,
  fontSize: 12,
  lineHeight: 22,
  minimap: { enabled: false },
  padding: { top: 14, bottom: 14 },
  readOnly: false,
  renderLineHighlight: 'all',
  roundedSelection: false,
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  tabSize: 2,
  wordWrap: 'on',
};

function setupMonaco(monaco: Monaco) {
  monaco.editor.defineTheme('portfolio-vscode', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '7f8a9b' },
      { token: 'keyword', foreground: 'c586c0' },
      { token: 'string', foreground: 'ce9178' },
      { token: 'number', foreground: 'b5cea8' },
      { token: 'type.identifier', foreground: '4ec9b0' },
    ],
    colors: {
      'editor.background': '#151722',
      'editor.foreground': '#d7dce8',
      'editor.lineHighlightBackground': '#ffffff08',
      'editorLineNumber.foreground': '#5f6677',
      'editorLineNumber.activeForeground': '#c7d0e0',
      'editorCursor.foreground': '#b87cff',
      'editor.selectionBackground': '#6f45c766',
      'editor.inactiveSelectionBackground': '#6f45c733',
    },
  });
}

export function ReadmeWindowContent() {
  const [activeId, setActiveId] = useState<FileId>('readme');
  const [openTabs, setOpenTabs] = useState<FileId[]>(['readme']);

  const activeFile = useMemo(
    () => FILES.find((file) => file.id === activeId) ?? FILES[0],
    [activeId],
  );
  const editorValue = useMemo(
    () => activeFile.lines.join('\n'),
    [activeFile.lines],
  );

  const openFile = (id: FileId) => {
    setActiveId(id);
    setOpenTabs((tabs) => (tabs.includes(id) ? tabs : [...tabs, id]));
  };

  return (
    <section className="flex h-full min-h-0 flex-col bg-[oklch(0.145_0.025_265)] text-[oklch(0.92_0.01_265)]">
      <div className="flex h-8 shrink-0 items-center gap-4 border-b border-white/10 bg-[oklch(0.18_0.025_265)] px-3 text-[11px] text-white/62">
        <span>File</span>
        <span>Edit</span>
        <span>Selection</span>
        <span>Terminal</span>
        <span>Help</span>
      </div>

      <div className="flex min-h-0 flex-1">
        <ActivityBar />

        <aside className="hidden w-52 shrink-0 border-r border-white/10 bg-[oklch(0.165_0.025_265)] sm:block">
          <div className="border-b border-white/10 px-3 py-2 text-[11px] uppercase tracking-wider text-white/52">
            Explorer
          </div>
          <div className="px-2 py-2">
            <p className="px-2 py-1 text-[11px] font-semibold uppercase text-white/70">
              Portfolio
            </p>
            <div className="space-y-0.5">
              {FILES.map((file) => (
                <button
                  key={file.id}
                  type="button"
                  onClick={() => openFile(file.id)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-[12px] transition-colors',
                    activeId === file.id
                      ? 'bg-white/10 text-white'
                      : 'text-white/68 hover:bg-white/7 hover:text-white',
                  )}
                >
                  <FileGlyph name={file.name} />
                  <span className="truncate">{file.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-9 shrink-0 overflow-x-auto border-b border-white/10 bg-[oklch(0.155_0.024_265)]">
            {openTabs.map((id) => {
              const file = FILES.find((item) => item.id === id) ?? FILES[0];
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveId(id)}
                  className={cn(
                    'flex min-w-[130px] items-center gap-2 border-r border-white/10 px-3 text-left text-[12px]',
                    activeId === id
                      ? 'bg-[oklch(0.145_0.025_265)] text-white'
                      : 'text-white/58 hover:bg-white/5 hover:text-white/82',
                  )}
                >
                  <FileGlyph name={file.name} />
                  <span className="truncate">{file.name}</span>
                </button>
              );
            })}
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            <div className="border-b border-white/8 px-4 py-2 text-[11px] text-white/42">
              {activeFile.path}
            </div>
            <div
              aria-label={`${activeFile.name} Monaco editor`}
              className="min-h-0 flex-1"
            >
              <Editor
                key={activeFile.id}
                beforeMount={setupMonaco}
                defaultLanguage={activeFile.editorLanguage}
                defaultPath={`file:///${activeFile.path}`}
                height="100%"
                loading={
                  <div className="flex h-full items-center justify-center text-[12px] text-white/45">
                    Loading Monaco editor...
                  </div>
                }
                options={editorOptions}
                path={`file:///${activeFile.path}`}
                theme="portfolio-vscode"
                value={editorValue}
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>

      <footer className="flex h-6 shrink-0 items-center gap-3 bg-accent px-3 text-[11px] font-medium text-[oklch(0.99_0.005_290)]">
        <span className="shrink-0">main</span>
        <span className="min-w-0 flex-1 truncate text-center">
          {activeFile.language} | Ln {activeFile.lines.length}, Col 1 | Portfolio
          OS
        </span>
        <a
          href="https://icons8.com"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded px-1 text-[oklch(0.99_0.005_290/0.78)] transition-colors hover:bg-white/15 hover:text-[oklch(0.99_0.005_290)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/65"
        >
          Icons8
        </a>
      </footer>
    </section>
  );
}

function ActivityBar() {
  const items = ['Files', 'Search', 'Source', 'Run'];
  return (
    <nav
      aria-label="VS Code activity bar"
      className="flex w-11 shrink-0 flex-col items-center gap-2 border-r border-white/10 bg-[oklch(0.13_0.024_265)] py-3"
    >
      {items.map((item, index) => (
        <span
          key={item}
          title={item}
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded text-[11px] font-semibold',
            index === 0
              ? 'bg-white/10 text-white'
              : 'text-white/42 hover:bg-white/7 hover:text-white/80',
          )}
        >
          {item.slice(0, 1)}
        </span>
      ))}
    </nav>
  );
}

function FileGlyph({ name }: { name: string }) {
  const color = name.endsWith('.tsx')
    ? 'text-[oklch(0.76_0.14_230)]'
    : name.endsWith('.json')
      ? 'text-[oklch(0.84_0.15_85)]'
      : name.endsWith('.ts')
        ? 'text-[oklch(0.72_0.17_250)]'
        : 'text-[oklch(0.78_0.1_150)]';

  return (
    <span className={cn('w-4 shrink-0 text-[10px] font-bold', color)}>
      {name.endsWith('.md') ? 'M' : name.endsWith('.json') ? '{}' : '<>'}
    </span>
  );
}
