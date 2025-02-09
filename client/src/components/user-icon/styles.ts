import { cn } from '@/utils';

interface IStylesUserIcon {
  width?: number;
  withoutRing?: boolean;
}

export const getStyles = ({ width, withoutRing }: IStylesUserIcon) => {
  const isBig = width ? width === 40 : false;

  return {
    wrapper: cn(
      `flex items-center justify-center overflow-hidden rounded-full text-white ring-2 ring-white`,
      { 'h-10 w-10 [&>span]:text-[16px]': isBig, [`h-[${width}px] w-[${width}px] [&>span]:text-[12px]`]: !isBig },
      { 'ring-0': withoutRing },
    ),
    avatar: cn('aspect-square object-cover', {
      'ring-0': withoutRing,
    }),
  };
};
