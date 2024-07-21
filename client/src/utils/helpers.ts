import { Locale } from '@/types';
import { Types } from 'mongoose';

export const getPathname = (local: Locale, pathname: string) => `/${local}${pathname}`;
export const getValid = (id: string) => {
  return Types.ObjectId.isValid(id);
};
