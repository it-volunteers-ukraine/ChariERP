import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export type InputOnChangeEventType =
  | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  | string;

interface CustomInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    HTMLInputElement | HTMLTextAreaElement
  > {}

export interface InputProps extends Omit<CustomInput, 'ref'> {
  name: string;
  label: string;
  error?: string;
  placeholderItalic?: boolean;
  info?: string | React.ReactNode;
  onChange?: (e: InputOnChangeEventType) => void;
}

export interface FileInputProps extends Omit<InputProps, 'onChange'> {
  maxSize?: number;
}
