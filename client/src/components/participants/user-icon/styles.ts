import { cn } from '@/utils';

interface IStylesUserIcon {
  small?: boolean;
  withoutRing?: boolean;
}

export const getStyles = ({ small, withoutRing }: IStylesUserIcon) => {
  return {
    wrapper: cn(
      `flex cursor-pointer items-center justify-center overflow-hidden rounded-full text-white ring-2 ring-white`,
      { 'h-10 w-10 [&>span]:text-[16px]': !small, 'h-6 w-6 [&>span]:text-[12px]': small },
      { 'ring-0': withoutRing },
    ),
  };
};
