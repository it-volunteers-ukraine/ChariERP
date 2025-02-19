import { cn } from '@/utils';

export const getStyle = (isOpen: boolean, className?: string) => ({
  wrapperEditor: cn(
    'overflow-hidden transition-[max-height] duration-300 ease-in-out',
    isOpen ? 'min-h-[200px]' : 'min-h-[42px]',
  ),
  toolBar: cn(
    'flex flex-wrap gap-2 rounded border border-[#F0F0F0] transition-all duration-300 ease-in-out',
    isOpen ? 'max-h-[100px] opacity-100 mb-4 p-2' : 'mb-0 p-0 max-h-0 opacity-0 overflow-hidden',
  ),
  editor: cn(
    'rounded border border-[#F0F0F0] focus:border-darkBlueFocus p-2 outline-none transition-all duration-300 ease-in-out',
    isOpen ? 'min-h-[100px]' : 'min-h-[20px]',
    className,
  ),
  placeholder: 'pointer-events-none absolute left-[12px] top-[9px] text-[#C2C3C5]',
  wrapperButton: cn(
    'flex gap-2 transition-all duration-300 ease-in-out',
    isOpen ? 'max-h-[100px] opacity-100 mt-4' : 'mt-0 max-h-0 opacity-0 overflow-hidden',
  ),
  button: 'h-[44px] w-[122px]',
});
