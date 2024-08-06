import clsx from 'clsx';

import { TableSortDirection } from '@/types';

interface IGetStyles {
  date: TableSortDirection | undefined;
  user: TableSortDirection | undefined;
  email: TableSortDirection | undefined;
  edrpou: TableSortDirection | undefined;
  organization: TableSortDirection | undefined;
}

const generalStyles = 'text-midGray transition-all duration-300';

export const getStyles = ({ organization, edrpou, date, user, email }: IGetStyles) => ({
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
  user: clsx(generalStyles, {
    'rotate-[180deg]': user === 'ascending',
    'rotate-[0deg]': user === 'descending',
  }),
  email: clsx(generalStyles, {
    'rotate-[180deg]': email === 'ascending',
    'rotate-[0deg]': email === 'descending',
  }),
});
