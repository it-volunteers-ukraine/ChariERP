import clsx from 'clsx';

interface IStylesInput {
  label?: string;
  width?: string;
  error?: boolean;
  checked: boolean;
  disabled?: boolean;
}

export const getStyles = ({
  error,
  width,
  label,
  checked,
  disabled,
}: IStylesInput) => ({
  label: 'flex items-start w-fit',
  checkbox: clsx(
    'flex items-center justify-center min-w-[18px] h-[18px] rounded-[2px] border',
    {
      'mt-[3px]': label,
      'border-checkbox-default-border': !disabled && !error && !checked,
      'border-checkbox-disabled-border': disabled && !checked,
      'border-0': checked,
      // 'bg-checkbox-selected transition duration-500 ease-in-out':
      //   checked,
      'bg-gradient-to-r from-checkbox-selected-bluecrayola to-checkbox-selected-deepblue transition duration-500 ease-in-out':
        !disabled && checked,
      'bg-checkbox-disabled-selected': disabled && checked,
      'border-2 border-checkbox-error': !disabled && error && !checked,
    },
    'group-hover:border-black',
  ),
  input: 'hidden',
  text: clsx('ml-[22px] text-checkbox-default-text', {
    'text-checkbox-disabled-text': disabled && !checked,
    'text-checkbox-disabled-selected': checked && disabled,
    'text-checkbox-error': !disabled && error && !checked,
  }),
  textStyle: width ? { width } : undefined,
  link: clsx(
    'ml-[5px] underline leading-6 font-medium text-checkbox-link-default',
    {
      'text-checkbox-link-disabled': disabled && !checked,
      'text-checkbox-link-disabled-selected': checked && disabled,
      'text-checkbox-link-error': error && !disabled && !checked,
    },
  ),
});
