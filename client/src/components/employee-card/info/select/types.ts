import { UserStatus } from '@/types';

export interface ISelect {
  status?: UserStatus;
  fieldName?: string;
  setFieldValue?: (field: string, value: string) => void;
}

export interface IStyles {
  isOpen?: boolean;
  isActive?: boolean;
}
