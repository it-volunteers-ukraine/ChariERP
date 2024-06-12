import clsx from 'clsx';

export const getStyles = (opened: boolean) => ({
  overlay: clsx(
    `absolute inset-0 bg-slate-900/60 backdrop-blur bg-opacity-50 z-20 cursor-pointer`,
    {
      'animate-portalOpen': opened,
    },
    {
      'animate-portalClose': !opened,
    },
  ),
  modal: clsx(
    'relative flex bg-white pt-11 px-8 pb-8 rounded-lg max-w-[500px] w-full min-h-[208px] z-30',
    {
      'animate-modalOpen': opened,
    },
    {
      'animate-modalClose': !opened,
    },
  ),
  svg: 'absolute top-[10px] right-[10px] transition-transform duration-300 hover:scale-110 cursor-pointer',
});
