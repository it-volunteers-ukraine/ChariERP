export interface IButtonProps {
  text?: string;
  isNarrow?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: () => void;
  styleType: 'primary' | 'outline' | 'secondary' | 'secondary-outline';
}
