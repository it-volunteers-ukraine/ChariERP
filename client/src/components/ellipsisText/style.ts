import { cn } from '@/utils';

import { IGetStylesProps } from './types';

export const getStyles = ({ isEllipsisTooltip, className }: IGetStylesProps) => ({
  toolTipWrapper: cn(
    'absolute z-[99999] overflow-hidden w-fit max-w-full rounded border-[1px] border-skyBlue px-2 py-1 bg-white',
    className,
  ),
  toolTipText: cn('font-normal leading-4 text-[13px] text-comet', {
    'break-words': isEllipsisTooltip,
  }),
});
