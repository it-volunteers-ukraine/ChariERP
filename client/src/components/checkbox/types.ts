type BtnType = 'checkbox' | 'radio';

export interface ICheckboxProps {
  href?: string;
  width?: string;
  type?: BtnType;
  label?: string;
  error?: boolean;
  checked: boolean;
  hrefText?: string;
  disabled?: boolean;
  onChange: () => void;
}
