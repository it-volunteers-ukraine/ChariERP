import clsx from 'clsx';

interface IGetStyle {
  isActive: boolean;
}

export const getStyle = ({ isActive }: IGetStyle) => ({
  deleteWindow: clsx(
    'border-swissCoffee absolute right-0 top-0 z-10 flex justify-between gap-2 rounded-[8px] border bg-white px-6 py-4 shadow-xl',
    { 'w-[202px]': isActive, hidden: !isActive },
  ),
});
