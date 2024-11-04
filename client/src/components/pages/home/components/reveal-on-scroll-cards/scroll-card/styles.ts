import { cn } from '@/utils';

export const getStyles = (isEven: boolean) => ({
  wrapper: cn('flex ', isEven ? 'justify-end' : 'justify-start'),
  text: cn(
    'font-roboto uppercase leading-[150%] text-superBlue tablet:text-[20px] desktop:text-[24px]',
    isEven ? 'text-right' : 'text-left',
  ),
});
