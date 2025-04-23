import { cn } from '@/utils';

export const getStyles = () => ({
  wrapperError: 'flex gap-1',
  section: 'min-h-full bg-white px-4 pt-6 tablet:px-8 desktopXl:px-[272px] pb-6',
  errorText: 'text-[12px]/[14px] text-input-error',
  textarea: cn(
    'w-[935px] h-[62px]  border-2 border-black font-scada font-bold text-[26px] text-lightBlue uppercase leading-[28px] resize-none bg-transparent focus:outline-none',
  ),
  subSection: 'rounded-[8px] bg-white p-3 shadow-task tablet:px-8 tablet:py-6 mb-6',
  subTitle: 'mt-6 laptop:mt-8 desktop:mt-10',
});
