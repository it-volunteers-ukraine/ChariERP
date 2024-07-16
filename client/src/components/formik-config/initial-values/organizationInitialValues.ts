import { OrganizationFormValues } from '../types';

export const organizationInitialValues = (data?: OrganizationFormValues) => ({
  name: data?.name ?? '',
  site: data?.site ?? '',
  email: data?.email ?? '',
  phone: data?.phone ?? '',
  agree: data?.agree ?? '',
  lastName: data?.lastName ?? '',
  password: data?.password ?? '',
  middleName: data?.middleName ?? '',
  declineReason: data?.declineReason ?? '',
  socialNetworks: data?.socialNetworks ?? [''],
  organizationName: data?.organizationName ?? '',
  positionOrganization: data?.positionOrganization ?? '',
  organizationTaxNumber: data?.organizationTaxNumber ?? '',
  certificateOfRegister: data?.certificateOfRegister ?? '',
  dateOfRegisterOrganization: data?.dateOfRegisterOrganization ?? '',
});
