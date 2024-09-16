import { StaticImageData } from 'next/image';
import { UserStatus } from '@/types';

export interface IEmployeeCardProps {
  id: string;
  // TODO: change types when connect load data from server
  avatarUrl?: StaticImageData | string;
  firstName: string;
  email: string;
  lastName: string;
  position?: string;
  imgWidth?: string;
  middleName: string;
  className?: string;
  status: UserStatus;
  lastLogin: string;
  classNameImg?: string;
  isStatusSelect?: boolean;
  setStatus?: (status: UserStatus) => void;
}
