import { cn } from '@/utils';

interface IColorButton {
  className?: string;
  isClick?: boolean;
}

export const getStyle = ({ className, isClick }: IColorButton) => ({
  editor: cn(
    className,
    isClick && 'cursor-pointer',
    'text-roboto outline-none transition-all duration-300 ease-in-out lexical',
  ),
  placeholder: 'pointer-events-none absolute left-[5px] top-0 text-disabled text-roboto text-[16px] leading-6',
});
