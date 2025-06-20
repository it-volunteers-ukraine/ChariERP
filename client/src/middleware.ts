import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies';

import { ActiveLanguage } from './types';
import { cookiesLocale, locales, routes } from './constants';

const DEFAULT_LOCALE = ActiveLanguage.UA;

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: 'never',
});

export async function middleware(request: NextRequest): Promise<NextResponse> {
  ensureDefaultLocale(request.cookies);

  return handleNavigation(request);
}

const ensureDefaultLocale = (cookies: RequestCookies): void => {
  if (!cookies.get(cookiesLocale)?.value) {
    cookies.set(cookiesLocale, DEFAULT_LOCALE);
  }
};

const handleNavigation = (request: NextRequest): NextResponse => {
  const userId = request.cookies.get('id')?.value;
  const { pathname } = request.nextUrl;

  if (shouldRedirectToLogin(userId, pathname)) {
    return redirectTo(request, routes.login);
  }

  if (shouldRedirectToRequests(userId, pathname)) {
    return redirectTo(request, routes.requests);
  }

  return intlMiddleware(request);
};

const shouldRedirectToLogin = (userId: string | undefined, pathname: string): boolean => {
  return !isValidObjectId(userId) && pathname.includes(routes.requests);
};

const shouldRedirectToRequests = (userId: string | undefined, pathname: string): boolean => {
  return isValidObjectId(userId) && pathname === routes.login;
};

export const isValidObjectId = (id?: string): boolean => {
  if (!id) return false;
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;

  return objectIdRegex.test(id);
};

const redirectTo = (request: NextRequest, targetPath: string): NextResponse => {
  const url = request.nextUrl.clone();

  url.pathname = targetPath;

  return NextResponse.redirect(url);
};

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
