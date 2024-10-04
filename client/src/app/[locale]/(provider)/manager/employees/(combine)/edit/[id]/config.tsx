import { IEditUser, UserStatus } from '@/types';

export const employeeEditInitialValues = (data?: IEditUser) => ({
  email: data?.email ?? '',
  notes: data?.notes ?? '',
  phone: data?.phone ?? '',
  address: data?.address ?? '',
  lastName: data?.lastName ?? '',
  position: data?.position ?? '',
  avatarUrl: data?.avatarUrl ?? '',
  lastLogin: data?.lastLogin ?? '',
  firstName: data?.firstName ?? '',
  middleName: data?.middleName ?? '',
  dateOfBirth: data?.dateOfBirth ?? '',
  dateOfEntry: data?.dateOfEntry ?? '',
  status: data?.status ?? UserStatus.ACTIVE,
});
