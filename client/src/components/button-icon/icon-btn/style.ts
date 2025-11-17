import clsx from 'clsx';

import { TypeIConBtn } from '../types';

export const getStyles = ({ type }: { type: TypeIConBtn }) => ({
  arrowRight: clsx('w-[9px] h-[12px] rotate-180', {
    'text-white': type === 'primary',
    'text-light-blue': type === 'secondary',
  }),
  arrowLeft: clsx('w-[9px] h-[12px]', {
    'text-white': type === 'primary',
    'text-light-blue': type === 'secondary',
  }),
  edit: clsx('w-[20px] h-[20px]', {
    'text-white': type === 'primary',
    'text-light-blue': type === 'secondary',
  }),
  save: clsx('w-[14px] h-[14px]', {
    'text-white': type === 'primary',
    'text-light-blue': type === 'secondary',
  }),
  menu: clsx('w-[22px] h-[22px]', {
    'text-white': type === 'primary',
    'text-light-blue': type === 'secondary',
  }),
});
