import clsx from 'clsx';

export const getStyles = (small?: boolean) => {
  return {
    participantsBox: 'relative flex items-center gap-3',
    iconBox: 'flex -space-x-1.5 overflow-hidden',
    counter: 'flex items-center justify-center gap-2 text-lightBlue',
    plus: clsx('cursor-default', { 'text-3xl': !small, 'text-base text-comet': small }),
    button: clsx({ 'cursor-pointer text-base': !small, 'cursor-default text-xs text-comet': small }),
  };
};
