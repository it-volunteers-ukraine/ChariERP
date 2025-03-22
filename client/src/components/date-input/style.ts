import { cn } from '@/utils';

interface IGetStyles {
  value?: string;
  inputClass?: string;
  placeholder?: string;
  placeholderItalic?: boolean;
}

export const getStyles = ({ placeholder, placeholderItalic, value, inputClass }: IGetStyles) => ({
  wrapper: cn('w-full flex cursor-pointer border border-arcticSky p-2 [&>svg]:text-dark-blue', inputClass),
  text: cn(' w-full items-center bg-transparent px-[14px] pl-0 text-dark-blue', {
    italic: placeholderItalic && !value,
    'text-input-info': placeholder && !value,
  }),
});
