import { Roboto, Scada } from 'next/font/google';

import { ChildrenProps } from '@/types';

import '../styles/globals.css';

export const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export const scada = Scada({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-scada',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default async function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} ${scada.variable}`}>{children}</body>
    </html>
  );
}
