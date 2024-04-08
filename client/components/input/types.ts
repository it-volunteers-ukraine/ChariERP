import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface CustomInput
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
    HTMLInputElement | HTMLTextAreaElement
  > {}

export interface InputProps extends CustomInput {
  label: string;
  error?: string;
}
