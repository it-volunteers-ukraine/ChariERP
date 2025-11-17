import { cn } from '@/utils';

export const getStyles = (hasNextTask: boolean) => {
  return {
    taskCard:
      'relative flex max-w-[222px] shrink-0 flex-col gap-3 overflow-hidden rounded-[8px] border border-arctic-sky bg-white px-3 py-4 mb-3 min-h-[72px]',
    taskCardDragging: cn(
      'border-sky-blue opacity-80 shadow-card-shadow',
      hasNextTask && 'mb-0',
      !hasNextTask && 'mb-3',
    ),
    taskCardLast: 'mb-0',
    title: 'line-clamp-2 max-w-[170px] hyphens-auto font-roboto text-[14px] leading-[20px]',
    dotsButton: 'rounded-sm hover:bg-arctic-sky',
    deleteButton:
      'flex justify-between rounded-sm p-2 font-roboto-condensed text-base capitalize text-comet transition hover:bg-arctic-sky',
    deleteIcon: 'h-6 w-6 text-comet',
  };
};
