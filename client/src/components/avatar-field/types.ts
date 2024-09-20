import { FileInputProps } from '../input/types';

export interface AvatarFieldProps extends Omit<FileInputProps, 'onChange' | 'label'> {
  lastName?: string;
  isSubmit?: boolean;
  firstName?: string;
  className?: string;
  initialAvatarUrl?: string;
  info?: string | React.ReactNode;
}
