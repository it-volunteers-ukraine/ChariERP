import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface CustomInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    HTMLInputElement | HTMLTextAreaElement
  > {}

export interface InputProps extends Omit<CustomInput, 'ref'> {
  label: string;
  error?: string;
  placeholderItalic?: boolean;
  info?: string | React.ReactNode;
}
