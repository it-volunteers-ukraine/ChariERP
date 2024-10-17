import clsx from 'clsx';

interface IGetStyleProps {
  opened: boolean;
  className?: string;
}

export const getStyle = ({ className, opened }: IGetStyleProps) => ({
  toolsMenu: clsx(
    'border-swissCoffee bg-red-500 absolute right-0 top-0 z-[10] flex w-[200px] flex-col justify-between gap-2 rounded-lg border bg-white px-3 py-2 shadow-boardCard translate-x-full shadow-lg',
    className,
    {
      'animate-openToolsMenu': opened,
      'animate-closeToolsMenu': !opened,
    },
  ),
});
