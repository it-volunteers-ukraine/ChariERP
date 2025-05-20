import clsx from 'clsx';

interface IGetStyle {
  isLoading: boolean;
  isOpenMenu: boolean;
}

export const getStyle = ({ isOpenMenu, isLoading }: IGetStyle) => ({
  wrapper: 'border w-full border-arcticSky relative p-2 rounded-lg desktop:w-[291px]',
  button: clsx('flex w-full items-center justify-between text-dark-blue', {
    'cursor-pointer': !isLoading,
  }),
  arrow: clsx('easy-out text-dark-blue transition-transform h-6 w-6', {
    'rotate-180 duration-200': !isOpenMenu,
    'rotate-0 duration-300': isOpenMenu,
  }),
  loader: 'h-6 w-6 text-dark-blue',
});
