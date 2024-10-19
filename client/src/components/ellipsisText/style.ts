import clsx from 'clsx';
import { IGetStylesProps } from './types';

export const getStyles = ({ classNameTooltipWrapper, classNameTooltipText, isEllipsisTooltip }: IGetStylesProps) => ({
  toolTipWrapper: clsx(' rounded border-[1px] border-skyBlue px-2 py-1 bg-white', {
    [`${classNameTooltipWrapper}`]: classNameTooltipWrapper,
  }),
  toolTipText: clsx(`font-normal leading-4 text-[13px] text-comet `, {
    [`${classNameTooltipText}`]: classNameTooltipText,
    'break-words': isEllipsisTooltip,
  }),
});
