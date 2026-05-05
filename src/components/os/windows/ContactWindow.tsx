'use client';

import { ExternalIcon, GithubAppIcon, LinkedinAppIcon, MailIcon } from '../icons';
import { useBrowser, type BrowserPage } from '../state/browser';

type Contact =
  | {
      label: 'Email';
      value: string;
      href: string;
      primary: true;
    }
  | {
      label: 'GitHub' | 'LinkedIn';
      value: string;
      page: BrowserPage;
      primary: false;
    };

const CONTACTS: Contact[] = [
  {
    label: 'Email',
    value: 'vardan.vanyan@gmail.com',
    href: 'mailto:vardan.vanyan@gmail.com',
    primary: true,
  },
  {
    label: 'GitHub',
    value: 'github.com/vanyanv',
    page: 'github',
    primary: false,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/vardanvanyan',
    page: 'linkedin',
    primary: false,
  },
];

export function ContactWindowContent() {
  const { openBrowser } = useBrowser();

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
        {CONTACTS.map((contact) => (
          <li key={contact.label}>
            {contact.label === 'Email' ? (
              <a
                href={contact.href}
                className="group flex items-center gap-4 rounded-chrome px-3 py-3 hover:bg-accent/10 transition-colors"
              >
                <ContactIcon label={contact.label} />
                <ContactText contact={contact} />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => openBrowser(contact.page)}
                className="group flex w-full items-center gap-4 rounded-chrome px-3 py-3 text-left hover:bg-accent/10 transition-colors"
              >
                <ContactIcon label={contact.label} />
                <ContactText contact={contact} />
              </button>
            )}
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-hairline/60 px-8 py-3 text-[11px] text-fg-2">
        Replies usually within a day or two.
      </div>
    </div>
  );
}

function ContactIcon({ label }: { label: Contact['label'] }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-chrome border border-hairline/60 bg-bg-1 text-accent">
      {label === 'Email' ? (
        <MailIcon className="h-5 w-5" />
      ) : label === 'GitHub' ? (
        <GithubAppIcon className="h-7 w-7" />
      ) : (
        <LinkedinAppIcon className="h-7 w-7" />
      )}
    </span>
  );
}

function ContactText({ contact }: { contact: Contact }) {
  return (
    <>
      <div className="flex-1 min-w-0">
        <p className="text-[12px] uppercase tracking-wider text-fg-2">
          {contact.label}
        </p>
        <p className="truncate text-[14px] font-medium text-fg-0 group-hover:text-accent transition-colors">
          {contact.value}
        </p>
      </div>
      <span className="flex items-center gap-1 text-[11px] text-fg-2 group-hover:text-accent transition-colors">
        {contact.primary ? 'Preferred' : 'Chrome'}
        {!contact.primary && <ExternalIcon className="h-3 w-3" />}
      </span>
    </>
  );
}
