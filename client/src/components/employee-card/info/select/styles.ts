import clsx from 'clsx';

import { IStyles } from './types';

export const getStyles = ({ isOpen, status, isActive }: IStyles) => ({
  wrapper: clsx('absolute top-0 left-0 overflow-hidden transition-all duration-300', {
    'bg-whiteSecond shadow-status rounded-[4px]': isOpen,
  }),
  selected: clsx('flex justify-between items-center p-[0_4px_0_16px] w-[140px] h-[36px] cursor-pointer', {
    'text-greenNormal': isActive,
    'text-error': !isActive,
    'font-robotoCondensed': !!status,
    'font-roboto text-dimGray': !status,
  }),
  arrow: clsx('flex justify-center items-center w-[24px] h-[24px] transition-all duration-300 rotate-[0deg]', {
    '!rotate-[-180deg]': isOpen,
  }),
  optionsWrapper: clsx('w-[140px] max-h-0 transition-all duration-300', {
    '!max-h-[100px]': isOpen,
  }),
  option: clsx('flex items-center p-[0_4px_0_16px] w-full h-[36px] cursor-pointer hover:bg-superBlue', {
    'font-robotoCondensed': !!status,
    'font-roboto text-dimGray': !status,
  }),
});
