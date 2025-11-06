import clsx from 'clsx';

interface IStyles {
  className?: string;
  isManager?: boolean;
}

export const getStyles = ({ className, isManager }: IStyles) => ({
  wrapper: clsx(
    'w-full h-[226px] flex flex-col justify-between p-[20px_20px_22px] rounded-[8px] bg-white-second shadow-employee-card',
    isManager && 'cursor-pointer hover:shadow-employeeCardHover',
    className,
  ),
  abbName:
    'font-roboto-condensed text-[18px] text-comet leading-[18px] font-normal overflow-hidden text-ellipsis text-nowrap h-[18px]',
  abbNameLast: 'mb-[6px]',
});
