import { cn } from '@/utils';

export const getStyles = (className?: string) => ({
  wrapper: cn(
    'flex h-[135px] w-[150px] cursor-pointer flex-col items-center justify-center rounded-[8px] shadow-switcher',
    className,
  ),
});
