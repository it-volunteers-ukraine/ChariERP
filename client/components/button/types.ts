export interface IButtonProps {
  text?: string;
  isNarrow?: boolean;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
  styleType: StyleType;
}

export type StyleType =
  | 'primary'
  | 'outline'
  | 'secondary'
  | 'secondary-outline';
