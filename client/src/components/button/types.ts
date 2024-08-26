import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface CustomButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export interface IButtonProps extends CustomButton {
  text?: string;
  Icon?: ReactNode;
  isNarrow?: boolean;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  styleType?: StyleType;
}

export type StyleType =
  | 'red'
  | 'white'
  | 'green'
  | 'primary'
  | 'outline'
  | 'secondary'
  | 'outline-blue'
  | 'icon-primary'
  | 'icon-secondary'
  | 'secondary-outline';
