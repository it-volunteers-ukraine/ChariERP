export enum DateStyleType {
  SKY_BLUE = 'SKY_BLUE',
}

export interface DateFieldProps {
  name: string;
  label: string;
  minDate?: string;
  disabled?: boolean;
  className?: string;
  readonly?: boolean;
  required?: boolean;
  inputClass?: string;
  placeholder: string;
  wrapperClass?: string;
  styleType?: DateStyleType;
  placeholderItalic?: boolean;
  initialValue?: Date | string;
}
