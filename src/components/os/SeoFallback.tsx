import projects from '@/data';

/**
 * Plain semantic content rendered inside <noscript> for crawlers and
 * JS-disabled visitors. Mirrors what's inside the OS windows but in a
 * vertical, accessible layout.
 */
export function SeoFallback() {
  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '40px 24px',
        fontFamily:
          'var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif',
        lineHeight: 1.6,
      }}
    >
      <header>
        <h1>Vardan Vanyan</h1>
        <p>
          Software Engineer based in Los Angeles. This site is built as a
          Windows-style desktop. Enable JavaScript to use it interactively.
        </p>
      </header>

      <section>
        <h2>About</h2>
        <p>
          My journey into software engineering wasn&rsquo;t a straight line.
          I&rsquo;m fully immersed in TypeScript and React now, building clean
          interfaces that people enjoy using.
        </p>
        <p>
          It started with my first computer as a kid. Late nights tinkering
          with software, learning operating systems, finding workarounds for
          game limitations. That curiosity led to HTML and CSS, then through a
          Biology degree, then back to technology. Today I build seamless
          experiences with Next.js and TypeScript.
        </p>
      </section>

      <section>
        <h2>Projects</h2>
        <ul>
          {projects.map((p) => (
            <li key={p.name} style={{ marginBottom: 12 }}>
              <strong>{p.name}</strong> — {p.description} (
              <a href={p.githubUrl}>source</a>,{' '}
              <a href={p.linkUrl}>live</a>)
              <br />
              <small>Tech: {p.tech.join(', ')}</small>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Tech</h2>
        <p>
          TypeScript, JavaScript, HTML, CSS, React, Next.js, Redux, TanStack
          Query, Tailwind CSS, Material UI, Node.js, PostgreSQL, MongoDB,
          GraphQL, Webpack, Jest.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <ul>
          <li>
            Email: <a href="mailto:vardan.vanyan@gmail.com">vardan.vanyan@gmail.com</a>
          </li>
          <li>
            GitHub: <a href="https://github.com/vanyanv">github.com/vanyanv</a>
          </li>
          <li>
            LinkedIn:{' '}
            <a href="https://www.linkedin.com/in/vardanvanyan/">
              linkedin.com/in/vardanvanyan
            </a>
          </li>
          <li>
            Resume:{' '}
            <a href="/Resume/Vardan_Vanyan_Resume.pdf" download>
              Download (PDF)
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
