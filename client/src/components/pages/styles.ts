import { cn } from '@/utils';

export const getStylesTableWrapper = ({ isPagination }: { isPagination?: boolean }) => ({
  wrapper: cn('relative px-4 tablet:px-8 pb-8 overflow-y-auto scroll-blue', {
    'min-h-[calc(100dvh-252px)] h-[unset] laptop:min-h-[unset] laptop:h-[calc(100dvh-252px)] desktop:h-[calc(100dvh-284px)]':
      isPagination,
    'min-h-[calc(100dvh-156px)] desktop:min-h-[unset] desktop:h-[calc(100dvh-194px)]': !isPagination,
  }),
});
