import clsx from 'clsx';

import { TableSortDirection } from '@/types';

interface IGetStyles {
  date: TableSortDirection | undefined;
  edrpou: TableSortDirection | undefined;
  organization: TableSortDirection | undefined;
}

const generalStyles = 'text-mid-gray transition-all duration-300';

export const getStyles = ({ organization, edrpou, date }: IGetStyles) => ({
  organization: clsx(generalStyles, {
    'rotate-180': organization === 'ascending',
    'rotate-0': organization === 'descending',
  }),
  edrpou: clsx(generalStyles, {
    'rotate-180': edrpou === 'ascending',
    'rotate-0': edrpou === 'descending',
  }),
  date: clsx(generalStyles, {
    'rotate-180': date === 'ascending',
    'rotate-0': date === 'descending',
  }),
  header:
    'hidden laptop:grid laptop:grid-cols-table-requests gap-5 py-[14px] pl-3 text-dim-gray bg-white-second select-none sticky top-0 z-9 border-b border-[#A3A3A359]',
});
