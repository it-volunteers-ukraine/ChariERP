import clsx from 'clsx';

import { TableSortDirection } from '@/types';

interface IGetStyles {
  date: TableSortDirection | undefined;
  user: TableSortDirection | undefined;
  email: TableSortDirection | undefined;
  edrpou: TableSortDirection | undefined;
  organization: TableSortDirection | undefined;
}

const generalStyles = 'text-mid-gray transition-all duration-300';

export const getStyles = ({ organization, edrpou, date, user, email }: IGetStyles) => ({
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
  user: clsx(generalStyles, {
    'rotate-180': user === 'ascending',
    'rotate-0': user === 'descending',
  }),
  email: clsx(generalStyles, {
    'rotate-180': email === 'ascending',
    'rotate-0': email === 'descending',
  }),
});
