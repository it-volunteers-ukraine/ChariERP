import createMiddleware from 'next-intl/middleware';
import { locales } from './constants';

export default createMiddleware({
  locales,
  defaultLocale: 'ua',
  localePrefix: 'never',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
