import { UserStatus } from '@/types';

export interface IEmployeeCardProps {
  id: string;
  src?: string;
  name: string;
  email: string;
  surname: string;
  jobTitle?: string;
  patronymic: string;
  className?: string;
  status: UserStatus;
  lastSession: string;
}
