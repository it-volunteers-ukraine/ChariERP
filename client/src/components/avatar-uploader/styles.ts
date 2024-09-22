import clsx from 'clsx';

interface IStyles {
  className?: string;
  isFullName?: boolean;
  info?: string | React.ReactNode;
}

export const getStyles = ({ className, isFullName, info }: IStyles) => ({
  wrapper: clsx('flex flex-col gap-2 tablet:flex-row tablet:gap-6', {
    '!gap-0 tablet:!gap-0': !info,
  }),
  circle: clsx(
    'relative h-[96px] w-[96px] shrink-0  bg-superBlue rounded-full overflow-hidden group/avatar cursor-pointer',
    {
      [`${className}`]: className,
      '!bg-purple': isFullName,
    },
  ),
});
