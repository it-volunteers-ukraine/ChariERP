import { cn } from '@/utils';

export const getStyleCard = (className?: string) => ({
  wrapper: cn('flex flex-col items-center gap-6 w-[164px] tablet:w-[200px] desktop:w-[290px] ', className),
  icon: 'iconAboutService h-[104px] w-[104px] tablet:w-[120px] tablet:h-[120px]',
  title:
    'titleAboutService text-center font-scada text-[18px] font-bold uppercase leading-[22px] tablet:!leading-[25px] desktop:!text-2xl',
  childrenWrapper: 'childrenAboutService list-disc pl-8 h-full',
});
