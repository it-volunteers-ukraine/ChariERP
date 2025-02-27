import { cn } from '@/utils';

export const getStyles = (isCreate?: boolean) => ({
  wrapperError: 'flex gap-1',
  section: 'min-h-full bg-white px-8 pt-6',
  errorText: 'text-[12px]/[14px] text-input-error',
  wrapperBack: 'mb-4 flex items-center justify-start border-b-2 border-lightBlue pb-6',
  textarea: cn(
    'w-[935px] h-[62px] font-scada font-bold text-[26px] text-lightBlue uppercase leading-[28px] resize-none bg-transparent focus:outline-none',
    {
      'scroll-blue leading-[28px]': isCreate,
      'overflow-hidden line-clamp-2 leading-[31px]': !isCreate,
    },
  ),
});
