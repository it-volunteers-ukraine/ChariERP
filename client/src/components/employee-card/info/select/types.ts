import { UserStatus } from '@/types';

export interface ISelect {
  status?: UserStatus;
  setStatus?: (status: UserStatus) => void;
  setFieldValue?: (field: string, value: string) => void;
}

export interface IStyles {
  isOpen?: boolean;
  isActive?: boolean;
}
