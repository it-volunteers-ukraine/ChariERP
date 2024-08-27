import { UserStatus } from '@/types';

export interface ISelect {
  status?: UserStatus;
  setStatus?: (status: UserStatus) => void;
}

export interface IStyles {
  isOpen?: boolean;
  isActive?: boolean;
}
