import clsx from 'clsx';

export const getStyles = ({ active }: { active: boolean }) => ({
  link: clsx(
    'relative flex justify-center items-center rounded-t-[42px] w-full min-w-[170px] h-11 font-scada text-[20px]/[44px] uppercase transition-all duration-300 z-0',
    { 'text-white': active },
    { 'text-[#687A95]': !active },
  ),
  overlay: clsx(
    'absolute top-0 left-0 w-full h-full rounded-t-[32px] desktop:rounded-t-[42px] z-10 transition-all duration-300',
    { 'bg-bgAuthLinks opacity-100 z-10 ': active },
    { 'bg-transparent opacity-0': !active },
  ),
});
