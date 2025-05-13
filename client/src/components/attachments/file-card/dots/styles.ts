import { cn } from '@/utils';

export const getStyles = (isOpen: boolean) => ({
  dotsWrapper:
    'absolute right-0 top-0 z-10 flex h-[40px] w-[40px] items-center justify-center rounded-[0_0_0_4px] bg-white/50 cursor-pointer',
  optionsWrapper: cn(
    'absolute p-2 right-[8px] top-[8px] flex flex-col h-[100px] w-[160px] rounded-[8px] bg-white shadow-dashboard scale-50 transition-all duration-300 ease-in-out opacity-0 z-10 pointer-events-none',
    isOpen && 'z-20 scale-100 opacity-100 pointer-events-auto',
  ),
  option: 'flex cursor-pointer items-center justify-between p-2',
  optionText: 'font-roboto text-comet',
  icon: 'h-[24px] w-[24px] text-comet',
});
