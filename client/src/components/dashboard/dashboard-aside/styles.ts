import clsx from 'clsx';

export const getStyles = (isOpen?: boolean) => ({
  aside: clsx(
    'flex flex-col justify-between h-full bg-boardAside w-full absolute desktop:relative transition-all duration-300 z-10 laptop:max-w-[290px]',
    {
      '-translate-x-full desktop:translate-x-0': !isOpen,
      'translate-x-0': isOpen,
    },
  ),
  button: clsx(
    'flex desktop:hidden items-center justify-center absolute top-3 right-0 rounded-r-full w-12 h-10 group shadow-buttonAside transition-all duration-300',
    {
      'translate-x-0 bg-white rounded-l-full rounded-r-none': isOpen,
      'translate-x-full bg-boardAside': !isOpen,
    },
  ),
  icon: clsx('transition-all duration-300 w-8 h-8 ', {
    'text-lightBlue': isOpen,
    'text-white': !isOpen,
  }),
});
