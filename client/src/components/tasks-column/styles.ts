import clsx from 'clsx';

export const getStyles = (isDisable: boolean) => {
  return {
    columTask: 'flex min-h-[254px] max-w-[254px] flex-col gap-y-3 rounded-md bg-whiteSecond px-4 py-5',
    titleBox: 'relative flex items-center justify-between',
    input: clsx(
      'max-w-[196px]  text-ellipsis break-all p-2 font-scada border-[1px] text-xl font-bold uppercase text-comet',
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
