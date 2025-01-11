import { cn } from '@/utils';

export const getStyles = (hasNextTask: boolean) => {
  return {
    taskCard:
      'relative flex max-w-[222px] shrink-0 flex-col gap-3 overflow-hidden rounded-[8px] border border-arcticSky bg-white px-3 py-4 mb-3 min-h-[72px]',
    taskCardDragging: cn(
      'border-skyBlue opacity-80 shadow-[0px_8px_24px_0px_rgba(0,0,0,0.16)]',
      hasNextTask && 'mb-0',
      !hasNextTask && 'mb-3',
    ),
    taskCardLast: 'mb-0',
    title: 'line-clamp-2 max-w-[170px] hyphens-auto font-roboto text-[14px] leading-[20px]',
    dotsButton: 'rounded hover:bg-arcticSky',
    deleteButton:
      'flex justify-between rounded p-2 font-robotoCondensed text-base capitalize text-comet transition hover:bg-arcticSky',
    deleteIcon: 'h-6 w-6 text-comet',
  };
};
