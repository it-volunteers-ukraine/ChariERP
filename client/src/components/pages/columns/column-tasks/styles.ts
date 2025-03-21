import { cn } from '@/utils';

export const getStyles = (isDisable: boolean, hasNextColumn: boolean) => {
  return {
    columnTask:
      'flex min-h-[254px] h-fit max-h-full w-[254px] flex-col rounded-md bg-whiteSecond pl-4 pr-1 py-5 shadow-boardColumn border border-transparent mr-6',
    columnDragging: cn(
      'opacity-80 shadow-cardShadow border-lynch bg-whiteSecond',
      hasNextColumn && 'mr-6',
      !hasNextColumn && 'mr-0',
    ),
    titleBox: 'relative w-[222px] pr-3 flex items-center justify-between mb-3',
    input: cn(
      'max-w-[190px] text-nowrap text-ellipsis break-all p-2 font-scada border text-xl font-bold uppercase text-comet',
      isDisable && 'bg-transparent border-transparent',
      !isDisable && 'rounded-lg border-skyBlue bg-white',
    ),
    dropMenu: 'absolute top-full right-0 flex w-[200px] flex-col gap-2 rounded-md border-[1px] bg-white p-2',
    btnTools:
      'flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky capitalize',
    addTask:
      'box-border flex w-full items-center justify-start gap-x-3 rounded-lg border-[1px] bg-arcticSky p-3 font-roboto text-comet hover:border-skyBlue',
  };
};
