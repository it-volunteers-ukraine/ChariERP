import { cn } from '@/utils';

import { IGetStylesProps } from './types';

export const getStyles = ({ isEllipsisTooltip, classNameWrapper }: IGetStylesProps) => ({
  toolTipWrapper: cn(
    'absolute z-[99999] overflow-hidden w-fit rounded border-[1px] border-skyBlue px-2 py-1 bg-white',
    classNameWrapper,
  ),
  toolTipText: cn('font-normal leading-4 text-[13px] text-comet', {
    'break-words': isEllipsisTooltip,
  }),
});
