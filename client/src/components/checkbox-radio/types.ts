import { InputProps } from '../input/types';

export interface IStylesProps {
  width?: string;
  label?: string;
  error?: string;
  checked: boolean;
  disabled?: boolean;
}

export interface ICheckboxProps extends InputProps {
  href?: string;
  width?: string;
  error?: string;
  checked: boolean;
  hrefText?: string;
}
