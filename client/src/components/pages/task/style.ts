import { cn } from '@/utils';

interface IStyles {
  isVisible: boolean;
}

export const getStyles = ({ isVisible }: IStyles) => ({
  section: 'min-h-full bg-white px-4 pt-3 tablet:px-8 desktopXl:px-[272px]',
  wrapperTitle: 'mb-5 flex items-start justify-between relative',
  subSection: 'rounded-[8px] bg-white p-3 shadow-task tablet:px-8 tablet:py-6 mb-5',
  subTitle: 'mt-6 laptop:mt-8 desktop:mt-10',
  accordion: cn('gap-3 [&>div:first-child]:justify-between [&>div:first-child]:w-full laptop:hidden ', {
    '[&>.child]:overflow-visible ': isVisible,
  }),
});
