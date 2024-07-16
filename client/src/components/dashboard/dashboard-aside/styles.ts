import clsx from 'clsx';

export const getStyles = (isOpen?: boolean) => ({
  aside: clsx('h-full bg-boardAside max-w-[290px] w-full absolute desktop:relative transition-all duration-300 z-10', {
    '-translate-x-full desktop:translate-x-0': !isOpen,
    'translate-x-0': isOpen,
  }),
  button: clsx(
    'flex desktop:hidden items-center justify-center absolute bottom-28 rounded-full w-7 h-7 group shadow-buttonAside hover:scale-125 transition-all duration-300',
    { '-right-4 bg-white': isOpen, '-right-8 bg-boardAside': !isOpen },
  ),
  icon: clsx('transition-all duration-300', {
    'rotate-180 text-lightBlue': isOpen,
    'text-white': !isOpen,
  }),
});
