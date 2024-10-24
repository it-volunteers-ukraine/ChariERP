import { cn } from '@/utils';

export const getStyle = (isLimitExceeded: boolean) => ({
  svg: cn(
    'flex h-3 w-3 shrink-0 items-center justify-center rounded-full text-[8px] text-white',
    isLimitExceeded ? 'bg-btn-red-active' : 'bg-lightBlue',
  ),
  text: cn('text-[12px]', isLimitExceeded ? 'text-btn-red-active' : 'text-[#687A9580]'),
});
