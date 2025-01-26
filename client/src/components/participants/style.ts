import { cn } from '@/utils';

export const getStyles = (small?: boolean) => {
  return {
    participantsBox: 'relative flex items-center gap-3',
    iconBox: 'flex -space-x-[3px] overflow-hidden',
    counter: 'flex items-center justify-center gap-2 text-lightBlue',
    plus: cn('cursor-default', { 'text-3xl': !small, 'text-base text-comet': small }),
    button: cn({ 'cursor-pointer text-base': !small, 'cursor-default text-xs text-comet': small }),
  };
};
