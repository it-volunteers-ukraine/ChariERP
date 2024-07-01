import createMiddleware from 'next-intl/middleware';
import { locales } from './constants';
import { NextRequest, NextResponse } from 'next/server';

export default createMiddleware({
  locales,
  defaultLocale: 'ua',
  localePrefix: 'never',
});

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'ua',
  localePrefix: 'never',
});

const isLogin = true;

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  if (!isLogin && request.nextUrl.pathname === '/sign-in') {
    const url = request.nextUrl.clone();

    url.pathname = '/';

    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
  // matcher: ['/((?!_next).*)'],
};
