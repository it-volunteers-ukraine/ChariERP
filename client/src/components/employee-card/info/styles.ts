import clsx from 'clsx';

import { UserStatus } from '@/types';

import { IStyles } from './types';

export const getStyles = ({ status, isStatusSelect }: IStyles) => ({
  wrapper: clsx('flex gap-2', {
    'items-center justify-between': isStatusSelect,
  }),
  label: 'min-w-[max-content] font-robotoCondensed font-medium text-comet leading-[24px]',
  data: clsx('w-full text-right leading-[24px] overflow-hidden text-ellipsis text-nowrap', {
    'font-robotoCondensed': !!status,
    'font-roboto text-dimGray': !status,
    'text-greenNormal': status === UserStatus.ACTIVE,
    'text-error': status === UserStatus.BLOCKED,
  }),
});
