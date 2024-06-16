import React from 'react';
import { default as RcPagination } from 'rc-pagination';

import * as Icon from '@/assets/icons';

import { IPagination } from './types';
import { ChildrenProps } from '@/types';

import './styles.css';

export const Pagination = ({
  total,
  current,
  children,
  onChange,
  pageSize,
  showTitle = false,
  showLessItems = true,
}: ChildrenProps<IPagination>) => {
  return (
    <>
      <div>{children}</div>

      <div>
        <RcPagination
          total={total}
          current={current}
          onChange={onChange}
          pageSize={pageSize}
          showTitle={showTitle}
          nextIcon={<Icon.Next />}
          prevIcon={<Icon.Prev />}
          showLessItems={showLessItems}
          className="flex justify-between items-center custom-pagination"
        />
      </div>
    </>
  );
};
