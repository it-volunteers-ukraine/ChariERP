import { UserStatus } from '@/types';

export interface IInfoProps {
  label: string;
  data: string;
  status?: UserStatus;
}
