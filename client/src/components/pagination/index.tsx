'use client';

import { ReactNode } from 'react';

import { clsx } from 'clsx';
import { default as RcPagination } from 'rc-pagination';

import * as Icon from '@/assets/icons';
import { useWindowWidth } from '@/hooks';

import { IPagination } from './types';

import './styles.css';

export const Pagination = ({
  total,
  current,
  onChange,
  pageSize,
  className,
  showTitle = false,
  showLessItems = true,
}: IPagination) => {
  const { isMobile } = useWindowWidth();

  const wrapper = clsx('flex justify-center w-full py-8 desktop:justify-start m-auto desktop:m-0', {
    [`${className}`]: !!className,
  });

  if (total <= pageSize) {
    return null;
  }

  const itemRender = (page: number, type: string, originalElement: ReactNode) => {
    if (isMobile) {
      if (type === 'page' && (page === 1 || page === current || page === total)) {
        return originalElement;
      }
      if (type === 'page' && (page < 3 || (page > 2 && page === current) || page + 1 === total)) {
        return page;
      }

      if (type === 'page') {
        return null;
      }

      return originalElement;
    }

    return originalElement;
  };

  return (
    <div className={wrapper}>
      <RcPagination
        total={total}
        current={current}
        onChange={onChange}
        pageSize={pageSize}
        showTitle={showTitle}
        itemRender={itemRender}
        nextIcon={<Icon.Next />}
        prevIcon={<Icon.Prev />}
        showLessItems={showLessItems}
        className="custom-pagination flex w-fit items-center justify-between"
      />
    </div>
  );
};
