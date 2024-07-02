import clsx from 'clsx';

import { INavItemStylesProps } from './types';

export const getStyles = ({ className, isActive, disabled }: INavItemStylesProps) => ({
  wrapper: clsx(
    'group/navItem items-center bg-transparent rounded-[5px]  flex w-full max-w-[214px] p-[10px_12px] gap-5 outline-none focus-visible:outline-none focus:outline-none transition-all duration-300',
    className,
    {
      'enabled:hover:bg-navItem-hover': !isActive,
      'enabled:bg-navItem-active': isActive,
    },
  ),
  icon: clsx('w-[24px] h-[24px] transition-all duration-300', {
    'text-navItem-disabled': disabled,
    'text-white group-hover/navItem:text-navItem-hover': !disabled && !isActive,
    'text-navItem-active': !disabled && isActive,
  }),
  span: clsx('font-medium  transition-all duration-300', {
    'text-navItem-disabled': disabled,
    'text-white group-hover/navItem:text-navItem-hover': !disabled && !isActive,
    'text-navItem-active': !disabled && isActive,
  }),
});
