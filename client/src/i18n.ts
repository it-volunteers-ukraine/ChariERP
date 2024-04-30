import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

import { Locale } from './types';
import { locales } from './constants';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
