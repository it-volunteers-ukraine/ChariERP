import { IEditUser, UserStatus } from '@/types';

export const employeeEditInitialValues = (data?: IEditUser) => ({
  avatarUrl: '',
  email: data?.email ?? '',
  notes: data?.notes ?? '',
  phone: data?.phone ?? '',
  address: data?.address ?? '',
  lastName: data?.lastName ?? '',
  position: data?.position ?? '',
  lastLogin: data?.lastLogin ?? '',
  firstName: data?.firstName ?? '',
  middleName: data?.middleName ?? '',
  avatarInitial: data?.avatarUrl ?? '',
  dateOfBirth: data?.dateOfBirth ?? '',
  dateOfEntry: data?.dateOfEntry ?? '',
  status: data?.status ?? UserStatus.ACTIVE,
});
