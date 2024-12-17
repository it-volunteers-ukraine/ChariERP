import { cn } from '@/utils';

export const getStylesTableWrapper = ({ isPagination }: { isPagination?: boolean }) => ({
  wrapper: cn(
    'relative px-4 tablet:px-8 pb-4 tablet:pb-8 laptop:px-8 laptop:pb-8 desktop:px-8 desktop:pb-8 desktopXl:pb-8 desktopXl:px-16 overflow-y-auto scroll-blue',
    {
      'min-h-[calc(100dvh-252px)] h-[unset] laptop:min-h-[unset] laptop:h-[calc(100dvh-252px)] desktop:h-[calc(100dvh-352px)] desktopXl:h-[calc(100dvh-408px)]':
        isPagination,
      'min-h-[calc(100dvh-156px)] desktop:min-h-[unset] desktop:h-[calc(100dvh-194px)]': !isPagination,
    },
  ),
});
