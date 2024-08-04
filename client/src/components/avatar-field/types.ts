import { FileInputProps } from '../input/types';

export interface AvatarFieldProps extends Omit<FileInputProps, 'onChange' | 'label'> {
  withAbb?: boolean;
  lastName?: string;
  firstName?: string;
  initialAvatarUrl?: string;
}
