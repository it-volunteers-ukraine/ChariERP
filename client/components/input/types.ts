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
  cross?: boolean;
  isMasked?: boolean;
  placeholderItalic?: boolean;
  info?: string | React.ReactNode;
  onChange?: (e: InputOnChangeEventType) => void;
}
