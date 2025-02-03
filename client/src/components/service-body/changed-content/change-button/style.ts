import { cn } from '@/utils';

const animation = 'transition-all duration-300 ease-in-out';

export const getStyle = (isActive: boolean) => ({
  btn: cn(
    'group relative flex w-full items-center gap-4 rounded-[5px] p-4 shadow-[0_0_4px_0_#00000029] laptop:w-[264px]',
    {
      'bg-lightBlue': isActive,
      'bg-white': !isActive,
    },
  ),
  absoluteElement: cn(
    animation,
    'absolute left-0 top-0 h-full rounded-l-[5px] group-hover:w-1.5 group-hover:bg-dark-blue',
    {
      'w-1.5 bg-dark-blue': isActive,
      'w-0': !isActive,
    },
  ),
  icon: cn('h-full w-full', { 'text-white': isActive, 'text-lightBlue': !isActive }),
  nameBtn: cn(
    animation,
    'font-roboto text-sm font-medium tablet:text-base laptop:text-2xl group-hover:text-lightBlue',
    {
      'text-white group-hover:text-white': isActive,
      'text-lynch': !isActive,
    },
  ),
});
