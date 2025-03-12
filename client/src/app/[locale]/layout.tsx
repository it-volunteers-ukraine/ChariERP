import { Roboto, Scada, Roboto_Condensed } from 'next/font/google';
import { useMessages, NextIntlClientProvider, useLocale as UseLocale } from 'next-intl';

import { ChildrenProps, LocalizationProps } from '@/types';

import '../../styles/globals.css';
import { WidthToast } from './width-toast';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const robotoCondensed = Roboto_Condensed({
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-robotoCondensed',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

const scada = Scada({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-scada',
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
});

export default function RootLayout({ children }: ChildrenProps<LocalizationProps>) {
  const locale = UseLocale();
  const messages = useMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body suppressHydrationWarning className={`${roboto.variable} ${robotoCondensed.variable} ${scada.variable}`}>
        <NextIntlClientProvider messages={messages}>
          <WidthToast>{children}</WidthToast>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
