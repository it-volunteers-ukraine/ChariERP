import { OrganizationFormValues } from '../types';

export const organizationInitialValues = (data?: OrganizationFormValues) => ({
  site: data?.site ?? '',
  agree: data?.agree ?? '',
  email: data?.email ?? '',
  phone: data?.phone ?? '',
  edrpou: data?.edrpou ?? '',
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
