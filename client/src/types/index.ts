import { PropsWithChildren } from 'react';

export type ChildrenProps<T = unknown> = PropsWithChildren<T>;

export type Locale = 'en' | 'ua';

export interface LocalizationProps {
  params: { locale: Locale };
}

export interface ErrorResponse {
  message: string;
}

export interface IUseWidowWidthProps {
  width: number;
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isNotMobile: boolean;
  isDesktopXL: boolean;
  isNotDesktop: boolean;
}

export enum Roles {
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
}

export enum TableSortDirection {
  Ascending = 'ascending',
  Descending = 'descending',
}

export enum RequestOrganizationStatus {
  APPROVED = 'approved',
  DECLINED = 'declined',
  PENDING = 'pending',
}

export enum UserStatus {
  ACTIVE = 'active',
  BLOCKED = 'blocked',
}
