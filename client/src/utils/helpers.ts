import { Locale } from '@/types';
import { Types } from 'mongoose';

export const getPathname = (local: Locale, pathname: string) => `/${local}${pathname}`;
export const getValidId = (id: string) => {
  return Types.ObjectId.isValid(id);
};
