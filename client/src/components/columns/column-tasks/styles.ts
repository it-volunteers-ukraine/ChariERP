import { cn } from '@/utils';

export const getStyles = (isDisable: boolean) => {
  return {
    columTask:
      'flex min-h-[254px] h-fit max-h-full w-[254px] flex-col gap-y-3 rounded-md bg-whiteSecond pl-4 pr-1 py-5 shadow-boardColumn',
    titleBox: 'relative w-[222px] pr-3 flex items-center justify-between',
    input: cn(
      'max-w-[190px] text-nowrap text-ellipsis break-all p-2 font-scada border-[1px] text-xl font-bold uppercase text-comet',
      isDisable && 'bg-transparent border-transparent',
      !isDisable && 'rounded-lg border-skyBlue bg-white',
    ),

    dropMenu: 'absolute top-full right-0 flex w-[200px] flex-col gap-2 rounded-md border-[1px] bg-white p-2',
    btnTools:
      'flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky',
    addTask:
      'box-border flex w-full items-center justify-start gap-x-3 rounded-lg border-[1px] bg-arcticSky p-3 font-roboto text-comet hover:border-skyBlue',
  };
};
