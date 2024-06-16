import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from 'react';

export type InputOnChangeEventType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string;

interface CustomInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {}

interface CustomTextarea
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {}

type SearchValue = string | number | readonly string[] | undefined;

export interface InputProps extends Omit<CustomInput & CustomTextarea, 'ref'> {
  name: string;
  label: string;
  error?: string;
  rows?: number;
  cross?: boolean;
  required?: boolean;
  isMasked?: boolean;
  isTextarea?: boolean;
  placeholder?: string;
  placeholderItalic?: boolean;
  info?: string | React.ReactNode;
  onSearch?: (value: SearchValue) => void;
  onChange?: (e: InputOnChangeEventType) => void;
}

export interface FileInputProps extends Omit<InputProps, 'onChange'> {
  maxSize?: number;
}
