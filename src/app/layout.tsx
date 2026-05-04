import './globals.css';
import { Inter } from 'next/font/google';
import { SeoFallback } from '@/components/os/SeoFallback';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: 'Vardan Vanyan — Software Engineer',
  description:
    'Portfolio of Vardan Vanyan, software engineer based in Los Angeles. Click around — it works like an operating system.',
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f7f5fb' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1822' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      id="root"
      lang="en"
      className={`${inter.variable} dark`}
      data-accent="indigo"
      suppressHydrationWarning
    >
      <body>
        {children}
        <noscript>
          <SeoFallback />
        </noscript>
      </body>
    </html>
  );
}
