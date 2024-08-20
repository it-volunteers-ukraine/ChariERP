import clsx from 'clsx';

export const getStyles = ({ className }: { className?: string }) => ({
  wrapper: clsx(
    'w-full h-[226px] flex flex-col justify-between p-[20px_20px_22px] rounded-[8px] bg-whiteSecond shadow-employeeCard cursor-pointer',
    className,
  ),
  abbName:
    'font-robotoCondensed text-[18px] text-input-text leading-[18px] font-medium overflow-hidden text-ellipsis text-nowrap',
  abbNameLast: 'mb-[6px]',
});
