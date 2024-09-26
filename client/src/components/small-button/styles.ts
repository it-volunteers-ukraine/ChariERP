import clsx from 'clsx';

export const getStyles = (className?: string) => ({
  button: clsx('flex items-center gap-x-2 text-nowrap pointer', {
    [`${className}`]: className,
  }),
  plus: 'flex items-center text-[20px] font-medium text-title-title',
  text: 'text-[15px] font-medium text-title-title',
});
