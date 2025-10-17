import { cn } from '@/utils';

interface IGetStyle {
  isOpen: boolean;
  placeholder: string;
  classNameSelected?: string;
  value?: string | number | boolean;
}

export const getStyle = ({ classNameSelected, isOpen, value, placeholder }: IGetStyle) => ({
  wrapper: cn('flex w-full items-center justify-between text-dark-blue', {
    'text-gray-500 opacity-50': placeholder && !value,
    classNameSelected,
  }),
  arrow: cn('easy-out rotate-180 text-dark-blue transition-all', {
    'rotate-0 duration-300': isOpen,
    'duration-200': !isOpen,
  }),
});
