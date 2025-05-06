import { cn } from '@/utils';

export const getStyles = (className?: string) => ({
  wrapper: cn('mb-3         flex items-center gap-2 text-lightBlue tablet:mb-4', className),
  icon: 'h-6 w-6 text-inherit',
  title: 'font-scada text-[20px] font-bold uppercase leading-[120%] tracking-normal text-inherit',
});
