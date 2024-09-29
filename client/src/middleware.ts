import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { ActiveLanguage } from './types';
import { cookiesLocale, locales, routes } from './constants';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'ua',
  localePrefix: 'never',
});

const getValidId = (id: string) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  return objectIdRegex.test(id);
};

export async function middleware(request: NextRequest) {
  const cookies = request.cookies;

  const id = cookies.get('id')?.value || '';
  const language = cookies.get(cookiesLocale)?.value;

  if (!language) {
    cookies.set(cookiesLocale, ActiveLanguage.UA);
  }

  const response = intlMiddleware(request);

  if (!getValidId(id) && request.nextUrl.pathname.includes(routes.requests)) {
    const url = request.nextUrl.clone();

    url.pathname = routes.login;

    return NextResponse.redirect(url);
  }

  if (getValidId(id) && request.nextUrl.pathname === routes.login) {
    const url = request.nextUrl.clone();

    url.pathname = routes.requests;

    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
