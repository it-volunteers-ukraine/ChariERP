import clsx from 'clsx';

import { Status } from '../types';

export const getStyles = ({ status }: { status?: Status }) => ({
  label: 'min-w-[max-content] font-robotoCondensed font-medium text-comet leading-[24px]',
  data: clsx('w-full text-right leading-[24px] overflow-hidden text-ellipsis text-nowrap', {
    'font-robotoCondensed': !!status,
    'font-roboto text-dimGray': !status,
    'text-greenNormal': status === Status.Active,
    'text-error': status === Status.Blocked,
  }),
});
