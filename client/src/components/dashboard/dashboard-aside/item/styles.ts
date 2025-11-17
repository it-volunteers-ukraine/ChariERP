import clsx from 'clsx';

import { INavItemStylesProps } from './types';

export const getStyles = ({ isActive, disabled, isChildren, isOpen }: INavItemStylesProps) => {
  return {
    wrapper: clsx(
      'group/navItem flex items-center rounded-[5px] w-full min-h-11 max-h-11 px-3 gap-3 outline-hidden transition-all duration-300',
      {
        'hover:bg-steel-blue': !isActive && !disabled,
        'bg-white': isActive && !isChildren,
        'bg-steel-blue': isChildren && isActive,
        'cursor-not-allowed': disabled,
      },
    ),
    icon: clsx('shrink-0 transition-all duration-300', {
      'text-nav-item-disabled': disabled,
      'text-white group-hover/navItem:text-white': !disabled && !isActive,
      'text-light-blue': !disabled && isActive,
    }),
    span: clsx('font-medium transition-all duration-300 text-white', {
      'text-nav-item-disabled!': disabled,
      'group-hover/navItem:text-white': !disabled && !isActive && !isChildren,
      'text-light-blue!': !disabled && isActive && !isChildren,
      'text-white': !disabled && isActive && isChildren,
      'ml-12 line-clamp-2': isChildren,
      'truncate overflow-hidden whitespace-nowrap': !isChildren,
    }),

    svg: clsx('ml-auto transition-all duration-300', {
      'rotate-0': isOpen,
      '-rotate-180': !isOpen,
    }),
  };
};
