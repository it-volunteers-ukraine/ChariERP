import { cn } from '@/utils';

export const getStyles = (className?: string) => ({
  wrapper: cn(
    'flex h-[130px] w-[145px] tablet:h-[135px] tablet:w-[160px] cursor-pointer flex-col items-center justify-center active:border active:border-darkBlueFocus hover:bg-lightBlueHover rounded-[8px] shadow-switcher',
    className,
  ),
});
