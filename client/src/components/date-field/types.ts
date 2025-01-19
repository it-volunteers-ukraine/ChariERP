export enum DateStyleType {
  SKY_BLUE = 'DATE_INPUT_WITH_TITLE',
}

export interface DateFieldProps {
  name: string;
  type?: string;
  label?: string;
  minDate?: string;
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
