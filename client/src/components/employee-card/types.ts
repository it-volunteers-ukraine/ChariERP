import { UserStatus } from '@/types';

export interface IEmployeeCardProps {
  id: string;
  src?: string;
  name: string;
  email: string;
  surname: string;
  jobTitle?: string;
  imgWidth?: string;
  patronymic: string;
  className?: string;
  status: UserStatus;
  lastSession: string;
  isStatusSelect?: boolean;
  setStatus?: (status: UserStatus) => void;
}
