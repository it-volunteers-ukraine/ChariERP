import { ReactNode } from 'react';

export interface IPagination {
  total: number;
  current: number;
  pageSize: number;
  children: ReactNode;
  showTitle?: boolean;
  showLessItems?: boolean;
  onChange: (page: number) => void;
}
