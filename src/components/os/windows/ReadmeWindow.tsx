/*
 * Notepad-style window with the hero copy. Server-rendered text content
 * (passed as children to the client Window shell).
 */

export function ReadmeWindowContent() {
  return (
    <article className="flex h-full flex-col">
      {/* Faux Notepad menu bar — ornamental */}
      <div className="flex h-7 items-center gap-4 border-b border-hairline/60 px-3 text-[11px] text-fg-2">
        <span>File</span>
        <span>Edit</span>
        <span>Format</span>
        <span>View</span>
        <span>Help</span>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-7 font-sans">
        <h1 className="text-3xl font-semibold tracking-tight text-fg-0">
          Hi, I&rsquo;m Vardan.
        </h1>
        <p className="mt-1 text-sm font-medium text-accent">
          Software Engineer
        </p>

        <div className="mt-8 max-w-[64ch] space-y-4 text-[15px] leading-7 text-fg-1">
          <p>
            I really love making awesome products, especially when it comes to
            front-end development. I&rsquo;m a self-taught developer, and
            crafting beautiful UIs is my thing.
          </p>
          <p>
            When I&rsquo;m not coding, I&rsquo;m on a tennis court, riding my
            bike, or tracking down something new to eat.
          </p>
          <p className="text-fg-2">
            Based in Los Angeles. The desktop is real. Try clicking around.
          </p>
        </div>

        <div className="mt-10 border-t border-hairline/60 pt-5 text-[12px] text-fg-2">
          <p>
            Open <strong className="text-fg-1">About Me.app</strong> for the
            longer story, or <strong className="text-fg-1">Projects</strong>{' '}
            to see what I&rsquo;ve been building.
          </p>
        </div>
      </div>
    </article>
  );
}
