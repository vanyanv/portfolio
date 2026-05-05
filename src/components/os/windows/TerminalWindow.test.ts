import { describe, expect, it, vi } from 'vitest';
import { resolveCommand } from './TerminalWindow';

function actions() {
  return {
    openProjects: vi.fn(),
    openContact: vi.fn(),
    openResume: vi.fn(),
    openGitHub: vi.fn(),
    openLinkedIn: vi.fn(),
    openProjectDetails: vi.fn(),
    setOperatorTheme: vi.fn(),
    triggerFun: vi.fn(),
    triggerContact: vi.fn(),
  };
}

describe('resolveCommand', () => {
  it('prints the expanded help menu', () => {
    const output = resolveCommand('help', actions());

    expect(output).toContain('  matrix          run a tiny visual test');
    expect(output).toContain('  theme operator  unlock the hidden accent');
  });

  it('opens the RYDDO project details command', () => {
    const fns = actions();
    const output = resolveCommand('case ryddo', fns);

    expect(fns.openProjectDetails).toHaveBeenCalledWith('ryddo-catalyst');
    expect(output[0]).toBe('Opening RYDDO Catalyst properties...');
  });

  it('unlocks the operator accent', () => {
    const fns = actions();
    const output = resolveCommand('theme operator', fns);

    expect(fns.setOperatorTheme).toHaveBeenCalledOnce();
    expect(output).toContain('Operator accent unlocked.');
  });
});
