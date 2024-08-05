import clsx from 'clsx';

import { UserStatus } from '@/types';

export const getStyles = ({ status }: { status?: UserStatus }) => ({
  label: 'min-w-[max-content] font-robotoCondensed font-medium text-comet leading-[24px]',
  data: clsx('w-full text-right leading-[24px] overflow-hidden text-ellipsis text-nowrap', {
    'font-robotoCondensed': !!status,
    'font-roboto text-dimGray': !status,
    'text-greenNormal': status === UserStatus.ACTIVE,
    'text-error': status === UserStatus.BLOCKED,
  }),
});
