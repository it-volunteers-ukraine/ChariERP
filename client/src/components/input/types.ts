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

export interface InputProps extends Omit<CustomInput & CustomTextarea, 'ref'> {
  name: string;
  label: string;
  error?: string;
  rows?: number;
  cross?: boolean;
  isMasked?: boolean;
  isTextarea?: boolean;
  placeholderItalic?: boolean;
  info?: string | React.ReactNode;
  onChange?: (e: InputOnChangeEventType) => void;
}
