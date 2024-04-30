import createMiddleware from 'next-intl/middleware';
import { locales } from './constants';

export default createMiddleware({
  locales,
  defaultLocale: 'ua',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
