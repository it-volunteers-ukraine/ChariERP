import { cn } from '@/utils';

interface IGetStyleProps {
  opened: boolean;
  className?: string;
  animationOpen?: string;
  animationClose?: string;
}

export const getStyle = ({
  opened,
  className,
  animationOpen = 'openToolsMenu',
  animationClose = 'closeToolsMenu',
}: IGetStyleProps) => ({
  toolsMenu: cn(
    'border-swissCoffee absolute right-0 top-0 z-[10] flex w-[200px] flex-col justify-between gap-2 rounded-lg border bg-white px-3 py-2 shadow-boardCard translate-x-full shadow-lg',
    className,
    opened && animationOpen && `animate-${animationOpen}`,
    !opened && animationClose && `animate-${animationClose}`,
  ),
});
