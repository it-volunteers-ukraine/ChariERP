import clsx from 'clsx';

interface IStyles {
  opened: boolean;
  isImg?: boolean;
  classNameModal?: string;
}

export const getStyles = ({ opened, classNameModal, isImg }: IStyles) => ({
  overlay: clsx(
    `fixed inset-0 bg-slate-900/60 backdrop-blur bg-opacity-50 z-20 cursor-pointer`,
    {
      'animate-portalOpen': opened,
    },
    {
      'animate-portalClose': !opened,
    },
  ),

  modal: clsx(
    'relative flex w-full z-30',
    { 'bg-white mx-2 pt-11 px-5 pb-8 max-w-[546px] rounded-lg  min-h-[208px] ': !isImg },
    {
      'h-[calc(100vh-30px)] w-[calc(100vw-30px)] laptop:h-[calc(100vh-100px)] laptop:w-[calc(100vw-100px)] focus:outline-none':
        isImg,
    },
    { [`${classNameModal}`]: !!classNameModal },
    {
      'animate-modalOpen': opened,
    },
    {
      'animate-modalClose': !opened,
    },
  ),
  svg: 'absolute top-[10px] right-[10px] text-input-infoDefault transition-transform duration-300 hover:scale-110 cursor-pointer',
});
