import clsx from 'clsx';

export const getStyles = ({ className }: { className?: string }) => ({
  wrapper: clsx(
    'w-full h-[226px] flex flex-col justify-between p-[20px_20px_22px] rounded-[8px] bg-whiteSecond shadow-employeeCard cursor-pointer',
    className,
  ),
  abbName:
    'font-robotoCondensed text-[18px] text-comet leading-[18px] font-normal overflow-hidden text-ellipsis text-nowrap h-[18px]',
  abbNameLast: 'mb-[6px]',
});
