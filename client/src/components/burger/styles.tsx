import clsx from 'clsx';

export const getStyles = ({ isActive }: { isActive?: boolean }) => ({
  burger: clsx('nav-toggle relative z-999 desktop:hidden', {
    opened: isActive,
  }),
  nav: clsx(
    'fixed z-998 top-0 right-0 p-[37px_32px] w-screen bg-burger tablet:bg-burger-tablet transition-all duration-300 desktop:hidden',
    {
      'rounded-bl-50 tablet:rounded-bl-[32px] opacity-100': isActive,
      '-translate-y-full opacity-0': !isActive,
    },
  ),
});
