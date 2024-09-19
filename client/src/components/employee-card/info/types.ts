import { UserStatus } from '@/types';

export interface IInfoProps {
  label: string;
  status?: UserStatus;
  data: Date | string;
  isStatusSelect?: boolean;
  setStatus?: (status: UserStatus) => void;
  setFieldValue?: (field: string, value: string) => void;
}

export interface IStyles {
  status?: UserStatus;
  isStatusSelect?: boolean;
}
