import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type InputOnChangeEventType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string
  | FileList
  | null;

type CustomInput = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type CustomTextarea = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

type SearchValue = string | number | readonly string[] | undefined;

export interface InputProps extends Omit<CustomInput & CustomTextarea, 'ref'> {
  name: string;
  rows?: number;
  label?: string;
  error?: string;
  cross?: boolean;
  isCopy?: boolean;
  required?: boolean;
  isMasked?: boolean;
  inputClass?: string;
  isTextarea?: boolean;
  placeholder?: string;
  wrapperClass?: string;
  textAreaClass?: string;
  placeholderItalic?: boolean;
  info?: string | React.ReactNode;
  onSearch?: (value: SearchValue) => void;
  onChange?: (e: InputOnChangeEventType) => void;
}

export type FileInputProps = Omit<InputProps, 'onChange'>;
