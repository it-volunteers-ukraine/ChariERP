import { cn } from '@/utils';

import { AboutCardType } from '.';

export const getStylesByType = (isWithChildren: boolean) => {
  return {
    [AboutCardType.L]: cn(
      'w-full items-start [&>.titleAboutService]:text-start [&>.iconAboutService]:w-[116px] [&>.iconAboutService]:min-h-[116px] tablet:[&>.iconAboutService]:w-[138px] tablet:[&>.iconAboutService]:min-h-[138px]',
      isWithChildren && 'gap-4 [&>.iconAboutService]:mb-2 ',
    ),
    [AboutCardType.XL]: cn(
      'desktop:w-[552px] [&>.iconAboutService]:w-[138px] [&>.iconAboutService]:h-[138px] tablet:[&>.iconAboutService]:w-[156px] tablet:[&>.iconAboutService]:h-[156px] w-full tablet:w-[552px] tablet:m-auto desktop:m-0 [&>.titleAboutService]:max-w-[260px] desktop:[&>.titleAboutService]:max-w-[310px] [&>.titleAboutService]:text-[18px] [&>.titleAboutService]:leading-[22px] tablet:[&>.titleAboutService]:text-[20px] tablet:leading-6 desktop:[&>.titleAboutService]:text-[24px] desktop:leading-[30px] h-full',
      isWithChildren && 'gap-4 [&>.titleAboutService]:mb-2 ',
    ),
    [AboutCardType.BASE]: '',
  };
};
