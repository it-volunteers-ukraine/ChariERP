import clsx from 'clsx';

export const getStyles = (isEdit: boolean) => ({
  wrapper: 'w-full max-w-[777px] desktop:max-w-[935px] min-h-[40px]',
  title: clsx(
    'w-full max-h-[86px] cursor-text scroll-blue outline-hidden font-scada font-bold text-[26px] text-light-blue uppercase leading-[28px] resize-none bg-transparent focus:outline-hidden',
    !isEdit && 'line-clamp-3 wrap-break-word',
  ),
  wrapperError: 'flex gap-1',
  errorText: 'text-[12px]/[14px] text-input-error',
});
