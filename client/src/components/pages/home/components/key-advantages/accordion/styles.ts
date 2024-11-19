import { cn } from '@/utils';

import { IStylesProps } from './types';

export const getStyles = ({ isOpen, disabled }: IStylesProps) => ({
  wrapper: cn(
    'relative w-full overflow-hidden rounded-[38px]',
    !isOpen && !disabled && 'hover:shadow-accordionShadow',
    disabled && 'pointer-events-all',
  ),
  titleWrapper: cn(
    'absolute left-[1px] right-[1px] top-[1px] z-10 flex h-[74px] cursor-pointer items-center justify-between rounded-[40px] bg-white px-6',
    disabled && 'bg-newDisabled cursor-default',
  ),
  title: cn('font-scada text-xl font-bold text-lynch tablet:text-2xl laptop:text-[26px]', disabled && 'text-white'),
  arrowWrapper: cn('bg-arrowBg h-9 min-w-9 rounded-full', disabled && 'bg-newDisabled shadow-accordionArrowShadow'),
  arrow: cn(
    'flex text-white items-center justify-center p-[6px] transition-all duration-300 rotate-[-180deg]',
    isOpen && 'rotate-[0deg]',
  ),
  descriptionWrapper: cn(
    'max-h-[76px] bg-bgAuthLinks text-sm transition-all duration-300 p-4 tablet:p-6',
    isOpen && 'max-h-[1000px] p-[92px_16px_16px] tablet:p-[100px_24px_24px]',
    disabled && 'bg-newDisabled',
  ),
  description: cn(
    'font-scada text-white tablet:text-xl laptop:text-2xl opacity-0 transition-all duration-300',
    isOpen && 'opacity-100',
  ),
});
