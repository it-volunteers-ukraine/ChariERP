import { cn } from '@/utils';

export const getStyles = (isEven: boolean) => ({
  wrapper: cn('flex ', isEven ? 'justify-end' : 'justify-start'),
  text: cn(
    'font-roboto uppercase leading-[150%] text-super-blue tablet:text-xl desktop:text-2xl',
    isEven ? 'text-right' : 'text-left',
  ),
});
