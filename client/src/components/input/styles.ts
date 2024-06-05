import clsx from 'clsx';

interface IStylesInput {
  type?: string;
  value?: string;
  cross?: boolean;
  error?: boolean;
  isMasked?: boolean;
  disabled?: boolean;
  isTextarea?: boolean;
  placeholder?: string;
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
  isTypePassword,
  visiblePassword,
  placeholderItalic,
}: IStylesInput) => ({
  fieldset: clsx(
    'relative flex align-center w-full overflow-hidden h-[64px] transition-all duration-300 border rounded group/item',
    {
      'enabled:border-input-error': error && !disabled,
      'enabled:focus-within:!border-input-focus enabled:hover:border-[#1D1B20]':
        !error && !disabled,
      'border-input-text': !disabled,
      'border-input-disabled': disabled,
      'cursor-pointer': type === 'file',
      'h-auto': isTextarea,
    },
  ),
  star: clsx('text-[14px]/[13px] tracking-[0.4px]', {
    'text-input-star': !disabled,
    'text-input-disabled': disabled,
  }),
  label: clsx('text-[13px]/[13px]', {
    'text-input-text': !disabled,
    'text-input-disabled': disabled,
  }),
  input: clsx(
    'peer w-full mb-3 px-[14px] caret-input-focus placeholder:text-input-info',
    {
      'placeholder:italic': placeholderItalic,
      italic: placeholderItalic && !value,
      'text-input-text': value,
      'text-input-info': placeholder && !value,
      'placeholder:text-input-disabled bg-transparent': disabled,
      'outline-none': isTextarea,
      'cursor-pointer': type === 'date',
    },
    { 'pr-12': isTypePassword || type === 'file' || cross || type === 'date' },
    { 'focus:text-input-focus': !visiblePassword },
  ),
  div: 'flex cursor-pointer peer-focus:[&>svg]:text-input-focus peer-focus:[&>svg]:hover:text-error',
  iconEye: clsx(
    'absolute mb-3 right-3 transition-all duration-300 text-input-text',
  ),
  error: 'text-input-error text-[12px]/[14px]',
  infoSpan: 'text-input-info text-[14px]/[20px]',
  fileType: 'hidden',
  iconClip: 'group-hover/item:text-green',
  iconClose: 'hover:text-error',
});
