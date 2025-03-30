import { cn } from '@/utils';

interface IColorButton {
  isClick?: boolean;
  className?: string;
  classNamePlaceholder?: string;
}

export const getStyle = ({ className, classNamePlaceholder, isClick }: IColorButton) => ({
  editor: cn(
    className,
    isClick && 'cursor-pointer',
    'text-roboto outline-none transition-all duration-300 ease-in-out lexical',
  ),
  placeholder: cn(
    'pointer-events-none absolute left-[5px] top-0 text-disabled font-roboto text-[16px] leading-6',
    classNamePlaceholder,
  ),
});
