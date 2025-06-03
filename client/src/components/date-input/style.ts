import { cn } from '@/utils';

interface IGetStyles {
  value?: string;
  inputClass?: string;
  placeholder?: string;
  placeholderItalic?: boolean;
}

export const getStyles = ({ placeholder, placeholderItalic, value, inputClass }: IGetStyles) => ({
  wrapper: cn('w-full flex cursor-pointer border border-arcticSky p-2 ', inputClass),
  text: cn(' w-full items-center bg-transparent px-[14px] pl-0 text-dark-blue', {
    italic: placeholderItalic && !value,
    'text-input-info': placeholder && !value,
  }),
  icon: cn('absolute right-3 mb-3 text-dark-blue w-5 h-5 sm:w-6 sm:w-6', { 'text-input-info': placeholder && !value }),
});
