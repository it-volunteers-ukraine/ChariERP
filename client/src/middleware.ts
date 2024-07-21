import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { locales, routes } from './constants';
import { getValid } from './utils/helpers';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'ua',
  localePrefix: 'never',
});

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const cookies = request.cookies;
  const id = cookies.get('id')?.value ?? '';
  const isValidId = getValid(id);

  if (!isValidId && request.nextUrl.pathname.includes(routes.requests)) {
    const url = request.nextUrl.clone();

    url.pathname = routes.login;

    return NextResponse.redirect(url);
  }

  if (isValidId && request.nextUrl.pathname === routes.login) {
    const url = request.nextUrl.clone();

    url.pathname = routes.requests;

    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
