import { PropsWithChildren } from 'react';

export type ChildrenProps<T = unknown> = PropsWithChildren<T>;

export type Locale = 'en' | 'ua';

export interface LocalizationProps {
  params: { locale: Locale };
}
