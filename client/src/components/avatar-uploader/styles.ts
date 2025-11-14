import clsx from 'clsx';

interface IStyles {
  className?: string;
  isFullName?: boolean;
  avatarUrl?: string | null;
  info?: string | React.ReactNode;
}

export const getStyles = ({ className, isFullName, info, avatarUrl }: IStyles) => ({
  wrapper: clsx('flex flex-col gap-2 tablet:flex-row tablet:gap-6', {
    'gap-0! tablet:gap-0!': !info,
  }),
  circle: clsx(
    'relative h-[96px] w-[96px] shrink-0  bg-super-blue rounded-full overflow-hidden group/avatar cursor-pointer',
    {
      [`${className}`]: className,
      'bg-purple!': isFullName,
    },
  ),
  cameraWrapper: clsx('flex justify-center items-center cursor-pointer', {
    'w-full h-full': !avatarUrl,
  }),
});
