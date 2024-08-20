import { UserStatus } from '@/types';

export interface IInfoProps {
  data: string;
  label: string;
  status?: UserStatus;
  isStatusSelect?: boolean;
  setStatus?: (status: UserStatus) => void;
}
