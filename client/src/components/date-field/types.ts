export interface DateFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  className?: string;
  readonly?: boolean;
  required?: boolean;
  placeholder: string;
  wrapperClass?: string;
  placeholderItalic?: boolean;
  initialValue?: Date | string;
}
