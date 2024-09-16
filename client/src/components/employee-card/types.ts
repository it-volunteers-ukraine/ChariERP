import { StaticImageData } from 'next/image';
import { UserStatus } from '@/types';

export interface IEmployeeCardProps {
  id: string;
  // TODO: change types when connect load data from server
  src?: StaticImageData | string;
  name: string;
  email: string;
  surname: string;
  jobTitle?: string;
  imgWidth?: string;
  patronymic: string;
  className?: string;
  status: UserStatus;
  lastSession: string;
  classNameImg?: string;
  isStatusSelect?: boolean;
  setStatus?: (status: UserStatus) => void;
}
