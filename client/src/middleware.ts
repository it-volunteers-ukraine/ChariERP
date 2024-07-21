import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { locales, routes } from './constants';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'ua',
  localePrefix: 'never',
});

const isValidObjectId = (id: string) => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  return objectIdRegex.test(id);
};

export async function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  const cookies = request.cookies;
  const id = cookies.get('id')?.value ?? '';
  const isValidId = isValidObjectId(id);

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
