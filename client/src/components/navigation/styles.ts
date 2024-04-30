import clsx from 'clsx';

import { INavigationStylesProps } from './types';

export const getStyles = ({ inHeader, className }: INavigationStylesProps) => ({
  link: 'text-[18px] desktop:text-[16px] font-scada text-white hover:text-dark-blue transition-all duration-300',
  ul: clsx('flex uppercase', {
    'flex-col gap-[26px]': !inHeader,
    'flex-row gap-[48px]': inHeader,
    [`${className}`]: className,
  }),
});
