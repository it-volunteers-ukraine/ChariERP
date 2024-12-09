import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { ActiveLanguage } from './types';
import { cookiesLocale, locales, routes } from './constants';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

const initMiddlewareWithDefaults = createMiddleware({
  locales,
  defaultLocale: 'ua',
  localePrefix: 'never',
});

export async function middleware(request: NextRequest) {
  setDefaultLocaleIfEmpty(request.cookies);

  return handleRedirection(request);
}

const setDefaultLocaleIfEmpty = (cookies: RequestCookies): void => {
  const language = cookies.get(cookiesLocale)?.value;

  if (!language) {
    cookies.set(cookiesLocale, ActiveLanguage.UA);
  }
};

function handleRedirection(request: NextRequest): NextResponse {
  const id = request.cookies.get('id')?.value || '';
  const { pathname } = request.nextUrl;

  if (!isValidObjectId(id) && pathname.includes(routes.requests)) {
    return redirect(request, routes.login);
  }

  if (isValidObjectId(id) && pathname === routes.login) {
    return redirect(request, routes.requests);
  }

  return initMiddlewareWithDefaults(request);
}

export const isValidObjectId = (id: string): boolean => {
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  return objectIdRegex.test(id);
};

function redirect(request: NextRequest, targetPath: string): NextResponse {
  const url = request.nextUrl.clone();

  url.pathname = targetPath;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
