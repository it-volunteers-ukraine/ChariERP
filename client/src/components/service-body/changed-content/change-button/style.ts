import { cn } from '@/utils';

export const getStyle = (isActive: boolean) => ({
  btn: cn('relative flex w-full items-center gap-4 rounded-[5px] p-4 shadow-[0_0_4px_0_#00000029] laptop:w-[264px]', {
    'bg-lightBlue': isActive,
    'bg-white': !isActive,
  }),
  absoluteElement: cn('absolute left-0 top-0 h-full rounded-l-[5px]', {
    'w-1.5 bg-dark-blue': isActive,
    'w-0': !isActive,
  }),
  icon: cn('h-full w-full', { 'text-white': isActive, 'text-lightBlue': !isActive }),
  nameBtn: cn('font-roboto text-sm font-medium tablet:text-base laptop:text-2xl', {
    'text-white': isActive,
    'text-lynch': !isActive,
  }),
});
