import { ChangeEvent, RefObject } from 'react';

import { InputProps } from '../input/types';

export interface IStylesProps {
  label?: string;
  error?: string;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  classNameText?: string;
}

export interface ICheckboxProps
  extends Omit<InputProps, 'onChange' | 'itemRef'> {
  href?: string;
  error?: string;
  hrefText?: string;
  multiple?: boolean;
  className?: string;
  classNameText?: string;
  itemRef?: RefObject<HTMLInputElement>;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
