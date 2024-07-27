import clsx from 'clsx';

import { TableSortDirection } from '@/types';

interface IGetStyles {
  organization: TableSortDirection | undefined;
  edrpou: TableSortDirection | undefined;
  date: TableSortDirection | undefined;
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
});
