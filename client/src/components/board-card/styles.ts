import clsx from 'clsx';

const wrapperClass =
  'w-full laptop:max-w-[calc(50%-12px)] h-[248px] tablet:h-[200px] laptop:h-[242px] desktop:h-[176px]';
const border = 'shadow-boardCard rounded-lg';

export const getStyles = ({ className }: { className?: string }) => {
  return {
    wrapper: clsx(
      'transition-all duration-300 bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer',
      wrapperClass,
      border,
      className,
    ),

    wrapperCreate: clsx(
      'flex flex-col justify-center items-center bg-white hover:bg-whiteSecond transition-all duration-300 cursor-pointer',
      wrapperClass,
      border,
      className,
    ),
    text: 'w-[191px] text-center font-scada text-[20px] text-lynch opacity-50 leading-6',
    wrapperLimit: clsx('flex flex-col justify-center items-center shadow-transparent', wrapperClass, className),
    placeholder: clsx('bg-superBlue', wrapperClass, border, className),
  };
};
