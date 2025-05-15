import { InputTypeEnum } from '../date-field/types';

export interface DateFieldProps {
  name: string;
  error?: string;
  label?: string;
  minDate?: string;
  disabled?: boolean;
  className?: string;
  readonly?: boolean;
  required?: boolean;
  inputClass?: string;
  placeholder: string;
  value?: Date | string;
  wrapperClass?: string;
  handelClose?: () => void;
  inputType?: InputTypeEnum;
  placeholderItalic?: boolean;
  initialValue?: Date | string;
  onChange?: (value: Date | null) => void;
}
