import clsx from 'clsx';

export const getStyles = ({ className }: { className?: string }) => ({
  titleWrapper: clsx('font-bold leading-8 font-fontFamily-scada text-title-title uppercase', {
    [`${className}`]: !!className,
  }),
});
