import { cn } from '@/utils';

export const getStyles = (active: boolean) => ({
  wrapper: 'w-full rounded-[8px] shadow-faqAccShadow',
  titleWrapper: cn(
    'group flex justify-between p-[16px_20px] tablet:p-[20px_24px] w-full cursor-pointer',
    active && 'text-dark-blue',
  ),
  title: cn('text-[20px] text-lightBlue group-hover:text-dark-blue', active && 'text-dark-blue'),
  plusWrapper: cn('text-[40px] transition-all duration-300 ease-in-out', active && 'rotate-45'),
  plus: cn('h-[24px] w-[24px] text-lightBlue group-hover:text-dark-blue', active && 'text-dark-blue'),
  textWrapper: cn(
    'px-[20px] text-comet max-h-0 opacity-0 transition-all duration-300 ease-in-out',
    active && 'p-[0_20px_16px] max-h-[1000px] opacity-1',
  ),
});
