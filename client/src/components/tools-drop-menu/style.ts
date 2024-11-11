import { cn } from '@/utils';

import { IGetStyleProps } from './types';
import { endAnimation, startAnimation } from './config';

export const getStyle = ({
  opened,
  className,
  animationEnd = 'closeToolsMenu',
  animationStart = 'openToolsMenu',
}: IGetStyleProps) => ({
  toolsMenu: cn(
    'border-swissCoffee absolute right-0 top-0 z-[10] flex w-[200px] flex-col justify-between gap-2 rounded-lg border bg-white px-3 py-2',
    className,
    !opened && endAnimation[animationEnd],
    opened && startAnimation[animationStart],
  ),
});
