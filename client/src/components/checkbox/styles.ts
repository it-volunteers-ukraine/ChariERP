import clsx from 'clsx';

import { ICheckboxProps } from './types';

export const getStyles = ({
  error,
  width,
  label,
  checked,
  disabled,
}: ICheckboxProps) => ({
  label: 'flex items-start w-fit group',
  checkbox: clsx(
    'flex items-center justify-center min-w-[18px] h-[18px] rounded-[2px] border border-checkbox-default-border',
    {
      'mt-[3px]': label,
      'border-checkbox-disabled-border': disabled && !checked,
      // 'border-0 bg-checkbox-selected': !disabled && checked,
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
    },
  ),
  radioChecked: clsx('w-[8px] h-[8px] rounded-[50%] bg-radio-default-border', {
    'bg-checkbox-disabled-border': disabled && checked,
  }),
  input: 'hidden',
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
  check: clsx('text-white', {
    'text-checkbox-check': disabled,
  }),
});
