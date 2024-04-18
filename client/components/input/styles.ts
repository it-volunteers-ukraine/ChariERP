import clsx from 'clsx';

interface IStylesInput {
  error?: boolean;
  disabled?: boolean;
  isTypePassword: boolean;
  visiblePassword: boolean;
  placeholderItalic?: boolean;
}

export const getStyles = ({
  error,
  disabled,
  isTypePassword,
  visiblePassword,
  placeholderItalic,
}: IStylesInput) => ({
  fieldset: clsx(
    'relative flex align-center w-full overflow-hidden h-[64px] transition-all duration-300 border rounded',
    {
      'enabled:border-input-error': error && !disabled,
      'enabled:focus-within:!border-input-focus enabled:hover:border-[#1D1B20]':
        !error && !disabled,
      'border-input-text': !disabled,
      'border-input-disabled': disabled,
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
    'peer w-full mb-3 px-[14px] text-input-text caret-input-focus placeholder-input-info',
    {
      'placeholder:italic': placeholderItalic,
      'placeholder:text-input-disabled bg-transparent': disabled,
    },
    { 'pr-12': isTypePassword },
    { 'focus:text-input-focus': !visiblePassword },
  ),
  div: 'flex cursor-pointer peer-focus:[&>svg]:text-input-focus',
  iconEye: clsx(
    'absolute mb-3 right-3 transition-all duration-300 text-input-text',
  ),
  error: 'text-input-error text-[12px]/[14px]',
});
