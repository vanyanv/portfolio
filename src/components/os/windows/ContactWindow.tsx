import { ExternalIcon, MailIcon } from '../icons';

const CONTACTS = [
  {
    label: 'Email',
    value: 'vardan.vanyan@gmail.com',
    href: 'mailto:vardan.vanyan@gmail.com',
    primary: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/vanyanv',
    href: 'https://github.com/vanyanv',
    primary: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/vardanvanyan',
    href: 'https://www.linkedin.com/in/vardanvanyan/',
    primary: false,
  },
];

export function ContactWindowContent() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-8 pt-8 pb-2">
        <p className="text-[11px] uppercase tracking-wider text-fg-2">
          New message
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-fg-0">
          Let&rsquo;s connect.
        </h1>
        <p className="mt-2 text-[14px] leading-6 text-fg-1 max-w-[52ch]">
          I&rsquo;m always up for a good conversation about software, design,
          tennis, or what to eat in LA. Pick a channel and reach out.
        </p>
      </div>

      <ul className="px-5 py-3 space-y-1">
        {CONTACTS.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-4 rounded-chrome px-3 py-3 hover:bg-accent/10 transition-colors"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-chrome border border-hairline/60 bg-bg-1/40 text-accent">
                {c.label === 'Email' ? (
                  <MailIcon className="h-5 w-5" />
                ) : (
                  <ExternalIcon className="h-5 w-5" />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] uppercase tracking-wider text-fg-2">
                  {c.label}
                </p>
                <p className="truncate text-[14px] font-medium text-fg-0 group-hover:text-accent transition-colors">
                  {c.value}
                </p>
              </div>
              <span className="text-[11px] text-fg-2 group-hover:text-accent transition-colors">
                {c.primary ? 'Preferred' : 'Open'}
              </span>
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-hairline/60 px-8 py-3 text-[11px] text-fg-2">
        Replies usually within a day or two.
      </div>
    </div>
  );
}
