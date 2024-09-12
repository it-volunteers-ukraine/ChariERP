import clsx from 'clsx';

interface IStylesBoard {
  isEdit?: boolean;
  isBoard?: boolean;
  isCreateNew?: boolean;
  isLimitExceeded?: boolean;
}

const wrapperClass =
  'h-[248px] tablet:h-[200px] laptop:h-[242px] laptop:basis-[452px] laptop:grow desktop:h-[176px] desktop:basis-[531px] shadow-boardCard rounded-lg';

export const getStyles = ({ isBoard, isEdit, isCreateNew, isLimitExceeded }: IStylesBoard) => {
  return {
    wrapper: clsx(`${wrapperClass} transition-all duration-300`, {
      'bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer': isBoard,
      'flex flex-col justify-center items-center shadow-transparent': isLimitExceeded,
    }),
    wrapperCreate: clsx(`${wrapperClass} transition-all duration-300`, {
      'flex flex-col justify-center items-center bg-white hover:bg-whiteSecond cursor-pointer': isCreateNew && !isEdit,
      'bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer': isEdit,
    }),
    text: 'font-scada text-[20px] text-lynch opacity-50 leading-6',
    wrapperLimit: `${wrapperClass} flex flex-col justify-center items-center shadow-transparent`,
  };
};
