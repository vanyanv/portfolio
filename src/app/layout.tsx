import './globals.css';

export const metadata = {
  title: 'Vardan Vanyan',
  description: 'Portfolio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html id='root' lang='en'>
      <body>{children}</body>
    </html>
  );
}
