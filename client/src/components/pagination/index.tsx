import { clsx } from 'clsx';
import { default as RcPagination } from 'rc-pagination';

import * as Icon from '@/assets/icons';

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
  const wrapper = clsx('mx-auto w-full py-8', {
    [`${className}`]: !!className,
  });

  if (total <= pageSize) {
    return null;
  }

  return (
    <div className={wrapper}>
      <RcPagination
        total={total}
        current={current}
        onChange={onChange}
        pageSize={pageSize}
        showTitle={showTitle}
        nextIcon={<Icon.Next />}
        prevIcon={<Icon.Prev />}
        showLessItems={showLessItems}
        className="custom-pagination flex items-center justify-between"
      />
    </div>
  );
};
