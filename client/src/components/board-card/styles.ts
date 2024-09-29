import clsx from 'clsx';

interface IStylesBoard {
  isEdit?: boolean;
  className?: string;
}

const wrapperClass = ' h-[248px] tablet:h-[200px] laptop:h-[242px] laptop:basis-[452px] laptop:grow desktop:h-[176px] ';
const border = ' shadow-boardCard rounded-lg ';

export const getStyles = ({ isEdit, className }: IStylesBoard) => {
  return {
    wrapper:
      'transition-all duration-300 ' +
      wrapperClass +
      border +
      className +
      ' bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer',
    wrapperCreate: clsx('transition-all duration-300 ', wrapperClass, border, className, {
      'flex flex-col justify-center items-center bg-white hover:bg-whiteSecond cursor-pointer': !isEdit,
      'bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer': isEdit,
    }),
    text: ' w-[191px] text-center font-scada text-[20px] text-lynch opacity-50 leading-6',
    wrapperLimit: ' flex flex-col justify-center items-center shadow-transparent ' + wrapperClass + className,
    placeholder: wrapperClass + border + ' bg-superBlue ' + className,
    wrapperClass,
  };
};
