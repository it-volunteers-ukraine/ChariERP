import { cn } from '@/utils';

export const getStyles = ({ isOpen, isSelected }: { isOpen?: boolean; isSelected?: boolean }) => ({
  wrapper: cn(
    'relative w-full h-full max-h-[40px] max-w-[300px] overflow-hidden rounded-[8px] border border-[#BEC6D0] bg-white transition-all duration-300 hover:bg-[#DFF0F8] hover:border-none hover:shadow-dashboard',
    {
      'bg-[#DFF0F8] border-none shadow-dashboard max-h-[1000px]': isOpen,
    },
  ),
  btn: cn('flex h-[40px] w-full items-center justify-between p-2'),
  selected: cn(isOpen ? 'text-dark-blue' : 'text-[#BEC6D0]', isSelected ? 'text-dark-blue' : 'text-[#BEC6D0]'),
  arrow: cn('h-[24px] w-[24px] text-dark-blue transition-all duration-300', isOpen ? 'rotate-[-180deg]' : 'rotate-0'),
  option: cn('flex gap-3 h-[40px] cursor-pointer items-center border-b px-3 py-2'),
  optionText: cn('text-comet'),
  addBtn: cn(
    'cursor-pointer text-dark-blue placeholder:text-dark-blue focus:cursor-text focus:placeholder-transparent',
  ),
});
