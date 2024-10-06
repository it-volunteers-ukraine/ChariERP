import { UserStatus } from '@/types';

export interface IInfoProps {
  label: string;
  fieldName?: string;
  status?: UserStatus;
  data: Date | string;
  isStatusSelect?: boolean;
  setFieldValue?: (field: string, value: string) => void;
}

export interface IStyles {
  status?: UserStatus;
  isStatusSelect?: boolean;
}
