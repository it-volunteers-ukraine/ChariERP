import { OrganizationFormValues, OrganizationEditValues } from '@/types';

export const organizationInitialValues = (data?: OrganizationFormValues) => ({
  site: data?.site ?? '',
  email: data?.email ?? '',
  phone: data?.phone ?? '',
  edrpou: data?.edrpou ?? '',
  agree: data?.agree ?? false,
  social: data?.social ?? [''],
  lastName: data?.lastName ?? '',
  position: data?.position ?? '',
  firstName: data?.firstName ?? '',
  middleName: data?.middleName ?? '',
  certificate: data?.certificate ?? '',
  organizationName: data?.organizationName ?? '',
  dateOfRegistration: data?.dateOfRegistration ?? '',
});

export const getInitialDataOrganization = (data: OrganizationEditValues | null) => {
  if (!data) return emptyState;

  return {
    site: data?.site || '',
    email: data?.email || '',
    phone: data?.phone || '',
    edrpou: data?.edrpou || '',
    lastName: data?.lastName || '',
    position: data?.position || '',
    firstName: data?.firstName || '',
    middleName: data?.middleName || '',
    certificate: data?.certificate || '',
    organizationName: data?.organizationName || '',
    dateOfRegistration: data?.dateOfRegistration || '',
    social: (data?.social?.length && data.social) || [''],
  };
};

export const emptyState = {
  site: '',
  email: '',
  phone: '',
  edrpou: '',
  social: [''],
  lastName: '',
  position: '',
  firstName: '',
  middleName: '',
  certificate: null,
  organizationName: '',
  dateOfRegistration: null,
};
