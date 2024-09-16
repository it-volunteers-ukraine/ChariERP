import clsx from 'clsx';

import { TableSortDirection } from '@/types';

interface IGetStyles {
  date: TableSortDirection | undefined;
  edrpou: TableSortDirection | undefined;
  organization: TableSortDirection | undefined;
}

const generalStyles = 'text-midGray transition-all duration-300';

export const getStyles = ({ organization, edrpou, date }: IGetStyles) => ({
  organization: clsx(generalStyles, {
    'rotate-[180deg]': organization === 'ascending',
    'rotate-[0deg]': organization === 'descending',
  }),
  edrpou: clsx(generalStyles, {
    'rotate-[180deg]': edrpou === 'ascending',
    'rotate-[0deg]': edrpou === 'descending',
  }),
  date: clsx(generalStyles, {
    'rotate-[180deg]': date === 'ascending',
    'rotate-[0deg]': date === 'descending',
  }),
  header:
    'hidden laptop:grid laptop:grid-cols-tableRequests gap-5 py-[14px] pl-3 text-dimGray bg-whiteSecond select-none sticky top-0 z-[9] border-b border-[#A3A3A359]',
});
