import { DetailedHTMLProps, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

export type InputOnChangeEventType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string
  | FileList
  | null;

type CustomInput = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type CustomTextarea = DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>;

export type SearchValue = string | number | readonly string[] | undefined;

export interface InputProps extends Omit<CustomInput & CustomTextarea, 'ref'> {
  name: string;
  label: string;
  error?: string;
  rows?: number;
  cross?: boolean;
  isCopy?: boolean;
  required?: boolean;
  isMasked?: boolean;
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
