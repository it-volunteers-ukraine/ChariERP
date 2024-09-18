import { FormikValues } from 'formik';

import { UserStatus } from '@/types';

export interface ICreateInitialValues {
  email: string;
  notes: string;
  phone: string;
  address: string;
  lastName: string;
  password: string;
  position: string;
  avatarUrl: string;
  firstName: string;
  middleName: string;
  dateOfBirth: string | Date;
  dateOfEntry: string | Date;
}

export interface IEmployeeData extends ICreateInitialValues {
  status: UserStatus;
  lastLogin: Date | string;
}

export interface IEmployeeForm {
  isCreate?: boolean;
  data?: IEmployeeData;
  initialValues: ICreateInitialValues;
  onSubmit: (values: FormikValues) => void;
}
