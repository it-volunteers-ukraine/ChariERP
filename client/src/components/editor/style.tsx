import { cn } from '@/utils';

export const getStyle = (isOpen: boolean, className?: string) => ({
  editor: cn('text-roboto outline-none transition-all duration-300 ease-in-out', className),
  placeholder: 'pointer-events-none absolute left-[19px] top-[13px] text-disabled text-roboto text-[16px] leading-6',
});
