import { cn } from '@/utils';

export const getStyles = (isTask?: boolean) => {
  return {
    participantsBox: 'relative flex items-center gap-3',
    iconBox: 'flex -space-x-[3px] overflow-hidden',
    counter: 'flex items-center justify-center gap-2 text-lightBlue',
    plus: cn('cursor-default text-base', { 'text-xs text-comet': isTask }),
    button: cn({ 'cursor-pointer text-base': !isTask, 'cursor-default text-xs text-comet': isTask }),
  };
};
