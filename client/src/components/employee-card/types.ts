import { UserStatus } from '@/types';

export interface IEmployeeCardProps {
  id: string;
  email: string;
  lastName: string;
  inById?: boolean;
  firstName: string;
  position?: string;
  imgWidth?: string;
  avatarUrl?: string;
  middleName: string;
  className?: string;
  fieldName?: string;
  status: UserStatus;
  classNameImg?: string;
  lastLogin: string | Date;
  isStatusSelect?: boolean;
  setFieldValue?: (field: string, value: string) => void;
}
