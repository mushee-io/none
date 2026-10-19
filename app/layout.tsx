import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'none — Gaming on Ultra',
  description: 'none: Gaming on Ultra via Discord and Telegram.',
  icons: { icon: '/logo.svg' },
};
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
