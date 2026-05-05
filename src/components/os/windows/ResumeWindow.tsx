import { ExternalIcon } from '../icons';

const RESUME_PATH = '/Resume/Vardan_Vanyan_Resume.pdf';

export function ResumeWindowContent() {
  return (
    <div className="flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-hairline/60 px-4 py-2 text-[12px]">
        <span className="text-fg-1">Vardan_Vanyan_Resume.pdf</span>
        <div className="flex items-center gap-2">
          <a
            href={RESUME_PATH}
            download="Vardan_Vanyan_Resume.pdf"
            className="rounded px-2 py-1 font-medium text-fg-1 hover:bg-accent/15 hover:text-accent transition-colors"
          >
            Download
          </a>
          <a
            href={RESUME_PATH}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open resume in new tab"
            className="flex items-center gap-1 rounded px-2 py-1 font-medium text-fg-1 hover:bg-accent/15 hover:text-accent transition-colors"
          >
            New tab
            <ExternalIcon className="h-3 w-3" />
          </a>
        </div>
      </header>

      <div className="flex-1 overflow-hidden bg-bg-1">
        <object
          data={RESUME_PATH}
          type="application/pdf"
          className="h-full w-full"
        >
          <div className="flex h-full items-center justify-center p-8 text-center text-[13px] text-fg-2">
            Your browser can&rsquo;t embed PDFs. {' '}
            <a
              href={RESUME_PATH}
              className="ml-1 underline text-accent"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the resume here.
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
