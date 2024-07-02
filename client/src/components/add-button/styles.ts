import clsx from 'clsx';

export const getStyles = (className?: string) => ({
  button: clsx('flex items-center gap-2 text-[15px] font-medium text-title-title pointer', {
    [`${className}`]: className,
  }),
  plus: 'flex items-center text-[20px] font-medium landing-4',
});
