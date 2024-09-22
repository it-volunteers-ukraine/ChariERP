import clsx from 'clsx';

interface IStylesBoard {
  isEdit?: boolean;
  isBoard?: boolean;
  className?: string;
  isCreateNew?: boolean;
  isLimitExceeded?: boolean;
}

const wrapperClass = 'h-[248px] tablet:h-[200px] laptop:h-[242px] desktop:h-[176px] w-full shadow-boardCard rounded-lg';

export const getStyles = ({ className, isBoard, isEdit, isCreateNew, isLimitExceeded }: IStylesBoard) => {
  return {
    wrapper: clsx('transition-all duration-300', wrapperClass, className, {
      'bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer': isBoard,
      'flex flex-col justify-center items-center shadow-transparent': isLimitExceeded,
    }),
    wrapperCreate: clsx('transition-all duration-300', wrapperClass, className, {
      'flex flex-col justify-center items-center bg-white hover:bg-whiteSecond cursor-pointer': isCreateNew && !isEdit,
      'bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer': isEdit,
    }),
    text: 'font-scada text-[20px] text-lynch opacity-50 leading-6',
    wrapperLimit: 'flex flex-col justify-center items-center shadow-transparent',
    wrapperClass,
    className,
  };
};
