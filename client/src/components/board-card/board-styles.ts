import clsx from 'clsx';

const wrapperClass = 'mb-6 w-full h-[248px] tablet:h-[200px] laptop:h-[242px] desktop:h-[176px]';
const border = 'shadow-boardCard rounded-lg';

export const getBoardStyles = () => {
  return {
    wrapper: clsx(
      'transition-all duration-300 bg-whiteSecond hover:bg-lightBlueHover p-4 pb-8 cursor-pointer',
      wrapperClass,
      border,
    ),

    wrapperCreate: clsx(
      'flex flex-col justify-center items-center bg-white hover:bg-whiteSecond transition-all duration-300 cursor-pointer',
      wrapperClass,
      border,
    ),
    text: 'w-[191px] text-center font-scada text-[20px] text-lynch opacity-50 leading-6 select-none',
    wrapperLimit: clsx('flex flex-col justify-center items-center shadow-transparent', wrapperClass),
    placeholder: clsx('bg-superBlue shadow-virtualBoard', wrapperClass, border),
  };
};
