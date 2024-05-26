import clsx from 'clsx';

import { IStylesProps } from './types';

export const getStyles = ({
  error,
  width,
  label,
  checked,
  disabled,
}: IStylesProps) => ({
  label: 'flex items-start w-fit group',
  checkbox: clsx(
    'flex items-center justify-center min-w-[18px] h-[18px] rounded-[2px] border border-checkbox-default-border',
    {
      'mt-[3px]': label,
      'border-checkbox-disabled-border': disabled && !checked,
      'border-0 bg-gradient-to-r from-checkbox-selected-bluecrayola to-checkbox-selected-deepblue':
        !disabled && checked,
      'bg-checkbox-disabled-selected border-0': disabled && checked,
      'border-2 border-checkbox-error': !disabled && error && !checked,
      'group-hover:border-black': !checked && !disabled && !error,
    },
  ),
  radio: clsx(
    'flex items-center justify-center min-w-[18px] h-[18px] rounded-[50%] border-2 border-radio-default-border',
    {
      'mt-[3px]': label,
      'border-radio-disabled-border':
        (disabled && !checked) || (disabled && checked),
      'border-radio-error': error && !checked,
      'group-hover:border-black': !checked && !disabled && !error,
    },
  ),
  check: clsx('text-white', {
    'text-checkbox-check': disabled,
  }),
  radioCheck: clsx('w-[8px] h-[8px] rounded-[50%] bg-radio-default-border', {
    'bg-radio-disabled-border': (disabled && !checked) || (disabled && checked),
    'bg-checkbox-error': error && !checked,
    'group-hover:bg-black': !checked && !disabled && !error,
  }),
  input:
    'absolute appearance-none -webkit-appearance-none -moz-appearance-none',
  text: clsx('ml-[22px] text-checkbox-default-text', {
    'text-checkbox-disabled-text': disabled && !checked,
    'text-checkbox-disabled-selected': checked && disabled,
    'text-checkbox-error': !disabled && error && !checked,
    'group-hover:text-black': !checked && !disabled && !error,
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
