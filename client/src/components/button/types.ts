import { ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';

interface CustomButton extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export interface IButtonProps extends CustomButton {
  text?: string;
  isNarrow?: boolean;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  styleType?: StyleType;
  Icon?: ReactNode;
}

export type StyleType =
  | 'red'
  | 'white'
  | 'green'
  | 'primary'
  | 'outline'
  | 'secondary'
  | 'icon-primary'
  | 'icon-secondary'
  | 'secondary-outline';
