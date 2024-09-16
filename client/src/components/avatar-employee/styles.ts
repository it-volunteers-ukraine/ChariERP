import clsx from 'clsx';

export const getStyles = (className?: string) => ({
  wrapper: clsx(
    'relative flex rounded-full items-center justify-center w-[86px] aspect-square overflow-hidden bg-superBlue',
    {
      [`${className}`]: className,
    },
  ),
  defaultAvatar: 'uppercase text-dark-blue text-[36px] font-scada',
});
