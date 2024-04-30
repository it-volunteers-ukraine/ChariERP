import { Locale } from '@/types';

export const getPathname = (local: Locale, pathname: string) =>
  `/${local}${pathname}`;
