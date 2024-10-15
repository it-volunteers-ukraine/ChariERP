import clsx from 'clsx';

export const getStyles = (isDisable: boolean) => {
  return {
    columTask: 'flex min-h-[254px] max-w-[254px] flex-col gap-y-3 rounded-md bg-whiteSecond px-4 py-5',
    titleBox: 'relative flex items-center justify-between',
    input: clsx('max-w-[196px] text-ellipsis break-all p-2 font-scada text-xl font-bold uppercase text-comet', {
      'rounded-lg border-[1px] border-skyBlue bg-white': !isDisable,
      'bg-transparent': isDisable,
    }),
    dropMenu:
      'absolute bottom-0 right-0 flex w-[200px] translate-y-full flex-col gap-2 rounded-md border-[1px] bg-white p-2',
    btnEdit: 'flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky',
    btnDelete:
      'flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky',
    addTask:
      'box-border flex w-full items-center justify-start gap-x-3 rounded-lg border-[1px] bg-arcticSky p-3 font-roboto text-sm text-comet hover:border-skyBlue',
    btnAdd:
      'box-border flex w-full items-center justify-start gap-x-3 rounded-lg border-[1px] bg-arcticSky p-3 font-roboto text-sm text-comet hover:border-skyBlue',
  };
};
