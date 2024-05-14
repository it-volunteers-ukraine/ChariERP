import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface CustomButton
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export interface IButtonProps extends CustomButton {
  text?: string;
  isNarrow?: boolean;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  styleType?: StyleType;
}

export type StyleType =
  | 'primary'
  | 'outline'
  | 'secondary'
  | 'secondary-outline';
