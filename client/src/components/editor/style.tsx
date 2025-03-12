import { cn } from '@/utils';

export const getStyle = (isOpen: boolean, className?: string) => ({
  toolBar: cn(
    'flex flex-wrap gap-2 rounded border border-[#F0F0F0] transition-all duration-300 ease-in-out',
    isOpen ? 'max-h-[400px] opacity-100 mb-4 p-2' : 'mb-0 p-0 max-h-0 opacity-0 overflow-hidden',
  ),
  editor: cn('text-roboto outline-none text-[16px] leading-6 transition-all duration-300 ease-in-out', className),
  placeholder: 'pointer-events-none absolute left-[19px] top-[13px] text-disabled text-roboto text-[16px] leading-6',
  wrapperButton: cn(
    'flex gap-2 transition-all duration-300 ease-in-out',
    isOpen ? 'max-h-[100px] opacity-100 mt-4' : 'mt-0 max-h-0 opacity-0 overflow-hidden',
  ),
  buttonToolBar:
    'hover:bg-gray-300 flex h-7 w-7 items-center justify-center rounded border-[1px] border-[#F0F0F0] p-[6px]',
});
