import { cn } from '@/utils';

interface IStylesInput {
  type?: string;
  value?: string;
  cross?: boolean;
  error?: boolean;
  isMasked?: boolean;
  disabled?: boolean;
  isTextarea?: boolean;
  placeholder?: string;
  wrapperClass?: string;
  textAreaClass?: string;
  isTypePassword: boolean;
  visiblePassword: boolean;
  placeholderItalic?: boolean;
}

export const getStyles = ({
  type,
  cross,
  error,
  value,
  disabled,
  isTextarea,
  placeholder,
  wrapperClass,
  textAreaClass,
  isTypePassword,
  visiblePassword,
  placeholderItalic,
}: IStylesInput) => ({
  wrapper: cn('relative items-baseline flex flex-col laptop:flex-row gap-1 laptop:gap-6 items-start w-full', {
    [`${wrapperClass}`]: !!wrapperClass,
  }),
  fieldset: cn(
    'relative flex align-center pb-3 w-full overflow-hidden transition-all duration-300 border rounded group/item',
    {
      'h-[64px]': type !== 'search',
      'enabled:border-input-error': error && !disabled,
      'enabled:focus-within:!border-input-focus enabled:hover:border-[#1D1B20]': !error && !disabled,
      'border-lightGray': !disabled && type === 'search',
      'border-input-text': !disabled && type !== 'search',
      'border-input-disabled': disabled,
      'cursor-pointer': type === 'file',
      'rounded-[28px] pl-[19px] pr-[14px] py-[10px] h-[44px] items-center': type === 'search',
      'h-auto': isTextarea,
    },
  ),
  star: cn('text-[14px]/[13px] tracking-[0.4px]', {
    'text-input-star': !disabled,
    'text-input-disabled': disabled,
  }),
  label: cn('text-[13px]/[13px]', {
    'text-input-text': !disabled,
    'text-input-disabled': disabled,
  }),
  input: cn('peer items-center w-full px-[14px] caret-input-focus placeholder:text-input-info bg-transparent', {
    italic: placeholderItalic && !value,
    'pr-10 text-input-text truncate': value,
    'text-input-info': placeholder && !value,
    'placeholder:text-input-disabled bg-transparent': disabled,
    'outline-none': isTextarea,
    [`${textAreaClass}`]: textAreaClass,
    'cursor-pointer': type === 'date',
    'cancel-search-btn px-0 h-[23px]': type === 'search',
    '!pr-0 !w-[calc(100%-45px)]': type === 'file',
    'pr-12': isTypePassword || cross || type === 'date',
    'focus:text-input-focus': !visiblePassword,
    'focus:text-input-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none':
      type === 'number',
  }),
  div: 'flex cursor-pointer peer-focus:[&>svg]:text-input-focus',
  iconEye: 'absolute mb-3 right-3 transition-all duration-300 text-input-text',
  error: 'text-input-error text-[12px]/[14px]',
  infoSpan: 'text-input-info text-[14px]/[20px]',
  fileType: 'hidden',
  iconClip: 'group-hover/item:text-green',
  iconClose: 'hover:text-error',
  iconCopyDiv: 'flex cursor-pointer peer-focus:[&>svg]:text-input-focus ',
  iconCopy: 'text-lightBlue hover:text-dark-blue active:text-greenActive active:transition-none',
  search: 'w-6 text-lightBlue cursor-pointer hover:scale-110 transition-all duration-200 mr-3',
});
