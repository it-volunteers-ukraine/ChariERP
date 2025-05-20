import clsx from 'clsx';

export const getStyle = (isOpen: boolean) => ({
  wrapper: 'border w-full border-arcticSky relative p-2 rounded-lg',
  button: 'flex w-full items-center justify-between text-dark-blue',
  arrow: clsx('easy-out text-dark-blue transition-transform h-6 w-6', {
    'rotate-180 duration-200': !isOpen,
    'rotate-0 duration-300': isOpen,
  }),
  loader: 'h-6 w-6 text-dark-blue',
});
