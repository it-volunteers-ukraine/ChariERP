export enum InputTypeEnum {
  DATE_LABEL = 'DATE_LABEL',
  DATE_WITH_LABEL = 'DATE_WITH_LABEL',
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
  inputType?: InputTypeEnum;
  placeholderItalic?: boolean;
  initialValue?: Date | string;
}
