import { OrganizationFormValues } from '../types';

export const organizationInitialValues = (data?: OrganizationFormValues) => ({
  site: data?.site ?? '',
  email: data?.email ?? '',
  phone: data?.phone ?? '',
  edrpou: data?.edrpou ?? '',
  search: data?.search ?? '',
  agree: data?.agree ?? false,
  social: data?.social ?? [''],
  lastName: data?.lastName ?? '',
  position: data?.position ?? '',
  firstName: data?.firstName ?? '',
  middleName: data?.middleName ?? '',
  certificate: data?.certificate ?? '',
  declineReason: data?.declineReason ?? '',
  organizationName: data?.organizationName ?? '',
  dateOfRegistration: data?.dateOfRegistration ?? '',
});
