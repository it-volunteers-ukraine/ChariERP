import clsx from 'clsx';

export const getStyles = ({ type }: { type: 'primary' | 'secondary' }) => ({
  arrowRight: clsx('w-[9px] h-[12px] rotate-180', {
    'text-white': type === 'primary',
    'text-lightBlue': type === 'secondary',
  }),
  arrowLeft: clsx('w-[9px] h-[12px]', {
    'text-white': type === 'primary',
    'text-lightBlue': type === 'secondary',
  }),
  edit: clsx('w-[20px] h-[20px]', {
    'text-white': type === 'primary',
    'text-lightBlue': type === 'secondary',
  }),
  save: clsx('w-[14px] h-[14px]', {
    'text-white': type === 'primary',
    'text-lightBlue': type === 'secondary',
  }),
  menu: clsx('w-[22px] h-[22px]', {
    'text-white': type === 'primary',
    'text-lightBlue': type === 'secondary',
  }),
});
