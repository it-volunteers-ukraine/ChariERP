import { OrganizationEditValues } from '@/types';

export const getInitialData = (data: OrganizationEditValues | null) => {
  if (!data) return emptyState;

  return {
    site: data?.site || '',
    email: data?.email || '',
    phone: data?.phone || '',
    edrpou: data?.edrpou || '',
    social: data?.social || [''],
    lastName: data?.lastName || '',
    position: data?.position || '',
    firstName: data?.firstName || '',
    middleName: data?.middleName || '',
    certificate: data?.certificate || '',
    organizationName: data?.organizationName || '',
    dateOfRegistration: data?.dateOfRegistration || '',
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
