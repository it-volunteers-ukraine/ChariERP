import { ChangeEvent } from 'react';

import { InputProps } from '../input/types';

export interface IStylesProps {
  label?: string;
  error?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  classNameText?: string;
}

export interface ICheckboxProps extends Omit<InputProps, 'onChange'> {
  href?: string;
  error?: string;
  hrefText?: string;
  className?: string;
  classNameText?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
