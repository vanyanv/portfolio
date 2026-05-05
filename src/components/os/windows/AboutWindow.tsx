import Image from 'next/image';

const Vardan = '/Images/optimized/vardan-avatar.webp';

export function AboutWindowContent() {
  return (
    <article className="relative h-full overflow-y-auto">
      {/* Header band — pulls in accent for identity */}
      <div className="relative h-32 overflow-hidden border-b border-hairline/60">
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, oklch(0.55 0.28 var(--accent-h) / 0.55), oklch(0.45 0.26 calc(var(--accent-h) + 30) / 0.45))',
          }}
        />
      </div>

      <div className="px-8 -mt-12 pb-10">
        <div className="flex items-end gap-5">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-window border-2 border-hairline shadow-floating bg-bg-1">
            <Image
              src={Vardan}
              alt="Vardan Vanyan"
              width={192}
              height={192}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="pb-1">
            <h1 className="text-2xl font-semibold tracking-tight text-fg-0">
              Vardan Vanyan
            </h1>
            <p className="text-sm text-fg-2">
              Software Engineer, Los Angeles
            </p>
          </div>
        </div>

        <div className="mt-8 max-w-[64ch] space-y-4 text-[15px] leading-7 text-fg-1">
          <p>
            My journey into software engineering wasn&rsquo;t a straight line.
            I&rsquo;m fully immersed in TypeScript and React now, building clean
            interfaces that people enjoy using, but the path here started
            elsewhere.
          </p>
          <p>
            It began when my mom handed me my first computer as a kid. I was
            instantly captivated. I didn&rsquo;t just want to use it, I wanted
            to know how it worked. Late nights tinkering with software, learning
            operating systems, finding workarounds for game limitations.
            Modifying game files taught me as much about problem-solving as the
            hardware upgrades I&rsquo;d tackle on weekends. I still remember the
            first GPU swap I pulled off, a small win that felt huge at the time.
          </p>
          <p>
            That curiosity never faded. Hardware tinkering turned into HTML and
            CSS, watching code transform into something working in front of me.
            I took a detour through a Biology degree, then technology pulled me
            back. Today I build seamless experiences with Next.js and
            TypeScript, comfortable across the stack. Software engineering is
            both the work and the hobby. There&rsquo;s always something new to
            learn.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-3 gap-4 max-w-[64ch]">
          <Stat label="Based in" value="Los Angeles" />
          <Stat label="Focus" value="Front-end" />
          <Stat label="Currently" value="Shipping UI" />
        </div>
      </div>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-chrome border border-hairline/60 bg-bg-1 px-3 py-2">
      <p className="text-[11px] uppercase tracking-wider text-fg-2">{label}</p>
      <p className="mt-1 text-sm font-medium text-fg-0">{value}</p>
    </div>
  );
}
