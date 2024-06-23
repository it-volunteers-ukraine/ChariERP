import clsx from 'clsx';

import { IStylesProps } from './types';

export const getStyles = ({
  error,
  checked,
  disabled,
  className,
}: IStylesProps) => ({
  label: clsx('flex items-center w-fit group cursor-pointer gap-[20px]', {
    [`${className}`]: !!className,
  }),

  checkbox: clsx(
    'flex items-center justify-center min-w-[18px] w-[18px] h-[18px] rounded-[2px] border border-checkbox-default-border',
    {
      'border-checkbox-disabled-border': disabled && !checked,
      'border-0 animate-[appearBg_0.2s_ease-in-out_forwards]':
        !disabled && checked,
      'bg-checkbox-disabled-selected-bg border-0': disabled && checked,
      'border-2 border-error': !disabled && error && !checked,
      'group-hover:border-black': !checked && !disabled && !error,
    },
  ),
  radio: clsx(
    'flex items-center justify-center min-w-[18px] h-[18px] rounded-[50%] border-2 border-radio-default-border',
    {
      'border-radio-disabled-border':
        (disabled && !checked) || (disabled && checked),
      'border-radio-error': error && !checked,
      'group-hover:border-black': !checked && !disabled && !error,
    },
  ),
  check: clsx('text-white', {
    'text-checkbox-disabled-check': disabled,
  }),
  radioCheck: clsx('w-[8px] h-[8px] rounded-[50%] bg-radio-default-border', {
    'bg-radio-disabled-border': disabled && checked,
    'group-hover:bg-black': !checked && !disabled && !error,
  }),
  input: 'absolute appearance-none',
  text: clsx('text-checkbox-default-text leading-[18px]', {
    'text-checkbox-disabled-text': disabled && !checked,
    'text-checkbox-disabled-selected-text': checked && disabled,
    'text-error': !disabled && error && !checked,
    'group-hover:text-black': !checked && !disabled && !error,
  }),
  link: clsx(
    'ml-[5px] underline leading-[18px] font-medium text-checkbox-link-default',
    {
      'text-checkbox-link-disabled': disabled && !checked,
      'text-checkbox-link-disabled-selected': checked && disabled,
      'text-error': error && !disabled && !checked,
    },
  ),
});
