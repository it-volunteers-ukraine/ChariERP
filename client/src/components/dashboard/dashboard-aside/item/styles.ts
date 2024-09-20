import clsx from 'clsx';

import { INavItemStylesProps } from './types';

export const getStyles = ({ isActive, disabled, isChildren, isOpen }: INavItemStylesProps) => {
  return {
    wrapper: clsx(
      'group/navItem flex items-center rounded-[5px] w-full min-h-11 max-h-11 px-3 gap-3 outline-none transition-all duration-300',
      {
        'hover:bg-steelBlue': !isActive,
        'bg-white': isActive && !isChildren,
        'bg-steelBlue': isChildren && isActive,
      },
    ),
    icon: clsx('shrink-0 transition-all duration-300', {
      'text-navItem-disabled': disabled,
      'text-white group-hover/navItem:text-white': !disabled && !isActive,
      'text-lightBlue': !disabled && isActive,
    }),
    span: clsx('font-medium transition-all duration-300', {
      'text-navItem-disabled': disabled,
      'text-white group-hover/navItem:text-white': !disabled && !isActive && !isChildren,
      'text-lightBlue': !disabled && isActive,
      'ml-12 text-white line-clamp-2': isChildren,
      'truncate overflow-hidden whitespace-nowrap': !isChildren,
    }),

    svg: clsx('ml-auto transition-all duration-300', {
      'rotate-0': isOpen,
      '-rotate-180': !isOpen,
    }),
  };
};
