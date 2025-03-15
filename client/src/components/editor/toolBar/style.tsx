import { cn } from '@/utils';

export const getStyle = (isOpen: boolean) => ({
  decorateLine: 'h-6 w-[1px] self-center rounded bg-gray-300',
  button: 'hover:bg-gray-300 flex h-7 w-7 items-center justify-center rounded p-[6px]',
  wrapper: cn(
    'flex flex-wrap gap-2 rounded border border-[#F0F0F0] transition-all duration-300 ease-in-out',
    isOpen ? 'max-h-[400px] opacity-100 mb-4 p-2' : 'mb-0 p-0 max-h-0 opacity-0 overflow-hidden',
  ),
});
