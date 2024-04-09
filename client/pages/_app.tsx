import type { AppProps } from 'next/app';
import { Roboto, Scada } from 'next/font/google';

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

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} ${scada.variable}`}>
      <Component {...pageProps} />;
    </main>
  );
}
